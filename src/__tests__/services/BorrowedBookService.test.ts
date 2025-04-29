import { BorrowedBookService } from "../../services/BorrowedBookService";
import { BorrowedBookRepository } from "../../repositories/BorrowedBookRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { BookRepository } from "../../repositories/BookRepository";

let borrowedBookService: BorrowedBookService
let bookRepository: BookRepository
let userRepository: UserRepository
let borrowedBookRepository: BorrowedBookRepository
let mockUser: any
let mockBook: any
let mockBorrowedBook: any

beforeEach(() => {
    borrowedBookRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    } as any

    bookRepository = {
        findById: jest.fn(),
        findByTitle: jest.fn(),
    } as any

    userRepository = {
        findByEmail: jest.fn(),
        findById: jest.fn(),
    } as any

    borrowedBookService = new BorrowedBookService(borrowedBookRepository, userRepository, bookRepository)

    mockUser = { id: "1", email: "abc@gmail.com" }
    mockBook = { id: "1", title: "Atomic Habits" }
    mockBorrowedBook = { user: mockUser, book: mockBook, borrowedDate: new Date('2025-01-04') }
})

test('should create a new borrowed book', async () => {
    borrowedBookService.findUserBy = jest.fn().mockResolvedValue(mockUser)
    borrowedBookService.findBookBy = jest.fn().mockResolvedValue(mockBook)
    borrowedBookRepository.create = jest.fn().mockResolvedValue(mockBorrowedBook)

    const result = await borrowedBookService.createBorrowedBook(mockBorrowedBook as any)

    expect(borrowedBookRepository.create).toHaveBeenCalledWith(mockBorrowedBook)
    expect(result).toEqual(mockBorrowedBook)
})

test('should throw error if user does not exist', async () => {
    borrowedBookService.findUserBy = jest.fn().mockResolvedValue(null)

    expect(borrowedBookService.createBorrowedBook(mockBorrowedBook as any)).rejects.toThrow('User does not exist')
    expect(borrowedBookService.findUserBy).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email })
})

test('should throw error if book does not exist', async () => {
    borrowedBookService.findUserBy = jest.fn().mockResolvedValue(mockUser)
    borrowedBookService.findBookBy = jest.fn().mockResolvedValue(null)

    await expect(borrowedBookService.createBorrowedBook(mockBorrowedBook as any)).rejects.toThrow('Book does not exist')
    expect(borrowedBookService.findBookBy).toHaveBeenCalledWith({ id: mockBook.id, title: mockBook.title })
})

test('should return all borrowed books', async () => {
    borrowedBookRepository.findAll = jest.fn().mockResolvedValue([mockBorrowedBook])

    const result = await borrowedBookService.getAllBorrowedBooks()

    expect(borrowedBookRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([mockBorrowedBook])
})


test('should return borrowed book for a given ID', async () => {
    borrowedBookRepository.findById = jest.fn().mockResolvedValue(mockBorrowedBook)

    const result = await borrowedBookService.getBorrowedBookById("1")

    expect(borrowedBookRepository.findById).toHaveBeenCalledWith("1")
    expect(result).toEqual(mockBorrowedBook)
})

test('should update existing borrowed book', async () => {
    const return_date = new Date('2025-01-10')

    borrowedBookRepository.findById = jest.fn().mockResolvedValue(mockBorrowedBook)
    borrowedBookRepository.update = jest.fn().mockResolvedValue({ ...mockBorrowedBook, return_date })

    const result = await borrowedBookService.updateBorrowedBook("1", return_date)

    expect(borrowedBookRepository.findById).toHaveBeenCalledWith("1")
    expect(borrowedBookRepository.update).toHaveBeenCalledWith("1", { ...mockBorrowedBook, return_date })
    expect(result).toEqual({ ...mockBorrowedBook, return_date })
})