import { faker } from '@faker-js/faker'
import { Card } from '@faker-js/faker/helpers'
import { useEffect, useState } from 'react'

export type PersonCard = {
  name: string
  email: string
  phone: string
  city: string
  company: string
  username: string
  website: string
}

export function useFetchPeople(): PersonCard[] | null {
  const [people, setPeople] = useState<PersonCard[] | null>(null)

  useEffect(function () {
    window.setTimeout(function () {
      const people = new Array(200)
        .fill(1)
        .map(() => faker.helpers.createCard())
        .map(function flattenCard({
          name,
          email,
          phone,
          username,
          website,
          ...card
        }: Card): PersonCard {
          return {
            name,
            email,
            phone,
            username,
            website,
            company: card.company.name,
            city: card.address.city,
          }
        })
      setPeople(people)
    }, 0)
  }, [])

  return people
}
