import { ReactNode, FC, useEffect, useRef } from "react";

interface ConfirmationModalProps {
//   children: ReactNode;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  content:string
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({content,handleConfirm, open, handleClose }) => {

  useEffect(() => {
   
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={` w-80 h-44 first-letter:max-w-screen-sm mx-auto my-auto  rounded-xl  bg-black inset-0 fixed z-20 bg-opacity-80`}
    > 
      <div className="mx-auto my-auto  max-w-full max-h-full  overflow-hidden p-4">
        <div className="flex justify-end ">
 
        </div>

        <div className="bg-bg-200 m-2 p-2 text-font-color-200 font-semibold italic">
         {content}
          </div>
          
      </div>
      <div className="flex justify-end gap-3 me-4">
      <div onClick={handleClose}
      className="bg-red-100 hover:cursor-default hover:bg-red-300 hover:font-semibold p-1">
        <span>Cancel</span>
      </div>
      
      <div onClick={handleConfirm}
      className="bg-green-100 hover:cursor-default hover:bg-green-300 hover:font-semibold p-1" >
        Confirm
      </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;