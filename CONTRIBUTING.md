# Contributing to SaaS Insights Hub

Thank you for your interest in contributing to SaaS Insights Hub! This document provides guidelines and best practices for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Component Guidelines](#component-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to professional development standards. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git
- Code editor (VS Code recommended)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd saas-insights-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run build  # Ensure it builds
   npm run lint   # Check for linting errors
   ```

4. **Commit your changes**
   - Follow commit message conventions (see below)

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

### TypeScript

- **Use TypeScript** for all new files
- **Define types** for props, state, and function parameters
- **Avoid `any`** - use proper typing
- **Use const assertions** for constant objects

```typescript
// ✅ Good
interface Props {
  title: string;
  count: number;
}

// ❌ Avoid
interface Props {
  data: any;
}
```

### React Components

- **Use functional components** with hooks
- **Extract custom hooks** for reusable logic
- **Use descriptive names** for components and functions
- **Keep components focused** - single responsibility

```typescript
// ✅ Good - Focused component
export function MetricsCard({ title, value }: Props) {
  return <div>...</div>;
}

// ❌ Avoid - Component doing too much
export function Dashboard() {
  // 500 lines of mixed concerns
}
```

### File Organization

```
src/
├── components/       # Shared UI components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── pages/           # Page components
├── services/        # Data services and API calls
└── types/           # TypeScript type definitions
```

### Naming Conventions

- **Components**: PascalCase (`MetricsCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTheme.ts`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Types**: PascalCase (`CustomerMetrics`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

## Component Guidelines

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Props } from '@/types';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component
export function Component({ title }: ComponentProps) {
  // 3.1: Hooks
  const [state, setState] = useState();
  
  // 3.2: Event handlers
  const handleClick = () => {};
  
  // 3.3: Render
  return <div>{title}</div>;
}
```

### Styling

- Use **Tailwind CSS** utility classes
- Follow existing design patterns
- Use **CSS variables** for colors
- Keep **inline styles minimal**

```typescript
// ✅ Good - Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-lg border">

// ❌ Avoid - Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### State Management

- Use **useState** for local state
- Use **React Query** for server state
- Use **custom hooks** for complex logic
- Keep state **as local as possible**

## Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(dashboard): add revenue forecast chart

# Bug fix
fix(customers): correct LTV calculation

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(services): extract customer service layer
```

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass** and build succeeds
3. **Update CHANGELOG** if applicable
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested

### PR Title Format

```
[Type] Brief description

Example:
[Feature] Add dark mode toggle to settings
[Fix] Correct metrics card animation timing
```

### PR Description Template

```markdown
## What does this PR do?
Brief description of changes

## Why is this change needed?
Context and reasoning

## How has this been tested?
Testing steps

## Screenshots (if applicable)
Visual changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Build passes successfully
```

## Best Practices

### Performance

- **Memoize expensive calculations** with `useMemo`
- **Memoize callbacks** with `useCallback`
- **Code-split** large components
- **Optimize images** and assets
- **Lazy load** non-critical components

### Accessibility

- Use **semantic HTML** elements
- Add **ARIA labels** where needed
- Ensure **keyboard navigation** works
- Test with **screen readers**
- Maintain **color contrast** ratios

### Security

- **Validate all inputs**
- **Sanitize user data**
- **Avoid inline event handlers**
- **Keep dependencies updated**
- **Don't commit secrets**

## Questions?

If you have questions or need help:
- Check existing documentation
- Review similar components
- Ask in discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to SaaS Insights Hub! 🚀
