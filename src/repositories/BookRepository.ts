import { Repository } from 'typeorm'
import { Book } from '../entities/Book'
import { AppDataSource } from '../config/database'

export class BookRepository {
  private repository: Repository<Book>

  constructor() {
    this.repository = AppDataSource.getRepository(Book)
  }

  async findAll(): Promise<Book[]> {
    return this.repository.find()
  }

  async findById(id: string): Promise<Book | null> {
    return this.repository.findOneBy({ id })
  }

  async findByTitle(title: string): Promise<Book | null> {
    return this.repository
      .createQueryBuilder('book')
      .where('LOWER(book.title) = LOWER(:title)', { title })
      .getOne()
  }
  
  async create(bookData: Partial<Book>): Promise<Book> {
    const book = this.repository.create(bookData)
    return this.repository.save(book)
  }

  async update(id: string, bookData: Partial<Book>): Promise<Book | null> {
    await this.repository.update(id, bookData)
    return this.findById(id)
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id)
  }
} 