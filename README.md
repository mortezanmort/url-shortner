# URL Shortener

Introducing my versatile URL Shortener app: your ultimate solution for effortlessly managing and shortening any URL. With this app, not only can you shorten URLs, but you can also customize the slug according to your needs. Additionally, a rate limiter has been implemented to prevent misuse.

## Tech Stack:

### Frontend

- React
- Typescript
- TailwindCSS
- Prime React

### Backend

- NodeJS
- Express
- Typescript
- MongoDB
- REST APIs

#

### Steps to Run the app:

- Clone the repo.
- Create `.env` file in the `./Backend` and copy content of `.env.example` to `.env` file.
- Run the `docker-compose up`.
- Open `http://localhost:3001` for the front-end.
- Your backend will run on `http://localhost:8000`.

## Features:

- Users can register and log in.
- Users can shorten URLs.
- Users can copy the created URL with just one click.
- Users can view statistics such as the number of clicks.
- Users can update the slug.
- Authorization and authentication are implemented.
- Rate limiting is applied to prevent abuse of the service.
- Users are redirected to an error page if the slug does not exist.
- Supports URLs that start with http and https.
