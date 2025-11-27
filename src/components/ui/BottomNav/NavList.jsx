import styled from "styled-components"
import NavItem from "./NavItem";

const Ul = styled.ul`
  width: 100%;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function NavList() {
  return (
    <Ul>
      <NavItem />
    </Ul>
  )
}

export default NavList