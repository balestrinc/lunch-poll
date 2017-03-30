describe('Routes Restaurants', () => {
  const defaultRestaurant = {
    id: 1,
    name: 'Chipotle Mexican Grill',
  };
  describe('Route GET /restaurants', () => {
    it('should return a list of restaurants', (done) => {
      request
        .get('/restaurants')
        .end((err, res) => {
          expect(res.body).to.have.length(5);
          expect(res.body[0].id).to.be.eql(defaultRestaurant.id);
          expect(res.body[0].name).to.be.eql(defaultRestaurant.name);

          done(err);
        });
    });
  });
});
