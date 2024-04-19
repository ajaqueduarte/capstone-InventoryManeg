from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from pydantic import BaseModel, Field
from forecaste import forecast_sales  # Ensure this is updated to accept date ranges
from data_cleaning_final import cleaned_data

# Initialize cleaned_data with the cleaned data
cleaned_data = cleaned_data

# Define FastAPI app
app = FastAPI()
# Allow requests from all origins (replace '*' with specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Allow all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allow specific HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define request model
class ForecastRequest(BaseModel):
    start_day: int = Field(..., ge=1, le=31)
    end_day: int = Field(..., ge=1, le=31)
    month: int = Field(..., ge=1, le=12)
    year: int = Field(..., ge=2020)
    future_days: int = Field(..., ge=1)  # New field for future days

# Define endpoint for generating forecast
@app.post("/forecast/")
async def generate_forecast(request: ForecastRequest):
    try:
        # Convert start and end days into actual dates
        forecast_start_date = date(request.year, request.month, request.start_day)
        forecast_end_date = date(request.year, request.month, request.end_day)
        
        # Generate forecast using cleaned_data
        forecasted_data = forecast_sales(cleaned_data, forecast_start_date, forecast_end_date, request.future_days)  # Pass future_days parameter
        
        # Convert forecasted data to JSON or suitable format for your front-end
        forecasted_json = forecasted_data.to_json(orient='split')
        
        return {"forecast": forecasted_json}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
