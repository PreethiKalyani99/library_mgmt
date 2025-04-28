import { Request, Response } from "express"
import { AuthorService } from "../services/AuthorService"

export class AuthorController {
    private authorService: AuthorService

    constructor(authorService?: AuthorService) {
        this.authorService = authorService ?? new AuthorService()
    }

    async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const authors = await this.authorService.getAllAuthors()
            res.json(authors)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching authors', error: (error as Error).message })
        }
    }

    async getAuthorById(req: Request, res: Response): Promise<void> {
        try {
            const author = await this.authorService.getAuthorById(req.params.id)
            if (!author) {
                res.status(404).json({ message: 'Author not found' })
                return
            }
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching author', error: (error as Error).message })
        }
    }

    async createAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await this.authorService.createAuthor(req.body)
            res.status(201).json(author)
        } catch (error) {
            res.status(400).json({ message: 'Error creating author', error: (error as Error).message })
        }
    }

    async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const author = await this.authorService.updateAuthor(req.params.id, req.body)
            if (!author) {
                res.status(404).json({ message: 'Author not found' })
                return
            }
            res.json(author)
        } catch (error) {
            res.status(400).json({ message: 'Error updating author', error: (error as Error).message })
        }
    }

    async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            await this.authorService.deleteAuthor(req.params.id)
            res.status(204).send()
        } catch (error) {
            res.status(400).json({ message: 'Error deleting author', error: (error as Error).message })
        }
    }
}