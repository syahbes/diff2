import React, { useEffect, useState } from "react";
import axios from "axios";

const CitiesAndStreets = () => {
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const api_url = "https://data.gov.il/api/3/action/datastore_search";
  const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
  const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
  const city_name_key = "שם_ישוב";
  const street_name_key = "שם_רחוב";
  const cities_data_id = "cities-data";
  const streets_data_id = "streets-data";

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await getData(cities_resource_id, "", 32000);
        const cities = response?.data?.result?.records || [];
        setCities(cities);
      } catch (error) {
        console.log("Error getting cities:", error);
      }
    };
    getCities();
  }, []);

  useEffect(() => {
    const getStreets = async () => {
      try {
        const response = await getData(streets_resource_id, { city_name_key: selectedCity }, 32000);
        const streets = response?.data?.result?.records || [];
        setStreets(streets);
      } catch (error) {
        console.log("Error getting streets:", error);
      }
    };
    if (selectedCity !== "") {
      getStreets();
    }
  }, [selectedCity]);

  const getData = (resource_id, q = "", limit = "100") => {
    return axios.get(api_url, {
      params: { resource_id, q, limit },
      responseType: "json"
      
    });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <form>
      <div className="form-field" id="city-selection">
        <label htmlFor="city-choice">בחר עיר:</label>
        <input
          list={cities_data_id}
          id="city-choice"
          name="city-choice"
          onChange={handleCityChange}
          value={selectedCity}
        />
        <datalist id={cities_data_id}>
          <option value="">טוען רשימת ערים...</option>
          {cities.map((city) => (
            <option value={city[city_name_key].trim()} key={city[city_name_key].trim()} />
          ))}
        </datalist>
      </div>
      <div className="form-field" id="street-selection">
        <label htmlFor="street-choice">בחר רחוב:</label>
        <input list={streets_data_id} id="street-choice" name="street-choice" />
        <datalist id={streets_data_id}>
          {streets.map((street) => (
            <option value={street[street_name_key].trim()} key={street[street_name_key].trim()} />
          ))}
        </datalist>
      </div>
    </form>
  );
};

export default CitiesAndStreets;
