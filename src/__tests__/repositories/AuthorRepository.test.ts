import { AuthorRepository } from "../../repositories/AuthorRepository";
import { Author } from "../../entities/Author";

const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    createQueryBuilder: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOne: jest.fn(),
    where: jest.fn()
}

jest.mock("../../config/database", () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockRepository),
    }
}))

let authorRepository: AuthorRepository

beforeEach(() => {
    authorRepository = new AuthorRepository()
})

afterEach(() => {
    jest.clearAllMocks()
})

test("should return all authors", () => {
    const authors = [{ id: "1", name: "Author 1" }, { id: "2", name: "Author 2" }] as Author[]
    mockRepository.find.mockResolvedValue(authors)

    const result = authorRepository.findAll()

    expect(mockRepository.find).toHaveBeenCalled()
    expect(result).resolves.toEqual(authors)
})

test("should return author details for a given ID", () => {
    const author = { id: "1", name: "Author 1" } as Author
    mockRepository.findOneBy.mockResolvedValue(author)

    const result = authorRepository.findById("1")

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: "1" })
    expect(result).resolves.toEqual(author)
})

test("should return an author by the given name", () => {
    const author = { id: "1", name: "Author 1" } as Author
    mockRepository.createQueryBuilder.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(author),
    })

    const result = authorRepository.findByName("Author 1")

    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('author')
    expect(result).resolves.toEqual(author)
})

test("should create a new author", () => {
    const authorData = { name: "Author 1" } as Partial<Author>
    const author = { id: "1", ...authorData } as Author

    mockRepository.create.mockReturnValue(author)
    mockRepository.save.mockResolvedValue(author)

    const result = authorRepository.create(authorData)

    expect(mockRepository.create).toHaveBeenCalledWith(authorData)
    expect(mockRepository.save).toHaveBeenCalledWith(author)
    expect(result).resolves.toEqual(author)
})

test("should update existing author details", () => {
    const authorData = { name: "Updated Author" } as Partial<Author>
    const author = { id: "1", ...authorData } as Author

    mockRepository.update.mockResolvedValue(author)
    authorRepository.findById = jest.fn().mockResolvedValue(author)

    const result = authorRepository.update("1", authorData)

    expect(mockRepository.update).toHaveBeenCalledWith("1", authorData)
    expect(result).resolves.toEqual(author)
})

test("should successfully delete an existing author", () => {
    const authorId = "1"

    authorRepository.delete(authorId)

    expect(mockRepository.delete).toHaveBeenCalledWith(authorId)
})