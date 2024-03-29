import styled from 'styled-components'

export const TableContainer = styled.div`
  div {
    padding: 1rem 0rem;
  }

  li {
    padding: 1rem;
  }

  div,
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid ${(props) => props.theme['gray-100']};
  }

  &,
  ul {
    display: flex;
    flex-direction: column;
    max-height: 35vh;
    overflow: auto;

    li:nth-child(even) {
      background-color: ${(props) => props.theme['gray-700']};
      p{
        color: ${(props) => props.theme['green-300']};
        font-weight: 700;
      }
    }
  }

  @media (max-width: 768px) {
    div {
      padding: 0.5rem 0rem;
    }

    li {
      padding: 0.5rem;
    }
  }
`
