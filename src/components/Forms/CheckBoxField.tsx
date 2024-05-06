import { Field } from 'formik'
import { FC } from 'react'

interface ICheckBoxFiled{
    name:string,
    value: string,
    icon?: JSX.Element
}
const CheckBoxField: FC<ICheckBoxFiled> = ({ name, value, icon }) => {
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <Field type="checkbox" name={name} value={value} />
                {(icon)}
                <span>{value}</span>
            </label>
        </>
    )
}

export default CheckBoxField
