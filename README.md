# Welcome to the TempestAPI

This is a Node.js API using TypeScript that scrapes a site to gather data, saves that data on a MongoDb and answers in JSON.

## Prerequisites

- Node.js
- TypeScript
- MongoDB
- Mongoose
- Typegoose
- Docker
- Redis
- Zod

## Getting Started

1. Clone the repository:
```sh 
git clone https://github.com/[username]/tempest.git
```

2. Install the dependencies:
```sh 
npm install
```

3. Start the development server:
```sh 
npm start
```

## Folder Structure

The project has the following structure:

tempestAPI/
- scrapper
- config 
- models
- src/
  - middleware/
  - schemas/
  - utils/
  - app.ts
- __tests__/
- package.json
- package-lock.json
- README.md
- tsconfig.json
- docker-compose.yaml
- example.env
- .env

## Testing

Jest will be used

