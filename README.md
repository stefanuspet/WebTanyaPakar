# Tanya Pakar

This project is built with React and Vite. It includes various features to manage and interact with Pakar data, user roles, PDF materials, ratings, and a chat system.

## Planned Features

- **Authentication**: Users can authenticate using their phone number with OTP.
- **User Data Display**: Display user data with their role status (Pakar or tenant).
- **Pakar Data Management**:
  - **Input**: Add new Pakar data.
  - **Edit** : Modify existing Pakar data.
  - **Delete**: Remove Pakar data.
- **PDF Material Management**:
  - **Input**: Add new PDF materials with categories.
  - **Delete**: Remove PDF materials.
  - **Display**: Show a list of PDF titles (the PDFs themselves are not displayed).
- **Average Rating Display**: Show the average rating of Pakar answers.
- **Chat Feature**: Admin can access and manage chats with Pakar.

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
