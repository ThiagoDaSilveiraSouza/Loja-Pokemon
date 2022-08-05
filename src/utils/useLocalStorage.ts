export const getLocalStorage = <T>(key: string) => {
  const localStorageDataString = localStorage.getItem(key);
  if (localStorageDataString) {
    const localStorageDataJSON: T = JSON.parse(localStorageDataString);

    return localStorageDataJSON;
  }
  return []
};

export const saveLocalStorage = <T>(key: string, data: T) => {
  const dataStrinfyed = JSON.stringify(data);
  localStorage.setItem(key, dataStrinfyed);
};
