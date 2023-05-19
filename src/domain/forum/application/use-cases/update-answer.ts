import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface UpdateAnswerUseCaseRequest {
  content: string
  authorId: string
  id: string
}

interface UpdateAnswerUseCaseResponse {
  answer: Answer
}

export class UpdateAnswerUseCase {
  private answerRepository: AnswersRepository

  constructor(answerRepository: AnswersRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    authorId,
    content,
    id,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(id)

    if (!answer) {
      throw new Error('answer is not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('user is not authorized to update answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
