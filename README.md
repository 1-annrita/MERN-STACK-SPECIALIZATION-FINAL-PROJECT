# 📘 LifeTrack App - Health Monitoring App

🩺 **LifeTrack** — MERN Stack Health Monitoring App (Final Project)

A full-stack health tracking application built with **MongoDB, Express.js, React, Node.js (MERN)** + **Clerk Authentication**, enabling users to:

✔ Track medical conditions  
✔ Log symptoms and health updates  
✔ Visualize trends using interactive charts  
✔ Securely authenticate using Clerk  
✔ Toggle light/dark mode for accessibility

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git


## 🛠 Technologies Used

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- dotenv
- CORS
- Nodemon

### Frontend
- React + Vite
- TailwindCSS
- Clerk Authentication
- Axios
- React Router DOM
- Chart.js + react-chartjs-2
- Radix UI (Dialog)
- React Icons


## ⭐ Features

### Condition Management
- Add, view, update, delete medical conditions  
- Interactive health stats per condition  

### Health Log Tracking
- Add daily logs linked to conditions  
- Mood/symptom tracking  

### Dashboard
- Summaries  
- Recent activity 

### Reports
-See Charts, trends, progress over time

### User Interface
- Responsive & clean design  
- Light/Dark mode toggle  
- Sidebar & layout components  

### Authentication
- Sign in / Sign up via Clerk  
- Protected routes & secure pages 


### 🖼️ Screenshots

```
[Landing Page](frontend/src/images/LandingPage.png)
[Sign in Page](frontend/src/images/SignInPage.png)
[Main Dashboard Page](frontend/src/images/Dashboard.png)
[Create Condition Page](frontend/src/images/CreateCondition.png)
[View Condition Page](frontend/src/images/ViewCondition.png)
[Create Health Log Page](frontend/src/images/CreateHealthLog.png)
[View Health Logs Page](frontend/src/images/ViewHealthLogs.png)
[Reports Page](frontend/src/images/Reports.png)

```




## 🚀 Backend Installation & Setup

```

1. Clone the repository

    git clone https://github.com/1-annrita/MERN-STACK-SPECIALIZATION-FINAL-PROJECT.git

2. Move into the project folder

    cd backend

3. Create .env file
   copy example env to .env  and edit values

4. Install dependencies

    npm install

5. Start backend in a terminal

    npm run dev

```

## 🚀 Frontend Installation & Setup

```

1. Clone the repository

    git clone https://github.com/1-annrita/MERN-STACK-SPECIALIZATION-FINAL-PROJECT.git

2. Move into the project folder

    cd frontend

3. Create .env file
   copy example env to .env  and edit values

4. Install dependencies

    npm install

5. Start frontend in a terminal

    Open the frontend URL printed by Vite (usually http://localhost:5173).



```


## 🖥 Usage

1. Register or login via Clerk authentication.

2. Add a condition to start tracking.

3. Add daily health logs linked to the condition.

4. View Reports Dashboard for interactive charts, summaries, and recent logs.

5. Toggle between light and dark mode for accessibility.



## 📊 Reports Feature

- Groups health logs by metric type (numeric, blood pressure, mood, etc.)

- Interactive charts using Chart.js

- Shows averages, totals, and trend lines per condition

- Lists recent logs for quick reference



## 📂 Project Structure (Frontend / Backend)

### Backend

		```
		
			health-monitoring-app/
			│
			├─ backend/
			│   ├─ server.js
			│   ├─ .env
			│   ├─ .env.example
			│   ├─ .gitignore
			│   ├─ package.json
			│   ├─ package-lock.json
			│
			│   ├─ config/
			│   │   └─ db.js
			│
			│   ├─ models/
			│   │   ├─ Condition.js
			│   │   └─ HealthLog.js
			│
			│   ├─ routes/
			│   │   ├─ conditionRoutes.js
			│   │   └─ healthLogRoutes.js

			
		```

### Frontend 

		```

				frontend/
				│
				├─ node_modules/
				│
				├─ .gitignore
				├─ .env
				├─ .env.example
				├─ jsconfig.json
				├─ package.json
				├─ package-lock.json
				├─ vite.config.js
				├─ eslint.config.js
				├─ index.html
				├─ components.json
				│
				├─ src/
				│   ├─ main.jsx
				│   ├─ App.jsx
				│
				│   ├─ index.css
				│
				│   ├─ api/
				│   │   ├─ conditionsApi.js
				│   │   └─ healthLogsApi.js
				│
				│   ├─ images/
				│   │   └─ Health & Wellness.jpg
				│
				│   ├─ pages/
				│   │   ├─ ConditionsDashboard.jsx
				│   │   ├─ HealthLogsDashboard.jsx
				|   |   ├─ReportsDashboard.jsx
				│   │   └─ MainDashboard.jsx
				│
				│   ├─ components/
				│   │   ├─ Footer.jsx
				│   │   ├─ NewConditionCard.jsx
				│   │   ├─ NewHealthLogDialog.jsx
				│   │   ├─ SideBar.jsx
				│   │   ├─ ViewConditionCard.jsx
				│   │   ├─ ViewHealthCard.jsx
				│   │   │
				│   │   └─ ui/
				│   │       ├─ button.jsx
				│   │       ├─ card.jsx
				│   │       ├─ input.jsx
				│   │       ├─ select.jsx
				│   │       └─ textarea.jsx
				│
				│   ├─ layouts/
				│   │   └─ DashboardLayout.jsx
				│
				│   ├─ context/
				│   │   └─ Theme.jsx
				│
				└─ 
				
				
		```

