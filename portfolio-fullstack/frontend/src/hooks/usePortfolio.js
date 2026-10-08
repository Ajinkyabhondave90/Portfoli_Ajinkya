import { useEffect, useState } from 'react';
import localData from '../data/portfolio.json';
import { fetchProfile } from '../api';

/** Shows the bundled data instantly, then replaces it with the Spring Boot API data when available. */
export function usePortfolio() {
  const [data, setData] = useState(localData);
  useEffect(() => {
    let active = true;
    fetchProfile()
      .then((remote) => active && setData(remote))
      .catch(() => {}); // backend offline: keep the bundled data
    return () => { active = false; };
  }, []);
  return data;
}
