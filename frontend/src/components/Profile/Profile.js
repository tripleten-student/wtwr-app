import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import { clothes } from '../../utils/testData';

/**
 * The **Profile** component displays all the data saved by the user using the "ClothesSection" component
 * the SideBar with the links to change the user data.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Profile({
  clothesData,
  onCardLike,
  onAddNewClick,
  onChangePasswordClick,
  onChangeProfileClick,
  onChangeClothesPreferencesClick,
  onLogOutClick,
  onDeleteProfileClick,
}) {
  const accessories = clothes.filter((cloth) => cloth.apparelGroup === 'Accessories');
  const topsandoutwear = clothes.filter((cloth) => cloth.apparelGroup === 'Tops & outerwear');
  const bottoms = clothes.filter((cloth) => cloth.apparelGroup === 'Bottoms');
  const shoes = clothes.filter((cloth) => cloth.apparelGroup === 'Shoes');

  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar
          onChangePasswordClick={onChangePasswordClick}
          onChangeProfileClick={onChangeProfileClick}
          onChangeClothesPreferencesClick={onChangeClothesPreferencesClick}
          onLogOutClick={onLogOutClick}
          onDeleteProfileClick={onDeleteProfileClick}
        />
      </section>
      <section className="profile-clothes">
        <ClothesSection
          sectionName={'Accessories'}
          sectionData={accessories}
          onAddNewclick={onAddNewClick}
          onCardLike={onCardLike}
        />
        <ClothesSection
          sectionName={'Tops & outerwear'}
          sectionData={topsandoutwear}
          onAddNewclick={onAddNewClick}
          onCardLike={onCardLike}
        />

        <ClothesSection
          sectionName={'Bottoms'}
          sectionData={bottoms}
          onAddNewclick={onAddNewClick}
          onCardLike={onCardLike}
        />

        <ClothesSection
          sectionName={'Shoes'}
          sectionData={shoes}
          onAddNewclick={onAddNewClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
export default Profile;
