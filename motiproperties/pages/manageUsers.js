import { NavBar } from "../components/navbar";
import { useEffect, useState } from 'react';
import Footer from "../components/footer";

export default function ManageUsers() {
  
  return (

   <><div className="page-wrapper">
        <div>
            <NavBar />
        </div>
     
        <div>
            <Footer />
        </div>
    </div></>
  );
}