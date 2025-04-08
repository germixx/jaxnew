// /app/api/reviews/approve/[id]/route.js
// import { reviewsDatabase } from '../../../../lib/database'; // Import your DB utilities

export async function POST({ params }) {
  const { id } = params; // Get review ID from URL params

  try {
    // Call your database method to approve the review by ID
    await reviewsDatabase.approveReview(id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}