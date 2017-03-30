import express from 'express';

const app = express();
app.route('/restaurants')
  .get((req, res) => {
    res.json([
      {
        id: 1,
        name: 'Chipotle Mexican Grill',
      },
      {
        id: 2,
        name: 'Olive Garden',
      },
      {
        id: 3,
        name: 'Applebee’s',
      },
      {
        id: 4,
        name: 'Joe’s Crab Shack',
      },
      {
        id: 5,
        name: 'Black Angus Steakhouse',
      },
    ]);
  });
export default app;
