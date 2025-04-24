import { Router } from 'express'
import bookRoutes from './bookRoutes'
import authorRoutes from './authorRoutes'
import borrowedBookRoutes from './borrowedBookRoutes'
import userRoutes from './userRoutes'

const router = Router()

// Register all routes
router.use('/books', bookRoutes)
router.use('/authors', authorRoutes)
router.use('/borrowed-books', borrowedBookRoutes)
router.use('/users', userRoutes)

router.get('/health', (req, res) => {
  res.send({ message: 'Hello World!!' })
})

export default router 
