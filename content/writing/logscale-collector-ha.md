---
title: LogScale Collector HA setup guide
card: LogScale Collector *high-availability* setup
heading: LogScale Collector *HA* setup guide
date: 2026-11-24
tags: Guide, LogScale, keepalived, Syslog
visual: failover
featured: true
stack: Ubuntu · keepalived · rsyslog
summary: Configure two Falcon LogScale Collectors in a high-availability pair with keepalived, so syslog clients send to one virtual IP and never notice when a collector fails.
---

# Plan

## 1. Overview

This guide explains how to configure two Falcon LogScale Collectors in a high-availability configuration using keepalived.

The setup uses a Virtual IP (VIP). Syslog clients send logs to the VIP instead of directly to either collector.

If the primary collector becomes unavailable, the secondary collector automatically takes ownership of the VIP and continues receiving syslog traffic.

### Architecture

```diagram
                         Syslog Clients
                              |
                              v
                       Virtual IP (VIP)
                           <VIP_IP>
                              |
                +-------------+-------------+
                |                           |
                v                           v
             Primary                    Secondary
          <PRIMARY_IP>               <SECONDARY_IP>
          LogScale Collector          LogScale Collector
          Keepalived MASTER           Keepalived BACKUP
                |                           |
                +-------------+-------------+
                              |
                              v
                       Falcon LogScale
```

## 2. Environment Configuration

Use the following table to document the environment.

| Component | Value |
| --- | --- |
| Primary Hostname | orin-nebula |
| Primary IP | 192.168.1.83 |
| Secondary Hostname | eagle-nebula |
| Secondary IP | 192.168.1.84 |
| Virtual IP | 192.168.1.85 |
| Network Interface | ens33 |
| Syslog Protocol | UDP |
| Syslog Port | 1539 |
| Subnet | 192.168.1.0/24 |

> Replace the example values above with the values for the target environment.

## 3. Prerequisites

Before starting the configuration, verify:

| Requirement | Status |
| --- | --- |
| Two Linux servers available | Required |
| Both servers on the same subnet | Required |
| Network connectivity between servers | Required |
| Root/sudo access | Required |
| LogScale Collector installed on both servers | Required |
| LogScale ingest URL | Required |
| LogScale ingest token | Required |
| Unused VIP available | Required |
| Syslog port available | Required |

# Prepare

## 4. Verify Network Configuration

Perform these steps on both servers.

### 4.1 Check IP Address

```bash
ip addr
```

Verify that the server has the expected IP address.

| Server | Expected IP |
| --- | --- |
| Primary | 192.168.1.83 |
| Secondary | 192.168.1.84 |

### 4.2 Identify Network Interface

```bash
ip link
```

Identify the interface used for the LAN connection, for example `ens33`. Use the actual interface name in the Keepalived configuration.

### 4.3 Test Connectivity

From the primary:

```bash
ping -c 4 192.168.1.84
```

From the secondary:

```bash
ping -c 4 192.168.1.83
```

```output
4 packets transmitted, 4 received, 0% packet loss
```

Both servers must be able to communicate before continuing.

## 5. Verify LogScale Collector

Perform this step on both servers.

### 5.1 Check Collector Service

```bash
sudo systemctl status logscale-collector
```

```output
Active: active (running)
```

If the service name is different in your installation, use the appropriate service name.

# Configure

## 6. Configure LogScale Collector

The Collector configuration should be the same on both servers.

### 6.1 Collector Configuration

```yaml /etc/logscale-collector/config.yaml
sources:
  main_collector:
    type: syslog
    mode: udp
    port: 1539
    sink: main-sink
    fields:
      collector_host: "${HOSTNAME}"

sinks:
  main-sink:
    type: humio
    token: <YOUR_INGEST_TOKEN>
    url: https://<YOUR_INGEST_URL>
```

Replace `<YOUR_INGEST_TOKEN>` and `<YOUR_INGEST_URL>` with the appropriate LogScale values.

> The `collector_host` field is optional and can be used to identify which Collector processed an event.

### 6.2 Validate Configuration

Run on both servers:

```bash
sudo logscale-collector config validate \
  --cfg /etc/logscale-collector/config.yaml
```

```output
Configuration validation successful
```

The exact success message may vary by Collector version.

