import './Header.css';
import Logo from '../Logo/Logo';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ children }) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Logo />
        </div>
        <p className="header__date">June 15, New York</p>
      </div> 
      <div className="header__navContainer">
        {children}
      </div>
    </header>
  );
}

export default Header;
