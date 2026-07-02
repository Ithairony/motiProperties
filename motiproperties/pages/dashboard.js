import { NavBar } from "../components/navbar";
import { parseUserFromCookie } from '../lib/auth';
import Footer from "../components/footer";

// Fetch user info on server side before rendering
export async function getServerSideProps({req}) {

    // Parse user information from cookies
    const user = parseUserFromCookie(req);

    // If no user is found, redirect to login page
    if (!user) {
        return {
            redirect: {
                destination: '/loginform', // Sends the user to login page 
                permanent: false,
            },
        };
    }

    // If user is authenticated, return the user as props
    return { props: {user} };
}

export default function Dashboard( { user }) {
    return (
      <>
        <div>
          {/* Navbar component */}
          <NavBar/>
        </div>

        <div>
        <h1>Dashboard</h1>
        <h3>Welcome to MOTI Properties {user.name}!</h3>
  
        {/* Render content based on user role */}
        {user.role === 'landlord' && (
          <div>
            <h2>Landlord Page</h2>
            <ul>
              {/* Landlord-specific links */}
              <li><a href="/myProperties">My Properties</a></li>
            </ul>
          </div>
        )}
  
        {user.role === 'admin' && (
          <div>
            <h2>Admin </h2>
            <ul>
              {/* Admin-specific links */}
              <li><a href="/admin/users">Manage Users</a></li>
              <li><a href="/admin/properties">View All Properties</a></li>
            </ul>
          </div>
        )}
  
        {user.role === 'tenant' && (
                <div>
                  <h2>Tenant Page </h2>
                  <ul>
                    {/* Tenant-specific links */}
                    <li><a href="/tenant/browse">Browse Properties</a></li>
                    <li><a href="/tenant/browse">Manage information</a></li>
                    <li><a href="/tenant/applications">My Applications</a></li>
                  </ul>
                </div>
              )}
  
        
      </div>
      
      <div>
        {/* Footer component */}
        <Footer />
      </div>
      </>
    )
}
