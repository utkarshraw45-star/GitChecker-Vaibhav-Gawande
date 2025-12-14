# 🦇 GitChecker

**GitChecker** is an AI-powered developer tool designed to analyze GitHub repositories and provide actionable feedback. It acts as a personal senior code reviewer, helping students and developers verify if their code is "job-ready."

## ✨ Features

- **AI-Powered Analysis**: Uses Google's Gemini Flash model to scan repositories for cleanliness, documentation, structure, and best practices.
- **Smart Scoring**: Generates a weighted score (0-100) based on critical code quality metrics.
- **Actionable Roadmap**: Provides a step-by-step improvement plan to increase code quality.
- **Interactive UI**: Features a 3D interactive Bat mascot that reacts to user interactions (hover/click).
- **Print Friendly**: Optimized CSS for generating PDF reports of the analysis.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
- **Animations**: CSS Keyframes, SVG manipulations

## 🛠️ Setup & Usage

1. **Environment Variables**:
   Ensure you have a valid Google Gemini API Key.
   Set `process.env.API_KEY` in your environment configuration.

2. **Installation**:
   ```bash
   npm install
   ```

3. **Run Application**:
   ```bash
   npm start
   ```

4. **Usage**:
   - Paste a public GitHub repository URL into the input field.
   - Click "Analyze".
   - View your score, detailed breakdown, and improvement roadmap.

## 🎮 Easter Eggs

- **The Bat**: Try hovering over the bat in the dashboard for a flutter effect, or click it for a spin-and-talk animation!

## 📄 License

MIT License.
