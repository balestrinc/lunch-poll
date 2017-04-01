import Vote from '../../../app/models/vote';

const mockPoll = td.function()
mockPoll.isPollOpen = td.function();
mockPoll.pollEndTime = td.function();

const mockRestaurant = td.function()
mockRestaurant.getAlreadyVisitedRestaurants = td.function();


describe('Models: Vote', () => {
  const voteModel = new Vote();
  voteModel.voteValidation.poll = mockPoll;
  voteModel.voteValidation.restaurantModel = mockRestaurant;

  afterEach(done => {
    td.reset();
    done();
  });
  beforeEach(done => {
    const allVotes = [
      { restaurantId: 8, team: 'Node', user: 'jacob@test.com' },
      { restaurantId: 7, team: 'Node', user: 'daniel@test.com' },
      { restaurantId: 7, team: 'ABC', user: 'anna@test.com' },
    ];
    voteModel.votes = allVotes;
    done();
  });

  describe('Get all votes of the day for one team: getVotes', () => {
    it('should return all the votes for the team Node', (done) => {
      const expectedList = [
        { restaurantId: 8, team: 'Node', user: 'jacob@test.com' },
        { restaurantId: 7, team: 'Node', user: 'daniel@test.com' },
      ];

      const result = voteModel.getVotes('Node');
      expect(result).to.be.eql(expectedList);

      done();
    });

    it('should return a empty list when there are no votes for the team', (done) => {
      const expectedList = [];

      const result = voteModel.getVotes('Babum');
      expect(result).to.be.eql(expectedList);

      done();
    });
  });

  describe('Save a vote: save', () => {
    const newVote = { restaurantId: 7, team: 'ABC', user: 'lucas@test.com' };
    const restaurants = [
      { id: 9, name: 'Natural Green' },
    ];

    beforeEach(done => {
      td.when(voteModel.voteValidation.poll.isPollOpen()).thenReturn(true);
      td.when(mockRestaurant.getAlreadyVisitedRestaurants('ABC')).thenReturn(restaurants);
      done();
    });

    it('should save a vote', (done) => {
      const expectedList = [
        { restaurantId: 8, team: 'Node', user: 'jacob@test.com' },
        { restaurantId: 7, team: 'Node', user: 'daniel@test.com' },
        { restaurantId: 7, team: 'ABC', user: 'anna@test.com' },
        { restaurantId: 7, team: 'ABC', user: 'lucas@test.com' },
      ];

      voteModel.save(newVote);
      expect(voteModel.votes).to.be.eql(expectedList);
      done();
    });

    it('should return the vote after save it', (done) => {
      const result = voteModel.save(newVote);
      expect(result).to.be.eql(newVote);
      done();
    });

    it('should throw an error when the user already voted', (done) => {
      voteModel.votes.push(newVote);
      expect(voteModel.save.bind(voteModel, newVote)).to.throw('User already voted.');
      done();
    });

    it('should throw an error when the poll is already closed', (done) => {
      td.when(voteModel.voteValidation.poll.isPollOpen()).thenReturn(false);
      expect(voteModel.save.bind(voteModel, newVote)).to.throw('The poll was closed at 12:00a.m.');
      done();
    });

    it('should throw an error when the restaurant was already visited on the week', (done) => {
      const weekRestaurants = [
        { id: 7, name: 'Natural Green' },
      ];
      td.when(mockRestaurant.getAlreadyVisitedRestaurants('ABC')).thenReturn(weekRestaurants);
      expect(voteModel.save.bind(voteModel, newVote)).to.throw('This restaurant was already visited this week.');
      done();
    });
  });
});
