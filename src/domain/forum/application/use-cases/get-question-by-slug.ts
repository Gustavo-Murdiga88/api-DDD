import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface GetQuestionBySlugCaseRequest {
  slug: string
}

interface GetQuestionBySlugCaseResponse {
  question: Question
}

export class GetQuestionBySlugCase {
  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    slug,
  }: GetQuestionBySlugCaseRequest): Promise<GetQuestionBySlugCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('it is a not slug valid')
    }

    return {
      question,
    }
  }
}
