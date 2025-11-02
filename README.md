🍭 Sweet Shop Management System

A full-stack web app for managing a sweet shop, built using FastAPI (backend) and React + TailwindCSS (frontend).

🧁 Project Overview

This project is a Sweet Shop Management System that allows users to:

Register and log in

View sweets available in the shop

Purchase sweets (reduces stock count)

Admin users can restock sweets

The backend is built with FastAPI, providing RESTful APIs for authentication and product management, while the frontend is developed using React and styled with TailwindCSS for a clean, responsive interface.

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Frontend       | React, Tailwind CSS, Axios       |
| Backend        | FastAPI, SQLAlchemy, Pydantic    |
| Authentication | JWT (via python-jose)            |
| Database       | SQLite                           |
| Deployment     | Render (API) + Vercel (Frontend) |

✨ Features

✅ User registration & login (JWT-based authentication)
✅ View available sweets
✅ Purchase sweets with real-time stock updates
✅ Admin users can restock sweets
✅ Responsive and modern UI built with TailwindCSS

Incubyte/
│
├── backend/
│ ├── main.py
│ ├── crud.py
│ ├── models.py
│ ├── schemas.py
│ ├── auth.py
│ ├── deps.py
│ ├── database.py
│ ├── .env
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ └── App.js
│ ├── package.json
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── .env
│
└── README.md

🧰 Setup Instructions
🖥 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=sqlite:///./sweetshop.db

Run the backend:
uvicorn main:app --reload

💻 Frontend Setup
cd ../frontend
npm install

Create .env file:
REACT_APP_API_URL=http://127.0.0.1:8000

Run:
npm start

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| `POST` | `/api/auth/register`        | Register a new user          |
| `POST` | `/api/auth/login`           | User login and get JWT token |
| `GET`  | `/api/sweets`               | Get all sweets               |
| `POST` | `/api/sweets/{id}/purchase` | Purchase sweet               |
| `POST` | `/api/sweets/{id}/restock`  | Restock sweet (admin only)   |

🤖 My AI Usage
🧠 Which AI Tools I Used

I used ChatGPT (OpenAI GPT-5) as my AI assistant.

⚙️ How I Used AI

I leveraged ChatGPT throughout the project for:

Designing the project architecture: helped me structure the FastAPI backend and React frontend clearly.

Writing CRUD logic & JWT authentication: generated and refined the crud.py, auth.py, and schemas.py files.

Debugging runtime errors: fixed CORS errors, bcrypt hashing issues, and React Axios authentication bugs.

Improving UI design: used AI to modernize the TailwindCSS layout (centered login, gradient background, card-style design).

README documentation: AI helped structure this README according to professional and academic standards.

💬 Reflection on AI Impact

Using ChatGPT:

Accelerated development time by 60–70%.

Helped me understand complex FastAPI integrations.

Provided real-time feedback, allowing me to learn and implement industry-standard practices.
I ensured I used AI ethically — using it as a guide and learning aid, not for direct copy-paste coding.

| Test Case         | Description                                | Status    |
| ----------------- | ------------------------------------------ | --------- |
| User Registration | Verify new users can register successfully | ✅ Passed |
| Login             | Check valid credentials return token       | ✅ Passed |
| Invalid Login     | Wrong password shows error                 | ✅ Passed |
| Sweet Listing     | Fetch sweets list from API                 | ✅ Passed |
| Purchase Sweet    | Reduces stock on purchase                  | ✅ Passed |
| Restock Sweet     | Only admin can restock                     | ✅ Passed |
