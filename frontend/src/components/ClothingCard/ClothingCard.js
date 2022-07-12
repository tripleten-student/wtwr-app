import './ClothingCard.css';
import PropTypes from 'prop-types';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006)
 */

const ClothingCard = ({ cardData, clothingType, onCardLike }) => {
  const clothingItemPresent = cardData;
  const handleLike = () => {
    onCardLike(cardData);
  };
  const isLiked = cardData.favorited;
  const cardHeartButtonClassName = isLiked
    ? 'clothingcard__like clothingcard__like_active'
    : 'clothingcard__like';
  return (
    <div className="clothingcard">
      <img
        className={`clothingcard__image ${!clothingItemPresent && 'clothingcard__image_default'}`}
        src={
          clothingItemPresent
            ? cardData.imageLink
            : require(`../../images/ClothingCard/${clothingType.toLowerCase()}.svg`)
        }
        alt={clothingItemPresent ? cardData.imageName : clothingType}
      />
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">
            {clothingType.charAt(0).toUpperCase() + clothingType.slice(1)}
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
  imageName: PropTypes.string,
  imageLink: PropTypes.string,
  clothingType: PropTypes.string.isRequired,
};
export default ClothingCard;
