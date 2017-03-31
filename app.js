import express from 'express';
import RestaurantsController from './app/controllers/restaurants';
import VotesController from './app/controllers/votes';

const app = express();

const restauratsController = new RestaurantsController();
const votesController = new VotesController();

app.route('/restaurants')
  .get((req, res) => {
    res.json(
      restauratsController.getAll(),
    );
  });

app.route('/restaurants/team/:teamId')
  .get((req, res) => {
    res.json(
      restauratsController.getNotEligibleRestaurants(req.params),
    );
  });

app.route('/votes')
  .post((req, res) => {
    res.json(
      votesController.save(req.body),
    );
  });

app.route('/votes/team/:teamId/day')
  .get((req, res) => {
    res.json(
      votesController.getTeamVotesOnCurrentDay(req.params),
    );
  });


export default app;
