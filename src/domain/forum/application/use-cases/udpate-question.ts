import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface UpdateQuestionCaseRequest {
  content: string
  title: string
  authorId: string
  id: string
}

interface UpdateQuestionCaseResponse {
  question: Question
}

export class UpdateQuestionCase {
  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    authorId,
    content,
    title,
    id,
  }: UpdateQuestionCaseRequest): Promise<UpdateQuestionCaseResponse> {
    const question = await this.questionRepository.findById(id)

    if (!question) {
      throw new Error('question is not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('user is not authorized to update question')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
