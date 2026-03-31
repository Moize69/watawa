import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { CMSProvider } from './context/CMSContext';

export default function App() {
  return (
    <CMSProvider>
      <div className="min-h-screen bg-savannah-sand font-sans text-savannah-dark selection:bg-savannah-leaf selection:text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CMSProvider>
  );
}
