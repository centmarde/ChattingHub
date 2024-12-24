# Secure Chat Application

This project is a secure chat application built using Django REST Framework (DRF) for the backend and Vue.js/Svelte for the frontend. The application supports user authentication, secure message transmission, and a dashboard for managing users and messages.

## Features

- **Login and Registration**: User authentication with secure login and registration endpoints.
- **Sending and Receiving Messages**: Secure APIs for message transmission with encryption and decryption.
- **Security Features**: Middleware for encryption, hashing, and request validation.
- **Dashboard**: Intuitive interface to display and manage users and messages.

## Project Structure

```python
backend/
├── account/
│   ├── api.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── chat/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   └── middleware.py
├── wey_backend/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── requirements.txt

frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AuthView.vue
│   │   ├── ChatBox.vue
│   │   └── svg/
│   │       ├── BackgroundSvg.vue
│   │       └── ChattingHubSvg.vue
│   ├── layouts/
│   │   ├── LoginForm.vue
│   │   ├── RegisterForm.vue
│   │   └── default.vue
│   ├── pages/
│   │   ├── Dashboard.vue
│   │   ├── index.vue
│   │   └── NotFoundPage.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   └── auth.js
│   ├── App.vue
│   ├── main.js
│   └── vite.config.mjs
├── index.html
└── package.json

frontend2/
├── src/
│   ├── auth/
│   │   └── AuthGuard.svelte
│   ├── lib/
│   │   └── TopNav.svelte
│   ├── router/
│   │   ├── chat/
│   │   │   └── +Chat.svelte
│   │   └── routes.ts
│   ├── stores/
│   │   └── authStore.ts
│   ├── App.svelte
│   ├── main.ts
│   └── app.css
├── index.html
├── package.json
└── svelte.config.js
```

## Installation

### Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```python
     ./venv/Scripts/activate
     ```
4. **Install the required packages**:

   ```python
   pip install -r requirements.txt
   ```

5. **Run the development server**:

   ```python
   python manage.py runserver
   ```

### Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```
   npm run dev
   ```

### Frontend2

1. **Navigate to the frontend2 directory**:

   ```bash
   cd frontend2
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

## Usage

- **Access the backend API**: `http://127.0.0.1:8000`
- **Access the first frontend application**: `http://localhost:3000`
- **Access the second frontend application**: `http://localhost:5173/`

## Images

![Screenshot 2024-12-24 222926](https://github.com/user-attachments/assets/340a2d5f-7129-43e4-a001-2b91d58e251d)

![image](https://github.com/user-attachments/assets/a3e29bf7-fd43-46d2-98c8-c5141872f68e)

![Screenshot 2024-12-24 223218](https://github.com/user-attachments/assets/01665b3f-504c-4700-bc93-235f047e833f)

![Screenshot 2024-12-24 223420](https://github.com/user-attachments/assets/200ecee8-0fcb-49e7-95c0-4484f1f6237d)

![image](https://github.com/user-attachments/assets/4d4dd5cf-7915-450f-aecf-44fe6f200331)

![Screenshot 2024-12-24 223525](https://github.com/user-attachments/assets/de90c6be-b6f8-4749-8fc3-e2b8306f530c)

![image](https://github.com/user-attachments/assets/fd97723a-6d91-47f5-aa5c-0c4578663900)

## License

Patent Pending. Unauthorized reproduction, distribution, or use of this material is strictly prohibited.
2024 © Centmarde Campado, Joren Verdad & Mardz Lidasan (BSIT) - Caraga State University - College of Computing and Information Sciences. All Rights Reserved.

### Backend Documentation

For detailed backend documentation, refer to [README.md](https://github.com/centmarde/ChattingHub/blob/main/backend/README.md).
