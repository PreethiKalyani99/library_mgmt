import { AuthorRepository } from "../../repositories/AuthorRepository";
import { Author } from "../../entities/Author";

const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOne: jest.fn(),
    where: jest.fn()
}

jest.mock("../../config/database", () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository),
    }
}))

describe("AuthorRepository", () => {
    let authorRepository: AuthorRepository
    
    beforeEach(() => {
        authorRepository = new AuthorRepository()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should find all authors", () => {
        const authors = [{ id: "1", name: "Author 1" }, { id: "2", name: "Author 2" }] as Author[]
        mockRepository.find.mockResolvedValue(authors)

        const result = authorRepository.findAll()

        expect(mockRepository.find).toHaveBeenCalled()
        expect(result).resolves.toEqual(authors)
    })

    it("should find an author by id", () => {
        const author = { id: "1", name: "Author 1" } as Author
        mockRepository.findOneBy.mockResolvedValue(author)

        const result = authorRepository.findById("1")

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: "1" })
        expect(result).resolves.toEqual(author)
    })

    it("should find an author by name", () => {
        const author = { id: "1", name: "Author 1" } as Author
        mockRepository.createQueryBuilder.mockReturnValue({
            where: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(author),
        })

        const result = authorRepository.findByName("Author 1")

        expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('author')
        expect(result).resolves.toEqual(author)
    })

    it("should create an author", () => {
        const authorData = { name: "Author 1" } as Partial<Author>
        const author = { id: "1", ...authorData } as Author

        mockRepository.create.mockReturnValue(author)
        mockRepository.save.mockResolvedValue(author)

        const result = authorRepository.create(authorData)

        expect(mockRepository.create).toHaveBeenCalledWith(authorData)
        expect(mockRepository.save).toHaveBeenCalledWith(author)
        expect(result).resolves.toEqual(author)
    })

    it("should update an author", () => {
        const authorData = { name: "Updated Author" } as Partial<Author>
        const author = { id: "1", ...authorData } as Author

        mockRepository.update.mockResolvedValue(author)
        authorRepository.findById = jest.fn().mockResolvedValue(author)

        const result = authorRepository.update("1", authorData)

        expect(mockRepository.update).toHaveBeenCalledWith("1", authorData)
        expect(result).resolves.toEqual(author)
    })

    it("should delete an author", () => {
        const authorId = "1"

        authorRepository.delete(authorId)

        expect(mockRepository.delete).toHaveBeenCalledWith(authorId)
    })
})