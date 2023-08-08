import React from "react";
import { Link } from "react-router-dom";
import './BookCard.css'
import { Col } from 'react-bootstrap';
import StarRating from "../../startRating/StarRating";

const BookCard = (props) => {
  const { title, shortDescription, rating, id, price, img } = props;
  return (
    <Col md={4} sm={6} xs={12}>
      <div className="card">
        <img src={img} alt={`book-${id}`} className="card__img" />
        <div className="card__body">
          <h3 className="card__title">{title}</h3>
          <p className="card__shortDescription">{shortDescription}</p>
          <h3 className="card__price">₹{price}</h3>
          <div className="star-rating">
            <StarRating rating={rating} />
          </div>
          <Link to={`/book/${id}`} className="card__btn">View Details</Link>
        </div>
      </div>
    </Col>
  );
};

export default BookCard;

