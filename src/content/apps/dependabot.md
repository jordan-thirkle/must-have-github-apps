---
name: Dependabot
slug: dependabot
vendor: GitHub
entryType: native_feature
status: active
summary: GitHub-native dependency updates and vulnerability alerts for supported package ecosystems.
problem: Dependencies age while attention moves elsewhere. Dependabot makes outdated or vulnerable packages visible and can propose updates through pull requests.
bestFor:
  - Maintainers who want a low-setup dependency baseline
  - Repositories using package managers supported by GitHub
notFor:
  - Teams needing one universal updater for every ecosystem
  - Blind automerge without review and test coverage
categories:
  - dependencies
  - security
tags:
  - dependency-updates
  - pull-requests
  - github-native
installationModels:
  - native_github
githubSurfaces:
  - dependency graph
  - dependabot alerts
  - pull requests
capabilities:
  - dependency updates
  - vulnerability alerts
  - grouped update pull requests
permissions:
  - resource: contents
    access: read
    purpose: Read dependency manifests and lockfiles.
    scope: repository
  - resource: pull_requests
    access: write
    purpose: Create and update dependency pull requests when configured.
    scope: repository
accessSummary: Dependabot reads supported manifests and may create pull requests or alerts. The exact update behavior depends on repository configuration and supported ecosystems.
dataAccess:
  - dependency manifests
  - lockfiles
  - vulnerability metadata
dataLeavesGitHub: no
setupLevel: low
maintenanceLevel: low
pricingModel: included
freeTier: true
pricingSummary: Dependabot capabilities are tied to GitHub repository features and plan availability. Check the current documentation for alert and update limits.
privacySummary: Dependabot operates as a GitHub-native capability. Review current GitHub documentation for dependency graph data handling and organization policy controls.
strengths:
  - Low-friction starting point for dependency visibility
  - Pull-request workflow keeps changes reviewable
limitations:
  - Coverage varies by package manager and manifest format
  - Automated updates still need tests, review, and sensible grouping
alternatives:
  - renovate
  - osv-scanner
officialUrl: https://github.com/dependabot
documentationUrl: https://docs.github.com/en/code-security/dependabot/working-with-dependabot
pricingUrl: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
reviewedAt: 2026-08-06
nextReviewAt: 2026-11-04
reviewStatus: verified
volatility: medium
featured: true
seoTitle: 'Dependabot for GitHub: Setup, Permissions, and Alternatives'
seoDescription: Review Dependabot for dependency updates and alerts, including permissions, setup, plan limits, strengths, limitations, and alternatives.
sources:
  - label: Working with Dependabot
    url: https://docs.github.com/en/code-security/dependabot/working-with-dependabot
    type: documentation
    checkedAt: 2026-08-06
  - label: GitHub plans documentation
    url: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
    type: pricing
    checkedAt: 2026-08-06
---

## Why it belongs in a baseline

Dependency updates are a maintenance habit, not a one-time install. Dependabot is a sensible first look because it fits the pull-request workflow most GitHub repositories already use.

Start with alerts and controlled update pull requests. Add grouping and automerge only after tests and rollback paths are reliable.
