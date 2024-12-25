# Backend - Secure Chat Application

This is the backend for the Secure Chat Application, built using Django REST Framework (DRF). It handles user authentication, secure message transmission, and provides APIs for the frontend applications.

## Features

- **User Authentication**: Secure login and registration endpoints.
- **Message Transmission**: Encrypted message transmission between users.
- **Middleware**: Custom middleware for encryption and request validation.
- **User Management**: APIs for managing users and their data.

## Installation

### Prerequisites

- Python 3.8+
- Virtualenv (optional but recommended)

### Setup

1. **Clone the repository**:

   ```sh
   git clone https://github.com/centmarde/ChattingHub.git
   cd ChattingHub/backend
   ```

2. **Create a virtual environment**:

   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment**:

   - On Windows:
     ```sh
     ./venv/Scripts/activate
     ```

4. **Install the required packages**:

   ```sh
   pip install -r requirements.txt
   ```

5. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory and add the following:
     ```
     ENCRYPTION_KEY=your_encryption_key
     ```

6. **Apply migrations**:

   ```sh
   python manage.py migrate
   ```

7. **Create a superuser**:

   ```sh
   python manage.py createsuperuser
   ```

8. **Run the development server**:
   ```sh
   python manage.py runserver
   ```

## API Endpoints

### Authentication

- **Register**: `POST /api/signup/`
- **Login**: `POST /api/login/`
- **Get Current User**: `GET /api/me/`

### Users

- **Get All Users**: `GET /api/users/`

### Messages

- **Send Message**: `POST /chat/api/messages/`
- **Get Messages**: `GET /chat/api/messages/`

## Middleware

The backend includes custom middleware for encrypting and decrypting messages. This is implemented in `chat/middleware.py`.

## License

Patent Pending. Unauthorized reproduction, distribution, or use of this material is strictly prohibited.
2024 © Centmarde Campado, Joren Verdad & Mardz Lidasan (BSIT) - Caraga State University - College of Computing and Information Sciences. All Rights Reserved.
