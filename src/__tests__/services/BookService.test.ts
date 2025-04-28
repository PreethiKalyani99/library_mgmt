import { BookService } from "../../services/BookService";
import { BookRepository } from "../../repositories/BookRepository";

let bookService: BookService
let bookRepository: BookRepository

beforeEach(() => {
    bookRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    } as any

    bookService = new BookService(bookRepository)
})

describe("BookService - createBook", () => {
    it("should create book", () => {
        const mockBook = { title: "Atomic Habits", author: { name: "James Clear" } }
        bookRepository.create = jest.fn().mockResolvedValue({ id: "1", ...mockBook })

        const result = bookService.createBook(mockBook as any)

        expect(bookRepository.create).toHaveBeenCalledWith(mockBook)
        expect(result).resolves.toEqual({ id: "1", ...mockBook })
    })

    it("should throw an error when the title is missing", () => {
        const mockBook = { title: "", author: { name: "James Clear" } }
        bookRepository.create = jest.fn().mockResolvedValue({ id: "1", ...mockBook })

        const result = bookService.createBook(mockBook as any)

        expect(bookRepository.create).not.toHaveBeenCalledWith(mockBook)
        expect(result).rejects.toThrow("Title and author are required")
    })

    it("should throw an error when the author name is missing", () => {
        const mockBook = { title: "Atomic Habbits", author: { name: "" } }
        bookRepository.create = jest.fn().mockResolvedValue({ id: "1", ...mockBook })

        const result = bookService.createBook(mockBook as any)

        expect(bookRepository.create).not.toHaveBeenCalledWith(mockBook)
        expect(result).rejects.toThrow("Title and author are required")
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