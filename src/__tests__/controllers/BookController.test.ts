import { BookService } from "../../services/BookService";
import { BookController } from "../../controllers/BookController";

let bookController: BookController
let bookService: BookService
let mockResponse: any

beforeEach(() => {
    bookService = new BookService()

    bookController = new BookController(bookService)

    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
})

test("should create a new book", async () => {
    const mockRequest = {
        body: {
            title: "Atomic Habits",
            author: {
                name: "James Clear"
            }
        }
    }

    const mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }

    const createBookSpy = jest.spyOn(bookService, 'createBook').mockResolvedValue(mockBook as any)

    await bookController.createBook(mockRequest as any, mockResponse as any)

    expect(createBookSpy).toHaveBeenCalledWith(mockRequest.body)
    expect(createBookSpy).toHaveBeenCalledTimes(1)
})

test("should return all books data", async () => {
    const mockRequest = {}
    const mockBooks = [{ id: "1", title: "Atomic Habits", author: { name: "James Clear" } }]

    const getAllBooksSpy = jest.spyOn(bookService, 'getAllBooks').mockResolvedValue(mockBooks as any)

    await bookController.getAllBooks(mockRequest as any, mockResponse as any)

    expect(getAllBooksSpy).toHaveBeenCalledTimes(1)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBooks)
})

test("should return book details for a given ID", async () => {
    const mockRequest = { params: { id: "1" } }
    const mockBook = { id: "1", title: "Atomic Habits", author: { name: "James Clear" } }

    const getBookByIdSpy = jest.spyOn(bookService, 'getBookById').mockResolvedValue(mockBook as any)

    await bookController.getBookById(mockRequest as any, mockResponse as any)

    expect(getBookByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
    expect(getBookByIdSpy).toHaveBeenCalledTimes(1)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBook)
})

test('should return 404 if no book is found for the given ID', async () => {
    const mockRequest = { params: { id: '1' } }

    const getBookByIdSpy = jest.spyOn(bookService, 'getBookById').mockResolvedValue(null)

    await bookController.getBookById(mockRequest as any, mockResponse as any)

    expect(getBookByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Book not found' })
})

test('should update specific book details', async () => {
    const mockRequest = { params: { id: '1' }, body: { title: 'Ponniyin Selvan' } }
    const mockBook = { id: '1', title: 'Ponniyin Selvan', author: { name: 'Kalki' } }

    const updateBookSpy = jest.spyOn(bookService, 'updateBook').mockResolvedValue(mockBook as any)

    await bookController.updateBook(mockRequest as any, mockResponse as any)

    expect(updateBookSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body)
    expect(updateBookSpy).toHaveBeenCalledTimes(1)
    expect(mockResponse.json).toHaveBeenCalledWith(mockBook)
})

test('should return 404 if no book is found for the given ID', async () => {
    const mockRequest = { params: { id: '1' }, body: { title: 'Ponniyin Selvan' } }

    const updateBookSpy = jest.spyOn(bookService, 'updateBook').mockResolvedValue(null)

    await bookController.updateBook(mockRequest as any, mockResponse as any)

    expect(updateBookSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Book not found' })
})

test('should successfully delete an existing book', async () => {
    const mockRequest = { params: { id: '1' } }

    const deleteBookSpy = jest.spyOn(bookService, 'deleteBook').mockResolvedValue()

    await bookController.deleteBook(mockRequest as any, mockResponse as any)

    expect(deleteBookSpy).toHaveBeenCalledWith(mockRequest.params.id)
    expect(deleteBookSpy).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(204)
})