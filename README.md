# 🔍 SupplyLens

> End-to-end supply chain visibility — powered by real-time data and AI.

SupplyLens is an intelligent supply-chain visibility platform that helps businesses track, analyze, and optimize their supply chain operations in real time.

---

## 📁 Project Structure

```
SupplyLens/
├── frontend/        # React.js + Tailwind CSS (Vite)
├── backend/         # API server (coming soon)
└── README.md        # You are here
```

---

## 🚀 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React.js, Tailwind CSS v4, Vite     |
| Backend   | Coming soon                         |
| Tooling   | ESLint, npm                         |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- Git

### 1. Clone the repository

```bash
git clone https://github.com/your-username/SupplyLens.git
cd SupplyLens
```

### 2. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at **http://localhost:5173**

### 3. Build for Production

```bash
cd frontend
npm run build
```

If the frontend is deployed separately from the backend, set `VITE_API_URL` to the deployed auth base URL before building, for example `https://api.example.com/api/auth`.

---

## 🌿 Branch Naming Convention

Use the following format when creating branches:

| Type       | Format                        | Example                        |
|------------|-------------------------------|--------------------------------|
| Feature    | `feat/short-description`      | `feat/add-login-page`          |
| Bug Fix    | `fix/short-description`       | `fix/navbar-overflow`          |
| Hotfix     | `hotfix/short-description`    | `hotfix/crash-on-submit`       |
| Docs       | `docs/short-description`      | `docs/update-readme`           |
| Chore      | `chore/short-description`     | `chore/upgrade-dependencies`   |

---

## 🔃 How to Raise a Pull Request (PR)

Follow these steps to contribute to SupplyLens:

### Step 1 — Fork & Clone

```bash
# Fork the repo from GitHub, then clone your fork
git clone https://github.com/your-username/SupplyLens.git
cd SupplyLens
```

### Step 2 — Create a new branch

```bash
# Always branch off from main
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

### Step 3 — Make your changes

- Write clean, readable code
- Follow existing code style and conventions
- Keep changes focused — one feature or fix per PR

### Step 4 — Commit your changes

Use clear, descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add supplier dashboard component"
```

Common commit prefixes:

| Prefix     | Use for                              |
|------------|--------------------------------------|
| `feat:`    | A new feature                        |
| `fix:`     | A bug fix                            |
| `docs:`    | Documentation changes                |
| `style:`   | Formatting, no logic change          |
| `refactor:`| Code refactor, no feature/fix        |
| `chore:`   | Build process or tooling changes     |

### Step 5 — Push your branch

```bash
git push origin feat/your-feature-name
```

### Step 6 — Open a Pull Request on GitHub

1. Go to the repository on GitHub
2. Click **"Compare & pull request"**
3. Fill in the PR template:
   - **Title** — short and descriptive
   - **Description** — what changed and why
   - **Screenshots** — attach UI screenshots if applicable
   - **Related issue** — link any related issue (e.g. `Closes #42`)
4. Request a review from a team member
5. Click **"Create Pull Request"**

### Step 7 — Address review feedback

- Respond to all comments
- Push additional commits to the same branch
- Once approved, a maintainer will merge your PR

---

## ✅ PR Checklist

Before submitting your PR, make sure:

- [ ] Code builds without errors (`npm run build`)
- [ ] No console errors or warnings
- [ ] UI is responsive and tested on mobile
- [ ] Commit messages follow Conventional Commits
- [ ] PR description clearly explains the change
- [ ] Screenshots added (for UI changes)
- [ ] No unnecessary files committed (e.g. `node_modules`, `dist`)

---

## 🛡️ Code of Conduct

Be respectful, inclusive, and constructive. We welcome contributors of all experience levels.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Have questions or suggestions? Reach out at **hello@supplylens.io** or open a [GitHub Issue](https://github.com/your-username/SupplyLens/issues).

---

<p align="center">Made with ❤️ by the SupplyLens Team</p>