import React from 'react';
import './ClothingCard/ClothingCard.css';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006) & @author [Santiago](https://github.com/Santiag0SR)
 */

//1. Clean up code so only one type of data is received for every location.
//2. Remove the like button for template cards.
//3. Add ... when

const Clothes = ({ weatherData, cardData, onCardLike, apparelGroup }) => {
  return <div className="clothingcard"></div>;
};

// ClothingCard.propTypes = {
//   // name: PropTypes.string,
//   // imageUrl: PropTypes.string,
//   // type: PropTypes.string,
// };
export default Clothes;
