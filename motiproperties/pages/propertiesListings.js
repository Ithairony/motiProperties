import { NavBar } from "../components/navbar";
import { PropertyCard } from '../components/propertyCard';
import SearchBar from "../components/searchBar";
import React, {useState, useEffect} from "react";
import Footer from "../components/footer";

export default function PropertiesPage() {
  
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Fetch properties when the component mounts
  useEffect(() => {
    fetch("/api/properties/showproperties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);  // Initially, show all properties
      });
  }, []);

  return (

   <><div className="page-wrapper">
     <NavBar />

     {/* Main content that starts below the navbar */}
     <div className="content">
       <h1>Find Your Dream Home</h1>

       {/* Search Bar */}
       <SearchBar
         properties={properties}
         filtered={filtered}
         setFiltered={setFiltered} />

       {/* Property Cards */}
       <div className="gallery">
         {filtered.map((property) => (
           <PropertyCard key={property.id} property={property} />
         ))}
       </div>
     </div>

    </div>

      <div>
       <Footer />
      </div></>
  );
}