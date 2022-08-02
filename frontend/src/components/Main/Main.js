import { useEffect, useState, useContext } from 'react';
import WeatherCards from '../WeatherCards/WeatherCards';
import './Main.css';
import ClothingCard from '../ClothingCard/ClothingCard';
import Clothes from '../Clothes';
import randomizeIcon from '../../images/randomizeIcon.svg';
import { clothes } from '../../utils/testData';
import { accessories, top, bottom, shoes } from '../../utils/templateApparel';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

/**
 * The **Main** component puts toguether the components of the main page,
 * **WeatherCards** and **ClothesSectionMain**.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Main({ weatherData, clothesData, onCardLike, isLoggedIn, userClothingPreferences }) {
  const [accesoriesItem, setAccesoriesItem] = useState({});
  const [topsandoutwearItem, setTopsandoutwearItem] = useState({});
  const [bottomsItem, setBottomsItem] = useState({});
  const [shoesItem, setShoesItem] = useState({});

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  /**DISPLAY CARDS**/
  const actualWeather = weatherData.find((element) => element.elongate);

  // 1. Weather intervals for type of clothes in relation with the temperature.
  // Weather: string, enum:['hot', 'warm', 'moderate', 'cold', 'freezing']
  const weatherType = () => {
    const newWeather = parseInt(actualWeather.temperature.F);
    if (newWeather >= 97) {
      return 'extreme';
    } else if (newWeather >= 86 && newWeather <= 96) {
      return 'hot';
    } else if (newWeather >= 78 && newWeather <= 85) {
      return 'warm';
    } else if (newWeather >= 66 && newWeather <= 77) {
      return 'optimal';
    } else if (newWeather >= 54 && newWeather <= 65) {
      return 'cool';
    } else if (newWeather >= 33 && newWeather <= 53) {
      return 'cold';
    } else if (newWeather >= -22 && newWeather <= 32) {
      return 'extremely cold';
    }
  };

  /** 2. To get the random item of clothes based in the favorited feature**/
  function getRandomItemByProbability(data) {
    // Declare new array
    let out = [];
    // Loop through the data.
    for (let i = 0; i < data.length; ++i) {
      // Push the value over and over again according to its
      // probability.
      for (let j = 0; j < data[i].prob; ++j) {
        out.push(data[i]);
      }
    }
    // return the random choosen item, the item favorited will have more chances to appear
    // as it will have more repetitions.
    return out[Math.floor(Math.random() * out.length)];
  }

  /** 3. Display cards only if LoggedIn.**/
  const clothesItems = isLoggedIn ? clothes : [{}];

  /** 3. Increase probability to items liked and in the preferences.**/
  const ItemsProbability = clothesItems.map((item) => {
    if (item.isLiked === true && userClothingPreferences.includes(item.type) === true) {
      item['prob'] = 4;
      return item;
    } else if (item.isLiked === true && userClothingPreferences.includes(item.type) === false) {
      item['prob'] = 3;
      return item;
    } else if (item.isLiked === false && userClothingPreferences.includes(item.type) === true) {
      item['prob'] = 2;
      return item;
    } else {
      item['prob'] = 1;
      return item;
    }
  });

  console.log(weatherType());

  console.log(ItemsProbability);

  /** 4. Get each item and set state for each type.**/
  useEffect(() => {
    // Filter throught the item to get the correct cloth by it's type and weather range or temperature.
    const accesoriesFilter = ItemsProbability.filter(
      (cloth) => cloth.apparelGroup === 'Accessories' && cloth.weather === weatherType()
    );
    console.log(accesoriesFilter);
    const topsandoutwearFilter = ItemsProbability.filter(
      (cloth) => cloth.apparelGroup === 'Tops & outerwear' && cloth.weather === weatherType()
    );
    const bottomsFilter = ItemsProbability.filter(
      (cloth) => cloth.apparelGroup === 'Bottoms' && cloth.weather === weatherType()
    );
    const shoesFilter = ItemsProbability.filter(
      (cloth) => cloth.apparelGroup === 'Shoes' && cloth.weather === weatherType()
    );

    setAccesoriesItem(getRandomItemByProbability(accesoriesFilter));
    setTopsandoutwearItem(getRandomItemByProbability(topsandoutwearFilter));
    setBottomsItem(getRandomItemByProbability(bottomsFilter));
    setShoesItem(getRandomItemByProbability(shoesFilter));
  }, [weatherData]);

  function handleRandomClick() {
    console.log('Randomize');
  }

  return (
    <main className="main">
      <WeatherCards weatherData={weatherData} />
      <div className="clothesSectionMain">
        <div className="clothesSectionMain__info">
          <p>{`Today is ${actualWeather.temperature[currentTemperatureUnit]} ${currentTemperatureUnit} and it is ${actualWeather.condition} / You may want to wear:`}</p>
          <button className="randomize-button" type="button" onClick={handleRandomClick}>
            <img className={'randomize-icon'} alt="randomize" src={randomizeIcon} />
            Randomize
          </button>
        </div>
        <div className="clothesSectionMain__items">
          <ClothingCard
            key={'accesories'}
            apparelGroup={accessories}
            cardData={!accesoriesItem ? false : accesoriesItem}
            onCardLike={onCardLike}
          />
          <ClothingCard
            key={'topsandoutwear'}
            apparelGroup={top}
            cardData={!topsandoutwearItem ? false : topsandoutwearItem}
            onCardLike={onCardLike}
          />
          <ClothingCard
            key={'bottoms'}
            apparelGroup={bottom}
            cardData={!bottomsItem ? false : bottomsItem}
            onCardLike={onCardLike}
          />
          <ClothingCard
            key={'shoes'}
            apparelGroup={shoes}
            cardData={!shoesItem ? false : shoesItem}
            onCardLike={onCardLike}
          />
        </div>
      </div>
    </main>
  );
}
export default Main;
