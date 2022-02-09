function findAccountById(accounts, id) {
  const findAccount = accounts.find((account) => account.id === id)
  return findAccount;
}

function sortAccountsByLastName(accounts) {
  const sortByLast = accounts.sort((accountA, accountB) => 
  accountA.name.last > accountB.name.last ? 1 : -1)
  return sortByLast;
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++){
      if (books[i].borrows[j].id === account.id) {
        counter++;
      }
    }
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors) {
 let booksAccount = [];
 let matchingBorrow = [];
 books.forEach((key) => {
  const borrowed = key.borrows;
  const book = {
   id: key.id,
   title: key.title,
   genre: key.genre,
   authorId: key.authorId,
   author: {},
   borrows: {}
  };
  const { id, title, genre, authorId, author, borrows } = book;

  borrowed.forEach((borrow) => {
   if (borrow.id === account.id && borrow.returned === false) {
    booksAccount.push(book);
    matchingBorrow.push(borrow);
    book.borrows = matchingBorrow;
    book.author = authors.filter((auth) => auth.id === book.authorId)[0];
   }
  });
 });
 return booksAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
