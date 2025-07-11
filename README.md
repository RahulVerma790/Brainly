# 💬 Brainly — Real-time Chat Application

Brainly is a real-time chat application that allows users to sign up, join or create chat rooms, and exchange messages instantly using WebSockets. Built with a modern tech stack including React, TypeScript, Node.js, and WebSocket.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 🧑‍💻 Real-time messaging with WebSocket
- 💬 Public and private rooms
- 📥 Join requests for private rooms
- 🧠 Room-based message storage and display
- 🔼 Message upvoting system
- 🖥️ Responsive, clean and interactive UI

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React + TypeScript
- 🧩 Tailwind CSS
- 🌐 Axios for API calls
- 📡 WebSocket for real-time communication

### Backend:
- 🟦 Node.js + TypeScript
- 🔌 `ws` WebSocket library
- 🔐 JWT-based authentication
- 🗃️ MongoDB (or any database for storing users, rooms, messages)
- 📁 Express.js for HTTP routes

---

## 📁 Folder Structure

```
Brainly-frontend/
├── backend/ # WebSocket + REST API server
│ ├── src/
│ ├── dist/
│ ├── package.json
│ └── ...
├── frontend/ # React + TypeScript frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
bash
git clone https://github.com/<your-username>/Brainly-frontend.git
cd Brainly-frontend
```
## 2. Setup Backend

```
bash
cd backend
npm install
npm run dev  # or npm run start
```

## 3. Setup Frontend

```
bash
cd ../frontend
npm install
npm run dev
This runs the frontend at http://localhost:5173 (or as configured in Vite).
```

## 🧪 Test Flow
- ✅ Signup/Login with JWT
- 🔁 WebSocket connection on entering a room
- ✍️ Real-time chat between users in the same room
- 🔒 Private room join requests & approval
- ⬆️ Message upvoting system

## 📜 License
This project is licensed under the MIT License.