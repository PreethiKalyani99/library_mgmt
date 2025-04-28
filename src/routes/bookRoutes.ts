import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { bookCreationSchema, bookUpdateSchema, bookIdSchema } from '../validations/bookSchema';
import { validate } from '../middlewares/validate';

const router = Router();
const bookController = new BookController();

// Bind the controller methods to the routes
router.get('/', (req, res) => bookController.getAllBooks(req, res)); 
router.get('/:id', validate(bookIdSchema, 'params'), (req, res) => bookController.getBookById(req, res));
router.post('/', validate(bookCreationSchema, 'body'), (req, res) => bookController.createBook(req, res));
router.put('/:id', validate(bookIdSchema, 'params'), validate(bookUpdateSchema, 'body'), (req, res) => bookController.updateBook(req, res));
router.delete('/:id', validate(bookIdSchema, 'params'), (req, res) => bookController.deleteBook(req, res));

export default router; 