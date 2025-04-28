import { hash } from "bcrypt"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
    private userRepository: UserRepository

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository ?? new UserRepository()
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll()
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id)
    }

    async createUser(userData: User): Promise<User> {
        const user = await this.userRepository.findByEmail(userData.email)

        if (user) {
            throw new Error('User with this email already exists')
        }

        userData.password = await hash(userData.password, 10)
        return this.userRepository.create(userData)
    }

    async updateUser(id: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findById(id)
        if (!user) {
            throw new Error('User not found')
        }

        user.password = await hash(password, 10)
        return this.userRepository.update(id, user)
    }
}