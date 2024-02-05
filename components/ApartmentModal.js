import React, { useState } from "react";
import ApartmentSearchForm from "./ApartmentSearchForm2";

const ApartmentModal = () => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Help me find an apartment
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Let's help you find an apartment
          </h3>
          <p className="py-4">Tells us what your are looking for</p>
          <ApartmentSearchForm />
        </div>
      </dialog>
    </>
  );
};

export default ApartmentModal;
