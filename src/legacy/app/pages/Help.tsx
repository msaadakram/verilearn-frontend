import { useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import {
  Search, ChevronDown, ChevronUp, BookOpen, CreditCard, Users, Settings,
  MessageCircle, Mail, Phone, HelpCircle, GraduationCap, Shield, Clock
} from 'lucide-react';

const categories = [
  { id: 'getting-started', icon: BookOpen, label: 'Getting Started', count: 6 },
  { id: 'account', icon: Settings, label: 'Account & Settings', count: 5 },
  { id: 'teachers', icon: Users, label: 'Finding Teachers', count: 5 },
  { id: 'sessions', icon: Clock, label: 'Sessions & Scheduling', count: 4 },
  { id: 'safety', icon: Shield, label: 'Trust & Safety', count: 3 },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  'getting-started': [
    { q: 'How do I create an account?', a: 'Click "Get Started" on the homepage and choose whether you\'re a student or teacher. Fill in your details, verify your email, upload your CNIC, and you\'re ready to go.' },
    { q: 'Is Verilearn free to use?', a: 'Creating an account is free. Students pay per session based on the teacher\'s rate. Teachers keep 85% of their earnings with no upfront costs.' },
    { q: 'What subjects are available?', a: 'We cover 200+ subjects across academics (math, science, languages), test prep (SAT, GRE, GMAT), professional skills, music, and more.' },
    { q: 'How does teacher matching work?', a: 'Our smart matching algorithm considers your learning goals, preferred schedule, budget, and learning style to recommend the best teachers for you.' },
    { q: 'Can I try a session before committing?', a: 'Yes! Many teachers offer a discounted or free introductory session so you can see if it\'s a good fit before booking regular sessions.' },
    { q: 'What devices can I use?', a: 'Verilearn works on any modern web browser. We support desktop, tablet, and mobile devices. A stable internet connection and webcam are recommended for video sessions.' },
  ],
  'account': [
    { q: 'How do I reset my password?', a: 'Go to the Sign In page and click "Forgot Password." Enter your email and we\'ll send you a verification link to reset your password.' },
    { q: 'Can I change my email address?', a: 'Yes, go to Settings > Account and update your email. You\'ll need to verify the new email address before the change takes effect.' },
    { q: 'How do I delete my account?', a: 'Go to Settings > Account > Delete Account. Please note this action is permanent and all your data will be removed.' },
    { q: 'Can I switch between student and teacher roles?', a: 'Yes! You can add a teacher profile to an existing student account (or vice versa) from your dashboard settings.' },
    { q: 'How do I update my profile photo?', a: 'Click your avatar in the top right corner, go to Profile, and click the camera icon on your profile photo to upload a new one.' },
  ],
  'teachers': [
    { q: 'How are teachers verified?', a: 'All teachers go through our rigorous verification process including automated CNIC identity verification via our custom built robust OCR pipeline, credential checks, and subject proficiency tests.' },
    { q: 'Can I choose my own teacher?', a: 'Absolutely. You can browse teachers by subject, rating, price, and availability, or use our matching system for personalized recommendations.' },
    { q: 'What if I\'m not satisfied with my teacher?', a: 'You can switch teachers at any time at no cost. Students are directed to a review and rating interface after every session to ensure community quality standards.' },
    { q: 'How do I become a teacher?', a: 'Sign up as a teacher, complete your profile, upload your CNIC through our automated OCR verification system, set your availability and rates.' },
    { q: 'What qualifications do teachers need?', a: 'Requirements vary by subject but most importantly include passing our rigorous CNIC OCR verification process to ensure absolute identity trust.' },
  ],
  'sessions': [
    { q: 'How long are sessions?', a: 'Sessions have a strictly enforced 30-minute duration with automated call termination. This ensures punctuality and respects schedules.' },
    { q: 'What happens after a session?', a: 'Students are directed to a session review and rating interface, while teachers are routed to an earning credit page to verify their funds.' },
    { q: 'What if a participant doesn\'t show up?', a: 'We have an automated No-Show mechanism that automatically marks sessions as "not attended" if neither participant joins within 30 minutes of the scheduled start time.' },
    { q: 'What tools are available during sessions?', a: 'Our virtual classroom provides high-quality video and audio calling via direct session connections.' },
  ],
  'safety': [
    { q: 'How do you protect my personal information?', a: 'We use industry-standard encryption, never share your data with third parties without consent, and securely manage your CNIC files during OCR verification.' },
    { q: 'How do I report inappropriate behavior?', a: 'Use the "Report" button available in every session and on every profile page. Our trust & safety team reviews all reports within 24 hours.' },
    { q: 'Is there parental oversight for minors?', a: 'Yes. Accounts for users under 18 require parental consent, and parents can monitor session history and teacher communications from a linked parent account.' },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[var(--muted)] transition-colors"
      >
        <span className="text-[var(--navy-900)] pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[var(--muted-foreground)] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)] shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-[var(--muted-foreground)] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export function Help() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const activeFaqs = faqs[activeCategory] || [];

  const filteredFaqs = searchQuery.trim()
    ? Object.values(faqs).flat().filter(
      (f) =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : activeFaqs;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[var(--teal-50)] to-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-16 h-16 bg-[var(--teal-100)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-[var(--teal-500)]" />
          </div>
          <h1 className="text-4xl md:text-5xl text-[var(--navy-900)] mb-4" style={{ lineHeight: 1.15 }}>
            How can we help?
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg mb-8">
            Search our knowledge base or browse categories below.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--teal-300)] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories + FAQ */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {!searchQuery.trim() && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${activeCategory === cat.id
                    ? 'border-[var(--teal-300)] bg-[var(--teal-50)] text-[var(--teal-600)]'
                    : 'border-[var(--border)] hover:border-[var(--teal-200)] text-[var(--muted-foreground)]'
                    }`}
                >
                  <cat.icon className="w-6 h-6" />
                  <span className="text-sm text-center">{cat.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            {searchQuery.trim() && (
              <p className="text-[var(--muted-foreground)] mb-6">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
              </p>
            )}
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12 text-[var(--muted-foreground)]">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>No results found. Try a different search term or browse the categories above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-[var(--navy-900)] mb-4">Still need help?</h2>
          <p className="text-[var(--muted-foreground)] mb-10 max-w-xl mx-auto">
            Our support team is here for you. Reach out through any of these channels.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[var(--teal-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-[var(--teal-500)]" />
              </div>
              <h4 className="text-[var(--navy-900)] mb-1">Live Chat</h4>
              <p className="text-[var(--muted-foreground)] text-sm mb-3">Available 24/7</p>
              <Button variant="secondary" size="sm">Start Chat</Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[var(--teal-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[var(--teal-500)]" />
              </div>
              <h4 className="text-[var(--navy-900)] mb-1">Email Us</h4>
              <p className="text-[var(--muted-foreground)] text-sm mb-3">support@verilearn.com</p>
              <Button variant="outline" size="sm">Send Email</Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[var(--teal-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[var(--teal-500)]" />
              </div>
              <h4 className="text-[var(--navy-900)] mb-1">Call Us</h4>
              <p className="text-[var(--muted-foreground)] text-sm mb-3">Mon–Fri, 9am–6pm</p>
              <Button variant="outline" size="sm">1-800-LEARN</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
