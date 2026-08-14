---
name: Sentry
slug: sentry
vendor: Sentry
entryType: github_app
status: active
summary: "Error and performance monitoring that surfaces crashes and slow transactions from production code."
problem: "Runtime errors in production are invisible until users report them. Sentry captures and groups exceptions so teams can fix them before support tickets pile up."
bestFor:
  - "Backed web applications with user-facing error surfaces"
  - "Teams that need release correlation and performance tracing"
notFor:
  - "Local or internal-only tools with no user surface"
  - "Projects that prefer self-hosted monitoring"
categories:
  - observability
  - ci-cd
tags:
  - "error-monitoring"
  - "apm"
  - "performance"
  - "release-monitoring"
installationModels:
  - github_app
githubSurfaces:
  - "pull requests"
  - "commits"
capabilities:
  - "error tracking"
  - "performance monitoring"
  - "release correlation"
  - "session replay"
permissions:
  - resource: contents
    access: read
    purpose: "Read source and commit metadata to correlate errors with code."
    scope: repository
  - resource: metadata
    access: read
    purpose: "Identify the repository and organization for account linking."
    scope: account
accessSummary: "Sentry reads commit metadata to correlate errors with releases. Application code is not sent to Sentry; only error events captured by the SDK are transmitted."
dataAccess:
  - "error events"
  - "performance traces"
  - "release metadata"
dataLeavesGitHub: yes
setupLevel: medium
maintenanceLevel: low
pricingModel: freemium
freeTier: true
pricingSummary: "Free tier includes 5k errors and 1k traces per month. Paid plans start at $26/month for teams."
privacySummary: "Error events and performance traces are sent to Sentry Inc. Review Sentry's privacy policy for data retention details."
strengths:
  - "Excellent release and deploy correlation"
  - "Strong ecosystem across 30+ languages"
limitations:
  - "External service dependency for production monitoring"
  - "Error volume can grow quickly on dynamic front-ends"
alternatives:
  - glitchtip
  - rollbar
  - prometheus
officialUrl: https://sentry.io
documentationUrl: https://docs.sentry.io
pricingUrl: https://sentry.io/pricing/
githubRepository:
  url: https://github.com/getsentry/sentry
  owner: getsentry
  name: sentry
sources:
  - label: "Sentry documentation"
    url: https://docs.sentry.io
    type: documentation
    checkedAt: 2026-08-13
  - label: "Sentry pricing"
    url: https://sentry.io/pricing/
    type: pricing
    checkedAt: 2026-08-13
agentUseCase: "error-monitoring"
monetized: true
affiliateLink: https://sentry.io/signup/?referrer=must-have-github-apps
reviewedAt: 2026-08-13
nextReviewAt: 2026-11-11
reviewStatus: verified
volatility: medium
seoTitle: 'Sentry for GitHub: Setup, Permissions, and Alternatives'
seoDescription: "Error and performance monitoring that surfaces crashes and slow transactions. Compare Sentry pricing and alternatives."
---

## Why it belongs in a baseline

Sentry (Sentry) addresses observability and ci-cd concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.

## For agents

**Question:** Does this project need Sentry?

Error and performance monitoring that surfaces crashes and slow transactions from production code. It It sends data outside GitHub.

**Required permissions:**
**contents** (read): Read source and commit metadata to correlate errors with code.
**metadata** (read): Identify the repository and organization for account linking.

**Setup effort:** medium
**Ongoing maintenance:** low
**Pricing model:** freemium (free tier available)
**Alternatives in this directory:** glitchtip, rollbar, prometheus

**Review links:** <https://docs.sentry.io>

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.
