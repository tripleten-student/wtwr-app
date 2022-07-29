import React from 'react';
import WeatherCards from '../WeatherCards/WeatherCards';
import './Main.css';
import ClothingCard from '../ClothingCard/ClothingCard';
import randomizeIcon from '../../images/randomizeIcon.svg';
import { clothes } from '../../utils/testData';
import { accessories, top, bottom, shoes } from '../../utils/templateApparel';

/**
 * The **Main** component puts toguether the components of the main page,
 * **WeatherCards** and **ClothesSectionMain**.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Main({ weatherData, clothesData, onCardLike, isLoggedIn, onCardClick }) {
  // To get the weather in the actual moment
  const [actualWeather, setActualWeather] = React.useState('');

  React.useEffect(() => {
    if (weatherData) {
      const actualWeather = weatherData.find((element) => element.elongate === true);
      setActualWeather(actualWeather);
    }
  }, [weatherData]);

  /**THIS FUNCTIONALLITY HAS BEEN ADDED FOR TESTING PURPOSES**/
  const clothesTestData = isLoggedIn ? clothes : [{}];

  function handleRandomClick() {
    console.log('Randomize');
  }

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
  /**UNTIL HERE**/

  //In the final project the main item should receive the clothesData,
  // using "clothesTestData" for testing purposes

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
        <div className="clothesSectionMain__info">
          <p>{`Today is ${actualWeather.temperature} F and it is ${actualWeather.description}/ You may want to wear:`}</p>
          <button className="randomize-button" type="button" onClick={handleRandomClick}>
            <img className={'randomize-icon'} alt="randomize" src={randomizeIcon} />
            Randomize
          </button>
        </div>
        <div className="clothesSectionMain__items">
          <ClothingCard
            key={'accesories'}
            apparelGroup={accessories}
            cardData={accesoriesItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
          <ClothingCard
            key={'topsandoutwear'}
            apparelGroup={top}
            cardData={topsandoutwearItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
          <ClothingCard
            key={'bottoms'}
            apparelGroup={bottom}
            cardData={bottomsItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
          <ClothingCard
            key={'shoes'}
            apparelGroup={shoes}
            cardData={shoesItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
          />
        </div>
      </div>
    </main>
  );
}
export default Main;
