import { createContext, ReactNode, useEffect, useState } from 'react'
// Id generator
import { v4 as uuidv4 } from 'uuid'
// Firebase (DB)
import {
  setDoc,
  getDoc,
  doc,
  increment,
  collection,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db, table } from '../firebase'

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
  const updateFirebase = async (data: IMapData) => {
    // Increment by 1 point
    await updateDoc(doc(db, table, data.companyName), {
      vote: increment(1),
    })
  }

  const addFireBase = async (data: IMapData) => {
    // Add to Votes
    await setDoc(doc(db, table, data.companyName), {
      companyLat: data.companyLat,
      companyLong: data.companyLong,
      companyName: data.companyName,
      id: data.id,
      vote: data.vote,
    })
  }

  // Update State
  const handleAddMapData = async (vote: IMap) => {
    // Does it already exist?
    const findVote = mapData.find(
      (map) => map.companyName === vote.companyName.toUpperCase(),
    )

    // If it does, add to the vote
    if (findVote) {
      console.log(findVote)
      await updateFirebase(findVote)
      setMapData((mapData) =>
        mapData.map((data) => {
          if (data.companyName === vote.companyName.toUpperCase())
            return { ...data, vote: data.vote + 1 }
          return data
        }),
      )
    } else {
      // Else, put new vote into array

      const newData = {
        companyName: vote.companyName.toUpperCase(),
        companyLat: vote.companyLat,
        companyLong: vote.companyLong,
        id: uuidv4(),
        vote: 1,
      }

      await addFireBase(newData)
      setMapData((mapData) => [...mapData, newData])
    }
  }

  const handleSetLoadState = () => {
    setLoadState(undefined)
  }

  // Fetch Database
  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, table))
      const newMapData = querySnapshot.docs.map((query) => {
        return {
          companyLat: query.data().companyLat,
          companyLong: query.data().companyLong,
          companyName: query.data().companyName,
          id: query.data().id,
          vote: query.data().vote,
        }
      })
      setMapData(newMapData)
    } catch (error) {
      console.error(error)
    }
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
