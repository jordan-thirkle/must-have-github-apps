---
name: CodeQL
slug: codeql
vendor: GitHub
entryType: native_feature
status: active
summary: GitHub code analysis that finds security vulnerabilities and coding errors through semantic queries.
problem: Conventional tests can miss risky code paths and insecure patterns. CodeQL turns source code into a queryable model for deeper analysis.
bestFor:
  - Repositories where security analysis belongs in pull requests
  - Teams able to review and act on findings
notFor:
  - A substitute for threat modeling, tests, or human review
  - Projects whose languages and build model are not supported
categories:
  - security
  - code-review
tags:
  - code-scanning
  - static-analysis
  - github-native
installationModels:
  - native_github
githubSurfaces:
  - code scanning
  - pull requests
  - security overview
capabilities:
  - semantic code analysis
  - pull-request alerts
  - security findings
permissions:
  - resource: contents
    access: read
    purpose: Read source code and build context for analysis.
    scope: repository
  - resource: security-events
    access: write
    purpose: Upload code-scanning results to GitHub.
    scope: repository
accessSummary: CodeQL analysis reads source and build information, then uploads findings to code scanning. Workflow permissions and language support must be reviewed for each repository.
dataAccess:
  - source code
  - build information
  - analysis results
dataLeavesGitHub: no
setupLevel: medium
maintenanceLevel: medium
pricingModel: included
freeTier: true
pricingSummary: Availability depends on repository visibility and GitHub plan. Check current CodeQL documentation and plan details before assuming coverage.
privacySummary: Code analysis processes repository source and build context within GitHub's security tooling. Review GitHub's current privacy and data-processing documentation for your plan.
strengths:
  - Deep semantic analysis rather than only text matching
  - Pull-request integration keeps findings close to code changes
limitations:
  - Requires supported languages and a workflow that builds or analyzes the project correctly
  - Findings still require triage and fixes; a green result is not a security guarantee
alternatives:
  - semgrep
  - snyk-code
officialUrl: https://codeql.github.com/
documentationUrl: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning
pricingUrl: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
reviewedAt: 2026-08-06
nextReviewAt: 2026-11-04
reviewStatus: verified
volatility: medium
featured: true
seoTitle: 'CodeQL for GitHub: Code Scanning, Setup, and Limits'
seoDescription: Understand CodeQL code scanning for GitHub, including permissions, supported workflows, setup effort, limitations, and alternatives.
sources:
  - label: CodeQL documentation
    url: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning
    type: documentation
    checkedAt: 2026-08-06
  - label: GitHub plans documentation
    url: https://docs.github.com/en/get-started/learning-about-github/githubs-plans
    type: pricing
    checkedAt: 2026-08-06
---

## Why it belongs in a baseline

CodeQL is useful when a repository has enough code and workflow structure to act on semantic findings. Start with supported languages, least-privilege workflow permissions, and a pull-request gate that the team can actually maintain.

Do not treat a passing analysis as proof of safety. Pair it with dependency, secret, configuration, and human review.
