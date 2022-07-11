import Navigation from './Navigation'; /** Change if/when needed */

function Header() {
    return(
        <header>
            <img src={require('../images/wtwr_logo.png')} />
            <Navigation />
        </header>
    )
}