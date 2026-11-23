import type { ShotKind } from "@/lib/content"

/** Lightweight drawn previews that stand in for project screenshots. */
export function ProjectShot({ kind }: { kind: ShotKind }) {
  switch (kind) {
    case "ioc":
      return (
        <div className="inner">
          <div className="ui-top"><span>opensoc / ioc-lookup</span><span>3 indicators</span></div>
          <div className="ui-title">Investigate any IOC in seconds</div>
          <div className="ui-row"><span>185.220.101.4 · Tor exit node</span><span className="sev s-hi">High</span></div>
          <div className="ui-row"><span>invoice-update[.]top · domain age 3d</span><span className="sev s-md">Medium</span></div>
          <div className="ui-row"><span>44d88612… · EICAR test file</span><span className="sev s-lo">Known</span></div>
        </div>
      )
    case "vault":
      return (
        <div className="inner">
          <div className="ui-top"><span>vaultlock</span><span>end-to-end encrypted</span></div>
          <div className="ui-title">Your passwords, encrypted before they leave the device</div>
          <div className="vault">
            {[["GitHub", 12], ["AWS Console", 10], ["Gmail", 11], ["Bank", 8]].map(([n, len]) => (
              <div key={n as string}><b>{n}</b><small>{"•".repeat(len as number)}</small></div>
            ))}
          </div>
        </div>
      )
    case "policy":
      return (
        <div className="inner">
          <div className="ui-top"><span>sentinelgate / policy.log</span><span>agent: support-bot</span></div>
          <div className="ui-title">Guardrails for AI tool calls</div>
          <div className="ui-row"><span>search_docs(query=&quot;refund policy&quot;)</span><span className="sev s-lo">Allow</span></div>
          <div className="ui-row"><span>send_email(to=&quot;*@external.com&quot;)</span><span className="sev s-md">Review</span></div>
          <div className="ui-row"><span>run_shell(&quot;curl … | sh&quot;)</span><span className="sev s-hi">Block</span></div>
        </div>
      )
    case "bars":
      return (
        <div className="inner">
          <div className="ui-top"><span>nids / live traffic</span><span>alerts per minute</span></div>
          <div className="ui-title">Rule-based intrusion alerts, in real time</div>
          <div className="bars" aria-hidden="true">
            {[30, 42, 28, 55, 38, 90, 64, 34, 46, 30, 72, 40, 26, 50].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )
    case "intel":
      return (
        <div className="inner">
          <div className="ui-top"><span>threatintel / reputation</span><span>SIEM sync on</span></div>
          <div className="ui-title">IP reputation and IOC management</div>
          <div className="ui-row"><span>45.155.205.233 · 37 reports · scanner</span><span className="sev s-hi">Malicious</span></div>
          <div className="ui-row"><span>8.8.8.8 · Google DNS</span><span className="sev s-lo">Clean</span></div>
        </div>
      )
    case "cql":
      return (
        <div className="inner">
          <div className="ui-top"><span>falcon / advanced event search</span><span>last 24h</span></div>
          <div className="ui-title">Hunt encoded PowerShell across every host</div>
          <div className="code">
            <b>#event_simpleName</b>=<i>ProcessRollup2</i>{"\n| "}<b>CommandLine</b>=<i>/powershell.*-enc/i</i>{"\n| "}<b>groupBy</b>([ComputerName], function=count())
          </div>
          <div className="ui-row"><span>FIN-LAPTOP-07</span><span className="sev s-hi">14 hits</span></div>
          <div className="ui-row"><span>HR-DESKTOP-02</span><span className="sev s-md">3 hits</span></div>
        </div>
      )
    case "code":
      return (
        <div className="inner">
          <div className="ui-top"><span>mockini.json</span><span>$ npx mockini</span></div>
          <div className="code">
            {"{\n  "}<b>&quot;port&quot;</b>: <i>4000</i>{",\n  "}<b>&quot;routes&quot;</b>{": {\n    "}
            <b>&quot;GET /users&quot;</b>: <i>&quot;users.json&quot;</i>{",\n    "}
            <b>&quot;POST /login&quot;</b>{": { "}<b>&quot;status&quot;</b>: <i>200</i>{" }\n  }\n}"}
          </div>
        </div>
      )
  }
}
