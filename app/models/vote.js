import VoteValidation from './votevalidation';

class Vote {
  constructor() {
    this.voteValidation = new VoteValidation();
    this.votes = [
      { restaurantId: 7, team: 'Node', user: 'john@test.com' },
      { restaurantId: 8, team: 'Node', user: 'acey@test.com' },
      { restaurantId: 7, team: 'Node', user: 'jacob@test.com' },
      { restaurantId: 8, team: 'Node', user: 'jacob@test.com' },
      { restaurantId: 7, team: 'Node', user: 'daniel@test.com' },
      { restaurantId: 7, team: 'ABC', user: 'anna@test.com' },
    ];
  }

  save(vote) {
    this.voteValidation.validate(vote, this.getVotes());
    this.votes.push(vote);
    return vote;
  }

  getVotes(team) {
    if (team) {
      const votes = [];
      this.votes.forEach((vote) => {
        if (vote.team === team) {
          votes.push(vote);
        }
      });
      return votes;
    }
    return this.votes;
  }
}

export default Vote;
