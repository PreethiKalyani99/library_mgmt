import { Router } from 'express';
import bookRoutes from './bookRoutes';

const router = Router();

// Register all routes
router.use('/books', bookRoutes);

router.get('/health', (req, res) => {
  res.send({ message: 'Hello World!!' });
});

export default router; 