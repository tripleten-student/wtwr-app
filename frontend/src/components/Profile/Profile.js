import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothingCard from '../ClothingCard/ClothingCard';
import { clothes } from '../../utils/testData';

function Profile({ cardData, onCardLike }) {
  const accessories = clothes.filter((cloth) => cloth.type === 'Accessories');
  const topsandoutwear = clothes.filter((cloth) => cloth.type === 'Tops & outerwear');
  const shoes = clothes.filter((cloth) => cloth.type === 'Shoes');
  const bottoms = clothes.filter((cloth) => cloth.type === 'Bottoms');

  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar />
      </section>
      <section className="profile-clothes">
        <div className="clothes-section">
          <div className="clothes-section__info">
            <h3 className="clothes-section__title">Accessories</h3>
            <button className="clothes-section__button"> +Add new</button>
          </div>
          <ul className="clothes-section__list">
            {accessories.map((card) => (
              <ClothingCard
                key={card.name}
                name="T-shirt"
                // please test with empty string to see the default image show up on card with "add your photo" button
                cardData={card}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
        <div className="clothes-section">
          <div className="clothes-section__info">
            <h3 className="clothes-section__title">Tops and outerwear</h3>
            <button className="clothes-section__button"> +Add new</button>
          </div>
          <ul className="clothes-section__list">
            {topsandoutwear.map((card) => (
              <ClothingCard
                key={card.name}
                name="T-shirt"
                // please test with empty string to see the default image show up on card with "add your photo" button
                cardData={card}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
        <div className="clothes-section">
          <div className="clothes-section__info">
            <h3 className="clothes-section__title">Bottoms</h3>
            <button className="clothes-section__button"> +Add new</button>
          </div>
          <ul className="clothes-section__list">
            {bottoms.map((card) => (
              <ClothingCard
                key={card.name}
                // please test with empty string to see the default image show up on card with "add your photo" button
                cardData={card}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
        <div className="clothes-section">
          <div className="clothes-section__info">
            <h3 className="clothes-section__title">Shoes</h3>
            <button className="clothes-section__button"> +Add new</button>
          </div>
          <ul className="clothes-section__list">
            {shoes.map((card) => (
              <ClothingCard
                key={card.name}
                // please test with empty string to see the default image show up on card with "add your photo" button
                cardData={card}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
export default Profile;
