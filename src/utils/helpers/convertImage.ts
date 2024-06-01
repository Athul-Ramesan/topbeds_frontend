
export const convertImageToBase64 = async(images:File[]) :Promise<string[]>=> {
    console.log("🚀 ~ convertImageToBase64 ~ images:", images)
       console.log('inside convertImageToBase64');
    
    const urlPromises= images.map((file:File)=>{
        return new Promise<string>((resolve, reject)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>{
                if(reader.result !== null){
                    resolve(reader.result.toString());
                }else{
                    reject(new Error('Failed to read file'));
                }
            }
            reader.onerror = ()=>{
                reject(new Error('Failed to read file'));
            }
            reader.readAsDataURL(file)
        })

    })

    try {
        const imageUrls = await Promise.all(urlPromises)
        console.log("🚀 ~ convertImageToBase64 ~ imageUrls:", imageUrls)
        return imageUrls
    } catch (error:any) {
        throw error;
    }
}