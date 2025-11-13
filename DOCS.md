# 📚 Documentation Index

Welcome to the Lazy Trainer documentation! This index helps you find the information you need.

## 🚀 Getting Started

**New to Lazy Trainer?** Start here:

1. 📖 **[README.md](./README.md)** - Project overview, features, and quick start guide
2. 🏗️ **[CLAUDE.md](./CLAUDE.md)** - Architecture guidelines and coding standards (essential reading!)
3. 🔧 **[Installation Guide](#installation)** - Detailed setup instructions

## 📖 Core Documentation

### For Users

| Document                           | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| **[README.md](./README.md)**       | Main project documentation with features and setup |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history and release notes                  |

### For Developers

| Document                                                             | Description                               |
| -------------------------------------------------------------------- | ----------------------------------------- |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)**                             | How to contribute to the project          |
| **[CLAUDE.md](./CLAUDE.md)**                                         | 4-Layer architecture and coding standards |
| **[API.md](./API.md)**                                               | Data layer architecture and API patterns  |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)**                                 | Deployment guide for various platforms    |
| **[UI_UX_MODERNIZATION.md](./UI_UX_MODERNIZATION.md)**               | UI/UX design system documentation         |
| **[NUXT4_RESTRUCTURE_COMPLETE.md](./NUXT4_RESTRUCTURE_COMPLETE.md)** | Nuxt 4 migration details                  |

### Policies & Guidelines

| Document                                       | Description                                 |
| ---------------------------------------------- | ------------------------------------------- |
| **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** | Community guidelines and standards          |
| **[SECURITY.md](./SECURITY.md)**               | Security policy and vulnerability reporting |
| **[LICENSE](./LICENSE)**                       | MIT License details                         |

## 🎯 Quick Links by Topic

### 🏗️ Architecture

**Understanding the codebase structure:**

