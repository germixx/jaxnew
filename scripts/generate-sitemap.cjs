const fs = require("fs");

const baseUrl = "https://jacksonvillians.com";
const staticPages = ["", "about", "blog", "contact"];
const dynamicPages = ["blog/post-1", "blog/post-2", "blog/post-3"];

const urls = [...staticPages, ...dynamicPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map((url) => {
            return `
            <url>
                <loc>${baseUrl}/${url}</loc>
                <changefreq>daily</changefreq>
                <priority>${url === "" ? 1.0 : 0.8}</priority>
            </url>`;
        })
        .join("")}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemap, "utf8");