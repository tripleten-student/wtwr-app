import React, { useEffect, useState, useContext } from 'react';
import WeatherCards from '../WeatherCards/WeatherCards';
import './Main.css';
import ClothingCard from '../ClothingCard/ClothingCard';
import randomizeIcon from '../../images/randomizeIcon.svg';
import { accessories, top, bottom, shoes } from '../../utils/templateApparel';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  accessoriesCategory,
  topsAndOuterwearCategory,
  bottomsCategory,
  shoesCategory,
} from '../../utils/formConstants';

/**
 * The **Main** component puts toguether the components of the main page,
 * **WeatherCards** and **ClothesSectionMain**.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Main({
  weatherData,
  clothingItems,
  onCardLike,
  isLoggedIn,
  userClothingPreferences,
  onCardClick,
  likedCard,
  handleLoginOpen,
  onAddNewClick,
}) {
  const [accesoriesItem, setAccesoriesItem] = useState({});
  const [topsandoutwearItem, setTopsandoutwearItem] = useState({});
  const [bottomsItem, setBottomsItem] = useState({});
  const [shoesItem, setShoesItem] = useState({});
  const [randomize, setRandomize] = useState(true);

  // To get the weather in the actual moment

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // To get the Userpreferences
  const currentUser = React.useContext(CurrentUserContext);
  const CurrentUserPreferences = !currentUser.preferences ? [{}] : currentUser.preferences;

  /**DISPLAY CARDS**/
  // 1. Weather intervals for type of clothes in relation with the temperature.
  // Weather: string, enum:['hot', 'warm', 'moderate', 'cold', 'freezing']

  // Use this in the weather text too.
  const actualWeather = weatherData.find((element) => element.elongate);

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
      return 'extremely-cold';
    }
  };

  /** 2. To get the random item of clothes based on propability added feature**/
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
  const clothesData = isLoggedIn ? clothingItems : [{}];

  /** 3. Increase probability to items liked and in the preferences.**/
  const ItemsProbability = clothesData.map((item) => {
    if (item.isLiked === true && CurrentUserPreferences.includes(item.type) === true) {
      item['prob'] = 4;
      return item;
    } else if (item.isLiked === true && CurrentUserPreferences.includes(item.type) === false) {
      item['prob'] = 3;
      return item;
    } else if (item.isLiked === false && CurrentUserPreferences.includes(item.type) === true) {
      item['prob'] = 2;
      return item;
    } else {
      item['prob'] = 1;
      return item;
    }
  });

  /**4.This code gets the likedCard and checks were it should go and changes that component only.
   * This will stop randomization when Like Button is clickedStop randomize when LIKE is clicked**/
  useEffect(() => {
    if (accessoriesCategory.includes(likedCard.type) === true) {
      setAccesoriesItem(likedCard);
    } else if (topsAndOuterwearCategory.includes(likedCard.type) === true) {
      setTopsandoutwearItem(likedCard);
    } else if (bottomsCategory.includes(likedCard.type) === true) {
      setBottomsItem(likedCard);
    } else if (shoesCategory.includes(likedCard.type) === true) {
      setShoesItem(likedCard);
    }
  }, [clothingItems]);

  /**5.Get each item by category and set state for each one.
   * Only triggered when this changes:
   * [weatherData, isLoggedIn, CurrentUserPreferences, clothingItems.length, randomize]**/
  useEffect(() => {
    const accesoriesFilter = ItemsProbability.filter(
      (cloth) =>
        accessoriesCategory.includes(cloth.type) === true && cloth.weather === weatherType()
    );
    const topsandoutwearFilter = ItemsProbability.filter(
      (cloth) =>
        topsAndOuterwearCategory.includes(cloth.type) === true && cloth.weather === weatherType()
    );
    const bottomsFilter = ItemsProbability.filter(
      (cloth) => bottomsCategory.includes(cloth.type) === true && cloth.weather === weatherType()
    );
    const shoesFilter = ItemsProbability.filter(
      (cloth) => shoesCategory.includes(cloth.type) === true && cloth.weather === weatherType()
    );
    // Filter throught the item to get the correct cloth by it's type and weather range or temperature.å
    setAccesoriesItem(getRandomItemByProbability(accesoriesFilter));
    setTopsandoutwearItem(getRandomItemByProbability(topsandoutwearFilter));
    setBottomsItem(getRandomItemByProbability(bottomsFilter));
    setShoesItem(getRandomItemByProbability(shoesFilter));
  }, [weatherData, isLoggedIn, CurrentUserPreferences, clothingItems.length, randomize]);

  function handleRandomClick() {
    if (randomize === true) {
      setRandomize(false);
    } else {
      setRandomize(true);
    }
  }

  return (
    <main className="main">
      <WeatherCards weatherData={weatherData} />
      <div className="clothesSectionMain">
        <div className="clothesSectionMain__info">
          <div className="clothesSectionMain__description-container">
            <p className="clothesSectionMain__description">{`Today is ${actualWeather.temperature[currentTemperatureUnit]} ${currentTemperatureUnit} and it is ${actualWeather.condition}`}</p>
            <p className="clothesSectionMain__description_slash"> / </p>
            <p className="clothesSectionMain__description">You may want to wear:</p>
          </div>
          <button className="randomize-button" type="button" onClick={handleRandomClick}>
            <img className={'randomize-icon'} alt="randomize" src={randomizeIcon} />
            Randomize
          </button>
        </div>
        <div className="clothesSectionMain__items">
          <ClothingCard
            key={'accessories'}
            apparelGroup={accessories}
            cardData={!accesoriesItem ? false : accesoriesItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            weatherType={weatherType()}
            randomize={randomize}
            isLoggedIn={isLoggedIn}
            handleLoginOpen={handleLoginOpen}
            onAddNewClick={onAddNewClick}
          />
          <ClothingCard
            key={'topsAndOuterwear'}
            apparelGroup={top}
            cardData={!topsandoutwearItem ? false : topsandoutwearItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            weatherType={weatherType()}
            randomize={randomize}
            isLoggedIn={isLoggedIn}
            handleLoginOpen={handleLoginOpen}
            onAddNewClick={onAddNewClick}
          />
          <ClothingCard
            key={'bottoms'}
            apparelGroup={bottom}
            cardData={!bottomsItem ? false : bottomsItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            weatherType={weatherType()}
            randomize={randomize}
            isLoggedIn={isLoggedIn}
            handleLoginOpen={handleLoginOpen}
            onAddNewClick={onAddNewClick}
          />
          <ClothingCard
            key={'shoes'}
            apparelGroup={shoes}
            cardData={!shoesItem ? false : shoesItem}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            weatherType={weatherType()}
            randomize={randomize}
            isLoggedIn={isLoggedIn}
            handleLoginOpen={handleLoginOpen}
            onAddNewClick={onAddNewClick}
          />
        </div>
        <button
          className="randomize-button randomize-button_location_bottom"
          type="button"
          onClick={handleRandomClick}
        >
          <img className={'randomize-icon'} alt="randomize" src={randomizeIcon} />
          Randomize
        </button>
      </div>
    </main>
  );
}
export default Main;
