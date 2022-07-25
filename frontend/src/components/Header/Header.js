import './Header.css';
import Logo from '../Logo/Logo';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

/**
 * The Header component
 *
 * @author [Sam](https://github.com/Samm96)
 *
 */

/* `currentDate` takes today's date from the built-in `Date` object and 
** sends it through the `toLocaleString` method which returns a string
** with a language-sensitive representation of the date.
** The options of this method indicate the month should be the full word and date should return
** the numeric version of the date.

more info here: 
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options> 
*/

function Header({ currentLocation, children }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <p className="header__date">
          {currentDate || 'June 15'}, {currentLocation || 'New York'}
        </p>
      </div>
      <div className="header__navContainer">
        <ToggleSwitch />
        {children}
      </div>
    </header>
  );
}

export default Header;