- **[4-Layer Architecture](./CLAUDE.md#️-architecture-update-jan-2025)** - Core architectural pattern
- **[Project Structure](./README.md#-project-structure)** - Directory organization
- **[Nuxt 4 Structure](./NUXT4_RESTRUCTURE_COMPLETE.md)** - Modern folder structure
- **[Component Hierarchy](./CLAUDE.md#components-ui-only)** - Component organization

**Key Concepts:**

```
Components (UI) → Pages (Orchestration) → Stores (Logic) → Repositories (Data)
```

### 🎨 UI/UX

**Design system and components:**

- **[Design System](./UI_UX_MODERNIZATION.md#design-system)** - Colors, typography, spacing
- **[Component Library](./README.md#ui-components)** - Available UI components
- **[Component Demo](http://localhost:3000/components-demo)** - Live component showcase
- **[Tailwind Config](./tailwind.config.cts)** - Custom Tailwind configuration

**Design Tokens:**

- Primary Colors: Green palette (50-950 shades)
- Secondary Colors: Purple palette (50-950 shades)
- Custom Shadows: soft, glow, inner
- Animations: fade, slide, scale, bounce

### 🔌 API & Data

**Working with data:**

- **[Repository Pattern](./API.md#repositories)** - Data access layer
- **[Database Schema](./API.md#database-schema)** - Supabase tables and relations
- **[Models & DTOs](./API.md#models)** - TypeScript interfaces
- **[Error Handling](./API.md#error-handling)** - Error patterns and best practices

**Quick Reference:**

```typescript
// Always use repositories for data access
const workoutRepo = workoutRepository();
const activities = await workoutRepo.getActivities();
```

### 🧪 Testing

**Testing strategies:**

- **[Unit Tests](./CONTRIBUTING.md#unit-tests-vitest)** - Component and function tests
- **[E2E Tests](./CONTRIBUTING.md#e2e-tests-playwright)** - End-to-end testing
- **[Test Commands](./README.md#-testing)** - Running tests

```bash
# Run all tests
yarn test:unit
yarn test:e2e
```

### 🚀 Deployment

**Getting your app live:**

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Environment Variables](./DEPLOYMENT.md#environment-variables)** - Configuration
- **[Platform Guides](./DEPLOYMENT.md#deployment-platforms)** - Vercel, Netlify, etc.
- **[Docker Setup](./DEPLOYMENT.md#docker)** - Containerization

**Quick Deploy:**

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Build for any platform
yarn build
```

### 🤝 Contributing

**How to contribute:**

- **[Contributing Guide](./CONTRIBUTING.md)** - Full contribution guidelines
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Community standards
- **[Commit Convention](./CONTRIBUTING.md#-commit-convention)** - Commit message format
- **[PR Process](./CONTRIBUTING.md#-pull-request-process)** - Pull request workflow

**Quick Start:**

```bash
git checkout -b feature/your-feature
# Make changes
yarn lint
yarn test:unit
git commit -m "feat(scope): description"
git push origin feature/your-feature
```

### 🔒 Security

**Security best practices:**

- **[Security Policy](./SECURITY.md)** - Reporting vulnerabilities
- **[Best Practices](./SECURITY.md#security-best-practices)** - Security guidelines
- **[RLS Policies](./API.md#row-level-security-rls)** - Database security

## 📋 Common Tasks

### Installation

```bash
# 1. Clone repository
git clone git@github.com:simone98dm/lazy-trainer-fe.git
cd lazy-trainer-fe

# 2. Install dependencies
yarn install

# 3. Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Start development server
yarn dev
```

### Creating a New Component

1. **Choose the right layer**: Atom, Molecule, or Organism
2. **Create component file**: `app/components/[Layer]/[ComponentName]/[ComponentName].vue`
3. **Follow patterns**: See [CLAUDE.md component examples](./CLAUDE.md#components-ui-only)
4. **Write tests**: Create `[ComponentName].spec.ts`
5. **Document props**: Use TypeScript interfaces

### Adding a New Feature

1. **Create feature branch**: `git checkout -b feature/feature-name`
2. **Follow architecture**: Component → Page → Store → Repository
3. **Write tests**: Unit and E2E tests
4. **Update docs**: If adding new patterns
5. **Submit PR**: Follow [PR template](./CONTRIBUTING.md#pr-template)

### Fixing a Bug

1. **Create fix branch**: `git checkout -b fix/bug-description`
2. **Write test**: Reproduce the bug
3. **Fix the issue**: Follow coding standards
4. **Verify fix**: Test passes
5. **Submit PR**: Include reproduction steps

### Deploying Changes

1. **Merge to main**: Via approved PR
2. **Automatic deploy**: CI/CD handles deployment (Vercel/Netlify)
3. **Manual deploy**: `vercel --prod` or `netlify deploy --prod`
4. **Verify**: Check production site

## 🔍 Searching Documentation

### By Role

**I'm a...**

- 👨‍💻 **Developer**: Start with [CLAUDE.md](./CLAUDE.md) and [API.md](./API.md)
- 🎨 **Designer**: Check [UI_UX_MODERNIZATION.md](./UI_UX_MODERNIZATION.md)
- 🚀 **DevOps**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🤝 **Contributor**: Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- 👤 **User**: Visit [README.md](./README.md)

### By Task

**I want to...**

- 🏗️ **Understand architecture**: [CLAUDE.md](./CLAUDE.md) → [API.md](./API.md)
- 🎨 **Style components**: [UI_UX_MODERNIZATION.md](./UI_UX_MODERNIZATION.md)
- 🔌 **Add API endpoint**: [API.md](./API.md) → [CLAUDE.md repositories](./CLAUDE.md#layer-4-repositories-data-access--dto-mapping)
- 🧪 **Write tests**: [CONTRIBUTING.md testing](./CONTRIBUTING.md#-testing-guidelines)
- 🚀 **Deploy app**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🤝 **Contribute**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- 🐛 **Report bug**: [Issue Guidelines](./CONTRIBUTING.md#-issue-guidelines)
- 🔒 **Report security issue**: [SECURITY.md](./SECURITY.md)

## 📞 Getting Help

### Resources

- 📖 **Documentation**: You're here!
- 💬 **GitHub Discussions**: [Ask questions](https://github.com/simone98dm/lazy-trainer-fe/discussions)
- 🐛 **Issues**: [Report bugs](https://github.com/simone98dm/lazy-trainer-fe/issues)
- 📧 **Email**: simone.dalmas@outlook.it
- 🌐 **Website**: [workout.simone98dm.dev](https://workout.simone98dm.dev)

### Support Channels

| Channel            | Best For                             |
| ------------------ | ------------------------------------ |
| GitHub Issues      | Bug reports, feature requests        |
| GitHub Discussions | Questions, ideas, general discussion |
| Email              | Private inquiries, security issues   |
| Documentation      | Self-service help                    |

## 🎓 Learning Path

**Recommended reading order for new contributors:**

1. **Day 1**:
   - [README.md](./README.md) - Overview
   - [Installation](#installation) - Get set up
   - [Component Demo](http://localhost:3000/components-demo) - See it in action

2. **Day 2**:
   - [CLAUDE.md](./CLAUDE.md) - Architecture (MUST READ)
   - [API.md](./API.md) - Data patterns
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

3. **Day 3**:
   - [UI_UX_MODERNIZATION.md](./UI_UX_MODERNIZATION.md) - Design system
   - Explore codebase with architecture knowledge
   - Try making a small change

4. **Day 4+**:
   - Pick an issue to work on
   - Follow contribution workflow
   - Submit your first PR!

## 📚 Additional Resources

### External Documentation

- [Nuxt 4 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Pinia Documentation](https://pinia.vuejs.org)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Tools

- [Vitest](https://vitest.dev) - Unit testing
- [Playwright](https://playwright.dev) - E2E testing
- [ESLint](https://eslint.org) - Linting
- [Prettier](https://prettier.io) - Code formatting

## 🔄 Keeping Documentation Updated

**Documentation is code!** Help keep it current:

1. **Found outdated info?** Open an issue or PR
2. **Added a feature?** Update relevant docs
3. **Changed architecture?** Update CLAUDE.md
4. **New deployment option?** Update DEPLOYMENT.md

## 📝 Documentation Standards

When writing documentation:

- ✅ Use clear, concise language
- ✅ Include code examples
- ✅ Add diagrams where helpful
- ✅ Keep formatting consistent
- ✅ Update table of contents
- ✅ Link to related docs

## 🎯 Document Checklist

Before submitting documentation changes:

- [ ] Spelling and grammar checked
- [ ] Code examples tested
- [ ] Links verified
- [ ] Table of contents updated
- [ ] Screenshots added (if applicable)
- [ ] Cross-references checked
- [ ] Follows existing style

---

<div align="center">

**📖 Happy Reading! 🚀**

[Report Documentation Issue](https://github.com/simone98dm/lazy-trainer-fe/issues/new?labels=documentation) • [Suggest Improvement](https://github.com/simone98dm/lazy-trainer-fe/issues/new?labels=enhancement)

**Last Updated**: November 13, 2025

</div>
