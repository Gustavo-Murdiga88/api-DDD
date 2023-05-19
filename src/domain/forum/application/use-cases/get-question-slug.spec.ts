import { QuestionInMemoryRepository } from 'test/repositories/question-inMemory-repository copy'
import { GetQuestionBySlugCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-create-quesiton'

let getQuestionBySlugUseCase: GetQuestionBySlugCase

let sut: QuestionInMemoryRepository

describe('suit tests of questions per slugs', async () => {
  beforeEach(() => {
    sut = new QuestionInMemoryRepository()
    getQuestionBySlugUseCase = new GetQuestionBySlugCase(sut)
  })

  it('get question by slug', async () => {
    const newQuestion = makeQuestion()

    await sut.create(newQuestion)

    const { question } = await getQuestionBySlugUseCase.execute({
      slug: newQuestion.slug.value,
    })

    expect(question?.slug.value).toEqual(question.slug.value)
  })
})
