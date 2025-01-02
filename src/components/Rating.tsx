import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const Rating = (props: {
  rating: number;
  numReviews?: number;
  caption?: string;
}) => {
  const { rating, numReviews, caption } = props;

  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon
          icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : farStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : farStar}
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : numReviews ? (
        <span>{numReviews} reviews</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Rating;

// const Rating = (props: {
//   rating: number;
//   numReviews?: number;
//   caption?: string;
// }) => {
//   const { rating, numReviews, caption } = props;
//   return (
//     <div className='rating'>
//       <span>
//         <i
//           className={
//             rating >= 1
//               ? "fas fa-star"
//               : rating >= 0.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         />
//       </span>
//       <span>
//         <i
//           className={
//             rating >= 2
//               ? "fas fa-star"
//               : rating >= 1.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         />
//       </span>

//       <span>
//         <i
//           className={
//             rating >= 3
//               ? "fas fa-star"
//               : rating >= 2.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         />
//       </span>

//       <span>
//         <i
//           className={
//             rating >= 4
//               ? "fas fa-star"
//               : rating >= 3.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         />
//       </span>

//       <span>
//         <i
//           className={
//             rating >= 5
//               ? "fas fa-star"
//               : rating >= 4.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         />
//       </span>

//       {caption ? (
//         <span>{caption}</span>
//       ) : numReviews != 0 ? (
//         <span>{"" + numReviews + " reviews"}</span>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };
