import { Book } from '../entities/Book'
import { BookRepository } from '../repositories/BookRepository'

export class BookService {
  private bookRepository: BookRepository

  constructor(bookRepository?: BookRepository) {
    this.bookRepository = bookRepository ?? new BookRepository()
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll()
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id)
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    // Add any business logic/validation here
    if (!bookData.title || (!bookData?.author?.name && !bookData?.author?.id)) {
      throw new Error('Title and author are required')
    }
    return this.bookRepository.create(bookData)
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
    const existingBook = await this.bookRepository.findById(id)
    if (!existingBook) {
      throw new Error('Book not found')
    }
    return this.bookRepository.update(id, bookData)
  }

  async deleteBook(id: string): Promise<void> {
    const existingBook = await this.bookRepository.findById(id)
    if (!existingBook) {
      throw new Error('Book not found')
    }
    await this.bookRepository.delete(id)
  }
} 