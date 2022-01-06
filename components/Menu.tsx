import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Menu() {
  const router = useRouter();
  const isOnAbout = router?.pathname?.includes("about");

  return (
    <div className="flex items-center justify-center mt-4">
      <p className="mr-4">
        {isOnAbout ? (
          <Link href="/">Calculator</Link>
        ) : (
          <span className="text-rose-600">Calculator</span>
        )}
      </p>
      <p className="mr-4">
        {isOnAbout ? (
          <span className="text-rose-600">About</span>
        ) : (
          <Link href="/about">About</Link>
        )}
      </p>
    </div>
  );
}

export default Menu;
