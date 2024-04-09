import React, { useEffect } from 'react';

const Modal = ({ SinglePackage, closeModal }) => {
  useEffect(() => {
    const modal = document.getElementById('my_modal_1');
    modal.showModal();

    // Close the modal when the button is clicked
    

    // Cleanup event listener when component unmounts

  }, [closeModal]);

  const handleCloseModal = () => {
    const modal = document.getElementById('my_modal_1');
    modal.close();
    closeModal();
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box flex flex-col">
      <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">This Package's name is <span className='text-red-400'>{SinglePackage.packagename}</span></h2>
    <h2 className="card-title">Destination: <span className='text-red-400'>{SinglePackage.destination}</span></h2>
  </div>
  <figure><img src={SinglePackage.image} alt="Shoes" /></figure>
</div>
        <div className="modal-action">
          <form method="dialog">
            {/* If there is a button in form, it will close the modal */}
            <button className="btn btn-primary" onClick={handleCloseModal}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
