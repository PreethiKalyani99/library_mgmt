import { BookRepository } from "../../repositories/BookRepository"
import { Book } from "../../entities/Book"

const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    getOne: jest.fn(),
    where: jest.fn()
}
  
jest.mock("../../config/database", () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository),
    }
}))

describe("BookRepository", () => {
    let bookRepository: BookRepository
    
    beforeEach(() => {
        bookRepository = new BookRepository()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should find all books", () => {
        const books = [{ id: "1", title: "Book 1" }, { id: "2", title: "Book 2" }] as Book[]
        mockRepository.find.mockResolvedValue(books)

        const result = bookRepository.findAll()

        expect(mockRepository.find).toHaveBeenCalled()
        expect(result).resolves.toEqual(books)
    })

    it("should find a book by id", () => {
        const book = { id: "1", title: "Book 1" } as Book
        mockRepository.findOneBy.mockResolvedValue(book)

        const result = bookRepository.findById("1")

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: "1" })
        expect(result).resolves.toEqual(book)
    })

    it("should find a book by title", () => {
        const book = { id: "1", title: "Book 1" } as Book
        mockRepository.createQueryBuilder.mockReturnValue({
            where: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(book),
        })

        const result = bookRepository.findByTitle("Book 1")

        expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith("book")
        expect(result).resolves.toEqual(book)
    })

    it("should create a book", () => {
        const bookData = { title: "Book 1" } as Partial<Book>
        const book = { id: "1", ...bookData } as Book
        mockRepository.create.mockReturnValue(book)
        mockRepository.save.mockResolvedValue(book)

        const result = bookRepository.create(bookData)

        expect(mockRepository.create).toHaveBeenCalledWith(bookData)
        expect(mockRepository.save).toHaveBeenCalledWith(book)
        expect(result).resolves.toEqual(book)
    })

    it("should update a book", () => {
        const bookData = { title: "Updated Book" } as Partial<Book>
        const book = { id: "1", ...bookData } as Book
        mockRepository.update.mockResolvedValue(book)
        bookRepository.findById = jest.fn().mockResolvedValue(book)
        const result = bookRepository.update("1", bookData)

        expect(mockRepository.update).toHaveBeenCalledWith("1", bookData)
        expect(result).resolves.toEqual(book)
    })

    it("should softdelete a book", () => {
        const bookId = "1"
        mockRepository.softDelete.mockResolvedValue(undefined)

        bookRepository.delete(bookId)

        expect(mockRepository.softDelete).toHaveBeenCalledWith(bookId)
    })
})