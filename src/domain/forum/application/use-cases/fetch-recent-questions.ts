import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface FetchRecentQuestionCaseRequest {
  page: number
}

interface FetchRecentQuestionCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionCase {
  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    page,
  }: FetchRecentQuestionCaseRequest): Promise<FetchRecentQuestionCaseResponse> {
    const questions = await this.questionRepository.findManyQuestions({ page })

    return {
      questions,
    }
  }
}
