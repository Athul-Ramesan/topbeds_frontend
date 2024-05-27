import { useState } from "react"

const useLocalStorage = (key:string, inititalValue:any) => {
    const [storedValue, setStoredValue] = useState(()=>{
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item): inititalValue
        } catch (error:any) {
            console.log("🚀 ~ custom hook error ~ error:", error)
            return inititalValue
        }
    })
    const setValue = (value:any) =>{
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore)
            window.localStorage.setItem(key,JSON.stringify(valueToStore));
        } catch (error:any) {
            console.log("🚀 ~ setValue ~ error:", error)
        }
    }
    return [storedValue, setValue]
}

export default useLocalStorage
