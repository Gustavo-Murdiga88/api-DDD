import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'
import { makeQuestion } from 'test/factories/make-create-quesiton'
import { ChooseBetterAnswerUseCase } from './choose-better-answer'
import { AnswerInMemoryRepository } from 'test/repositories/answer-inMemory-repository'
import { makeAnswer } from 'test/factories/make-create-answer'
import { UniqueEntityId } from '@/core/unique-entity-id'

let chooseBetterAnswerUseCase: ChooseBetterAnswerUseCase

let questions: QuestionInMemoryRepository
let answers: AnswerInMemoryRepository
describe('suit tests of create a better answer for question', async () => {
  beforeEach(() => {
    questions = new QuestionInMemoryRepository()
    answers = new AnswerInMemoryRepository()

    chooseBetterAnswerUseCase = new ChooseBetterAnswerUseCase(
      answers,
      questions,
    )
  })

  it('create a new better answer for question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('created-for-test'))
    const newAnswer = makeAnswer({}, new UniqueEntityId('user-test'))

    questions.create(newQuestion)
    answers.create(newAnswer)

    const { question } = await chooseBetterAnswerUseCase.execute({
      authorId: newAnswer.authorId.toString(),
      questionId: newQuestion.id.toString(),
      id: newAnswer.id.toString(),
    })

    expect(question.bestAnswerId).toEqual(newAnswer.id)
  })
})
