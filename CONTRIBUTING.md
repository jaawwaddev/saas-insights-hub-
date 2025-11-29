# Contributing to SaaS Insights Hub

First off, thank you for considering contributing to SaaS Insights Hub! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style guidelines
4. Make sure your code lints (`npm run lint`)
5. Format your code (`npm run format`)
6. Write clear commit messages
7. Submit a pull request!

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

### TypeScript Style Guide

- Use TypeScript features: interfaces, types, enums
- Avoid `any` types - be explicit
- Use functional components with hooks
- Follow naming conventions:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Interfaces: PascalCase with 'I' prefix or descriptive name

### Component Guidelines

- One component per file
- Use functional components with TypeScript
- Include PropTypes/Interfaces for all props
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

## Development Process

1. **Setup**: Follow the README instructions to set up your development environment
2. **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Develop**: Make your changes with clear, focused commits
4. **Test**: Ensure everything works and no regressions occur
5. **Lint**: Run `npm run lint` and fix any issues
6. **Format**: Run `npm run format`
7. **Commit**: Commit your changes with a descriptive message
8. **Push**: Push to your fork
9. **PR**: Open a Pull Request with a clear description

## Questions?

Feel free to open an issue for clarification or reach out to the maintainers.

Thank you for contributing!

