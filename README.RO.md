# Money Guard

Money Guard este o aplicație de tip finance tracker construită cu React și Redux Toolkit.
Aplicația permite autentificare, administrarea tranzacțiilor și vizualizarea statisticilor lunare.

## Demo live

- https://rudopulos.github.io/T3-Money-Guard/

## Funcționalități principale

- înregistrare și autentificare
- rute protejate
- adăugare, editare și ștergere tranzacții
- separare venituri / cheltuieli
- statistici lunare
- interfață responsive

## Tehnologii folosite

- React 18
- React Router 6
- Redux Toolkit
- Redux Persist
- Styled Components
- MUI
- Formik + Yup
- Axios
- Chart.js

## Rulare locală

### 1. Instalare dependențe

```bash
npm install
```

### 2. Configurare mediu

Creează un fișier `.env` folosind `.env.example`.

```env
REACT_APP_API_BASE_URL=https://moneyguardbackend.onrender.com/
```

### 3. Pornire proiect

```bash
npm start
```

### 4. Build de producție

```bash
npm run build
```

### 5. Verificare cod

```bash
npm run lint:js
```

## Structură proiect

- `src/components` - componente UI reutilizabile
- `src/pages` - pagini principale
- `src/redux` - slice-uri, selectors și operații async
- `src/hooks` - hook-uri custom
- `src/styles` - stiluri globale
- `src/api` - configurare comună pentru API

## Observații

- Acest repository conține frontend-ul aplicației.
- Aplicația depinde de un backend extern.
- Proiectul a pornit ca proiect de învățare și a fost curățat pentru prezentare în portofoliu.

## Fallback demo (mod portofoliu)

Dacă backend-ul nu este disponibil, aplicația cade automat pe date demo locale în browser.

- Email demo: `demo@moneyguard.dev`
- Parolă demo: `Demo12345!`

În modul fallback, autentificarea, tranzacțiile și statisticile funcționează local, astfel încât proiectul poate fi prezentat în continuare.

