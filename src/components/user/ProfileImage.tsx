import { PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react'
import CropImageModal from './imageCrop/CropImageModal';
import { useAppSelector } from '../../redux/store';
import { ClipLoader } from 'react-spinners';

const ProfileImage = () => {
  const { user,loading } = useAppSelector(state => state.user)
  const [modalOpen, setModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>("")
  console.log("🚀 ~ ProfileImage ~ croppedImage:", croppedImage)
  
  useEffect(() => {
    setCroppedImage(String(user?.profileImage))
  }, [])
  return (
    <div className=" items-center rounded-full">
      <div className="relative">
        {!loading ? 
        (<img
              src={croppedImage ? croppedImage : `/avatar-profile.jpg`}
              alt="Avatar"
              className="rounded-full border-2 border-gray-400"
            />) : (
            
        <div className="rounded-full flex items-center justify-center w-full h-full border-4 bg-white p-6">
          <ClipLoader />
        </div>
            )}
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>

      {modalOpen && (
        <CropImageModal
          setCroppedImage={setCroppedImage}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfileImage
