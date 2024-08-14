export const addComma = (nbr) => {
  const nbrToString = nbr.toString();
  let nbrWithComma = "";
  for (let i = 0; i < nbrToString.length; i++) {
    if ((i + 1 - nbrToString.length) % 3 == 0) {
      nbrWithComma += `${nbrToString[i]},`;
    } else {
      nbrWithComma += nbrToString[i];
    }
  }
  return nbrWithComma.slice(0, nbrWithComma.length - 1);
};
