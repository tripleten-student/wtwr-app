const clothingItems = [
  { name: 'T-Shirt', value: 't-shirt' },
  { name: 'Shirt', value: 'shirt' },
  { name: 'Jeans', value: 'jeans' },
  { name: 'Skirt', value: 'skirt' },
  { name: 'Dress', value: 'dress' },
  { name: 'Sneakers', value: 'sneakers' },
  { name: 'Boots', value: 'boots' },
  { name: 'Jacket', value: 'jacket' },
  { name: 'Coat', value: 'coat' },
  { name: 'Sunglasses', value: 'sunglasses' },
  { name: 'Shorts', value: 'shorts' },
  { name: 'Sport Pants', value: 'sport-pants' },
  { name: 'Down Jacket', value: 'down-jacket' },
];

const accessoriesCategory = ['sunglasses'];
const topsAndOuterwearCategory = ['t-shirt', 'shirt', 'dress', 'jacket', 'coat', 'down-jacket'];
const bottomsCategory = ['jeans', 'skirt', 'shorts', 'sport-pants'];
const shoesCategory = ['sneakers', 'boots'];

const weatherTypesInFahrenheit = [
  { name: 'Extremely Cold (-22°F to 32°F)', value: 'extremely-cold' },
  { name: 'Cold (33°F to 53°F)', value: 'cold' },
  { name: 'Cool (54°F to 65°F)', value: 'cool' },
  { name: 'Optimal (66°F to 77°F)', value: 'optimal' },
  { name: 'Warm (78°F to 85°F)', value: 'warm' },
  { name: 'Hot (86°F to 96°F)', value: 'hot' },
  { name: 'Extreme (97°F+)', value: 'extreme' },
];

const weatherTypesInCelcius = [
  { name: 'Extremely Cold (-30°C to 0°C)', value: 'extremely-cold' },
  { name: 'Cold (1°C to 12°C)', value: 'cold' },
  { name: 'Cool (13°C to 18°C)', value: 'cool' },
  { name: 'Optimal (19°C to 25°C)', value: 'optimal' },
  { name: 'Warm (26°C to 30°C)', value: 'warm' },
  { name: 'Hot (31°C to 35°C)', value: 'hot' },
  { name: 'Extreme (36°C+)', value: 'extreme' },
];

export {
  clothingItems,
  accessoriesCategory,
  topsAndOuterwearCategory,
  bottomsCategory,
  shoesCategory,
  weatherTypesInFahrenheit,
  weatherTypesInCelcius,
};
