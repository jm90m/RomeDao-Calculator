import fromExponential from "from-exponential";

export const trim = (number: number = 0, precision?: number) => {
  const array = fromExponential(number).split(".");
  if (array.length === 1) return fromExponential(number);
  //@ts-ignore
  array.push(array.pop().substring(0, precision));
  const trimmedNumber = array.join(".");
  return trimmedNumber;
};

export const prettifySeconds = (seconds?: number, resolution?: string) => {
  if (seconds !== 0 && !seconds) {
    return "";
  }

  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (resolution === "day") {
    return d + (d == 1 ? " d" : " d");
  }

  const dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
  const hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? "m" : "m") : "";

  return dDisplay + hDisplay + mDisplay;
};

export const secondsUntilBlock = (startBlock: number, endBlock: number) => {
  return (endBlock - startBlock) * 7.75;
};

export const formatToUSD = (value: number) => {
  return value > 0
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      }).format(value)
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(0);
};

export const formatNumber = (value: string) => {
  return new Intl.NumberFormat("en-US").format(Number(value));
};

// export const toHHMMSS = function (sec) {
//   var sec_num = parseInt(sec, 10); // don't forget the second param
//   var hours = Math.floor(sec_num / 3600);
//   var minutes = Math.floor((sec_num - hours * 3600) / 60);
//   var seconds = sec_num - hours * 3600 - minutes * 60;
//
//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   return hours + ":" + minutes + ":" + seconds;
// };
