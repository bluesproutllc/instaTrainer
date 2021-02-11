import Cookies from 'js-cookie';

export const isLoggedIn = () => {
  return Cookies.get('ssid');
}

export const isTrainer = () => {
  return Cookies.get('ssid').includes('trainer');
}