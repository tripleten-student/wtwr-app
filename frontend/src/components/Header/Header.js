import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="WTWR Logo" src={require('../../images/wtwr_logo.png')} />
        <p className="header__date">June 15, New York</p>
      </div>
      <div className="header__navContainer">
        <p>placeholder</p>
        <p>placeholder</p>
        <p>placeholder</p>
      </div>
    </header>
  );
}

export default Header;
