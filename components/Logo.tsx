"use client";
import Link from "next/link";
import { useState } from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {!imgFailed ? (
        <img
          src="/logo.png"
          alt="Ikarmic AI"
          width={160}
          height={36}
          className="h-9 w-auto"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-white font-bold text-xl tracking-tight">
          Ikarmic <span className="text-indigo-400">AI</span>
        </span>
      )}
    </Link>
  );
}
