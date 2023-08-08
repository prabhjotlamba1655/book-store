import React from 'react';
import './StarRating.css'

const StarRating = ({ rating }) => {
  const maxRating = 5;
  const filledStars = Math.round(rating);
  const emptyStars = maxRating - filledStars;

  const filledStar = '★';
  const emptyStar = '☆';

  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="star-filled">
          {filledStar}
        </span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star-empty">
          {emptyStar}
        </span>
      ))}
    </div>
  );
};

export default StarRating;