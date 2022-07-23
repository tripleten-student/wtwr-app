import WeatherCards from '../WeatherCards/WeatherCards';
import './Main.css';

/**
 * The **Main** component puts toguether the components of the main page,
 * **WeatherCards** and **ClothesSectionMain**.
 *
 * @author [Santiago](https://github.com/Santiag0SR)
 */

function Main({ weatherData }) {
  return (
    <main className="main">
      <WeatherCards weatherData={weatherData} />
    </main>
  );
}
export default Main;
