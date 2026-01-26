# Certify Pro - Authentic Certificate Generator

Certify Pro is a powerful, professional web application designed to generate, manage, and verify authentic certificates. Built with modern web technologies, it offers a seamless experience for creating high-quality, printable certificates with dynamic data.

## 🚀 Tech Stack & Libraries

This project leverages a modern stack for performance and developer experience:

### Core Framework
- **[Next.js 16](https://nextjs.org/)**: React framework with Turbopack for lightning-fast builds.
- **[TypeScript](https://www.typescriptlang.org/)**: For type-safe code and better maintainability.

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework (latest version).
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI primitives (Dialog, Popover, Select, etc.).
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icons.
- **[Framer Motion](https://www.framer.com/motion/)**: For smooth animations and transitions.
- **[Sonner](https://sonner.emilkowal.ski/)** & **Toast**: For elegant user notifications.

### State & Forms
- **[Zustand](https://github.com/pmndrs/zustand)**: Small, fast, and scalable state management.
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms.
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation.

### Rich Text & Content
- **[Tiptap](https://tiptap.dev/)**: Headless wrapper for ProseMirror, used for the rich text editor.

### Generation & Export
- **[jspdf](https://github.com/parallax/jsPDF)**: Client-side PDF generation.
- **[html-to-image](https://github.com/bubkoo/html-to-image)**: Converts DOM nodes to images (for previews/exports).
- **[qrcode](https://github.com/soldair/node-qrcode)**: QR code generation for certificate verification.
- **[PapaParse](https://www.papaparse.com/)**: CSV parsing for bulk data import.

---

## 🛠️ Prerequisites

- **Node.js**: Version 20 or higher is recommended.
- **pnpm**: This project uses pnpm for dependency management. Assumed installed globally (`npm install -g pnpm`).

## 📥 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khadka27/certify-pro.git
    cd certify-pro
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # OR if you must use npm
    npm install
    ```

## 🏃‍♂️ Running the Project

The application is configured to run on port **3000** by default.

### Development Mode
Runs the app with hot verification and TurboPack.
```bash
pnpm dev
# App will run at http://localhost:3000
```

### Production Build
Builds the application for production usage.
```bash
pnpm build
pnpm start
# App will run at http://localhost:3000
```

---

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory (or use the existing one). Key variables include:

```env
# Server Port
PORT=3000

# Base URL for the application (used for absolute links in exports)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Directory for storing local JSON data (settings, etc.)
STORAGE_DIR=data
```

### CORS & Images
The project is configured in `next.config.js` to allow CORS for API routes and specific remote patterns for images. If you are hosting images externally, ensure the domain is added to `remotePatterns` in `next.config.js`.

---

## 📂 Project Structure

- **/app**: Next.js App Router pages and API routes.
- **/components**: Reusable UI components and Certificate Templates.
  - **/templates**: Implementation of different certificate designs.
  - **/editor**: Form components for editing certificate data.
  - **/ui**: Base UI components (Buttons, Inputs, Cards).
- **/lib**: Utility functions (store, image processing, URL helpers).
- **/public**: Static assets (logos, placeholders).
- **/types**: TypeScript type definitions.

---

## 📝 Usage Guide

1.  **Settings**: Go to `/settings` to upload reusable assets like Company Logos, Signatures, and Badges.
2.  **Editor**: Use the main dashboard to fill in certificate details or bulk import data via CSV.
3.  **Preview**: Select a template (e.g., Template 14) to see real-time updates.
4.  **Export**: Download the certificate as a high-quality PDF or Image.
