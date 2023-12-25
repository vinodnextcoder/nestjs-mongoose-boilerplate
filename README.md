
# NestJS JWT Service with Cookie and Authorization

This repository contains a NestJS application showcasing JWT (JSON Web Token) authentication using cookies and authorization implementation.

## Features

- **JWT Authentication**: Implementation of JWT-based authentication using NestJS.
- **Cookie-based Tokens**: Store JWT tokens in HTTP-only cookies for secure communication.
- **Authorization Middleware**: Middleware for protecting routes and verifying user authorization.

## Prerequisites

Ensure you have the following installed before running the application:

- Node.js (>= 12.x)
- npm 
- MongoDB (or any preferred database)

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/vinodnextcoder/nestjs-mongoose-jwt.git
   ```

2. **Install dependencies:**

   ```bash
   cd nestjs-mongoose-jwt
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and provide necessary environment variables (check `.env.example` for reference).

## Configuration

- Update the `JWT_KEY` and other necessary environment variables in the `.env` file.

## Usage

1. **Start the application:**
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Swagger documentation for nestjs-mongoose-jwt

### Running

### You can get token from cookie response

```bash
Once the application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.
```

2. **Access the API:**

   Use Postman, curl, or any REST client to interact with the API endpoints:

   - Register a user: `POST /v1/users`
   - Login: `POST /auth/login`
   - Access protected routes: Use JWT token in the `Authorization` header or verify the cookie.

## Endpoints

- `POST /v1/users`: Register a new user.
- `POST /auth/login`: Log in and receive a JWT token.
- `GET /v1/users`: Access a protected route (requires authentication).


## Author

👤 **Vinod**

- Github: [@vinodnextcoder](https://github.com/vinodnextcoder)


## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
