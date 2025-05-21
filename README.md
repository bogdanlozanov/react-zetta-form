# React Zetta - Dynamic JSON-Driven Form Builder

A React Single Page Application (SPA) that dynamically generates interactive forms from a JSON input.  
Supports nested groups, dynamic visibility, validation rules, API auto-fill (mocked), and outputs filled data as JSON.

---

## Features

- **Dynamic form rendering** based on JSON schema input  
- Supports field types: Text, Textarea, Dropdown, Checkbox, Radio, and Validated Text  
- Nested groups with visual encapsulation  
- Dynamic visibility and validation rules based on other fields  
- Mocked API integration for autofill functionality  
- Form submission outputs structured JSON preserving hierarchy  
- Responsive and user-friendly UI built with MUI  
- Auto-save progress to localStorage (bonus feature)  

---

## Tech Stack

- React 19 + TypeScript  
- Vite (build tool)  
- react-hook-form (form management)  
- zod (validation schema)  
- @hookform/resolvers (validation schema integration)  
- axios (API requests)  
- msw (mock service worker for API mocking)  
- MUI (UI components)  
- @emotion/react, @emotion/styled (styling engine for MUI)  
- clsx (conditional classNames)  
- Vitest + React Testing Library (unit testing)

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run tests

```bash
npm run test
```

---

## JSON Input Format

Paste JSON describing the form layout in the top input field. Example:

```json
{
  "fields": [
    {
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "validation": { "required": true }
    },
    {
      "name": "contactType",
      "label": "Contact Type",
      "type": "dropdown",
      "options": ["Email", "Phone"]
    },
    {
      "group": "contactDetails",
      "visibleIf": { "contactType": "Email" },
      "fields": [
        { "name": "email", "label": "Email Address", "type": "text", "validation": { "pattern": "email" } }
      ]
    }
  ]
}
```

---

## Project Structure

```
src/
├── api/              # API mocks and helpers
├── components/       # Reusable UI components
├── features/         # Form builder logic and components
├── hooks/            # Custom hooks
├── lib/              # Utility functions
├── types/            # TypeScript types
├── App.tsx
└── main.tsx
```

---

## Notes

- API calls are mocked with MSW.  
- Form state is managed with react-hook-form for optimal performance.  
- Validation schemas are dynamically generated with Zod.  
- UI uses Material UI components for accessibility and polish.  

---

## License

MIT