### 6.3 Restart Collector

```bash
sudo systemctl restart logscale-collector
sudo systemctl status logscale-collector
```

```output
Active: active (running)
```

### 6.4 Verify Syslog Port

```bash
sudo ss -ulnp | grep 1539
```

The output should show the Collector listening on UDP port 1539.

## 7. Install Keepalived

Perform this step on both servers.

### 7.1 Update Package Repository

```bash
sudo apt update
```

### 7.2 Install Keepalived

```bash
sudo apt install keepalived -y
```

### 7.3 Verify Installation

```bash
keepalived --version
```

## 8. Configure Keepalived on Primary

The primary server will normally own the VIP.

| Parameter | Value |
| --- | --- |
| State | MASTER |
| Primary IP | 192.168.1.83 |
| Secondary IP | 192.168.1.84 |
| VIP | 192.168.1.85 |
| Interface | ens33 |
| Priority | 150 |
| Virtual Router ID | 51 |

### 8.1 Open Configuration File

On the primary:

```bash
sudo nano /etc/keepalived/keepalived.conf
```

### 8.2 Add Configuration

```conf /etc/keepalived/keepalived.conf · primary
vrrp_instance VI_1 {
    state MASTER
    interface ens33

    virtual_router_id 51
    priority 150
    advert_int 1

    preempt

    unicast_src_ip 192.168.1.83

    unicast_peer {
        192.168.1.84
    }

    virtual_ipaddress {
        192.168.1.85/24
    }
}
```

Replace the IP addresses and interface with the values from the target environment.

## 9. Configure Keepalived on Secondary

The secondary server will take ownership of the VIP if the primary becomes unavailable.

| Parameter | Value |
| --- | --- |
| State | BACKUP |
| Primary IP | 192.168.1.83 |
| Secondary IP | 192.168.1.84 |
| VIP | 192.168.1.85 |
| Interface | ens33 |
| Priority | 100 |
| Virtual Router ID | 51 |

### 9.1 Open Configuration File

On the secondary:

```bash
sudo nano /etc/keepalived/keepalived.conf
```

### 9.2 Add Configuration

```conf /etc/keepalived/keepalived.conf · secondary
vrrp_instance VI_1 {
    state BACKUP
    interface ens33

    virtual_router_id 51
    priority 100
    advert_int 1

    preempt

    unicast_src_ip 192.168.1.84

    unicast_peer {
        192.168.1.83
    }

    virtual_ipaddress {
        192.168.1.85/24
    }
}
```

> The `virtual_router_id`, `advert_int`, and VIP must match the primary configuration.

## 10. Start Keepalived

Perform this step on both servers.

### 10.1 Enable and Start Service

```bash
sudo systemctl enable --now keepalived
```

### 10.2 Check Service Status

```bash
sudo systemctl status keepalived
```

```output
Active: active (running)
```

### 10.3 Check Keepalived Logs

If there is a problem:

```bash
sudo journalctl -u keepalived -n 100 --no-pager
```

# Verify

## 11. Verify VIP

The VIP should initially be assigned to the primary server.

### 11.1 Check Primary

Run on the primary:

```bash
ip addr show ens33
```

```output
inet 192.168.1.83/24
inet 192.168.1.85/24
```

The second address is the VIP.

### 11.2 Check Secondary

Run on the secondary:

```bash
ip addr show ens33
```

```output
inet 192.168.1.84/24
```

The VIP should not be present on the secondary while the primary is active.

### 11.3 Quick VIP Check

On either server:

```bash
ip addr | grep 192.168.1.85
```

## 12. Test VIP Connectivity

From another machine on the same network:

```bash
ping -c 4 192.168.1.85
```

```output
4 packets transmitted, 4 received, 0% packet loss
```

Check the neighbor/ARP entry:

```bash
ip neigh show 192.168.1.85
```

## 13. Configure Syslog Clients

Configure all syslog clients to send logs to the VIP.

| Setting | Value |
| --- | --- |
| Server | 192.168.1.85 |
| Port | 1539 |
| Protocol | UDP |

> Clients should use the VIP instead of the primary or secondary server IP.

## 14. Configure Linux Test Client

A Linux server can be used to test the syslog connection.

### 14.1 Install rsyslog

```bash
sudo apt update
sudo apt install rsyslog -y
```

