# Bin2Dec 🔢

A sleek and modern web application that converts binary numbers (base 2) to decimal numbers (base 10). Built with React, TypeScript, TailwindCSS, and Vite, this project showcases a clean, minimalist, and highly functional frontend implementation.

<div align="center">
  <img src="./public/screenshot.png" alt="Bin2Dec Application Preview" width="600" />
</div>

---

## 🚀 Live Demo

Experience the app in action: **[https://bin-two-dec.vercel.app/](https://bin-two-dec.vercel.app/)**

---

## ✨ Features

- 🔄 **Instant Conversion**: Real-time binary to decimal conversion
- 🛡️ **Input Validation**: Accepts only valid binary digits (0 and 1)
- 📱 **Responsive Design**: Fully responsive interface built with TailwindCSS
- ⚡ **Lightning Fast**: Optimized build process with Vite
- 🔧 **Type Safety**: Written entirely in TypeScript
- 🎨 **Modern UI**: Clean and intuitive user interface

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19 | Frontend Framework |
| [TypeScript](https://www.typescriptlang.org/) | Latest | Type Safety |
| [Vite](https://vitejs.dev/) | 6 | Build Tool & Dev Server |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Styling Framework |
| [ESLint](https://eslint.org/) | Latest | Code Linting |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bin2dec.git
cd bin2dec

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint to check for code issues |
| `npm run lint:fix` | Automatically fixes linting issues |

---

## 📁 Project Structure

```
bin2dec/
├── public/
│   ├── KWK.png
│   └── screenshot.png
├── src/
│   ├── components/
│   │   └── [Component files]
│   ├── types/
│   │   └── [Type definitions]
│   ├── utils/
│   │   └── [Utility functions]
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.js
└── README.md
```

---

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**:

### Automatic Deployment
- Connected to GitHub for continuous deployment
- Automatically builds and deploys on every push to main branch
- Build output directory: `dist/`

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel --prod
```

### Environment Configuration
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Joseph Kawe**

- GitHub: [https://github.com/dev-kohako](https://github.com/dev-kohako)
- LinkedIn: [https://www.linkedin.com/in/josephkawe/](https://www.linkedin.com/in/josephkawe/)
- Email: josephkawe000@gmail.com

---

<div align="center">
  <p>Made with ❤️ by Joseph Kawe</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
