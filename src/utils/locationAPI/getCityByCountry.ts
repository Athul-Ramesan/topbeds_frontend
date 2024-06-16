import { ICitiesWithId } from "../../components/searchBar/SearchInterface";

const getCityByCountry = async():Promise<ICitiesWithId[]> => {
    
    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "UHhNUXY1ZnYzUndzRWlYdnFKNkZObFpvS3ppR2dGcVYwOUtZUmVBZQ==");
    
    const requestOptions:RequestInit = {
     method: 'GET',
     headers: headers,
     redirect: 'follow'
    };
    
    try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/cities", requestOptions);
        console.log("🚀 ~ getCityByCountry ~ response:", response)
        const result = await response.json();
        console.log("🚀 ~ getCityByCountry ~ result:", result)
        return result
    } catch (error) {
        console.error('error', error);
        throw new Error("Couldnt fetch cities api");
        
    }
}

export default getCityByCountry
