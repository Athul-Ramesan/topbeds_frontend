import { ErrorMessage, Field } from 'formik'
import { FC } from 'react'

interface IFieldData {
  header: string,
  description: string,
  name: string,
  placeholder: string
}
const FieldWithHead: FC<IFieldData> = (fieldData) => {
  const { header, description, name, placeholder } = fieldData

  return (
    <div className=' bg-bg-200 px-2 rounded-lg'>
      <h2 className="text-md font-semibold mt-4">{header}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
      <Field type="text" name={name} placeholder={placeholder} />
      <p className=" text-red-500">
        <ErrorMessage name={name} />
      </p>
    </div>
  )
}

export default FieldWithHead
