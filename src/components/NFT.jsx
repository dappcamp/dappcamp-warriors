import React from "react";

export default function NFT({ imageUrl, tokenId, owner }) {
  return (
    <div className="col-span-12 box-border border-0 border-solid border-neutral-200 text-sm leading-5 duration-300 sm:col-span-6 lg:col-span-3">
      <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
        <img
          className="w-full object-cover object-center md:h-36 lg:h-48"
          src={imageUrl}
          alt="blog"
        />
        <div className="p-6">
          <h1 className="title-font mb-3 text-lg font-medium text-gray-900">
            WARRIOR #{tokenId}
          </h1>
          <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-900">
            OWNER
          </h2>
          <p
            className="mb-3 leading-relaxed"
            style={{
              maxWidth: "60%",
              wordBreak: "break-word",
            }}
          >
            {owner}
          </p>
        </div>
      </div>
    </div>
  );
}
