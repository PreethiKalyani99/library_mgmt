import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { userCreationSchema, userUpdateSchema, userIdSchema } from "../validations/userSchema";
import { validate } from "../middlewares/validate";

const router = Router()
const userController = new UserController()

router.get('/', (req, res) => userController.getAllUsers(req, res))
router.post('/', validate(userCreationSchema, 'body'), (req, res) => userController.createUser(req, res))
router.put('/:id', validate(userIdSchema, 'params'), validate(userUpdateSchema, 'body'), (req, res) => userController.updateUser(req, res))

export default router