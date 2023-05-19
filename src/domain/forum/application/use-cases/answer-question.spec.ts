import { AnswerQuestionUseCase } from './answer-question'
import { AnswerInMemoryRepository } from 'test/repositories/answer-inMemory-repository'

let answerQuestionUseCase: AnswerQuestionUseCase

let sut: AnswerInMemoryRepository

describe('suit teste of answer', () => {
  beforeEach(() => {
    sut = new AnswerInMemoryRepository()
    answerQuestionUseCase = new AnswerQuestionUseCase(sut)
  })

  it('create an answer', async () => {
    const answer = await answerQuestionUseCase.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
