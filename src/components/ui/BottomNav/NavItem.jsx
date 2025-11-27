import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const Li = styled.li`
  width: calc((100% - 32px)/5);
  max-width: 68px;
`;

const Item = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--muted);
  }

  p {
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NavItem({ title, icon, link }) {
  return (
    <Li>
      <NavLink to={link}>
        <Item>
          <Icon>
            <span className="material-symbols-rounded">
              {icon || "home"}
            </span>
          </Icon>
          <p>{title || "홈"}</p>
        </Item>
      </NavLink>
    </Li>
  )
}

export default NavItem