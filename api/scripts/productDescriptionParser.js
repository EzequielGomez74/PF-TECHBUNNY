function productDescriptionParser(description) {
  const splitDesc = description.split("##");
  const result = [];
  let ulRef;
  for (let i = 1; i < splitDesc.length; i++) {
    const element = splitDesc[i];
    switch (element[0]) {
      case "1":
        ulRef.ul.push(splitDesc[i].slice(1));
        break;
      case "2":
        result.push({ p: splitDesc[i].slice(1) });
        break;
      case "3":
        ulRef = { ul: [] };
        result.push(ulRef);
        break;
      case "4":
        result.push({ br: null });
        break;
      default:
        break;
    }
  }
  return result;
}

module.exports = { productDescriptionParser };
