import React, { useState } from 'react';
import { conferenceConfig } from '../data/config';
import { faqData } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { Button } from '../components/Button';
import { Globe2, Send, CheckCircle2, AlertTriangle, Copy, Check, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Delegate Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide your inquiry message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');

    // Check if form service key is unconfigured
    if (!conferenceConfig.formService.accessKey || conferenceConfig.formService.accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setSubmissionStatus('error');
      setStatusMessage('The direct online form service is awaiting administrator API key configuration. Please transmit your inquiry directly via the email client link below.');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        access_key: conferenceConfig.formService.accessKey,
        name: formData.name,
        email: formData.email,
        subject: `[NITAMUN 4.0 Inquiry] ${formData.subject}`,
        message: formData.message,
        from_name: 'NITAMUN 4.0 Inquiry Desk',
      };

      const res = await fetch(conferenceConfig.formService.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmissionStatus('success');
        setStatusMessage('Your inquiry has been successfully transmitted to the Secretariat. A representative will contact you via email.');
        setFormData({ name: '', email: '', subject: 'General Delegate Inquiry', message: '' });
      } else {
        setSubmissionStatus('error');
        const apiError = data?.message || `Server responded with status code ${res.status}`;
        setStatusMessage(`Submission notice: ${apiError}. You can email us directly at ${conferenceConfig.contacts.email}.`);
      }
    } catch (err: unknown) {
      setSubmissionStatus('error');
      const errStr = err instanceof Error ? err.message : 'Network error';
      setStatusMessage(`Unable to transmit message: ${errStr}. Please write directly to ${conferenceConfig.contacts.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(conferenceConfig.contacts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          sectionNumber="06"
          eyebrow="COMMUNICATION & INQUIRIES"
          title="Connect with the Secretariat"
          titleAccent="Inquiry Desk"
          subtitle="Direct channels of communication for delegates, educational institutions, participants, and diplomatic partners."
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Official Contact Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 space-y-6">
              <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block">
                // OFFICIAL SECRETARIAT CONTACT
              </span>

              {/* Email Address with Copy Button */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono-tech text-[#25231F]/60 uppercase">Official Email</span>
                <div className="flex items-center justify-between p-3 bg-[#EBE9D8] border border-[#25231F]/15">
                  <a
                    href={`mailto:${conferenceConfig.contacts.email}`}
                    className="font-mono-tech text-xs sm:text-sm font-bold text-[#CB1B29] hover:underline truncate"
                  >
                    {conferenceConfig.contacts.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-[#25231F]/60 hover:text-[#CB1B29] cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Conference Format */}
              <div className="space-y-1.5 pt-2 border-t border-[#25231F]/10 text-xs font-mono-tech">
                <span className="text-[#25231F]/60 uppercase block">Conference Mode</span>
                <div className="flex items-center gap-2 p-3 bg-[#EBE9D8] border border-[#25231F]/15 font-bold">
                  <Globe2 className="w-4 h-4 text-[#CB1B29]" />
                  <span>{conferenceConfig.organizer.conferenceMode}</span>
                </div>
              </div>

              {/* Official Organization */}
              <div className="space-y-1.5 pt-2 border-t border-[#25231F]/10 text-xs font-mono-tech">
                <span className="text-[#25231F]/60 uppercase block">Organising Body</span>
                <div className="p-3 bg-[#EBE9D8] border border-[#25231F]/15 space-y-1">
                  <div className="font-bold text-[#25231F]">
                    {conferenceConfig.organizer.chapter}
                  </div>
                  <div className="text-[#25231F]/70">
                    {conferenceConfig.organizer.parentInstitute}
                  </div>
                  <div className="text-[11px] text-[#CB1B29] font-semibold pt-1">
                    Event Dates: {conferenceConfig.dates.displayDate} (Online)
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2 pt-2 border-t border-[#25231F]/10 text-xs font-mono-tech">
                <span className="text-[#25231F]/60 uppercase block">Official Social Channels</span>
                <div className="flex flex-col gap-2">
                  <a
                    href={conferenceConfig.contacts.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#EBE9D8] border border-[#25231F]/15 hover:border-[#CB1B29] group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#CB1B29]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                      <span className="font-bold group-hover:text-[#CB1B29]">@munsoc.nita</span>
                    </div>
                    <span className="text-[10px] text-[#25231F]/50">Instagram →</span>
                  </a>

                  <a
                    href={conferenceConfig.contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#EBE9D8] border border-[#25231F]/15 hover:border-[#CB1B29] group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#CB1B29]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                      <span className="font-bold group-hover:text-[#CB1B29]">MUNSOC NIT Agartala</span>
                    </div>
                    <span className="text-[10px] text-[#25231F]/50">LinkedIn →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#F6F4EB] border border-[#25231F]/15 space-y-6">
              <div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-1">
                  // TRANSMIT DIRECT INQUIRY
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                  Secretariat Inquiry Form
                </h3>
                <p className="text-xs font-mono-tech text-[#25231F]/60 mt-1">
                  Inquiries are directed to our administrative email: {conferenceConfig.contacts.email}.
                </p>
              </div>

              {/* Submission Notification Banner */}
              {submissionStatus === 'success' && (
                <div className="p-4 bg-emerald-50 border border-emerald-500 text-emerald-900 text-xs font-mono-tech flex items-start gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {submissionStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-400 text-red-900 text-xs font-mono-tech flex items-start gap-2.5 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span>{statusMessage}</span>
                    <div>
                      <a
                        href={`mailto:${conferenceConfig.contacts.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                        className="font-bold underline text-[#CB1B29]"
                      >
                        Click here to send directly via your email client →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Delegate Jane Doe / Professional"
                    className="w-full p-3 bg-[#EBE9D8] border border-[#25231F]/20 text-[#25231F] text-xs font-mono-tech focus:border-[#CB1B29] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <span className="text-[11px] font-mono-tech text-red-600 mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="delegate@example.com"
                    className="w-full p-3 bg-[#EBE9D8] border border-[#25231F]/20 text-[#25231F] text-xs font-mono-tech focus:border-[#CB1B29] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono-tech text-red-600 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject / Category */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Inquiry Classification
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-[#EBE9D8] border border-[#25231F]/20 text-[#25231F] text-xs font-mono-tech focus:border-[#CB1B29] focus:outline-none transition-colors"
                  >
                    <option value="General Delegate Inquiry">General Delegate Inquiry</option>
                    <option value="Registration & Fee Inquiries">Registration &amp; Fee Inquiries</option>
                    <option value="Committee & Portfolio Questions">Committee &amp; Portfolio Questions</option>
                    <option value="Executive Board & Substantive Query">Executive Board &amp; Substantive Query</option>
                    <option value="Partnership & Sponsorship Opportunity">Partnership &amp; Sponsorship Opportunity</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your query in detail, including your institution or background if applicable..."
                    className="w-full p-3 bg-[#EBE9D8] border border-[#25231F]/20 text-[#25231F] text-xs font-mono-tech focus:border-[#CB1B29] focus:outline-none transition-colors resize-y"
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono-tech text-red-600 mt-1 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-[#EBE9D8] border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        Send Message to Secretariat
                      </span>
                    )}
                  </Button>

                  <a
                    href={`mailto:${conferenceConfig.contacts.email}`}
                    className="text-xs font-mono-tech text-[#CB1B29] hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct mailto: {conferenceConfig.contacts.email}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Frequently Addressed Inquiries (FAQ Section) */}
        <div className="mt-24 pt-16 border-t border-[#25231F]/15">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-2">
              // DELEGATE HELPDESK &amp; PROTOCOL
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F]">
              Frequently Addressed Questions
            </h2>
            <p className="text-sm font-body text-[#25231F]/70 mt-2">
              Common clarifications regarding online committee procedures, accreditation, fees, and eligibility.
            </p>
          </div>

          <FAQAccordion items={faqData} />
        </div>
      </div>
    </div>
  );
};
