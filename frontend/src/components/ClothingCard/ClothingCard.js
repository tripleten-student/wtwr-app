import './ClothingCard.css';
import PropTypes from 'prop-types';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006)
 */

const ClothingCard = ({ cardData, onCardLike }) => {
  const clothingItemPresent = cardData;
  const handleLike = () => {
    onCardLike(cardData);
  };

  const cardHeartButtonClassName = cardData.isLiked
    ? 'clothingcard__like clothingcard__like_active'
    : 'clothingcard__like';
  return (
    <div className="clothingcard">
      <img
        className={`clothingcard__image ${!clothingItemPresent && 'clothingcard__image_default'}`}
        src={
          clothingItemPresent
            ? cardData.imageUrl
            : require(`../../images/ClothingCard/${cardData.type.toLowerCase()}.svg`)
        }
        alt={clothingItemPresent ? cardData.name : cardData.type}
      />
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">
            {cardData.type.charAt(0).toUpperCase() + cardData.type.slice(1)}
          </p>
          <button
            className={cardHeartButtonClassName}
            type="button"
            aria-label="Like"
            onClick={handleLike}
          ></button>
        </div>
        {!clothingItemPresent && (
          <button aria-label="Add Photo" className="clothingcard__add-photo" type="button">
            + Add your photo
          </button>
        )}
      </div>
    </div>
  );
};

ClothingCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  type: PropTypes.string,
};
export default ClothingCard;
