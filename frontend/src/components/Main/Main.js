import WeatherCards from '../WeatherCards/WeatherCards';
import './Main.css';
import ClothingCard from '../ClothingCard/ClothingCard';

import { clothes } from '../../utils/testData';
import { accessories, top, bottom, shoes } from '../../utils/templateApparel';

/**
 * The **Main** component puts toguether the components of the main page,
 * **WeatherCards** and **ClothesSectionMain**.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Main({ weatherData, clothesData, onCardLike, isLoggedIn }) {
  //THIS FUNCTIONALLITY HAS BEEN ADDED FOR TESTING PURPOSES
  const clothesTestData = isLoggedIn ? clothes : [{}];

  function random_clothes(clothes) {
    return clothes[Math.floor(Math.random() * clothes.length)];
  }

  function getClothes(clothes) {
    const likedClothes = clothes.filter((cloth) => cloth.isLiked === true);
    if (likedClothes.length === 0) {
      return random_clothes(clothes);
    } else {
      return random_clothes(likedClothes);
    }
  }

  //In the final project the main item should receive the clothesData
  const accesoriesItem = getClothes(
    clothesTestData.filter((cloth) => cloth.type === 'Accessories')
  );
  const topsandoutwearItem = getClothes(
    clothesTestData.filter((cloth) => cloth.type === 'Tops & outerwear')
  );
  const bottomsItem = getClothes(clothesTestData.filter((cloth) => cloth.type === 'Bottoms'));
  const shoesItem = getClothes(clothesTestData.filter((cloth) => cloth.type === 'Shoes'));

  return (
    <main className="main">
      <WeatherCards weatherData={weatherData} />
      <div className="clothesSectionMain">
        <ClothingCard
          key={'accesories'}
          apparelGroup={accessories}
          cardData={accesoriesItem}
          onCardLike={onCardLike}
        />
        <ClothingCard
          key={'topsandoutwear'}
          apparelGroup={top}
          cardData={topsandoutwearItem}
          onCardLike={onCardLike}
        />
        <ClothingCard
          key={'bottoms'}
          apparelGroup={bottom}
          cardData={bottomsItem}
          onCardLike={onCardLike}
        />
        <ClothingCard
          key={'shoes'}
          apparelGroup={shoes}
          cardData={shoesItem}
          onCardLike={onCardLike}
        />
      </div>
    </main>
  );
}
export default Main;
