import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers()
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: (error as Error).message })
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body)
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error: (error as Error).message })
        }
    }
}