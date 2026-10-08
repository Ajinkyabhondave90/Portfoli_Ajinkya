import { ICONS } from '../data/icons.js';

export default function Icon({ name }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return <svg viewBox={icon.vb} fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon.html }} />;
}
