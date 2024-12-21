const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Urls = {
  GET: '/data',
  POST: '/'
};

const sendRequest = async ({ method, onSuccess, onError, body}) => {
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
    onError();
  }
};

const showError = () => {
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

  messageAlert.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  document.body.append(messageAlert);

  setTimeout(() => {
    messageAlert.remove();
  }, 6000);
};

export const getData = (onSuccess) => sendRequest({
  method: 'GET',
  onSuccess,
  onError: showError
});

export const sendData = async (body, onSuccess, onError) => sendRequest({
  method: 'POST',
  onSuccess,
  onError,
  body
});
