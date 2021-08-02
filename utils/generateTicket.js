//logic behind generation of the ticket is filling all the fields of the tickets and then removing the unwantted numbers such that
// the logic of the ticket doesn't get disturbed

//fixing first row
//accordingly to the first row we will be arranging the second row
//and the third row will be the final

exports.generateTicket = async () => {
  //firstly create a  array with the unique 27 number according to the coloumn
  var reqArray = [];

  //code for all the coloums
  reqArray = [
    generateUniqueSortedNumbers(3, 1, 9),
    generateUniqueSortedNumbers(3, 10, 19),
    generateUniqueSortedNumbers(3, 20, 29),
    generateUniqueSortedNumbers(3, 30, 39),
    generateUniqueSortedNumbers(3, 40, 49),
    generateUniqueSortedNumbers(3, 50, 59),
    generateUniqueSortedNumbers(3, 60, 69),
    generateUniqueSortedNumbers(3, 70, 79),
    generateUniqueSortedNumbers(3, 80, 90),
  ];
  //creating the ticket as we want
  var ticket = [
    [
      reqArray[0][0],
      reqArray[1][0],
      reqArray[2][0],
      reqArray[3][0],
      reqArray[4][0],
      reqArray[5][0],
      reqArray[6][0],
      reqArray[7][0],
      reqArray[8][0],
    ],
    [
      reqArray[0][1],
      reqArray[1][1],
      reqArray[2][1],
      reqArray[3][1],
      reqArray[4][1],
      reqArray[5][1],
      reqArray[6][1],
      reqArray[7][1],
      reqArray[8][1],
    ],
    [
      reqArray[0][2],
      reqArray[1][2],
      reqArray[2][2],
      reqArray[3][2],
      reqArray[4][2],
      reqArray[5][2],
      reqArray[6][2],
      reqArray[7][2],
      reqArray[8][2],
    ],
  ];

  //eliminating the numbers which are not required

  //conditions
  //remove any four numbers from each row S.T no three numbers can't be consecutive
  //for 1st row
  //selecting any valid five numbers between 0-8
  var accepetedNumbersRowOne = await validSetRowOne();

  var indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  //now evaluate the index which has to be eliminated
  var rejectedNumbers = [];
  indexArray.map((num) => {
    if (accepetedNumbersRowOne.indexOf(num) === -1) {
      rejectedNumbers.push(num);
    }
  });

  //now finalising the first row
  rejectedNumbers.map((removeIndex) => {
    ticket[0][removeIndex] = 0;
  });

  //according to the first row now we will code for second line
  var accepetedNumbersRowTwo = await validSetRowTwo(accepetedNumbersRowOne);
  //now evaluate the index which has to be eliminated
  var rejectedNumbers = [];
  indexArray.map((num) => {
    if (accepetedNumbersRowTwo.indexOf(num) === -1) {
      rejectedNumbers.push(num);
    }
  });

  //now finalising the second row
  rejectedNumbers.map((removeIndex) => {
    ticket[1][removeIndex] = 0;
  });

  var accepetedNumbersRowThree = await validSetRowThree(
    accepetedNumbersRowOne,
    accepetedNumbersRowTwo
  );
  //now evaluate the index which has to be eliminated
  var rejectedNumbers = [];
  indexArray.map((num) => {
    if (accepetedNumbersRowThree.indexOf(num) === -1) {
      rejectedNumbers.push(num);
    }
  });

  //now finalising the third row
  rejectedNumbers.map((removeIndex) => {
    ticket[2][removeIndex] = 0;
  });
  // console.log(accepetedNumbersRowOne, accepetedNumbersRowTwo, accepetedNumbersRowThree)
  // console.log(ticket);

  return ticket;
};

function validSetRowOne() {
  var acceptedNumbers = generateUniqueSortedNumbers(5, 0, 8);
  // [2,3,5,6,8]
  //checking that the given number set is valid or not as no three numbers should be consecutive
  var isValid = consecutive(acceptedNumbers);
  while (!isValid) {
    acceptedNumbers = generateUniqueSortedNumbers(5, 0, 8);
    isValid = consecutive(acceptedNumbers);
  }
  return acceptedNumbers;
}

