import { UniqueEntityId } from '@/core/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

import { faker } from '@faker-js/faker'

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityId,
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityId('authorId'),
      content: override?.content ?? faker.lorem.text(),
      questionId: override?.questionId ?? new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return question
}
