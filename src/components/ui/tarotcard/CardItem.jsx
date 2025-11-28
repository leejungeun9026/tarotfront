function CardItem({ num }) {
  return (
    <div className={["card_item", `card_${num}`].join(" ")} >{num}</div>
  )
}

export default CardItem