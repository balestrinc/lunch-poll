import Poll from './poll';

class VoteValidation {
  constructor(){
    this.poll = new Poll();
  }

  validate(vote, allVotes) {
    this.validatePollTime();
    this.validateUserVote(vote, allVotes);
  }

  validateUserVote(vote, allVotes) {
    allVotes.forEach((currentValue) => {
      if (currentValue.user === vote.user) {
        throw new Error('User aleady voted.');
      }
    });
  }

  validatePollTime() {
    if (!this.poll.isPollOpen()) {
      throw new Error('The poll was closed at 12:00a.m.');
    }
  }
}

export default VoteValidation;
