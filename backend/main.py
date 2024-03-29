from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from model import HousePriceRegressionModel

app = FastAPI()

# Define CORS middleware settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define a class for your input data with the specified fields
class PredictionInput(BaseModel):
    MedInc: float  # Median income in the block
    HouseAge: float  # Age of the house
    AveRooms: float  # Average number of rooms
    AveBedrms: float  # Average number of bedrooms
    Population: float  # Block population
    AveOccup: float  # Average house occupancy
    Latitude: float  # House block latitude
    Longitude: float  # House block longitude

# Global variable to store the loaded model
model = None

@app.on_event("startup")
def load_model():
    global model
    filepath =  os.path.join(os.getcwd(), "model_weights/house_price_reg.pkl") 
    model = HousePriceRegressionModel(filepath)

@app.get('/')
def read_root():
    return "Hello World"

@app.get("/hello/{name}")
async def hello(name: str):
    return {
        "name": name,
        "letters": len(name),
        "greeting": f"hello {name}!"
    }

@app.post("/predict/")  # Using POST for sending prediction data
async def predict_price(input_data: PredictionInput):
    input_list = [list(input_data.model_dump().values())]
    prediction = model.predict(input_list)[0][0]
    return {
        "prediction": prediction
    }


# Instructions to Run
# uvicorn main:app --host localhost --port 8080 

# For Dev, add --reload 
# uvicorn main:app --host localhost --port 8080 --reload
