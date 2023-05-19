import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answer-repository'
import { QuestionRepository } from '../repositories/question-repository'

interface ChooseBetterAnswerRequest {
  questionId: string
  authorId: string
  id: string
}

interface ChooseBetterAnswerResponse {
  question: Question
}

export class ChooseBetterAnswerUseCase {
  private answerRepository: AnswersRepository
  private questionRepository: QuestionRepository

  constructor(
    answerRepository: AnswersRepository,
    question: QuestionRepository,
  ) {
    this.answerRepository = answerRepository
    this.questionRepository = question
  }

  async execute({
    authorId,
    questionId,
    id,
  }: ChooseBetterAnswerRequest): Promise<ChooseBetterAnswerResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found!')
    }

    const answer = await this.answerRepository.findById(id)

    if (!answer) {
      throw new Error('answer is not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('user is not authorized to update answer')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
