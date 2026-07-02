import { NavBar } from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  return (

    <><div className="welcome-wrapper">
     
      <div>
        <NavBar />
      </div>
      
      <div className="welcome-content">
        <h1>Welcome to Moti Properties</h1>
        <h2>Who we are?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
          justo vitae libero euismod consequat. Vivamus nec erat ut erat
          elementum congue.
        </p>
        <h2>Our goal</h2>
        <p>
          Duis dapibus, lorem id sodales convallis, urna urna facilisis ligula,
          at cursus justo felis eget turpis. Morbi non nibh ut erat tempor
          scelerisque.
        </p>
        <h2> Why choose us?</h2>
        <p>
          Integer malesuada nisl in sem fermentum, a posuere elit ultrices.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae.
        </p>

         <h2>Ready to find your next home?</h2>
        <button onClick={() => router.push('/propertiesListings')} className="btn-primary">
          Browse Properties
        </button>

      </div>

      <div className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at orci eu nisi volutpat cursus."
        </blockquote>
        <blockquote>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        </blockquote>
        <blockquote>
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
        </blockquote>
      </div>

      <div>
        <Footer />
      </div>
    </div></>
  );
}
