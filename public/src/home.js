function getTotalBooksCount(books) {
  return books.length;
}
// returns the .length of the books array
function getTotalAccountsCount(accounts) {
return accounts.length;
}
// returns the .length of the accounts array
function getBooksBorrowedCount(books) {
  let booksBorrowed = 0;
  //declared a counter 
  for (let i = 0; i < books.length; i++) {
    //loop through the books array and declare a new variable for the books index
    const bookArray = books[i];
    for (let j = 0; j < bookArray.borrows.length; j++) {
      //loop through the nested borrows array of objects
      if (bookArray.borrows[j].returned === false){
        booksBorrowed++;
      //if the borrows array has not been returned we are going to increase our counter booksBorrowed
      }
    }
  }
  return booksBorrowed;
  //this will return the updated counter with the amount of books that are currently checked out.
}
 /* Helper function that reduces and finds a specific property of an array and then creates a new array of objects based on that property, and each time
 that property is then passed through, instead of creating a new obj we are increasing the count of that obj. */
  function _reduceByProp(arr, key) {
    let newArr = arr.reduce((acc, prop) => {
      let keyExists = acc.find((item) => item.name === prop[key]);
      if (keyExists) {
        keyExists.count += 1;
      } else {
        let obj = {name: prop[key], count: 1 };
        acc.push(obj);
      }
      return acc;
    }, []);
    return newArr;
  }


  function getMostCommonGenres(books) {
    let countArr = _reduceByProp(books, "genre");
    return countArr.sort((keyA, keyB) => keyB.count - keyA.count).slice(0, 5);
  }
    //calls the helper function by the books array and the genre key. This creates an new array of objects like this:
  /*
  [
    { name: "Nonfiction", count: 4 },
    { name: "Historical Fiction", count: 5 },
    { name: "Thriller", count: 7 },
    ...
  ]
*/ 
//you then sort this new array by the count from most common to least and then takes the only top five count. 


function getMostPopularBooks(books) {
  let popBookArray = [];
  //create a new array 
  books.forEach((book) => {
    //for each book in this array we are going to push those to the new array in the form of objects
    popBookArray.push({
      'name': book.title,
      'count': book.borrows.length,
    });
  });
  return popBookArray.sort((bookA,bookB) => bookB.count - bookA.count).slice(0, 5);
  //for this array we are going to again sort by the top 5 most borrowed books and slice after the 5th most popular book.
}

function getMostPopularAuthors(books, authors) {
  let popularAuthor = [];
  //created an empty array
  books.forEach(book => {
    //loop through the books array
    authors.forEach(author => {
      //loop through the authors array
      if (book.authorId === author.id) {
        //if the book array's author id matches the authors array id we will push to a new object
        popularAuthor.push({
          'name': `${author.name.first} ${author.name.last}`,
          'count': book.borrows.length
        });
        /*Created two key-value pairs. The first for the author name, the second for the amount of times the book has been borrowed 
        and pushing this new object to the popularAuthorArray.*/
      }
    });
  });
 return popularAuthor.sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
}
//sorting the popularAuthor array based upon the number of times its been checked out which we can derive from the length of the borrows array.

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
