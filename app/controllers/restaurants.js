import Restaurant from '../models/restaurant';

class RestaurantsController {
  constructor() {
    this.restaurantModel = new Restaurant();
  }

  getAll() {
    return this.restaurantModel.getAll();
  }

  getAlreadyVisitedRestaurants(teamId) {
    return this.restaurantModel.getAlreadyVisitedRestaurants(teamId);
  }
}

export default RestaurantsController;
