import React from "react";

import Layout from "../components/Layout";

export default function Home() {
  return <div className="p-4"></div>;
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
