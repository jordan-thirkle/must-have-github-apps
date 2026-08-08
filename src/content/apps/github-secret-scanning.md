---
name: GitHub secret scanning
slug: github-secret-scanning
vendor: GitHub
entryType: native_feature
status: active
summary: GitHub-native detection for credentials and other secrets committed to supported repositories.
problem: A leaked token can turn a small mistake into an account or infrastructure incident. Secret scanning helps surface exposed credentials so maintainers can revoke and investigate them.
bestFor:
  - Repositories handling API keys, tokens, or deployment credentials
  - Teams that want a GitHub-native first security baseline
notFor:
  - Proving that a repository contains no secrets
  - Replacing credential rotation and incident response
categories:
  - security
tags:
  - secrets
  - credentials
  - github-native
installationModels:
  - native_github
githubSurfaces:
  - repository security settings
  - push protection
  - security overview
capabilities:
  - secret detection
  - push protection
  - alerting
permissions:
  - resource: contents
    access: read
    purpose: Inspect repository content for supported secret patterns.
    scope: repository
accessSummary: GitHub scans repository content and can block supported secret pushes when push protection is enabled. Exact availability depends on repository visibility and plan.
dataAccess:
  - repository content
  - detected secret patterns
  - alert metadata
dataLeavesGitHub: unknown
setupLevel: low
maintenanceLevel: low
pricingModel: included
freeTier: true
pricingSummary: Availability and coverage vary by repository visibility and GitHub plan, so check the current official documentation before relying on a specific feature.
privacySummary: Review GitHub's current security and data-processing documentation for the repository and organization context in which scanning is enabled.
strengths:
  - Native workflow with no third-party installation
  - Push protection can prevent some supported secrets from entering a repository
limitations:
  - Detection coverage is not universal and does not remove the need to rotate exposed credentials
  - Feature availability and limits vary by plan and repository type
alternatives:
  - gitleaks
  - trufflehog
officialUrl: https://github.com/features/security
documentationUrl: https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning
pricingUrl: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
privacyUrl: https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement
reviewedAt: 2026-08-06
nextReviewAt: 2026-09-05
reviewStatus: verified
volatility: high
featured: true
seoTitle: 'GitHub Secret Scanning: Setup, Coverage, and Limits'
seoDescription: Understand GitHub secret scanning, push protection, access, plan availability, limitations, and alternatives before enabling it.
sources:
  - label: GitHub secret scanning documentation
    url: https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning
    type: documentation
    checkedAt: 2026-08-06
  - label: GitHub plans documentation
    url: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
    type: pricing
    checkedAt: 2026-08-06
---

## Why it belongs in a baseline

Secret scanning is one of the clearest examples of GitHub doing more than storing source code. It creates a visible response path around a class of mistake that is easy to make when building quickly.

Enable it alongside credential rotation, least-privilege tokens, and a documented incident path. A clean scan is useful evidence, not proof that no secret exists.
