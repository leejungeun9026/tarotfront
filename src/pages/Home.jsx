import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"


function Home() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 w-full h-[100vh]">
      <h2 className="text-black text-3xl font-bold">Hello Shadcn</h2>
      <Button>Click me!</Button>
    </div>
  )
}

export default Home