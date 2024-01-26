How to setup

Clone backend repository from - https://github.com/Cnd96/employee-api.git

Navigate to project directory - cd employee-api

Use one of the following methods to run the backend locally.

1. Using Docker 
   1. docker build -t employee-api .
   2. docker run -p 3001:3001 employee-api

2. Without  Docker
   1. Install dependencies – npm install
   2. npm run dev

Once the app is running, you can go to http://localhost:3001/api to read the API documentation.
