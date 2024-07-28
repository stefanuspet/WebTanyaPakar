# Tanya Pakar

This project is built with React and Vite. It includes various features to manage and interact with Pakar data, user roles, PDF materials, ratings, and a chat system.

## Features

- **Auth (email pass)**: Users can authenticate using their email and password.
- **CRUD Data Pakar dan Tenant**:
  - **Create**: Add new Pakar and tenant data.
  - **Read**: View Pakar and tenant data.
  - **Update**: Modify existing Pakar and tenant data.
  - **Delete**: Remove Pakar and tenant data.
- **Read Data User**: Display user data with their role status (Pakar, tenant, admin, or pengelola).
- **PDF Material Management**:
  - **Input**: Add new PDF materials.
  - **Delete**: Remove PDF materials.
  - **Display**: Show a list of PDF titles (the PDFs themselves are not displayed).
- **Consultation Completion Display**: Show the number of completed consultations (input from Google Form evaluation).
- **Tenant Log Management**:
  - **Read**: View tenant logs (sorted by timestamp DESC).
  - **Delete**: Remove tenant logs.
- **Chat Feature**: Admin can see and reply to chats as Pakar.

## Environment Requirements

- **Node.js**: Ensure you have Node.js installed (version 20 or higher is recommended).
- **npm**: npm is required to install dependencies.

## Built With

- **Vite**: A fast build tool and development server for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **Firebase**: A platform developed by Google for creating mobile and web applications, used here for database and hosting.

## Deployment

The project is deployed and can be accessed at [Tanya Pakar](https://tanyapakar-c08ad.web.app/).

## Getting Started
### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/stefanuspet/WebTanyaPakar.git
   cd WebTanyaPakar
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env.local` file in the root directory** with your Firebase configuration:
   ```bash
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   VITE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_ID=your_firebase_app_id
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
