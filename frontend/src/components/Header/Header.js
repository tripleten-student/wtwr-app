import './Header.css';
import Logo from '../Logo/Logo';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Header component that displays header of the web app
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

const Header = ({ weatherData, children }) => {
  if (!weatherData) return null;
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <p className="header__date">
          {currentDate}, {weatherData[0].city}
        </p>
      </div>
      <div className="header__navContainer">
        <ToggleSwitch />
        {children}
      </div>
    </header>
  );
};

export default Header;
