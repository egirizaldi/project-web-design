import React from 'react';

export default function Logo({ size = 32, className = 'brand-mark' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background Badge with Rounded Pebble Corner */}
      <rect width="40" height="40" rx="10" fill="var(--primary, #1B4332)" />
      
      {/* Terracotta Sun Node (Dawn of Responsible Travel) */}
      <circle cx="28.5" cy="11.5" r="3.2" fill="#B8512B" />
      
      {/* Distant Mountain Silhouette Layer */}
      <path
        d="M8 29.5L16 18L21.5 24.5L25.5 19.5L32 29.5H8Z"
        fill="#F8F5F0"
        fillOpacity="0.18"
      />
      
      {/* Organic Sprout Leaf (Lestari) */}
      <path
        d="M10 29.5C13 23.5 17 18.5 24.5 13.5C23.5 17.5 20.5 21.5 17.5 24.5C15.5 26.5 12.5 28.5 10 29.5Z"
        fill="#74C69D"
        fillOpacity="0.9"
      />
      
      {/* Ascending Trail Curve (The Way) */}
      <path
        d="M9.5 29.5C16 27.5 20 21.5 24.5 13.5C27 18.5 29 24.5 31.5 29.5"
        stroke="#F8F5F0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Trail Compass Beacon Point */}
      <circle cx="24.5" cy="13.5" r="1.6" fill="#F8F5F0" />
    </svg>
  );
}
