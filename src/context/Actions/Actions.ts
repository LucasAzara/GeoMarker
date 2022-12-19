// DB
import { doc, increment, setDoc, updateDoc } from 'firebase/firestore'
import { db, table } from '../../firebase'

// Interfaces
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

// Update DB
export const updateFirebase = async (data: IMapData) => {
  // Increment by 1 point
  await updateDoc(doc(db, table, data.companyName), {
    vote: increment(1),
  })
}

// Add to DB
export const addFireBase = async (data: IMapData) => {
  // Add to Votes
  await setDoc(doc(db, table, data.companyName), {
    companyLat: data.companyLat,
    companyLong: data.companyLong,
    companyName: data.companyName,
    id: data.id,
    vote: data.vote,
  })
}
