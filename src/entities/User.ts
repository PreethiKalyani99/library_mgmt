import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Borrower } from './Borrower'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => Borrower, (borrower) => borrower.user)
    borrowers: Borrower[]
}