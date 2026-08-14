---
name: Semgrep
slug: semgrep
vendor: Semgrep
entryType: github_app
status: active
summary: "Static analysis tool that finds security vulnerabilities and code style issues using pattern-based rules."
problem: "Security bugs and inconsistent code patterns are hard to catch manually. Semgrep detects them early using custom rules."
bestFor:
  - "Teams wanting to enforce custom security and style rules"
  - "Projects needing to find vulnerabilities in multiple languages"
notFor:
  - "Teams that only need basic linting"
  - "Projects without the bandwidth to maintain rule sets"
categories:
  - security
  - code-review
tags:
  - "static-analysis"
  - "security-scanning"
  - "custom-rules"
installationModels:
  - github_app
  - github_action
githubSurfaces:
  - "pull requests"
  - "security overview"
capabilities:
  - "pattern-based scanning"
  - "custom rules"
  - "multi-language"
  - "CI integration"
permissions:
  - resource: contents
    access: read
    purpose: "Read source code for static analysis."
    scope: repository
  - resource: pull-requests
    access: write
    purpose: "Post scan results on pull requests."
    scope: repository
  - resource: metadata
    access: read
    purpose: "Identify the repository and organization."
    scope: account
accessSummary: "Semgrep reads source code to run its rule engine. On-prem deployment is available for teams that need to keep analysis in-VPC."
dataAccess:
  - "source code"
  - "scan results"
dataLeavesGitHub: unknown
setupLevel: medium
maintenanceLevel: medium
pricingModel: freemium
freeTier: true
pricingSummary: "Open-source CLI is free. Semgrep Cloud Platform paid plans start at $49/month for teams."
privacySummary: "Self-hosted on-prem deployment keeps all data within your infrastructure. Cloud plans process scans on Semgrep infra."
strengths:
  - "Excellent pattern-matching across 30+ languages"
  - "Can run locally or in CI"
limitations:
  - "Rule maintenance requires ongoing investment"
  - "Cloud platform pricing scales with active developers"
alternatives:
  - codeql
  - snyk-code
  - eslint
officialUrl: https://semgrep.dev
documentationUrl: https://semgrep.com/docs
pricingUrl: https://semgrep.com/pricing
githubRepository:
  url: https://github.com/returntocorp/semgrep
  owner: returntocorp
  name: semgrep
sources:
  - label: "Semgrep docs"
    url: https://semgrep.com/docs
    type: documentation
    checkedAt: 2026-08-13
  - label: "Semgrep pricing"
    url: https://semgrep.com/pricing
    type: pricing
    checkedAt: 2026-08-13
agentUseCase: "static-analysis"
monetized: true
affiliateLink: https://semgrep.com/signup
reviewedAt: 2026-08-13
nextReviewAt: 2026-11-11
reviewStatus: verified
volatility: medium
seoTitle: 'Semgrep for GitHub: Setup, Permissions, and Alternatives'
seoDescription: "Static analysis tool finding security vulnerabilities with pattern-based rules. Compare Semgrep pricing and alternatives."
---

## Why it belongs in a baseline

Semgrep (Semgrep) addresses security and code-review concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.

## For agents

**Question:** Does this project need Semgrep?

Static analysis tool that finds security vulnerabilities and code style issues using pattern-based rules. It Data access is deployment-dependent.

**Required permissions:**
**contents** (read): Read source code for static analysis.
**pull-requests** (write): Post scan results on pull requests.
**metadata** (read): Identify the repository and organization.

**Setup effort:** medium
**Ongoing maintenance:** medium
**Pricing model:** freemium (free tier available)
**Alternatives in this directory:** codeql, snyk-code, eslint

**Review links:** <https://semgrep.com/docs>

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.
