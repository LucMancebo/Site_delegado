import { Router } from 'express';

export const router = Router();

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Server is running',
  });
});

router.post('/supports', (req, res) => {
  const { fullName, email, city, bairro, message } = req.body;

  if (!fullName || !email || !city || !bairro || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'Campos obrigatorios ausentes',
    });
  }

  const support = {
    id: Date.now().toString(),
    fullName,
    email,
    city,
    bairro,
    message,
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json({
    status: 'created',
    support,
  });
});