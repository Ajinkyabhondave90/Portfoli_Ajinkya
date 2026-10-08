export default function Work({ projects }) {
  return (
    <>
      <h2 className="g">My work</h2>
      <p className="lead">Selected projects.</p>
      <div className="grid">
        {projects.map((p, i) => (
          <div className="card" key={p.title}>
            <div className="num g">{String(i + 1).padStart(2, '0')}</div>
            <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            <h3>{p.title}</h3>
            <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        ))}
      </div>
    </>
  );
}
