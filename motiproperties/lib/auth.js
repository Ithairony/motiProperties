// Fetch cookie info about the user
export function parseUserFromCookie(req) {
    
    // Get raw cookies from request headers, fallback to an empty string if none
    const raw = req.headers?.cookie || '';
    console.log('Raw cookies:', raw); // Log raw cookies to inspect them

    // Convert raw cookies string into an object
    const cookies = Object.fromEntries(
        raw.split('; ').map(cookie => {
            const [key, ...rest] = cookie.split('='); // Split each cookie by '=' to get key and value
            return [key.trim(), decodeURIComponent(rest.join('='))]; // Decode and trim spaces from key and value
        })
    );

    console.log('Cookies object:', cookies); // Log the cookies object for inspection

    // Check if 'user' cookie exists
    if (!cookies.user) {
        console.log('No user cookie found');
        return null; // Return null if no 'user' cookie is found
    }

    try {
        // Attempt to parse the 'user' cookie
        const user = JSON.parse(cookies.user); 
        console.log('User parsed from cookie:', user);  // Log the parsed user data
        return user; // Return parsed user data
    } catch (error) {
        // Catch any errors during parsing
        console.error('Error parsing cookie:', error); // Log any errors that occur during parsing
        return null; // Return null if parsing fails
    }
}
