import PizzaModel from './FoodModels/PizzaModel';
import BurgerModel from './FoodModels/BurgerModel';
import SushiModel from './FoodModels/SushiModel';
import SaladModel from './FoodModels/SaladModel';
import PastaModel from './FoodModels/PastaModel';
import TacoModel from './FoodModels/TacoModel';
import GenericModel from './FoodModels/GenericModel';

const FoodModelFactory = (foodType) => {
  const lowerFoodType = foodType.toLowerCase();

  if (lowerFoodType.includes('pizza')) {
    return PizzaModel();
  } else if (lowerFoodType.includes('burger')) {
    return BurgerModel();
  } else if (lowerFoodType.includes('sushi')) {
    return SushiModel();
  } else if (lowerFoodType.includes('salad')) {
    return SaladModel();
  } else if (lowerFoodType.includes('pasta')) {
    return PastaModel();
  } else if (lowerFoodType.includes('taco')) {
    return TacoModel();
  } else {
    return GenericModel();
  }
};

export default FoodModelFactory;
