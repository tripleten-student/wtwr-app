import './ClothingCard.css';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006) & @author [Santiago](https://github.com/Santiag0SR)
 */

const ClothingCard = ({ cardData, onCardLike, apparelGroup, onCardClick, isLoggedIn }) => {
  const location = useLocation();

  function createTemplateItem(apparelGroup) {
    if (apparelGroup) {
      return apparelGroup[Math.floor(Math.random() * apparelGroup.length)];
    } else {
      return 'profileTemplate';
    }
  }

  const clothingItemPresent = cardData;
  const templateItem = createTemplateItem(apparelGroup);

  const handleLike = () => {
    // onCardLike(cardData);
    console.log('card liked');
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

  return (
    <div className="clothingcard" onClick={handleCardClick}>
      <img
        className={`clothingcard__image ${!clothingItemPresent && 'clothingcard__image_default'}`}
        src={
          clothingItemPresent
            ? cardData.imageUrl
            : require(`../../images/ClothingCard/${templateItem.type.toLowerCase()}.svg`)
        }
        alt={clothingItemPresent ? cardData.name : templateItem.type}
      />
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">
            {location.pathname === '/profile' && (!apparelGroup ? cardData.name : apparelGroup)}
            {location.pathname === '/' &&
              (clothingItemPresent
                ? cardData.name.charAt(0).toUpperCase() + cardData.name.slice(1)
                : templateItem.type.charAt(0).toUpperCase() + templateItem.type.slice(1))}
          </p>
          <button className={cardHeartButtonClassName} type="button" aria-label="Like"></button>
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
