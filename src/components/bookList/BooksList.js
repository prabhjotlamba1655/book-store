import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import BookCard from "./bookCard/BookCard";
import "./BookList.css";
import { Button, Container, Row } from "react-bootstrap";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10; // Number of books to display per page

  const fetchBooks = (page) => {
    fetch(`/apiredirect/api/books?page=${page}&limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="books-list">
      <Header title="Book Listing" />
      <Container>
        <Row className="wrapper">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </Row>
      </Container>

      <div className="pagination">
        <Button
          variant= "primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
          variant= "primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BooksList;
