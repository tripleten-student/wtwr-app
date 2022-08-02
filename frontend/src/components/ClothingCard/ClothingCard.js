import React, { useEffect, useState } from 'react';
import './ClothingCard.css';
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

const ClothingCard = ({ weatherData, cardData, onCardLike, apparelGroup }) => {
  const location = useLocation();
  const [templateItem, setTemplateItem] = useState({});
  const clothingItemPresent = cardData;

  function createTemplateItem(apparelGroup) {
    if (apparelGroup) {
      return apparelGroup[Math.floor(Math.random() * apparelGroup.length)];
    } else {
      return 'profileTemplate';
    }
  }

  useEffect(() => {
    setTemplateItem(createTemplateItem(apparelGroup));
  }, [weatherData]);

  const handleLike = () => {
    // onCardLike(cardData);
    console.log('card liked');
  };

  const cardHeartButtonClassName =
    cardData && cardData.isLiked
      ? 'clothingcard__like clothingcard__like_active'
      : 'clothingcard__like';

  return (
    <div className="clothingcard">
      <img
        className={`clothingcard__image ${!clothingItemPresent && 'clothingcard__image_default'}`}
        src={
          clothingItemPresent
            ? cardData.imageUrl
            : require(`../../images/ClothingCard/${templateItem.type.toLowerCase()}.svg`)
        }
        alt={clothingItemPresent ? cardData.name : templateItem.name}
      />
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">
            {location.pathname === '/profile' && (!apparelGroup ? cardData.name : apparelGroup)}
            {location.pathname === '/' &&
              (!clothingItemPresent ? templateItem.name : cardData.name)}
          </p>

          {location.pathname === '/profile' && !apparelGroup && (
            <button
              className={cardHeartButtonClassName}
              type="button"
              aria-label="Like"
              onClick={handleLike}
            ></button>
          )}
          {location.pathname === '/' && clothingItemPresent && (
            <button
              className={cardHeartButtonClassName}
              type="button"
              aria-label="Like"
              onClick={handleLike}
            ></button>
          )}
        </div>
        {location.pathname === '/' && !clothingItemPresent && (
          <button aria-label="Add Photo" className="clothingcard__add-photo" type="button">
            + Add your photo
          </button>
        )}
        {location.pathname === '/profile' && apparelGroup && (
          <button aria-label="Add Photo" className="clothingcard__add-photo" type="button">
            + Add your photo
          </button>
        )}
      </div>
    </div>
  );
};

// ClothingCard.propTypes = {
//   // name: PropTypes.string,
//   // imageUrl: PropTypes.string,
//   // type: PropTypes.string,
// };
export default ClothingCard;
