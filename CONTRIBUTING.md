# Contributing to Lazy Trainer

Thank you for your interest in contributing to Lazy Trainer! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Architecture Guidelines](#architecture-guidelines)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them get started
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment, discrimination, or offensive comments
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** v18.x or higher
- **Yarn** package manager (recommended)
- **Git** for version control
- A **Supabase account** (for backend development)
- A code editor (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone git@github.com:YOUR_USERNAME/lazy-trainer-fe.git
   cd lazy-trainer-fe
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream git@github.com:simone98dm/lazy-trainer-fe.git
   ```

4. **Install dependencies**:

   ```bash
   yarn install
   ```

5. **Set up environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

6. **Start development server**:
   ```bash
   yarn dev
   ```

---

## 🔄 Development Workflow

### Branch Strategy

We use a simplified Git Flow:

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features
- **`feature/*`**: New features (e.g., `feature/add-dark-mode`)
- **`fix/*`**: Bug fixes (e.g., `fix/timer-reset-issue`)
- **`refactor/*`**: Code refactoring (e.g., `refactor/nuxt4-upgrade`)
- **`docs/*`**: Documentation updates (e.g., `docs/update-readme`)

### Creating a Feature Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Write code** following our [coding standards](#coding-standards)
2. **Write tests** for your changes
3. **Run linter**:
   ```bash
   yarn lint
   ```
4. **Run tests**:
   ```bash
   yarn test:unit
   ```
5. **Commit changes** using our [commit convention](#commit-convention)

### Staying Up to Date

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch on develop
git rebase upstream/develop
```

---

## 🏗️ Architecture Guidelines

Lazy Trainer follows a **4-Layer Architecture**. Please read [CLAUDE.md](./CLAUDE.md) for detailed guidelines.

### Quick Reference

#### ✅ DO

```typescript
// ✅ Component: UI only
<script setup lang="ts">
const activityStore = useActivityStore();
const activities = computed(() => activityStore.activities);

function handleCreate() {
  emit('create');
}
</script>

// ✅ Page: Orchestration
<script setup lang="ts">
const activityStore = useActivityStore();

async function createActivity(data: ActivityInput) {
  await activityStore.createActivity(data);
}

onMounted(() => activityStore.loadActivities());
</script>

// ✅ Store: Business logic
export const useActivityStore = defineStore('activity', () => {
  const activities = ref<Activity[]>([]);
  const workoutRepo = workoutRepository();

  async function createActivity(data: ActivityInput) {
    const activity = await workoutRepo.createActivity(data);
    if (activity) {
      activities.value.unshift(activity);
      return true;
    }
    return false;
  }

  return { activities, createActivity };
});

// ✅ Repository: Data access
export const workoutRepository = () => {
  const supabase = useWorkoutClient();

  async function createActivity(data: ActivityInput): Promise<Activity | null> {
    try {
      const { data: result, error } = await supabase
        .from('activities')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return mapActivityDTOToActivity(result);
    } catch {
      return null;
    }
  }

  return { createActivity };
};
```

#### ❌ DON'T

```typescript
// ❌ Component with Supabase query
<script setup lang="ts">
const supabase = useWorkoutClient(); // NO!
const activities = await supabase.from('activities').select(); // NO!
</script>

// ❌ Page with business logic
<script setup lang="ts">
const activities = ref([]);

async function createActivity(data: ActivityInput) {
  // Validation logic
  if (!data.name) return; // NO! Business logic in page

  // Direct API call
  const result = await fetch('/api/activities', { // NO! Skip store
    method: 'POST',
    body: JSON.stringify(data)
  });
}
</script>

// ❌ Store with Supabase query
export const useActivityStore = defineStore('activity', () => {
  const supabase = useWorkoutClient(); // NO! Use repository

  async function createActivity(data: ActivityInput) {
    const { data: result } = await supabase // NO! Direct query
      .from('activities')
      .insert(data);
  }
});
```

---

## 📐 Coding Standards

### TypeScript

- **Always use TypeScript** - No plain JavaScript files
- **Define types** for all props, emits, and function parameters
- **Avoid `any`** - Use proper types or `unknown`
- **Use type imports**: `import type { Activity } from '~/models'`

### Vue Components

#### Props Definition

```typescript
// ✅ DO: Destructure with inline defaults
interface Props {
  title?: string;
  count?: number;
  isActive?: boolean;
}

const { title = 'Default', count = 0, isActive = false } = defineProps<Props>();
```

```typescript
// ❌ DON'T: Use withDefaults
const props = withDefaults(defineProps<Props>(), {
  title: 'Default',
  count: 0,
});
```

#### Emits Definition

```typescript
// ✅ DO: Nuxt 4 style interface
interface Emits {
  create: [data: ActivityInput];
  update: [id: string, data: Partial<Activity>];
  delete: [id: string];
}

const emit = defineEmits<Emits>();
```

```typescript
// ❌ DON'T: Array style
const emit = defineEmits(['create', 'update', 'delete']);
```

### Naming Conventions

| Type             | Convention       | Example                              |
| ---------------- | ---------------- | ------------------------------------ |
| Components       | PascalCase       | `BaseButton.vue`, `ActivityForm.vue` |
| Files            | kebab-case       | `activity-list.ts`, `user-store.ts`  |
| Variables        | camelCase        | `activityStore`, `isLoading`         |
| Constants        | UPPER_SNAKE_CASE | `MAX_ACTIVITIES`, `API_URL`          |
| Types/Interfaces | PascalCase       | `Activity`, `UserProfile`            |
| Store IDs        | kebab-case       | `'activity'`, `'user'`               |

### File Organization

#### Component Structure

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue';
import type { Activity } from '~/models';

// 2. Props
interface Props {
  activity: Activity;
}
const { activity } = defineProps<Props>();

// 3. Emits
interface Emits {
  update: [activity: Activity];
}
const emit = defineEmits<Emits>();

// 4. Composables/Stores
const activityStore = useActivityStore();

// 5. Reactive state
const isEditing = ref(false);

// 6. Computed properties
const formattedDate = computed(() => {
  // ...
});

// 7. Methods
function handleUpdate() {
  emit('update', activity);
}

// 8. Lifecycle hooks
onMounted(() => {
  // ...
});
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Scoped styles (if needed) */
</style>
```

### CSS/Styling

- **Use Tailwind CSS** for styling (avoid custom CSS when possible)
- **Use Tailwind classes** in template, not inline styles
- **Follow the design system**: Use custom colors, shadows, animations
- **Mobile-first**: Start with mobile layout, then add responsive classes

```vue
<!-- ✅ DO -->
<button
  class="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3"
>
  Click me
</button>

<!-- ❌ DON'T -->
<button
  style="background: linear-gradient(to right, #059669, #10b981); padding: 12px 24px;"
>
  Click me
</button>
```

### No Console Logs

```typescript
// ❌ DON'T
console.log('Debug info'); // Remove before committing
console.error('Error occurred'); // Use proper error handling

// ✅ DO
import { logger } from '~/helpers/logger';
logger.error('Error occurred', error);
```

---

## 🧪 Testing Guidelines

### Unit Tests (Vitest)

Write tests for:

- ✅ Utility functions
- ✅ Store logic
- ✅ Complex components
- ✅ Repository functions

```typescript
// Example: component.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  it('renders with text', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

### E2E Tests (Playwright)

Write E2E tests for:

- ✅ Critical user flows (login, create activity, etc.)
- ✅ Page navigation
- ✅ Form submissions

```typescript
// Example: activities.spec.ts
import { test, expect } from '@playwright/test';

test('create new activity', async ({ page }) => {
  await page.goto('/');
  await page.click('text=New Activity');
  await page.fill('[name="title"]', 'Morning Run');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Morning Run')).toBeVisible();
});
```

### Running Tests

```bash
# Unit tests
yarn test:unit

# Unit tests with coverage
yarn test:coverage

# E2E tests
yarn test:e2e

# E2E tests in UI mode
yarn test:e2e --ui
```

---

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type       | Description                                       |
| ---------- | ------------------------------------------------- |
| `feat`     | New feature                                       |
| `fix`      | Bug fix                                           |
| `docs`     | Documentation changes                             |
| `style`    | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring                                  |
| `perf`     | Performance improvements                          |
| `test`     | Adding or updating tests                          |
| `chore`    | Maintenance tasks                                 |
| `ci`       | CI/CD changes                                     |

### Scopes

| Scope        | Description               |
| ------------ | ------------------------- |
| `activities` | Activity-related features |
| `auth`       | Authentication            |
| `ui`         | UI components             |
| `store`      | Pinia stores              |
| `api`        | API/Repository layer      |
| `config`     | Configuration changes     |

### Examples

```bash
feat(activities): add timer pause functionality

fix(auth): resolve login redirect issue

docs(readme): update installation instructions

refactor(store): migrate to 4-layer architecture

style(ui): apply new color palette

test(activities): add unit tests for ActivityForm
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ **Update from develop**:

   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

2. ✅ **Run linter**:

   ```bash
   yarn lint
   ```

3. ✅ **Run tests**:

   ```bash
   yarn test:unit
   yarn test:e2e
   ```

4. ✅ **Build successfully**:

   ```bash
   yarn build
   ```

5. ✅ **Update documentation** if needed

### Creating Pull Request

1. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub** targeting the `develop` branch

3. **Fill out the PR template**:
   - **Title**: Clear, descriptive title following commit convention
   - **Description**: What changes were made and why
   - **Type**: Feature, Bug Fix, Documentation, etc.
   - **Screenshots**: For UI changes
   - **Testing**: How you tested the changes
   - **Related Issues**: Link to related issues

### PR Template

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] 🚀 New feature
- [ ] 🐛 Bug fix
- [ ] 📝 Documentation update
- [ ] ♻️ Refactoring
- [ ] 🎨 UI/UX improvement

## Changes Made

- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)

![Screenshot](url)

## Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### Review Process

1. **Automated checks** must pass (linting, tests, build)
2. **Code review** by at least one maintainer
3. **Address feedback** and make requested changes
4. **Approval** from maintainer(s)
5. **Merge** into develop branch

---

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Verify the issue** on the latest version
3. **Gather information** (browser, OS, steps to reproduce)

### Issue Types

#### 🐛 Bug Report

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**

- Browser: [e.g. Chrome 120]
- OS: [e.g. macOS 14]
- Version: [e.g. 1.68.4]

**Additional context**
Any other context about the problem.
```

#### ✨ Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution**
What you want to happen.

**Describe alternatives**
Alternative solutions you've considered.

**Additional context**
Any other context or screenshots.
```

#### 📝 Documentation

```markdown
**What documentation needs to be added/updated?**
Description of the documentation change.

**Why is this needed?**
Why this documentation is important.

**Suggested changes**
Proposed changes or additions.
```

---

## 🎯 Priorities

We prioritize contributions in this order:

1. 🔴 **Critical bugs** - Security issues, data loss, crashes
2. 🟠 **High priority** - Major bugs affecting core functionality
3. 🟡 **Medium priority** - Minor bugs, improvements, new features
4. 🟢 **Low priority** - Nice-to-have features, documentation

---

## 💡 Tips for Success

- **Start small**: Begin with small contributions (docs, bug fixes)
- **Ask questions**: Use GitHub Discussions or issues for questions
- **Be patient**: Reviews may take time, especially for large PRs
- **Stay updated**: Regularly sync with upstream develop branch
- **Read the docs**: Familiarize yourself with CLAUDE.md and architecture
- **Test thoroughly**: Test on multiple browsers and devices
- **Follow conventions**: Consistency makes the codebase easier to maintain

---

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: simone.dalmas@outlook.it for private inquiries

---

## 🙏 Thank You!

Thank you for contributing to Lazy Trainer! Every contribution, no matter how small, helps make the project better.

---

<div align="center">

**Happy Coding! 🚀**

[Back to README](./README.md) • [View Issues](https://github.com/simone98dm/lazy-trainer-fe/issues) • [Documentation](./CLAUDE.md)

</div>
