---
title: You can't secure AI you can't see
card: You can't secure *AI* you can't see
heading: You can't secure *AI* you can't see
date: 2026-11-24
tags: Blog, AI security, Falcon AIDR, SOC
stack: Falcon AIDR · Next-Gen SIEM
summary: What I learned about AI visibility and investigation from CrowdStrike's Falcon AI Detection and Response workshop, and the SOC method I now use when an AI finding lands in the queue.
---

# Why this matters

## AI is the newest place data leaves the building

Every team I work with now uses AI somewhere. Engineers paste stack traces into chat assistants, support teams run chatbots, and product teams wire models straight into their applications. Each of those is a new path for data to leave the organisation, and a new surface for an attacker to talk to.

I recently completed CrowdStrike's **Securing AI with Falcon AI Detection & Response** workshop. These are my notes from it, rewritten as the investigation approach I would actually use in a SOC. The product is Falcon AIDR, but the thinking transfers to any AI security tooling.

The core lesson fits in one line:

> Before an organisation can govern or block AI activity, it first needs visibility into how AI is being used.

## Two problems, two kinds of protection

The first thing that clicked for me is that "AI security" is really two different problems.

| | AIDR for Workforce | AIDR for Agents |
| --- | --- | --- |
| Who is using AI | People, through a browser | Applications and autonomous agents |
| Where it sits | Browser collector | SDK, API or gateway at runtime |
| Main risk | Employees pasting sensitive data into AI tools | Attacks on, or misuse of, AI built into apps |
| Example threat | Customer PII copied into a public chatbot | Prompt injection against a customer chatbot |
| How it protects | Inspects browser traffic as people type or upload | Inspects inputs to and outputs from the AI system |

The question I now ask first is simple: **is a human using an AI tool, or is AI built into an application?** The answer decides which telemetry I should expect and which controls apply.

### Workforce: people using AI tools

On the workforce side, the goals are practical:

- **Monitor AI usage** across the organisation.
- **Detect and prevent data leakage** from prompts.
- **Discover shadow AI**: tools nobody approved.
- **Maintain compliance and protect IP**, for example a healthcare worker sharing patient data with an AI tool (a HIPAA problem), or an employee describing an unreleased product.

### Agents: AI inside your applications

Agents raise the stakes because they can act, not just answer. The workshop framed four uses:

- **Block malicious prompts**: prompt injection and jailbreaks that try to make a chatbot reveal its system instructions, skip its safety controls or reach data it shouldn't.
- **Prevent data exposure**: for example a chatbot sending one customer's details to another, or an app sending sensitive data to a model provider.
- **Control autonomous actions**: agents with tool access visiting malicious sites, chaining tools into dangerous commands, or spinning up cloud resources nobody is watching.
- **Protect compliance and reputation**: a healthcare scheduling bot must never produce non-compliant medical content.

A useful split I'll keep: Falcon Cloud Security watches the infrastructure; AIDR protects the AI applications running on it. Both feed the same console and Next-Gen SIEM, so AI events can be correlated with identity and cloud activity.

# Seeing the activity

## The questions an analyst asks

From an analyst's chair, AI visibility is a chain of questions:

```diagram
Who is using AI?
   ↓
Which application?
   ↓
Which AI model?
   ↓
What was submitted?
   ↓
Is it risky?
   ↓
Which detection or policy fired?
   ↓
What action was taken?
```

The visibility dashboard answers the first half of that chain: users, applications, models, events, detections, policy violations, token usage and the collectors sending data. The most useful view is the **user → application → model** flow, because it makes the odd paths stand out: an unexpected model, an unusual application, or AI use outside any approved process.

## Collectors decide what you can see

A collector is where AI telemetry is captured, and each type sees a different slice:

| Collector | What it shows |
| --- | --- |
| Browser | Workforce AI use in the browser. The main way to find shadow AI. |
| Application | AI features built into enterprise apps and production workflows. |
| Gateway | AI traffic passing through an enterprise gateway. |
| Agentic | Agents calling tools, databases and APIs to take actions. |
| MCP | Agents using the Model Context Protocol to reach external tools and resources. |

