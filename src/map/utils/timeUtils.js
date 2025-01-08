export const getBaseTime = () => {
  const now = new Date();
  now.setHours(now.getHours() - 1); 

  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}${minutes}`;
};
