import { ReactNode, FC, useEffect, useRef } from "react";

interface ModalIndexProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

const ModalIndex: FC<ModalIndexProps> = ({ children, open, handleClose }) => {

  useEffect(() => {
   
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className=" w-auto h-96 max-w-screen-sm max-h-screen mx-auto my-auto  rounded-xl  bg-black inset-0 fixed z-20 bg-opacity-80"
    > 
      <div className="mx-auto my-auto  max-w-full max-h-full  overflow-hidden p-4">
        <div className="flex justify-end ">
        <button
          className=" bg-primaryColor hover:   text-white px-4 py-1 rounded"
          onClick={handleClose}
        >
          close
        </button>
        </div>
        <div className="p-6">
          {children}
          </div>
      </div>
    </div>
  );
};

export default ModalIndex;