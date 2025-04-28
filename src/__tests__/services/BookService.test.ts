import { BookService } from "../../services/BookService"; 
import { BookRepository } from "../../repositories/BookRepository";
import { AuthorRepository } from "../../repositories/AuthorRepository";

let bookService: BookService
let bookRepository: BookRepository
let authorRepository: AuthorRepository

beforeEach(() => {
    bookRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        findByTitle: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    } as any

    authorRepository = {
        findByName: jest.fn(),
        findById: jest.fn(),
    } as any

    bookService = new BookService(bookRepository, authorRepository)
})

describe("BookService - createBook", () => {
    it("should create book", async () => {
        const mockBook = { title: "Atomic Habits", author: { name: "James Clear" } }
        const mockAuthor = { id: "1", name: "James Clear" }
        const expectedResult = { title: "Atomic Habits", author: mockAuthor }

        bookRepository.findByTitle = jest.fn().mockResolvedValue(null)
        bookService.findAuthorBy = jest.fn().mockResolvedValue(mockAuthor)
        bookRepository.create = jest.fn().mockResolvedValue(expectedResult)

        const result = await bookService.createBook(mockBook as any)

        expect(bookRepository.create).toHaveBeenCalledWith(expectedResult)
        expect(result).toEqual(expectedResult)
    })
})

describe("BookService - getAllBooks", () => {
    it("should return all books", () => {
        const mockBooks = [{ id: "1", title: "Atomic Habits", author: { name: "James Clear" } }]
        bookRepository.findAll = jest.fn().mockResolvedValue(mockBooks)

        const result = bookService.getAllBooks()

        expect(bookRepository.findAll).toHaveBeenCalledTimes(1)
        expect(result).resolves.toEqual(mockBooks)
    })

    it("should return an empty array when no books are found", () => {
        bookRepository.findAll = jest.fn().mockResolvedValue([])

        const result = bookService.getAllBooks()

        expect(bookRepository.findAll).toHaveBeenCalledTimes(1)
        expect(result).resolves.toEqual([])
    })
})

describe("BookService - getBookById", () => {
    it("should return a book by ID", () => {
        const mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }
        bookRepository.findById = jest.fn().mockResolvedValue(mockBook)

        const result = bookService.getBookById("1")

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).resolves.toEqual(mockBook)
    })

    it("should return null when the book is not found", () => {
        bookRepository.findById = jest.fn().mockResolvedValue(null)

        const result = bookService.getBookById("1")

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).resolves.toBeNull()
    })
})

describe("BookService - updateBook", () => {
    it("should update a book", () => {
        const mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }
        const updatedData = { title: "Atomic Habits - Updated" }
        bookRepository.findById = jest.fn().mockResolvedValue(mockBook)
        bookRepository.update = jest.fn().mockResolvedValue({ ...mockBook, ...updatedData })

        const result = bookService.updateBook("1", updatedData as any)

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).resolves.toEqual({ ...mockBook, ...updatedData })
    })

    it("should throw an error when the book is not found", () => {
        const updatedData = { title: "Atomic Habits - Updated" }
        bookRepository.findById = jest.fn().mockResolvedValue(null)

        const result = bookService.updateBook("1", updatedData as any)

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).rejects.toThrow("Book not found")
    })
})

describe("BookService - deleteBook", () => {
    it("should delete a book", () => {
        const mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }
        bookRepository.findById = jest.fn().mockResolvedValue(mockBook)
        bookRepository.delete = jest.fn()

        const result = bookService.deleteBook("1")

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).resolves.toBeUndefined()
    })

    it("should throw an error when the book is not found", () => {
        bookRepository.findById = jest.fn().mockResolvedValue(null)

        const result = bookService.deleteBook("1")

        expect(bookRepository.findById).toHaveBeenCalledWith("1")
        expect(result).rejects.toThrow("Book not found")
    })
})