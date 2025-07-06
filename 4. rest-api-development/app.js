const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
];

//intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

//get all books
app.get("/get", (req, res) => {
  res.json(books);
});

//get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found! Please try with a different Book ID",
    });
  }
});

//add a new book
app.post("/add", (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
    title: `Book ${Math.floor(Math.random() * 1000)}`,
  };

  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "New book is added successfully",
  });
});

//update a book
app.put("/update/:id", (req, res) => {
  const findCurrentBook = books.find(
    (bookItem) => bookItem.id === req.params.id
  );
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;

    res.status(200).json({
      message: `Book with ID ${req.params.id} updated successfully`,
      data: findCurrentBook,
    });
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const findIndexOfCurrentBook = books.findIndex(
    (item) => item.id === req.params.id
  );
  if (findIndexOfCurrentBook !== -1) {
    const deletedBook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      message: "Book deleted successfully",
      data: deletedBook[0],
    });
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});


// In Node.js (especially when working with frameworks like Express.js), req and res are the two most important objects used to handle HTTP requests and responses.

// 1. req (Request Object)
// Purpose: Represents the HTTP request made by the client (browser, API client, etc.) to your server.
// Contains: All information about the incoming request.
// Key Properties and Methods:

// req.url – The path of the request (e.g., /users/42).
// req.method – The HTTP method (e.g., GET, POST).
// req.headers – An object containing all request headers.
// req.body – Data sent in the request body (available with middleware like express.json() for POST/PUT requests).
// req.query – Query string parameters, e.g., /search?q=books → { q: "books" }.
// req.params – Route parameters, e.g., /users/:id → { id: "42" }.
// req.cookies – Cookies sent by the client (if using a cookie parser).
// req.get(headerName) – Get a specific header value.
// Example:

// js
// app.post('/user/:id', (req, res) => {
//   console.log(req.method); // POST
//   console.log(req.url); // /user/123
//   console.log(req.params); // { id: '123' }
//   console.log(req.body); // { name: 'Alice' }
// });
// 2. res (Response Object)
// Purpose: Used to construct and send the HTTP response back to the client.
// Controls: What gets sent (data, status codes, headers, etc.)
// Key Properties and Methods:

// res.send(data) – Sends a response (text, HTML, JSON, etc.).
// res.json(obj) – Sends a JSON response.
// res.status(code) – Sets the HTTP status code (e.g., res.status(404)).
// res.set(headerName, value) – Sets a specific header.
// res.redirect(url) – Redirects the client to a different URL.
// res.end() – Ends the response process (useful for streams).
// res.render(view, data) – Renders a template (if using a view engine).
// Example:

// js
// app.get('/hello', (req, res) => {
//   res.status(200).send('Hello, World!');
// });
// In Summary
// req = Everything about the inbound request from the client.
// res = Everything you use to build and send the server’s response.
