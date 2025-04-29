import { BorrowedBookService } from "../../services/BorrowedBookService";
import { BorrowedBookController } from "../../controllers/BorrowedBookController";

let borrowedBookController: BorrowedBookController
let borrowedBookService: BorrowedBookService
let mockResponse: any

beforeEach(() => {
    borrowedBookService = new BorrowedBookService()

    borrowedBookController = new BorrowedBookController(borrowedBookService)

    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
})

test("should create a new borrowed book", async () => {
    const mockRequest = {
        body: {
            bookId: "1",
            userId: "1",
            borrow_date: "2023-10-01"
        }
    }

    const mockBorrowedBook = { id: "1", bookId: "1", userId: "1", borrow_date: "2023-10-01" }

    const createBorrowedBookSpy = jest.spyOn(borrowedBookService, 'createBorrowedBook').mockResolvedValue(mockBorrowedBook as any)

    await borrowedBookController.createBorrowedBook(mockRequest as any, mockResponse as any)

    expect(createBorrowedBookSpy).toHaveBeenCalledWith(mockRequest.body)
    expect(createBorrowedBookSpy).toHaveBeenCalledTimes(1)
})

test('should return all borrowed books data', async () => {
    const mockRequest = {}
    const mockBorrowedBooks = [{ id: "1", bookId: "1", userId: "1", borrow_date: "2023-10-01" }]

    const getAllBorrowedBooksSpy = jest.spyOn(borrowedBookService, 'getAllBorrowedBooks').mockResolvedValue(mockBorrowedBooks as any)

    await borrowedBookController.getAllBorrowedBooks(mockRequest as any, mockResponse as any)

    expect(getAllBorrowedBooksSpy).toHaveBeenCalledTimes(1)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBorrowedBooks)
})

test('should return borrowed book details for a given ID', async () => {
    const mockRequest = { params: { id: "1" } }
    const mockBorrowedBook = { id: "1", bookId: "1", userId: "1", borrow_date: "2023-10-01" }

    const getBorrowedBookByIdSpy = jest.spyOn(borrowedBookService, 'getBorrowedBookById').mockResolvedValue(mockBorrowedBook as any)

    await borrowedBookController.getBorrowedBookById(mockRequest as any, mockResponse as any)

    expect(getBorrowedBookByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBorrowedBook)
})

test('should update existing borrowed book return date', async () => {
    const mockRequest = { params: { id: "1" }, body: { returnDate: "2023-10-15" } }
    const mockBorrowedBook = { id: "1", bookId: "1", userId: "1", borrow_date: "2023-10-01", returnDate: "2023-10-15" }

    const updateBorrowedBookSpy = jest.spyOn(borrowedBookService, 'updateBorrowedBook').mockResolvedValue(mockBorrowedBook as any)

    await borrowedBookController.updateBorrowedBook(mockRequest as any, mockResponse as any)

    expect(updateBorrowedBookSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body.returnDate)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBorrowedBook)
})

test('should return 404 if no borrowed book is found for the given ID', async () => {
    const mockRequest = { params: { id: '1' } }

    const getBorrowedBookByIdSpy = jest.spyOn(borrowedBookService, 'getBorrowedBookById').mockResolvedValue(null)

    await borrowedBookController.getBorrowedBookById(mockRequest as any, mockResponse as any)

    expect(getBorrowedBookByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Borrowed Book not found' })
})