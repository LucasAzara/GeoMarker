// CSS
import { useContext } from 'react'
import { FormContext, IMapData } from '../../../context/FormData'
import { TableContainer } from './styles'

export function MapTable() {
  const { mapData } = useContext(FormContext)

  function compare(a: IMapData, b: IMapData) {
    if (a.vote > b.vote) {
      return -1
    }
    if (a.vote < b.vote) {
      return 1
    }
    return 0
  }

  const orderedVotes = mapData.sort(compare)

  return (
    <TableContainer>
      <div>
        <h1>Company</h1>
        <h1>Score</h1>
      </div>
      <ul>
        {orderedVotes.map((votes) => {
          return (
            <li key={votes.id}>
              <p>{votes.companyName}</p>
              <p>{votes.vote * 10}</p>
            </li>
          )
        })}
      </ul>
    </TableContainer>
  )
}
