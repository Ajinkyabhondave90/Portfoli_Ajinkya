import { useState } from 'react';
import Icon from './Icon.jsx';
import { sendContact, gmailUrl } from '../api';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' };

export default function Contact({ data }) {
  const { profile, services } = data;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [info, setInfo] = useState('');
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const text = `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`;
  const subject = `Portfolio enquiry from ${form.firstName}`;

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    try {
      const res = await sendContact(form);
      setInfo(res.message);
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      if (err.fields && Object.keys(err.fields).length) {
        setErrors(err.fields);
        setInfo(err.message);
        setStatus('idle');
      } else {
        setStatus('failed'); // backend offline: show email fallbacks
      }
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${profile.email}\nSubject: ${subject}\n\n${text}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  // A plain function (not a component) so inputs keep focus while typing.
  const field = (name, props) => (
    <div>
      <input name={name} value={form[name]} onChange={update} {...props} />
      {errors[name] && <div className="err">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="contact">
      <form className="form" onSubmit={submit} noValidate>
        <h2 className="g">Let's work together</h2>
        {field('firstName', { placeholder: 'First Name' })}
        {field('lastName', { placeholder: 'Last Name' })}
        {field('email', { type: 'email', placeholder: 'Email Address' })}
        {field('phone', { placeholder: 'Phone' })}
        <select className="full" name="service" value={form.service} onChange={update}>
          <option value="">Select a service</option>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}
        </select>
        <div className="full">
          <textarea name="message" value={form.message} onChange={update} placeholder="Type your message here." style={{ width: '100%' }} />
          {errors.message && <div className="err">{errors.message}</div>}
        </div>
        <div className="full"><button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send message'}</button></div>

        {status === 'idle' && info && <div className="full res"><p>{info}</p></div>}
        {status === 'sent' && <div className="full res ok"><p>{info}</p></div>}
        {status === 'failed' && (
          <div className="full res">
            <p>The message server is not reachable right now. Send it by email instead:</p>
            <div className="row" style={{ margin: '8px 0 0' }}>
              <a className="btn" href={gmailUrl(profile.email, subject, text)} target="_blank" rel="noopener noreferrer">Open Gmail</a>
              <a className="btn alt" href={`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`}>Open mail app</a>
              <button type="button" className="btn alt" onClick={copy}>{copied ? 'Copied' : 'Copy message'}</button>
            </div>
            <p className="small">Or email me directly: {profile.email}</p>
          </div>
        )}
      </form>

      <div className="info">
        <div><i>&#9990;</i><p><small>Phone</small><a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}><span>{profile.phone}</span></a></p></div>
        <div><i>&#9993;</i><p><small>Email</small><a href={gmailUrl(profile.email)} target="_blank" rel="noopener noreferrer"><span>{profile.email}</span></a></p></div>
        <div><i>&#9906;</i><p><small>Address</small><span>{profile.location}</span></p></div>
        <div className="row" style={{ margin: 0 }}>
          <a className="ico" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Icon name="GitHub" /></a>
          <a className="ico" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Icon name="LinkedIn" /></a>
          <a className="ico" href={gmailUrl(profile.email)} target="_blank" rel="noopener noreferrer" aria-label="Gmail" title="Gmail"><Icon name="Gmail" /></a>
        </div>
      </div>
    </div>
  );
}
