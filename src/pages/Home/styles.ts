import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 16px;

  padding: 2rem;

  min-height: 65vh;
`

export const FormIntro = styled.div`
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 16px;

    width: 80%;
  }
`

export const IntroButton = styled.button`
  background-color: transparent;
  border: unset;
  color: ${(props) => props.theme['gray-100']};
  cursor: pointer;
  transition: color 0.1s;

  &:hover {
    color: ${(props) => props.theme['green-300']};
  }
`
