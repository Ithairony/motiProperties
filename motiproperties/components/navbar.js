import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';

export function NavBar() {
    const [user, setUser] = useState(null); // State to store user data
    const router = useRouter(); // Next.js router for navigation

    useEffect(() => {
        const userCookie = Cookie.get('user'); // Retrieve the user cookie
        if (userCookie) {
            try {
                const parsedUser = JSON.parse(userCookie); // Parse the cookie content
                setUser(parsedUser); // Set the parsed user data to state
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                setUser(null); // If error occurs, set user to null
            }
        } else {
            console.log("No user cookie found"); // Log if no user cookie is found
        }
    }, []); // Run only once on component mount

    const logout = () => {
        document.cookie = 'user=; Path=/; Max-Age=0'; // Clear the user cookie instantly
        setUser(null); // Update the state to reflect the user is logged out
        console.log("User logged out"); // Log logout action
        router.push('/'); // Redirect to the home page
    };

    const isActive = (path) => {
        return router.pathname === path ? 'active' : ''; // Check if the current path is active
    };

    return (
        <nav className='nav'>
            <div>
                {/* Link to the homepage */}
                <Link href="/" className={isActive('/')} style={{ fontFamily: 'Agu Display' }}>MOTI</Link>
            </div>

            <div className={`nav-links`}>
                {/* Link to properties listings */}
                <Link href="/propertiesListings" className={isActive('/propertiesListings')}>Listings</Link>

                {/* If user is not logged in, show options to register or login */}
                {!user && (
                    <>
                        <Link href="/registrationform" className={isActive('/registrationform')}>Register</Link>
                        <Link href="/loginform" className={isActive('/loginform')}>Login</Link>
                    </>
                )}

                {/* If user is a tenant, show tenant-specific links */}
                {user?.role === 'tenant' && (
                    <>
                        <Link href="/myApplications" className={isActive('/myApplications')}>My Applications</Link>
                        <button onClick={logout}>Logout</button> {/* Logout button */}
                    </>
                )}

                {/* If user is a landlord, show landlord-specific links */}
                {user?.role === 'landlord' && (
                    <>
                        <Link href="/my-properties" className={isActive('/my-properties')}>My Properties</Link>
                        <button onClick={logout}>Logout</button> {/* Logout button */}
                    </>
                )}

                {/* If user is an admin, show admin-specific links */}
                {user?.role === 'admin' && (
                    <>
                        <Link href="/manage-users" className={isActive('/manage-users')}>Manage Users</Link>
                        <Link href="/manageApplications" className={isActive('/manageApplications')}>Manage Applications</Link>
                        <button onClick={logout}>Logout</button> {/* Logout button */}
                    </>
                )}

                {/* Show a logout button for any logged-in user without a specific role */}
                {user && !['tenant', 'landlord', 'admin'].includes(user?.role) && (
                   <button onClick={logout}>Logout</button> 
                )}
            </div>
        </nav>
    );
}
