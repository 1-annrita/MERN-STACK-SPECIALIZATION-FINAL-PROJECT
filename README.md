## 🚀 Backend Installation & Setup

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



## 🚀 Frontend Installation & Setup

1. Clone the repository

    git clone https://github.com/1-annrita/MERN-STACK-SPECIALIZATION-FINAL-PROJECT.git

2. Move into the project folder

    cd frontend

3. Create .env file
   copy example env to .env  and edit values

4. Install dependencies

    npm install

5. Start frontend in a terminal

    npm run dev







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
	
6. Backend project structure
			
		```
		
			chronic-monitoring-app/
			│
			├─ backend/
			│   ├─ server.js
			│   ├─ .env
			│   ├─ package.json
			│   ├─ config/
			│   │   └─ db.js
			│   ├─ models/
			│   │   ├─ Condition.js
			│   │   ├─ HealthLog.js
			│   │   └─ User.js
			│   ├─ routes/
			│   │   ├─ conditionRoutes.js
			│   │   ├─ healthLogRoutes.js
			│   │   └─ userRoutes.js
			│   └─ middleware/
			│       └─ authMiddleware.js
			│
			
		````