import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error: (error as Error).message });
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error: (error as Error).message });
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: 'Error creating book', error: (error as Error).message });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.updateBook(req.params.id, req.body);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(400).json({ message: 'Error updating book', error: (error as Error).message });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      await this.bookService.deleteBook(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Error deleting book', error: (error as Error).message });
    }
  }
} 