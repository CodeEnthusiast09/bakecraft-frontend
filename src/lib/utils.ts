export const addCommaToNumber = (
  val: number | string,
  includeTrailingZeros: boolean = false
) => {
  if (val === "" || val === ".") return val;

  let [wholePart, decimalPart] = String(val)?.replaceAll(",", "").split(".");

  wholePart = new Intl.NumberFormat().format(Number(wholePart));

  if (decimalPart !== undefined) {
    if (includeTrailingZeros) {
      decimalPart = decimalPart.padEnd(2, "0");
    } else {
      // decimalPart = decimalPart.replace(/0+$/, "");
      // if (decimalPart === "") {
      if (val?.toString().includes(".") && !decimalPart) {
        return `${wholePart}.`;
      } else if (val?.toString().includes(".") && decimalPart !== "00") {
        return `${wholePart}.${decimalPart}`;
      } else {
        return wholePart;
      }
      // }
    }
    return `${wholePart}.${decimalPart}`;
  } else {
    return wholePart;
  }
};
