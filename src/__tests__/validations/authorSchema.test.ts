import { authorCreationSchema, authorUpdateSchema, authorIdSchema } from "../../validations/authorSchema";

describe("Validation rules for creating an author", () => {
    it("should validate successfully with valid data", () => {
        const validData = { name: "James Clear", country: "USA" }
        const { error } = authorCreationSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing name", () => {
        const invalidData = { country: "USA" }
        const { error } = authorCreationSchema.validate(invalidData)

        expect(error?.message).toBe('Author name is required')
    })
})

describe("Validation rules for updating an author", () => {
    it("should validate successfully with valid data", () => {
        const validData = { name: "James Clear", country: "USA" }
        const { error } = authorUpdateSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation if both name and country are missing", () => {
        const invalidData = { }
        const { error } = authorUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Either name or country is required')
    })
})

describe("Validation rules for author ID", () => {
    it("should validate successfully with valid UUID", () => {
        const validData = { id: "7147e555-8d71-4637-8400-7a86fe7a01f0" }
        const { error } = authorIdSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with invalid UUID", () => {
        const invalidData = { id: "1" }
        const { error } = authorIdSchema.validate(invalidData)

        expect(error?.message).toBe('Author ID must be a valid UUID')
    })
})