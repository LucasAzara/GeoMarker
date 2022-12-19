import styled from 'styled-components'

export const LayoutBody = styled.div`
  background-color: ${(props) => props.theme['gray-700']};

  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 100vh;
  max-width: 76rem;
  padding: 0 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`
export const LayoutContainer = styled.div`
  background-color: ${(props) => props.theme['gray-500']};

  border-radius: 16px;
  min-height: 80vh;
  padding: 2rem;
`
