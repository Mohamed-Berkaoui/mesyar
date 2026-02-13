import { Navbar, Hero, Features, Services, BookingForm, FAQ, Footer } from './index';
import Loader from './components/Loader';
import ChatBubble from './components/ChatBubble';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Loader />
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <BookingForm />
      <FAQ />
      <Footer />
      <ChatBubble />
    </div>
  );
}

export default App;
