import { BookService } from "../../services/BookService";
import { BookRepository } from "../../repositories/BookRepository";
import { AuthorRepository } from "../../repositories/AuthorRepository";

let bookService: BookService
let bookRepository: BookRepository
let authorRepository: AuthorRepository
let mockBook: any

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

    mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }
})

test("should create a new book", async () => {
    const mockAuthor = { id: "1", name: "James Clear" }
    const expectedResult = { id: "1", title: "Atomic Habits", author: mockAuthor }

    bookRepository.findByTitle = jest.fn().mockResolvedValue(null)
    bookService.findAuthorBy = jest.fn().mockResolvedValue(mockAuthor)
    bookRepository.create = jest.fn().mockResolvedValue(expectedResult)

    const result = await bookService.createBook(mockBook as any)

    expect(bookRepository.create).toHaveBeenCalledWith(expectedResult)
    expect(result).toEqual(expectedResult)
})

test("should return all books", () => {
    bookRepository.findAll = jest.fn().mockResolvedValue([mockBook])

    const result = bookService.getAllBooks()

    expect(bookRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).resolves.toEqual([mockBook])
})

test("should return an empty array when no books are found", () => {
    bookRepository.findAll = jest.fn().mockResolvedValue([])

    const result = bookService.getAllBooks()

    expect(bookRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).resolves.toEqual([])
})

test("should return book details for a given ID", () => {
    bookRepository.findById = jest.fn().mockResolvedValue(mockBook)

    const result = bookService.getBookById("1")

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).resolves.toEqual(mockBook)
})

test("should return null when the book is not found", () => {
    bookRepository.findById = jest.fn().mockResolvedValue(null)

    const result = bookService.getBookById("1")

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).resolves.toBeNull()
})

test("should update existing book", () => {
    const updatedData = { title: "Atomic Habits - Updated" }
    bookRepository.findById = jest.fn().mockResolvedValue(mockBook)
    bookRepository.update = jest.fn().mockResolvedValue({ ...mockBook, ...updatedData })

    const result = bookService.updateBook("1", updatedData as any)

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).resolves.toEqual({ ...mockBook, ...updatedData })
})

test("should throw an error when the book is not found to update", () => {
    const updatedData = { title: "Atomic Habits - Updated" }
    bookRepository.findById = jest.fn().mockResolvedValue(null)

    const result = bookService.updateBook("1", updatedData as any)

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).rejects.toThrow("Book not found")
})

test("should soft delete a book", () => {
    bookRepository.findById = jest.fn().mockResolvedValue(mockBook)
    bookRepository.delete = jest.fn()

    const result = bookService.deleteBook("1")

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).resolves.toBeUndefined()
})

test("should throw an error when the book is not found to delete", () => {
    bookRepository.findById = jest.fn().mockResolvedValue(null)

    const result = bookService.deleteBook("1")

    expect(bookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).rejects.toThrow("Book not found")
})