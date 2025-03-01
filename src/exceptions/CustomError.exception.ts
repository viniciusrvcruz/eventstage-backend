export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}