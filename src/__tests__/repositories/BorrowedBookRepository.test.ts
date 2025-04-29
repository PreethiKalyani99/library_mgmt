import { BorrowedBookRepository } from "../../repositories/BorrowedBookRepository";
import { BorrowedBook } from "../../entities/BorrowedBook";

const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(),
    getOne: jest.fn(),
    where: jest.fn(),
    leftJoinAndSelect: jest.fn(),
    addSelect: jest.fn(),
    getMany: jest.fn(),
}

jest.mock("../../config/database", () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository),
    }
}))

let borrowedBookRepository: BorrowedBookRepository

beforeEach(() => {
    borrowedBookRepository = new BorrowedBookRepository()
})

afterEach(() => {
    jest.clearAllMocks()
})

test("should return all borrowed books data", () => {
    const borrowedBooks = [{ id: "1", book: { title: "Atomic Habits" }, user: { email: "user1@gmail.com" } }, { id: "2", book: { title: "Ponniyin Selvan" }, user: { email: "user2@gmail.com" } }] as BorrowedBook[]

    mockRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(borrowedBooks)
    })

    const result = borrowedBookRepository.findAll()

    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('borrowedBook')
    expect(result).resolves.toEqual(borrowedBooks)
})

test("should return borrowed book details for a given ID", () => {
    const borrowedBook = { id: "1", book: { title: "Atomic Habits" } } as BorrowedBook

    mockRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(borrowedBook)
    })

    const result = borrowedBookRepository.findById("1")

    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('borrowedBook')
    expect(result).resolves.toEqual(borrowedBook)
})

test("should create a new borrowed book", () => {
    const borrowedBookData = { book: { title: "Atomic Habits" }, user: { email: "abc@gmail.com" }, borrow_date: new Date('2025-01-01') } as Partial<BorrowedBook>
    const savedBorrowedBook = { id: "1", ...borrowedBookData } as BorrowedBook

    mockRepository.create.mockReturnValue(savedBorrowedBook)
    mockRepository.save.mockResolvedValue(savedBorrowedBook)

    const result = borrowedBookRepository.create(borrowedBookData)

    expect(mockRepository.create).toHaveBeenCalledWith(borrowedBookData)
    expect(mockRepository.save).toHaveBeenCalledWith(savedBorrowedBook)
    expect(result).resolves.toEqual(savedBorrowedBook)
})

test("should update existing borrowed book's return date", () => {
    const borrowedBookData = { return_date: new Date('2025-02-01') } as Partial<BorrowedBook>
    const updatedBorrowedBook = { id: "1", ...borrowedBookData } as BorrowedBook

    mockRepository.update.mockResolvedValue(borrowedBookData)
    mockRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(updatedBorrowedBook)
    })

    borrowedBookRepository.update("1", borrowedBookData)
    expect(mockRepository.update).toHaveBeenCalledWith("1", borrowedBookData)
})

test("should softdelete a borrowed book", () => {
    const borrowedBookId = "1"

    borrowedBookRepository.delete(borrowedBookId)

    expect(mockRepository.softDelete).toHaveBeenCalledWith(borrowedBookId)
})