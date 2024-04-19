
from prophet import Prophet
import pandas as pd
import numpy as np


# Define the forecast_sales function to perform forecasting on the cleaned data
def forecast_sales(dataframe, start_date, end_date, future_days):
    all_forecasts = pd.DataFrame()
    products = dataframe.columns.tolist()

    # Filter the dataframe based on the provided start and end dates
    filtered_data = dataframe.loc[start_date:end_date]

    for product in products:
        model = Prophet(daily_seasonality=False, yearly_seasonality=False,
                        growth='linear', seasonality_mode='multiplicative',
                        weekly_seasonality=True, holidays=None)
        sales_data = filtered_data[[product]].reset_index().rename(columns={'index': 'ds', product: 'y'})
        sales_data['floor'] = 0

        model.fit(sales_data)

        future_dates = model.make_future_dataframe(periods=future_days, include_history=False)
        future_dates['floor'] = 0

        forecast = model.predict(future_dates)
        forecast['yhat'] = forecast['yhat'].apply(lambda x: np.random.randint(2, 6) if x < 0 else x)
        forecast = forecast[['ds', 'yhat']].rename(columns={'yhat': product})
        all_forecasts = pd.concat([all_forecasts, forecast.set_index('ds')], axis=1)

    all_forecasts = all_forecasts.astype(int)
    return all_forecasts



# start_date_str = '2024-01-01'
# end_date_str = '2024-01-04'

# # Convert start_date and end_date strings to datetime objects
# start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
# end_date = datetime.strptime(end_date_str, '%Y-%m-%d')

# forecasted_data = forecast_sales(cleaned_data, start_date, end_date)
