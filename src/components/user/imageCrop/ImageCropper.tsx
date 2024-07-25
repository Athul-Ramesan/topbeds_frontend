import { ChangeEvent, FC, SyntheticEvent, useRef, useState } from "react";
import ReactCrop, {
    PercentCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { updateProfileImage } from "../../../redux/actions/userAction/updateProfileImage";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
    closeModal: () => void;
    setCroppedImage: (croppedImage: string) => void;
    setCropLoading : (state:boolean)=>void;
    cropLoading: boolean
}

const ImageCropper: FC<ImageCropperProps> = ({ closeModal, setCroppedImage ,setCropLoading ,cropLoading}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<PercentCrop>();
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={async () => {
              setCropLoading(true)
              if (!imgRef.current || !previewCanvasRef.current || !crop) return;

              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              console.log("🚀 ~ dataUrl:", dataUrl);

              const response = await dispatch(updateProfileImage({ _id: user?._id, image: dataUrl }));

              if (response.type === "user/update-profile-image/fulfilled") {
                console.log('inside response fulfilled crop modal');
                setCroppedImage(response.payload?.data?.profileImage);
                setCropLoading(false)
                closeModal();
              } else {
                setError(response.payload);
                setCropLoading(false)
              }
              console.log("🚀 ~ onClick={async ~ response:", response);
            }}
          >
            {cropLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;


// import { ChangeEvent, FC, SyntheticEvent, useRef, useState } from "react";
// import ReactCrop, {
//     PercentCrop,
//   centerCrop,
//   convertToPixelCrop,
//   makeAspectCrop,
  
// } from "react-image-crop";
// import setCanvasPreview from "./setCanvasPreview";
// import { useAppDispatch, useAppSelector } from "../../../redux/store";
// import { updateProfileImage } from "../../../redux/actions/userAction/updateProfileImage";



// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;

// interface ImageCropperProps {
//     closeModal:()=>void;
//     setCroppedImage:(croppedImage:string)=>void
// }

// const ImageCropper:FC<ImageCropperProps> = ({ closeModal, setCroppedImage, }) => {
//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState<string>("");
//   const [crop, setCrop] = useState<PercentCrop>();
//   const [error, setError] = useState<string>("");
//   const dispatch = useAppDispatch()
//   const {user} = useAppSelector(state=> state.user)

//   const onSelectFile = (e:ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//       const imageElement = new Image();
//       const imageUrl = reader.result?.toString() || "";
//       imageElement.src = imageUrl;

//       imageElement.addEventListener("load", (e:Event) => {
//         if (error) setError("");
//         const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
//         if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
//           setError("Image must be at least 150 x 150 pixels.");
//           return setImgSrc("");
//         }
//       });
//       setImgSrc(imageUrl);
//     });
//     reader.readAsDataURL(file);
//   };

//   const onImageLoad = (e:SyntheticEvent<HTMLImageElement>) => {
//     const { width, height } = e.currentTarget;
//     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

//     const crop = makeAspectCrop(
//       {
//         unit: "%",
//         width: cropWidthInPercent,
//       },
//       ASPECT_RATIO,
//       width,
//       height
//     );
//     const centeredCrop = centerCrop(crop, width, height);
//     setCrop(centeredCrop);
//   };
 
//   return (
//     <>
//       <label className="block mb-3 w-fit">
//         <span className="sr-only">Choose profile photo</span>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onSelectFile}
//           className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
//         />
//       </label>
//       {error && <p className="text-red-400 text-xs">{error}</p>}
//       {imgSrc && (
//         <div className="flex flex-col items-center">
//           <ReactCrop
//             crop={crop}
//             onChange={(_, percentCrop) => setCrop(percentCrop)}
//             circularCrop
//             keepSelection
//             aspect={ASPECT_RATIO}
//             minWidth={MIN_DIMENSION}
//           >
//             <img
//               ref={imgRef}
//               src={imgSrc}
//               alt="Upload"
//               style={{ maxHeight: "70vh" }}
//               onLoad={onImageLoad}
//             />
//           </ReactCrop>
//           <button
//             className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
//             onClick={async() => {
//               if (!imgRef.current || !previewCanvasRef.current || !crop) return;
             
//               setCanvasPreview(
//                 imgRef.current,
//                 previewCanvasRef.current,
//                 convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
//               );
//               const dataUrl = previewCanvasRef.current.toDataURL();
//               console.log("🚀 ~ dataUrl:", dataUrl)
              
//               const response =  await dispatch(updateProfileImage({_id:user?._id, image:dataUrl}));
              
//               if(response.type==="user/update-profile-image/fulfilled"){
//                 console.log('inside respones fullefilled crop modal')
//                 setCroppedImage(response.payload.data.profileImage)
//               closeModal();
//               }else{
//                 setError(response.payload)
//               }
//               console.log("🚀 ~ onClick={async ~ response:", response)

//             //   updateAvatar(dataUrl)
//             //   closeModal();
//             }}

//           >
//             Crop Image
//           </button>
//         </div>
//       )}
//       {crop && (
//         <canvas
//           ref={previewCanvasRef}
//           className="mt-4"
//           style={{
//             display: "none",
//             border: "1px solid black",
//             objectFit: "contain",
//             width: 150,
//             height: 150,
//           }}
//         />
//       )}
//     </>
//   );
// };
// export default ImageCropper;
