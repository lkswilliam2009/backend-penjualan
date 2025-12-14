import { Router } from "express";

const router = Router();

router.get('/web-service', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Connected to API Web Service',
    version: '1.0.0',
  });
});

export default router;
