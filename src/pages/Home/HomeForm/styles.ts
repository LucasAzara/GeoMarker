import styled from 'styled-components'

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 16px;
  width: calc(50% - 16px);

  @media (max-width: 768px) {
    width: calc(100% - 8px);
    gap: 8px;
  }
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

  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 3;
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
