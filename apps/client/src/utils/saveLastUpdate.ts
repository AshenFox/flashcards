export const saveLastUpdate = () =>
  localStorage.setItem("lastUpdated", Date.now() + "");
