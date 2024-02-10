import pickle

class HousePriceRegressionModel:
    """Class which will hold the House Price Model
    Args:
        path_to_weights (str): Path to the pickled weights
        
    Methods:
        predict(x): Apply model and return prediction of price

    """
    def __init__(self, path_to_weights) -> None:
        self.model = self.load_pickle(path_to_weights)

    def predict(self, x):
        y_pred = self.model.predict(x)
        return y_pred
    
    def load_pickle(self, filepath):
        obj = None
        # Change mode from "wb" (write binary) to "rb" (read binary)
        with open(filepath, "rb") as f:
            obj = pickle.load(f)  # Use load() to read the pickle data from the file, not loads()
        
        return obj


if __name__ == "__main__":
    model = HousePriceRegressionModel("backend\model_weights\house_price_reg.pkl")
    print(model)
