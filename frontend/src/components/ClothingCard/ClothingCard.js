import React, { useEffect, useState } from 'react';
import './ClothingCard.css';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { blankCard } from '../../utils/templateApparel';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006) & @author [Santiago](https://github.com/Santiag0SR)
 */

const ClothingCard = ({
  weatherData,
  cardData,
  onCardLike,
  apparelGroup,
  onCardClick,
  isLoggedIn,
  weatherType,
  randomize,
  handleLoginOpen,
  onAddNewClick,
}) => {
  const location = useLocation();
  const [templateItem, setTemplateItem] = useState({});
  const clothingItemPresent = cardData;

  function createTemplateItem(apparelGroup) {
    if (apparelGroup) {
      const filterGroup = apparelGroup.filter((cloth) => cloth.weather.includes(weatherType));
      return filterGroup[Math.floor(Math.random() * filterGroup.length)];
    } else {
      return blankCard;
    }
  }

  useEffect(() => {
    {
      location.pathname === '/' && setTemplateItem(createTemplateItem(apparelGroup));
    }
  }, [weatherType, randomize]);

  const handleLike = () => {
    onCardLike(cardData);
  };

  const cardHeartButtonClassName =
    cardData && cardData.isLiked
      ? 'clothingcard__like clothingcard__like_active'
      : 'clothingcard__like';

  const handleCardClick = (event) => {
    if (!event.target.className.includes('clothingcard__like')) {
      onCardClick(cardData);
    }
  };

  const urlImage = () => {
    if (clothingItemPresent) {
      return cardData.imageUrl;
    } else if (templateItem.type) {
      return require(`../../images/ClothingCard/${templateItem.type.toLowerCase()}.svg`);
    }
  };

  return (
    <div className="clothingcard" onClick={handleCardClick}>
      {urlImage() !== undefined && (
        <img
          className={`clothingcard__image ${!clothingItemPresent && 'clothingcard__image_default'}`}
          src={urlImage()}
          alt={clothingItemPresent ? cardData.name : templateItem.name}
        />
      )}
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">
            {location.pathname === '/profile' && (!apparelGroup ? cardData.name : apparelGroup)}
            {location.pathname === '/' &&
              (!clothingItemPresent && templateItem !== undefined
                ? templateItem.name
                : cardData.name)}
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
        {location.pathname === '/' && !clothingItemPresent && isLoggedIn === false && (
          <button
            aria-label="Add Photo"
            className="clothingcard__add-photo"
            type="button"
            onClick={handleLoginOpen}
          >
            + Add your photo
          </button>
        )}
        {location.pathname === '/' && !clothingItemPresent && isLoggedIn === true && (
          <button
            aria-label="Add Photo"
            className="clothingcard__add-photo"
            type="button"
            onClick={onAddNewClick}
          >
            + Add your photo
          </button>
        )}
        {location.pathname === '/profile' && apparelGroup && (
          <button
            aria-label="Add Photo"
            className="clothingcard__add-photo"
            type="button"
            onClick={onAddNewClick}
          >
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
