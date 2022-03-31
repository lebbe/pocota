import faker from '@faker-js/faker'
import { Transaction } from '@faker-js/faker/helpers'
import { useEffect, useRef, useState } from 'react'

function dummyResolver(n: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, n)
  })
}

async function getMoreTransactions() {
  await dummyResolver(Math.random() * 100 + 100)
  return new Array(20).fill(0).map((_) => faker.helpers.createTransaction())
}

export function useInfiniteScroll() {
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const loadMoreRef = useRef<HTMLButtonElement | null>(null)

  async function fill() {
    setIsLoading(true)
    const more = await getMoreTransactions()
    setTransactions([...transactions, ...more])
    setIsLoading(false)
  }

  useEffect(
    function () {
      if (loadMoreRef.current === null) return
      loadMoreRef.current.addEventListener('visible', fill)
      return function () {
        loadMoreRef.current?.removeEventListener('visible', fill)
      }
    },
    [fill]
  )

  useEffect(function () {
    if (loadMoreRef.current === null) return

    function callback(entries: any) {
      entries.forEach(function (entry: any) {
        if (entry.isIntersecting && entry.intersectionRatio >= 1) {
          loadMoreRef.current?.dispatchEvent(new CustomEvent('visible'))
        }
      })
    }
    let observer = new IntersectionObserver(callback, {
      root: document,
      rootMargin: '0px',
      threshold: 1.0,
    })

    observer.observe(loadMoreRef.current)

    return function () {
      if (loadMoreRef.current === null) return

      observer.unobserve(loadMoreRef.current)
    }
  }, [])

  return {
    transactions,
    loadMoreRef,
    fill,
    isLoading,
  }
}
