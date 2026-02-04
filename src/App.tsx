import { Navbar, Hero, Features, Services, BookingForm, FAQ, Footer } from './index';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <BookingForm />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
