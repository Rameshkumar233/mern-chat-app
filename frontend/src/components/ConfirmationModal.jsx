const ConfirmationModal = ({ title, message, openModal, setOpenModal, handleDelete, selectedMessages }) => {
    const handleConfirm = () => {
        handleDelete();
        setOpenModal(false);
    };
    return (
        <>
            <dialog
                open={openModal}
                className={`backdrop-blur-sm modal bg-opacity-50 bg-base-300 ml-0`}>
                <div className='modal-box'>
                    <h3 className='text-lg font-bold'>{title}</h3>
                    <p className='py-4'>{message}</p>
                    <div className='mt-0 space-x-6 modal-action'>
                        <button
                            type='submit'
                            className='btn btn-sm btn-error'
                            onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button
                            className='btn btn-sm btn-primary'
                            onClick={() => {
                                setOpenModal(false);
                                selectedMessages.clear();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ConfirmationModal;
