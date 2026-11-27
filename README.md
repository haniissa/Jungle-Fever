# Jungle Fever Coffee & Tea House

Bilingual (English LTR / Arabic RTL) web application for **Jungle Fever Coffee & Tea House** atop the Jordan National Gallery of Fine Arts in Jabal Al-Weibdeh, Amman, built with **Hono.js** and **DaisyUI**.

## Publishing to GitHub Pages (Client Preview)

This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that builds a static GitHub Pages preview (`npm run build:pages`) where menu filtering, Arabic/English switching, Amman opening status, and table reservation requests all work directly in the browser (persisted in `localStorage`) with no backend server required.

1. Push this project to a GitHub repository on the `main` branch.
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push a commit (or click **Run workflow** in the **Actions** tab) — your live preview will be published at `https://<your-username>.github.io/<repo-name>/`.

## Running Full-Stack Locally (Hono.js + Vite)

```bash
npm install
npm run dev
```

The Hono.js server and Vite frontend run together on `http://localhost:3000`.
