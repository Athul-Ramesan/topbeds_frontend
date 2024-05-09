import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import ReviewInfo from './ReviewInfo';

const steps = [' Account Details', 'Personal Info', 'Review and Submit'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      residence: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email'),
      password: Yup.string()
        .min(8),
      confirmPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
      firstName: Yup.string()
        .required('First Name is required'),
      lastName: Yup.string()
        .required('Last Name is required'),
    }),
    onSubmit: () => {
      if (activeStep === steps.length - 1) {
        console.log('last step');
        alert("last step")
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  });

  const formContent = (step:any) => {
    switch(step) {
      case 0:
        return <AccountDetails formik={formik} />;
      case 1:
        return <PersonalInfo formik={formik} />;
      case 2:
        return <ReviewInfo formik={formik} />;
      default:
        return <div>404: Not Found</div>
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        padding: 2
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ padding: '20px' }}
        >
          {formContent(activeStep)}
        </Grid>
        {/* {formik.errors.submit && (
          <Grid
            item
            xs={12}
          >
            <FormHelperText error>
              {formik.errors.}
            </FormHelperText>
          </Grid>
        )} */}
        <Grid
          item
          xs={12}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button>
              Submit
            </Button>
          ) : (
            <Button onClick={()=>formik.handleSubmit}>
              Next
            </Button>
          ) }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Form;