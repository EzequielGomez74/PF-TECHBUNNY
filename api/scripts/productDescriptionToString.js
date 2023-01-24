function productDescriptionToString(description) {
  let result = "";
  for (let i = 0; i < description.length; i++) {
    switch (Object.keys(description[i])[0]) {
      case "p":
        result += `##2${Object.values(description[i])[0]}`;
        break;
      case "br":
        result += "##4";
        break;
      case "ul":
        result += "##3";
        Object.values(description[i])[0].forEach((li) => {
          result += `##1${li}`;
        });
        break;
      default:
        break;
    }
  }
  return result;
}

// const description = [
//   {
//     p: "Descripción",
//   },
//   {
//     br: null,
//   },
//   {
//     br: null,
//   },
//   {
//     ul: [
//       "Gabinete Combo con Fuente y Periféricos ",
//       "Mother Gigabyte / Biostar A320 – Sata III – USB 3.0 ",
//       "Procesador AMD Athlon 3000G ",
//       "3,5Ghz 2 núcleos – 4 hilos ",
//       "Memoria 8Gb DDR4 2666mhz ",
//       "Disco SSD 240Gb ",
//       "Gráficos Radeon™ Vega 3",
//     ],
//   },
// ];

module.exports = { productDescriptionToString };
