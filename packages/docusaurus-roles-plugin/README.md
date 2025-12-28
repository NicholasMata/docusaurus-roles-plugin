# Docusaurus Roles Plugin

Role-based access control (RBAC) for **Docusaurus docs and blogs**, using front matter and a runtime role provider.

This plugin allows you to **conditionally hide or forbid access** to content (docs, blog posts, nav items, and sidebars) based on user roles that *you* define and resolve.

> [!CAUTION]
> This plugin **does not provide true security**. It operates at the **UI and routing layer only**.
>
> **You are responsible for protecting your content at the hosting / network level** (for example, via authentication, authorization rules, or server-side enforcement).
>
> Treat this plugin as a **presentation and UX layer**, not a security boundary.

---

## Features

- 🔒 Restrict access to **individual docs and blog posts**
- 🧭 Hide or filter **navbar items**
- 📚 Restrict **doc and blog sidebars**
- 🧩 Works with async role resolution (e.g. auth providers, APIs)
- 🏷️ Role requirements defined directly in **front matter**

---

## Installation

```bash
npm install docusaurus-roles-plugin
```

---

## Configuration

### 1. Add the plugin to `docusaurus.config.ts`

```ts
import { protectBlogSidebar, protectDocSidebar } from "docusaurus-roles-plugin";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarItemsGenerator: protectDocSidebar,
        },
        blog: {
          processBlogPosts: protectBlogSidebar,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-roles-plugin",
      {
        // Defaults
        unauthorizedBehavior: "forbidden"
      } satisfies RolesPluginOptions,
    ],
  ],
};

export default config;
```

---

### 2. Provide user roles at runtime

Create or modify `/src/theme/Root.tsx` and wrap your site with the `RolesProvider`.

```tsx
import React from "react";
import { RolesProvider } from "docusaurus-roles-plugin/runtime";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <RolesProvider
      roles={async () => {
        // Retrieve roles for current user.
        return ["admin", "editor"];
      }}
    >
      {children}
    </RolesProvider>
  );
}
```

---

## Restricting Docs or Blog Posts

```md
---
required_roles:
  - admin
  - editor
required_roles_mode: all
---
```

### Fields

| Field               | Description                                 |
| ------------------- | ------------------------------------------- |
| required_roles      | Array of roles required to view the content |
| required_roles_mode | "all" (default) or "any"                    |

**Examples**

* **all**: User must have *every* listed role
* **any**: User must have *at least one* listed role

---

## Unauthorized Behavior

You can control what happens when a user lacks required roles:

```ts
unauthorizedBehavior: "forbidden" | "redirect";
redirectTo: "/404" | "...";
```

* **forrbidden** → Renders swizzlable (customizable) forbidden component.
* **redirect** → Redirects the user to a custom route.

---

## Azure Static Web Apps (Example Use Case)

*This is the primary environment this plugin was designed for.*

### Why Azure Static Web Apps?

Azure Static Web Apps provides built-in:

* Authentication (Entra ID / Azure AD)
* Authorization via role claims
* Role exposure to the frontend

Relevant documentation:

* [https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization)
* [https://learn.microsoft.com/en-us/azure/static-web-apps/user-information](https://learn.microsoft.com/en-us/azure/static-web-apps/user-information)

---

### Example `staticwebapp.config.json`

```json
{
  "routes": [
    {
      "route": "/",
      "allowedRoles": ["anonymous", "authenticated"]
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/login",
      "statusCode": 302
    },
    "403": {
      "rewrite": "/unauthorized.html"
    }
  },
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "https://login.microsoftonline.com/***/v2.0",
          "clientIdSettingName": "***",
          "clientSecretSettingName": "***"
        },
        "login": {
          "loginParameters": [
            "scope=openid profile email"
          ]
        }
      }
    }
  }
}
```

Your `RolesProvider` can map Azure-provided role claims directly into the plugin.

---

## Philosophy & Scope

* This plugin is intentionally **opinionated**
* It solves **content gating**, not authentication
* It is designed to integrate with **existing auth systems**
* No assumptions are made about identity providers

If your needs differ, feel free to open an issue or fork.

---

## Contributing

This plugin primarily serves my own use cases, but suggestions and improvements are welcome.

* 🐛 Bug reports
* 💡 Feature ideas
* 🧩 Integration examples

Please open an issue with context about your setup.
