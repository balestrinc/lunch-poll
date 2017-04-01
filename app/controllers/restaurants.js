class RestaurantsController {
  constructor() {
    this.restaurants = [
      { id: 1, name: 'Chipotle Mexican Grill' },
      { id: 2, name: 'Olive Garden' },
      { id: 3, name: 'Applebee’s' },
      { id: 4, name: 'Joe’s Crab Shack' },
      { id: 5, name: 'Black Angus Steakhouse' },
      { id: 6, name: 'Guzman Y Gomez' },
      { id: 7, name: 'Jamie’s Italian' },
      { id: 8, name: 'Natural Green' },
    ];
  }

  getAll() {
    return this.restaurants;
  }

  getAlreadyVisitedRestaurants(teamId) {
    if (teamId) {
      const date = new Date();
      const weekDay = date.getDay();
      const notEligibleRestaurants = this.restaurants.slice(0, weekDay);
      return notEligibleRestaurants;
    }
    return [];
  }
}

export default RestaurantsController;
