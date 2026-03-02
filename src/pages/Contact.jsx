import { memo, useState, useCallback } from "react";
import "./Contact.css";

const Contact = memo(function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="page-eyebrow eyebrow-green">✦ Contact</div>
        <h1 className="page-title">Let's Work<br />Together</h1>
        <p className="page-subtitle">
          Open to internships, collaborations, and exciting opportunities.
          Drop a message — I'd love to connect!
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-left">
          <div className="availability-badge">
            <span className="avail-dot"></span> Open to opportunities
          </div>
          <div className="contact-info-card">
            <p className="contact-info-title">📬 Reach Me At</p>
            <div className="contact-link-list">
              <a href="mailto:vaidehi@email.com" className="contact-link">
                <div className="contact-link-icon icon-email">📧</div>
                <div className="contact-link-text">
                  <strong>Email</strong>vaidehi@email.com
                </div>
              </a>
              <a href="https://github.com/vaidehi" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon icon-github">🐙</div>
                <div className="contact-link-text">
                  <strong>GitHub</strong>github.com/vaidehi
                </div>
              </a>
              <a href="https://www.linkedin.com/in/vaidehi-sharma-27b979288/" target="_blank" rel="noreferrer" className="contact-link">
                <div className="contact-link-icon icon-linkedin">💼</div>
                <div className="contact-link-text">
                  <strong>LinkedIn</strong>linkedin.com/in/vaidehi-sharma-27b979288
                </div>
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <p className="contact-form-title">💬 Send a Message</p>
          {sent && <div className="success-toast">🎉 Message sent successfully!</div>}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" type="text" name="subject" placeholder="Internship / Collab / Project" value={form.subject} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" name="message" placeholder="Tell me about the opportunity..." value={form.message} onChange={handleChange}></textarea>
          </div>
          <button className="form-submit" type="submit">🚀 Send Message</button>
        </form>
      </div>
    </div>
  );
});

export default Contact;
