import './Header.css';
import Logo from '../Logo/Logo';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Header component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

function Header({ currentDate, currentLocation, children }) {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <p className="header__date">{currentDate || 'June 15'}, {currentLocation || 'New York'}</p>
      </div>
      <div className="header__navContainer">
        <ToggleSwitch />
        {children}
      </div>
    </header>
  );
}

export default Header;
