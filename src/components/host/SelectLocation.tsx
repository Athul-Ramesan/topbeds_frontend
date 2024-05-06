import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "UHhNUXY1ZnYzUndzRWlYdnFKNkZObFpvS3ppR2dGcVYwOUtZUmVBZQ==";

interface Country {
    name: string;
    iso2: string;
}

interface State {
    name: string;
    iso2: string;
    id: number
}

interface City {
    name: string;
    stateCode: string;
}

interface FetchCountryStateCityProps {
    onLocationSelect: (country: string, state: string, city: string) => void;
}
const FetchCountryStateCity: React.FC<FetchCountryStateCityProps> = ({ onLocationSelect }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const handleLocationSelect = () => {
        onLocationSelect(selectedCountry, selectedState, selectedCity);
    };
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const headers = {
                    'X-CSCAPI-KEY': API_KEY,
                };

                const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                    headers,
                });

                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry) {
                try {
                    const headers = {
                        'X-CSCAPI-KEY': API_KEY,
                    };

                    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
                        headers,
                    });
                    console.log(response, 'states 😊😊😊😊😊😊');

                    setStates(response.data);
                } catch (error) {
                    console.error('Error fetching states:', error);
                }
            }
        };

        fetchStates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedCountry && selectedState) {
                console.log(selectedCountry, selectedState, '🚩🚩🚩🚩🚩');

                try {
                    const headers = {
                        'X-CSCAPI-KEY': API_KEY,
                    };

                    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, {
                        headers,
                    });

                    setCities(response.data);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            }
        };

        fetchCities();
    }, [selectedCountry, selectedState]);
    return (
        <div>
            <div>
                <label htmlFor="country">Country:</label>
                <select
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="state">State:</label>
                <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                        <option key={state.id} value={state.iso2}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="city">City:</label>
                <select id="city" disabled={!selectedState}>
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type='submit' onClick={handleLocationSelect}>Select Location</button>
        </div>
    );
};

export default FetchCountryStateCity;