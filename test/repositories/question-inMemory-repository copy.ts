import { PaginationParams } from '@/core/repositories/repostories-pagination'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionInMemoryRepository implements QuestionRepository {
  questions: Question[]

  constructor() {
    this.questions = []
  }

  async findManyQuestions({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question): Promise<void> {
    const index = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.questions[index] = question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.questions.splice(index, 1)
  }

  async findBySlug(slug: string): Promise<Question | undefined> {
    const question = this.questions.find((item) => item.slug.value === slug)

    return question
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }
}
