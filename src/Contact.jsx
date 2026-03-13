import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal"
];

const indianCities = [
  "Agra","Ahmedabad","Bangalore","Bhopal","Chandigarh","Chennai","Delhi",
  "Faridabad","Ghaziabad","Gurgaon","Hyderabad","Jaipur","Kolkata",
  "Lucknow","Mumbai","Noida","Patna","Pune","Surat","Varanasi"
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", state: "", city: "",
    address: "", inquiryType: "", itemType: "", details: ""
  });

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "", phone: "", email: "", state: "", city: "",
          address: "", inquiryType: "", itemType: "", details: ""
        });
      }, 3000);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="ba-ct-section">
        <div className="ba-ct-inner">

          {/* Header */}
          <div className="ba-ct-header">
            <h2 className="ba-sec-title">Get in Touch</h2>
            <p className="ba-ct-sub">
              Fill in your details below and we'll help you find the perfect antique note or coin.
            </p>
          </div>

          {/* Form */}
          <form className="ba-ct-form" onSubmit={handleSubmit}>

            {/* Success */}
            {submitted && (
              <div className="ba-ct-success">
                <CheckCircle2 size={56} style={{ color: '#4ade80', marginBottom: 16 }} />
                <h3>Thank You!</h3>
                <p>We've received your inquiry and will get back to you soon.</p>
              </div>
            )}

            {/* Personal Info */}
            <div className="ba-ct-section-block">
              <h3 className="ba-ct-section-title">Personal Information</h3>
              <div className="ba-ct-row">
                <div className="ba-ct-field">
                  <label className="ba-ct-label">Full Name</label>
                  <input className="ba-ct-input" placeholder="Enter your name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
                </div>
                <div className="ba-ct-field">
                  <label className="ba-ct-label">Phone Number</label>
                  <input className="ba-ct-input" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
                </div>
              </div>
              <div className="ba-ct-row">
                <div className="ba-ct-field ba-ct-full">
                  <label className="ba-ct-label">Email Address</label>
                  <input className="ba-ct-input" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="ba-ct-section-block">
              <h3 className="ba-ct-section-title">Location Details</h3>
              <div className="ba-ct-row">
                <div className="ba-ct-field">
                  <label className="ba-ct-label">State</label>
                  <select className="ba-ct-input ba-ct-select" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} required>
                    <option value="">Select State</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="ba-ct-field">
                  <label className="ba-ct-label">City</label>
                  <select className="ba-ct-input ba-ct-select" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} required>
                    <option value="">Select City</option>
                    {indianCities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="ba-ct-row">
                <div className="ba-ct-field ba-ct-full">
                  <label className="ba-ct-label">Home Address</label>
                  <input className="ba-ct-input" placeholder="Enter your complete address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Inquiry */}
            <div className="ba-ct-section-block">
              <h3 className="ba-ct-section-title">What Are You Looking For?</h3>
              <div className="ba-ct-row">
                <div className="ba-ct-field">
                  <label className="ba-ct-label">Inquiry Type</label>
                  <select className="ba-ct-input ba-ct-select" value={formData.inquiryType} onChange={(e) => handleChange("inquiryType", e.target.value)} required>
                    <option value="">Select Type</option>
                    <option value="old-currency">Old Currency</option>
                    <option value="antique-notes">Antique Notes</option>
                    <option value="special-date">Special Date Note</option>
                    <option value="custom">Custom Request</option>
                  </select>
                </div>
                <div className="ba-ct-field">
                  <label className="ba-ct-label">Item Type</label>
                  <select className="ba-ct-input ba-ct-select" value={formData.itemType} onChange={(e) => handleChange("itemType", e.target.value)} required>
                    <option value="">Select Item</option>
                    <option value="notes">Currency Notes</option>
                    <option value="coins">Antique Coins</option>
                  </select>
                </div>
              </div>
              <div className="ba-ct-row">
                <div className="ba-ct-field ba-ct-full">
                  <label className="ba-ct-label">Additional Details</label>
                  <textarea className="ba-ct-input ba-ct-textarea" placeholder="Tell us more about what you're looking for..." rows="4" value={formData.details} onChange={(e) => handleChange("details", e.target.value)} />
                </div>
              </div>
            </div>

            {submitError && (
              <p style={{ color: "#f87171", fontSize: "14px", textAlign: "center", marginTop: 12 }}>{submitError}</p>
            )}

            {/* Submit */}
            <button type="submit" className="ba-ct-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : (
                <>Send Inquiry <Send size={14} /></>
              )}
            </button>
          </form>

          {/* Quick Contact */}
          <div className="ba-ct-quick">
            <div className="ba-ct-quick-item">
              <Phone size={14} />
              <span>+91 7453957724</span>
            </div>
            <div className="ba-ct-quick-sep" />
            <div className="ba-ct-quick-item">
              <Mail size={14} />
              <span>contact@mlandsons.com</span>
            </div>
            <div className="ba-ct-quick-sep" />
            <div className="ba-ct-quick-item">
              <MapPin size={14} />
              <span>Rawatpara, Agra</span>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .ba-ct-section {
          background: #0a0a0a;
          padding: 80px 0;
          border-top: 1px solid #1a1a1a;
        }

        .ba-ct-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ba-ct-header {
          margin-bottom: 40px;
        }

        .ba-ct-sub {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          margin-top: 8px;
        }

        /* Form */
        .ba-ct-form {
          position: relative;
          border: 1px solid #1a1a1a;
          padding: 40px 36px;
          margin-bottom: 32px;
        }

        .ba-ct-success {
          position: absolute;
          inset: 0;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          text-align: center;
        }
        .ba-ct-success h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: #fff;
          margin-bottom: 8px;
        }
        .ba-ct-success p {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
        }

        .ba-ct-section-block {
          margin-bottom: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid #1a1a1a;
        }
        .ba-ct-section-block:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .ba-ct-section-title {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }

        .ba-ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .ba-ct-row:last-child { margin-bottom: 0; }

        .ba-ct-field { display: flex; flex-direction: column; gap: 6px; }
        .ba-ct-full { grid-column: 1 / -1; }

        .ba-ct-label {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .ba-ct-input {
          width: 100%;
          background: #111;
          border: 1px solid #1e1e1e;
          color: #fff;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'Jost', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ba-ct-input::placeholder { color: rgba(255,255,255,0.2); }
        .ba-ct-input:focus {
          border-color: #444;
          background: #151515;
        }

        .ba-ct-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        .ba-ct-select option { background: #111; color: #fff; }

        .ba-ct-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.7;
        }

        /* Submit */
        .ba-ct-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.6);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 28px;
          transition: all 0.3s ease;
        }
        .ba-ct-submit:hover:not(:disabled) {
          background: #fff;
          color: #000;
          border-color: #fff;
        }
        .ba-ct-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Quick Contact */
        .ba-ct-quick {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          border: 1px solid #1a1a1a;
          flex-wrap: wrap;
        }

        .ba-ct-quick-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s;
        }
        .ba-ct-quick-item:hover { color: #fff; }

        .ba-ct-quick-sep {
          width: 1px;
          height: 20px;
          background: #1a1a1a;
        }

        @media (max-width: 768px) {
          .ba-ct-form { padding: 28px 20px; }
          .ba-ct-row { grid-template-columns: 1fr; }
          .ba-ct-quick { flex-direction: column; }
          .ba-ct-quick-sep { display: none; }
        }

        /* Light theme */
        [data-theme="light"] .ba-ct-section { background: #f9f6f0; }
        [data-theme="light"] .ba-ct-sub { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-ct-form { border-color: #ddd; }
        [data-theme="light"] .ba-ct-section-block { border-color: #e5e5e5; }
        [data-theme="light"] .ba-ct-section-title { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-ct-label { color: rgba(0,0,0,0.4); }
        [data-theme="light"] .ba-ct-input { background: #f5f2ec; border-color: #e0ddd5; color: #111; }
        [data-theme="light"] .ba-ct-input::placeholder { color: rgba(0,0,0,0.25); }
        [data-theme="light"] .ba-ct-input:focus { border-color: #ccc; background: #fff; }
        [data-theme="light"] .ba-ct-select option { background: #f5f2ec; color: #111; }
        [data-theme="light"] .ba-ct-submit { border-color: rgba(0,0,0,0.5); color: #000; }
        [data-theme="light"] .ba-ct-submit:hover:not(:disabled) { background: #000; color: #fff; border-color: #000; }
        [data-theme="light"] .ba-ct-quick { border-color: #ddd; }
        [data-theme="light"] .ba-ct-quick-item { color: rgba(0,0,0,0.5); }
        [data-theme="light"] .ba-ct-quick-item:hover { color: #000; }
        [data-theme="light"] .ba-ct-quick-sep { background: #ddd; }
        [data-theme="light"] .ba-ct-success { background: #f9f6f0; }
        [data-theme="light"] .ba-ct-success h3 { color: #111; }
        [data-theme="light"] .ba-ct-success p { color: rgba(0,0,0,0.5); }
      `}</style>
    </>
  );
};

export default Contact;
