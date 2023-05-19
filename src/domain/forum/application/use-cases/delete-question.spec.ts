import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'
import { makeQuestion } from 'test/factories/make-create-quesiton'
import { DeleteQuestionUseCase } from './delete-question'

let deleteQuestionUseCase: DeleteQuestionUseCase

let sut: QuestionInMemoryRepository

describe('suit tests for delete questions', async () => {
  beforeEach(() => {
    sut = new QuestionInMemoryRepository()
    deleteQuestionUseCase = new DeleteQuestionUseCase(sut)
  })

  it('delete an question with same author', async () => {
    const newQuestion = makeQuestion()

    await sut.create(newQuestion)

    await deleteQuestionUseCase.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    })

    expect(sut.questions.length).toEqual(0)
  })

  it('delete question with another author id', async () => {
    const newQuestion = makeQuestion()

    await sut.create(newQuestion)

    await expect(() =>
      deleteQuestionUseCase.execute({
        authorId: 'another-author-id',
        questionId: newQuestion.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
