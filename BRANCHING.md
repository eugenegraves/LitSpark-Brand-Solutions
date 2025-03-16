# LitSpark Brand Solutions Branching Strategy

This document outlines the Git branching strategy for the LitSpark Brand Solutions project, following the GitFlow workflow.

## Main Branches

- **main**: Production-ready code that has been deployed to production
- **develop**: Integration branch for features that are ready for the next release

## Supporting Branches

### Feature Branches

- **Naming Convention**: `feature/feature-name`
- **Branch From**: `develop`
- **Merge To**: `develop`
- **Purpose**: Used to develop new features for the upcoming or a distant future release

### Release Branches

- **Naming Convention**: `release/vX.Y.Z`
- **Branch From**: `develop`
- **Merge To**: `main` and `develop`
- **Purpose**: Support preparation of a new production release, allowing for minor bug fixes and preparing metadata

### Hotfix Branches

- **Naming Convention**: `hotfix/vX.Y.Z`
- **Branch From**: `main`
- **Merge To**: `main` and `develop`
- **Purpose**: Address critical bugs in production that cannot wait for the next release

## Workflow

1. **Feature Development**:
   - Create a feature branch from `develop`
   - Implement the feature with regular commits
   - Create a pull request to merge back into `develop`
   - Code review and approval required before merging

2. **Release Preparation**:
   - Create a release branch from `develop` when ready for release
   - Only bug fixes, documentation, and release-oriented tasks in this branch
   - Once ready, merge to `main` and tag with version number
   - Also merge back to `develop` to incorporate any changes

3. **Hotfix Process**:
   - Create a hotfix branch from `main` for critical production issues
   - Fix the issue with minimal changes
   - Merge to both `main` and `develop`
   - Tag the `main` branch with updated version number

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Pull Request Process

1. Update the README.md or documentation with details of changes if needed
2. Update the version numbers in relevant files following semantic versioning
3. Require review from at least one team member
4. Automated tests must pass before merging
