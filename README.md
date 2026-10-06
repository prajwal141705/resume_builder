# AI-Powered Resume Builder & Job Matcher Platform (Frontend)

A modern, production-ready React application engineered to build ATS-friendly resumes and match candidate profiles against tech job descriptions using AI-driven semantic keyword analysis.

---

## 🚀 Key Features

- **Split-Screen Real-Time Resume Builder**: Instant preview updates as you modify personal details, summary, experience, education, projects, and skills.
- **3 ATS-Compliant Resume Templates**:
  - `Modern Tech`: Tech-focused layout with skill tags and sleek hierarchy.
  - `Minimalist`: Clean single-column typography optimized for 100% ATS readability.
  - `Executive`: Refined serif/sans typography designed for leadership roles.
- **ATS-Friendly PDF Export**: Client-side high-resolution A4 PDF generation via `html2pdf.js`.
- **AI Job Matcher & Semantic Gap Analysis**:
  - Interactive circular match score gauge (0-40 Low, 41-70 Moderate, 71-85 Good, 86-100 Excellent).
  - Matched skills & missing keyword badges.
  - Actionable AI tailoring recommendations.
- **Job Board with Instant 1-Click Match**:
  - Live client-side keyword and location filtering.
  - Direct bridge to AI matcher with preloaded job parameters.
- **Enterprise Spring Boot REST API Architecture**:
  - Centralized Axios instance with Bearer token interceptor and graceful error management.
  - Seamless offline/demo fallback handling.
- **Modern Responsive Design System**:
  - Tailwind CSS, Lucide icons, customizable notifications via `react-hot-toast`, and mobile drawer navigation.

---

## 📁 Project Structure

```
frontend_r/
├── .env.example
├── .env
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── assets/
    ├── components/
    │   ├── EducationForm.jsx
    │   ├── EmptyState.jsx
    │   ├── ExperienceForm.jsx
    │   ├── JobCard.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── MatchScore.jsx
    │   ├── Navbar.jsx
    │   ├── PersonalInfoForm.jsx
    │   ├── ProjectForm.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── ResumeForm.jsx
    │   ├── ResumePreview.jsx
    │   ├── Sidebar.jsx
    │   ├── SkillBadge.jsx
    │   ├── SkillsForm.jsx
    │   ├── TemplatePreview.jsx
    │   └── TemplateSwitcher.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── hooks/
    │   └── useAuth.js
    ├── layouts/
    │   └── DashboardLayout.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── JobBoard.jsx
    │   ├── JobMatcher.jsx
    │   ├── Login.jsx
    │   ├── Profile.jsx
    │   ├── Register.jsx
    │   ├── ResumeBuilder.jsx
    │   └── ResumeList.jsx
    ├── services/
    │   ├── aiService.js
    │   ├── api.js
    │   ├── authService.js
    │   ├── jobService.js
    │   └── resumeService.js
    ├── utils/
    │   ├── constants.js
    │   └── pdfExport.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

---

## 🛠️ Required Dependencies

- `react` (`^18.3.1`) & `react-dom` (`^18.3.1`)
- `react-router-dom` (`^6.26.2`)
- `axios` (`^1.7.7`)
- `lucide-react` (`^0.441.0`)
- `html2pdf.js` (`^0.10.2`)
- `react-hot-toast` (`^2.4.1`)
- `tailwindcss` (`^3.4.10`) & `autoprefixer` (`^10.4.20`)
- `vite` (`^5.4.2`)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (copied from [`.env.example`](file:///home/karan-m-gharale/Documents/project/frontend_r/.env.example)):

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 💻 Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔗 Spring Boot REST API Endpoints Supported

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | User login (JWT response) |
| `POST` | `/api/auth/register` | User registration |
| `GET` | `/api/resumes` | Fetch user's saved resumes |
| `POST` | `/api/resumes` | Create new resume record |
| `GET` | `/api/resumes/{id}` | Get single resume by ID |
| `PUT` | `/api/resumes/{id}` | Update existing resume |
| `DELETE` | `/api/resumes/{id}` | Delete resume by ID |
| `GET` | `/api/jobs` | Fetch tech job listings |
| `POST` | `/api/ai/match` | AI resume vs job description semantic matching |
