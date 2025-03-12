const multer = require("multer");
const upload = require("../../utils/upload");

describe("Upload Utility Tests", () => {
  it("should accept image files", () => {
    const file = { mimetype: "image/jpeg" };
    const cb = jest.fn();
    upload.fileFilter(null, file, cb);
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it("should reject non-image files", () => {
    const file = { mimetype: "application/pdf" };
    const cb = jest.fn();
    upload.fileFilter(null, file, cb);
    expect(cb).toHaveBeenCalledWith(new Error("Only image files are allowed!"), false);
  });

  // Add more tests for file size limits, storage, etc.
});