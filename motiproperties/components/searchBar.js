import React, { useState, useEffect } from "react";

export default function SearchBar({ properties, filtered, setFiltered }) {

  const [filter, setFilter] = useState({ location: "", type: "", price: "" });


  const applyFilters = (filter) => {
    let result = [...properties];

    // Filter based on location
    if (filter.location) {
      result = result.filter((property) =>
        property.address.toLowerCase().includes(filter.location.toLowerCase())
      );
    }

    // Filter based on property type
    if (filter.type) {
      result = result.filter(
        (property) => property.propertyType.toLowerCase() === filter.type.toLowerCase()
      );
    }

    // Filter based on price range
    if (filter.price) {
      const [min, max] = filter.price.split("-").map(Number);
      result = result.filter(
        (property) => property.price >= min && property.price <= max
      );
    }

    console.log("Filtered properties:", result);
    setFiltered(result);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (

    <div className="searchBar">
            <div className="filter-container">
                {/* Price filter */}
                <select name="price" value={filter.price} className="filter-option" onChange={handleInputChange}>
                    <option value="">Any Price</option>
                    <option value="0-1000">Up to €1000</option>
                    <option value="1000-2000">€1000 – €2000</option>
                    <option value="2000-3000">€2000 – €3000</option>
                    <option value="3000-100000">€3000+</option>
                </select>

                {/* Residency type filter */}
                <select name="type" value={filter.type} onChange={handleInputChange} className="filter-option" placeholder="Property Type">
                    <option value="">Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                </select>

                {/* Location filter */}
                <input
                    name="location"
                    type="text"
                    placeholder="Location"
                    value={filter.location}
                    onChange={handleInputChange}
                    className="filter-option"
                />

                <div className="search-button-container">
                    {/* Search button */}
                    <button className="search-button" onClick={() => applyFilters(filter)}>
                        Search
                    </button>

                    {/* Reset filters button */}
                    <button
                        className="search-button"
                        onClick={() => {
                        const reset = { price: "", type: "", location: "" };
                        setFilter(reset);
                        setFiltered(properties); // Reset the filtered properties
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
    </div>
  );
}