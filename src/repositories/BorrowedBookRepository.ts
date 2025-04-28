import { Repository } from "typeorm";
import { BorrowedBook } from "../entities/BorrowedBook";
import { AppDataSource } from "../config/database";

export class BorrowedBookRepository {
    private repository: Repository<BorrowedBook>

    constructor() {
        this.repository = AppDataSource.getRepository(BorrowedBook)
    }

    async findAll(): Promise<BorrowedBook[]> {
        return this.repository 
        .createQueryBuilder('borrowedBook')
        .leftJoinAndSelect('borrowedBook.book', 'book')
        .leftJoin('borrowedBook.user', 'user')
        .addSelect(['user.id', 'user.email'])
        .getMany()
    }

    async findById(id: string): Promise<BorrowedBook | null> {
        return this.repository
        .createQueryBuilder('borrowedBook')
        .leftJoinAndSelect('borrowedBook.book', 'book')
        .leftJoin('borrowedBook.user', 'user')
        .addSelect(['user.id', 'user.email'])
        .where('borrowedBook.id = :id', { id })
        .getOne()
    }

    async create(borrowedBookData: Partial<BorrowedBook>): Promise<BorrowedBook> {
        const borrowedBook = this.repository.create(borrowedBookData)
        return this.repository.save(borrowedBook)
    }

    async update(id: string, borrowedBookData: Partial<BorrowedBook>): Promise<BorrowedBook | null> {
        await this.repository.update(id, borrowedBookData)
        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id)
    }
}