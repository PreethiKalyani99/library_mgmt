import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repositories/UserRepository";
import { hash} from "bcrypt"

jest.mock('bcrypt', () => ({
    hash: jest.fn()
}))

let userService: UserService
let userRepository: UserRepository

beforeEach(() => {
    userRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    } as any

    userService = new UserService(userRepository)
})

describe("UserService", () => {
    it("should create user", async () => {
        const hashedPassword = 'hashedPassword12345678';
        (hash as jest.Mock).mockResolvedValue(hashedPassword)

        const mockUser = { email: "abc@gmail.com", password: "12345678" }
        const expectedResult = { ...mockUser, password: hashedPassword }

        userRepository.findByEmail = jest.fn().mockResolvedValue(null)
        userRepository.create = jest.fn().mockResolvedValue(expectedResult)

        const result = await userService.createUser(mockUser as any)

        expect(hash).toHaveBeenCalledWith('12345678', 10)
        expect(userRepository.create).toHaveBeenCalledWith(expectedResult)
        expect(result).toEqual(expectedResult)
    })

    it("should throw error if user already exists", async () => {
        const mockUser = { email: "abc@gmail.com", password: "12345678" }

        userRepository.findByEmail = jest.fn().mockResolvedValue(mockUser)

        await expect(userService.createUser(mockUser as any)).rejects.toThrow('User with this email already exists')
    })
    
    it("should update user password", async () => {
        const newPassword = "newPassword12345678";
        (hash as jest.Mock).mockResolvedValue(newPassword)
    
        const mockUser = { id: "1", email: "abc@gmail.com", password: "12345678" }
    
        const updatedUser = { ...mockUser, password: newPassword }
    
        userRepository.findById = jest.fn().mockResolvedValue(mockUser)
        userRepository.update = jest.fn().mockResolvedValue(updatedUser)
    
        const result = await userService.updateUser(mockUser.id, newPassword)
    
        expect(hash).toHaveBeenCalledWith(newPassword, 10)
        expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, updatedUser)
        expect(result).toEqual(updatedUser) 
    })
    

    it("should return all users", async () => {
        const mockUsers = [{ id: "1", email: "abc@gmail.com" }]
        userRepository.findAll = jest.fn().mockResolvedValue(mockUsers)

        const result = await userService.getAllUsers()
        
        expect(userRepository.findAll).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockUsers)
    })
})
