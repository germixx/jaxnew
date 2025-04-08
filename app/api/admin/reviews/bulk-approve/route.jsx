// /app/api/reviews/bulk-approve/route.js
// import { reviewsDatabase } from '../../../lib/database'; // import your DB model

export async function POST(req) {
  try {
    const { reviewIds } = await req.json(); // Getting reviewIds from request body

    // Call your database method to bulk approve the reviews
    const updatedReviews = await reviewsDatabase.bulkApproveReviews(reviewIds);

    return new Response(
      JSON.stringify({ success: true, updatedReviews }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}