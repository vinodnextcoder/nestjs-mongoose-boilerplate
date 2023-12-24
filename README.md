# NestJS Authentication JwtService


![Prettier](https://img.shields.io/badge/Code%20style-prettier-informational?logo=prettier&logoColor=white)
[![GPL v3 License](https://img.shields.io/badge/License-GPLv3-green.svg)](./LICENSE)
[![HitCount](https://hits.dwyl.com/anilahir/nestjs-authentication-and-authorization.svg)](https://hits.dwyl.com/anilahir/nestjs-authentication-and-authorization)

## Description

NestJS Authentication with JwtService using Bcrypt  @nestjs/jwt 

# This implementation requires two things;
Sending the access token as a ‘Set-Cookie’ in the response headers after successful login.
-- we sending token in request headers authorization.
-- for refresh token Extracting the token from the cookies in the request headers instead of authorization.

## Features

1. Register
2. Login
3. Unit test

## Technologies stack:

- Typescript, nestjs, JwtService  @nestjs/jwt
- Bcrypt
- mongoose

## Setup

### 1. Install the required dependencies

```bash
$ npm install
```

### 2. Rename the .env.example filename to .env and set your local variables

```bash
$ mv .env.example .env
```

### 3. Start the application

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

```bash
Once the application is running you can visit [http://localhost:3000/api](http://localhost:3000/api) to see the Swagger interface.
```

## Author

👤 **Vinod**

- Github: [@vinodnextcoder](https://github.com/vinodnextcoder)

## Show your support

Give a ⭐️ if this project helped you!

## License

Release under the terms of [MIT](./LICENSE)
