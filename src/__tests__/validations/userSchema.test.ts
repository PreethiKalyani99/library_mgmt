import { userCreationSchema, userUpdateSchema, userIdSchema } from "../../validations/userSchema";

describe("Validation rules for creating a user", () => {
    it("should validate successfully with valid data", () => {
        const validData = { email: "abc@gmail.com", password: "password123" }
        const { error } = userCreationSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing email", () => {
        const invalidData = { password: "password123" }
        const { error } = userCreationSchema.validate(invalidData)

        expect(error?.message).toBe('"email" is required')
    })

    it("should fail validation with invalid email", () => {
        const invalidData = { email: "invalid email", password: "password123" }
        const { error } = userCreationSchema.validate(invalidData)

        expect(error?.message).toBe('"email" must be a valid email')
    })

    it("should not allow passwords shorter than 8 characters", () => {
        const invalidData = { email: "abc@gmail.com", password: "12345" }
        const { error } = userCreationSchema.validate(invalidData)

        expect(error?.message).toBe('"password" length must be at least 8 characters long')
    })
})

describe("Validation rules for updating a user", () => {
    it("should validate successfully with valid data", () => {
        const validData = { password: "newpassword123" }
        const { error } = userUpdateSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with missing password", () => {
        const invalidData = { }
        const { error } = userUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Password is required')
    })

    it("should not allow passwords shorter than 8 characters", () => {
        const invalidData = { password: "12345" }
        const { error } = userUpdateSchema.validate(invalidData)

        expect(error?.message).toBe('Password length must be at least 8 characters long')
    })
})

describe("Validation rules for user ID", () => {
    it("should validate successfully with valid UUID", () => {
        const validData = { id: "7147e555-8d71-4637-8400-7a86fe7a01f0" }
        const { error } = userIdSchema.validate(validData)

        expect(error).toBeUndefined()
    })

    it("should fail validation with invalid UUID", () => {
        const invalidData = { id: "1" }
        const { error } = userIdSchema.validate(invalidData)

        expect(error?.message).toBe('User ID must be a valid UUID')
    })
})