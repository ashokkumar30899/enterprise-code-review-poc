# Contributing to Enterprise Task Manager

Thank you for your interest in contributing to **Enterprise Task Manager**! This document provides the guidelines and standard operating procedures for developing, testing, and submitting contributions to our enterprise repository.

---

## 1. Branching Strategy

We follow an enterprise-grade Git branching workflow:

### Permanent Branches
- **`main`**: Production-ready code. Releases and hotfixes land here. Direct commits are strictly prohibited.
- **`pre-prod`**: Pre-production staging environment branch for final validation and release candidate verification.
- **`qa`**: Quality assurance branch for integration testing and automated end-to-end checks.
- **`dev`**: Active integration branch for day-to-day development. All feature branches are merged here via Pull Requests.

### Temporary Branches
When working on new capabilities or fixes, branch off `dev` (or `main` in the case of critical hotfixes) using the standard prefixes:
- **`feature/<feature-name>`**: For new features or enhancements (e.g., `feature/task-priority`).
- **`bugfix/<bug-name>`**: For bug fixes targeting the development cycle.
- **`hotfix/<issue-name>`**: For urgent production fixes branching directly off `main`.

---

## 2. Commit Message Standards

We enforce [Conventional Commits](https://www.conventionalcommits.org/):

Format: `<type>(<scope>): <short description>`

Common types:
- `feat`: A new user-facing or technical feature
- `fix`: A bug fix
- `docs`: Documentation changes only
- `style`: Formatting, missing semicolons, etc. (no production code change)
- `refactor`: Refactoring production code without changing behavior
- `test`: Adding or modifying tests
- `chore`: Build system, configuration, or dependency updates

*Example:* `feat(tasks): add task priority management`

---

## 3. Local Development Workflow

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: v9 or higher
- **Git**: v2.30 or higher

### Getting Started
1. Clone the repository and navigate into the root directory:
   ```bash
   git clone <REPOSITORY_URL>
   cd enterprise-code-review-poc
   ```
2. Check out the `dev` branch:
   ```bash
   git checkout dev
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```

### Quality and Verification Scripts
Before committing or submitting a pull request, ensure all checks pass:
- **Linting**: `npm run lint`
- **Type Checking**: `npm run typecheck`
- **Unit Testing**: `npm run test:run`
- **Production Build**: `npm run build`

---

## 4. Pull Request (PR) Process

1. Create a dedicated branch off `dev`:
   ```bash
   git checkout -b feature/my-new-feature dev
   ```
2. Implement your changes, adhering to coding standards and test coverage requirements.
3. Verify all checks pass locally (`npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`).
4. Commit your changes with conventional commit messages.
5. Push the feature branch to GitHub:
   ```bash
   git push -u origin feature/my-new-feature
   ```
6. Open a Pull Request targeting `dev` using the provided Pull Request template.
7. Ensure all automated CI checks succeed.
8. Request review from CODEOWNERS / peer reviewers.
9. Never merge directly or bypass branch protections.

