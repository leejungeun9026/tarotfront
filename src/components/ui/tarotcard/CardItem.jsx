import React from 'react'
import styled from 'styled-components'

const CardItem = styled.div`
  width: 100%;
  max-width: 50px;
  aspect-ratio: 7/12;
  background: gray;
  border-radius: 0.25em;
`;

function Card({ id }) {
  return (
    <CardItem key={id} id={id}>cardItem</CardItem>
  )
}

export default CardItem