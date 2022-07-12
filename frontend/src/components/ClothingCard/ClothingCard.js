import './ClothingCard.css';

/**
 * The **ClothingCard** component is one of the four clothing cards displayed in the main section of the home page. This component displays clothing recommendation according to the type, temperature, and user preferences
 *
 * @author [Yuffie](https://github.com/yuff1006)
 */

const ClothingCard = ({ imageName, imageLink, clothingType }) => {
  return (
    <div className="clothingcard">
      <img className="clothingcard__image" src={imageLink} alt={imageName} />
      <div className="clothingcard__info-container">
        <div className="clothingcard__title-and-like">
          <p className="clothingcard__title">{clothingType}</p>
          <button className="clothingcard__like" type="button" aria-label="Like"></button>
        </div>
        <button aria-label="Add Photo" className="clothingcard__add-photo" type="button">
          + Add your photo
        </button>
      </div>
    </div>
  );
};

export default ClothingCard;
