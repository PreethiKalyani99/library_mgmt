import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";
import { authorCreationSchema, authorUpdateSchema, authorIdSchema } from "../validations/authorSchema";
import { validate } from "../middlewares/validate";

const router = Router()
const authorController = new AuthorController()

router.get('/', (req, res) => authorController.getAllAuthors(req, res))
router.get('/:id', validate(authorIdSchema, 'params'), (req, res) => authorController.getAuthorById(req, res))
router.post('/', validate(authorCreationSchema, 'body'), (req, res) => authorController.createAuthor(req, res))
router.put('/:id', validate(authorIdSchema, 'params'), validate(authorUpdateSchema, 'body'), (req, res) => authorController.updateAuthor(req, res))
router.delete('/:id', validate(authorIdSchema, 'params'), (req, res) => authorController.deleteAuthor(req, res))

export default router