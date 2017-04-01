class VotesController {
  constructor() {
    this.votes = [
      { restaurantId: 7, user: 'john@test.com' },
      { restaurantId: 8, user: 'acey@test.com' },
      { restaurantId: 7, user: 'jacob@test.com' },
      { restaurantId: 8, user: 'jacob@test.com' },
      { restaurantId: 7, user: 'daniel@test.com' },
    ];
  }

  save(vote) {
    this.votes.push(vote);
    return vote;
  }

  getTeamVotesOnCurrentDay(teamId) {
    if (teamId) {
      return this.votes;
    }
    return [];
  }
}

export default VotesController;
