import { createRef, useState } from "react"

const AvatarUpload =(props) =>{
    const [image,setImage] = useState();
    const inputFileRef = createRef();
    const cleanup =()=>{
        URL.revokeObjectURL(image && props.image);
        inputFileRef.current.value = null
    }
    const setImage =(newImage)=>{
        if(image){
            cleanup();
        }
        setImage(newImage)
    }
}