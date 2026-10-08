import Icon from './Icon.jsx';
import photo from '../assets/photo.jpg';
import { gmailUrl } from '../api';

export default function Home({ data }) {
  const { profile, stats } = data;
  const mail = gmailUrl(profile.email);
  return (
    <>
      <div className="hero">
        <div>
          <div className="role">{profile.role}</div>
          <h1>Hello I'm<br /><span className="g">{profile.name}</span></h1>
          <p>{profile.intro}</p>
          <div className="row">
            <a className="btn alt" href={mail} target="_blank" rel="noopener noreferrer">Email me</a>
            <a className="ico" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Icon name="GitHub" /></a>
            <a className="ico" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Icon name="LinkedIn" /></a>
            <a className="ico" href={mail} target="_blank" rel="noopener noreferrer" aria-label="Email" title="Email"><Icon name="Gmail" /></a>
          </div>
        </div>
        <div className="ring">
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" /></svg>
          <img src={photo} alt={profile.name} width="520" height="520" />
        </div>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}><b className="g">{s.value}</b><span>{s.label}</span></div>
        ))}
      </div>
    </>
  );
}
