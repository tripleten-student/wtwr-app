# Project Description

**Full-stack application.** Use the following frameworks:

- React.js
- Node.js + Express.js
- MongoDB + Mongoose

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

![screenshot of the main page](https://i.imgur.com/o2YE90w.png)

Your goal is to show clothes according to a weather forecast. For example, if it’s 5 °F outside and snowing, you shouldn’t recommend shorts and a t-shirt to the user.

When the user is not logged in, they see a home page with all parts visible, but without photos for clothing — just shapes representing each item. Users also have the option to switch the units for temperature from degrees Fahrenheit to Celsius. 

![screenshot of the navbar with a switcher highlighted](https://i.imgur.com/Jr1ee1f.png)

Login and registration forms should be modal windows. 

![screenshot with the login form](https://i.imgur.com/ctguYBS.png)

![screenshot with the registration form](https://i.imgur.com/YsF94LP.png)

Users can add new clothes via a form (that pops up as a modal window). Using the form, users can add a new item of clothing and set its name, type, weather conditions, and add a photo of it. There are two ways to access the interface to add new clothes, either click on a card without a clothes photo, i.e. one with a clothing silhouette, or click on a button labeled ‘+ Add clothes’. If the user clicks on a card that already has a photo of real clothes that were previously added, a new modal window with a picture and text data will appear.

You can take a list of clothing tags from the Figma design. Now you need to sort the clothes by temperature. For example, you can decide what to wear between 5°F and 20°F, 21°F and 35°F, and so on. Five ranges will be enough. You can name the ranges something like:

- hot
- warm
- moderate
- cold
- freezing

You are free to choose the values (in°F) that correspond with each temperature description.

## Components

### App

This root component shows what we connect and where we do it.

### Main

The main component includes the context provider and routers.

### Context

Context is an object with the main goal to share this object, like a state, between different layers of your app. We highly recommend you use binding hooks: useContext and useReducer. This object will contain information about the active temperature measure units (Celsius or Fahrenheit) and the response from the weather API, so you can provide an access to weather data to many components on different layers.

### Routes

We have two pages, therefore you only need to create routes for them. They are: homepage and user account.

## Home page

### Header

The header should include a logo, a temperature units switcher, a log-in/sign-up button, and if the user is signed in, a link to their account page.

### Weather cards (4 cards, one per apparel group: head, top, bottom, shoes)

A weather card is a component that makes a request to the WeatherAPI right after the first render, collects the data, and renders it on the top of the screen in a designated area. It also saves this data in a context.

We need to render the current weather icon background, i.e. sun/cloud/rain/etc, and the temperature, in Celsius or Fahrenheit, based on the user’s preference.

WeatherCards — a wrapper for WeatherCard.

### Temperature units toggle switch

This component is connected with the context and when the user clicks on it, we change the context and then render a new value from Context.

### Clothing item card (4)

A card with an image, a title, and a heart icon. The heart icon marks the item as a favorite. The system prioritizes favorite clothes, and if there is more than one match, displays one of them randomly. If nothing has been favorited, an image is chosen from other existing clothes. If there are no clothes of a particular type, e.g, we don’t have any t-shirts, it should render a default card with an appropriate apparel-shaped placeholder.

If this is a shape card, i.e. one without real clothes, it should have an ‘+ Add your photo’ button which launches a modal window — the same modal window that shows when creating new clothes, but in this case, all fields excluding photo URL are filled with card data.

Clicking on a real item of clothing should open a modal window containing a photo and clothing data, whereas clicking on the shape card should open the ‘Add photo’ modal window.  

### Footer

The footer should include year and copyright text.

## Modal Windows

**Important**: all modals must include three ways to close them: clicking outside of the modal content area, clicking on the close button, or pressing the ‘Escape’ button on a keyboard.

### Log In

This modal has an ‘email’ field, a ‘password’ field, and a button to switch to the register modal.

### Register

This modal has an ‘email’ field, ‘password’ and ‘password repeat’ fields, and a button to switch to log-in modal. This modal has a list of clothes tags (this is the second step of registration) that you prefer to prioritize in the future.

### Create Clothes/Add Photo

This modal has a ‘Name’ field, type selector, weather selector, and image URL field. The CTA (Call to Action) is an ‘Add garment’ button.

### Show Card

This modal has a large clothes photo and a title. Also, it has a heart icon to mark an item as ‘favorite’.

# Optional

- Saving the weather forecast in local storage to prevent requests every *n* seconds. You can check the time of the last request, and if it’s less than 15 minutes, use the previous forecast from local storage.
- Adding a URL input to the model window when a user adds clothes, to import an image from that URL. You can implement functionality that will load the photo as soon as the user inputs the URL and display it back to the user.