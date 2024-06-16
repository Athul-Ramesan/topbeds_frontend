import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from "yup";
import BecomeHostFormInput from '../Forms/BecomeHostFormInput';
import { axiosInstance } from '../../config/instances';
import { config } from '../../config/config';
import { useAppDispatch } from '../../redux/store';
import { becomeHostAction } from '../../redux/actions/userAction/becomeHost';
import InformationModal from '../Modal/InformationModal';
import { Link } from 'react-router-dom';

interface FormValues {
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

interface Props {
    open: boolean;
    handleClose: () => void;
}

const AddressSchema = Yup.object().shape({
    street: Yup.string().trim().required("Street is required"),
    city: Yup.string().trim().required("City is required"),
    state: Yup.string().trim().required("State is required"),
    zip: Yup.string().trim().required("Zip code is required"),
    phone: Yup.string()
        .trim()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required")
});

const BecomeHostForm: React.FC<Props> = ({ open, handleClose }) => {
    const [isInformationModalOpen,setIsInformationModalOpen] = React.useState(false)
    const [messageModal, setMessageModal] = React.useState(false)
    const dispatch = useAppDispatch();
    const initialValues: FormValues = {
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            console.log(values);
            console.log('inside handlesbmit');
            
            const response = await dispatch(becomeHostAction(values))
            console.log("🚀 ~ handleSubmit ~ response:", response)
            if(response.type ==="user/become-host/fulfilled"){
                console.log('inside response of become host🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶')
                // handleClose()
                setIsInformationModalOpen(true)
            }
            // const response = await axiosInstance.post('user/add-address', values ,config)
        } catch (error: any) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }

    };

    return (
        <React.Fragment>
           {isInformationModalOpen && 
           (
            <InformationModal 
            handleClose={()=> setIsInformationModalOpen(false)}
            open={isInformationModalOpen}
            buttonText={`I'll do it later`}
            cancelButtonText = {""}
            title='Congrats, Your request has been submitted'
            content={<>
             We will reach you after checking your request. You can check status later.
            </>
            }
            

             />
           )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='bg-blue-100 rounded-3xl'>

                    <DialogTitle id="alert-dialog-title" className='bg-bgaccent'>
                        {"You are advised to provide your address first"}
                    </DialogTitle>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={AddressSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className='p-4'>
                                <BecomeHostFormInput label='Street' name='street' type='text' />
                                <BecomeHostFormInput label='City' name='city' type='text' />
                                <BecomeHostFormInput label='State' name='state' type='text' />
                                <BecomeHostFormInput label='Zip Code' name='zip' type='text' />
                                <BecomeHostFormInput label='Phone' name='phone' type='text' />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='submit' autoFocus>
                                        Next
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

export default BecomeHostForm;
