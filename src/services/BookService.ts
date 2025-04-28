import { Book } from '../entities/Book'
import { Author } from '../entities/Author'
import { BookRepository } from '../repositories/BookRepository'
import { AuthorRepository } from '../repositories/AuthorRepository'

interface AuthorDataType {
  id: string
  name: string
}

export class BookService {
  private bookRepository: BookRepository
  private authorRepository: AuthorRepository

  constructor(bookRepository?: BookRepository, authorRepository?: AuthorRepository) {
    this.bookRepository = bookRepository ?? new BookRepository()
    this.authorRepository = authorRepository ?? new AuthorRepository()
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll()
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id)
  }

  async findAuthorBy({ id, name }: AuthorDataType): Promise<Author | null> {
    if (id) {
      return this.authorRepository.findById(id)
    }
    return this.authorRepository.findByName(name)
  }
  
  async createBook(bookData: Book): Promise<Book> {
    // Add any business logic/validation here
    const book = await this.bookRepository.findByTitle(bookData.title)
    if (book) {
      throw new Error('Book with this title already exists')
    }
    
    const author = await this.findAuthorBy({id: bookData?.author?.id, name: bookData?.author?.name})
    if(!author) {
      throw new Error('Author does not exist')
    }
    bookData.author = author
    return this.bookRepository.create(bookData)
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
    const book = await this.bookRepository.findById(id)
    if (!book) {
      throw new Error('Book not found')
    }

    if(bookData?.author?.name || bookData?.author?.id) {
      const author = await this.findAuthorBy({id: bookData?.author?.id, name: bookData?.author?.name})
      if(!author) {
        throw new Error('Author does not exist')
      }
      bookData.author = author
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