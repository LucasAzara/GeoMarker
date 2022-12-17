import { createContext, ReactNode, useEffect, useState } from 'react'
// Id generator
import { v4 as uuidv4 } from 'uuid'
// Firebase (DB)
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

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
  handleAddMapData: (vote: IMap) => void
}

export const FormContext = createContext({} as IMapContext)

export function FormData({ children }: IFormData) {
  const [mapData, setMapData] = useState<IMapData[]>([])

  // Update State
  const handleAddMapData = (vote: IMap) => {
    // Does it already exist?
    const findVote = mapData.find(
      (map) => map.companyName === vote.companyName.toUpperCase(),
    )

    // If it does, add to the vote
    if (findVote) {
      setMapData((mapData) =>
        mapData.map((data) => {
          if (data.companyName === vote.companyName.toUpperCase())
            return { ...data, vote: data.vote + 1 }
          return data
        }),
      )
    } else {
      // Else, put new vote into array

      setMapData((mapData) => {
        return [
          ...mapData,
          {
            companyName: vote.companyName.toUpperCase(),
            companyLat: vote.companyLat,
            companyLong: vote.companyLong,
            id: uuidv4(),
            vote: 1,
          },
        ]
      })
    }
  }

  // Fetch Database
  const fetchPost = async () => {
    try {
      await getDocs(collection(db, 'votes')).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }))

        const newMapData: IMapData[] = newData[0].votes.map(
          (votes: IMapData) => {
            return {
              id: votes.id,
              companyName: votes.companyName,
              companyLat: votes.companyLat,
              companyLong: votes.companyLong,
              vote: votes.vote,
            }
          },
        )

        setMapData(newMapData)
      })
    } catch (error) {
      console.log('Error getting firebase data:', error)
    }
  }

  // Load on start
  useEffect(() => {
    fetchPost()
  }, [])

  useEffect(() => {
    if (mapData.length !== 0) {
      // Update Database
      const updateFirebase = async () => {
        try {
          const docRef = await addDoc(collection(db, 'votes'), {
            votes: mapData,
          })
          console.log('Document written with ID: ', docRef.id)
        } catch (e) {
          console.error('Error adding document: ', e)
        }
      }
    }
  }, [mapData])

  return (
    <FormContext.Provider value={{ mapData, handleAddMapData }}>
      {children}
    </FormContext.Provider>
  )
}
