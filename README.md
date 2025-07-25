
---

````markdown
# 💚 HealthVault – Your Personalized Health Tracker

HealthVault is a MERN-stack-based full-fledged personal health management platform that helps users track their fitness, diet, sleep, and health goals. It provides personalized insights and actionable data, making health monitoring interactive, intelligent, and accessible for all users.

---

## 🌟 Features

- 🔐 **Secure Authentication:** Sign up/login with form validations and automatic login after registration.
- 📊 **Dashboard Overview:** Health metrics like diet, sleep, water intake, and steps displayed in a clean responsive layout.
- 🍎 **Diet Tracking:** Set daily/monthly calorie goals, add food items, estimate calorie breakdown, and visualize via pie charts.
- 🛌 **Sleep Tracking:** Log daily wake-up/sleep times, set monthly goals, and receive smart reminders.
- 🔔 **Notification System:** Smart toast + bell icon-based notifications across pages (diet/sleep goals, reminders).
- 👤 **Dynamic Profile Setup:** Goal-specific form flows – asks different questions based on selected health objective.
- 📅 **Calendar-based Summary:** View weekly/monthly reports for diet and sleep in a neat summarized format.
- 💬 **Responsive UI/UX:** Greenish-white modern theme with smooth transitions, mobile-first responsive design.

---

## 📂 Project Structure

```bash
healthvault/
├── client/                 # React frontend
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── config/
├── .env
├── README.md
└── package.json
````

---

## 🚀 Live Demo

> *deployed at:*
>[https://healthvaultt.netlify.app/]

---

## 📦 Technologies & Packages

### 💻 Frontend (React + Vite)

* `react-router-dom` – For client-side routing.
* `axios` – API communication between client and backend.
* `recharts` – Interactive charts for diet visualization.
* `framer-motion` – Smooth animations across UI.
* `react-toastify` – Notification toasts for interactions.
* `bootstrap` (only used initially) – Styling utilities. Later replaced with custom CSS.
* Custom CSS – For mobile responsiveness and modern UI.

### 🧠 Backend (Node.js + Express)

* `express` – Routing and API layer.
* `mongoose` – MongoDB ODM to manage health data models.
* `dotenv` – For managing environment variables.
* `cors` – Cross-origin access setup.
* `bcrypt` – Password hashing for secure login.
* `jsonwebtoken` – Secure token-based authentication.

### ☁️ Database

* `MongoDB Atlas` – Cloud-based NoSQL database storing user and health data.

---

## 🧪 Pages & Logic

### ✅ `SignupPage.jsx`

* Dynamic form fields based on selected health goal and gender.
* Menstruation field auto-enabled for female.
* Smart checkboxes logic (e.g., “overall” includes all options except menstruation for males).

### ✅ `Dashboard.jsx`

* Responsive health dashboard.
* Health metric cards for diet, sleep, water, steps with hover effects and chart displays.

### ✅ `DietPage.jsx`

* Add meals with calorie values.
* Calories deducted from daily target.
* Pie chart breakdown of meals by type.

### ✅ `SleepPage.jsx`

* Set sleep/wake times.
* View average sleep cycle.
* Notifications when sleep goals are missed.

### ✅ `ResetPassword.jsx`

* Clean UI with greenish-white theme.
* Animations and fully mobile responsive.

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/healthvault.git
cd healthvault
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # Add your MongoDB URI and JWT_SECRET
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🔐 .env Example (Server)

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/healthvault
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🛡️ Security

* `.env` is added to `.gitignore` to prevent sensitive data leaks.
* Passwords are hashed using `bcrypt`.
* JWT tokens are used for secure user sessions.

---

## 📱 Responsive Design

* Designed with **mobile-first approach**.
* Fully responsive on all screen sizes.
* Optimized layouts for tablet and desktop views.

---

## 🙋🏻‍♂️ Project By

**Tharun Kudikala**
*BTech CSE, Developer & UI Enthusiast*
[LinkedIn](https://linkedin.com/in/yourprofile) • [GitHub](https://github.com/yourgithub) • [Email](mailto:youremail@gmail.com)

---

## 📜 License

MIT License © 2025 Tharun Kudikala

---

> Need help? Raise an issue or ping me on GitHub or LinkedIn!

```

---

Let me know if you want a PDF version of this README, a professional cover page for documentation, or to auto-generate badges (build, license, etc.) for GitHub display.
```
