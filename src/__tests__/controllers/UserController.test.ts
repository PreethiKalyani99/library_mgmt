import { UserService } from "../../services/UserService";
import { UserController } from "../../controllers/UserController";

describe("UserController", () => {
    let userController: UserController
    let userService: UserService
    let mockResponse: any

    beforeEach(() => {
        userService = new UserService()

        userController = new UserController(userService)

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
    })

    it("should call createUser service method when creating a user", async () => {
        const mockRequest = {
            body: {
                email: "abc@gmail.com",
                password: "12345678"
            }
        }
        const mockUser = { id: "1", email: "abc@gmail.com", password: "12345678" }

        const createUserSpy = jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser as any)

        await userController.createUser(mockRequest as any, mockResponse as any)

        expect(createUserSpy).toHaveBeenCalledWith(mockRequest.body)
        expect(createUserSpy).toHaveBeenCalledTimes(1)
    })

    it('should call getAllUsers service method when fetching all users', async () => {
        const mockRequest = {}
        const mockUsers = [{ id: "1", email: "abc@gmail.com", password: "12345678" }]

        const getAllUsersSpy = jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers as any)

        await userController.getAllUsers(mockRequest as any, mockResponse as any)

        expect(getAllUsersSpy).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).toHaveBeenCalledWith(mockUsers)
    })

    it('should call updateUser service method when updating a user', async () => {
        const mockRequest = { params: { id: "1" }, body: { password: "newpassword" } }
        const mockUser = { id: "1", email: "abc@gmail.com", password: "newpassword" }

        const updateUserSpy = jest.spyOn(userService, 'updateUser').mockResolvedValue(mockUser as any)

        await userController.updateUser(mockRequest as any, mockResponse as any)

        expect(updateUserSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body.password)
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser)
    })

    it('should return 404 if user not found during update', async () => {
        const mockRequest = { params: { id: "1" }, body: { password: "newpassword" } }

        const updateUserSpy = jest.spyOn(userService, 'updateUser').mockResolvedValue(null)

        await userController.updateUser(mockRequest as any, mockResponse as any)

        expect(updateUserSpy).toHaveBeenCalledWith(mockRequest.params.id, mockRequest.body.password)
        expect(mockResponse.status).toHaveBeenCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' })
    })
})