import { Author } from "../entities/Author" 
import { AuthorRepository } from "../repositories/AuthorRepository"

export class AuthorService {
    private authorRepository: AuthorRepository

    constructor(authorRepository?: AuthorRepository) {
        this.authorRepository = authorRepository ?? new AuthorRepository()
    }

    async getAllAuthors(): Promise<Author[]> {
        return this.authorRepository.findAll()
    }

    async getAuthorById(id: string): Promise<Author | null> {
        return this.authorRepository.findById(id)
    }

    async createAuthor(authorData: Author): Promise<Author> {
        const author = await this.authorRepository.findByName(authorData.name)
        if(author){
            throw new Error("Author already exists")
        }
        
        return this.authorRepository.create(authorData)
    }

    async updateAuthor(id: string, authorData: Partial<Author>): Promise<Author | null> {
        const existingAuthor = await this.authorRepository.findById(id)
        if (!existingAuthor) {
            throw new Error('Author not found')
        }
        return this.authorRepository.update(id, authorData)
    }

    async deleteAuthor(id: string): Promise<void> {
        const existingAuthor = await this.authorRepository.findById(id)
        if (!existingAuthor) {
            throw new Error('Author not found')
        }
        await this.authorRepository.delete(id)
    }
}