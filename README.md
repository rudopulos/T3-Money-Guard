# Money Guard

Money Guard is a responsive personal finance tracker built with React and Redux Toolkit.
It allows users to register, log in, manage transactions, and view statistics for their income and expenses.

## Live demo

- Live app: https://rudopulos.github.io/T3-Money-Guard/

## Main features

- User authentication
- Protected routes
- Add, edit, and delete transactions
- Income and expense separation
- Monthly statistics view
- Responsive layout for desktop and mobile
- Persisted auth and selected app state

## Tech stack

- React 18
- React Router 6
- Redux Toolkit
- Redux Persist
- Styled Components
- MUI
- Formik + Yup
- Axios
- Chart.js

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env` file based on `.env.example`.

```env
REACT_APP_API_BASE_URL=https://moneyguardbackend.onrender.com/
```

### 3. Start development server

```bash
npm start
```

### 4. Create a production build

```bash
npm run build
```

### 5. Run lint

```bash
npm run lint:js
```

## Project structure

- `src/components` - reusable UI components
- `src/pages` - application pages
- `src/redux` - slices, selectors, and async operations
- `src/hooks` - custom hooks
- `src/styles` - global styles and shared tokens
- `src/api` - shared API client configuration

## Deployment

The project is configured for GitHub Pages deployment.

- `homepage` is set in `package.json`
- `BrowserRouter` uses the correct basename
- GitHub Actions workflow is available in `.github/workflows/deploy.yml`

## Notes

- This repository contains the frontend application.
- The app depends on an external backend API.
- This project was created as a learning project and then cleaned up for portfolio presentation.

## Demo fallback (portfolio mode)

If the backend API is unavailable, the app automatically falls back to local demo data in the browser.

- Demo email: `demo@moneyguard.dev`
- Demo password: `Demo12345!`

In fallback mode, auth, transactions, and statistics continue to work locally so the project can still be presented.
