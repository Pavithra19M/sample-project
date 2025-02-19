import { Outlet } from "react-router-dom";
import Header from './Component/Header'
import Footer from './Component/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
