# MERN Stack Chat App - ChatOne

## Description

This is a real-time chat application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The app allows users to sign up, log in, and chat with others in real time. It leverages WebSockets (Socket.io) for instant messaging and features authentication, user management, and a responsive UI.

## Features

-   User authentication (JWT-based login/signup)
-   Real-time messaging using Socket.io
-   Online/offline status indication
-   Responsive UI with Tailwind CSS & Daisy UI
-   MongoDB for data storage
-   Express.js and Node.js backend
-   State management with Zustand
-   Clean code architecture
-   Theming options, Search functionality, emoji support

## Tech Stack

-   **Frontend:** React, Tailwind CSS, Daisy UI
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (Mongoose)
-   **State Management:** Zustand
-   **Real-time communication:** Socket.io
-   **Authentication:** JWT (JSON Web Token), bcrypt for password hashing

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

-   Node.js
-   MongoDB
-   npm or yarn

### Steps to Run

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/mern-chat-app.git
    cd mern-chat-app
    ```

2. Install dependencies for the backend:

    ```sh
    cd backend
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

5. Install dependencies for the frontend:

    ```sh
    cd ../frontend
    npm install
    ```

6. Start the frontend server:
    ```sh
    npm start
    ```

## API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | /api/auth/signup      | Register a new user      |
| POST   | /api/auth/login       | Login user and get token |
| PUT    | /api/auth/update      | Update Profile           |
| GET    | /api/users            | Fetch all users          |
| GET    | /api/messages/:chatId | Get chat messages        |
| POST   | /api/messages         | Send a message           |
| DELETE | /api/messages/delete  | Delete Messages          |

## Folder Structure

```
mern-chat-app/
│── backend/
│   ├── src/
│   │   ├── models/ (Mongoose schemas)
│   │   ├── routes/ (Express API routes)
│   │   ├── controllers/ (Business logic)
│   │   ├── lib/ (Database connection, Main Server setup)
│   │   └── index.js (Main entry point)
│── frontend/
│   ├── src/
│   │   ├── components/ (Reusable UI components)
│   │   ├── pages/ (App pages)
│   │   ├── store/ (Managing global state with Zustand)
│   │   ├── lib/ (API calls)
│   │   ├── utils/ (Utility functions)
│   │   ├── App.jsx (Root component of the app)
│   │   └── index.js (Entry point for React app)
│── README.md
```

## Future Enhancements

-   Implement voice and video calls
-   Integrate push notifications
-   Add group chats
-   Verification via email or phone number verification
-   Offline messaging queueing system
-   File sharing feature
-   Notification settings customization

## License

This project is licensed under the MIT License.

---

Feel free to contribute, report issues, or suggest improvements!
