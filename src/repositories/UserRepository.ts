import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

export class UserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async findAll(): Promise<User[]> {
        return this.repository
        .createQueryBuilder('user')
        .select(['user.id', 'user.email'])
        .getMany()
    }

    async findById(id: string): Promise<User | null> {
        return this.repository
        .createQueryBuilder('user')
        .select(['user.id', 'user.email'])
        .where('user.id = :id', { id })
        .getOne()
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email })
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData)
        return this.repository.save(user)
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        await this.repository.update(id, userData)
        return this.findById(id)
    }
}