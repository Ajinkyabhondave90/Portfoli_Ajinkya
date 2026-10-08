import { useState } from 'react';
import Icon from './Icon.jsx';

const TABS = [['training', 'Training'], ['education', 'Education'], ['cert', 'Certification'], ['skills', 'Skills'], ['about', 'About me']];

export default function Resume({ data }) {
  const [tab, setTab] = useState('training');
  const { training, education, certifications, skills, profile } = data;

  return (
    <div className="tabs">
      <div className="side">
        {TABS.map(([id, label]) => (
          <button key={id} className={`tab${tab === id ? ' on' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <div>
        {tab === 'training' && (
          <div className="panel">
            <h2 className="g">My training</h2>
            <p className="lead">Hands-on training and academic projects, building practical Java and frontend skills.</p>
            <div className="card">
              <div className="when">{training.period}</div>
              <h3>{training.title}</h3>
              <p>{training.summary}</p>
              <ul>{training.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <span className="dot">{training.org}</span>
            </div>
          </div>
        )}
        {tab === 'education' && (
          <div className="panel">
            <h2 className="g">My education</h2>
            <p className="lead">Computer Science background with a focus on Java, databases and web development.</p>
            <div className="grid">
              {education.map((e) => (
                <div className="card" key={e.degree}><h3>{e.degree}</h3><p>{e.detail}</p><span className="dot">{e.school}</span></div>
              ))}
            </div>
          </div>
        )}
        {tab === 'cert' && (
          <div className="panel">
            <h2 className="g">Certification</h2>
            <p className="lead">Courses and certificates completed to build my programming foundation.</p>
            <div className="grid">
              {certifications.map((c) => (
                <div className="card" key={c.title}><h3>{c.title}</h3>{c.issuer && <span className="dot">{c.issuer}</span>}</div>
              ))}
            </div>
          </div>
        )}
        {tab === 'skills' && (
          <div className="panel">
            <h2 className="g">My skills</h2>
            <p className="lead">Java, databases and frontend technologies I work with.</p>
            <div className="skills">
              {skills.logos.map((n) => (
                <div className="skill" key={n} title={n} aria-label={n}><Icon name={n} /></div>
              ))}
            </div>
            <h3 className="sub">Core concepts</h3>
            <div className="tags">{skills.concepts.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
          </div>
        )}
        {tab === 'about' && (
          <div className="panel">
            <h2 className="g">About me</h2>
            <p className="lead">Fresher and soon-to-be Software Developer, driven by problem solving and learning new technologies.</p>
            <div className="about">
              <div><b>Name</b><span>{profile.name}</span></div>
              <div><b>Phone</b><span>{profile.phone}</span></div>
              <div><b>Location</b><span>{profile.location}</span></div>
              <div><b>Email</b><span>{profile.email}</span></div>
              <div><b>Status</b><span>{profile.status}</span></div>
              <div><b>Soft skills</b><span>{profile.softSkills}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
