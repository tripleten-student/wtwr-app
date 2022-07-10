function determineTimeOfTheDay(currentHour) {
  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else if (currentHour >= 17 && currentHour < 20) {
    return 'evening';
  } else {
    return 'overnight';
  }
}
export default determineTimeOfTheDay;
