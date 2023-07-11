export const fechaYMD = () => {
  let date = new Date(Date.now());
  // let y = date.getFullYear(),
  //   m = date.getMonth() + 1,
  //   d = date.getDate();
  var fecha = date.toLocaleDateString("en-EN");
  var now = date.toLocaleTimeString("es-ES");

  return `${fecha} ${now}`;
};
