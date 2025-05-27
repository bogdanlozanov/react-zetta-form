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
- MUI (UI components)   
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

Paste JSON describing the form layout in the top input field. Examples:

## 1. Flat Form (group: "Basic Info")
```json
{
  "group": "Basic Info",
  "fields": [
    {
      "name": "firstName",
      "label": "First Name",
      "type": "text",
      "required": true
    },
    {
      "name": "bio",
      "label": "Bio",
      "type": "textarea"
    },
    {
      "name": "country",
      "label": "Country",
      "type": "dropdown",
      "options": ["USA", "Canada", "Germany"]
    },
    {
      "name": "terms",
      "label": "Accept Terms",
      "type": "checkbox"
    },
    {
      "name": "gender",
      "label": "Gender",
      "type": "radio",
      "options": ["Male", "Female", "Other"]
    }
  ]
}
```

## 2. Single Nested Group (group: "Contact Form")
```json
{
  "group": "Contact Form",
  "fields": [
    {
      "name": "email",
      "label": "Email Address",
      "type": "text",
      "required": true
    },
    {
      "group": "Address Information",
      "fields": [
        {
          "name": "street",
          "label": "Street",
          "type": "text"
        },
        {
          "name": "city",
          "label": "City",
          "type": "text"
        },
        {
          "name": "zip",
          "label": "Zip Code",
          "type": "text",
          "validation": {
            "pattern": "^[0-9]{5}$"
          }
        }
      ]
    }
  ]
}
```

## 3. Deeply Nested (group: "User Registration")
```json
{
  "group": "User Registration",
  "fields": [
    {
      "name": "userType",
      "label": "User Type",
      "type": "dropdown",
      "options": ["INDIVIDUAL", "BUSINESS"]
    },
    {
      "group": "Personal Details",
      "dependsOn": "userType",
      "dependsOnValue": "INDIVIDUAL",
      "fields": [
        {
          "name": "fullName",
          "label": "Full Name",
          "type": "text"
        },
        {
          "group": "Identification",
          "fields": [
            {
              "name": "idType",
              "label": "Identification Type",
              "type": "dropdown",
              "options": ["PERSONAL ID", "PASSPORT"]
            },
            {
              "name": "idNumber",
              "label": "ID Number",
              "type": "text",
              "validation": {
                "pattern": "^[A-Z0-9]{6,12}$"
              }
            }
          ]
        }
      ]
    },
    {
      "group": "Business Details",
      "dependsOn": "userType",
      "dependsOnValue": "BUSINESS",
      "fields": [
        {
          "name": "companyName",
          "label": "Company Name",
          "type": "text"
        },
        {
          "group": "Registration Info",
          "fields": [
            {
              "name": "vatNumber",
              "label": "VAT Number",
              "type": "text"
            },
            {
              "group": "Legal Rep",
              "fields": [
                {
                  "name": "repName",
                  "label": "Representative Name",
                  "type": "text"
                },
                {
                  "name": "repEmail",
                  "label": "Representative Email",
                  "type": "text"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## 4. Autofill VAT (group: "Company Autofill")
```json
{
  "group": "Company Autofill",
  "fields": [
    {
      "name": "companyName",
      "label": "Company Name",
      "type": "text"
    },
    {
      "name": "vatNumber",
      "label": "VAT Number",
      "type": "text",
      "autoFill": {
        "api": "fetchVatInfo",
        "params": ["companyName"]
      }
    }
  ]
}
```
## 5 Autofill User Info (group: "User Info Autofill")
```json
{
  "group": "User Info Autofill",
  "fields": [
    {
      "name": "firstName",
      "label": "First Name",
      "type": "text"
    },
    {
      "name": "bio",
      "label": "Biography",
      "type": "textarea",
      "autoFill": {
        "api": "fetchUserInfo",
        "params": ["firstName"]
      }
    },
    {
      "name": "gender",
      "label": "Gender",
      "type": "dropdown",
      "options": ["Male", "Female", "Other"],
      "autoFill": {
        "api": "fetchUserInfo",
        "params": ["firstName"]
      }
    }
  ]
}
```
