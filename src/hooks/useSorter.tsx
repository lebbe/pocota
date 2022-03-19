import { useEffect, useState } from 'react'

import React from 'react'

type SortButtonProps = {
  setSortBy: (by: string) => void
  field: string
  sortBy: string
  reversed: boolean
  arrowUp: JSX.Element
  arrowDown: JSX.Element
  arrowUpDown: JSX.Element
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export type ButtonType = (props: ButtonProps) => JSX.Element

function TheSortButton({
  setSortBy,
  field,
  sortBy,
  reversed,
  arrowUp,
  arrowDown,
  arrowUpDown,
  ...props
}: SortButtonProps) {
  function getArrow() {
    if (field !== sortBy) return arrowUpDown
    if (reversed) return arrowDown

    return arrowUp
  }
  return (
    <button {...props} onClick={() => setSortBy(field)}>
      {getArrow()}
    </button>
  )
}

/**
 * The useSorter takes an array of a typed object, and returns a sorted
 * version of this array, and a set of buttons that can be used to decide
 * which field shopuld be used for sorting the array (one button for each
 * field).
 *
 * It is important that the object must be "flat": No nested fields. I.e.
 * the type of all fields must be a string. (Typescript will give
 * warning).
 *
 * @param collection
 * @param options
 * @returns
 */
export function useSorter<E extends { [K in keyof E]: string }>(
  collection: E[],
  options: {
    defaultSortBy?: keyof E
    arrowUp?: JSX.Element
    arrowDown?: JSX.Element
    arrowUpDown?: JSX.Element
  }
): {
  sorted: E[] | null
  SortButton: { [K in keyof E]: ButtonType } | null
  isSorting: boolean
} {
  const [sortedCollection, setSortedCollection] = useState<E[] | null>(null)
  const [sortBy, setSortBy] = useState<keyof E | undefined>(
    options.defaultSortBy
  )
  const [reversed, setReversed] = useState(false)
  const [SortButton, setSortButton] =
    useState<{ [K in keyof E]: ButtonType } | null>(null)
  const [isSorting, setIsSorting] = useState(false)

  function getSortButtons(
    collection: E[]
  ): { [K in keyof E]: ButtonType } | null {
    if (collection === null) return null
    // @ts-expect-error
    const SortButton: { [K in keyof E]: ButtonType } = {}

    for (const key in collection[0]) {
      SortButton[key] = (props: ButtonProps) => (
        <TheSortButton
          {...props}
          field={key}
          reversed={reversed}
          setSortBy={(key) => {
            if (key === sortBy) {
              if (reversed) {
                setReversed(false)
                setSortBy(undefined)
              } else {
                setReversed(true)
              }
            } else {
              setReversed(false)
              setSortBy(key as keyof E)
            }
          }}
          sortBy={sortBy as string}
          arrowUp={
            options.arrowUp || <span className="material-icons">north</span>
          }
          arrowDown={
            options.arrowDown || <span className="material-icons">south</span>
          }
          arrowUpDown={
            options.arrowUpDown || (
              <span className="material-icons">import_export</span>
            )
          }
        />
      )
    }

    return SortButton as { [K in keyof E]: ButtonType }
  }

  useEffect(
    function () {
      if (!collection) return
      setIsSorting(true)
      window.setTimeout(function () {
        const newSorted = [...collection]
        if (sortBy) {
          newSorted.sort(
            (a, b) =>
              (reversed ? -1 : 1) * `${a[sortBy]}`.localeCompare(`${b[sortBy]}`)
          )
        }
        setSortButton(getSortButtons(newSorted))
        setSortedCollection(newSorted)
        setIsSorting(false)
      }, 0)
    },
    [collection, sortBy, reversed]
  )

  return {
    sorted: sortedCollection,
    SortButton,
    isSorting,
  }
}
