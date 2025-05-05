<p align="center">
  <img src="https://github.com/jpsdm/meta-kit/blob/master/.github/image/meta-kit-brand.png?raw=true" alt="Meta Kit" width="250">
</p>

# Meta Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Open Source](https://img.shields.io/badge/open%20source-yes-brightgreen)](https://github.com/jpsdm/meta-kit)

## Description

**Meta Kit** is an open-source monorepo that brings together tools, libraries, and integrations for automation and communication, with an initial focus on WhatsApp and other Meta API channels. The goal is to make it easy to create, maintain, and evolve modular, scalable, and reusable solutions for message automation, bots, and Meta API integrations.

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [How to Download and Install](#how-to-download-and-install)
- [How to Run Tests](#how-to-run-tests)
- [How to Build the Project](#how-to-build-the-project)
- [How to Contribute](#how-to-contribute)
- [Opening Pull Requests](#opening-pull-requests)
- [Authors](#authors)
- [License](#license)

## Project Structure

This repository follows the monorepo pattern, where multiple packages coexist in a single repository. The main structure is:

```
meta-kit/
  ├── packages/
  │   └── whatsapp/         # WhatsApp integration package
  ├── .changeset/           # Change and version management
  ├── package.json          # Global dependencies and scripts
  ├── jest.config.ts        # Test configuration
  └── README.md             # This file
```

Each package has its own `package.json`, tests, documentation, and scripts.

## How to Download and Install

1. **Clone the repository:**

   ```
   git clone https://github.com/jpsdm/meta-kit.git
   cd meta-kit
   ```

2. **Install dependencies (requires Node.js >= 18):**

   ```
   npm install
   ```

   Or, if you prefer, use `yarn` or `pnpm`.

3. **Install package dependencies:**
   ```
   npm run install:all
   ```

## How to Run Tests

Tests are written with Jest. To run all tests in the monorepo:

```
npm test
```

To run tests for a specific package:

```
cd packages/whatsapp
npm test
```

## How to Build the Project

To build the project, follow these steps:

1. Run the build command:
   ```
   npm run build
   ```

## How to Contribute

Contributions are very welcome! Please follow these steps:

1. Fork this repository.
2. Create a branch for your feature or fix:
   ```
   git checkout -b feature/my-feature
   ```
3. Make your changes and write tests.
4. Make sure all tests are passing.
5. Open a Pull Request (PR) describing your changes.

See the [CONTRIBUTING.md](./CONTRIBUTING.md) file for more details about the contribution process and code of conduct.

## Opening Pull Requests

- Clearly describe what was changed and why.
- Link related issues, if applicable.
- Follow the project's commit and PR standards.
- Wait for team review and feedback.

## Authors

- **João Pedro Soares** - [@jpsdm](https://github.com/jpsdm) - _Main maintainer_
- See the list of [contributors](https://github.com/jpsdm/meta-kit/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

> _Made with ❤️ by [jpsdm](https://github.com/jpsdm) and contributors. Feel free to contribute, suggest improvements, or report issues!_

---
