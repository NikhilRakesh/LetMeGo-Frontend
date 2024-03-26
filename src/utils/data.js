import { Country, State, City } from 'country-state-city';

export const getCities = () => {

    const cities = City.getCitiesOfState("IN", "KL").map(c => c.name)
    return cities
}

export const getStates = () => {
    const countries = Country.getAllCountries();

    const india = countries.find(country => country.isoCode === 'IN');

    const states = State.getStatesOfCountry(india.isoCode);

    return states
}

export const keralaDistricts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
];
