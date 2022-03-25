import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="🧻 T.P.O.F."
        subTitle="A place to rank toilet paper orientations, with your wallet!"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
