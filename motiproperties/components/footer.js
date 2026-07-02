import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Footer top section with two columns */}
      <div className="footer-top">
        
        {/* First footer section with company info */}
        <div className="footer-section">
          <h3>MOTI Property Lettings</h3>
          <p>
            Finding you the perfect property since 2023. We specialize in residential and commercial properties.
          </p>
        </div>

        {/* Second footer section with contact details */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <address>
            <p>123 Reuben Street</p>
            <p>Real Estate City, RE 12345</p>
            <p>Email: info@motiproperty.ie</p>
            <p>Phone: (123) 456-7890</p>
          </address>
        </div>
      </div>

      {/* Footer bottom section with copyright notice */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MOTI Property Lettings. All rights reserved.
      </div>
    </footer>
  );
}
