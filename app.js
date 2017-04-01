import express from 'express';
import RestaurantsController from './app/controllers/restaurants';
import VotesController from './app/controllers/votes';

const app = express();
const bodyParser = require('body-parser');

const restauratsController = new RestaurantsController();
const votesController = new VotesController();


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.route('/restaurants')
  .get((req, res) => {
    res.json(
      restauratsController.getAll()
    );
  });

app.route('/restaurants/team/:teamId')
  .get((req, res) => {
    res.json(
      restauratsController.getAlreadyVisitedRestaurants(req.params.teamId)
    );
  });

app.route('/votes')
  .post((req, res) => {
    res.json(
      votesController.save(req.body)
    );
  });

app.route('/votes/team/:teamId/day')
  .get((req, res) => {
    res.json(
      votesController.getTeamVotesOnCurrentDay(req.params.teamId),
    );
  });


export default app;
