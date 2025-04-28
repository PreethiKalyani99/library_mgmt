import { AuthorService } from "../../services/AuthorService";
import { AuthorController } from "../../controllers/AuthorController";

describe("AuthorController", () => {
    let authorController: AuthorController
    let authorService: AuthorService
    let mockResponse: any

    beforeEach(() => {
        authorService = new AuthorService()

        authorController = new AuthorController(authorService)

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    it("should call createAuthor service method when creating an author", async () => {
        const mockRequest = {
            body: {
                name: "James Clear",
                country: "USA"
            }
        }

        const mockAuthor = { id: "1", name: "James Clear", country: "USA" }

        const createAuthorSpy = jest.spyOn(authorService, 'createAuthor').mockResolvedValue(mockAuthor as any)

        await authorController.createAuthor(mockRequest as any, mockResponse as any)

        expect(createAuthorSpy).toHaveBeenCalledWith(mockRequest.body)
        expect(createAuthorSpy).toHaveBeenCalledTimes(1)
    })

    it('should call getAllAuthors service method when fetching all authors', async () => {
        const mockRequest = {}
        const mockAuthors = [{ id: "1", name: "James Clear", country: "USA" }]

        const getAllAuthorsSpy = jest.spyOn(authorService, 'getAllAuthors').mockResolvedValue(mockAuthors as any)

        await authorController.getAllAuthors(mockRequest as any, mockResponse as any)

        expect(getAllAuthorsSpy).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).toHaveBeenCalledWith(mockAuthors)
    })

    it('should call getAuthorById service method when fetching an author by ID', async () => {
        const mockRequest = { params: { id: "1" } }
        const mockAuthor = { id: "1", name: "James Clear", country: "USA" }

        const getAuthorByIdSpy = jest.spyOn(authorService, 'getAuthorById').mockResolvedValue(mockAuthor as any)

        await authorController.getAuthorById(mockRequest as any, mockResponse as any)
    
        expect(getAuthorByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
        expect(mockResponse.json).toHaveBeenCalledWith(mockAuthor)
    })

    it('should return 404 if author not found', async () => {
        const mockRequest = { params: { id: '1' } }

        const getAuthorByIdSpy = jest.spyOn(authorService, 'getAuthorById').mockResolvedValue(null)

        await authorController.getAuthorById(mockRequest as any, mockResponse as any)

        expect(getAuthorByIdSpy).toHaveBeenCalledWith(mockRequest.params.id)
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Author not found' })
    })

    it('should call updateAuthor service method when updating an author', async () => {
        const mockRequest = { params: { id: "1" }, body: { name: "James Clear", country: "USA" } }
        const mockAuthor = { id: "1", name: "James Clear", country: "USA" }

        const updateAuthorSpy = jest.spyOn(authorService, 'updateAuthor').mockResolvedValue(mockAuthor as any)

        await authorController.updateAuthor(mockRequest as any, mockResponse as any)

        expect(updateAuthorSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body)
        expect(mockResponse.json).toHaveBeenCalledWith(mockAuthor)
    })

    it('should delete an author', async () => {
        const mockRequest = { params: { id: "1" } }

        const deleteAuthorSpy = jest.spyOn(authorService, 'deleteAuthor').mockResolvedValue()

        await authorController.deleteAuthor(mockRequest as any, mockResponse as any)

        expect(deleteAuthorSpy).toHaveBeenCalledWith(mockRequest.params.id)
        expect(deleteAuthorSpy).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(204)
    })
})