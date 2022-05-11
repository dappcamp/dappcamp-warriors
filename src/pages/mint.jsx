import React from "react";

import Layout from "../components/Layout";

export default function Mint() {
  return <div className="p-4">Mint</div>;
}

Mint.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
