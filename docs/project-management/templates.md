# Project Templates

This document provides templates for various project artifacts to ensure consistency across the LitSpark Brand Solutions project.

## Issue Templates

### Feature Request Template

```markdown
---
name: Feature request
about: Suggest a new feature or enhancement
title: '[FEATURE] '
labels: 'feature'
assignees: ''
---

## Feature Description
A clear and concise description of the feature you're requesting.

## User Story
As a [type of user],
I want [goal],
So that [benefit].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Design / Mockups
If applicable, add mockups or design references.

## Additional Context
Add any other context about the feature request here.

## Accessibility Considerations
Describe any specific accessibility requirements for this feature.
```

### Bug Report Template

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: 'bug'
assignees: ''
---

## Bug Description
A clear and concise description of what the bug is.

## Steps To Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- Device: [e.g. Desktop, iPhone 12]
- OS: [e.g. Windows 10, iOS 14]
- Browser: [e.g. Chrome 91, Safari 14]
- Screen Size/Resolution: [e.g. 1920x1080]
- Application Version: [e.g. 1.0.0]

## Additional Context
Add any other context about the problem here.

## Accessibility Impact
Does this bug affect accessibility? If so, how?
```

### Documentation Task Template

```markdown
---
name: Documentation task
about: Create a documentation task
title: '[DOCS] '
labels: 'documentation'
assignees: ''
---

## Documentation Needed
A clear description of what documentation needs to be created or updated.

## Purpose
Why is this documentation needed? Who will use it?

## Content Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Location
Where should this documentation be placed?

## Related Issues
Link to related issues or features that this documentation supports.

## Additional Context
Add any other context about the documentation task here.
```

## Pull Request Template

```markdown
## Description
Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context.

Fixes # (issue)

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring

## How Has This Been Tested?
Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce.

- [ ] Test A
- [ ] Test B

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
- [ ] I have checked my code and corrected any misspellings
- [ ] I have verified that my changes meet accessibility requirements

## Screenshots (if appropriate):

## Accessibility Impact:
Describe how your changes impact accessibility. If not applicable, write "N/A".
```

## Component Documentation Template

```markdown
# Component Name

## Overview
Brief description of the component and its purpose.

## Usage
```jsx
import ComponentName from 'components/path/to/ComponentName';

<ComponentName prop1="value" prop2={value} />
```

## Props

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| prop1 | string | '' | Description of prop1 |
| prop2 | boolean | false | Description of prop2 |
| children | node | null | Child elements |

## Examples

### Basic Usage
```jsx
<ComponentName prop1="value">
  Content
</ComponentName>
```

### With Custom Styling
```jsx
<ComponentName 
  prop1="value" 
  style={{ margin: '1rem' }}
>
  Content with custom styling
</ComponentName>
```

## Accessibility
Describe accessibility features and considerations for this component.

## Design Variations
List and describe any design variations of this component.

## Related Components
List related components that are often used together with this one.
```

## Meeting Agenda Templates

### Sprint Planning Meeting

```markdown
# Sprint Planning Meeting - Sprint [Number]

**Date:** [Date]
**Time:** [Time]
**Location:** [Location/Virtual Link]

## Attendees
- [Person 1]
- [Person 2]
- [Person 3]

## Sprint Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

## Sprint Backlog Review
- Review and prioritize items in the backlog
- Discuss dependencies and blockers

## Capacity Planning
- Team capacity for the sprint
- Vacation/time off during the sprint
- Other commitments

## Sprint Backlog Selection
- [Issue #1] - [Estimate] - [Assignee]
- [Issue #2] - [Estimate] - [Assignee]
- [Issue #3] - [Estimate] - [Assignee]

## Technical Discussion
- Architecture considerations
- Technical dependencies
- Potential challenges

## Action Items
- [Action Item 1] - [Owner] - [Due Date]
- [Action Item 2] - [Owner] - [Due Date]
- [Action Item 3] - [Owner] - [Due Date]

## Next Meeting
[Date and Time]
```

### Sprint Retrospective Meeting

```markdown
# Sprint Retrospective - Sprint [Number]

**Date:** [Date]
**Time:** [Time]
**Location:** [Location/Virtual Link]

## Attendees
- [Person 1]
- [Person 2]
- [Person 3]

## Sprint Summary
- Sprint Goal: [Goal]
- Completed Points: [X] out of [Y]
- [Z] issues completed

## What Went Well
- [Item 1]
- [Item 2]
- [Item 3]

## What Could Be Improved
- [Item 1]
- [Item 2]
- [Item 3]

## Action Items for Next Sprint
- [Action Item 1] - [Owner]
- [Action Item 2] - [Owner]
- [Action Item 3] - [Owner]

## Team Morale
- Overall team sentiment
- Burnout concerns
- Positive highlights

## Next Steps
- Changes to implement in the next sprint
- Process improvements
- Tool adjustments
```

## Weekly Status Report Template

```markdown
# Weekly Status Report - Week of [Date]

## Project: LitSpark Brand Solutions

### Accomplishments This Week
- [Accomplishment 1]
- [Accomplishment 2]
- [Accomplishment 3]

### In Progress
- [Item 1] - [Status] - [Owner]
- [Item 2] - [Status] - [Owner]
- [Item 3] - [Status] - [Owner]

### Blockers/Issues
- [Issue 1] - [Impact] - [Resolution Plan]
- [Issue 2] - [Impact] - [Resolution Plan]

### Next Week's Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

### Key Metrics
- Velocity: [X] points
- Bugs Resolved: [Y]
- Test Coverage: [Z]%

### Notes/Comments
Additional information or context.
```

## Release Notes Template

```markdown
# Release Notes - v[Version Number]

**Release Date:** [Date]

## Overview
Brief description of the release and its major features.

## New Features
- [Feature 1]: [Description]
- [Feature 2]: [Description]
- [Feature 3]: [Description]

## Improvements
- [Improvement 1]: [Description]
- [Improvement 2]: [Description]
- [Improvement 3]: [Description]

## Bug Fixes
- [Bug Fix 1]: [Description] - [Issue #]
- [Bug Fix 2]: [Description] - [Issue #]
- [Bug Fix 3]: [Description] - [Issue #]

## Known Issues
- [Issue 1]: [Description] - [Workaround if available]
- [Issue 2]: [Description] - [Workaround if available]

## Accessibility Improvements
- [Improvement 1]: [Description]
- [Improvement 2]: [Description]

## Breaking Changes
- [Change 1]: [Description] - [Migration path]
- [Change 2]: [Description] - [Migration path]

## Dependencies
- [Dependency 1]: v[Version]
- [Dependency 2]: v[Version]

## Installation Instructions
Steps to install or update to this version.
```
