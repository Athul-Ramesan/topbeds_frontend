import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    open: boolean;
    handleClose: () => void;
    content:string | React.ReactNode
    buttonText:string
    handleSubmitModal?:()=>void,
    title:string,
    cancelButtonText?: string
}

export default function InformationModal({
     open,
     handleClose,
     content,
     buttonText,
     handleSubmitModal,
     cancelButtonText,
     title }: Props) {

        const handleSubmit = handleSubmitModal || handleClose
        if(!open){
            return 
        }
    return (
        <>

            <Dialog className='rounded-lg '
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className=' rounded-3xl bg-blue-100  '>
                    <DialogTitle id="alert-dialog-title" className='bg-bgaccent'>
                        {title}
                    </DialogTitle>
                    <DialogContent className=''>
                        <DialogContentText className='py-4' id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{cancelButtonText}</Button>
                        <Button onClick={handleSubmit} autoFocus>
                            {buttonText}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
}
