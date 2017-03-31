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
    // TODO  save the vote and return the saved object
    this.votes.push(vote);
    return vote;
  }

  getTeamVotesOnCurrentDay(teamId) {
    // TODO  filter the votes of the team for the current day
    if (teamId) {
      return this.votes;
    }
    return [];
  }
}

export default VotesController;
