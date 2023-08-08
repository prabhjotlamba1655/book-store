import React from 'react'
import './Reviews.css'
import { Col, Row } from 'react-bootstrap'
import StarRating from '../../startRating/StarRating'

const Reviews = (props) => {
    const {reviews} = props
  return (
    <div className="reviews">
        <h3>Reviews</h3>
          {reviews.map((review) => (
            <Row key={review.id} className="reviews-container">
              <Col xs="auto">
                <StarRating rating={review.rating} />
              </Col>
              <Col xs="auto">
                <p className="mb-0 product-reviews">{review.rating}/5</p>
              </Col>
              <Col xs="auto">
                <p className="mb-0 product-reviews">{review.comment}</p>
              </Col>
            </Row>
          ))}
      </div>
  )
}

export default Reviews