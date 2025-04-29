import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";

const mockRepository = {
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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

let userRepository: UserRepository

beforeEach(() => {
    userRepository = new UserRepository()
})

afterEach(() => {
    jest.clearAllMocks()
})

test("should return all users data", () => {
    const users = [{ id: "1", email: "abc@gmail.com" }] as User[]
    mockRepository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(users),
    })

    const result = userRepository.findAll()

    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('user')
    expect(result).resolves.toEqual(users)
})

test("should return a user by the given ID", () => {
    const user = { id: "1", email: "abc@gmail.com" }

    mockRepository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(user),
    })

    const result = userRepository.findById("1")
    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('user')
    expect(result).resolves.toEqual(user)
})

test("should return a user by the given email", () => {
    const user = { id: "1", email: "abc@gmail.com" }

    mockRepository.findOneBy.mockResolvedValue(user)
    const result = userRepository.findByEmail('abc@gmail.com')

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: 'abc@gmail.com' })
    expect(result).resolves.toEqual(user)
})

test("should create a new user", () => {
    const userData = { email: "xyz@gmail.com", password: "12345678" } as Partial<User>
    const user = { id: "1", ...userData } as User

    mockRepository.create.mockReturnValue(user)
    mockRepository.save.mockResolvedValue(user)

    const result = userRepository.create(userData)

    expect(mockRepository.create).toHaveBeenCalledWith(userData)
    expect(mockRepository.save).toHaveBeenCalledWith(user)
    expect(result).resolves.toEqual(user)
})

test("should update existing user password for the given ID", () => {
    const userData = { password: "987654321" } as Partial<User>
    const user = { id: "1", ...userData } as User

    mockRepository.update.mockResolvedValue(user)

    userRepository.findById = jest.fn().mockResolvedValue(user)
    const result = userRepository.update("1", userData)

    expect(mockRepository.update).toHaveBeenCalledWith("1", userData)
    expect(result).resolves.toEqual(user)
})