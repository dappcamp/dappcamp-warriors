import React from "react";

export default function NFT({ imageUrl, title, currentOwner }) {
  return (
    <div className="p-4 md:w-1/3" key={imageUrl}>
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-64 md:h-64 w-full object-cover object-top border-0 border-b border-solid"
          src={imageUrl}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            TOKEN ID
          </h2>
          <p
            className="leading-relaxed mb-3"
            style={{
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
          >
            {title}
          </p>
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CURRENT OWNER
          </h2>
          <p
            className="leading-relaxed mb-3"
            style={{
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
          >
            {currentOwner}
          </p>
        </div>
      </div>
    </div>
  );
}
