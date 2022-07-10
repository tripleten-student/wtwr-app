import React from 'react';
import Main from './Main';
import Footer from './Footer';
/**
 * The main React **App** component.
 */
const App = () => {
  return (
    <div className="page">
      <div className="page__wrapper">
        App
        <Main/>
        <Footer />
      </div>
    </div>
  );
};

export default App;
