const handleMultipleImageUpload = async () => {

    console.log("🚀 ~ handleMultipleImageUpload ~ files:", images)
    // const fileArray:FileWithUrl[] = Array.from(files)

    const urlPromises = images.map((file: any) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result !== null) {
                    resolve(reader.result.toString() as string)
                } else {
                    reject(new Error("Failed to read file"))
                }
            };
            reader.onerror = () => {
                reject(new Error("Failed to read file"))
            }
            reader.readAsDataURL(file)
        })
    })
    try {
        const imageUrls = await Promise.all(urlPromises);
        setMoreImageUrl((prevImageUrls) => {
            return [...prevImageUrls, ...imageUrls]
        })
    } catch (error: any) {
        console.log("🚀 ~ handleMultipleImageUpload ~ error:", error)
    }
}

const addPropertySubmit = async (values: IAddPropertyFormValues) => {
    console.log("🚀 ~ addPropertySubmit ~ values:", values)
    setIsLoading(true)
    try {

        await handleMultipleImageUpload()
        const formValues = { ...values, images: moreImageUrl }
        console.log("🚀 ~ addPropertySubmit ~ formValues:", formValues)
        setFormdata(values)
        console.log(formData, 'form datatatat');

        const response = await axiosInstance.post('property/add-property', formValues, config)
        console.log("🚀 ~ addPropertySubmit ~ response:", response)
        if (response.statusText === "OK") {
            toast.success("Property added successfully")
            // setIsLoading(false)
            navigate('/host')
        }

    } catch (error: any) {
        console.log("🚀 ~ addPropertySubmit ~ error:", error)
    }
}