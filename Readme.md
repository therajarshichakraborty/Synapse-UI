# 🚀 Synapse UI

Synapse UI is a modern, production-ready UI component library built for scalable web applications using **Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Bun**.

> Designed for developers who want speed, consistency, and beautiful UI without reinventing the wheel.

## ✨ Features

- 🎯 **100+ Premium Components**
- ⚡ Built with **Next.js + TypeScript**
- 🎨 Powered by **Tailwind CSS + shadcn/ui**
- 🧩 Fully **modular & reusable components**
- 🌙 Built-in **Dark Mode Support**
- 📱 **Responsive by default**
- 🚀 Optimized for **performance & scalability**
- 🧪 Developer-friendly architecture
- 🛠️ Works seamlessly with **Bun runtime**

## 📦 Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Primitives:** shadcn/ui
- **Runtime:** Bun

## 📁 Project Structure

```
.
├── components/
│   ├── ui/            # Core reusable UI components
│   ├── layouts/       # Layout components
│   └── modules/       # Feature-based components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── styles/            # Global styles
├── public/            # Static assets
└── app/               # Next.js app directory
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/chakrabortyrajarshi2005/Synapse-UI.git
cd Synapse-UI
```

### 2. Install dependencies (using Bun)

```bash
bun install
```

### 3. Run the development server

```bash
bun dev
```

## 🚀 Usage

Import and use components directly:

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button variant="default">Click Me</Button>;
}
```

## 🧩 Component Categories

- Buttons
- Cards
- Forms
- Modals
- Navigation
- Tables
- Dashboards
- Loaders & Skeletons
- Alerts & Toasts
- Authentication UI
- And many more...

## 🎨 Customization

You can customize the design system via:

- `tailwind.config.ts`
- CSS variables
- shadcn/ui theme tokens

Example:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
      },
    },
  },
};
```

## 🌙 Dark Mode

Dark mode is supported out of the box using Tailwind's `class` strategy.

```tsx
<html className="dark">
```

## 📈 Performance

- Tree-shakable components
- Minimal bundle size
- Optimized for Next.js App Router
- Lazy loading supported

## 🛠️ Development Guidelines

- Use **TypeScript strictly**
- Follow **component-driven architecture**
- Keep components **small and reusable**
- Maintain consistent naming conventions

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**.

## 💡 Vision

Synapse UI aims to become a **go-to UI system for modern developers**, combining performance, accessibility, and design consistency in one place.

## 🔗 Connect

If you like this project, consider giving it a ⭐ on GitHub and sharing it with others!

## 🧠 Author

**Rajarshi Chakraborty**
Full-Stack TypeScript Developer | Backend Engineer | Developer

> "Build faster. Design smarter. Scale effortlessly." ⚡
