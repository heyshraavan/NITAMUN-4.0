import React, { useState } from 'react';
import { conferenceConfig } from '../data/config';
import { AVAILABLE_COMMITTEES, getPortfoliosForCommittee } from '../data/portfolios';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { PolicyModal } from '../components/PolicyModal';
import {
  User,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Send,
  ChevronDown,
  Info
} from 'lucide-react';

const GENDERS = ['Male', 'Female', 'Other'] as const;
const ACADEMIC_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Other'] as const;
const MUN_EXPERIENCES = [
  { value: 'Beginner', label: 'Beginner', desc: 'First-time delegate or 1–2 MUN conferences' },
  { value: 'Intermediate', label: 'Intermediate', desc: '3–5 committee simulations' },
  { value: 'Advanced', label: 'Advanced', desc: '6+ simulations or Executive Board background' },
] as const;

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  institution: string;
  academicYear: string;
  munExperience: string;

  // Preference 1
  preference1Committee: string;
  preference1Portfolio1: string;
  preference1Portfolio2: string;
  preference1Portfolio3: string;
  preference1Portfolio4: string;

  // Preference 2
  preference2Committee: string;
  preference2Portfolio1: string;
  preference2Portfolio2: string;
  preference2Portfolio3: string;
  preference2Portfolio4: string;

  // Preference 3
  preference3Committee: string;
  preference3Portfolio1: string;
  preference3Portfolio2: string;
  preference3Portfolio3: string;
  preference3Portfolio4: string;

  // Preference 4
  preference4Committee: string;
  preference4Portfolio1: string;
  preference4Portfolio2: string;
  preference4Portfolio3: string;
  preference4Portfolio4: string;

  consent: boolean;
}

const initialFormState: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  institution: '',
  academicYear: '',
  munExperience: '',

  preference1Committee: '',
  preference1Portfolio1: '',
  preference1Portfolio2: '',
  preference1Portfolio3: '',
  preference1Portfolio4: '',

  preference2Committee: '',
  preference2Portfolio1: '',
  preference2Portfolio2: '',
  preference2Portfolio3: '',
  preference2Portfolio4: '',

  preference3Committee: '',
  preference3Portfolio1: '',
  preference3Portfolio2: '',
  preference3Portfolio3: '',
  preference3Portfolio4: '',

  preference4Committee: '',
  preference4Portfolio1: '',
  preference4Portfolio2: '',
  preference4Portfolio3: '',
  preference4Portfolio4: '',

  consent: false,
};

