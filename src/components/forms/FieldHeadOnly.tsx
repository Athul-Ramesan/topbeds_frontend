import { FC } from "react"

interface IHeaderData {
    header: string,
    description: string
}
const FieldHeadOnly: FC<IHeaderData> = ({header,description}) => {
    return (
        <>
            <h2 className="text-xl mt-4">{header}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
        </>
    )
}

export default FieldHeadOnly