### 14.2 Start rsyslog

```bash
sudo systemctl enable --now rsyslog
```

### 14.3 Configure Syslog Destination

Edit `/etc/rsyslog.conf`:

```bash
sudo nano /etc/rsyslog.conf
```

Add:

```conf /etc/rsyslog.conf
*.* @192.168.1.85:1539
```

The single `@` sends logs using UDP.

### 14.4 Restart rsyslog

```bash
sudo systemctl restart rsyslog
```

### 14.5 Send Test Log

```bash
logger "LOGSCALE_HA_TEST_PRIMARY"
```

## 15. Verify Syslog Traffic

On the active Collector, install tcpdump if required:

```bash
sudo apt install tcpdump -y
```

Start packet capture:

```bash
sudo tcpdump -i ens33 udp port 1539 -n
```

Send another test message:

```bash
logger "LOGSCALE_HA_TEST_PRIMARY"
```

The Collector should receive the UDP packet.

## 16. Verify Collector Logs

On the active Collector:

```bash
sudo journalctl -u logscale-collector -f
```

Verify that the Collector is receiving and processing the event.

## 17. Verify Event in LogScale

Search the LogScale repository for `LOGSCALE_HA_TEST_PRIMARY`.

If `collector_host` is configured, verify that the event contains the hostname of the active Collector.

```output
collector_host=orin-nebula
```

# Test failover

## 18. Test Failover

Before testing failover, verify the current state.

| Check | Expected |
| --- | --- |
| Primary Collector | Running |
| Secondary Collector | Running |
| Primary Keepalived | Running |
| Secondary Keepalived | Running |
| VIP | Assigned to primary |
| Secondary | Does not have VIP |

Check the primary, then the secondary:

```bash
ip addr | grep 192.168.1.85
```

The VIP should only be present on the primary.

## 19. Stop Keepalived on Primary

On the primary:

```bash
sudo systemctl stop keepalived
```

Wait a few seconds for the secondary to detect the failure.

## 20. Verify VIP on Secondary

On the secondary:

```bash
ip addr | grep 192.168.1.85
```

```output
inet 192.168.1.85/24
```

The VIP should now be assigned to the secondary.

## 21. Test Syslog After Failover

From the test client:

```bash
logger "LOGSCALE_HA_TEST_FAILOVER"
```

Or:

```bash
echo "<134>LOGSCALE_HA_TEST_FAILOVER" | \
nc -u -w1 192.168.1.85 1539
```

On the secondary Collector, run:

```bash
sudo journalctl -u logscale-collector -f
```

You should see the secondary processing the incoming traffic. You can also verify the traffic with:

```bash
sudo tcpdump -i ens33 udp port 1539 -n
```

## 22. Verify Failover Event in LogScale

Search for `LOGSCALE_HA_TEST_FAILOVER`.

If `collector_host` is enabled, the event should show the secondary Collector.

```output
collector_host=eagle-nebula
```

## 23. Restore Primary

Start Keepalived on the primary:

```bash
sudo systemctl start keepalived
```

Because the primary has the higher priority and `preempt` is enabled, it should reclaim the VIP.

## 24. Verify VIP Returned to Primary

On the primary:

```bash
ip addr | grep 192.168.1.85
```

```output
inet 192.168.1.85/24
```

On the secondary, the same command should return nothing. The VIP should no longer be present.

## 25. Test Recovery

From the test client:

```bash
logger "LOGSCALE_HA_TEST_RECOVERY"
```

Search LogScale for `LOGSCALE_HA_TEST_RECOVERY`. If `collector_host` is enabled, verify that the event was processed by the primary again.

```output
collector_host=orin-nebula
```

# Troubleshoot

## 26. Troubleshooting

### 26.1 Keepalived Service Failed

Check the service and its logs:

```bash
sudo systemctl status keepalived
sudo journalctl -u keepalived -n 100 --no-pager
```

Verify:

| Item | Check |
| --- | --- |
| Network interface | Correct |
| Primary IP | Correct |
| Secondary IP | Correct |
| VIP | Correct |
| virtual_router_id | Same on both |
| unicast_src_ip | Correct on each server |
| unicast_peer | Points to other server |

### 26.2 VIP Does Not Move to Secondary

Check:

