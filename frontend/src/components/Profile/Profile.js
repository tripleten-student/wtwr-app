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
      <div className="profile-clothes">
        <div className="profile-section__info">
          <h3 className="profile-section__title">Accessories</h3>
          <button className="profile-section__button"> +Add new</button>
        </div>
        <section className="profile-clothes__section Accessories">
          {accessories.map((card) => (
            <ClothingCard
              name="T-shirt"
              // please test with empty string to see the default image show up on card with "add your photo" button
              cardData={card}
              onCardLike={onCardLike}
            />
          ))}
        </section>
        <div className="profile-section__info">
          <h3 className="profile-section__title">Tops and outerwear</h3>
          <button className="profile-section__button"> +Add new</button>
        </div>
        <section className="profile-clothes__section Topsandoutwear">
          {topsandoutwear.map((card) => (
            <ClothingCard
              name="T-shirt"
              // please test with empty string to see the default image show up on card with "add your photo" button
              cardData={card}
              onCardLike={onCardLike}
            />
          ))}
        </section>
        <div className="profile-section__info">
          <h3 className="profile-section__title">Bottoms</h3>
          <button className="profile-section__button"> +Add new</button>
        </div>
        <section className="profile-clothes__section Topsandoutwear">
          {bottoms.map((card) => (
            <ClothingCard
              name=""
              // please test with empty string to see the default image show up on card with "add your photo" button
              cardData={card}
              onCardLike={onCardLike}
            />
          ))}
        </section>
        <div className="profile-section__info">
          <h3 className="profile-section__title">Shoes</h3>
          <button className="profile-section__button"> +Add new</button>
        </div>
        <section className="profile-clothes__section Topsandoutwear">
          {shoes.map((card) => (
            <ClothingCard
              name="T-shirt"
              // please test with empty string to see the default image show up on card with "add your photo" button
              cardData={card}
              onCardLike={onCardLike}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
export default Profile;
