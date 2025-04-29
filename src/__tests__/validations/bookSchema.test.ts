import { bookCreationSchema, bookUpdateSchema, bookIdSchema } from "../../validations/bookSchema";

describe("Validation rules for creating a book", () => {
    it("should validate successfully with valid data", () => {
        const validData = { title: "Atomic Habits", publicationYear: 2018, author: { name: "James Clear", country: "USA" }, price: 19.99, description: "A great book on habits" }
        const { error } = bookCreationSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing title", () => {
        const invalidData = { publicationYear: 2018, author: { name: "James Clear", country: "USA" }, price: 19.99, description: "A great book on habits" }
        const { error } = bookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Title is required')
    })

    it("should fail validation with invalid price", () => {
        const invalidData = { title: "Atomic Habits", publicationYear: 2018, author: { name: "James Clear", country: "USA" }, price: -19.99, description: "A great book on habits" }
        const { error } = bookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Price must be a positive number with up to 2 decimal places')
    })

    it("should fail validation with missing author", () => {
        const invalidData = { title: "Atomic Habits", publicationYear: 2018, price: 19.99, description: "A great book on habits" }
        const { error } = bookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Either author name or ID is required')
    })

    it("should fail validation with invalid publication year", () => {
        const invalidData = { title: "Atomic Habits", publicationYear: 1800, author: { name: "James Clear", country: "USA" }, price: 19.99, description: "A great book on habits" }
        const { error } = bookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Publication year must be a valid year (greater than or equal to 1900)')
    })
})

describe("Validation rules for updating a book", () => {
    it("should validate successfully with valid data", () => {
        const validData = { title: "Atomic Habits", author: { name: "James Clear" }}
        const { error } = bookUpdateSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with invalid price", () => {
        const invalidData = { price: -19.99 }
        const { error } = bookUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Price must be a positive number with up to 2 decimal places')
    })

    it("should fail validation with invalid publication year", () => {
        const invalidData = { publicationYear: 2026 }
        const { error } = bookUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Publication year cannot be in the future')
    })
})

describe("Validation rules for book ID", () => {
    it("should validate successfully with valid UUID", () => {
        const validData = { id: "7147e555-8d71-4637-8400-7a86fe7a01f0" }
        const { error } = bookIdSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with invalid UUID", () => {
        const invalidData = { id: "1" }
        const { error } = bookIdSchema.validate(invalidData)

        expect(error?.message).toBe('Book ID must be a valid UUID')
    })
})