from fastapi import FastAPI
from forecastApi import app as forecast_api_app  
from api import inventory, recipe

app = FastAPI()

# Mount the forecastApi FastAPI application instance under the desired path
app.mount("/", forecast_api_app)
app.mount("/api", recipe.app)
app.mount("/api", inventory.app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
