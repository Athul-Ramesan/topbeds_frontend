import { ErrorMessage, Field, FieldArray, Form, Formik, insert } from "formik"
import { useState } from "react"
import { addPropertyInitialValues } from "../../utils/InititialValues/AddPropertyForm"
import { IAddPropertyFormValues } from "../../utils/Interfaces/IAddPropertyFormValues"
import { addPropertyValidationSchema } from "../../utils/validationSchema/addPropertyValidationSchema"
import FieldWithHead from "../../components/Forms/FieldWithHead"
import FieldHeadOnly from "../../components/Forms/FieldHeadOnly"
import CheckBoxField from "../../components/Forms/CheckBoxField"
import { axiosInstance } from "../../config/instances"
import { config } from "../../config/config"

const AddProperty = () => {

    const addPropertySubmit = async(values: IAddPropertyFormValues) => {
       try {
        console.log(values);
        const response = await axiosInstance.post('property/add-property',values,config)
        console.log(response);
        
       } catch (error:any) {
        console.log(error.message);
        
       }
    }
    function inputHeader(text: string) {
        return (
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text: string) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header: string, description: string) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    return (
        <div>
            <Formik initialValues={addPropertyInitialValues} onSubmit={addPropertySubmit} validationSchema={addPropertyValidationSchema}>
                {({ values }) => (

                    <Form>
                        <FieldWithHead header={"Title"} description={"Title for your place"} name={"title"} placeholder={"title"} />

                        <FieldWithHead header={"Address"} description={"Address for your place"} name={"address"} placeholder={"address"} />


                        {/* {preInput("Photos","more=better")}
               
               <div>
               <div className="flex gap-2">
               <Field type="text" name="imageUrl" placeholder={'add using a link ...jpg'} />
               <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp; Photo</button>
                    </div>
                </div> */}
                        {/* <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-col-6"></div>

<button className=" flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload
                </button> */}

                        <FieldWithHead header={"Description"} description={"Description of the place"} name={"description"} placeholder={"address"} />

                        <FieldHeadOnly header={"Amenities"} description={"Select all amenities of your place"}/>
                        <ErrorMessage name="amenities" className="text-red-700" />
                        <div role="group" aria-labelledby="checkbox-group" >
                            <div className="grid gap-2 grid-cols-2 md:grid-col-3 lg:grid-col-6 mt-2">

                                <CheckBoxField 
                                 name="amenities"
                                 value="WiFi" 
                                 icon={
                                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                    </svg>)
                                 } />
                                
                                <CheckBoxField 
                                 name="amenities"
                                 value="Free parking spot" 
                                 icon={
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                    )
                                 } />
                                
                                <CheckBoxField 
                                 name="amenities"
                                 value="TV" 
                                 icon={
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    )
                                 } />
                                <CheckBoxField 
                                 name="amenities"
                                 value="pets" 
                                 icon={
                                    (
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                    )
                                 } />
                                <CheckBoxField 
                                 name="amenities"
                                 value="Private entrance" 
                                 icon={
                                    (
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                    </svg>
                                    )
                                 } />
                                <CheckBoxField 
                                 name="amenities"
                                 value="Radio" 
                                 icon={
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                    )
                                 } />

                            </div>
                        </div>
                        
                        <FieldWithHead header="House Rules" description="Extra information,etc" name="houseRules" placeholder="" />

                        <FieldWithHead header="Price" description="Fix your budget" name="price" placeholder="add your price" />


                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check-in time</h3>
                                <Field type="time" name="checkIn" placeholder={"Check-In"} />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check-out time</h3>
                                <Field type="time" name="checkOut" placeholder={"Check-out"} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <Field type="text" name="maxGuests" />
                            </div>
                            <ErrorMessage className="m-3" name="checkIn" />
                            <ErrorMessage className="p-4" name="checkOut" />
                            <ErrorMessage name="maxGuests" />

                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="m-4 flex flex-col  gap-2">
                                {preInput("Bedrooms", "Widen your business, increase the occupancy")}
                                <Field type="text" name="bedrooms" />
                                <ErrorMessage name="bedrooms" />
                            </div>
                            <div className="m-4 flex flex-col gap-2">
                                {preInput("Bathrooms", "Be clean")}
                                <Field type="text" name="bathrooms" />
                                <ErrorMessage name="bathrooms" />
                            </div>
                        </div>

                        <button type="submit" className="primary my-4 hover:bg-primaryTint" >Save</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


export default AddProperty
