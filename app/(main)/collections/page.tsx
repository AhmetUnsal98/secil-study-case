import CollectionsTable from "@/app/components/CollectionsTable";
import React from "react";
import Head from "./Head";

const Collections = () => {
  return (
    <>
      <Head />
      <div className="flex items-center w-full h-full">
        <div className="w-3/4 bg-white mt-2 h-auto ml-16  sm:ml-22  md:ml-34 lg:58 xl:ml-58">
          <h2 className="m-8 mb-0 font-medium">
            Koleksiyonlar aşağıdaki tabloda listelenmiştir.{" "}
            {`(Filtre ve Koleksiyon api'lerinden eksik veri geldiği için koleksiyonlara ait renk,tag vs isimler map edilemedi.)`}
          </h2>
          <div className="w-full h-auto p-8 pt-2">
            {" "}
            <CollectionsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
