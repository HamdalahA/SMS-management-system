import express from 'express';

const apiUrl = '/api/v1'

const router = express.Router();

router.get(`${apiUrl}/hello`, (req, res) => {
  res.send('Hello from SMS management API');
})


export default router;
