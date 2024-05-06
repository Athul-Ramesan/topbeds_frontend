import { ErrorMessage, Field } from 'formik'
import {FC} from 'react'

interface IFieldData{
    header: string,
    description: string,
    name:string,
    placeholder:string
}
const FieldWithHead:FC<IFieldData> = (fieldData) => {
    const {header, description, name,placeholder} = fieldData
    
  return (
    <>
                        <h2 className="text-xl mt-4">{header}</h2>
                        <p className="text-gray-500 text-sm">{description}</p>
                        <Field type="text" name={name} placeholder={placeholder} />
                        <p className= " text-red-500">
                        <ErrorMessage name={name}   />
                        </p>
    </>
  )
}

export default FieldWithHead
