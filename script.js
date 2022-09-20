const bookList = document.querySelector('.book-list');
const form = document.querySelector('#book-form');

// book collection
let collection = [];

/**
 * Renders all the books in the array to the UI
 * @param {string, string, number} title, author, bookId
 */function addToBookList(title, author, bookId) {
  // create all necessary variables
  const bookTitle = document.createElement('p');
  bookTitle.innerText = title;
  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = author;
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  const hr = document.createElement('hr');

  // create container and append all these
  const bookContainer = document.createElement('div');
  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(bookAuthor);
  bookContainer.appendChild(removeBtn);
  bookContainer.appendChild(hr);
  // append all this to the book list div element
  bookList.appendChild(bookContainer);

  // removing a book and updating the collection array
  removeBtn.addEventListener('click', () => {
    bookList.removeChild(bookContainer);
    // update collection
    collection = collection.filter((obj) => obj.bookId !== bookId);
    // update local storage
    localStorage.setItem('books', JSON.stringify(collection));
  });
}
// get all the data from the local storage and add it to the book list;
const booksOnLocalStorage = JSON.parse(localStorage.getItem('books'));
if (booksOnLocalStorage !== null) {
  collection = [...booksOnLocalStorage];
  collection.forEach((book) => {
    addToBookList(book.title, book.author, book.bookId);
  });
}

const addBook = () => {
  const titleReceived = document.getElementById('title').value;
  const authorReceived = document.getElementById('author').value;
  const book = {
    title: titleReceived,
    author: authorReceived,
    bookId: collection.length,
  };
  collection.push(book);
  // update the local storage
  localStorage.setItem('books', JSON.stringify(collection));
};
