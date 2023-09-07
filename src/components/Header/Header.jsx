import "./Header.scss"
import Logo from "../../assets/reactjs.svg"

const Header = () => {
  return (
    <div className="header">
      <a href="/">
        <img src={Logo} alt="React" />
      </a>
      <h1>Mi Aplicación React</h1>
    </div>
  )
}

export default Header