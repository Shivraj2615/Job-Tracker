# 💼 Job Tracker

A full-stack MERN application to track and manage job applications efficiently.

Built to help job seekers organize applications, monitor application status, and use AI-powered tools to analyze job descriptions and match resumes against job requirements.

---

## 🚀 Live Demo

https://job-tracker-y9v2.onrender.com/

---

## 📌 Features

### 🔐 Authentication

- User Registration and Login
- JWT-based authentication
- Protected routes

### 📋 Job Application Management

- Add job applications
- Edit job applications
- Delete job applications
- View all applications
- Filter applications by status
- Track application details

### 📊 Dashboard

- Application statistics
- Job application status overview
- Analytical dashboard

### 🤖 AI-Powered Features

- **Job Description Analysis**
  - Extract job role
  - Identify required skills
  - Identify preferred skills
  - Extract experience requirements
  - Extract responsibilities
  - Identify important keywords

- **Resume Match**
  - Compare resume against a job description
  - Generate a match score
  - Provide an AI-generated explanation of the match

- **AI Provider Fallback**
  - Groq used as the primary AI provider
  - Gemini used as an automatic fallback when Groq is unavailable
  - AI API keys remain secured on the backend

### 📱 UI

- Responsive user interface
- Mobile-friendly navigation
- Protected application pages

### ☁️ Deployment

- Frontend and backend deployed on Render
- Production environment configuration

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router
- Context API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

### AI Integration

- Google Gemini API
- Groq API

### Deployment

- Render

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shivraj2615/job-tracker.git
cd job-tracker
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🎯 Future Improvements

- Advanced application analytics
- Follow-up and interview reminders
- Job search API integration
- Pagination and sorting
- Additional application insights

---

## 👨‍💻 Project Goal

Job Tracker was built as a practical full-stack application to demonstrate:

- REST API development
- Authentication and authorization
- Database design with MongoDB
- React state management
- Frontend-backend integration
- AI API integration
- LLM provider fallback architecture
- Deployment of a full-stack application

---

## 👨‍💻 Author

- Shivraj Jagdale
