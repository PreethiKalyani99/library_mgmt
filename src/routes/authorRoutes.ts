import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const router = Router()
const authorController = new AuthorController()

router.get('/', (req, res) => authorController.getAllAuthors(req, res))
router.get('/:id', (req, res) => authorController.getAuthorById(req, res))
router.post('/', (req, res) => authorController.createAuthor(req, res))
router.put('/:id', (req, res) => authorController.updateAuthor(req, res))
router.delete('/:id', (req, res) => authorController.deleteAuthor(req, res))

export default router