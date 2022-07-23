import './Header.css';
import Logo from '../Logo/Logo';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Header component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

function Header({ children }) {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <p className="header__date">June 15, New York</p>
      </div>
      <div className="header__navContainer">
        <ToggleSwitch />
        {children}
      </div>
    </header>
  );
}

export default Header;
