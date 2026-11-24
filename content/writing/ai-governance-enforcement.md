---
title: From watching AI to governing it
card: From watching AI to *governing* it
heading: From watching AI to *governing* it
date: 2026-11-24
tags: Blog, AI security, Falcon AIDR, Governance
stack: Falcon AIDR · access rules · prompt rules
summary: How access rules, prompt rules and input and output enforcement turn AI visibility into real control, with the attack techniques and enforcement actions every analyst should know.
---

# The next step

## Visibility was step one

In my [previous post](/writing/ai-visibility-investigation) I wrote about seeing AI activity: who uses which tools, which models, and how to investigate a finding. That work answers "what is happening?". This post covers what comes next, from the second scenario of CrowdStrike's Falcon AIDR workshop: deciding what is **allowed** to happen, and enforcing it.

```diagram
Visibility → Detection → Governance → Policy → Enforcement
```

In practice, governance here means controlling who can use which models and providers, restricting by location, catching prompt injection and jailbreaks, protecting PII, secrets and source code, filtering topics, languages and competitor mentions, and keeping AI agents in line through MCP validation. All of it can apply to what goes into a model, what comes out of it, or both.

## Two kinds of rule

An AIDR policy has two halves, and keeping them separate in your head makes everything else easier:

```diagram
Policy
├── Access rules   "Who is allowed to use what?"
└── Prompt rules   "Is this content safe and allowed?"
```

Access is checked first, before any prompt content is processed. If you're not allowed to reach the model, there's nothing to inspect.

# Access rules

## Who can use what

Access rules decide who reaches which AI models, providers and services. They can key on the model, the provider, the user or group, geographic location and other organisational attributes.

- **Model restrictions**: allow approved enterprise models, block unapproved or high-risk ones, or split access by role.
- **Provider restrictions**: approved provider, allow; unknown provider, block. This is the simplest way to stop company data reaching an AI vendor you have no agreement with.
- **User and group access**: for example, engineering can use coding models while finance is kept off certain external ones. One blanket policy for everyone is rarely right.
- **Geographic restrictions**: for regulation, data residency and regional rules.

# Prompt rules

## What prompt rules look for

Prompt rules inspect prompts, and responses, for security and policy problems: prompt injection, jailbreaks, malicious entities, intent violations, PII, secrets, source code, competitor mentions, restricted topics and language.

## Attacks on the model itself

**Prompt injection** tries to override the model's trusted instructions with instructions hidden in user input: ignore the rules, act differently, do something it was never meant to do.

**Jailbreaks** try to get around the model's safety restrictions so it produces a response it should refuse.

**Indirect prompt injection** is the one that worries me most for agents. The malicious instructions don't come from the user at all. They sit in external content the agent reads, like a web page, a document or a ticket, and the agent follows them:

```diagram
AI agent
   ↓
reads external content
   ↓
content carries hidden instructions
   ↓
agent follows them
   ↓
unauthorised tool call or action
```

**Intent conformance** checks whether a prompt fits the approved use. "Help debug this Python function" fits a coding assistant. A customer-support bot being asked for something unrelated does not.

**Malicious entities** are IPs, URLs and domains inside prompts. Detecting them flags suspicious infrastructure and adds context to an investigation.

## Keeping agents in their lane

Agents use MCP (Model Context Protocol) to reach tools, databases, APIs, files and services. Because they can act, controlling which tools they invoke matters as much as what they say.

MCP validation compares each tool call against the approved tools using a **tool similarity threshold**:

| Threshold | Effect |
| --- | --- |
| Higher | Stricter matching, less flexibility, more control |
| Lower | More flexibility, looser matching, needs more monitoring |

Restricting tool calls this way is also one of the better defences against indirect prompt injection: even if an agent is tricked, it can't reach a tool it isn't approved to use.

# Protecting data

## Choosing an enforcement action

When a rule finds PII or confidential data, you choose what happens. This is where I think the real design work is, because the right answer depends on the business need:

| Action | What happens | When I'd use it |
| --- | --- | --- |
| Block | The prompt is stopped and never processed | Data that must never reach a model |
| Replace | The value is swapped for a placeholder like `<REDACTED>` | Let the conversation continue without the real value |
| Mask | The value is hidden | Hide it entirely while keeping the shape of the text |
| Partial mask | Only part is hidden, like the last four digits kept | Someone needs to recognise the value, not read it |
| Report | Logged, but the interaction continues unchanged | Learning what happens before enforcing |
| FPE | Format-preserving encryption keeps the format but encrypts the value | Downstream systems still need a valid-looking value |

