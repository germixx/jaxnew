// /app/api/reviews/[id]/route.js
// import { reviewsDatabase } from '../../../lib/database';

export async function DELETE({ params }) {
  const { id } = params; // Get review ID from the URL params

  try {
    // Call your database method to delete the review by its ID
    await reviewsDatabase.deleteReview(id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}