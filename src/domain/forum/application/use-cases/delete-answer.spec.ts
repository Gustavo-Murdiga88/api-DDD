import { DeleteAnswerUseCase } from './delete-answer'
import { AnswerInMemoryRepository } from 'test/repositories/answer-inMemory-repository'
import { makeAnswer } from 'test/factories/make-create-answer'

let deleteAnswerUseCase: DeleteAnswerUseCase

let sut: AnswerInMemoryRepository

describe('suit tests for delete answer', async () => {
  beforeEach(() => {
    sut = new AnswerInMemoryRepository()
    deleteAnswerUseCase = new DeleteAnswerUseCase(sut)
  })

  it('delete an question with same author', async () => {
    const newAnswer = makeAnswer()

    await sut.create(newAnswer)

    await deleteAnswerUseCase.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(sut.answer.length).toEqual(0)
  })

  it('delete question with another author id', async () => {
    const newAnswer = makeAnswer()

    await sut.create(newAnswer)

    await expect(() =>
      deleteAnswerUseCase.execute({
        authorId: 'another-author-id',
        answerId: newAnswer.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
