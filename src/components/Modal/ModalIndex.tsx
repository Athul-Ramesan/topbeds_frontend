import { ReactNode ,FC} from "react";

interface ModalIndexProps {
    children: ReactNode;
    open: boolean;
    handleClose: () => void;
  }

const ModalIndex :FC<ModalIndexProps>= ({children,open,handleClose}) => {

  if(!open){
    return null;
  }
  return (
    <div className="w-full h-screen bg-slate-600 inset-0 fixed top-0 left-0 z-20 bg-opacity-60 flex items-center justify-center">
    {children}
  </div>
  )
}

export default ModalIndex
