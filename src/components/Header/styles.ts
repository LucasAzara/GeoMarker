import styled from 'styled-components'

const HeaderBase = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`

export const HeaderContainer = styled(HeaderBase)`
  justify-content: space-between;

  padding-bottom: 1rem;

  border-bottom: 1px solid ${(props) => props.theme['gray-300']};
`
export const Logo = styled(HeaderBase)`
  gap: 8px;

  svg {
    color: ${(props) => props.theme['green-500']};
    height: 4rem;
    width: 4rem;
  }

  h1 {
    color: ${(props) => props.theme['gray-100']};
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 425px) {
    h1 {
      display: none;
    }
  }
`

export const Tabs = styled(HeaderBase)`
  gap: 16px;

  svg {
    color: ${(props) => props.theme['gray-100']};
    height: 2.875rem;
    width: 2.875rem;
  }

  a {
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }

  a.active {
    svg {
      color: ${(props) => props.theme['green-500']};
    }
  }

  a:hover {
    border-bottom: 5px solid ${(props) => props.theme['green-500']};
  }

  @media (max-width: 425px) {
    a {
      border-top: 2.5px solid transparent;
      border-bottom: 2.5px solid transparent;
    }

    a:hover {
      border-bottom: 2.5px solid ${(props) => props.theme['green-500']};
    }
  }
`
