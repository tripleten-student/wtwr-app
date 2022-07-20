import './ClothesSection.css';
import ClothingCard from '../ClothingCard/ClothingCard';
import PropTypes from 'prop-types';

function ClothesSection({ sectionName, sectionData, onAddNewClick, onCardLike }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__info">
        <h3 className="clothes-section__title">{sectionName}</h3>
        <button className="clothes-section__button" onClick={onAddNewClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {sectionData.length === 0 ? (
          <ClothingCard cardData={sectionData} onCardLike={onCardLike} />
        ) : (
          sectionData.map((card) => (
            <ClothingCard
              key={card.name}
              name={card.name}
              // please test with empty string to see the default image show up on card with "add your photo" button
              cardData={card}
              onCardLike={onCardLike}
            />
          ))
        )}
      </ul>
    </div>
  );
}

ClothesSection.propTypes = {
  sectionName: PropTypes.string.isRequired,
  sectionData: PropTypes.object.isRequired,
  onAddNewClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};
export default ClothesSection;
