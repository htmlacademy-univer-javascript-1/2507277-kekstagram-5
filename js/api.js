import { processThumbnails } from './thumbnails.js';

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Urls = {
  GET: '/data',
  POST: '/'
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const onError = (message) => {
  const messageAlert = document.createElement('div');
  Object.assign(messageAlert.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '20px',
    textAlign: 'center',
    zIndex: 10
  });

  messageAlert.textContent = message;
  document.body.append(messageAlert);

  setTimeout(() => {
    messageAlert.remove();
  }, 6000);
};

const sendRequest = async ({ method, onSuccess, body}) => {
  try {
    const response = await fetch(`${BASE_URL}${Urls[method]}`, {
      method,
      body,
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(ErrorText[method]);
  }
};

export const getData = () => sendRequest({
  method: 'GET',
  onSuccess: processThumbnails,
});

export const sendData = async (body, onSuccess) => sendRequest({
  method: 'POST',
  onSuccess,
  body
});
