# Pokemon Data Management Application

This project is designed to manage and display Pokémon data efficiently by fetching it from the Pokémon API and storing it in MongoDB for future use. The application serves as an API server built with **NestJS**, **TypeScript**, and **MongoDB**, while the frontend uses **ReactJS**, **TypeScript**, **MUI**, **SCSS**, and **Webpack**.

## Problem Statement

In a scenario where Pokémon data needs to be fetched frequently, fetching from the API on every request can be inefficient and costly. To optimize, the application stores the Pokémon data in MongoDB on the first request and serves subsequent requests from the local database. This way, the app avoids making excessive outbound calls, reducing latency and operational costs.

## Technologies Used

- **Backend**: NestJS, TypeScript, MongoDB
- **Frontend**: ReactJS, TypeScript, MUI, SCSS, Webpack


## How to Run the Project Locally

Please follow these steps to run the backend and frontend locally:

### Prerequisites

- Ensure that you have **Node.js** installed (recommended version: `v20.15+`).
- Install **MongoDB** locally or use a cloud database (e.g., MongoDB Atlas).
- Ensure **yarn** or **npm** is installed.

### Step 1: Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/b-limitless/poke.git
cd poke
```

Step 2: Backend Setup
1.	Navigate to the backend folder:

cd backend

2.	Install the necessary dependencies:

yarn install

3.	Configure the environment variables for MongoDB and CORS.
In the backend/.env.development file, provide the following variables:

MONGODB_URI=YOUR_MONGODB_ADDRESS

CORS_ORIGIN=LOCAL_FRONTEND_ADDRESS

Replace YOUR_MONGODB_ADDRESS with your MongoDB connection string and LOCAL_FRONTEND_ADDRESS with your frontend URL (e.g., http://localhost:3000).

4.	Start the backend server in development mode:

yarn start:dev

This will run the backend server at http://localhost:9000 (default).

Step 3: Frontend Setup
1.	Navigate to the frontend folder:

cd frontend

2.	Install the necessary dependencies:

yarn install

3.	Configure the environment variables for the API URL.
In the frontend/.env file, add the following variable:

REACT_APP_API_URL=BACKEND_LOCAL_ADDRESS

4. Start the frontend server:

yarn start

This will run the frontend application on http://localhost:3000 by default.

##  Scaling Considerations

### Efficient Data Fetching and Caching

On the first request, data is fetched from the Pokémon API and stored in MongoDB for future use. For any subsequent requests, the backend API fetches the Pokémon data directly from MongoDB rather than the external Pokémon API. This approach reduces:
	•	Latency: Local database calls are faster than making outbound API calls.
	•	Cost: Minimizes the number of external API calls, which can be costly when dealing with large volumes of data.
	•	Scalability: As traffic grows, fetching data from a local database is more efficient and manageable compared to constantly calling external services.

This caching mechanism works well since Pokémon data doesn’t change frequently, making it a perfect use case for local storage after the initial API call.

Assumptions Made
	•	Pokémon data does not change frequently, so caching in MongoDB for subsequent requests is feasible.
	•	All Pokémon data fetched from the Pokémon API is relevant to the application’s needs.
	•	The backend and frontend are run locally on different ports during development. Ensure proper CORS handling is configured.




