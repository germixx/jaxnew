// /app/api/reviews/export/route.js
import { reviewsDatabase } from '../../../lib/database';
import { parse } from 'json2csv'; // Use json2csv or any CSV conversion method

export async function GET() {
  try {
    // Fetch all reviews from the database
    const reviews = await reviewsDatabase.getAllReviews();

    // Convert reviews to CSV format
    const csv = parse(reviews);

    // Set headers to download the CSV
    const headers = {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=reviews_export.csv',
    };

    return new Response(csv, { status: 200, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}