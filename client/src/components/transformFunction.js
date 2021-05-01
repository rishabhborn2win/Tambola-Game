export const transform = (n, gameid) => {
  var number = n;

  var output = [];
  var sNumber = number.toString();

  for (var i = 0, len = sNumber.length; i < len; i += 1) {
    output.push(+sNumber.charAt(i));
  }
  var numString = "";
  output.map((num) => {
    if (num === 1) return (numString += "1️⃣");
    if (num === 2) return (numString += "2️⃣");
    if (num === 3) return (numString += "3️⃣");
    if (num === 4) return (numString += "4️⃣");
    if (num === 5) return (numString += "5️⃣");
    if (num === 6) return (numString += "6️⃣");
    if (num === 7) return (numString += "7️⃣");
    if (num === 8) return (numString += "8️⃣");
    if (num === 9) return (numString += "9️⃣");
    if (num === 0) return (numString += "0️⃣");
  });
  if (numString === "0️⃣")
    numString = `Game Is about to begin! Please Join The room (GameID: ${gameid} ) ASAP! https://tambola-numbers.herokuapp.com/join`;
  return numString;
};
