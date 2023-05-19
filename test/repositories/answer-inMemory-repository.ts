import { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class AnswerInMemoryRepository implements AnswersRepository {
  answer: Answer[]

  constructor() {
    this.answer = []
  }

  async save(answer: Answer): Promise<void> {
    const index = this.answer.findIndex(
      (item) => answer.id.toString() === item.id.toString(),
    )

    this.answer[index] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answer.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )

    this.answer.splice(index, 1)
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.answer.find((item) => item.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer): Promise<void> {
    this.answer.push(answer)
  }
}