function validSetRowTwo(acceptedNumbersRowOne) {
  //check number of elements in first, second & third --- three coloum of row 1
  var countFirst = 0;
  var countSecond = 0;
  var countThird = 0;
  acceptedNumbersRowOne.map((num) => {
    if (num >= 0 && num <= 2) countFirst++;
    if (num >= 3 && num <= 5) countSecond++;
    if (num >= 6 && num <= 8) countThird++;
  });

  do {
    var acceptedNumbers = generateUniqueSortedNumbers(5, 0, 8);
    // [2,3,5,6,8]
    //checking that the given number set is valid or not as no three numbers should be consecutive
    var isValid = consecutive(acceptedNumbers);
    while (!isValid) {
      acceptedNumbers = generateUniqueSortedNumbers(5, 0, 8);
      isValid = consecutive(acceptedNumbers);
    }

    var countFirstRowTwo = 0,
      countSecondRowTwo = 0,
      countThirdRowTwo = 0;
    acceptedNumbers.map((num) => {
      if (num >= 0 && num <= 2) countFirstRowTwo++;
      if (num >= 3 && num <= 5) countSecondRowTwo++;
      if (num >= 6 && num <= 8) countThirdRowTwo++;
    });
  } while (
    (countFirst === 1 && countFirstRowTwo === 1) ||
    (countSecond === 1 && countSecondRowTwo === 1) ||
    (countThird === 1 && countThirdRowTwo === 1)
  );

  return acceptedNumbers;
}

function validSetRowThree(acceptedNumbersRowOne, acceptedNumbersRowTwo) {
  //check number of elements in first, second & third --- three coloum of row 1
  var countFirst = 0;
  var countSecond = 0;
  var countThird = 0;
  acceptedNumbersRowOne.map((num) => {
    if (num >= 0 && num <= 2) countFirst++;
    if (num >= 3 && num <= 5) countSecond++;
    if (num >= 6 && num <= 8) countThird++;
  });

  //check number of elements in first, second & third --- three coloum of row 2
  var countFirstRowTwo = 0,
    countSecondRowTwo = 0,
    countThirdRowTwo = 0;
  acceptedNumbersRowTwo.map((num) => {
    if (num >= 0 && num <= 2) countFirstRowTwo++;
    if (num >= 3 && num <= 5) countSecondRowTwo++;
    if (num >= 6 && num <= 8) countThirdRowTwo++;
  });

  //evaluating the colums which are empty
  var indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var indexFilled = merge_array(acceptedNumbersRowOne, acceptedNumbersRowTwo);
  var indexNotFilled = [];
  indexArray.map((num) => {
    if (indexFilled.indexOf(num) === -1) {
      indexNotFilled.push(num);
    }
  });

  if (indexNotFilled.length > 0) {
    acceptedNumbers = indexNotFilled;
  }

  var countFirstRowThree = 0,
    countSecondRowThree = 0,
    countThirdRowThree = 0;
  acceptedNumbers.map((num) => {
    if (num >= 0 && num <= 2) countFirstRowThree++;
    if (num >= 3 && num <= 5) countSecondRowThree++;
    if (num >= 6 && num <= 8) countThirdRowThree++;
  });

  var isValid = false;
  while (!isValid) {
    while (acceptedNumbers.length < 5) {
      //check which set of three coloums 5 numbers are left
      if (countFirst + countFirstRowTwo + countFirstRowThree < 5) {
        var flag = 1;
        while (flag === 1) {
          var randomIndex = generateUniqueSortedNumbers(1, 0, 2);
          if (acceptedNumbers.indexOf(randomIndex[0]) === -1) {
            acceptedNumbers.push(randomIndex[0]);
            countFirstRowThree++;
            flag = 0;
          }
        }
      }
      if (countSecond + countSecondRowTwo + countSecondRowThree < 5) {
        var flag = 1;
        while (flag === 1) {
          var randomIndex = generateUniqueSortedNumbers(1, 3, 5);
          if (acceptedNumbers.indexOf(randomIndex[0]) === -1) {
            acceptedNumbers.push(randomIndex[0]);
            countSecondRowThree++;
            flag = 0;
          }
        }
      }
      if (countThird + countThirdRowTwo + countThirdRowThree < 5) {
        var flag = 1;
        while (flag === 1) {
          var randomIndex = generateUniqueSortedNumbers(1, 6, 8);
          if (acceptedNumbers.indexOf(randomIndex[0]) === -1) {
            acceptedNumbers.push(randomIndex[0]);
            countThirdRowThree++;
            flag = 0;
          }
        }
      }
      acceptedNumbers.sort();
    }
    isValid = consecutive(acceptedNumbers);
  }

  return acceptedNumbers;
}

function generateUniqueSortedNumbers(n, min, max) {
  var arr = [];
  while (arr.length < n) {
    var r = Math.floor(Math.random() * max + 0.5);
    if (arr.indexOf(r) === -1 && r >= min && r <= max) arr.push(r);
  }
  arr.sort();
  return arr;
}

function consecutive(array) {
  var i = 2,
    d;
  while (i < array.length) {
    d = array[i - 1] - array[i - 2];
    if (Math.abs(d) === 1 && d === array[i] - array[i - 1]) {
      return false;
    }
    i++;
  }
  return true;
}

function merge_array(array1, array2) {
  var result_array = [];
  var arr = array1.concat(array2);
  var len = arr.length;
  var assoc = {};

  while (len--) {
    var item = arr[len];

    if (!assoc[item]) {
      result_array.unshift(item);
      assoc[item] = true;
    }
  }

  return result_array;
}
