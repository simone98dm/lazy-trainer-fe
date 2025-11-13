# 🏋️ Lazy Trainer

> **Easily track your workout activities throughout the week**

A modern, progressive web application for managing workout plans, tracking activities, and monitoring your fitness progress. Built with Nuxt 4, Vue 3, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Nuxt](https://img.shields.io/badge/Nuxt-4.2.0-00DC82?logo=nuxt.js)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-6.12.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Live Demo](https://workout.simone98dm.dev) • [📖 Documentation](#documentation) • [🤝 Contributing](./CONTRIBUTING.md)

---

## ✨ Features

### 🎯 Core Functionality
- **🗓️ Activity Management**: Create, edit, and organize workout activities
- **📅 Weekly Planning**: Plan your workouts throughout the week with an intuitive calendar
- **⏱️ Timer System**: Built-in timer for tracking exercise duration
- **📊 Progress Tracking**: Monitor your fitness journey with activity history
- **👥 Trainer Mode**: Share workout plans with clients (trainer feature)

### 💎 User Experience
- **🎨 Modern UI**: Clean, minimalist design with gradients and glassmorphism
- **🌓 Dark Mode**: (Coming soon)
- **📱 Responsive**: Optimized for mobile, tablet, and desktop
- **⚡ Progressive Web App**: Install and use offline
- **🔔 Toast Notifications**: Real-time feedback for user actions
- **💀 Skeleton Loaders**: Smooth loading states

### 🛠️ Technical Highlights
- **🏗️ 4-Layer Architecture**: Clean separation of concerns (UI → Pages → Stores → Repositories)
- **🔐 Authentication**: Secure user authentication via Supabase
- **💾 Offline Support**: PWA with service worker caching
- **🎭 Type Safety**: Full TypeScript coverage
- **🧪 Testing**: Unit tests (Vitest) and E2E tests (Playwright)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.x or higher
- **Package Manager**: yarn, npm, or pnpm
- **Supabase Account**: For backend services (or use local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:simone98dm/lazy-trainer-fe.git
   cd lazy-trainer-fe
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

This project follows a **4-Layer Architecture** for clean separation of concerns:

```
┌─────────────────────────────────────────────┐
│  Layer 1: Components (UI Only)              │
│  - Display data                             │
│  - Handle user interactions                 │
│  - Emit events                              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Layer 2: Pages (Orchestration)             │
│  - Call store methods                       │
│  - Show/hide UI elements                    │
│  - Minimal logic                            │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Layer 3: Stores (Business Logic)           │
│  - State management                         │
│  - Data validation                          │
│  - Error handling                           │
│  - Call repositories                        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Layer 4: Repositories (Data Access)        │
│  - Supabase queries                         │
│  - DTO mapping                              │
│  - API calls                                │
└─────────────────────────────────────────────┘
```

---

## 🎨 UI Components

### Design System

- **Colors**: Custom green/purple palette with 50-950 shades
- **Typography**: Lato font family
- **Shadows**: Soft, glow, and inner shadows
- **Animations**: Fade, slide, scale, and bounce transitions
- **Border Radius**: 2xl, 3xl, 4xl, 5xl for modern rounded corners

### Component Library

- **Atoms**: BaseButton, Input, Card, Switch, Loading, MaterialIcon
- **Molecules**: BaseModal, PageHeader, EmptyState, Toast, TimePicker
- **Organisms**: ActivityForm, ActivityList, CustomCalendar, ToastContainer

📖 **View component demos at [/components-demo](http://localhost:3000/components-demo)**

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run unit tests
yarn test:unit

# Run with coverage
yarn test:coverage

# Watch mode
yarn test:unit --watch
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
yarn test:e2e

# Run in UI mode
yarn test:e2e --ui

# Run specific browser
yarn test:e2e --project=chromium
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build the application
yarn build

# Preview production build locally
yarn preview
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Deploy to Vercel
yarn vercel:deploy
```

#### Other Platforms
- **Netlify**: Connect your repo and deploy automatically
- **CloudFlare Pages**: Zero-config deployment
- **Node.js Server**: Run `.output/server/index.mjs`

📖 **See [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for more options**

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Lint and format code |
| `yarn test:unit` | Run unit tests |
| `yarn test:coverage` | Run tests with coverage |
| `yarn test:e2e` | Run E2E tests |
| `yarn vercel:deploy` | Deploy to Vercel |

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `BASE_URL` | Application base URL | ❌ |

### Tailwind CSS

Custom configuration in `tailwind.config.cts`:
- Extended color palette (primary/secondary)
- Custom shadows and animations
- Responsive breakpoints
- Custom spacing values

### PWA Configuration

Progressive Web App settings in `nuxt.config.ts`:
- Offline support
- Service worker caching
- App manifest
- Icons and splash screens

---

## 📖 Documentation

- **[CLAUDE.md](./CLAUDE.md)**: Architecture guidelines and coding standards
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: How to contribute to the project
- **[UI_UX_MODERNIZATION.md](./UI_UX_MODERNIZATION.md)**: UI/UX design system documentation
- **[NUXT4_RESTRUCTURE_COMPLETE.md](./NUXT4_RESTRUCTURE_COMPLETE.md)**: Nuxt 4 migration guide

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Coding standards
- Pull request process

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Simone Dal Mas** ([@simone98dm](https://github.com/simone98dm))
- 🌐 Website: [workout.simone98dm.dev](https://workout.simone98dm.dev)
- 📧 Email: simone.dalmas@outlook.it

---

## 🙏 Acknowledgments

- **[Nuxt](https://nuxt.com)** - The Intuitive Vue Framework
- **[Supabase](https://supabase.com)** - Open Source Firebase Alternative
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS Framework
- **[Pinia](https://pinia.vuejs.org)** - The Vue Store that you will enjoy using
- **[Material Icons](https://fonts.google.com/icons)** - Icon library

---

<div align="center">

**Made with ❤️ by the Lazy Trainer Team**

[⭐ Star us on GitHub](https://github.com/simone98dm/lazy-trainer-fe) • [🐛 Report Bug](https://github.com/simone98dm/lazy-trainer-fe/issues) • [💡 Request Feature](https://github.com/simone98dm/lazy-trainer-fe/issues)

</div>