export const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'config_error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedSnapshot, setSubmittedSnapshot] = useState<RegistrationFormData | null>(null);
  const [activePolicy, setActivePolicy] = useState<'terms' | 'privacy' | null>(null);

  // General field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Committee selection change with automatic portfolio reset & duplicate swap
  const handleCommitteeChange = (prefIndex: 1 | 2 | 3 | 4, newCommittee: string) => {
    setFormData((prev) => {
      const next = { ...prev };

      // Set new committee and clear its 4 portfolios
      if (prefIndex === 1) {
        next.preference1Committee = newCommittee;
        next.preference1Portfolio1 = '';
        next.preference1Portfolio2 = '';
        next.preference1Portfolio3 = '';
        next.preference1Portfolio4 = '';
      } else if (prefIndex === 2) {
        next.preference2Committee = newCommittee;
        next.preference2Portfolio1 = '';
        next.preference2Portfolio2 = '';
        next.preference2Portfolio3 = '';
        next.preference2Portfolio4 = '';
      } else if (prefIndex === 3) {
        next.preference3Committee = newCommittee;
        next.preference3Portfolio1 = '';
        next.preference3Portfolio2 = '';
        next.preference3Portfolio3 = '';
        next.preference3Portfolio4 = '';
      } else if (prefIndex === 4) {
        next.preference4Committee = newCommittee;
        next.preference4Portfolio1 = '';
        next.preference4Portfolio2 = '';
        next.preference4Portfolio3 = '';
        next.preference4Portfolio4 = '';
      }

      // If newCommittee was already selected in another slot, clear that slot to avoid duplicate
      if (newCommittee) {
        if (prefIndex !== 1 && next.preference1Committee === newCommittee) {
          next.preference1Committee = '';
          next.preference1Portfolio1 = '';
          next.preference1Portfolio2 = '';
          next.preference1Portfolio3 = '';
          next.preference1Portfolio4 = '';
        }
        if (prefIndex !== 2 && next.preference2Committee === newCommittee) {
          next.preference2Committee = '';
          next.preference2Portfolio1 = '';
          next.preference2Portfolio2 = '';
          next.preference2Portfolio3 = '';
          next.preference2Portfolio4 = '';
        }
        if (prefIndex !== 3 && next.preference3Committee === newCommittee) {
          next.preference3Committee = '';
          next.preference3Portfolio1 = '';
          next.preference3Portfolio2 = '';
          next.preference3Portfolio3 = '';
          next.preference3Portfolio4 = '';
        }
        if (prefIndex !== 4 && next.preference4Committee === newCommittee) {
          next.preference4Committee = '';
          next.preference4Portfolio1 = '';
          next.preference4Portfolio2 = '';
          next.preference4Portfolio3 = '';
          next.preference4Portfolio4 = '';
        }
      }

      return next;
    });

    const commKey = `preference${prefIndex}Committee`;
    if (errors[commKey] || errors.committees) {
      setErrors((prev) => ({ ...prev, [commKey]: '', committees: '' }));
    }
  };

  // Portfolio selection change
  const handlePortfolioChange = (
    prefIndex: 1 | 2 | 3 | 4,
    choiceIndex: 1 | 2 | 3 | 4,
    value: string
  ) => {
    const portKey = `preference${prefIndex}Portfolio${choiceIndex}` as keyof RegistrationFormData;
    setFormData((prev) => {
      const next = { ...prev };
      // If the portfolio is chosen in another slot of this same card, clear it to avoid duplication
      ([1, 2, 3, 4] as const).forEach((otherChoiceIdx) => {
        if (otherChoiceIdx !== choiceIndex) {
          const otherPortKey = `preference${prefIndex}Portfolio${otherChoiceIdx}` as keyof RegistrationFormData;
          if (value && next[otherPortKey] === value) {
            (next[otherPortKey] as string) = '';
          }
        }
      });
      (next[portKey] as string) = value;
      return next;
    });
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const cleanedPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanedPhone.length < 8 || cleanedPhone.length > 15) {
      newErrors.phone = 'Please provide a valid phone number (8–15 digits).';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender.';
    }

    // Academic Information
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution / College name is required.';
    } else if (formData.institution.trim().length < 2) {
      newErrors.institution = 'Please enter a valid institution name.';
    }

    if (!formData.academicYear) {
      newErrors.academicYear = 'Please select your academic year.';
    }

    // MUN Experience
    if (!formData.munExperience) {
      newErrors.munExperience = 'Please select your MUN experience level.';
    }

    // Committee Preferences (All 4 are required and must be distinct)
    if (!formData.preference1Committee) {
      newErrors.preference1Committee = 'Committee Preference 1 is required.';
    }
    if (!formData.preference2Committee) {
      newErrors.preference2Committee = 'Committee Preference 2 is required.';
    }
    if (!formData.preference3Committee) {
      newErrors.preference3Committee = 'Committee Preference 3 is required.';
    }
    if (!formData.preference4Committee) {
      newErrors.preference4Committee = 'Committee Preference 4 is required.';
    }

    const selectedCommittees = [
      formData.preference1Committee,
      formData.preference2Committee,
      formData.preference3Committee,
      formData.preference4Committee,
    ].filter(Boolean);

    if (new Set(selectedCommittees).size !== selectedCommittees.length) {
      newErrors.committees = 'All four committee preferences must be distinct.';
    }

    // Consent
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the Terms and Conditions and Privacy Policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const el = document.getElementById(firstError);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const sheetDbUrl = conferenceConfig.sheetDb.apiUrl;

    if (!sheetDbUrl || sheetDbUrl === 'YOUR_SHEETDB_API_URL') {
      setIsSubmitting(false);
      setSubmitStatus('config_error');
      setErrorMessage(
        'SheetDB API endpoint is not configured. Please set the VITE_SHEETDB_API_URL environment variable to enable live spreadsheet submissions.'
      );
      return;
    }

    try {
      // Exactly 29 columns matching Google Sheet first row
      const payload = {
        data: [
          {
            timestamp: new Date().toISOString(),
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            gender: formData.gender,
            institution: formData.institution.trim(),
            academic_year: formData.academicYear,
            mun_experience: formData.munExperience,

            preference_1_committee: formData.preference1Committee,
            preference_1_portfolio_1: formData.preference1Portfolio1,
            preference_1_portfolio_2: formData.preference1Portfolio2,
            preference_1_portfolio_3: formData.preference1Portfolio3,
            preference_1_portfolio_4: formData.preference1Portfolio4,

            preference_2_committee: formData.preference2Committee,
            preference_2_portfolio_1: formData.preference2Portfolio1,
            preference_2_portfolio_2: formData.preference2Portfolio2,
            preference_2_portfolio_3: formData.preference2Portfolio3,
            preference_2_portfolio_4: formData.preference2Portfolio4,

            preference_3_committee: formData.preference3Committee,
            preference_3_portfolio_1: formData.preference3Portfolio1,
            preference_3_portfolio_2: formData.preference3Portfolio2,
            preference_3_portfolio_3: formData.preference3Portfolio3,
            preference_3_portfolio_4: formData.preference3Portfolio4,

            preference_4_committee: formData.preference4Committee,
            preference_4_portfolio_1: formData.preference4Portfolio1,
            preference_4_portfolio_2: formData.preference4Portfolio2,
            preference_4_portfolio_3: formData.preference4Portfolio3,
            preference_4_portfolio_4: formData.preference4Portfolio4,

            consent: 'TRUE',
          },
        ],
      };

      const response = await fetch(sheetDbUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmittedSnapshot({ ...formData });
        setSubmitStatus('success');
        setFormData(initialFormState);
      } else {
        setSubmitStatus('error');
        setErrorMessage(
          `The registration server responded with status ${response.status}. Your details have been preserved; please try submitting again.`
        );
      }
    } catch (err: unknown) {
      setSubmitStatus('error');
      const errMessage = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(
        `Unable to connect to the registration gateway: ${errMessage}. Your information is preserved; please retry.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setSubmittedSnapshot(null);
    setSubmitStatus('idle');
    setFormData(initialFormState);
    setErrors({});
  };

  // Helper to render committee card
  const renderPreferenceCard = (prefIndex: 1 | 2 | 3 | 4) => {
    const commKey = `preference${prefIndex}Committee` as keyof RegistrationFormData;
    const selectedCommittee = formData[commKey] as string;
    const availablePortfolios = getPortfoliosForCommittee(selectedCommittee);

    // Find other selected committees to disable them in this dropdown
    const otherSelectedCommittees = ([1, 2, 3, 4] as const)
      .filter((idx) => idx !== prefIndex)
      .map((idx) => formData[`preference${idx}Committee` as keyof RegistrationFormData] as string)
      .filter(Boolean);

    const commError = errors[commKey];

    return (
      <div
        key={prefIndex}
        className="p-5 sm:p-7 bg-[#EBE9D8] border border-[#25231F]/15 rounded-xs space-y-5 transition-all hover:border-[#CB1B29]/40"
      >
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#25231F]/15">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-xs bg-[#CB1B29] text-[#EBE9D8] text-xs font-mono-tech font-bold">
              0{prefIndex}
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#25231F]">
              Committee Preference {prefIndex} <span className="text-[#CB1B29]">*</span>
            </h4>
          </div>
          <span className="text-[11px] font-mono-tech text-[#25231F]/60 uppercase">
            {prefIndex === 1
              ? 'PRIMARY PRIORITY'
              : prefIndex === 2
              ? 'SECONDARY PRIORITY'
              : prefIndex === 3
              ? 'TERTIARY PRIORITY'
              : 'QUATERNARY PRIORITY'}
          </span>
        </div>

        {/* Committee Select (Full width) */}
        <div>
          <label
            htmlFor={`pref-${prefIndex}-comm`}
            className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5"
          >
            Select Committee <span className="text-[#CB1B29]">*</span>
          </label>
          <div className="relative">
            <select
              id={`pref-${prefIndex}-comm`}
              value={selectedCommittee}
              onChange={(e) => handleCommitteeChange(prefIndex, e.target.value)}
              aria-required="true"
              aria-invalid={!!commError}
              className={`w-full px-4 py-3 bg-[#F6F4EB] text-[#25231F] border rounded-xs font-body text-sm appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                commError ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
              }`}
            >
              <option value="">Choose Committee</option>
              {AVAILABLE_COMMITTEES.map((comm) => {
                const isTaken = otherSelectedCommittees.includes(comm);
                return (
                  <option key={comm} value={comm} disabled={isTaken}>
                    {comm} {isTaken ? '(Selected in another preference)' : ''}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-[#25231F]/60 pointer-events-none" />
          </div>
          {commError && (
            <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{commError}</p>
          )}
        </div>

        {/* Portfolio Choices (2x2 Grid on desktop, 1-col on mobile) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tech uppercase text-[#25231F]/70 font-semibold">
              Portfolio Preferences (Optional)
            </span>
            <span className="text-[10px] font-mono-tech text-[#25231F]/50">
              UP TO 4 PORTFOLIO CHOICES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {([1, 2, 3, 4] as const).map((choiceIdx) => {
              const portKey = `preference${prefIndex}Portfolio${choiceIdx}` as keyof RegistrationFormData;
              const portValue = formData[portKey] as string;

              // Find other selected portfolios within this same card
              const otherCardPortfolios = ([1, 2, 3, 4] as const)
                .filter((cIdx) => cIdx !== choiceIdx)
                .map(
                  (cIdx) =>
                    formData[`preference${prefIndex}Portfolio${cIdx}` as keyof RegistrationFormData] as string
                )
                .filter(Boolean);

              const isDisabled = !selectedCommittee;

              return (
                <div key={choiceIdx}>
                  <label
                    htmlFor={`pref-${prefIndex}-port-${choiceIdx}`}
                    className="block text-[11px] font-mono-tech uppercase text-[#25231F]/80 font-medium mb-1"
                  >
                    Portfolio Choice {choiceIdx} <span className="text-[#25231F]/40 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id={`pref-${prefIndex}-port-${choiceIdx}`}
                      value={portValue}
                      disabled={isDisabled}
                      onChange={(e) => handlePortfolioChange(prefIndex, choiceIdx, e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-[#F6F4EB] text-[#25231F] border rounded-xs font-body text-xs sm:text-sm appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] disabled:bg-[#EBE9D8] disabled:text-[#25231F]/40 disabled:cursor-not-allowed border-[#25231F]/20`}
                    >
                      <option value="">
                        {isDisabled ? 'Select committee first' : 'Choose Portfolio'}
                      </option>
                      {availablePortfolios.map((portfolio) => {
                        const isTakenInCard = otherCardPortfolios.includes(portfolio);
                        return (
                          <option key={portfolio} value={portfolio} disabled={isTakenInCard}>
                            {portfolio} {isTakenInCard ? '(Selected in another choice)' : ''}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-3.5 h-3.5 text-[#25231F]/60 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          sectionNumber="05"
          eyebrow="DELEGATE ACCREDITATION & ADMISSIONS"
          title="Register Now"
          titleAccent="NITAMUN 4.0 Online"
          subtitle="Official individual delegate registration portal. Submit your personal, academic, and four-council preference dossier for the fourth edition convened online on January 23–24, 2027."
        />

        {/* Live Conference Info Strip */}
        <div className="mb-10 p-4 sm:p-5 bg-[#F6F4EB] border-l-4 border-[#CB1B29] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CB1B29] animate-pulse" />
            <span className="text-[#25231F]/90 font-bold uppercase tracking-wider">
              {conferenceConfig.dates.displayDate.toUpperCase()} • ONLINE EDITION
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#25231F]/70">
            <span>EARLY BIRD: {conferenceConfig.registration.fees.earlyBird}</span>
            <span>•</span>
            <span>REGULAR: {conferenceConfig.registration.fees.regular}</span>
          </div>
        </div>

        {/* =========================================================================
            STATE 1: SUCCESS CONFIRMATION VIEW
            ========================================================================= */}
        {submitStatus === 'success' && submittedSnapshot && (
          <div className="p-8 sm:p-12 bg-[#F6F4EB] border-2 border-[#CB1B29] shadow-xl relative overflow-hidden animate-in fade-in duration-300 mb-16">
            <div className="flex items-start gap-4 mb-6">
              <span className="w-12 h-12 rounded-full bg-[#CB1B29]/10 text-[#CB1B29] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 text-[#CB1B29]" />
              </span>
              <div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block">
                  ACCREDITATION DOSSIER RECORDED
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] mt-1">
                  Registration Successfully Submitted
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base font-body text-[#25231F]/80 leading-relaxed mb-8">
              Thank you, <strong className="text-[#25231F]">{submittedSnapshot.fullName}</strong>. Your delegate registration has been successfully logged with the Secretariat. An official allocation advisory and conference guidelines will be dispatched to your registered email address (<strong className="text-[#25231F]">{submittedSnapshot.email}</strong>).
            </p>

            {/* Submitted Summary Dossier */}
            <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 mb-8">
              <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block mb-4">
                // SUBMITTED DELEGATE DOSSIER
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech">
                <div>
                  <span className="text-[#25231F]/60 block">FULL NAME</span>
                  <span className="font-semibold text-[#25231F] text-sm">{submittedSnapshot.fullName}</span>
                </div>
                <div>
                  <span className="text-[#25231F]/60 block">EMAIL ADDRESS</span>
                  <span className="font-semibold text-[#25231F] text-sm">{submittedSnapshot.email}</span>
                </div>
                <div>
                  <span className="text-[#25231F]/60 block">PHONE NUMBER</span>
                  <span className="font-semibold text-[#25231F]">{submittedSnapshot.phone}</span>
                </div>
                <div>
                  <span className="text-[#25231F]/60 block">GENDER / ACADEMIC YEAR</span>
                  <span className="font-semibold text-[#25231F]">
                    {submittedSnapshot.gender} • {submittedSnapshot.academicYear}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#25231F]/60 block">INSTITUTION</span>
                  <span className="font-semibold text-[#25231F]">{submittedSnapshot.institution}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#25231F]/60 block">MUN EXPERIENCE</span>
                  <span className="font-semibold text-[#25231F]">{submittedSnapshot.munExperience}</span>
                </div>

                <div className="sm:col-span-2 pt-3 border-t border-[#25231F]/10 space-y-2">
                  <span className="text-[#25231F]/60 block font-bold mb-1">
                    COMMITTEE &amp; PORTFOLIO PREFERENCES (IN PRIORITY ORDER)
                  </span>

                  {([1, 2, 3, 4] as const).map((idx) => {
                    const comm = submittedSnapshot[`preference${idx}Committee` as keyof RegistrationFormData] as string;
                    const p1 = submittedSnapshot[`preference${idx}Portfolio1` as keyof RegistrationFormData] as string;
                    const p2 = submittedSnapshot[`preference${idx}Portfolio2` as keyof RegistrationFormData] as string;
                    const p3 = submittedSnapshot[`preference${idx}Portfolio3` as keyof RegistrationFormData] as string;
                    const p4 = submittedSnapshot[`preference${idx}Portfolio4` as keyof RegistrationFormData] as string;
                    const portfolios = [p1, p2, p3, p4].filter(Boolean);

                    return (
                      <div key={idx} className="p-3 bg-[#F6F4EB] border border-[#25231F]/10 rounded-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-[#25231F] text-[#EBE9D8] text-[10px] font-bold">
                            PREF {idx}
                          </span>
                          <span className="font-bold text-[#CB1B29]">{comm}</span>
                        </div>
                        {portfolios.length > 0 && (
                          <div className="mt-1 text-[11px] text-[#25231F]/70">
                            Portfolios: {portfolios.join(' • ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="p-4 bg-[#F6F4EB] border border-[#25231F]/15 mb-8 flex items-start gap-3 text-xs font-body text-[#25231F]/80">
              <Info className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
              <div>
                <strong>Next Steps:</strong> The Substantive Board reviews committee preference dossiers in priority order. Allocation confirmation and registration fee payment clearance details will be sent within 48–72 business hours.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleResetSuccess}
                className="w-full sm:w-auto"
              >
                Register Another Delegate
              </Button>
              <a
                href={`mailto:${conferenceConfig.contacts.email}`}
                className="text-xs font-mono-tech text-[#CB1B29] hover:underline uppercase tracking-wider font-semibold"
              >
                Contact Secretariat Helpline →
              </a>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: ACTIVE REGISTRATION FORM (4 SECTIONS + CONSENT + SUBMIT)
            ========================================================================= */}
        {submitStatus !== 'success' && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-10 md:p-12 bg-[#F6F4EB] border border-[#25231F]/15 shadow-sm space-y-10 mb-16"
          >
            {/* Top Form Header */}
            <div className="pb-6 border-b border-[#25231F]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-1">
                  OFFICIAL ACCREDITATION DOSSIER
                </span>
                <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F]">
                  Register Now
                </h2>
              </div>
              <span className="text-xs font-mono-tech text-[#25231F]/60">
                <span className="text-[#CB1B29] font-bold">*</span> Indicates required field
              </span>
            </div>

            {/* Error Banners */}
            {submitStatus === 'config_error' && (
              <div
                role="alert"
                className="p-5 bg-amber-50 border-l-4 border-amber-600 text-amber-900 text-xs sm:text-sm font-body shadow-xs flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-heading font-bold block">Integration Notice:</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                role="alert"
                className="p-5 bg-red-50 border-l-4 border-[#CB1B29] text-red-950 text-xs sm:text-sm font-body shadow-xs flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-[#CB1B29] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-heading font-bold block">Submission Notice:</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                SECTION A: PERSONAL INFORMATION
                ------------------------------------------------------------------- */}
            <fieldset className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#25231F]/10">
                <span className="w-6 h-6 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center text-xs font-mono-tech font-bold">
                  A
                </span>
                <legend className="text-base sm:text-lg font-heading font-bold text-[#25231F] uppercase tracking-wide">
                  Personal Information
                </legend>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Full Name <span className="text-[#CB1B29]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm placeholder-[#25231F]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                        errors.fullName ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                      }`}
                    />
                    <User className="absolute right-3.5 top-3.5 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.fullName}</p>
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
                    onChange={handleChange}
                    placeholder="delegate@institution.edu"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm placeholder-[#25231F]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                      errors.email ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Phone Number <span className="text-[#CB1B29]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm placeholder-[#25231F]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                      errors.phone ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="sm:col-span-2">
                  <label htmlFor="gender" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Gender <span className="text-[#CB1B29]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.gender}
                      className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                        errors.gender ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                      }`}
                    >
                      <option value="">Select Gender</option>
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-[#25231F]/60 pointer-events-none" />
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.gender}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* -------------------------------------------------------------------
                SECTION B: ACADEMIC INFORMATION
                ------------------------------------------------------------------- */}
            <fieldset className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#25231F]/10">
                <span className="w-6 h-6 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center text-xs font-mono-tech font-bold">
                  B
                </span>
                <legend className="text-base sm:text-lg font-heading font-bold text-[#25231F] uppercase tracking-wide">
                  Academic Information
                </legend>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Institution / College Name */}
                <div>
                  <label htmlFor="institution" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Institution / College Name <span className="text-[#CB1B29]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="e.g. NIT Agartala / Delhi University"
                      aria-required="true"
                      aria-invalid={!!errors.institution}
                      className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm placeholder-[#25231F]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                        errors.institution ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                      }`}
                    />
                    <GraduationCap className="absolute right-3.5 top-3.5 w-4 h-4 text-[#25231F]/40 pointer-events-none" />
                  </div>
                  {errors.institution && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.institution}</p>
                  )}
                </div>

                {/* Academic Year */}
                <div>
                  <label htmlFor="academicYear" className="block text-xs font-mono-tech uppercase font-bold text-[#25231F] mb-1.5">
                    Academic Year <span className="text-[#CB1B29]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="academicYear"
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.academicYear}
                      className={`w-full px-4 py-3 bg-[#EBE9D8] text-[#25231F] border rounded-xs font-body text-sm appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB1B29] ${
                        errors.academicYear ? 'border-[#CB1B29] bg-red-50/20' : 'border-[#25231F]/20'
                      }`}
                    >
                      <option value="">Select Academic Year</option>
                      {ACADEMIC_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-[#25231F]/60 pointer-events-none" />
                  </div>
                  {errors.academicYear && (
                    <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.academicYear}</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* -------------------------------------------------------------------
                SECTION C: MUN EXPERIENCE
                ------------------------------------------------------------------- */}
            <fieldset className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#25231F]/10">
                <span className="w-6 h-6 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center text-xs font-mono-tech font-bold">
                  C
                </span>
                <legend className="text-base sm:text-lg font-heading font-bold text-[#25231F] uppercase tracking-wide">
                  MUN Experience <span className="text-[#CB1B29]">*</span>
                </legend>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {MUN_EXPERIENCES.map((exp) => {
                  const isSelected = formData.munExperience === exp.value;
                  return (
                    <label
                      key={exp.value}
                      className={`p-4 border rounded-xs cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#CB1B29] bg-[#EBE9D8] ring-1 ring-[#CB1B29] shadow-xs'
                          : 'border-[#25231F]/15 bg-[#EBE9D8]/50 hover:border-[#25231F]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-sm text-[#25231F]">{exp.label}</span>
                        <input
                          type="radio"
                          name="munExperience"
                          value={exp.value}
                          checked={isSelected}
                          onChange={handleChange}
                          className="accent-[#CB1B29] w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-[#25231F]/70 font-body leading-relaxed">{exp.desc}</p>
                    </label>
                  );
                })}
              </div>
              {errors.munExperience && (
                <p className="mt-1 text-xs font-mono-tech text-[#CB1B29]">{errors.munExperience}</p>
              )}
            </fieldset>

            {/* -------------------------------------------------------------------
                SECTION D: COMMITTEE & PORTFOLIO PREFERENCES
                FOUR SEPARATE, NUMBERED CARDS (PREF 1 TO PREF 4)
                ------------------------------------------------------------------- */}
            <fieldset className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#25231F]/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center text-xs font-mono-tech font-bold">
                    D
                  </span>
                  <legend className="text-base sm:text-lg font-heading font-bold text-[#25231F] uppercase tracking-wide">
                    Committee &amp; Portfolio Preferences <span className="text-[#CB1B29]">*</span>
                  </legend>
                </div>
                <span className="text-[11px] font-mono-tech text-[#25231F]/60 hidden sm:inline">
                  ALL 4 COUNCILS REQUIRED
                </span>
              </div>

              <p className="text-xs font-body text-[#25231F]/75 leading-relaxed">
                Rank your preference across all four simulation councils (UNSC, UNHRC, UNCSW, AIPPM). All four committee selections must be distinct. For each council, you may optionally select up to four portfolios in priority order.
              </p>

              {errors.committees && (
                <div className="p-3 bg-red-50 border border-[#CB1B29]/30 text-xs font-mono-tech text-[#CB1B29]">
                  {errors.committees}
                </div>
              )}

              <div className="space-y-6">
                {renderPreferenceCard(1)}
                {renderPreferenceCard(2)}
                {renderPreferenceCard(3)}
                {renderPreferenceCard(4)}
              </div>
            </fieldset>

            {/* -------------------------------------------------------------------
                SECTION E: TERMS, PRIVACY & CONSENT
                ------------------------------------------------------------------- */}
            <fieldset className="space-y-4 pt-2">
              <div className="p-4 sm:p-5 bg-[#EBE9D8] border border-[#25231F]/15 rounded-xs space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, consent: e.target.checked }));
                      if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                    }}
                    className="mt-1 w-4 h-4 accent-[#CB1B29] cursor-pointer shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-body text-[#25231F]/90 leading-relaxed">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setActivePolicy('terms')}
                      className="text-[#CB1B29] font-semibold underline underline-offset-2 hover:text-[#25231F] transition-colors cursor-pointer"
                    >
                      Terms and Conditions
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => setActivePolicy('privacy')}
                      className="text-[#CB1B29] font-semibold underline underline-offset-2 hover:text-[#25231F] transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    . I confirm that all information provided is accurate and represents my authentic candidature.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs font-mono-tech text-[#CB1B29] pl-7">{errors.consent}</p>
                )}
              </div>
            </fieldset>

            {/* -------------------------------------------------------------------
                SECTION F: SUBMISSION ACTION AREA
                ------------------------------------------------------------------- */}
            <div className="pt-6 border-t border-[#25231F]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs font-mono-tech text-[#25231F]/70">
                <span>CONFERENCE REGISTRATION TRACK: </span>
                <span className="font-bold text-[#CB1B29]">INDIVIDUAL DELEGATE</span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto shadow-md"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#EBE9D8] border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Registration...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Registration</span>
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* -------------------------------------------------------------------
            ADDITIONAL ASSISTANCE & PARTICIPATION GUIDELINES
            ------------------------------------------------------------------- */}
        <div className="space-y-8">
          {/* Who Can Participate Info Card */}
          <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] uppercase font-bold tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>PARTICIPATION GUIDELINES</span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] mb-4">
              Who Can Participate?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech text-[#25231F]/80">
              <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-1">
                <span className="font-bold text-[#CB1B29] block">STUDENTS &amp; SCHOLARS</span>
                <p className="leading-relaxed">
                  Open to school debaters (Grade 9+), undergraduate students, and postgraduate scholars across disciplines.
                </p>
              </div>
              <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-1">
                <span className="font-bold text-[#CB1B29] block">WORKING PROFESSIONALS</span>
                <p className="leading-relaxed">
                  Early-career professionals and policy practitioners interested in multilateral diplomacy are warmly encouraged to join.
                </p>
              </div>
            </div>
          </div>

          {/* Need Assistance Bar */}
          <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
            <div className="flex items-center gap-2.5 text-[#25231F]/80">
              <ShieldCheck className="w-4 h-4 text-[#CB1B29]" />
              <span>Have registration queries or payment questions? Email {conferenceConfig.contacts.email}</span>
            </div>
            <a
              href={`mailto:${conferenceConfig.contacts.email}?subject=NITAMUN%204.0%20Registration%20Inquiry`}
              className="text-[#CB1B29] hover:underline font-bold uppercase shrink-0"
            >
              Secretariat Desk →
            </a>
          </div>
        </div>
      </div>

      {/* Internal Terms & Conditions / Privacy Policy Modal */}
      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </div>
  );
};
