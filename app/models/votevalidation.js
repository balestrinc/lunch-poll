import Poll from './poll';
import Restaurant from './restaurant';

class VoteValidation {
  constructor(){
    this.poll = new Poll();
    this.restaurantModel = new Restaurant();
  }

  validate(vote, allVotes) {
    this.validatePollTime();
    this.validateUserVote(vote, allVotes);
    this.validateRestaurant(vote);
  }

  validateUserVote(vote, allVotes) {
    allVotes.forEach((currentValue) => {
      if (currentValue.user === vote.user) {
        throw new Error('User already voted.');
      }
    });
  }

  validatePollTime() {
    if (!this.poll.isPollOpen()) {
      throw new Error('The poll was closed at 12:00a.m.');
    }
  }

  validateRestaurant(vote) {
    const visitedRestaurants = this.restaurantModel.getAlreadyVisitedRestaurants(vote.team);
    visitedRestaurants.forEach((restaurant) => {
      if (restaurant.id === vote.restaurantId) {
        throw new Error('This restaurant was already visited this week.');
      }
    });
  }
}

export default VoteValidation;
