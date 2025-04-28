import { Router } from 'express'
import { BorrowedBookController } from '../controllers/BorrowedBookController'
import { borrowedBookCreationSchema, borrowedBookUpdateSchema, borrowedBookIdSchema } from '../validations/borrowedBookSchema'
import { validate } from '../middlewares/validate'

const router = Router()
const borrowedBookController = new BorrowedBookController()

router.get('/', (req, res) => borrowedBookController.getAllBorrowedBooks(req, res))
router.get('/:id', validate(borrowedBookIdSchema, 'params'), (req, res) => borrowedBookController.getBorrowedBookById(req, res))
router.post('/', validate(borrowedBookCreationSchema, 'body'), (req, res) => borrowedBookController.createBorrowedBook(req, res))
router.put('/:id', validate(borrowedBookIdSchema, 'params'), validate(borrowedBookUpdateSchema, 'body'), (req, res) => borrowedBookController.updateBorrowedBook(req, res))

export default router