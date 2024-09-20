
# ArgonAI Takehome Project

This repository contains both the frontend and backend code for the ArgonAI takehome project. The project allows users to search for clinical trials based on diseases, such as NSCLC (Non-Small Cell Lung Cancer), and implements pagination for loading more results dynamically.

## Project Structure

```
argonai_takehome/
│
├── backend/
│   ├── index.ts          # Main backend server file using Apollo Server
│   ├── data.json         # Clinical trials dataset
│   ├── synonyms.ts       # Synonyms map for diseases and conditions
│   ├── package.json      # Backend dependencies and scripts
│   └── ...               # Other backend-specific code
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components for the UI (SearchBar, SearchResults, StudyList)
│   │   └── queries.ts    # GraphQL queries for frontend
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies and scripts
│   └── ...               # Other frontend-specific code
│
├── .gitignore            # Git ignore file for ignoring node_modules, etc.
└── README.md             # Project documentation
```

## How to Run the Project

### Backend (Apollo Server)
Navigate to the backend/ directory:

`cd backend`

### Install the dependencies:

`npm install`

Start the server:

`npm start`

This will launch the Apollo Server at http://localhost:4000.

### Frontend (React App)
Navigate to the frontend/ directory:

`cd frontend`
Install the dependencies:

`npm install`

Start the development server:

`npm start`

The React app will be available at http://localhost:3000.


## Questions and Answers
### 1. How do we allow her to search for NSCLC trials -AND- immunotherapy related drugs?
To allow the user to search for NSCLC trials and immunotherapy-related drugs, we can modify the search functionality to accept multiple disease terms and apply a logical "AND" operator when querying the dataset. This would filter trials that match both conditions (NSCLC and immunotherapy). We could also update the synonym system to include terms related to immunotherapy.

### 2. How would you deploy your software?
For deployment, I would likely use Vercel for the frontend, and AWS for the backend, as they easily support Node.js apps. The frontend and backend can be deployed as separate services, with the frontend calling the backend API.

### 3. What are the alternatives to loading the dataset into memory, and why would you want to use those alternatives?
Instead of loading the dataset into memory, I would use a graph database like Neo4j since it would allow us to create and query relationships between data objects, making it ideal for complex connections such as between diseases, treatments, and clinical studies (see question 1). Using a database allows for more efficient querying, scalability, and the ability to handle larger datasets without consuming too much memory. 

### 4. How do we evaluate the completeness of results?
We evaluate completeness by comparing the number of returned results to the total available results in the dataset. If the number of loaded results is less than the total count, we know there are more results to load. Adding clear indicators (e.g., "showing X of Y results") helps users understand how much data they have seen and how much is left.

### 5. How can the user see more results, and how are they displayed?
The user can load more results by clicking the "Load More" button in the UI. The results are displayed in a paginated fashion, where 10 new results are added each time until all of the results have been exhausted.