import fs from "fs";
import path from "path";

export async function GET(req) {
  const baseUrl = "https://jacksonvillians.com"; // Replace with your site's domain

  // Example: Fetching blog posts from a database or CMS
  const blogPosts = []; // Replace this with dynamic fetching logic (e.g., from a database or CMS)

  // Dynamically generate URLs for static pages in your app (excluding dynamic pages and API routes)
  const staticPages = fs
    .readdirSync(path.join(process.cwd(), "app"))
    .filter((file) => !file.startsWith("_") && file !== "api")
    .map((page) => {
      const pathName = page.replace(".js", "").replace("index", "");
      return `${baseUrl}/${pathName}`;
    });

  // Combine static pages and dynamic blog post URLs
  const allPages = [
    ...staticPages,
    ...blogPosts.map((post) => `${baseUrl}/blog/${post.slug}`),
  ];

  // Generate the sitemap XML structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  // Return the generated sitemap with the correct Content-Type header
  return new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}