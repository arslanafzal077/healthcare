import countryList from './data/countries.json';
import stateList from './data/state.json';
import cityList from './data/city.json';

export interface Country {
  id: string;
  sortname: string;
  name: string;
  phonecode: string;
  emoji: string;
}

interface State {
  id: string;
  name: string;
  country_id: string;
}

export interface City {
  id: string;
  name: string;
  state_id: string;
}

const countryStateCity = {
  getCountryById: (id: string): Country | null => {
    return countryList.find(country => country.id === id) || null;
  },
  getStateById: (id: string): State | null => {
    return stateList.find(state => state.id === id) || null;
  },
  getCityById: (id: string): City | null => {
    return cityList.find(city => city.id === id) || null;
  },
  getStatesOfCountry: (countryId: string): State[] => {
    return stateList.filter(state => state.country_id === countryId);
  },
  getCitiesOfState: (stateId: string): City[] => {
    return cityList.filter(city => city.state_id === stateId);
  },
  getAllCountries: (): Country[] => {
    return countryList;
  },
  getCitiesOfCountry: (countryId: string): City[] => {
    const statesOfCountry = stateList.filter(
      state => state.country_id === countryId,
    );
    const cities: City[] = [];
    statesOfCountry.forEach(state => {
      const citiesOfState = cityList.filter(city => city.state_id === state.id);
      cities.push(...citiesOfState);
    });
    return cities;
  },
};

export default countryStateCity;
