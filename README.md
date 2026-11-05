# Enterprise Task Manager

An enterprise-ready, high-performance Task Management web application built with **React**, **TypeScript**, and **Vite**. Features client-side persistence via `localStorage`, strict type safety, modular architecture, responsive UI, and continuous integration workflows.

---

## Features

- **Executive Dashboard**: Real-time metrics tracking total tasks, completed tasks, and pending tasks.
- **Task Lifecycle Management**: Create, edit, toggle completion status, and remove tasks.
- **Status & Priority Filtering**: Quickly filter tasks by pending/completed status and by priority levels (Low, Medium, High).
- **Client Persistence**: Seamlessly preserves state across browser reloads via a robust `localStorage` service.
- **Enterprise Standards**:
  - Full TypeScript type coverage with strict compiler flags.
  - Vitest + React Testing Library unit & component test suite.
  - ESLint and Prettier for code consistency and clean code patterns.
  - GitHub Actions CI matrix running on all pull requests and branch updates.

---

## Architecture & Repository Structure

```
enterprise-code-review-poc/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── ci.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── public/
├── src/
│   ├── components/
│   │   ├── TaskDashboard.tsx
│   │   ├── TaskFilter.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskList.tsx
│   ├── services/
│   │   └── taskStorage.ts
│   ├── types/
│   │   └── task.ts
│   ├── utils/
│   │   └── dateUtils.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests/
│   ├── setup.ts
│   ├── App.test.tsx
│   ├── TaskDashboard.test.tsx
│   ├── TaskFilter.test.tsx
│   └── taskStorage.test.ts
├── .gitignore
├── .prettierrc
├── CONTRIBUTING.md
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone <REPOSITORY_URL>
cd enterprise-code-review-poc

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Launches local Vite development server with HMR |
| Build | `npm run build` | Compiles TypeScript and builds production assets into `dist/` |
| Preview | `npm run preview` | Previews the production build locally |
| Lint | `npm run lint` | Runs ESLint analysis across TypeScript and React code |
| Type Check | `npm run typecheck` | Validates TypeScript types across the codebase |
| Test | `npm run test` | Runs Vitest in watch mode |
| Test (CI) | `npm run test:run` | Executes single-run unit and integration test suite |
| Coverage | `npm run test:coverage` | Generates test coverage report |
| Format Check | `npm run format:check` | Checks formatting compliance with Prettier |
| Format Fix | `npm run format` | Auto-formats code using Prettier |

---

## Git Branching Strategy

Our team utilizes a multi-tier branch topology:
- `main`: Production releases (protected).
- `pre-prod`: Pre-production release validation.
- `qa`: Quality assurance & automated staging tests.
- `dev`: Primary active development integration branch.
- `feature/*`: Specific feature branches branched from and merged into `dev`.
- `bugfix/*`: Bug fixes targeting `dev`.
- `hotfix/*`: Emergency patches directly targeting `main`.

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

