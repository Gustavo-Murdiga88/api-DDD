import { Entity } from '@/core/entity'
import { UniqueEntityId } from '@/core/unique-entity-id'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const question = new Student(
      {
        ...props,
      },
      id,
    )

    return question
  }
}
