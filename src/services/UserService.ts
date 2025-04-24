import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

interface UserCreationValidation {
    email: string
    password: string
}

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll()
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id)
    }

    async validateUserCreation({ email, password }: Partial<UserCreationValidation>): Promise<User | null> {
        if (!email) {
            throw new Error('User email is required')
        }
        if (!password) {
            throw new Error('User password is required')
        }
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long')
        }

        const user = await this.userRepository.findByEmail(email)
        return user
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = await this.validateUserCreation({ email: userData.email, password: userData.password})

        if (user) {
            throw new Error('User with this email already exists')
        }

        return this.userRepository.create(userData)
    }
}