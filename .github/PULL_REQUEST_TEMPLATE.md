## Description

<!-- Provide a brief description of what this PR does -->

## Type of Change

<!-- Mark the relevant option with an 'x' -->

- [ ] 🚀 New feature (non-breaking change which adds functionality)
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] 🎨 UI/UX improvement
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test addition or update
- [ ] 🔧 Configuration/build change

## Related Issue

<!-- Link to the issue this PR addresses -->

Closes #(issue number)

## Changes Made

<!-- List the specific changes made in this PR -->

- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)

<!-- Add screenshots for UI changes -->

| Before              | After               |
| ------------------- | ------------------- |
| <!-- screenshot --> | <!-- screenshot --> |

## Testing

<!-- Describe how you tested these changes -->

### Test Environment

- **Browser**: <!-- e.g., Chrome 120 -->
- **OS**: <!-- e.g., macOS 14 -->
- **Device**: <!-- e.g., Desktop, iPhone 14 -->

### Test Cases

- [ ] Manual testing completed
- [ ] Unit tests pass (`yarn test:unit`)
- [ ] E2E tests pass (`yarn test:e2e`)
- [ ] Build succeeds (`yarn build`)
- [ ] Lint passes (`yarn lint`)

### Specific Test Steps

1. Step 1
2. Step 2
3. Expected result

## Architecture Compliance

<!-- Confirm adherence to project architecture -->

- [ ] Follows [4-Layer Architecture](../CLAUDE.md#️-architecture-update-jan-2025)
- [ ] Components contain UI only (no business logic)
- [ ] Pages handle orchestration only
- [ ] Business logic is in stores
- [ ] Data access is in repositories
- [ ] No direct Supabase queries in components/pages
- [ ] No `console.log` statements

## Code Quality

- [ ] Code follows [coding standards](../CONTRIBUTING.md#-coding-standards)
- [ ] Props use destructuring with inline defaults
- [ ] Emits use Nuxt 4 style interface
- [ ] TypeScript types are properly defined
- [ ] No `any` types used (or justified with comments)
- [ ] Error handling is implemented
- [ ] Comments added for complex logic

## Documentation

- [ ] README updated (if applicable)
- [ ] API documentation updated (if applicable)
- [ ] CHANGELOG.md updated (for releases)
- [ ] Component JSDoc/comments added
- [ ] Architecture docs updated (if architecture changed)

## Accessibility

<!-- If this PR affects UI -->

- [ ] Keyboard navigation works
- [ ] ARIA labels added where needed
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader tested (if applicable)
- [ ] Focus indicators visible

## Performance

<!-- If this PR could affect performance -->

- [ ] No unnecessary re-renders
- [ ] Large lists virtualized (if applicable)
- [ ] Images optimized
- [ ] Bundle size impact checked
- [ ] Lighthouse score acceptable

## Security

<!-- If this PR handles sensitive data -->

- [ ] No sensitive data in logs
- [ ] Input validation implemented
- [ ] XSS vulnerabilities prevented
- [ ] Authentication checks in place
- [ ] CORS configured correctly

## Breaking Changes

<!-- If this PR includes breaking changes, describe them here -->

### Migration Guide

<!-- How should users migrate to this change? -->

## Deployment Notes

<!-- Any special deployment considerations? -->

- [ ] Environment variables needed (documented)
- [ ] Database migrations required
- [ ] Cache clearing needed
- [ ] Third-party service updates needed

## Checklist

<!-- Final checklist before submitting -->

- [ ] Code is self-reviewed
- [ ] Code follows project conventions
- [ ] All tests pass locally
- [ ] No merge conflicts
- [ ] Branch is up-to-date with target branch
- [ ] Commit messages follow [convention](../CONTRIBUTING.md#-commit-convention)
- [ ] PR title follows convention (e.g., `feat(activities): add timer pause`)

## Additional Notes

<!-- Any additional information reviewers should know -->

---

## For Reviewers

### Review Checklist

- [ ] Code follows project architecture
- [ ] Changes are well-tested
- [ ] Documentation is adequate
- [ ] No security concerns
- [ ] Performance impact is acceptable
- [ ] UI changes are responsive
- [ ] Accessibility standards met

### Suggested Reviewers

<!-- Tag specific reviewers if needed -->

@simone98dm

---

**Thank you for contributing to Lazy Trainer! 🎉**
