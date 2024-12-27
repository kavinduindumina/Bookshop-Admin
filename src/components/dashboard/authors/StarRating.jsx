import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StarRating = ({ driverId }) => {
  const [rating, setRating] = useState(0);

  // Fetch driver ratings from the API
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/ride/driver-ratings/${driverId}`)
      .then((response) => {
        const fetchedRating = response.data.message[0].rating; // Assuming the API returns the rating value in this structure
        setRating(fetchedRating);
        console.log('Driver rating:', fetchedRating);
      })
      .catch((error) => {
        console.error('Error fetching driver rating:', error);
      });
  }, []);

  // Calculate how many full, half, and empty stars are needed
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Determine the rating category based on the rating value
  const getCategory = (rating) => {
    if (rating >= 4.5) return "Top Rated";
    if (rating >= 3.5) return "Good";
    if (rating >= 2.5) return "Average";
    return "Below Average";
  };

  // Inline styles
  const starStyle = {
    color: "#FFD700", // Gold color for stars
    fontSize: "24px", // Size of the stars
    marginRight: "4px", // Space between stars
    transition: "transform 0.3s ease", // Add transition for hover effect
    cursor: "pointer", // Make stars interactive
  };

  const starRatingContainer = {
    display: "flex", // Align stars horizontally
    alignItems: "center", // Align stars and text vertically in the center
    justifyContent: "center", // Center align stars and label
    flexDirection: "row", // Display stars and label in a row
    padding: "10px", // Padding around the stars
    borderRadius: "8px", // Rounded corners for a clean look
  };

  const labelStyle = {
    fontSize: "16px", // Size of the category label
    fontWeight: "bold", // Bold font for emphasis
    marginLeft: "15px", // Space between stars and label
    color: "#333", // Dark text color
  };

  return (
    <div style={starRatingContainer} title={`Rating: ${rating.toFixed(1)} / 5`}>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <i 
          key={index} 
          className="fas fa-star" 
          style={starStyle} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} // Scale up on hover
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset scale
        ></i>
      ))}
      {/* Render half star if needed */}
      {hasHalfStar && (
        <i 
          className="fas fa-star-half-alt" 
          style={starStyle}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        ></i>
      )}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <i 
          key={index} 
          className="far fa-star" 
          style={starStyle} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        ></i>
      ))}
      
      {/* Display rating category */}
      <div style={labelStyle}>
        {getCategory(rating)}
      </div>
    </div>
  );
};

export default StarRating;