AI can be reached through a browser, an app, a gateway, an API, an agent or an MCP tool. Watching only the browser leaves gaps. More collectors means more telemetry, which means better detection and better investigations.

Filtering by collector type is underrated. It scopes an investigation to one source, shows whether risky behaviour clusters around one access method, and proves a control works on every source, not just one.

## Three kinds of risky prompt

AIDR groups risky activity into three categories:

- **Malicious prompt**: adversarial techniques aimed at the model.
- **Confidential / PII**: personal or sensitive business data sent to an external AI service.
- **Secrets and keys**: API keys, passwords, tokens, private keys or other credentials inside a prompt.

Of the three, a secret in a prompt is the one I'd treat as most urgent. It may already be outside your control.

# Reading a finding

## Visibility versus a finding

Visibility answers "what is happening?". A finding answers "what exactly happened, why was it flagged, and what context do we have?". A finding carries the status, detection results, confidence score, PII and secrets results, the action taken, a trace ID, timestamps, the user and their organisational context, the collector, the application, the model and the prompt itself.

## The fields that change your conclusion

**Status: Reported** means the prompt reached the model and was logged as a policy event. It does not mean it was stopped.

> **Detection is not enforcement.** A control can detect and report an event without blocking it. Never read "reported" as "blocked".

**Confidence score** is how sure the engine is. A score of 0.95 means 95% confidence that the activity matches the detected pattern.

**PII** and **Secrets and keys** tell you whether sensitive data was found. A secrets hit deserves priority.

**Trace ID** links related events, so you can follow one activity across several records and build a timeline.

**Timestamps** give you the order of events:

```text
10:31:02.102  user opens the AI application
10:31:03.421  prompt submitted
10:31:03.522  detection triggered
10:31:03.600  event reported
```

**Token usage** is both a cost signal and an anomaly signal. A user who normally uses 5,000 tokens a day and suddenly uses 500,000 may be running automation, abusing access or leaking data in bulk.

# Investigating

## My investigation method

The workshop pushed one point hard: learn the method, not the buttons. This is the order I work through:

1. Identify the user.
2. Identify the application.
3. Identify the AI model.
4. Identify the collector, the source of the telemetry.
5. Review the detection.
6. Review the prompt.
7. Check for PII.
8. Check for secrets and keys.
9. Review the confidence score.
10. Check the timestamps.
11. Correlate by trace ID.
12. Decide the impact.
13. Decide whether it was intentional.
14. Decide the response.

## A worked example

Here is the kind of finding the workshop walked through:

| Field | Value |
| --- | --- |
| User | John |
| Application | Chrome |
| AI service | External AI application |
| Model | AI Model X |
| Malicious prompt | True |
| Confidence | 95% |
| PII | Not detected |
| Secrets / keys | Detected |
| Action | Reported |
| Collector | Chrome collector |
| Trace ID | ABC123 |

**My read:** John submitted a prompt with likely adversarial content, and the engine is highly confident. There's no PII, but there is a secret. The event was reported, and nothing here says it was blocked, so I have to assume the secret reached the external service.

**What I'd ask next:**

- Why did he submit the secret, and was it valid?
- Has the credential been used since?
- Was this intentional or an accident?
- Has John done this before, and are other users doing the same thing?
- What else shares the trace ID?
- Should the credential be rotated now? (Almost certainly yes.)
- Do we need a new AI policy to stop this happening again?

# Takeaways

## The mental model I keep

```diagram
AI telemetry
   ↓
Visibility
   ↓
Detection
   ↓
Context
   ↓
Investigation
   ↓
Correlation
   ↓
Risk assessment
   ↓
Response
```

An analyst shouldn't stop at "a detection occurred". The job is to answer who, what, when, where, how and why, what was affected, what happened next, and what should be done.

That's the transferable part: the Falcon console is just where the investigation happens. Visibility comes first, and governance comes after it. That's what the [next post on AI governance and enforcement](/writing/ai-governance-enforcement) covers.
