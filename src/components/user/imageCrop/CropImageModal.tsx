import { FC, useState } from "react";
import { motion } from 'framer-motion';
import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

interface CropImageModalProps {
  setCroppedImage: (croppedImage: string) => void;
  closeModal: () => void;
}

const CropImageModal: FC<CropImageModalProps> = ({ setCroppedImage, closeModal }) => {
  const [cropLoading, setCropLoading] = useState(false);

  return (
    <motion.div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center">
          <motion.div
            className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={() => {
                  setCropLoading(false);
                  closeModal();
                }}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                cropLoading={cropLoading}
                setCropLoading={setCropLoading}
                setCroppedImage={setCroppedImage}
                closeModal={closeModal}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CropImageModal;


// import { FC, useState } from "react";
// import CloseIcon from "./CloseIcon";
// import ImageCropper from "./ImageCropper";
// // import ImageCropper from "./ImageCropper";

// interface CropImageModalProps {
//   setCroppedImage: (croppedImage: string) => void
//   closeModal: () => void
// }
// const CropImageModal: FC<CropImageModalProps> = ({ setCroppedImage, closeModal }) => {
//   const [cropLoading, setCropLoading] = useState(false)

//   return (
//     <div
//       className="relative z-10"
//       aria-labelledby="crop-image-dialog"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full justify-center px-2 py-12 text-center ">
//           <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
//             <div className="px-5 py-4">
//               <button
//                 type="button"
//                 className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
//                 onClick={
//                   ()=>{
//                     setCropLoading(false)
//                     closeModal()
//                   }
//                 }
//               >
//                 <span className="sr-only">Close menu</span>
//                 <CloseIcon />
//               </button>
//               <ImageCropper
//               cropLoading={cropLoading}
//                 setCropLoading={setCropLoading}
//                 setCroppedImage={setCroppedImage}
//                 closeModal={closeModal}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CropImageModal;
