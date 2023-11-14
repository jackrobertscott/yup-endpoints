import { createYupEndpoint, fileDataSchema } from "."

describe("fileDataSchema", () => {
  it("validates valid file data", async () => {
    const validFileData = {
      body: Buffer.from("some data"),
      fileName: "test.txt",
      encoding: "utf-8",
      mimeType: "text/plain",
    }
    await expect(fileDataSchema.validate(validFileData)).resolves.toEqual(
      validFileData
    )
  })

  it("rejects invalid file data", async () => {
    const invalidFileData = {
      body: "not a buffer", // should be a Buffer
      fileName: 123, // should be a string
      encoding: "utf-8",
      mimeType: "text/plain",
    }
    await expect(fileDataSchema.validate(invalidFileData)).rejects.toThrow()
  })
})

describe("createYupEndpoint", () => {
  it("returns the same data it receives", () => {
    const mockEndpoint = createYupEndpoint({
      path: "/test",
      handler: jest.fn().mockImplementation(async () => {}),
    })
    const result = createYupEndpoint(mockEndpoint)
    expect(result).toEqual(mockEndpoint)
  })
})
