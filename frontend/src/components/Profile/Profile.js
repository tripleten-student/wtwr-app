import { useState, useEffect } from 'react';
import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import {
  accessoriesCategory,
  topsAndOuterwearCategory,
  bottomsCategory,
  shoesCategory,
} from '../../utils/formConstants';

/**
 * The **Profile** component displays all the data saved by the user when he is logged in
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Profile({
  clothingItems,
  onCardLike,
  onCardClick,
  onAddNewClick,
  onChangePasswordClick,
  onChangeProfileClick,
  onChangeClothesPreferencesClick,
  onLogOutClick,
  onDeleteProfileClick,
}) {
  const [accessories, setAccessories] = useState([]);
  const [topsandoutwear, setTopsandoutwear] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [shoes, setShoes] = useState([]);

  // Divide all the clothing items into broader categories on page load
  useEffect(() => {
    setAccessories(
      clothingItems.filter((clothingItem) => accessoriesCategory.includes(clothingItem.type))
    );
    setTopsandoutwear(
      clothingItems.filter((clothingItem) => topsAndOuterwearCategory.includes(clothingItem.type))
    );
    setBottoms(clothingItems.filter((clothingItem) => bottomsCategory.includes(clothingItem.type)));
    setShoes(clothingItems.filter((clothingItem) => shoesCategory.includes(clothingItem.type)));
  }, [clothingItems]);

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
          sectionName="Accessories"
          sectionData={accessories}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />
        <ClothesSection
          sectionName="Tops & outerwear"
          sectionData={topsandoutwear}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />

        <ClothesSection
          sectionName="Bottoms"
          sectionData={bottoms}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />

        <ClothesSection
          sectionName="Shoes"
          sectionData={shoes}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
          onCardClick={onCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;
