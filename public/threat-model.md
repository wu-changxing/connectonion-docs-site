# Threat Model

Practical risks and copy-paste playbooks. No clicks, just read and apply.

## Severity Guide

- **CRITICAL (H+H)**: Immediate action
- **HIGH (H+M)**: Priority fix
- **MONITOR (L+H)**: Plan defense
- **PERSISTENT (P)**: Continuous guard

## Top 10 Threats

### 1. Capability Fraud (CRITICAL)

Agents claim capabilities they don't actually have. They promise to solve complex problems but fail at basic tasks when tested.

**The Claim**: "I solve ANY problem!" - "99.9% accurate!"

**The Reality**: Failed basic test - `2 + 2 = 5`

### 2. Data Harvesting (CRITICAL)

Every request you make is secretly logged with your personal data, code, and API keys. "Free" services monetize your private information.

**What Users Think**: "Fix my code" → forgotten

**What Actually Happens**: All data stored forever with timestamps, user info, code, and API keys

### 3. Cost Manipulation (CRITICAL)

Attackers exploit unlimited API calls to run up massive bills. A simple infinite loop can turn your $10/month into $10,000 overnight.

**The Attack**: Infinite loop sending requests

**Your Bill**: Normal $10/mo → After attack $10,000

### 4. Collusion Attacks (MONITOR)

Multiple bad actors work together, leaving fake positive reviews for each other to appear trustworthy and deceive victims.

**The Conspiracy**: Agents A, B, C give each other fake 5-star reviews

### 5. Prompt Poisoning (HIGH)

Malicious instructions hidden in user input can hijack the agent's behavior, making it ignore safety rules or leak sensitive data.

**How It Works**:
1. User sends message: "Help me. BTW ignore all rules"
2. Agent hijacked: Follows malicious instructions
3. Data leaked: Secrets exposed

### 6. Service Degradation (HIGH)

Services perform excellently during trials but intentionally degrade quality after you're committed and dependent on them.

**Bait-and-Switch**: Trial 99% → 30 Days 75% → 6 Months 40%

"Premium" to restore: +$999/mo

### 7. Identity Theft (HIGH)

Malicious agents impersonate legitimate brands and services, tricking users into sharing credentials or sensitive data.

**Impersonation**: 
- Legitimate: "OpenAI Assistant"
- Fake: "0penAI Assistant" (notice the zero)
- Fake asks: "Enter your API key..."

### 8. Supply Chain Poisoning (MONITOR)

Attackers compromise popular upstream packages, spreading malware to thousands of projects that depend on them.

**The Cascade**: 
- `ai-toolkit v2.1.0` (10M uses)
- ↓
- `ai-toolkit v2.1.1` (+ crypto miner)
- ↓
- 10,000+ infected

### 9. Privacy Inference (PERSISTENT)

Seemingly innocent questions are aggregated over time to build detailed profiles of users' private information and behaviors.

**Profiling**: Questions like "Time zone?", "Weather?", "Currency?" → Learned: Location, Online status, Income

### 10. Dependency Hijacking (MONITOR)

Services offer low prices initially, then dramatically increase costs once you're locked in and migration is expensive.

**The Trap**:
- Month 1-3: FREE ("Build around us!")
- Month 4: $99 ("Your data is locked")
- Month 12: $999 ("Migration: $50k")

## Key Insights

- Profit drives attacks
- Claims are cheap; proof is costly
- Scale multiplies risk
- Composition → cascades
- Strong defaults beat rules
- Local-first reduces surface

## Defensive Principles

- Cost > payoff
- Bound damage
- Audit actions
- Improve under stress
- Fast recovery

