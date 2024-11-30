// Variables to hold rating state
let currentRating = 0;
let hoveredRating = 0;
let totalVotes = 57890;
let averageRating = 9.1; // Renamed variable

// Get all star elements
const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('ratingDisplay');
const votersCount = document.getElementById('votersCount');
const averageRatingDisplay = document.getElementById('averageRating'); // Renamed element

// Function to update star colors based on the current rating
function updateStars() {
  stars.forEach(star => {
    const starValue = parseFloat(star.getAttribute('data-value'));
    if (starValue <= currentRating) {
      star.classList.add('filled');
      star.classList.remove('hover');
    } else {
      star.classList.remove('filled');
    }
  });

  // Update rating display
  ratingDisplay.textContent = currentRating.toFixed(1);
}

// Function to update the average rating and voters count after each vote
function updateVoteStats() {
  // Here we calculate the new average rating based on the total votes
  totalVotes += 1; // Increase total votes by 1 for each new rating
  averageRating = ((averageRating * (totalVotes - 1)) + currentRating) / totalVotes; // Update average rating
  votersCount.textContent = totalVotes.toLocaleString(); // Update the number of voters
  averageRatingDisplay.textContent = averageRating.toFixed(1); // Update average rating display
}

// Handle mouseover for star hover effect
stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    hoveredRating = parseFloat(star.getAttribute('data-value'));
    stars.forEach(star => {
      const starValue = parseFloat(star.getAttribute('data-value'));
      if (starValue <= hoveredRating) {
        star.classList.add('hover');
      } else {
        star.classList.remove('hover');
      }
    });
  });

  // Handle mouseout to reset hover effect
  star.addEventListener('mouseout', () => {
    stars.forEach(star => star.classList.remove('hover'));
  });

  // Handle click to set rating
  star.addEventListener('click', () => {
    currentRating = parseFloat(star.getAttribute('data-value'));
    updateStars();
    updateVoteStats(); // Update votes and average rating
  });
});

// Initialize the stars
updateStars();
