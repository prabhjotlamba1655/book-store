import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Header from "../header/Header";
import StarRating from "../startRating/StarRating";
import Reviews from "./reviews/Reviews";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://ec2-13-51-161-226.eu-north-1.compute.amazonaws.com:5000/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data.data))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id , book ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://ec2-13-51-161-226.eu-north-1.compute.amazonaws.com:5000/api/books/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBook((prevBook) => ({
          ...prevBook,
          reviews: [...prevBook.reviews, data.review],
        }));
        setDescription("");
        setRating();
        setShowModal(false);
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  if (!book) {
    return <div>Loading...</div>;
  }
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container style={{ maxWidth: 1400 }}>
      <Header title="Books Details" />
      <Row>
        <Col md={4}>
          <div className="item">
            <img
              src={book.img}
              alt={`${book.title} Cover`}
              className="img-fluid custom-img"
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="details">
            <div className="product-name">{book.title}</div>
            <Row className="product-rating">
              <Col xs="auto">
                <StarRating rating={book.rating} />
              </Col>
              <Col xs="auto">
                <p className="mb-0 product-review">Reviews</p>
              </Col>
            </Row>
            <p>{book.description}</p>
            <p className="product-author"> Author Name: {book.authorName}</p>
            <div className="product-price"> ₹{book.price}</div>
            <Button variant="primary" onClick={handleModalOpen}>
              Add Review
            </Button>
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="product-author">
                      Would you Like to recommend to read this book
                    </div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="rating">Rating</label>
                    <input
                      type="number"
                      id="rating"
                      className="form-control"
                      placeholder="Rating"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      min="1"
                      max="5"
                    />
                  </div>
                  <Button variant="primary" type="submit">
                    Add Review
                  </Button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </Col>
        <Reviews reviews = {book?.reviews} />
      
      </Row>
    </Container>
  );
};

export default BookDetails;
