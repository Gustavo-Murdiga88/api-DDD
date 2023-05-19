import { CreateQuestionUseCase } from './create-question'
import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'

let createQuestionUseCase: CreateQuestionUseCase

let sut: QuestionInMemoryRepository

describe('suit tests of questions', async () => {
  beforeEach(() => {
    sut = new QuestionInMemoryRepository()
    createQuestionUseCase = new CreateQuestionUseCase(sut)
  })

  it('create a question', async () => {
    const { question } = await createQuestionUseCase.execute({
      authorId: '1',
      content: '',
      title: 'teste',
    })
    expect(question.authorId).toBeTruthy()
  })
})
