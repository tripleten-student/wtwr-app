//Images of clothes
import blueJacket from '../images/Clothes/men-blue-jacket.png';
import menZipUpBomberJacket from '../images/Clothes/men-zip-up-bomber-jacket.png';
import menSolidBabyPinkPoloShirt from '../images/Clothes/men-solid-baby-pink-polo-shirt.png';
import menBlackFootedSandals from '../images/Clothes/men-black-footbed-sandals.png';
import womenFauxLeatherBlockHeels from '../images/Clothes/women-faux-leather-open-toe-slip-on-block-heels.png';
import womenCharcoalGrayCropTop from '../images/Clothes/women-charcoal-gray-crop-top.png';
import womenAustinSweatshirt from '../images/Clothes/women-printed-sweatshirt-austin.png';
import letterBaseballCap from '../images/Clothes/letter-embroidered-baseball-cap.png';
import womenBeaniesAndGloves from '../images/Clothes/women-peach-beanies-and-gloves.png';
import womenTieFrontCottonPants from '../images/Clothes/tie-front-cotton-linen-pants.png';

//Images of Users
import eliseAvatar from '../images/Avatars/elise.png';

const clothes = [
  // Clothing types: Tops & outerwear, Bottoms, Accessories, Shoes
  // Weather: string, enum:['hot', 'warm', 'moderate', 'cold', 'freezing']
  {
    name: 'Blue Jacket',
    type: 'jacket',
    apparelGroup: 'Tops & outerwear',
    weather: 'cold',
    imageUrl: blueJacket,
    owner: 'user#1',
    isLiked: true,
    createdAt: '',
  },
  {
    name: 'Men Zip Up Bomber Jacket',
    type: 'jacket',
    apparelGroup: 'Tops & outerwear',
    weather: 'cool',
    imageUrl: menZipUpBomberJacket,
    owner: 'user#1',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'Men Solid Baby Pink Polo Shirt',
    type: 'shirt',
    apparelGroup: 'Tops & outerwear',
    weather: 'hot',
    imageUrl: menSolidBabyPinkPoloShirt,
    owner: 'user#1',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'Men Black Footbed Sandals',
    type: 'snikers',
    apparelGroup: 'Shoes',
    weather: 'hot',
    imageUrl: menBlackFootedSandals,
    owner: 'user#1',
    isLiked: true,
    createdAt: '',
  },
  {
    name: 'Faux Leather Open Toe Slip On Block Heels',
    type: 'snikers',
    apparelGroup: 'Shoes',
    weather: 'optimal',
    imageUrl: womenFauxLeatherBlockHeels,
    owner: 'user#2',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'Women Charcoal Gray Crop Top',
    type: 't-shirt',
    apparelGroup: 'Tops & outerwear',
    weather: 'warm',
    imageUrl: womenCharcoalGrayCropTop,
    owner: '',
    isLiked: true,
    createdAt: 'user#2',
  },
  {
    name: 'Fot Extreme Weather',
    type: 't-shirt',
    apparelGroup: 'Tops & outerwear',
    weather: 'extreme',
    imageUrl: womenCharcoalGrayCropTop,
    owner: '',
    isLiked: true,
    createdAt: 'user#2',
  },
  {
    name: 'Women Printed Sweatshirt Austin',
    type: 'sweatshirt',
    apparelGroup: 'Tops & outerwear',
    weather: 'cold',
    imageUrl: womenAustinSweatshirt,
    owner: 'user#2',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'Letter Embroidered Baseball Cap',
    type: 'cap',
    apparelGroup: 'Accessories',
    weather: 'hot',
    imageUrl: letterBaseballCap,
    owner: 'user#2',
    isLiked: true,
    createdAt: '',
  },
  {
    name: 'Cool gloves',
    type: 'gloves',
    apparelGroup: 'Accessories',
    weather: 'cool',
    imageUrl: womenBeaniesAndGloves,
    owner: 'user#2',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'For Cold Weather',
    type: 'gloves',
    apparelGroup: 'Accessories',
    weather: 'cold',
    imageUrl: womenBeaniesAndGloves,
    owner: 'user#2',
    isLiked: false,
    createdAt: '',
  },
  {
    name: 'Extreme Cold',
    type: 'gloves',
    apparelGroup: 'Accessories',
    weather: 'extremely cold',
    imageUrl: womenBeaniesAndGloves,
    owner: 'user#2',
    isLiked: false,
    createdAt: '',
  },
  // {
  //   name: 'Tie Front Crop Wide Leg Cotton & Linen Pants',
  //   type: 'Bottoms',
  //   apparelGroup: 'Bottoms',
  //   weather: 'warm',
  //   imageUrl: womenTieFrontCottonPants,
  //   owner: 'user#2',
  //   isLiked: true,
  //   createdAt: '',
  // },
];

const users = [
  {
    id: 'user#1',
    email: 'terrence@email.com',
    password: 'terrence1234',
    name: 'Terrence Tegegne',
    avatar: '',
  },
  {
    id: 'user#2',
    email: 'elise@email.com',
    password: 'elise1234',
    name: 'Elise Bouner',
    avatar: eliseAvatar,
  },
];

export { users, clothes };
