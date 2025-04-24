import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Book } from './Book'
import { User } from './User'

@Entity('borrowed_books')
export class BorrowedBook {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'date' })
    borrow_date: Date

    @Column({ type: 'date', nullable: true })
    return_date: Date

    @DeleteDateColumn({ type: 'date', nullable: true })
    deleted_at: Date

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => Book, (book) => book.borrowedBooks)
    @JoinColumn({ name: "book_id" })
    book: Book

    @ManyToOne(() => User, (user) => user.borrowedBooks)
    @JoinColumn({ name: "user_id" })
    user: User
}