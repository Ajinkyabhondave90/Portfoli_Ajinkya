export default function Services({ services }) {
  return (
    <>
      <h2 className="g">Services</h2>
      <p className="lead">What I can build and work on.</p>
      <div className="grid">
        {services.map((s, i) => (
          <div className="card" key={s.title}>
            <div className="num g">{String(i + 1).padStart(2, '0')}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
