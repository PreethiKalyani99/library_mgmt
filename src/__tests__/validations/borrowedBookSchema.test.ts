import { borrowedBookCreationSchema, borrowedBookUpdateSchema, borrowedBookIdSchema } from "../../validations/borrowedBookSchema";

describe("Validation rules for creating a borrowed book", () => {
    it("should validate successfully with valid data", () => {
        const validData = { book: { title: "Atomic Habits"}, user: { email: "abc@gmail.com" },  borrowDate: new Date("2023-10-01") }
        const { error } = borrowedBookCreationSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing user", () => {
        const invalidData = { book: { title: "Atomic Habits"}, borrowDate: new Date("2025-10-01") }
        const { error } = borrowedBookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Either User ID or Email is required')
    })

    it("should fail validation with missing book", () => {
        const invalidData = { user: { email: "abc@gmail.com" }, borrowDate: new Date("2025-10-01") }
        const { error } = borrowedBookCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Either Book ID or Title is required')
    })
})

describe("Validation rules for updating a borrowed book", () => {
    it("should validate successfully with valid data", () => {
        const validData = { returnDate: new Date("2023-10-01") }
        const { error } = borrowedBookUpdateSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing return date", () => {
        const invalidData = { }
        const { error } = borrowedBookUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Return date is required')
    })

    it("should return an error when unexpected fields are provided", () => {
        const invalidData = { returnDate: new Date("2025-10-01"), borrowDate: new Date("2025-10-01") }
        const { error } = borrowedBookUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('"borrowDate" is not allowed')
    })
})

describe("Validation rules for borrowed book ID", () => {
    it("should validate successfully with valid UUID", () => {
        const validData = { id: "7147e555-8d71-4637-8400-7a86fe7a01f0" }
        const { error } = borrowedBookIdSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with invalid UUID", () => {
        const invalidData = { id: "1" }
        const { error } = borrowedBookIdSchema.validate(invalidData)

        expect(error?.message).toBe('Borrowed Book ID must be a valid UUID')
    })
})