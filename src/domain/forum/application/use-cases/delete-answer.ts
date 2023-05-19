import { AnswersRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  private answerRepository: AnswersRepository

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const question = await this.answerRepository.findById(answerId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId.toString()) {
      throw new Error('User not authorized to delete')
    }

    await this.answerRepository.delete(question)
  }
}
