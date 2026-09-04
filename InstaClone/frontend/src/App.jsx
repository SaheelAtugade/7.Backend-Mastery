import { RouterProvider } from "react-router-dom"
import {Router} from "./router"
import "./style.scss"
const App = () => {
  return (
    <div>
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App