import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'
import { makeQuestion } from 'test/factories/make-create-quesiton'
import { UpdateQuestionCase } from './udpate-question'

let updateQuestionUseCase: UpdateQuestionCase

let sut: QuestionInMemoryRepository

describe('suit tests of update question', async () => {
  beforeEach(() => {
    sut = new QuestionInMemoryRepository()
    updateQuestionUseCase = new UpdateQuestionCase(sut)
  })

  it('update question with same author', async () => {
    const newQuestion = makeQuestion()

    await sut.create(newQuestion)

    const { question } = await updateQuestionUseCase.execute({
      authorId: newQuestion.authorId.toString(),
      id: newQuestion.id.toValue(),
      content: 'it is an test',
      title: 'it is an test',
    })

    expect(question.title).toEqual('it is an test')
  })

  it('should be not able update question with another author', async () => {
    const newQuestion = makeQuestion()

    await sut.create(newQuestion)

    await expect(() =>
      updateQuestionUseCase.execute({
        authorId: 'another-id',
        id: newQuestion.id.toValue(),
        content: 'it is an test',
        title: 'it is an test',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