For example, replace turns `My SSN is 123-45-6789` into `My SSN is <REDACTED>`, and a partial mask turns a card number into one that only shows its last four digits:

```output
4111 1111 1111 1111  →  XXXX XXXX XXXX 1111
```

> **Report is not block.** A report-only rule gives visibility, not protection. That's a valid first step, as long as everyone knows which one is switched on.

## What counts as sensitive

PII rules cover dates and times, URLs, money, location data, person IDs (social security, national ID, passport, driving licence), financial numbers (cards, bank accounts, routing numbers), medical IDs, international IDs, phone numbers and email addresses.

Secrets and keys rules cover cloud credentials, GitHub tokens, API keys, JWTs, webhook URLs with embedded secrets, service-specific keys and database connection strings.

The pattern is always the same: a developer pastes something into a prompt, it goes to an external AI service, and the credential is now exposed. GitHub tokens and cloud keys deserve special attention for engineering teams, because they lead straight to code and infrastructure.

## Code, language, topics and competitors

**Code detection** recognises source code in prompts (Python, JavaScript, Java, C++, Go and more). The smart part is per-application enforcement: allow code in the approved coding assistant, and block or restrict it on unapproved AI sites. Developers keep their tools, and proprietary code stays in approved places.

**Language controls** can report, allow only approved languages (say English and Nepali), or block specific ones, for compliance, moderation or operational reasons.

**Topic and content filters** cover areas like legal advice, religion, politics, toxicity, health coverage, role play, self-harm, criminal conduct and negative sentiment.

**Competitor mentions** use a custom list to keep customer-facing assistants from naming competitors or their products.

# Enforcing it

## Input, output, or both

This was the most important idea in the scenario for me. AI risk isn't only in what users type. It's also in what the model says back.

- **Input enforcement** checks the prompt before the model sees it. If an API key is detected and blocked, the model never receives it.
- **Output enforcement** checks the response before the user or system sees it. Models can produce sensitive or confidential data, unsafe or hallucinated content, policy-breaking content, or output shaped by an indirect prompt injection.
- **Bidirectional enforcement** does both: a policy check on the way in, and another on the way out.

## How a request is evaluated

```diagram
AI request
   ↓
Access rules ── not allowed ──→ BLOCK
   │
 allowed
   ↓
Input check  (PII, secrets, injection, code)
   ↓
AI model
   ↓
Output check (response content)
   ↓
Enforcement: allow · block · modify · report
```

## Questions I ask about a policy event

| Area | Questions |
| --- | --- |
| Identity | Who performed the action? |
| Access | Which provider and model? Was the model approved? |
| Content | What was submitted? Any PII, secrets or source code? |
| Technique | Prompt injection, jailbreak, indirect injection, malicious entity? |
| Context | Which application and collector? When? Which trace ID? |
| Enforcement | Allowed, blocked, reported, masked, replaced or encrypted? |
| Impact | Was data or a credential exposed? Could it be abused? Did the model produce harmful output? |

# Takeaways

## The attacks to remember

| Technique | Meaning |
| --- | --- |
| Prompt injection | Manipulating the model's instructions |
| Jailbreak | Bypassing the model's safety restrictions |
| Indirect prompt injection | Instructions smuggled in through external content |
| Malicious entity | A suspicious IP, URL or domain in AI activity |
| Intent violation | AI used outside its approved purpose |
| Tool abuse | An agent invoking tools it shouldn't |
| Secret, PII or code exposure | Credentials, personal data or proprietary code sent to AI |

## What it all adds up to

The first scenario taught visibility. This one teaches governance, access control and enforcement:

```diagram
Visibility
   ↓
Detection
   ↓
Access control        "Can they use it?"
   ↓
Content inspection    "Is the input safe?"
   ↓
Data protection
   ↓
Agent protection
   ↓
Input + output enforcement   "Is the response safe?"
   ↓
Governance
```

For a SOC or SIEM analyst, the skill isn't knowing where each toggle is. It's knowing why each control exists, what telemetry it produces, which attack or risk it covers, and which enforcement action fits.
