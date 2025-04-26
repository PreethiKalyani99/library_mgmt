import { Request, Response } from 'express'
import { BorrowedBookService } from '../services/BorrowedBookService'

export class BorrowedBookController {
    private borrowedBookService: BorrowedBookService

    constructor() {
        this.borrowedBookService = new BorrowedBookService()
    }

    async getAllBorrowedBooks(req: Request, res: Response): Promise<void> {
        try {
            const borrowedBooks = await this.borrowedBookService.getAllBorrowedBookss()
            res.json(borrowedBooks)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching borrowedBooks', error: (error as Error).message })
        }
    }
    
    async createBorrowedBook(req: Request, res: Response): Promise<void> {
        try {
            const borrowedBook = await this.borrowedBookService.createBorrowedBook(req.body)
            res.status(201).json(borrowedBook)
        } catch (error) {
            res.status(400).json({ message: 'Error creating borrowedBook', error: (error as Error).message })
        }
    }

    async updateBorrowedBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { returnDate } = req.body
            
            const borrowedBook = await this.borrowedBookService.updateBorrowedBook(id, returnDate)
            if (!borrowedBook) {
                res.status(404).json({ message: 'Borrowed Book not found' })
                return
              }
              res.json(borrowedBook)
        } catch (error) {
            res.status(400).json({ message: 'Error updating borrowedBook', error: (error as Error).message })
        }
    }
}