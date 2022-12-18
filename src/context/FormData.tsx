import { createContext, ReactNode, useEffect, useState } from 'react'
// Id generator
import { v4 as uuidv4 } from 'uuid'
// Firebase (DB)
import { setDoc, getDoc } from 'firebase/firestore'
import { db, docRef } from '../firebase'

interface IFormData {
  children: ReactNode
}

export interface IMap {
  companyName: string
  companyLat: number | undefined
  companyLong: number | undefined
}

export interface IMapData extends IMap {
  id: string
  vote: number
}

export interface IMapContext {
  mapData: IMapData[]
  loadState: boolean | undefined
  handleAddMapData: (vote: IMap) => Promise<void>
  handleSetLoadState: () => void
}

export const FormContext = createContext({} as IMapContext)

export function FormData({ children }: IFormData) {
  const [mapData, setMapData] = useState<IMapData[]>([])
  const [loadState, setLoadState] = useState<boolean | undefined>(undefined)

  // Update Database
  const updateFirebase = async (newMapData: IMapData[]) => {
    await setDoc(docRef, { votes: newMapData })
  }

  // Update State
  const handleAddMapData = async (vote: IMap) => {
    // Does it already exist?
    const findVote = mapData.find(
      (map) => map.companyName === vote.companyName.toUpperCase(),
    )

    // If it does, add to the vote
    if (findVote) {
      const newMapData = mapData.map((data) => {
        if (data.companyName === vote.companyName.toUpperCase())
          return { ...data, vote: data.vote + 1 }
        return data
      })

      await updateFirebase(newMapData)
      setMapData(newMapData)
    } else {
      // Else, put new vote into array

      const newMapData = [
        ...mapData,
        {
          companyName: vote.companyName.toUpperCase(),
          companyLat: vote.companyLat,
          companyLong: vote.companyLong,
          id: uuidv4(),
          vote: 1,
        },
      ]

      await updateFirebase(newMapData)
      setMapData(newMapData)
    }
  }

  const handleSetLoadState = () => {
    setLoadState(undefined)
  }

  // Fetch Database
  const fetchPost = async () => {
    await getDoc(docRef)
      .then((docRef) => {
        const newData = docRef.data()

        const newMapData: IMapData[] = newData!.votes.map((votes: IMapData) => {
          return {
            id: votes.id,
            companyName: votes.companyName,
            companyLat: votes.companyLat,
            companyLong: votes.companyLong,
            vote: votes.vote,
          }
        })

        setMapData(newMapData)
        setLoadState(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Load on start
  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <FormContext.Provider
      value={{ mapData, loadState, handleAddMapData, handleSetLoadState }}
    >
      {children}
    </FormContext.Provider>
  )
}
