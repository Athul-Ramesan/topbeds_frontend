import React from 'react';
import { ErrorMessage, Field } from 'formik';

interface BecomeHostFormInputProps {
  label: string;
  type: string;
  name: string;
}

const BecomeHostFormInput: React.FC<BecomeHostFormInputProps> = ({ label, type, name }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field type={type} name={name} />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export default BecomeHostFormInput;
