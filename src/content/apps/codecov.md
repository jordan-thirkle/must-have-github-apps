---
name: Codecov
slug: codecov
vendor: Codecov
entryType: github_app
status: active
summary: "Code coverage reporting that uploads and aggregates test coverage from pull requests and CI."
problem: "Coverage drops silently as code grows. Codecov surfaces coverage gaps directly in pull requests so they are not missed during review."
bestFor:
  - "Projects with CI pipelines that run tests"
  - "Teams enforcing coverage gates before merge"
notFor:
  - "Projects without automated tests"
  - "Teams that do not act on coverage reports"
categories:
  - ci-cd
  - code-review
tags:
  - "code-coverage"
  - "testing"
  - "ci-integration"
installationModels:
  - github_app
githubSurfaces:
  - "pull requests"
  - "commits"
capabilities:
  - "coverage reporting"
  - "diff coverage"
  - "coverage status checks"
permissions:
  - resource: contents
    access: read
    purpose: "Read source files and pull requests to display coverage context."
    scope: repository
  - resource: statuses
    access: write
    purpose: "Post coverage status checks on commits and pull requests."
    scope: repository
  - resource: metadata
    access: read
    purpose: "Identify the repository and organization."
    scope: account
accessSummary: "Codecov reads test coverage reports uploaded by CI. It does not access source code beyond what CI sends."
dataAccess:
  - "coverage reports"
  - "test results"
dataLeavesGitHub: yes
setupLevel: medium
maintenanceLevel: low
pricingModel: freemium
freeTier: true
pricingSummary: "Free tier for public repos. Private repos require a paid plan starting at $10/repo/month."
privacySummary: "Coverage reports and test metadata are processed by Codecov. Review their privacy policy for data handling."
strengths:
  - "Wide CI provider support"
  - "Clear diff coverage visualization"
limitations:
  - "Coverage reports are an external dependency"
  - "Free tier does not support private repos"
alternatives:
  - coveralls
  - codacy
  - cobertura
officialUrl: https://about.codecov.io
documentationUrl: https://docs.codecov.com
pricingUrl: https://about.codecov.io/pricing/
sources:
  - label: "Codecov docs"
    url: https://docs.codecov.com
    type: documentation
    checkedAt: 2026-08-13
  - label: "Codecov pricing"
    url: https://about.codecov.io/pricing/
    type: pricing
    checkedAt: 2026-08-13
agentUseCase: "testing"
monetized: true
affiliateLink: https://about.codecov.io/signup
reviewedAt: 2026-08-13
nextReviewAt: 2026-11-11
reviewStatus: verified
volatility: medium
seoTitle: 'Codecov for GitHub: Setup, Permissions, and Alternatives'
seoDescription: 'Code coverage reporting that uploads and aggregates test coverage from pull requests and CI. Compare Codecov pricing, permissions, setup effort, limitations, and alternatives for GitHub.
---

## Why it belongs in a baseline

Codecov (Codecov) addresses ci-cd and code-review concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.

## For agents

**Question:** Does this project need Codecov?

Code coverage reporting that uploads and aggregates test coverage from pull requests and CI. It It sends data outside GitHub.

**Required permissions:**
**contents** (read): Read source files and pull requests to display coverage context.
**statuses** (write): Post coverage status checks on commits and pull requests.
**metadata** (read): Identify the repository and organization.

**Setup effort:** medium
**Ongoing maintenance:** low
**Pricing model:** freemium (free tier available)
**Alternatives in this directory:** coveralls, codacy, cobertura

**Review links:** https://docs.codecov.com

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.
