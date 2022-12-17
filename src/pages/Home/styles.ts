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

// Form

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 16px;
  width: 50%;
`

export const FormInput = styled.input`
  padding: 1rem;
  background-color: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme.white};
  border: unset;
  border-radius: 8px;

  &::placeholder {
    color: ${(props) => props.theme['gray-200']};
  }

  &#companyName {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  :focus {
    outline: 2px solid ${(props) => props.theme['green-300']};
  }

  /* Hide Step from input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`
export const FormSubmit = styled.button`
  grid-column-start: 1;
  grid-column-end: 3;

  background-color: ${(props) => props.theme['green-300']};
  border: unset;
  color: ${(props) => props.theme['gray-100']};
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
  }
`
