import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Progress endpoint' });
});

export default router;