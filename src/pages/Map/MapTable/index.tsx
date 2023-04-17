// Context
import { useContext } from 'react'
import { FormContext} from '../../../context/FormData'
import { IMapData } from '../../../context/Actions/Actions'
// CSS
import { TableContainer } from './styles'

export function MapTable() {
  // Context
  const { mapData } = useContext(FormContext)

  // Order from Greatest to least number of votes
  const orderedVotes = mapData.sort(compare)

  return (
    <TableContainer>
      <div>
        <h1>Company</h1>
        <h1>Score</h1>
      </div>
      {/* List of all companies that were voted for */}
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

// Compare Function
function compare(a: IMapData, b: IMapData) {
  if (a.vote > b.vote) {
    return -1
  }
  if (a.vote < b.vote) {
    return 1
  }
  return 0
}
