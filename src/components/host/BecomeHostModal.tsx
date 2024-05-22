import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BecomeHostForm from './BecomeHostForm';

interface Props {
    open: boolean;
    handleClose: () => void;
}

export default function BecomeHostModal({ open, handleClose }: Props) {
    const [isBecomeHostFormOpen, setIsBecomeHostFormOpen] = React.useState(false);

    const handleAgree = () => {
        setIsBecomeHostFormOpen(true);
        handleClose();
    };

    const handleCloseForm = () => {
        setIsBecomeHostFormOpen(false);
    };

    return (
        <React.Fragment>
            <BecomeHostForm handleClose={handleCloseForm} open={isBecomeHostFormOpen} />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='bg-blue-100 rounded-3xl'>
                    <DialogTitle id="alert-dialog-title" className='bg-bgaccent'>
                        {"  Congratulations on taking the first step to becoming a host!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            By clicking "I Agree," you acknowledge that you have read, understood, and agree to abide by our hosting guidelines, community standards, and all applicable local laws and regulations. You also agree to provide accurate information and maintain a safe and welcoming environment for guests.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleAgree} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
