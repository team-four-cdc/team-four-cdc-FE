export const setToken = (value: string) => {
  localStorage.setItem('userToken', value);
};

export const getToken = () => {
  const userToken = localStorage.getItem('userToken');
  return userToken ? JSON.parse(userToken)?.token : null;
};
