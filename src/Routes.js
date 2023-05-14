import { Route, Routes } from "react-router-dom"
import App from "./App"
import TicketElite from "./components/TicketElite"
import TicketPremium from "./components/TicketPremium"
import TicketStandard from "./components/TicketStandard"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/v2.keypom.testnet/*" element={<App />}></Route>
      <Route path="premium" element={<TicketPremium />}></Route>
      <Route path="elite" element={<TicketElite />}></Route>
      <Route path="standard" element={<TicketStandard />}></Route>
    </Routes >
  )
}

export default Routers
