import { Repository } from "typeorm";
import { Author } from "../entities/Author";
import { AppDataSource } from "../config/database";

export class AuthorRepository {
    private repository: Repository<Author>

    constructor(){
        this.repository = AppDataSource.getRepository(Author)
    }

    async findAll(): Promise<Author[]> {
        return this.repository.find()
    }

    async findById(id: string): Promise<Author | null> {
        return this.repository.findOneBy({ id })
    }

    async create(authorData: Partial<Author>): Promise<Author> {
        const author = this.repository.create(authorData)
        return this.repository.save(author)
    }

    async update(id: string, authorData: Partial<Author>): Promise<Author | null> {
        await this.repository.update(id, authorData)
        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}