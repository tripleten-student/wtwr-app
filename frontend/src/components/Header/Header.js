function Header(
  {
    /** children */
  }
) {
  return (
    <header className="header">
      <img className="header__logo" alt="WTWR Logo" src={require('../images/wtwr_logo.png')} />
      <p className="header__date">June 15, New York</p>
      <div className="header__navContainer">
        <p>toggle switch placeholder</p>
        <p>+ Add Clothes</p>
        <p>Terrence Tegegene</p>
      </div>
    </header>
  );
}

export default Header;
