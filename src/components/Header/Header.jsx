import "./Header.scss"
import Logo from "../../assets/reactjs.svg"

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="React" />
      <h1>Mi Aplicación React</h1>
    </div>
  )
}

export default Header