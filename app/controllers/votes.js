import Vote from '../models/vote';

class VotesController {
  constructor() {
    this.voteModel = new Vote();
  }

  save(vote) {
    return this.voteModel.save(vote);
  }

  getTeamVotesOnCurrentDay(teamId) {
    return this.voteModel.getVotes(teamId);
  }
}

export default VotesController;
