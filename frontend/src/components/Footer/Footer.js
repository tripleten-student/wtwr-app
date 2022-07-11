import './Footer.css'
/**
 * The **Footer** component displays copyright and year information
 *
 * @author [Nuriya](https://github.com/NuriyaAkh)
 */

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© Developed by Practicum Students</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
};
export default Footer;
