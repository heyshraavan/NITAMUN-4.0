import React, { useState } from 'react';
import { conferenceConfig } from '../data/config';
import { faqData } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { Button } from '../components/Button';
import { Globe2, Send, CheckCircle2, AlertTriangle, Copy, Check, Mail, Phone } from 'lucide-react';

interface InquiryFormData {
  fullName: string;
  email: string;
  inquiryClassification: string;
  message: string;
}

const INQUIRY_CLASSIFICATIONS = [
  'General Delegate Inquiry',
  'Registration & Fee Inquiries',
  'Committee & Portfolio Questions',
  'Executive Board & Substantive Query',
  'Partnership & Sponsorship Opportunity',
] as const;

const SECRETARIAT_PHONE_NUMBERS = [
  { display: '+91 9101205308', tel: '+919101205308' },
  { display: '+91 7067164917', tel: '+917067164917' },
  { display: '+91 7005789121', tel: '+917005789121' },
  { display: '+91 9774550462', tel: '+919774550462' },
] as const;

const initialInquiryFormState: InquiryFormData = {
  fullName: '',
  email: '',
  inquiryClassification: '',
  message: '',
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>(initialInquiryFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    const trimmedName = formData.fullName.trim();
    if (!trimmedName) {
      errs.fullName = 'Please provide your full name.';
    } else if (trimmedName.length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.inquiryClassification) {
      errs.inquiryClassification = 'Please select an inquiry classification.';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      errs.message = 'Please provide your inquiry message.';
    } else if (trimmedMessage.length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');
    setStatusMessage('');

    const endpoint = conferenceConfig.sheetDbInquiry.apiUrl;
    if (!endpoint || endpoint === 'YOUR_SHEETDB_INQUIRY_API_URL') {
      setSubmissionStatus('error');
      setStatusMessage(
        `The Secretariat inquiry endpoint is not configured. Please contact us directly at ${conferenceConfig.contacts.email}.`
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate ISO timestamp immediately before submission
      const submissionTimestamp = new Date().toISOString();

      const payload = {
        data: [
          {
            timestamp: submissionTimestamp,
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            inquiry_classification: formData.inquiryClassification,
            message: formData.message.trim(),
            status: 'Pending',
          },
        ],
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      // Supports both secure serverless endpoint { success: true } and legacy SheetDB responses
      const isSuccess =
        res.ok &&
        (data?.success === true ||
          data?.created === 1 ||
          (Array.isArray(data) && data.length > 0) ||
          (typeof data?.created === 'number' && data.created > 0));

      if (isSuccess) {
        setSubmissionStatus('success');
        setStatusMessage(
          'Your inquiry has been successfully transmitted to the NITAMUN 4.0 Secretariat. We will get back to you through your provided email address.'
        );
        setFormData(initialInquiryFormState);
        setErrors({});
      } else {
        setSubmissionStatus('error');
        const apiError = data?.message || data?.error || `Server responded with status code ${res.status}`;
        setStatusMessage(
          `Transmission notice: ${apiError}. You can also write directly to ${conferenceConfig.contacts.email}.`
        );
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage(
        `Unable to transmit inquiry due to a network error. Please verify your connection and retry, or email us at ${conferenceConfig.contacts.email}.`
      );
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
          as="h1"
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

              {/* Phone Numbers */}
              <div className="space-y-1.5 pt-2 border-t border-[#25231F]/10 text-xs font-mono-tech">
                <span className="text-[#25231F]/60 uppercase block">Phone</span>
                <div className="p-3 bg-[#EBE9D8] border border-[#25231F]/15 space-y-2.5">
                  {SECRETARIAT_PHONE_NUMBERS.map((phone, idx) => (
                    <div
                      key={phone.tel}
                      className={`flex items-center justify-between gap-3 ${idx > 0 ? 'pt-2 border-t border-[#25231F]/10' : ''}`}
                    >
                      <a
                        href={`tel:${phone.tel}`}
                        className="flex items-center gap-2 font-mono-tech text-xs sm:text-sm font-bold text-[#CB1B29] hover:underline group min-w-0"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#CB1B29] shrink-0 transition-transform group-hover:scale-110" />
                        <span className="truncate">{phone.display}</span>
                      </a>
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-[10px] text-[#25231F]/50 hover:text-[#CB1B29] font-mono-tech shrink-0 transition-colors"
                        aria-label={`Call ${phone.display}`}
                      >
                        Call →
                      </a>
                    </div>
                  ))}
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
                <p className="text-xs font-mono-tech text-[#25231F]/70 mt-1">
                  Inquiries are directed to our administrative email:{' '}
                  <a
                    href={`mailto:${conferenceConfig.contacts.email}`}
                    className="font-bold text-[#CB1B29] hover:underline"
                  >
                    {conferenceConfig.contacts.email}
                  </a>
                  .
                </p>
              </div>

              {/* Submission Notification Banner */}
              {submissionStatus === 'success' && (
                <div
                  role="status"
                  className="p-5 bg-emerald-50 border-2 border-emerald-600 text-emerald-950 text-xs sm:text-sm font-mono-tech space-y-3 animate-in fade-in"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-heading font-bold block text-emerald-900 text-sm">
                        Inquiry Successfully Transmitted
                      </strong>
                      <p className="font-body text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                        {statusMessage}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSubmissionStatus('idle')}
                      className="text-xs font-mono-tech text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                    >
                      Transmit Another Inquiry →
                    </button>
                    <span className="text-[10px] text-emerald-700 uppercase tracking-widest font-semibold">
                      NITAMUN HELPDESK
                    </span>
                  </div>
                </div>
              )}

              {submissionStatus === 'error' && (
                <div
                  role="alert"
                  className="p-5 bg-red-50 border-2 border-[#CB1B29] text-red-950 text-xs sm:text-sm font-mono-tech space-y-2 animate-in fade-in"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#CB1B29] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <strong className="font-heading font-bold block text-[#CB1B29] text-sm">
                        Transmission Notice
                      </strong>
                      <p className="font-body text-xs sm:text-sm text-red-900/90 leading-relaxed">
                        {statusMessage}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-red-200">
                    <a
                      href={`mailto:${conferenceConfig.contacts.email}?subject=${encodeURIComponent(
                        formData.inquiryClassification || 'NITAMUN 4.0 Inquiry'
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="text-xs font-mono-tech font-bold text-[#CB1B29] hover:underline"
                    >
                      Send directly via your email client ({conferenceConfig.contacts.email}) →
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Full Name <span className="text-[#CB1B29]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Delegate Jane Doe"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    className={`w-full p-3 bg-[#EBE9D8] border text-[#25231F] text-xs font-mono-tech rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CB1B29] ${
                      errors.fullName ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20 focus:border-[#CB1B29]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] font-mono-tech text-[#CB1B29] mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Email Address <span className="text-[#CB1B29]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="delegate@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`w-full p-3 bg-[#EBE9D8] border text-[#25231F] text-xs font-mono-tech rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CB1B29] ${
                      errors.email ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20 focus:border-[#CB1B29]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono-tech text-[#CB1B29] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Inquiry Classification */}
                <div>
                  <label htmlFor="inquiryClassification" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Inquiry Classification <span className="text-[#CB1B29]">*</span>
                  </label>
                  <select
                    id="inquiryClassification"
                    name="inquiryClassification"
                    value={formData.inquiryClassification}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, inquiryClassification: e.target.value }));
                      if (errors.inquiryClassification) setErrors((prev) => ({ ...prev, inquiryClassification: '' }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.inquiryClassification}
                    className={`w-full p-3 bg-[#EBE9D8] border text-[#25231F] text-xs font-mono-tech rounded-xs appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-[#CB1B29] ${
                      errors.inquiryClassification ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20 focus:border-[#CB1B29]'
                    }`}
                  >
                    <option value="">Choose an inquiry classification...</option>
                    {INQUIRY_CLASSIFICATIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryClassification && (
                    <span className="text-[11px] font-mono-tech text-[#CB1B29] mt-1 block">
                      {errors.inquiryClassification}
                    </span>
                  )}
                </div>

                {/* Your Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="message" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F]">
                      Your Message <span className="text-[#CB1B29]">*</span>
                    </label>
                    <span className="text-[11px] font-mono-tech text-[#25231F]/60">
                      {formData.message.length} / 1500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={1500}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Please specify your query in detail, including your institution or background if applicable..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className={`w-full p-3 bg-[#EBE9D8] border text-[#25231F] text-xs font-mono-tech rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CB1B29] resize-y ${
                      errors.message ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20 focus:border-[#CB1B29]'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono-tech text-[#CB1B29] mt-1 block">
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
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        Transmit Inquiry
                      </span>
                    )}
                  </Button>

                  <a
                    href={`mailto:${conferenceConfig.contacts.email}`}
                    className="text-xs font-mono-tech text-[#CB1B29] hover:underline flex items-center gap-1.5 font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Desk: {conferenceConfig.contacts.email}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Frequently Addressed Inquiries (FAQ Section) */}
        <div className="mt-24 pt-16 border-t border-[#25231F]/15">
          <div className="mb-12 text-center max-w-2xl mx-auto">
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
