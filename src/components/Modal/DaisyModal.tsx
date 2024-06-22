import React from 'react';

const DaisyModal: React.FC = () => {
    const showModal = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div>
            <button className="checkedbtn" onClick={showModal}>open modal</button>
            <dialog id="my_modal_5" className="checkedmodal modal-bottom sm:checkedmodal-middle">
                <div className="checkedmodal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="checkedmodal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="checkedbtn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DaisyModal;
