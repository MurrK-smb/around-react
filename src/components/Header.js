import  around from '../images/around.svg'

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={around} alt="'Around The U.S.' logo"/>
    </header>
  )
}

export default Header