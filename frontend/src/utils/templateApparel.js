// { name: 'Extremely Cold (-22°F to 32°F)', value: 'extremely-cold' },
// { name: 'Cold (33°F to 53°F)', value: 'cold' },
// { name: 'Cool (54°F to 65°F)', value: 'cool' },
// { name: 'Optimal (66°F to 77°F)', value: 'optimal' },
// { name: 'Warm (78°F to 85°F)', value: 'warm' },
// { name: 'Hot (86°F to 96°F)', value: 'hot' },
// { name: 'Extreme (97°F+)', value: 'extreme' },

const accessories = [
  {
    name: 'Cap',
    apparelGroup: 'accessories',
    type: 'cap',
    weather: ['optimal', 'warm', 'hot', 'extreme', 'cool'],
  },
  {
    name: 'Sunglasses',
    apparelGroup: 'accessories',
    type: 'cap',
    weather: ['extremely-cold', 'cold', 'cool', 'optimal', 'warm', 'hot', 'extreme'],
  },
];

const top = [
  {
    name: 't-shirt',
    apparelGroup: 'top',
    type: 't-shirt',
    weather: ['optimal', 'warm', 'hot', 'extreme'],
  },
  {
    name: 'Shirt',
    apparelGroup: 'top',
    type: 't-shirt',
    weather: ['optimal', 'warm'],
  },
  {
    name: 'Jacket',
    apparelGroup: 'top',
    type: 'jacket',
    weather: ['cool', 'cold', 'extremely-cold'],
  },
  {
    name: 'Hoodie',
    apparelGroup: 'top',
    type: 'hoodie',
    weather: ['cool', 'cold'],
  },
  {
    name: 'Coat',
    apparelGroup: 'top',
    type: 'coat',
    weather: ['cold', 'extremely-cold'],
  },
];

const bottom = [
  {
    name: 'Jeans',
    apparelGroup: 'bottom',
    type: 'jeans',
    weather: ['cool', 'cold', 'extremely-cold'],
  },
  {
    name: 'Skirt',
    apparelGroup: 'bottom',
    type: 'skirt',
    weather: ['cool', 'optimal', 'warm', 'hot', 'extreme'],
  },
  {
    name: 'Dress',
    apparelGroup: 'bottom',
    type: 'dress',
    weather: ['optimal', 'warm', 'hot'],
  },
  {
    name: 'Sport Pants',
    apparelGroup: 'bottom',
    type: 'shorts',
    weather: ['warm', 'hot', 'extreme'],
  },
];

const shoes = [
  {
    name: 'Sneakers',
    apparelGroup: 'shoes',
    type: 'sneaker',
    weather: ['optimal', 'warm', 'hot', 'extreme'],
  },
  {
    name: 'Boots',
    apparelGroup: 'shoes',
    type: 'boot',
    weather: ['cool', 'cold', 'extremely-cold'],
  },
];

const blankCard = {
  name: 'blank-card',
  apparelGroup: 'shoes',
  type: 'sneaker',
  weather: ['optimal', 'warm', 'hot', 'extreme'],
};

export { accessories, top, bottom, shoes, blankCard };
