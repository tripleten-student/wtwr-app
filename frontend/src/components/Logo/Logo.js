import { Link } from 'react-router-dom';
import './Logo.css';
import logoImg from '../../images/logo.svg';
/**
 * The **Logo** component renders logo of the web app
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const Logo = () => {
  return (
    <Link to="/">
      <img src={logoImg} alt="logo for what to wear web app" className="logo" />
    </Link>
  );
}

export default Logo;
