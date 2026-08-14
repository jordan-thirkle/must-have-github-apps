---
name: CircleCI
slug: circleci
vendor: CircleCI
entryType: github_app
status: active
summary: "Continuous integration and delivery platform that runs tests and deploys code on every commit."
problem: "CI pipelines need to be reproducible and fast. CircleCI provides configurable pipelines with caching and parallelism."
bestFor:
  - "Teams migrating from GitHub Actions needing advanced caching or macOS resources"
  - "Projects requiring complex deployment workflows"
notFor:
  - "Simple projects already satisfied by GitHub Actions"
  - "Teams that want zero-config CI"
categories:
  - ci-cd
  - automation
tags:
  - "continuous-integration"
  - "continuous-deployment"
  - "pipeline"
installationModels:
  - github_app
githubSurfaces:
  - "pull requests"
  - "commits"
capabilities:
  - "custom pipelines"
  - "caching"
  - "parallel testing"
  - "deployment"
permissions:
  - resource: contents
    access: read
    purpose: "Read source code and pull requests to run CI."
    scope: repository
  - resource: statuses
    access: write
    purpose: "Report CI status on commits and pull requests."
    scope: repository
  - resource: metadata
    access: read
    purpose: "Identify the repository and organization."
    scope: account
accessSummary: "CircleCI reads pushed commits to run tests. Build artifacts and logs are stored in CircleCI, not GitHub."
dataAccess:
  - "source code"
  - "build logs"
  - "test results"
  - "artifacts"
dataLeavesGitHub: yes
setupLevel: medium
maintenanceLevel: medium
pricingModel: freemium
freeTier: true
pricingSummary: "Free tier includes 60 project minutes/month. Paid plans at $30/month for 30k credits."
privacySummary: "Build logs and test results are stored by CircleCI. Review their privacy policy."
strengths:
  - "Mature pipeline configuration with reusable orbs"
  - "Fast parallel test execution"
limitations:
  - "Config YAML can become complex at scale"
  - "Free tier credits are limited"
alternatives:
  - github-actions
  - buildkite
  - gitlab-ci
officialUrl: https://circleci.com
documentationUrl: https://circleci.com/docs
pricingUrl: https://circleci.com/pricing/
sources:
  - label: "CircleCI docs"
    url: https://circleci.com/docs
    type: documentation
    checkedAt: 2026-08-13
  - label: "CircleCI pricing"
    url: https://circleci.com/pricing/
    type: pricing
    checkedAt: 2026-08-13
agentUseCase: "ci-cd"
monetized: true
affiliateLink: https://circleci.com/signup
reviewedAt: 2026-08-13
nextReviewAt: 2026-11-11
reviewStatus: verified
volatility: medium
seoTitle: 'CircleCI for GitHub: Setup, Permissions, and Alternatives'
seoDescription: "CircleCI CI/CD platform with caching and parallelism. Compare pricing, permissions, setup, and alternatives for GitHub."
---

## Why it belongs in a baseline

CircleCI (CircleCI) addresses ci-cd and automation concerns for GitHub repositories. Start with least-privilege permissions, monitor costs, and review findings regularly.

## For agents

**Question:** Does this project need CircleCI?

Continuous integration and delivery platform that runs tests and deploys code on every commit. It It sends data outside GitHub.

**Required permissions:**
**contents** (read): Read source code and pull requests to run CI.
**statuses** (write): Report CI status on commits and pull requests.
**metadata** (read): Identify the repository and organization.

**Setup effort:** medium
**Ongoing maintenance:** medium
**Pricing model:** freemium (free tier available)
**Alternatives in this directory:** github-actions, buildkite, gitlab-ci

**Review links:** https://circleci.com/docs

**Recommendation:** Check the links above and decide whether this tool addresses a problem your project actually has. If yes, note the required permissions and pricing model for a final check.
