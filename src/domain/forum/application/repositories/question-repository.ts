import { PaginationParams } from '@/core/repositories/repostories-pagination'
import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  create(answer: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | undefined>
  findById: (id: string) => Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findManyQuestions(params: PaginationParams): Promise<Question[]>
}
