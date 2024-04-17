Inventory Management System

This project is designed to provide an efficient inventory management solution, utilizing forecasting algorithms to predict future inventory needs based on historical sales data.

Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites

What things you need to install the software and how to install them:

Python 3.8 or higher
pip (Python package installer)
Installation

A step-by-step series of examples that tell you how to get a development environment running:

Clone the repository

git clone https://github.com/your-username/your-project-name.git
cd your-project-name

 Set up a virtual environment (Optional but recommended):
     For Windows:

     bash
python -m venv venv .\venv\Scripts\activate

For macOS and Linux:

bash

python3 -m venv venv
source venv/bin/activate
Install required packages:

bash

pip install -r requirements.txt

This command will install all the necessary dependencies, including FastAPI, Uvicorn, pandas, Prophet, and any others defined in your requirements.txt.
Running the Application

To run the application, use the following command:

bash

uvicorn main:app --reload

This command starts the Uvicorn server with live reloading enabled. Accessing the Application

Once the server is running, you can access the application by navigating to http://127.0.0.1:8000 in your web browser. Built With

FastAPI - The web framework used
Uvicorn - ASGI server for FastAPI
Pandas - Data manipulation library
Prophet - Forecasting library used for making predictions

Front-End
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



