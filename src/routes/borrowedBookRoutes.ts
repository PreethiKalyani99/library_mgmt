import { Router } from 'express'
import { BorrowedBookController } from '../controllers/BorrowedBookController'

const router = Router()
const borrowedBookController = new BorrowedBookController()

router.get('/', (req, res) => borrowedBookController.getAllBorrowedBooks(req, res))
router.post('/', (req, res) => borrowedBookController.createBorrowedBook(req, res))
router.put('/:id', (req, res) => borrowedBookController.updateBorrowedBook(req, res))

export default router