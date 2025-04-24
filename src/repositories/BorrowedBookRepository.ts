import { Repository } from "typeorm";
import { BorrowedBook } from "../entities/BorrowedBook";
import { AppDataSource } from "../config/database";

export class BorrowedBookRepository {
    private repository: Repository<BorrowedBook>

    constructor() {
        this.repository = AppDataSource.getRepository(BorrowedBook)
    }

    async findAll(): Promise<BorrowedBook[]> {
        return this.repository.find({ relations: ['books'] })
    }

    async findById(id: string): Promise<BorrowedBook | null> {
        return this.repository.findOne({
            where: { id },
            relations: ['books']
        })
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