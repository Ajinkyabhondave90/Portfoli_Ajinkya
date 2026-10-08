const API = import.meta.env.VITE_API_URL || '';

export async function fetchProfile() {
  const res = await fetch(`${API}/api/profile`);
  if (!res.ok) throw new Error('Could not load profile');
  return res.json();
}

export async function sendContact(form) {
  const res = await fetch(`${API}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || 'Could not send message');
    error.fields = data.errors || {};
    throw error;
  }
  return data;
}

export function gmailUrl(to, subject = '', body = '') {
  return (
    'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
    '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
  );
}
