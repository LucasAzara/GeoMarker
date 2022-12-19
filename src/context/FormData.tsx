import { createContext, ReactNode, useEffect, useState } from 'react'
// Id generator
import { v4 as uuidv4 } from 'uuid'
// Firebase (DB)
import {
  setDoc,
  doc,
  increment,
  collection,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db, table } from '../firebase'
// Interfaces
import {
  IMapData,
  IMap,
  IMapContext,
  updateFirebase,
  addFireBase,
} from './Actions/Actions'

interface IFormData {
  children: ReactNode
}

// Context
export const FormContext = createContext({} as IMapContext)

// -------------------------------------------------------------------------------

export function FormData({ children }: IFormData) {
  // States

  // Map
  const [mapData, setMapData] = useState<IMapData[]>([])
  // Loaded data from DB
  const [loadState, setLoadState] = useState<boolean | undefined>(undefined)

  // Functions

  // Update State & DB
  const handleAddMapData = async (vote: IMap) => {
    // Does it already exist?
    const findVote = mapData.find(
      (map) => map.companyName === vote.companyName.toUpperCase(),
    )

    // If it does, add to the vote
    if (findVote) {
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

  // loadState Reset
  const handleSetLoadState = () => {
    setLoadState(undefined)
  }

  // Fetch DB
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
      setLoadState(false)
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
