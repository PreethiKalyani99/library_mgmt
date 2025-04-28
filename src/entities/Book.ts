import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { BorrowedBook } from './BorrowedBook'
import { Author } from './Author'

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ name: 'publication_year' })
  publicationYear: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date 

  @OneToMany(() => BorrowedBook, (borrowed_book) => borrowed_book.book)
  borrowedBooks: BorrowedBook[]

  @ManyToOne(() => Author, (author) => author.books, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'author_id' })
  author: Author
} 