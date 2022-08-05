import './LoadingSpinner.css';

/**
 * The LoadingSpinner component runs when cards are rendering
 *
 * @author [Sam](https://github.com/Samm96)
 */

function LoadingSpinner({ isLoading }) {
  return <span className={isLoading ? 'loader' : 'loader loader_hidden'}></span>;
}

export default LoadingSpinner;
