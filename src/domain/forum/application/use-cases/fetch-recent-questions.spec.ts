import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'
import { makeQuestion } from 'test/factories/make-create-quesiton'
import { FetchRecentQuestionCase } from './fetch-recent-questions'

let fetchRecentQuestionCase: FetchRecentQuestionCase

let sut: QuestionInMemoryRepository

describe('suit tests for find recent questions created', async () => {
  beforeEach(() => {
    sut = new QuestionInMemoryRepository()
    fetchRecentQuestionCase = new FetchRecentQuestionCase(sut)
  })

  it('delete an question with same author', async () => {
    await sut.create(makeQuestion({ createdAt: new Date(2023, 4, 19) }))
    await sut.create(makeQuestion({ createdAt: new Date(2023, 4, 15) }))
    await sut.create(makeQuestion({ createdAt: new Date(2023, 4, 18) }))

    const { questions } = await fetchRecentQuestionCase.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 4, 19),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 4, 18),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 4, 15),
      }),
    ])
  })
})
