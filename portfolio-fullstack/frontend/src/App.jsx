import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Services from './components/Services.jsx';
import Resume from './components/Resume.jsx';
import Work from './components/Work.jsx';
import Contact from './components/Contact.jsx';
import { usePortfolio } from './hooks/usePortfolio.js';

const PAGES = ['home', 'services', 'resume', 'work', 'contact'];
const pageFromHash = () => {
  const h = window.location.hash.slice(1);
  return PAGES.includes(h) ? h : 'home';
};

export default function App() {
  const data = usePortfolio();
  const [page, setPage] = useState(pageFromHash);

  useEffect(() => {
    const onChange = () => { setPage(pageFromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return (
    <>
      <Header page={page} name={data.profile.name} />
      <main>
        <div className="wrap">
          <section key={page} className="page">
            {page === 'home' && <Home data={data} />}
            {page === 'services' && <Services services={data.services} />}
            {page === 'resume' && <Resume data={data} />}
            {page === 'work' && <Work projects={data.projects} />}
            {page === 'contact' && <Contact data={data} />}
          </section>
        </div>
      </main>
      <footer><div className="wrap">&copy; {data.profile.name}</div></footer>
    </>
  );
}
