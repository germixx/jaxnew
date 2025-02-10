"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((x) => x);

  return (
    <nav className="py-2 px-4 text-sm text-gray-600 rounded-md">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:text-blue-500">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
          const routeTo = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const formattedSegment = decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()); // Capitalize and format

          return (
            <li key={routeTo} className="flex items-center">
              <span className="mx-1">/</span>
              {!isLast ? (
                <Link href={routeTo} className="hover:text-blue-500">
                  {formattedSegment}
                </Link>
              ) : (
                <span className="text-gray-500">{formattedSegment}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;