```bash
sudo systemctl status keepalived
sudo journalctl -u keepalived -n 100 --no-pager
```

Verify that the secondary has `state BACKUP` and `priority 100`, and the primary has `state MASTER` and `priority 150`. Also verify connectivity between the two servers.

### 26.3 Collector Is Not Listening

```bash
sudo ss -ulnp | grep 1539
sudo systemctl status logscale-collector
sudo journalctl -u logscale-collector -n 100 --no-pager
```

Validate configuration:

```bash
sudo logscale-collector config validate \
  --cfg /etc/logscale-collector/config.yaml
```

### 26.4 Syslog Packets Are Not Received

```bash
sudo tcpdump -i ens33 udp port 1539 -n
```

Verify:

| Item | Expected |
| --- | --- |
| Destination IP | VIP |
| Destination port | 1539 |
| Protocol | UDP |
| VIP reachable | Yes |
| Firewall | Port allowed |
| Collector | Running |
| Collector port | Listening |

Check firewall:

```bash
sudo ufw status
```

## 27. Useful Commands

| Purpose | Command |
| --- | --- |
| Show IP addresses | `ip addr` |
| Show network interfaces | `ip link` |
| Show routes | `ip route` |
| Check VIP | `ip addr \| grep <VIP_IP>` |
| Check VIP neighbor | `ip neigh show <VIP_IP>` |
| Check Keepalived | `sudo systemctl status keepalived` |
| Keepalived logs | `sudo journalctl -u keepalived -f` |
| Check Collector | `sudo systemctl status logscale-collector` |
| Collector logs | `sudo journalctl -u logscale-collector -f` |
| Check syslog port | `sudo ss -ulnp \| grep <SYSLOG_PORT>` |
| Capture syslog traffic | `sudo tcpdump -i <INTERFACE> udp port <SYSLOG_PORT> -n` |
| Validate Collector config | `sudo logscale-collector config validate --cfg <CONFIG_PATH>` |
| Monitor Collector | `logscale-collector monitor --cfg <CONFIG_PATH>` |
| Collector metrics | `logscale-collector metrics --cfg <CONFIG_PATH>` |
| Test Collector connectivity | `sudo logscale-collector ping --cfg <CONFIG_PATH>` |
| Export debug information | `logscale-collector export-debug --cfg <CONFIG_PATH>` |

## 28. Deployment Verification

Complete the following checks after implementation.

| Check | Primary | Secondary |
| --- | --- | --- |
| Correct IP configured | [ ] | [ ] |
| Correct interface identified | [ ] | [ ] |
| LogScale Collector installed | [ ] | [ ] |
| Collector configuration validated | [ ] | [ ] |
| Collector service running | [ ] | [ ] |
| Syslog port listening | [ ] | [ ] |
| Keepalived installed | [ ] | [ ] |
| Keepalived configured | [ ] | [ ] |
| VIP configuration correct | [ ] | [ ] |
| Server-to-server connectivity | [ ] | [ ] |

### Client Verification

| Check | Status |
| --- | --- |
| Client configured with VIP | [ ] |
| Correct syslog port | [ ] |
| UDP configured | [ ] |
| Test event received | [ ] |
| Event visible in LogScale | [ ] |

### Failover Verification

| Test | Expected Result | Status |
| --- | --- | --- |
| Primary owns VIP | VIP on primary | [ ] |
| Stop primary Keepalived | Secondary detects failure | [ ] |
| Secondary takes VIP | VIP on secondary | [ ] |
| Send test log | Secondary receives log | [ ] |
| Event appears in LogScale | Event received | [ ] |
| Restore primary | Primary reclaims VIP | [ ] |
| Send recovery log | Primary receives log | [ ] |

## 29. Final Architecture

### Normal Operation

```diagram
Syslog Client
     |
     | UDP :1539
     v
Virtual IP
192.168.1.85
     |
     v
Primary Collector
192.168.1.83
     |
     v
Falcon LogScale
```

### During Primary Failure

```diagram
Syslog Client
     |
     | UDP :1539
     v
Virtual IP
192.168.1.85
     |
     v
Secondary Collector
192.168.1.84
     |
     v
Falcon LogScale
```

The syslog clients continue sending logs to the same Virtual IP during failover. No client-side destination change is required.
