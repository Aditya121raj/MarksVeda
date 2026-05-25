# MarksVeda Tutors

![MarksVeda Banner](https://via.placeholder.com/1200x400/0b1530/ffffff?text=MarksVeda+Tutors+-+Premium+Doorstep+%26+Online+Learning)

MarksVeda is a premium, full-stack MERN platform connecting students with highly verified, top-tier home and online educators across India. 

## 🚀 Features

*   **Premium User Interface:** Modern, glassmorphism-inspired design with a high-end aesthetic.
*   **Intelligent Study Planner:** Interactive calculator for parents to estimate monthly tutoring hours.
*   **Seamless Booking Flow:** Multi-step enquiry form capturing detailed parent requirements (Subject, Board, Budget, Location).
*   **Live Status Tracker:** Parents can track the status of their tutor booking in real-time using their phone number.
*   **Coordinator Dashboard:** Secure admin portal for MarksVeda coordinators to manage, assign, and track tutoring requests.
*   **Direct WhatsApp Integration:** One-click WhatsApp support embedded throughout the platform.

## 🛠️ Technology Stack

*   **Frontend:** React (Vite), JavaScript, Vanilla CSS (Custom Design System).
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB, Mongoose ODM.
*   **Architecture:** Component-based UI, RESTful API.

## 📂 Project Structure

```
MarksVeda/
├── backend/
│   ├── models/            # Mongoose schemas (Request.js)
│   ├── routes/            # API endpoints (requestRoutes.js)
│   ├── server.js          # Node/Express server entry point
│   └── package.json       
├── frontend/
│   ├── src/
│   │   ├── components/    # Modular React components (layout, sections, admin)
│   │   ├── App.jsx        # Main application router/wrapper
│   │   ├── index.css      # Global styles and design tokens
│   │   └── main.jsx       # React DOM rendering
│   ├── index.html         
│   ├── vite.config.js     # Vite configuration and API proxy
│   └── package.json       
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   MongoDB (Local instance or Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/marksveda.git
   cd marksveda
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Start the development server (runs on http://localhost:5000)
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   # Start the Vite development server (runs on http://localhost:3000)
   npm run dev
   ```

## 🔐 Admin Access

To access the Coordinator Dashboard:
1. Click the "Coordinator Access" button in the footer.
2. Enter the secure access password (default for local dev: `admin123`).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## 📝 License

This project is proprietary software belonging to MarksVeda Tutors. All rights reserved.
