import RestaurantsController from '../../../app/controllers/restaurants';

describe('Controllers: Restaurants', () => {
  describe('Get the not eligible restaurants: getNotEligibleRestaurants', () => {
    it('should return a list with 3 restaurants that were already chosen when current day is Wednesday', (done) => {
      Date.prototype.getDay = function () {
        return 3;
      };

      const expectedList = [
        { id: 1, name: 'Chipotle Mexican Grill' },
        { id: 2, name: 'Olive Garden' },
        { id: 3, name: 'Applebee’s' },
      ];

      const restauratsController = new RestaurantsController();
      const result = restauratsController.getAlreadyVisitedRestaurants('Test');
      expect(result).to.be.eql(expectedList);

      done();
    });

    it('should return a empty list when current day is Sunday', (done) => {
      Date.prototype.getDay = function () {
        return 0;
      };

      const expectedList = [];

      const restauratsController = new RestaurantsController();
      const result = restauratsController.getAlreadyVisitedRestaurants('Test');
      expect(result).to.be.eql(expectedList);

      done();
    });
  });
});
