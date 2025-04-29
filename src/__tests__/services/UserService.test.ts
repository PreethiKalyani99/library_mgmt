import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repositories/UserRepository";
import { hash } from "bcrypt"

jest.mock('bcrypt', () => ({
    hash: jest.fn()
}))

let userService: UserService
let userRepository: UserRepository
let mockUser: any

beforeEach(() => {
    userRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    } as any

    userService = new UserService(userRepository)
    mockUser = { email: "abc@gmail.com", password: "12345678" }
})

test("should create a new user", async () => {
    const hashedPassword = 'hashedPassword12345678';
    (hash as jest.Mock).mockResolvedValue(hashedPassword)

    const expectedResult = { ...mockUser, password: hashedPassword }

    userRepository.findByEmail = jest.fn().mockResolvedValue(null)
    userRepository.create = jest.fn().mockResolvedValue(expectedResult)

    const result = await userService.createUser(mockUser as any)

    expect(hash).toHaveBeenCalledWith('12345678', 10)
    expect(userRepository.create).toHaveBeenCalledWith(expectedResult)
    expect(result).toEqual(expectedResult)
})

test("should throw error if user already exists", async () => {
    userRepository.findByEmail = jest.fn().mockResolvedValue(mockUser)

    await expect(userService.createUser(mockUser as any)).rejects.toThrow('User with this email already exists')
})

test("should update existing user's password", async () => {
    const newPassword = "newPassword12345678";
    (hash as jest.Mock).mockResolvedValue(newPassword)

    const updatedUser = { ...mockUser, password: newPassword }

    userRepository.findById = jest.fn().mockResolvedValue(mockUser)
    userRepository.update = jest.fn().mockResolvedValue(updatedUser)

    const result = await userService.updateUser(mockUser.id, newPassword)

    expect(hash).toHaveBeenCalledWith(newPassword, 10)
    expect(userRepository.update).toHaveBeenCalledWith(mockUser.id, updatedUser)
    expect(result).toEqual(updatedUser)
})


test("should return all users", async () => {
    userRepository.findAll = jest.fn().mockResolvedValue([mockUser])

    const result = await userService.getAllUsers()

    expect(userRepository.findAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual([mockUser])
})