## 🌐 Live Demo

Deployed at Netflify

    🔗 Live Demo: 


## 🙌 Author

AnnRita Mukami Gitonga

```
💼 Software Engineer | Frontend Developer | Telecommunications & IT Graduate
📧 Email: annritamukami23@gmail.com
🐙 GitHub: https://github.com/1-annrita

```





### GUIDE: CREATING THE BACKEND PROJECT FROM SCRATCH


			PART 1: BACKEND

🌐 Step 1: Initialize the Backend

1. Create backend Directory:

	mkdir backend && cd backend
	
	npm init -y

2. Install Backend Dependencies:

	npm i express mongoose dotenv cors  bcryptjs

	
3. Install devDependencies:

	npm i -D nodemon
	
	->nodemon-autorestart server on backend
	
	
4. Create .env file at the root of backend project

	```
		
		PORT=PORT
		
		
		MONGODB_URI=MONGODB_URI
		
		
		ALLOWED_ORIGIN=ALLOWED_ORIGIN

	```

	
	
5. Configure PACKAGE.JSON; the scripts part and main-developer
	->For Prod-add start
	->If anything is running on the developer environment, which is localhost, run it as nodemon server.js
	->Change the main entry from index.js to server.js
	
	```
		{
		"name": "backend",
		"version": "1.0.0",
		"main": "server.js",
		"scripts": {
			"dev": "nodemon server.js",
			"start": "node server.js"
		},
		"keywords": [],
		"author": "",
		"license": "ISC",
		"description": "",
		"dependencies": {
			"cors": "^2.8.5",
			"dotenv": "^17.2.3",
			"express": "^5.1.0",
			"mongoose": "^8.19.4"
		},
		"devDependencies": {
			"nodemon": "^3.1.11"
		}
		}
		
	```
	
			






### GUIDE: CREATING THE FRONTEND PROJECT FROM SCRATCH

			PART 2: FRONTEND

📦 Step 1: Initialize the Frontend

1. Set Up React Application:

	A. Run:
	
		npm create vite@latest frontend -- -- template react


	B. Then go inside the project:

		cd frontend


	C. Install dependencies:

		npm install
		
		npm i react-router-dom axios chart.js react-chartjs-2 @radix-ui/react-dialog react-icons
		


🔵 STEP 2 — Install & Configure Tailwind CSS

Inside the same folder (frontend)

	A. Run:
	
		npm install tailwindcss @tailwindcss/vite
	
	B. Replace everything in src/index.css with the following:
	
		@import "tailwindcss";
		
		
	C. In src folder, Delete App.css, we do not need it.
	
	
	D. At the root of the project, create our own:
		
		jsconfig.json file 
		
	E. Update vite.config.js
	
		Add the following code to the vite.config.js so your app can resolve paths without error:
	
			i)npm install -D @types/node
	
			ii) vite.config.js
			
			import path from "path"
			import tailwindcss from "@tailwindcss/vite"
			import react from "@vitejs/plugin-react"
			import { defineConfig } from "vite"
			
			// https://vite.dev/config/
			export default defineConfig({
			plugins: [react(), tailwindcss()],
			resolve: {
				alias: {
				"@": path.resolve(__dirname, "./src"),
				},
			},
			})
			
			
			
	F. Create .env

		VITE_API_URL=VITE_API_URL
		VITE_CLERK_PUBLISHABLE_KEY=VITE_CLERK_PUBLISHABLE_KEY
		
		
	G. ui Components
	
		npx shadcn@latest add button
		npx shadcn@latest add card
		npx shadcn@latest add input
		npx shadcn@latest add textarea
		npx shadcn@latest add select
			
			
			
			
			
CLERK AUTHENTICATION
https://clerk.com/docs/react/getting-started/quickstart

1. npm install @clerk/clerk-react
2. Set your Clerk API keys ->Go to API keys
3. Select React->Create document
4. Copy key->place in frontend .env
5. Modify main.tsx/main.jsx 

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const pk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={pk}>
      <App />
    </ClerkProvider>
  </StrictMode>
);


->you cannot access your application without being authenticated. Have to pass through the ClerkProvider provider first, then enter into the application

	
			


		


		
			