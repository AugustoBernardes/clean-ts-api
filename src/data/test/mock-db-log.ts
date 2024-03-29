import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepositoryStub {
    async logError (stack: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}
