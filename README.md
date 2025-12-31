# 💡 Smart Personal Finance Tracker – Frontend

The **Smart Personal Finance Tracker Frontend** is a modern, responsive web application designed to help users manage their income, expenses, budgets, and financial activities efficiently.

This application provides a clean and intuitive user interface for both **users** and **admins**, and communicates with a secure RESTful backend API to deliver real-time financial insights.

---

## 📖 Project Description

The frontend of the **Smart Personal Finance Tracker** allows users to:
- Track income and expenses by category
- Manage monthly budgets
- View financial summaries
- Securely authenticate and recover passwords using email OTP
- Access an admin dashboard for monitoring users and financial data

The UI is built with performance, scalability, and user experience as top priorities.

---

## 🛠 Technologies & Tools Used

### Frontend Technologies
- **React.js** (TypeScript)
- **Tailwind CSS**
- **Vite**
- **React Router DOM**
- **Axios**
- **Lucide React Icons**
- **SweetAlert2**

### Backend & Service Integrations
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **bcrypt** (Password hashing)
- **Nodemailer** (Email services & OTP delivery)
- **Tesseract.js (OCR)** – Receipt text extraction for smart expense entry

### OCR & Smart Features
- **Tesseract OCR Engine**
- **Image Processing APIs**
- **Automated expense detection from scanned receipts**

### Development & Deployment Tools
- **Git & GitHub**
- **Postman** (API testing)
- **MongoDB Atlas**
- **Vercel** (Frontend deployment)
- **Render / Railway** (Backend deployment)
- **VS Code**

---

## ⚙️ Setup & Run Instructions

### 📦 Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

### 🚀 Installation Steps


 1. Clone the frontend repository
   ```
    git clone https://github.com/your-username/smart-finance-tracker-frontend.git
    cd smart-finance-tracker-frontend
   ```

 2. Install dependencies
   ```
    npm install
   ```

 3. Configure Backend API URL
   Update the API base URL in your service configuration files
  ```
  const API_URL = "http://localhost:5000/api"
  ```

 4. Start the development server
  ```
  npm run dev
  ```

 5. Application will run on
  ```
  http://localhost:5173
  ```

---

### 🌍 Deployed URL
- **Frontend:** https://smart-finance-tracker.vercel.app  
- **Backend:** https://smart-finance-tracker.vercel.app
  
---

## ✨ Main Features

### 👤 User Features
- User registration and login  
- Secure JWT-based authentication  
- Email OTP password recovery  
- Add, edit, and delete income and expense transactions  
- Category-based financial tracking  
- Monthly budget management  
- Responsive and modern dashboard UI  

### 🛡 Admin Features
- Admin dashboard with system overview  
- View all users  
- View user budgets and transactions  
- Manage expense and income categories  
- User status management (Active / Blocked)  

---

## 📁 Project Structure

```text
src/
 ├── assets/
 │   └── default-user.jpg
 │
 ├── components/
 │   ├── AdminSidebar.tsx
 │   ├── Layout.tsx
 │   ├── Sidebar.tsx
 │   └── SidebarWrapper.tsx
 │
 ├── context/
 │   └── authContext.tsx
 │
 ├── pages/
 │   ├── Admin/
 │   │   ├── Analytics.tsx
 │   │   ├── Category.tsx
 │   │   ├── Help.tsx
 │   │   ├── Home.tsx
 │   │   ├── Settings.tsx
 │   │   ├── Transaction.tsx
 │   │   └── Users.tsx
 │   │
 │   ├── Auth/
 │   │   ├── ForgotPassword.tsx
 │   │   ├── Login.tsx
 │   │   └── Register.tsx
 │   │
 │   └── User/
 │   │   ├── AnalyticsPage.tsx
 │   │   ├── Budget.tsx
 │   │   ├── Categories.tsx
 │   │   ├── HelpPage.tsx
 │   │   ├── Home.tsx
 │   │   ├── SettingsPage.tsx
 │   │   └── Transactions.tsx
 │   │    
 │   │
 │   └── Welcome.tsx
 │ 
 ├── routes/
 │   └── index.tsx
 │
 ├── services/
 │   ├── analytics.ts
 │   ├── api.ts
 │   ├── auth.ts
 │   ├── budget.ts
 │   ├── category.ts
 │   ├── ocr.ts
 │   ├── transaction.ts
 │   └── user.ts
 │
 ├── App.css
 ├── App.tsx
 ├── index.css
 └── main.tsx
  ```

---

## 📸 Screenshots

### 🔐 Authentication
Login, Signup, Forgot Password pages.
![Login](screenshots/authentication/login.png)
![Signup](screenshots/authentication/signup.png)
![Forgot Password](screenshots/authentication/forgot-password.png)
![Login Error](screenshots/authentication/login-error.png)

### 📊 User Dashboard
Overview of user interface and transactions.
![Dashboard Overview](screenshots/user-dashboard/dashboard-overview.png)
![Transactions](screenshots/user-dashboard/transactions.png)
![Add Transaction](screenshots/user-dashboard/add-transaction.png)
![Budget List](screenshots/user-dashboard/budget-list.png)

### 🧑‍💼 Admin Panel
Admin functionality and settings.
![Admin Dashboard](screenshots/admin-panel/admin-dashboard.png)
![Manage Users](screenshots/admin-panel/manage-users.png)
![Add Admin](screenshots/admin-panel/add-admin.png)
![Admin Settings](screenshots/admin-panel/admin-settings.png)

---

## 🚀 Future Improvements

- Advanced analytics and charts
- Dark mode support
- Recurring transactions
- Mobile-first optimizations

---

## 👨‍💻 Author

**Buddhika Fernando**  




