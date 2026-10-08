const LINKS = [['home', 'Home'], ['services', 'Services'], ['resume', 'Resume'], ['work', 'Work'], ['contact', 'Contact']];

export default function Header({ page, name }) {
  return (
    <header>
      <div className="wrap bar">
        <a className="logo" href="#home">{name.split(' ')[0]}<span className="g">.</span></a>
        <nav>
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={page === id ? 'on' : ''}>{label}</a>
          ))}
          <a className="btn" href="#contact">Hire me</a>
        </nav>
      </div>
    </header>
  );
}
