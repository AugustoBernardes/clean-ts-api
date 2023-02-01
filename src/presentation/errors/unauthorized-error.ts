export class UnauthorizedError extends Error {
  constructor (stack?: string | undefined) {
    super('Unauthorized')
    this.name = 'Unauthorized'
  }
}
