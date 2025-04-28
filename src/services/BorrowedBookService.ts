import { BorrowedBook } from "../entities/BorrowedBook";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { BorrowedBookRepository } from "../repositories/BorrowedBookRepository";
import { UserRepository } from "../repositories/UserRepository";
import { BookRepository } from "../repositories/BookRepository";

interface UserDataType {
    id: string
    email: string
}

interface BookDataType {
    id: string
    title: string
}

export class BorrowedBookService {
    private borrowedBookRepository: BorrowedBookRepository
    private userRepository: UserRepository
    private bookRepository: BookRepository

    constructor(borrowedBookRepository?: BorrowedBookRepository, userRepository?: UserRepository, bookRepository?: BookRepository) {
        this.borrowedBookRepository =  borrowedBookRepository ?? new BorrowedBookRepository()
        this.userRepository = userRepository ?? new UserRepository()
        this.bookRepository = bookRepository ?? new BookRepository()
    }

    async getAllBorrowedBooks(): Promise<BorrowedBook[]> {
        return this.borrowedBookRepository.findAll()
    }

    async getBorrowedBookById(id: string): Promise<BorrowedBook | null> {
        return this.borrowedBookRepository.findById(id)
    }

    async findUserBy({ email, id }: UserDataType): Promise<User | null> {
        if (id) {
            return this.userRepository.findById(id)
        }
        return this.userRepository.findByEmail(email)
    }

    async findBookBy({ title, id }: BookDataType): Promise<Book | null> {
        if(id) {
            return this.bookRepository.findById(id)
        }
        return this.bookRepository.findByTitle(title)
    }

    async createBorrowedBook(borrowedBookData: BorrowedBook): Promise<BorrowedBook | null> {
        const user = await this.findUserBy({ id: borrowedBookData.user.id, email: borrowedBookData.user.email })

        if (!user) {
            throw new Error(`User does not exist`)
        }

        const book = await this.findBookBy({ id: borrowedBookData.book.id, title: borrowedBookData.book.title })

        if(!book){
            throw new Error(`Book does not exist`)
        }

        borrowedBookData.user = user
        borrowedBookData.book = book

        return this.borrowedBookRepository.create(borrowedBookData)
    }

    async updateBorrowedBook(id: string, returnDate: Date): Promise<BorrowedBook | null> {
        const borrowedBook = await this.borrowedBookRepository.findById(id)
        if (!borrowedBook) {
            throw new Error('Borrowed book not found')
        }
        if(borrowedBook.borrow_date > returnDate) {
            throw new Error('Return date cannot be earlier than borrow date')   
        }
        
        borrowedBook.return_date = returnDate
        return this.borrowedBookRepository.update(id, borrowedBook)
    }
} 
