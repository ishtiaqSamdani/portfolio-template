import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Phone, 
  MapPin, 
  User, 
  Award, 
  Activity, 
  Heart, 
  Play, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ThumbsUp, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  Brain,
  FileText,
  AlertCircle,
  CornerDownRight,
  Printer
} from 'lucide-react';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chronic');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Booking Flow States
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isBooked, setIsBooked] = useState(false);

  // Video modal state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Custom glass cursor tracking
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- GEMINI CO-PILOT STATE VARIABLES ---
  const [aiTool, setAiTool] = useState('translator'); 
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const themes = {
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      primaryText: 'text-blue-800',
      heroTextAccent: 'text-sky-300',
      bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
      accentBg: 'bg-blue-50',
      borderTheme: 'border-blue-200',
      focusRing: 'focus:ring-blue-600',
      badge: 'bg-blue-100 text-blue-950 font-bold',
      borderFocus: 'focus:border-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      // Dynamic Theme checks & Dots
      checkBg: 'bg-blue-100',
      checkText: 'text-blue-900',
      dotActive: 'bg-blue-500',
      highlightText: 'text-blue-400'
    },
    emerald: {
      primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      primaryText: 'text-emerald-800',
      heroTextAccent: 'text-emerald-300',
      bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
      accentBg: 'bg-emerald-50',
      borderTheme: 'border-emerald-200',
      focusRing: 'focus:ring-emerald-600',
      badge: 'bg-emerald-100 text-emerald-950 font-bold',
      borderFocus: 'focus:border-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      // Dynamic Theme checks & Dots
      checkBg: 'bg-emerald-100',
      checkText: 'text-emerald-900',
      dotActive: 'bg-emerald-500',
      highlightText: 'text-emerald-400'
    },
    royal: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      primaryText: 'text-purple-800',
      heroTextAccent: 'text-purple-300',
      bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
      accentBg: 'bg-purple-50',
      borderTheme: 'border-purple-200',
      focusRing: 'focus:ring-purple-600',
      badge: 'bg-purple-100 text-purple-950 font-bold',
      borderFocus: 'focus:border-purple-600',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      // Dynamic Theme checks & Dots
      checkBg: 'bg-purple-100',
      checkText: 'text-purple-900',
      dotActive: 'bg-purple-500',
      highlightText: 'text-purple-400'
    }
  };

  const theme = themes[currentTheme];

  const doctorProfile = {
    name: "Dr. Devendra Kumar, BHMS, MD (Homeo)",
    title: "Senior Consultant Classical Homeopath & Wellness Expert",
    tagline: "Unlocking your body's natural defensive systems with personalized, zero-side-effect constitutional remedies.",
    aboutShort: "Over 16 years of clinical excellence in Rajahmundry, treating chronic, lifestyle, and autoimmune diseases safely. Expert in constitutional prescribing and paediatric homeopathy.",
    location: "Door No: 28-14-3, Danavaipeta, Rajahmundry, East Godavari District, Andhra Pradesh - 533103",
    stats: {
      patientsCount: "12,000+",
      satisfaction: "99.4%",
      experience: "16+ Years",
      publications: "25+ Research Papers"
    }
  };

  const testimonials = [
    {
      id: 1,
      quote: "My 8-year-old son suffered from chronic respiratory allergies for years. After 3 months of Dr. Devendra's treatment, his wheezing stopped and his immunity improved drastically. No more heavy inhalers!",
      author: "Srinivas Rao K.",
      designation: "High School Principal, Rajahmundry",
      rating: 5
    },
    {
      id: 2,
      quote: "Dr. Devendra is incredible. He spent an hour understanding not just my physical eczema symptoms, but my stress, sleep, and lifestyle. The constitutional drops have completely cleared my skin.",
      author: "Anitha Reddy",
      designation: "Software Engineer, Rajahmundry",
      rating: 5
    },
    {
      id: 3,
      quote: "I was highly skeptical about homeopathy for my chronic rheumatoid arthritis. But Dr. Devendra explained the science, and within months my joint inflammation reduced. Truly professional treatment.",
      author: "P. Venkateswara Rao",
      designation: "Retired Bank Manager",
      rating: 5
    }
  ];

  const services = [
    { id: 'chronic', title: 'Chronic Disease Care', desc: 'Individually selected remedies for long-standing respiratory, dermatological, and digestive conditions.', price: '₹500' },
    { id: 'paediatric', title: 'Gentle Paediatric Care', desc: 'Safe, sweet, non-toxic constitutional remedies formulated specifically for children\'s long-term immunity.', price: '₹400' },
    { id: 'constitutional', title: 'Constitutional Mapping', desc: 'In-depth evaluation of your physical, mental, and emotional health parameters to locate your primary Simillimum.', price: '₹800' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const callGeminiAPI = async (prompt, systemPrompt) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    let attempt = 0;
    const maxRetries = 5;
    const delays = [1000, 2000, 4000, 8000, 16000];

    while (attempt < maxRetries) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) throw new Error(`Server returned status code: ${response.status}`);

        const data = await response.json();
        const extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (extractedText) return extractedText;
        else throw new Error("Received empty response structure from LLM");
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw new Error("Unable to establish secure link with Gemini. Please try again.");
        await new Promise((resolve) => setTimeout(resolve, delays[attempt - 1]));
      }
    }
  };

  const handleAiAction = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    setAiLoading(true);
    setAiResult('');
    setAiError('');

    let prompt = "";
    let systemPrompt = "";

    if (aiTool === 'translator') {
      prompt = `Translate the following diagnostic, medical report, or laboratory text into comforting, holistic layperson explanation and explain how Homeopathy targets this root-cause:\n\n"${aiInput}"`;
      systemPrompt = `You are a professional clinical assistant working at Dr. Devendra Kumar's Homeopathy clinic in Rajahmundry.
Your task is to translate cold, intimidating medical lab reports into a warm, supportive, and extremely clear layperson summary.
Format your response using bold, highly readable headers:
1. **Clinical Summary** (Simplify the clinical report terminology, explain it using warm, clear everyday metaphors).
2. **The Holistic Root-Cause View** (Briefly describe how constitutional holistic homeopathy views and aims to stimulate healing for these symptoms without harsh side effects).
3. **Important Questions for Dr. Devendra** (Provide 3 thoughtful, tailored questions to ask during their next appointment).
4. **Hopeful Healing Compass** (Provide an optimistic, warm, and comforting concluding thought).`;
    } else {
      prompt = `Help me structure a beautiful clinical intake checklist based on these chronic symptoms, timeline, and daily stresses:\n\n"${aiInput}"`;
      systemPrompt = `You are Dr. Devendra Kumar's senior clinical intake assistant.
Your task is to take a patient's unstructured descriptions of their chronic issues, stress triggers, and thermal/food preferences, and structure them into a pristine Consultation Preparation Sheet.`;
    }

    try {
      const result = await callGeminiAPI(prompt, systemPrompt);
      setAiResult(result);
    } catch (err) {
      setAiError(err.message || "An unexpected error occurred while processing. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setClientInfo({ name: '', email: '', phone: '', notes: '' });
    setIsBooked(false);
  };

  const printAiReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-slate-900 selection:text-white transition-colors duration-500">
      
      {/* Dynamic Cursor Replacement */}
      <style>{`
        .custom-cursor {
          display: none;
        }

        .custom-cursor-ball {
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.15) 70%);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 10px 24px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,255,255,0.55), 0 0 0 1px rgba(0,0,0,0.2);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        @media (hover: hover) and (pointer: fine) {
          body, a, button, select, input, textarea, [role="button"] {
            cursor: none !important;
          }

          .custom-cursor {
            display: block;
          }
        }
      `}</style>

      <div
        className="custom-cursor fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        aria-hidden="true"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      >
        <div className="custom-cursor-ball w-6 h-6 rounded-full" />
      </div>

      {/* SELLER CONTROL BAR - Dynamic Theme Switcher & Value Prop */}
      <div className="bg-slate-950 text-slate-300 py-3.5 px-4 text-xs sticky top-0 z-50 border-b border-slate-800 shadow-md backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wider">PROTOTYPE DEMO MODE</span>
            <span className="text-slate-400">| Custom Homeopathy Framework</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-200 font-bold">Select Template Color Preset:</span>
            <div className="flex gap-2">
              {Object.keys(themes).map((tKey) => (
                <button
                  key={tKey}
                  onClick={() => setCurrentTheme(tKey)}
                  className={`px-3 py-1 rounded-full border text-[11px] font-black transition-all ${
                    currentTheme === tKey 
                      ? 'bg-white text-slate-950 border-white shadow-sm' 
                      : 'border-slate-800 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  {tKey.charAt(0).toUpperCase() + tKey.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOLID CONTIGUOUS DARK HEADER & HERO BLOCK - Solves all contrast/overflow cutting issues on mobile */}
      <div className={`relative bg-gradient-to-b ${theme.bgGradient} text-white pt-4 pb-20 md:pb-32 transition-colors duration-500`}>
        
        {/* Subtle decorative background patterns inside the dark block */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* HEADER & NAVIGATION inside the dark block (Guarantees perfect link contrast) */}
        <header className="py-6 px-6 md:px-12 relative z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${theme.buttonBg} shadow-md`}>
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">Dr. Devendra Kumar</span>
                <span className={`text-xs font-bold tracking-wider ${theme.heroTextAccent} block`}>BHMS, MD (Homeopathy)</span>
              </div>
            </div>

            {/* Desktop Navigation - Upgraded to lg:flex to ensure it renders on laptops correctly */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-extrabold text-slate-100">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#specialties" className="hover:text-white transition-colors">Treatments</a>
              <a href="#ai-copilot" className="hover:text-white transition-colors">✨ Patient AI Companion</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Patient Stories</a>
              <a href="#booking" className="hover:text-white transition-colors">Consultation</a>
            </nav>

            {/* Desktop CTA Action buttons */}
            <div className="hidden lg:flex items-center gap-6">
              <a 
                href="tel:+918900192" 
                className="flex items-center gap-2 text-[15px] font-black text-white hover:text-slate-200"
              >
                <Phone className="h-4.5 w-4.5 text-emerald-400" />
                <span>+91 555-890-0192</span>
              </a>
              <a 
                href="#booking" 
                className={`px-6 py-3 rounded-full text-sm font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all ${theme.primary}`}
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile Menu Trigger - Now hidden properly on lg (1024px) screens to prioritize desktop navbar */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-white bg-slate-900 bg-opacity-65 rounded-xl hover:bg-opacity-80 transition-all border border-slate-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* HERO SECTION - Embedded straight inside the dark wrapper container */}
        {}
        <section className="relative z-20 pt-8 px-6 md:px-12">
          {/* 
            FIXED SQUISHING:
            Layout switches to 12 columns only on lg: screens.
            Text copy takes lg:col-span-7 (spacious layout).
            Doctor Portrait takes lg:col-span-5.
            Value stack cards wrap below them seamlessly on tablet & 1024px screens, and only align on the right on xl screens!
          */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-5 text-white space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 text-xs font-black tracking-wide">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="text-slate-100">99.4% Patient Recovery Rate</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-tight leading-none">
                BECAUSE <br />
                <span className="font-black text-white">EVERY LIFE</span> <br />
                MATTERS
              </h1>

              <p className="text-slate-200 text-lg font-bold leading-relaxed max-w-lg">
                {doctorProfile.tagline}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#booking" 
                  className={`px-8 py-4 rounded-xl text-sm font-black shadow-xl flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all ${theme.primary}`}
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a 
                  href="#ai-copilot" 
                  className="px-6 py-4 rounded-xl text-sm font-black border-2 border-white border-opacity-35 hover:bg-white hover:bg-opacity-10 transition-all text-center flex items-center gap-2 justify-center"
                >
                  <span>Try Holistic AI</span>
                  <Sparkles className="h-4.5 w-4.5 text-amber-300" />
                </a>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 bg-opacity-65 p-4 rounded-2xl border border-white border-opacity-15 max-w-md">
                <div className="flex -space-x-3">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Patient" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" alt="Patient" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150" alt="Patient" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">{doctorProfile.stats.patientsCount} Families Helped</div>
                  <div className="text-xs text-slate-300 font-bold">Safe clinical homeopathy in Rajahmundry</div>
                </div>
              </div>

            </div>

            {/* Central Column: Elegant Real-Photo Mockup */}
            {}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl bg-slate-900 border border-white border-opacity-20 p-3">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-950 relative flex items-end justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
                  <img 
                    className="w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105" 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" 
                    alt="Dr. Devendra Kumar" 
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%]">
                    <div className="bg-slate-900 bg-opacity-95 text-white py-3.5 px-4 rounded-xl text-center border border-slate-800 shadow-xl">
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400 block mb-0.5 font-bold">BHMS, MD (Homeo)</span>
                      <span className="text-xs font-black text-slate-100">Classical Constitutional Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Non-Squishing Value Stack */}
            {}
            <div className="col-span-12 xl:col-span-3 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-6 text-white">
              
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-white border-opacity-10">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${theme.heroTextAccent} shrink-0`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white mb-1">Academic Credentials</h3>
                    <p className="text-xs text-slate-200 leading-relaxed font-bold">
                      BHMS Graduate, MD in Repertory & Constitutional prescribing from elite institutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-white border-opacity-10">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${theme.heroTextAccent} shrink-0`}>
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white mb-1">Root-Cause Restoration</h3>
                    <p className="text-xs text-slate-200 leading-relaxed font-bold">
                      We do not suppress symptoms. We stimulate the body's natural vital force to cure from within.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-white border-opacity-10">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${theme.heroTextAccent} shrink-0`}>
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white mb-1">Deep Constitutional Study</h3>
                    <p className="text-xs text-slate-200 leading-relaxed font-bold">
                      Our initial consultation takes up to 45 minutes to map your unique physical & emotional makeup.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950 bg-opacity-95 backdrop-blur-lg z-50 flex flex-col justify-between p-8 animate-fade-in">
          <div>
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-black text-white">Dr. Devendra Kumar</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-xl font-black text-slate-200">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">About</a>
              <a href="#specialties" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Treatments</a>
              <a href="#ai-copilot" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">✨ Patient AI Assistant</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Patient Stories</a>
              <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Consultation</a>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <a href="tel:+918900192" className="flex items-center justify-center gap-2 text-white py-3.5 border border-slate-800 rounded-2xl font-bold bg-slate-900">
              <Phone className="h-5 w-5 text-emerald-400" />
              <span>+91 555-890-0192</span>
            </a>
            <a 
              href="#booking" 
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full py-4 text-center rounded-2xl font-black ${theme.primary}`}
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}

      {/* METRICS & PROOF BANNER */}
      <section id="experience" className="bg-slate-100 border-y border-slate-200 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <div className={`text-4xl md:text-5xl font-black ${theme.primaryText}`}>
                {doctorProfile.stats.experience}
              </div>
              <div className="text-sm text-slate-800 font-extrabold">Clinical Practice</div>
            </div>

            <div className="space-y-1">
              <div className={`text-4xl md:text-5xl font-black ${theme.primaryText}`}>
                {doctorProfile.stats.patientsCount}
              </div>
              <div className="text-sm text-slate-800 font-extrabold">Successful Operations</div>
            </div>

            <div className="space-y-1">
              <div className={`text-4xl md:text-5xl font-black ${theme.primaryText}`}>
                {doctorProfile.stats.publications}
              </div>
              <div className="text-sm text-slate-800 font-extrabold">Medical Journals Published</div>
            </div>

            <div className="space-y-1">
              <div className={`text-4xl md:text-5xl font-black ${theme.primaryText}`}>
                99.8%
              </div>
              <div className="text-sm text-slate-800 font-extrabold">Safety Standard Compliance</div>
            </div>

          </div>
        </div>
      </section>

      {/* DR. DEVENDRA'S DETAILED BIOGRAPHY / TRUST SECTION */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl aspect-video bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                alt="Clinic inside Rajahmundry" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900 bg-opacity-45 flex items-center justify-center">
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="h-16 w-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
                >
                  <Play className="h-6 w-6 fill-current text-slate-950" />
                </button>
              </div>
            </div>
            <div className="mt-6 flex gap-3 p-4 bg-slate-50 border border-slate-300 rounded-2xl items-start">
              <MapPin className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-extrabold text-slate-900 text-sm">Consultation Chambers</h5>
                <p className="text-xs text-slate-800 leading-relaxed mt-0.5 font-bold">{doctorProfile.location}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className={`text-xs uppercase tracking-widest ${theme.primaryText} font-black block`}>About Dr. Devendra Kumar</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Pioneering Holistic Healing Practices in Andhra Pradesh
            </h2>
            <p className="text-slate-800 leading-relaxed font-extrabold">
              Dr. Devendra Kumar believes that true healing is always gentle, rapid, and permanent. Over the past 16 years, his dedicated clinic in Rajahmundry has emerged as a beacon of clinical classical homeopathy, serving patients across East & West Godavari and beyond.
            </p>
            <p className="text-slate-700 leading-relaxed font-bold text-sm">
              Each constitutional evaluation compiles physical tendencies, dietary triggers, emotional stresses, and systemic medical history to construct a highly personalized Simillimum remedy.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex-1 text-center">
                <span className="text-2xl font-black text-slate-950 block">16+</span>
                <span className="text-xs text-slate-700 font-extrabold">Years Practice</span>
              </div>
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex-1 text-center">
                <span className="text-2xl font-black text-slate-950 block">12k+</span>
                <span className="text-xs text-slate-700 font-extrabold">Happy Patients</span>
              </div>
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex-1 text-center">
                <span className="text-2xl font-black text-slate-950 block">Zero</span>
                <span className="text-xs text-slate-700 font-extrabold">Side Effects</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE SPECIALTIES / TREATMENTS SECTION - Dynamic Theme Aware Icons Enabled! */}
      {}
      <section id="specialties" className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs uppercase tracking-widest ${theme.primaryText} font-black block mb-3`}>Clinical Specialty Focus</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Scientific Homeopathy for Chronic Illnesses
            </h2>
            <p className="mt-4 text-lg text-slate-800 font-bold leading-relaxed">
              We specialize in deep structural remedies designed to treat stubborn chronic disorders and boost developmental immunity in young children.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Nav: Interactive Specialization Tabs */}
            <div className="lg:col-span-4 space-y-3">
              <button
                onClick={() => setActiveTab('chronic')}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeTab === 'chronic'
                    ? `bg-white shadow-xl ${theme.borderTheme} border-l-4 border-l-${currentTheme}-700`
                    : 'border-slate-350 hover:border-slate-400 bg-transparent'
                }`}
              >
                <h4 className="font-extrabold text-slate-950">Chronic Disease & Skin Therapy</h4>
                <p className="text-xs text-slate-700 mt-1 font-bold">Resolving stubborn asthma, eczema, rheumatoid arthritis, and digestive issues.</p>
              </button>

              <button
                onClick={() => setActiveTab('paediatric')}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeTab === 'paediatric'
                    ? `bg-white shadow-xl ${theme.borderTheme} border-l-4 border-l-${currentTheme}-700`
                    : 'border-slate-350 hover:border-slate-400 bg-transparent'
                }`}
              >
                <h4 className="font-extrabold text-slate-950">Gentle Paediatric Protocols</h4>
                <p className="text-xs text-slate-700 mt-1 font-bold">Sweet, safe, and easily consumable remedies for childhood allergies and recurrent fevers.</p>
              </button>

              <button
                onClick={() => setActiveTab('constitutional')}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeTab === 'constitutional'
                    ? `bg-white shadow-xl ${theme.borderTheme} border-l-4 border-l-${currentTheme}-700`
                    : 'border-slate-350 hover:border-slate-400 bg-transparent'
                }`}
              >
                <h4 className="font-extrabold text-slate-950">Constitutional Remedy Mapping</h4>
                <p className="text-xs text-slate-700 mt-1 font-bold">Detailed physical, mental, and hereditary mapping to trace your fundamental baseline remedy.</p>
              </button>
            </div>

            {/* Right Panel: Tab Content Display */}
            {/* FIXED THEME-AWARE COLORING: Icons dynamically reflect chosen color theme profile */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              
              {activeTab === 'chronic' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${theme.accentBg} ${theme.primaryText} font-black text-sm`}>Focus 01</span>
                    <h3 className="text-2xl font-black text-slate-950">Chronic Disease & Skin Therapy</h3>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-bold text-base">
                    Chronic conditions like asthma, psoriasis, migraine, and inflammatory bowel diseases originate from an internal systemic imbalance. Our homeopathic treatment works on deep tissue restoration and resets immune hypersensitivity.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Advanced Psoriasis & Eczema care</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Asthma & Bronchitis support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Rheumatoid Arthritis management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Irritable Bowel Syndrome (IBS) cure</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'paediatric' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${theme.accentBg} ${theme.primaryText} font-black text-sm`}>Focus 02</span>
                    <h3 className="text-2xl font-black text-slate-950">Gentle Paediatric Immunity Protocols</h3>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-bold text-base">
                    Children respond beautifully to homeopathic remedies. We provide highly palatable, non-toxic, chemical-free solutions to naturally build up immune parameters in children experiencing recurrent colds, tonsillitis, or concentration concerns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Recurrent Tonsillitis & Cough Care</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Childhood Allergy Shielding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Behavioral & Concentration support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Sweet Globules (highly liked by kids)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'constitutional' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${theme.accentBg} ${theme.primaryText} font-black text-sm`}>Focus 03</span>
                    <h3 className="text-2xl font-black text-slate-950">Constitutional Remedy Mapping</h3>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-bold text-base">
                    No two individuals are alike, so their remedies shouldn't be either. Dr. Devendra conducts a detailed personal interview to identify constitutional factors—such as physical temperament, response to weather conditions, sleep structures, and family medical histories.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Deep Miasmatic Inheritance Audit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Mental & Temperament Mapping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">Thermal Preference Auditing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full ${theme.checkBg} flex items-center justify-center ${theme.checkText}`}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <span className="text-sm font-black text-slate-800">True Simillimum Selection Method</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* GEMINI PATIENT CO-PILOT CENTER */}
      <section id="ai-copilot" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs ${theme.badge} uppercase tracking-wider mb-3`}>
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Next-Gen Holistic Guidance</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Patient Co-Pilot Center
            </h2>
            <p className="mt-4 text-slate-800 font-bold leading-relaxed">
              Confused by heavy medical terms, or preparing to see Dr. Devendra for the first time? Our AI tools translate lab reports and compile in-depth intake checklists.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 bg-slate-100 p-8 border-r border-slate-200 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-black text-xl text-slate-950 flex items-center gap-2">
                    <Brain className={`h-5 w-5 ${theme.primaryText}`} />
                    <span>Select AI Assistant</span>
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    Choose a smart workflow designed to clarify diagnostic jargon and track lifestyle factors.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setAiTool('translator');
                      setAiInput('');
                      setAiResult('');
                      setAiError('');
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      aiTool === 'translator'
                        ? 'bg-white shadow-md border-slate-400 border-l-4 border-l-blue-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-white bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className={`h-4.5 w-4.5 ${aiTool === 'translator' ? theme.primaryText : 'text-slate-600'}`} />
                      <span className="font-extrabold text-sm text-slate-950">Jargon Report Translator</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-bold">
                      Translate blood panels, diagnostic scans, and medical jargon into straightforward explanations.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setAiTool('prep-memo');
                      setAiInput('');
                      setAiResult('');
                      setAiError('');
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      aiTool === 'prep-memo'
                        ? 'bg-white shadow-md border-slate-400 border-l-4 border-l-purple-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-white bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className={`h-4.5 w-4.5 ${aiTool === 'prep-memo' ? 'text-purple-600' : 'text-slate-600'}`} />
                      <span className="font-extrabold text-sm text-slate-950">Consult Preparation Memo</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-bold">
                      Organize chronic timelines, triggers, physical sensitivities, and stresses into an organized summary.
                    </p>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-300 text-xs text-slate-800 leading-relaxed font-bold flex items-start gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>Information remains private. You can print out the compiled summaries to share directly with Dr. Devendra.</span>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between min-h-[480px]">
              {!aiResult && !aiLoading && (
                <form onSubmit={handleAiAction} className="space-y-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <label className="block text-xs font-black text-slate-800 uppercase tracking-widest">
                      {aiTool === 'translator' 
                        ? 'Paste Clinical Report Jargon below' 
                        : 'List Symptoms, Timeline, & Worries'
                      }
                    </label>
                    <textarea
                      required
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      rows="8"
                      className={`w-full p-4 border border-slate-350 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-opacity-50 text-slate-900 bg-white ${theme.borderFocus} ${theme.focusRing}`}
                      placeholder={aiTool === 'translator'
                        ? "Example: High titers of Rheumatoid Factor (RF) detected. Erythrocyte Sedimentation Rate (ESR) is 45 mm/hr, suggesting elevated systemic acute-phase inflammation..."
                        : "Example: I have suffered from chronic migraine headaches for 3 years, mostly triggered by direct hot sunlight or high stress levels. Symptoms get better under a cool fan..."
                      }
                    />
                    <div className="text-xs text-slate-700 flex items-center gap-1.5 font-bold">
                      <AlertCircle className="h-4 w-4 text-slate-600 shrink-0" />
                      <span>Never paste personal Aadhaar or patient registration card numbers. Only input symptoms or reports.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-xl text-sm font-black shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all ${theme.primary}`}
                  >
                    <span>Generate AI Explanation ✨</span>
                    <Sparkles className="h-4.5 w-4.5 text-amber-250 fill-amber-200" />
                  </button>
                </form>
              )}

              {aiLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 h-full my-auto">
                  <div className="relative">
                    <div className={`h-16 w-16 rounded-full border-4 border-slate-300 border-t-current ${theme.primaryText} animate-spin`} />
                    <Sparkles className="h-6 w-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-lg">Consulting Holistic Medical AI...</h4>
                    <p className="text-sm text-slate-700 max-w-sm mx-auto leading-relaxed font-bold">
                      Simplifying your reports and designing diagnostic summaries using Dr. Devendra's custom Gemini interface.
                    </p>
                  </div>
                </div>
              )}

              {aiError && (
                <div className="p-6 bg-red-50 border border-red-200 rounded-2xl space-y-4 animate-fade-in my-auto">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-red-950 text-sm">System Alert</h4>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed font-bold">{aiError}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setAiError(''); setAiLoading(false); }}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold rounded-lg transition-all"
                  >
                    Retry Request
                  </button>
                </div>
              )}

              {aiResult && !aiLoading && (
                <div className="space-y-6 animate-fade-in print:p-0">
                  <div className="flex items-center justify-between border-b border-slate-300 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${theme.accentBg} ${theme.primaryText}`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-950 text-sm">Your Structured Checklist</h4>
                        <span className="text-[10px] text-slate-700 uppercase tracking-widest block font-bold">Validated for Constitutional Mapping</span>
                      </div>
                    </div>
                    <button
                      onClick={printAiReport}
                      className="p-2 text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-200 flex items-center gap-1.5 text-xs font-bold border border-slate-300 bg-white"
                      title="Print This AI Guide"
                    >
                      <Printer className="h-4.5 w-4.5 text-slate-800" />
                      <span className="hidden sm:inline">Print / Save Memo</span>
                    </button>
                  </div>

                  <div className="prose prose-sm text-slate-900 space-y-4 max-h-[340px] overflow-y-auto pr-2 scrollbar-thin text-sm leading-relaxed font-extrabold">
                    {aiResult.split('\n').map((line, idx) => {
                      if (line.startsWith('### ')) {
                        return <h5 key={idx} className="font-black text-slate-950 text-base mt-4 block">{line.replace('### ', '')}</h5>;
                      } else if (line.startsWith('## ')) {
                        return <h4 key={idx} className="font-black text-slate-950 text-lg mt-6 block border-b border-slate-300 pb-1">{line.replace('## ', '')}</h4>;
                      } else if (line.startsWith('# ')) {
                        return <h3 key={idx} className="font-black text-slate-950 text-xl block">{line.replace('# ', '')}</h3>;
                      } else if (line.startsWith('- ') || line.startsWith('* ')) {
                        return (
                          <div key={idx} className="flex items-start gap-2 pl-2 mt-1.5 text-slate-900">
                            <CornerDownRight className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${theme.primaryText}`} />
                            <span>{line.substring(2)}</span>
                          </div>
                        );
                      } else if (line.trim() === '') {
                        return <div key={idx} className="h-2" />;
                      } else {
                        const parts = line.split('**');
                        return (
                          <p key={idx} className="text-slate-800">
                            {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-black text-slate-950">{part}</strong> : part)}
                          </p>
                        );
                      }
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-300">
                    <button
                      onClick={() => { setAiResult(''); setAiInput(''); }}
                      className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-850 font-bold text-xs rounded-xl transition-all"
                    >
                      Process New Document
                    </button>
                    <a
                      href="#booking"
                      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all text-center flex-1 ${theme.primary}`}
                    >
                      Schedule Appointment
                    </a>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE PATIENT TESTIMONIAL SLIDER */}
      {}
      {/* FIXED THEME-AWARE STYLES: Active Dots & Highlights match Royal/Emerald/Blue perfectly */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-slate-950 text-white relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 bg-opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 bg-opacity-5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">Patient Success Journeys</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Rajahmundry Families Share Their Recovery Stories
            </h2>
            <div className={`h-1 w-20 ${theme.dotActive} mx-auto rounded-full mt-4`} />
          </div>

          <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] p-8 md:p-14 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex justify-center gap-1">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl font-medium text-slate-150 leading-relaxed max-w-2xl mx-auto italic">
                "{testimonials[currentSlide].quote}"
              </blockquote>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800">
              <cite className="not-italic block">
                <span className="font-extrabold text-base text-slate-100 block">{testimonials[currentSlide].author}</span>
                {/* designation dynamic theme accent highlight applied */}
                <span className={`text-xs ${theme.highlightText} uppercase tracking-widest font-bold mt-1 block`}>{testimonials[currentSlide].designation}</span>
              </cite>
            </div>

            <div className="flex justify-between items-center mt-8 pt-4">
              
              {/* Pagination indicators - Uses dynamic dot styling */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? `w-8 ${theme.dotActive}` : 'w-2.5 bg-slate-700'}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all border border-slate-700"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all border border-slate-700"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* APPOINTMENT SCHEDULER WIDGET */}
      <section id="booking" className="py-24 px-6 md:px-12 bg-white border-t border-slate-150">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className={`text-xs uppercase tracking-widest ${theme.primaryText} font-black block mb-3`}>Streamlined Booking</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              Request Your Consultation Slot
            </h2>
            <p className="mt-3 text-slate-800 font-bold max-w-xl mx-auto">
              Choose your service type, set your date and preferred time, and secure your session immediately.
            </p>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] border border-slate-300 p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            <div className="flex items-center justify-center gap-3 mb-10 text-xs font-black tracking-wider">
              <span className={`px-3.5 py-2 rounded-full transition-all ${bookingStep >= 1 ? theme.primary : 'bg-slate-200 text-slate-800'}`}>1. Select Service</span>
              <span className="text-slate-300">—</span>
              <span className={`px-3.5 py-2 rounded-full transition-all ${bookingStep >= 2 ? theme.primary : 'bg-slate-200 text-slate-800'}`}>2. Select Timing</span>
              <span className="text-slate-300">—</span>
              <span className={`px-3.5 py-2 rounded-full transition-all ${bookingStep >= 3 ? theme.primary : 'bg-slate-200 text-slate-800'}`}>3. Patient Info</span>
            </div>

            {!isBooked ? (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {bookingStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-lg font-black text-slate-900">Choose Consultation Focus:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {services.map((serv) => (
                        <div 
                          key={serv.id}
                          onClick={() => setSelectedService(serv.title)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedService === serv.title 
                              ? `bg-white border-slate-900 ring-2 ring-slate-950 shadow-md` 
                              : 'border-slate-300 bg-white hover:border-slate-400'
                          }`}
                        >
                          <h5 className="font-black text-slate-950 mb-1">{serv.title}</h5>
                          <p className="text-xs text-slate-800 leading-relaxed mb-4 font-bold">{serv.desc}</p>
                          <div className={`text-sm font-black ${theme.primaryText}`}>{serv.price}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        disabled={!selectedService}
                        onClick={() => setBookingStep(2)}
                        className={`px-8 py-3.5 rounded-xl text-sm font-black flex items-center gap-2 ${
                          selectedService ? theme.primary : 'bg-slate-200 text-slate-600 cursor-not-allowed border border-slate-300'
                        }`}
                      >
                        <span>Next Step</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-lg font-black text-slate-900">Select Date & Time Slot:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-850 mb-2 uppercase tracking-widest">Appointment Date</label>
                        <input 
                          type="date" 
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-850 mb-2 uppercase tracking-widest">Available Times</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['09:30 AM', '11:30 AM', '03:00 PM', '05:30 PM'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3.5 px-2 rounded-xl text-xs font-black text-center border transition-all ${
                                selectedTime === slot 
                                  ? `bg-slate-950 text-white border-transparent shadow-md` 
                                  : 'bg-white border-slate-350 hover:border-slate-400 text-slate-800'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-between pt-6 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="px-6 py-3.5 rounded-xl text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 transition-all text-slate-850"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setBookingStep(3)}
                        className={`px-8 py-3.5 rounded-xl text-sm font-black flex items-center gap-2 ${
                          (selectedDate && selectedTime) ? theme.primary : 'bg-slate-200 text-slate-600 cursor-not-allowed border border-slate-300'
                        }`}
                      >
                        <span>Next Step</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h4 className="text-lg font-black text-slate-900">Your Contact Details:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name"
                          value={clientInfo.name}
                          onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-950"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="name@domain.com"
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-950"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-950"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Clinical Concerns / Chronic Symptoms Timeline (Optional)</label>
                        <textarea 
                          rows="3"
                          placeholder="Provide a brief description of past therapies, symptom aggravations, or general questions..."
                          value={clientInfo.notes}
                          onChange={(e) => setClientInfo({...clientInfo, notes: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-950"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="px-6 py-3.5 rounded-xl text-sm font-bold border border-slate-300 bg-white hover:bg-slate-100 transition-all text-slate-805"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className={`px-8 py-3.5 rounded-xl text-sm font-black flex items-center gap-2 ${theme.primary}`}
                      >
                        <span>Confirm Consultation</span>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                )}

              </form>
            ) : (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-950">Consultation Confirmed!</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-semibold">
                    Thank you, <strong className="text-slate-950">{clientInfo.name}</strong>. Dr. Devendra Kumar's clinical desk at Rajahmundry will review your details for <strong className="text-slate-950">{selectedService}</strong> on <strong className="text-slate-950">{selectedDate}</strong> at <strong className="text-slate-950">{selectedTime}</strong> and SMS a confirmation code shortly.
                  </p>
                </div>
                <button
                  onClick={resetBooking}
                  className="px-6 py-3 bg-slate-950 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                  Schedule Another Consultation
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      {}
      <footer className="bg-slate-950 text-slate-300 py-16 px-6 md:px-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-4 space-y-4">
            <span className="text-xl font-black text-white tracking-tight">Dr. Devendra Kumar</span>
            <p className="text-sm text-slate-400 leading-relaxed font-bold">
              Reinventing patient health through individualized classical homeopathy, restoring immunological balance gently, without chemical side effects.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h5 className="font-extrabold text-white text-sm">Direct Links</h5>
            <ul className="space-y-2 text-xs font-bold">
              <li><a href="#about" className="hover:text-white text-slate-400 transition-colors">About</a></li>
              <li><a href="#specialties" className="hover:text-white text-slate-400 transition-colors">Treatments</a></li>
              <li><a href="#ai-copilot" className="hover:text-white text-slate-400 transition-colors">AI Assistant</a></li>
              <li><a href="#testimonials" className="hover:text-white text-slate-400 transition-colors">Patient Stories</a></li>
              <li><a href="#booking" className="hover:text-white text-slate-400 transition-colors">Consult Now</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="font-extrabold text-white text-sm">Chamber Address</h5>
            <div className="space-y-3 text-xs leading-relaxed font-bold text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                <span>{doctorProfile.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>+91 555-890-0192</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h5 className="font-extrabold text-white text-sm">Information Disclaimer</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-bold">
              The content provided on this clinical website is for informational/preparatory purposes only and should not be used as a replacement for live, hands-on professional clinical examinations.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span className="font-bold">&copy; {new Date().getFullYear()} Dr. Devendra Kumar. All Rights Reserved.</span>
          <span className="font-bold">Designed with clinical integrity & absolute transparency.</span>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-slate-950 bg-opacity-90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-slate-900 w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 p-2 bg-slate-950 bg-opacity-80 rounded-full text-slate-400 hover:text-white z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video relative flex flex-col items-center justify-center bg-slate-950 p-12 text-center space-y-6">
              <div className={`p-4 ${theme.accentBg} ${theme.primaryText} rounded-full`}>
                <Activity className="h-12 w-12 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-100">Patient Video Demo Simulator</h4>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  When showcasing this template to Dr. Devendra or potential buyers, explain that they can easily link their clinic's actual introductory patient video right here.
                </p>
              </div>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="px-6 py-2.5 bg-white text-slate-950 rounded-xl font-extrabold text-sm hover:bg-slate-150 transition-all"
              >
                Close Video Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
