import { AuthorService } from "../../services/AuthorService";
import { AuthorRepository } from "../../repositories/AuthorRepository";

let authorService: AuthorService
let authorRepository: AuthorRepository

beforeEach(() => {
    authorRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    } as any

    authorService = new AuthorService(authorRepository)
})

describe("AuthorService", () => {
    it("should create author", async () => {
        const mockAuthor = { name: "James Clear" }
        const expectedResult = { id: "1", name: "James Clear" }

        authorRepository.findByName = jest.fn().mockResolvedValue(null)
        authorRepository.create = jest.fn().mockResolvedValue(expectedResult)

        const result = await authorService.createAuthor(mockAuthor as any)

        expect(authorRepository.create).toHaveBeenCalledWith(mockAuthor)
        expect(result).toEqual(expectedResult)
    })

    it("should throw an error if author already exists", async () => {
        const mockAuthor = { name: "James Clear" }
        const existingAuthor = { id: "1", name: "James Clear" }

        authorRepository.findByName = jest.fn().mockResolvedValue(existingAuthor)

        await expect(authorService.createAuthor(mockAuthor as any)).rejects.toThrow("Author already exists")
    })

    it('should update author', async () => {    
        const mockAuthor = { id: "1", name: "James Clear" }
        const updatedData = { name: "Spencer Johnson" }
        const expectedResult = { id: "1", name: "Spencer Johnson" }

        authorRepository.findById = jest.fn().mockResolvedValue(mockAuthor)
        authorRepository.update = jest.fn().mockResolvedValue(expectedResult)

        const result = await authorService.updateAuthor("1", updatedData)

        expect(authorRepository.update).toHaveBeenCalledWith("1", updatedData)
        expect(result).toEqual(expectedResult)
    })

    it('should throw an error if author not found for update', async () => {    
        const updatedData = { name: "Spencer Johnson" }

        authorRepository.findById = jest.fn().mockResolvedValue(null)

        await expect(authorService.updateAuthor("1", updatedData)).rejects.toThrow("Author not found")
    })

    it('should delete author', async () => {    
        const mockAuthor = { id: "1", name: "James Clear" }

        authorRepository.findById = jest.fn().mockResolvedValue(mockAuthor)
        authorRepository.delete = jest.fn()

        await authorService.deleteAuthor("1")

        expect(authorRepository.delete).toHaveBeenCalledWith("1")
    })

    it('should get all authors', async () => {
        const mockAuthors = [{ id: "1", name: "James Clear" }]

        authorRepository.findAll = jest.fn().mockResolvedValue(mockAuthors)

        const result = await authorService.getAllAuthors()

        expect(authorRepository.findAll).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockAuthors)
    })

    it('should get author by ID', async () => {
        const mockAuthor = { id: "1", name: "James Clear" }

        authorRepository.findById = jest.fn().mockResolvedValue(mockAuthor)

        const result = await authorService.getAuthorById("1")

        expect(authorRepository.findById).toHaveBeenCalledWith("1")
        expect(result).toEqual(mockAuthor)
    })
})
