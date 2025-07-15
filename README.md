# StudentsPark - College Placement Review Platform

A modern web platform for students to share and discover college placement experiences, built with React + TypeScript + Vite and powered by MongoDB.

## 🎯 Features

- **📝 Interview Stories**: Share detailed placement experiences with ratings and feedback
- **🏢 Company Grouping**: View multiple reviews organized by company
- **🔍 Smart Search**: Filter and sort reviews by company, rating, and date
- **📊 Statistics**: Company-wise review counts and average ratings
- **🎨 Netflix-Style UI**: Modern dark theme with responsive design
- **💾 Persistent Storage**: All data stored in MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jayantsharma13/StudentsPark.git
cd StudentsPark
```

2. Install dependencies:
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

4. Start the application:
```bash
# Option 1: Use the batch file (Windows)
start-full-stack.bat

# Option 2: Manual start
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Ready for Vercel/Netlify (frontend) and Railway/Heroku (backend)

## 📁 Project Structure

```
StudentsPark/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── types/             # TypeScript type definitions
│   └── assets/            # Static assets
├── backend/               # Backend API server
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── config/            # Database configuration
│   └── controllers/       # Route handlers
├── public/                # Public static files
└── dist/                  # Build output
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for students, by students

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
