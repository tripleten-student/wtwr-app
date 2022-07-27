import './MobileNavigation.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function MobileNavigation() {
  return (
    <nav className="navigation-mobile">
      <ul className="navigation-mobile__container">
        <li className="navigation-mobile__toggle">
          <ToggleSwitch />
        </li>
        <li>
          <button className="navigation-mobile__addButton">
            <img
              className="navigation-mobile__addButton-plus"
              src={require('../../images/plus-sign.png')}
              alt="+"
            />
          </button>
        </li>
        <li>
          <button className="navigation-mobile__modalButton">
            <img
              className="navigation-mobile__modalButton-image"
              src={require('../../images/modal-button.png')}
              alt="signin/login"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MobileNavigation;
