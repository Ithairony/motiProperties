import { useRouter } from 'next/router';

// Cards Component
export function PropertyCard({ property }) {
  const router = useRouter();

  const handleApplyClick = () => {
     // Check if user is logged in
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));

    // I tried implementing this but for some reason it does not work
    // If not logged in sends the user to login page and them to the application form
    // if (!userCookie) {
      // Redirect to login with redirect query
      //router.push(`/loginform?redirect=/applyForProperties?id=${property.id}`);
    //} else {
      // User is logged in, proceed to apply page
      router.push(`/applyForProperties?id=${property.id}`);
    //}
  };

  return (
    <div className="card">
      <img src={`/images/${property.imageURL}`} alt={property.title} />
      <p>{property.propertyType}</p>
      <p>{property.address}</p>
      <p>{property.description}</p>
      <h2>€{property.price}</h2>
      <button onClick={handleApplyClick}>Apply</button>
    </div>
  );
}
