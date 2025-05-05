# Contributing to Meta Kit

Thank you so much for considering contributing to this project! 🎉  
All contributions are welcome and help make Meta Kit better for everyone.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [How to Contribute](#how-to-contribute)
- [Code Standards](#code-standards)
- [Testing Policy](#testing-policy)
- [Code Review](#code-review)
- [Types of Contributions](#types-of-contributions)
- [Communication](#communication)
- [Acknowledging Contributions](#acknowledging-contributions)

---

## Introduction

Welcome to **Meta Kit**!  
We are glad you are considering contributing. Whether it's fixing bugs, suggesting improvements, adding features, or improving documentation, every bit of help is important.

## Prerequisites

Before you start, make sure you have:

- [Node.js](https://nodejs.org/) (recommended version: 18 or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- A [GitHub](https://github.com/) account

## Setting Up the Development Environment

1. Fork this repository and clone it to your machine:
   ```
   git clone https://github.com/jpsdm/meta-kit.git
   cd meta-kit
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Follow the specific instructions for each package in `packages/<package-name>/README.md` for additional setup.

## How to Contribute

1. Create a branch for your contribution:
   ```
   git checkout -b [feature, fix, hotfix...]/my-feature
   ```
2. Make your changes, write tests, and ensure everything is working.
3. Write clear and objective commit messages (see [Code Standards](#code-standards)).
4. Push your branch to your fork:
   ```
   git push origin [feature, fix, hotfix...]/my-feature
   ```
5. Open a Pull Request (PR) detailing your changes.

## Code Standards

- Follow the code style defined by the project (see configuration files like `.editorconfig`, `.eslintrc`, etc).
- Write clear and descriptive commit messages. Example:

  ```
  feat(whatsapp): add support for sending images
  fix: fix bug in text message builder
  docs: update documentation for whatsapp package
  ```

- Prefer using English for code and commit messages.

## Testing Policy

- Every new feature or bug fix must be accompanied by automated tests.
- Use the command:

  ```
  npm test
  ```

  to run tests before opening a PR.

- Tests should be clear, objective, and cover relevant cases.

## Code Review

- All PRs will be reviewed by at least one maintainer.
- Respond to reviewer comments and make adjustments as needed.
- PRs will only be accepted after approval.

## Types of Contributions

You can contribute in several ways, including:

- Bug fixes
- New features
- Performance improvements
- Updating or creating documentation
- Suggesting improvements
- Automated tests

## Communication

- Use [Issues](https://github.com/jpsdm/meta-kit/issues) to report bugs, suggest improvements, or ask questions.
- For faster discussions, use the communication channels indicated in the README or in the package documentation.

## Acknowledging Contributions

All contributions will be recognized in the project's contributors section.  
Feel free to add your name when opening a PR!
