# Mini Student-Advisory Chatbot System: Backend Documentation

## Project Overview
The **Mini Student-Advisory Chatbot System** is a specialized backend application designed to facilitate study-abroad consultations via an AI-driven interface. This system provides a secure and scalable suite of REST APIs for user management, real-time chatbot interactions, conversation persistence, and administrative oversight.

The architecture is modular, production-ready, and designed for seamless integration with any modern frontend framework.

## Core Objectives
*   **Intelligent Query Handling**: Process student inquiries using a Large Language Model (LLM).
*   **Data Persistence**: Maintain comprehensive logs of user interactions and conversation history.
*   **Security & Scalability**: Implement robust authentication, rate limiting, and administrative controls.
*   **Deployment Readiness**: Support containerized environments via Docker.

## Technical Stack
| Layer | Technology |
| :--- | :--- |
| **Runtime Environment** | Node.js |
| **Web Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) & bcrypt |
| **AI Engine** | Google Gemini API |
| **Infrastructure** | Docker, Docker Compose |

## Project Structure
```text
src/
├── app.js                  # Express application configuration
├── server.js               # Entry point
├── config/
│   └── db.js               # Database connection logic
├── controllers/            # Request handling logic
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── chat.controller.js
│   ├── conversation.controller.js
│   └── admin.controller.js
├── middlewares/            # Request interceptors
│   ├── auth.middleware.js
│   ├── admin.middleware.js
│   └── rateLimit.middleware.js
├── models/                 # Mongoose schemas
│   ├── User.js
│   ├── Query.js
│   └── Conversation.js
├── routes/                 # API route definitions
├── services/
│   └── llm.service.js      # Gemini API integration
├── Dockerfile
├── docker-compose.yml
└── .env
```

## Configuration
Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatbot
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
```
*Note: Ensure `.env` is included in your `.gitignore` to prevent sensitive data leaks.*

## Installation and Deployment

### Local Development
1. Install dependencies: `npm install`
2. Start the server: `npm run start`
3. Access the API at: `http://localhost:5000`

### Docker Deployment
To spin up the entire stack (App + Database):
```bash
docker-compose up --build
```

## API Reference

All endpoints can be tested using Postman or any REST client.
Protected routes require the JWT token to be passed as:
Authorization: Bearer <token>


### Authentication
*   **Login**
    *   `POST /api/auth/login`
    *   Payload: `{"email": "user@example.com", "password": "password123"}`
    *   Returns: `{"token": "JWT_TOKEN"}`

### User Management
*   **Register User**
    *   `POST /api/users`
    *   Payload: `{"name": "John Doe", "email": "john@example.com", "password": "password123"}`
*   **Get All Users** (Protected)
    *   `GET /api/users`
*   **Get User by ID** (Protected)
    *   `GET /api/users/:id`

### Chatbot Interaction
*   **Submit Query**
    *   `POST /api/chat`
    *   *Rate Limit: 20 requests per 15 minutes.*
    *   Payload: `{"userId": "ID", "question": "Query text"}`
    *   Logic: Validates user -> Calls Gemini LLM -> Stores Conversation -> Returns Response.

### Conversation History
*   **User History**: `GET /api/conversations/user/:userId`
*   **Recent Activity**: `GET /api/conversations/recent`

### Administrative Endpoints
*Requires valid JWT and Admin role.*
*   **User Audit**: `GET /api/admin/users`
*   **Query Logs**: `GET /api/admin/queries`
*   **Global Conversations**: `GET /api/admin/conversations`

## Database Schema Design

### User Collection
*   `name`: String
*   `email`: String (Unique)
*   `password`: String (Hashed)
*   `phone number`:String(optional)
*   `role`: Enum (`user`, `admin`)
*   `createdAt`: Date

### Query Collection
*   `user`: ObjectId (Ref: User)
*   `question`: String
*   `status`: Enum (`pending`, `answered`, `failed`)
*   `llmProvider`: String

### Conversation Collection
*   `user`: ObjectId (Ref: User)
*   `query`: ObjectId (Ref: Query)
*   `question`: String
*   `response`: String
*   `createdAt`, `updatedAt`: Date (auto-generated)


## Security Implementation
*   **Authentication**: Stateless JWT-based auth.
*   **Encryption**: Passwords hashed using `bcrypt` with a salt factor of 10.
*   **Traffic Control**: `express-rate-limit` applied to AI endpoints to prevent API abuse.
*   **Architecture**: Separation of concerns using the Controller-Service-Repository pattern.

## System Health
*   **Check Status**: `GET /health`
*   **Response**: `{"status": "ok", "message": "Server is healthy"}`

## Screenshots
* /screenshots/

## Deliverables

This submission includes:
1. Complete backend source code hosted on GitHub
2. README documentation covering:
   - Project overview
   - Setup instructions
   - Environment variables
   - API usage examples
   - Tech stack details
3. Complete Postman Collection

## Acknowledgments
Special thanks to **GlobeTrek Overseas** for this opportunity.