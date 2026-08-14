---
name: Datadog
slug: datadog
vendor: Datadog
entryType: github_app
status: active
summary: "Infrastructure and application monitoring with distributed tracing, logs, and synthetic checks."
problem: "Production performance issues are hard to diagnose without correlated telemetry. Datadog unifies metrics, traces, and logs in one platform."
bestFor:
  - "Teams running complex distributed systems"
  - "Organizations needing infrastructure + application monitoring"
notFor:
  - "Small projects with simple hosting"
  - "Teams that only need error tracking"
categories:
  - observability
  - ci-cd
tags:
  - "infrastructure-monitoring"
  - "apm"
  - "distributed-tracing"
  - "log-management"
installationModels:
  - github_app
githubSurfaces:
  - "pull requests"
  - "commits"
capabilities:
  - "infrastructure metrics"
  - "distributed tracing"
  - "log management"
  - "synthetic monitoring"
permissions:
  - resource: contents
    access: read
    purpose: "Read commit metadata to correlate deployments with traces."
    scope: repository
  - resource: metadata
    access: read
    purpose: "Identify the repository and organization for integration."
    scope: account
accessSummary: "Datadog reads commit metadata for release tracking. The Datadog Agent and SDK instrumentation collect telemetry; source code is not sent to Datadog."
dataAccess:
  - "metrics"
  - "traces"
  - "logs"
  - "service checks"
dataLeavesGitHub: yes
setupLevel: high
maintenanceLevel: medium
pricingModel: paid
freeTier: false
pricingSummary: "Paid service. Infrastructure monitoring starts at $15/host/month; APM starts at $43/container/month."
privacySummary: "Telemetry data is sent to Datadog. Review their privacy policy for data retention and processing details."
strengths:
  - "Comprehensive observability platform"
  - "Excellent integration ecosystem"
limitations:
  - "Complex setup for distributed tracing"
  - "Pricing scales quickly with infrastructure size"
alternatives:
  - new-relic
  - sentry
  - cloudwatch
officialUrl: https://datadoghq.com
documentationUrl: https://docs.datadoghq.com
pricingUrl: https://www.datadoghq.com/pricing/
sources:
  - label: "Datadog docs"
    url: https://docs.datadoghq.com
    type: documentation
    checkedAt: 2026-08-13
  - label: "Datadog pricing"
    url: https://www.datadoghq.com/pricing/
    type: pricing
    checkedAt: 2026-08-13
agentUseCase: "observability"
monetized: true
affiliateLink: https://dpr.dev/6kU0fY6v
reviewedAt: 2026-08-13
nextReviewAt: 2026-11-11
reviewStatus: verified
volatility: medium
seoTitle: 'Datadog for GitHub: Setup, Permissions, and Alternatives'
seoDescription: 'Infrastructure and application monitoring with distributed tracing, logs, and synthetic checks. Compare Datadog pricing, permissions, setup effort, limitations, and alternatives for GitHub.
---

## Why it belongs in a baseline

Datadog (Datadog) addresses observability and ci-cd concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.

## For agents

**Question:** Does this project need Datadog?

Infrastructure and application monitoring with distributed tracing, logs, and synthetic checks. It It sends data outside GitHub.

**Required permissions:**
**contents** (read): Read commit metadata to correlate deployments with traces.
**metadata** (read): Identify the repository and organization for integration.

**Setup effort:** high
**Ongoing maintenance:** medium
**Pricing model:** paid
**Alternatives in this directory:** new-relic, sentry, cloudwatch

**Review links:** https://docs.datadoghq.com

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.
