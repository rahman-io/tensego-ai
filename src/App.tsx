import React, { useState, useId } from 'react';

const FAIcon = ({ name, className = '' }: { name: string; className?: string }) => {
  return <i className={`fa-solid ${name} ${className}`}></i>;
};

// Real Google Play Store App Link
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=id.replace.tensegoai";

// Official Promotional App Screenshots Data
interface AppScreenshot {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imagePath: string;
}

const OFFICIAL_SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'ar-scan',
    title: 'Belajar langsung dari benda di sekitarmu!',
    subtitle: 'Scan objek nyata dengan kamera HP, AI otomatis membuat contoh kalimat tenses secara instan.',
    badge: 'Kamera AR Real-time',
    imagePath: 'assets/aistudio/1_45fe705c.webp'
  },
  {
    id: 'ai-tutor',
    title: 'Tutor AI Pribadi Siap Membantumu!',
    subtitle: 'Tanya penjelasan 16 tenses tersulit 24/7. AI menjawab dengan sabar layaknya sahabat.',
    badge: 'Tutor AI 24/7',
    imagePath: 'assets/aistudio/6_570d530e.webp'
  },
  {
    id: 'progress',
    title: 'Pantau Progres Belajarmu',
    subtitle: 'Lacak persentase penguasaan 16 tenses dari Present, Past, Future, hingga Past Future.',
    badge: 'Progres Terukur',
    imagePath: 'assets/aistudio/4_04f508bc.webp'
  },
  {
    id: 'quiz',
    title: 'Kuis interaktif, seru & terukur',
    subtitle: 'Uji kemampuan tenses dengan kuis adaptif. Dapatkan penjelasan lembut jika jawaban belum tepat.',
    badge: 'Kuis Adaptif',
    imagePath: 'assets/aistudio/5_a68c6eb5.webp'
  },
  {
    id: 'visual-learning',
    title: 'Belajar Tenses Lebih Visual!',
    subtitle: 'Antarmuka aplikasi yang penuh warna, mascot lucu, dan tata letak yang memanjakan mata.',
    badge: 'Visual Modern',
    imagePath: 'assets/aistudio/2_5a468b99.webp'
  },
  {
    id: 'personalization',
    title: 'Sesuaikan Gaya & Level Belajarmu!',
    subtitle: 'Pilih level bahasa CEFR (A1-C2) dan topik materi yang sesuai dengan kebutuhan kinerjamu.',
    badge: 'Personalisasi CEFR',
    imagePath: 'assets/aistudio/3_1823cbc4.webp'
  }
];

// Data model for AR Scan Demo Objects
interface ARObject {
  id: string;
  name: string;
  indonesianName: string;
  icon: string;
  confidence: number;
  tags: string[];
  tensesExamples: {
    tense: string;
    english: string;
    indonesian: string;
    explanation: string;
    pattern: string;
  }[];
}

const AR_OBJECTS: ARObject[] = [
  {
    id: 'coffee',
    name: 'Coffee Mug',
    indonesianName: 'Cangkir Kopi Panas',
    icon: 'fa-mug-hot',
    confidence: 99.4,
    tags: ['Ceramic', 'Hot Liquid', 'Breakfast', 'Steam'],
    tensesExamples: [
      {
        tense: 'Present Continuous',
        english: 'The warm coffee is steaming gently on the wooden desk.',
        indonesian: 'Kopi hangat itu sedang mengepulkan uap lembut di atas meja kayu.',
        explanation: 'Dipakai karena uap sedang mengepul tepat pada saat kamu mengamati benda ini.',
        pattern: 'Subject + is/am/are + Verb-ing'
      },
      {
        tense: 'Simple Past',
        english: 'I brewed this fragrant Arabica coffee twenty minutes ago.',
        indonesian: 'Saya menyeduh kopi Arabika harum ini dua puluh menit yang lalu.',
        explanation: 'Kejadian pembuatan kopi sudah tuntas di masa lampau dengan penanda waktu spesifik.',
        pattern: 'Subject + Verb-2 (Brewed)'
      },
      {
        tense: 'Present Perfect',
        english: 'You have already drunk half of this coffee this morning.',
        indonesian: 'Kamu sudah meminum separuh kopi ini pagi ini.',
        explanation: 'Aktivitas meminum kopi sudah terjadi, dan efeknya masih tampak nyata saat ini.',
        pattern: 'Subject + have/has + Verb-3 (Drunk)'
      }
    ]
  },
  {
    id: 'laptop',
    name: 'Workstation Laptop',
    indonesianName: 'Laptop Kerja',
    icon: 'fa-laptop',
    confidence: 98.7,
    tags: ['Electronics', 'Display', 'Keyboard', 'Study'],
    tensesExamples: [
      {
        tense: 'Simple Present',
        english: 'This modern laptop operates silently during intense coding sessions.',
        indonesian: 'Laptop modern ini beroperasi secara senyap selama sesi coding intensif.',
        explanation: 'Menyatakan fakta umum atau karakteristik tetap dari perangkat elektronik ini.',
        pattern: 'Subject + Verb-1 (s/es) + Complement'
      },
      {
        tense: 'Past Continuous',
        english: 'The developer was typing English grammar scripts when I looked.',
        indonesian: 'Sang programmer sedang mengetik naskah grammar saat saya menoleh.',
        explanation: 'Menunjukkan kegiatan yang sedang berlangsung di masa lampau ketika disela kejadian lain.',
        pattern: 'Subject + was/were + Verb-ing'
      }
    ]
  },
  {
    id: 'plant',
    name: 'Monstera Plant',
    indonesianName: 'Tanaman Monstera',
    icon: 'fa-seedling',
    confidence: 97.9,
    tags: ['Foliage', 'Flora', 'Chlorophyll', 'Decor'],
    tensesExamples: [
      {
        tense: 'Present Continuous',
        english: 'The green leaves are absorbing the morning sunlight.',
        indonesian: 'Daun-daun hijau itu sedang menyerap sinar matahari pagi.',
        explanation: 'Proses fotosintesis sedang berlangsung saat Anda menatap tanaman ini.',
        pattern: 'Subject + are + Verb-ing'
      },
      {
        tense: 'Future Perfect',
        english: 'By next spring, this plant will have grown three new large leaves.',
        indonesian: 'Menjelang musim semi mendatang, tanaman ini akan sudah menumbuhkan tiga daun baru.',
        explanation: 'Menyatakan pertumbuhan yang diproyeksikan tuntas sebelum titik waktu di masa depan.',
        pattern: 'Subject + will have + Verb-3'
      }
    ]
  },
  {
    id: 'shoes',
    name: 'Running Shoes',
    indonesianName: 'Sepatu Lari Sporty',
    icon: 'fa-shoe-prints',
    confidence: 99.1,
    tags: ['Footwear', 'Athletic', 'Cushion'],
    tensesExamples: [
      {
        tense: 'Past Perfect',
        english: 'I had already laced up these shoes before the rain started.',
        indonesian: 'Saya sudah selesai mengikat tali sepatu ini sebelum hujan mulai turun.',
        explanation: 'Kejadian mengikat sepatu selesai terlebih dahulu dibanding mulainya hujan.',
        pattern: 'Subject + had + Verb-3'
      }
    ]
  }
];

// 16 Tenses Comprehensive Data
interface TenseCategory {
  category: string;
  color: string;
  tenses: {
    name: string;
    formula: string;
    usage: string;
    example: string;
    arScene: string;
  }[];
}

const ALL_16_TENSES: TenseCategory[] = [
  {
    category: 'Present Tenses (Masa Kini)',
    color: 'text-purple-400',
    tenses: [
      {
        name: 'Simple Present Tense',
        formula: 'S + V1 (s/es) + O',
        usage: 'Kebiasaan, fakta umum, atau jadwal tetap.',
        example: 'The sun rises every morning behind my window.',
        arScene: 'Scan jendela kamar'
      },
      {
        name: 'Present Continuous Tense',
        formula: 'S + is/am/are + V-ing',
        usage: 'Aksi yang sedang terjadi saat ini juga.',
        example: 'Water is boiling in the electric kettle.',
        arScene: 'Scan teko air'
      },
      {
        name: 'Present Perfect Tense',
        formula: 'S + have/has + V3',
        usage: 'Aksi masa lalu yang hasilnya relevan sekarang.',
        example: 'I have finished three chapters of this book.',
        arScene: 'Scan buku terbuka'
      },
      {
        name: 'Present Perfect Continuous',
        formula: 'S + have/has been + V-ing',
        usage: 'Aksi yang dimulai di masa lalu dan masih berlanjut.',
        example: 'She has been working on her laptop since 8 AM.',
        arScene: 'Scan jam & laptop'
      }
    ]
  },
  {
    category: 'Past Tenses (Masa Lampau)',
    color: 'text-pink-400',
    tenses: [
      {
        name: 'Simple Past Tense',
        formula: 'S + V2 + O',
        usage: 'Kejadian tuntas di masa lampau.',
        example: 'We bought this wooden dining table yesterday.',
        arScene: 'Scan meja makan'
      },
      {
        name: 'Past Continuous Tense',
        formula: 'S + was/were + V-ing',
        usage: 'Aksi yang sedang berlangsung di masa lampau.',
        example: 'The fan was spinning rapidly when power went out.',
        arScene: 'Scan kipas angin'
      },
      {
        name: 'Past Perfect Tense',
        formula: 'S + had + V3',
        usage: 'Aksi yang tuntas sebelum aksi lampau lainnya.',
        example: 'The train had left before we arrived at the station.',
        arScene: 'Scan tiket kereta'
      },
      {
        name: 'Past Perfect Continuous',
        formula: 'S + had been + V-ing',
        usage: 'Aksi yang berlangsung dalam durasi tertentu di masa lampau.',
        example: 'The cat had been sleeping on the sofa for three hours.',
        arScene: 'Scan sofa santai'
      }
    ]
  },
  {
    category: 'Future Tenses (Masa Mendatang)',
    color: 'text-indigo-400',
    tenses: [
      {
        name: 'Simple Future Tense',
        formula: 'S + will + V1',
        usage: 'Keputusan spontan atau prediksi masa depan.',
        example: 'I will clean my workspace after this call.',
        arScene: 'Scan alat kebersihan'
      },
      {
        name: 'Future Continuous Tense',
        formula: 'S + will be + V-ing',
        usage: 'Aksi yang akan sedang berlangsung pada jam tertentu.',
        example: 'At 7 PM, we will be dining at the new bistro.',
        arScene: 'Scan piring & sendok'
      },
      {
        name: 'Future Perfect Tense',
        formula: 'S + will have + V3',
        usage: 'Aksi yang diproyeksikan selesai sebelum waktu masa depan.',
        example: 'By December, I will have read 20 English novels.',
        arScene: 'Scan rak buku'
      },
      {
        name: 'Future Perfect Continuous',
        formula: 'S + will have been + V-ing',
        usage: 'Mengukur durasi aksi yang akan terus berjalan.',
        example: 'Next month, they will have been living here for 5 years.',
        arScene: 'Scan kunci rumah'
      }
    ]
  },
  {
    category: 'Past Future Tenses (Kondisional)',
    color: 'text-cyan-400',
    tenses: [
      {
        name: 'Past Future Tense',
        formula: 'S + would + V1',
        usage: 'Rencana masa lalu atau pengandaian.',
        example: 'He said he would lend me his noise-cancelling headphones.',
        arScene: 'Scan headphone'
      },
      {
        name: 'Past Future Continuous',
        formula: 'S + would be + V-ing',
        usage: 'Aksi yang rencananya sedang berlangsung di masa lampau.',
        example: 'I thought she would be practicing piano at 4 PM.',
        arScene: 'Scan keyboard'
      },
      {
        name: 'Past Future Perfect',
        formula: 'S + would have + V3',
        usage: 'Kondisi yang mestinya tuntas di masa lalu tapi tidak terjadi.',
        example: 'If my alarm had rung, I would have caught the flight.',
        arScene: 'Scan jam beker'
      },
      {
        name: 'Past Future Perfect Continuous',
        formula: 'S + would have been + V-ing',
        usage: 'Durasi aksi imajiner yang mestinya sudah berlangsung.',
        example: 'By noon yesterday, he would have been driving for 6 hours.',
        arScene: 'Scan setir mobil'
      }
    ]
  }
];

// Sample AI Chat Q&A
interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  highlight?: string;
}

const SAMPLE_CHAT_FLOWS = [
  {
    promptLabel: 'Bedanya "was" vs "has been"?',
    question: 'Tutor, apa bedanya "I was sick" dengan "I have been sick"?',
    response: '- "I was sick" = Kamu sakit di masa lalu, sekarang SUDAH SEHAT.\n- "I have been sick" = Kamu sakit dari kemarin dan sampai detik ini MASIH SAKIT.\n\nKuncinya: Apakah ada dampaknya sampai saat ini!',
    highlight: 'Simple Past = Selesai total. Present Perfect = Nyambung ke sekarang.'
  },
  {
    promptLabel: 'Kapan pakai Past Perfect?',
    question: 'Kapan sih harus pakai Past Perfect (had + V3)?',
    response: 'Bayangkan ini sebagai "Kejadian yang Lebih Dulu Terjadi" di antara 2 peristiwa lampau:\n\nExample: "The train had left before we arrived." (Keretanya jalan duluan sebelum kamu sampai stasiun).',
    highlight: 'Past Perfect (Had + V3) terjadi SEBELUM Simple Past (V2).'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('beranda');

  // Hero Interactive Demo states
  const [selectedARObject, setSelectedARObject] = useState<ARObject>(AR_OBJECTS[0]);
  const [selectedTenseIndex, setSelectedTenseIndex] = useState(0);
  const [activeHeroTab, setActiveHeroTab] = useState<'ar' | 'chat'>('ar');

  // Preferences Interactive State (Matching Screenshots)
  const [selectedGoal, setSelectedGoal] = useState('Percakapan Santai & Keseharian');
  const [selectedTheme, setSelectedTheme] = useState('Teknologi');
  const [selectedStyle, setSelectedStyle] = useState('Santai & Personal');

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'tutor',
      text: 'Halo! Aku Tutor AI TenseGO. Ada kesulitan memahami 16 tenses hari ini? Tanyakan apa saja dengan santai ya!',
      timestamp: '12:00'
    }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  // 16 Tenses Explorer state
  const [activeTenseCategory, setActiveTenseCategory] = useState(0);

  // Quiz state
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modals state
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [showPlayStoreModal, setShowPlayStoreModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'desc' | 'terms' | 'refund' | 'contact'>('desc');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    level: 'A2 (Elementary)',
    message: ''
  });

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech synthesis
  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Chat send handler
  const handleSendPresetChat = (preset: typeof SAMPLE_CHAT_FLOWS[0]) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: preset.question,
      timestamp: 'Baru saja'
    };
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: preset.response,
        timestamp: 'Baru saja',
        highlight: preset.highlight
      };
      setChatMessages(prev => [...prev, tutorMsg]);
    }, 500);
  };

  const handleSendCustomChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userChatInput.trim()) return;

    const userText = userChatInput;
    setUserChatInput('');
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: 'Baru saja'
    };
    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: `Pertanyaan hebat tentang "${userText}"! Di TenseGO, kamu tidak perlu takut salah karena AI kami akan membimbing cara penggunaan yang paling natural dalam komunikasi sehari-hari.`,
        timestamp: 'Baru saja',
        highlight: 'Prinsip TenseGO: Pahami maknanya secara visual, bukan sekadar hafalan.'
      };
      setChatMessages(prev => [...prev, tutorMsg]);
    }, 600);
  };

  // Download simulation
  const startSimulatedDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 280);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const feedbackNameId = useId();
  const feedbackEmailId = useId();
  const feedbackLevelId = useId();
  const feedbackMessageId = useId();

  return (
    <div className="min-h-screen bg-mesh-glow text-slate-100 flex flex-col font-sans selection:bg-[#8A4FFF] selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BAR (Matching Segmented Glass Capsule Nav in Screenshot) */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-[#0A0814] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 shadow-2xl transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center shadow-lg shadow-[#8A4FFF]/30 group-hover:scale-105 transition-transform overflow-hidden">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Logo" className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Tense<span className="text-[#E85AA0]">GO</span>
              <span className="text-[10px] bg-[#8A4FFF]/30 text-[#A26BFF] px-2 py-0.5 rounded-full font-mono border border-[#8A4FFF]/40 hidden sm:inline-block">Cosmo AI</span>
            </span>
          </a>

          {/* Center Segmented Glass Nav Capsule (exact 4 items) */}
          <nav className="hidden lg:flex items-center p-1.5 glass-nav-capsule text-xs font-medium text-slate-300">
            <a
              href="#"
              onClick={() => setActiveNav('beranda')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeNav === 'beranda'
                  ? 'bg-[#8A4FFF] text-white font-semibold shadow-md'
                  : 'hover:text-white'
              }`}
            >
              Beranda
            </a>
            <a
              href="#tutor-ai"
              onClick={() => setActiveNav('tutor-ai')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeNav === 'tutor-ai'
                  ? 'bg-[#8A4FFF] text-white font-semibold shadow-md'
                  : 'hover:text-white'
              }`}
            >
              Tutor AI 24/7
            </a>
            <a
              href="#harga"
              onClick={() => setActiveNav('harga')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeNav === 'harga'
                  ? 'bg-[#8A4FFF] text-white font-semibold shadow-md'
                  : 'hover:text-white'
              }`}
            >
              Paket Harga
            </a>
            <a
              href="#faq"
              onClick={() => setActiveNav('faq')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeNav === 'faq'
                  ? 'bg-[#8A4FFF] text-white font-semibold shadow-md'
                  : 'hover:text-white'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="hidden sm:inline-flex px-4 py-2.5 rounded-full text-xs font-semibold text-slate-200 border border-white/20 hover:bg-white/10 transition-all"
            >
              Feedback
            </button>

            {/* Primary Capsule Button with Arrow */}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] hover:from-[#9861FF] hover:to-[#B37EFF] shadow-lg shadow-[#8A4FFF]/35 transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <span>Download</span>
              <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 rounded-full bg-white/10 border border-white/15"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <FAIcon name="fa-xmark" className="w-5 h-5" /> : <FAIcon name="fa-chevron-down" className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden max-w-7xl mx-auto mt-3 p-4 rounded-3xl glass-card-reference space-y-2">
            <a
              href="#"
              onClick={() => {
                setActiveNav('beranda');
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeNav === 'beranda'
                  ? 'bg-[#8A4FFF] text-white'
                  : 'text-slate-200 hover:bg-white/15'
              }`}
            >
              Beranda
            </a>
            <a
              href="#tutor-ai"
              onClick={() => {
                setActiveNav('tutor-ai');
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeNav === 'tutor-ai'
                  ? 'bg-[#8A4FFF] text-white'
                  : 'text-slate-200 hover:bg-white/15'
              }`}
            >
              Tutor AI 24/7
            </a>
            <a
              href="#harga"
              onClick={() => {
                setActiveNav('harga');
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeNav === 'harga'
                  ? 'bg-[#8A4FFF] text-white'
                  : 'text-slate-200 hover:bg-white/15'
              }`}
            >
              Paket Harga
            </a>
            <a
              href="#faq"
              onClick={() => {
                setActiveNav('faq');
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeNav === 'faq'
                  ? 'bg-[#8A4FFF] text-white'
                  : 'text-slate-200 hover:bg-white/15'
              }`}
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowFeedbackModal(true);
              }}
              className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-[#E85AA0] hover:bg-white/10"
            >
              Feedback
            </button>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION (Replicating Screenshot Layout & Aesthetics)  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Background Sparkle Line Art Accents (from reference screenshot) */}
        <div className="absolute top-20 right-1/3 text-white/20 select-none pointer-events-none text-3xl animate-pulse">
          <FAIcon name="fa-sparkles" />
        </div>
        <div className="absolute top-1/2 left-10 text-white/15 select-none pointer-events-none text-4xl">
          <FAIcon name="fa-star" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Kicker, Subtitle, Buttons, Stat Strip */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Kicker Tag with Dot Indicator & Cosmo Buddy Mascot */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#A26BFF]">
                <span className="w-2 h-2 rounded-full bg-[#A26BFF] animate-ping" />
                <FAIcon name="fa-circle" className="text-[6px] text-[#A26BFF] mx-1" />
                <span>Aplikasi Android Belajar Grammar AI &amp; AR</span>
              </div>

              {/* Cosmo Buddy Talking Mascot Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1E1738] via-[#2A1B4B] to-[#17112E] border border-[#8A4FFF]/50 shadow-xl flex items-center gap-3.5 text-left transition-all hover:border-[#8A4FFF]">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center shadow-lg overflow-hidden">
                    <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Talking" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#1E1738]" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#A26BFF] flex items-center gap-1.5">
                    Cosmo Buddy <span className="text-[10px] text-slate-400 font-normal">· Maskot &amp; Pemandu TenseGO</span>
                  </div>
                  <p className="text-slate-200 mt-0.5 font-medium leading-snug">
                    &ldquo;Hai! Aku Cosmo! Sorot benda pakai kamera HP atau atur Tujuan, Tema, &amp; Gaya AI favoritmu. Aku bakal buatkan materi tenses 100% pas buat kamu!&rdquo;
                  </p>
                </div>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight">
                Empower Your Grammar Journey With{' '}
                <span className="bg-gradient-to-r from-[#A26BFF] via-[#E85AA0] to-pink-300 bg-clip-text text-transparent">
                  TenseGO
                </span>
              </h1>

              {/* Sub-headline combining AR+AI and Learning Preferences */}
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                  Ucapkan selamat tinggal pada buku grammar yang membosankan. TenseGO memadukan AI &amp; Augmented Reality (AR)
                  untuk menyulap objek di sekitarmu menjadi kelas Bahasa Inggris interaktif.
                </p>
                
                <div className="p-4 rounded-2xl bg-[#8A4FFF]/10 border border-[#8A4FFF]/30 backdrop-blur-sm text-left max-w-xl mx-auto lg:mx-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E85AA0] uppercase tracking-wider mb-1">
                    <FAIcon name="fa-wand-magic-sparkles" className="w-3.5 h-3.5 text-[#E85AA0]" />
                    <span>Atur Preferensi Belajar Sesuai Gaya Kamu</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    TenseGO membebaskanmu memilih <strong className="text-white">Tujuan Belajar</strong>, <strong className="text-white">Tema Belajar</strong>, dan <strong className="text-white">Gaya Penjelasan AI</strong> agar materi terasa 100% relevan dengan aktivitas harianmu!
                  </p>
                </div>
              </div>

              {/* CTAs matching screenshot buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Purple Capsule Button with Arrow ↗ */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] hover:from-[#9861FF] hover:to-[#B37EFF] text-white font-bold text-sm shadow-xl shadow-[#8A4FFF]/40 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                >
                  <span>Download</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <FAIcon name="fa-arrow-up-right-from-square" className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* Secondary Glass Stroke Button */}
                <a
                  href="#demo-interactive"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <FAIcon name="fa-eye" className="w-4 h-4 text-[#A26BFF]" />
                  <span>Coba Demo AR &amp; Tutor AI</span>
                </a>
              </div>

              {/* Stat Counters Strip below Hero */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-lg sm:text-2xl font-extrabold text-white">
                    <FAIcon name="fa-book-open" className="w-4 h-4 text-[#A26BFF]" />
                    <span>16</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Rumus Tenses</div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-lg sm:text-2xl font-extrabold text-white">
                    <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-5 h-5 object-contain" />
                    <span>24/7</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Tutor AI Cosmo</div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-lg sm:text-2xl font-extrabold text-white">
                    <FAIcon name="fa-bolt" className="w-4 h-4 text-emerald-400" />
                    <span>0.2s</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Kecepatan AR</div>
                </div>
              </div>
            </div>

            {/* Right Column: Dual-Card Asymmetric Hero Visuals */}
            <div id="demo-interactive" className="lg:col-span-6 relative flex flex-col sm:flex-row gap-4 items-center justify-center">
              {/* Card 1: Custom Squircle Cyan/Teal Container */}
              <div className="w-full sm:w-1/2 bg-[#2D8E9C]/30 backdrop-blur-xl border border-white/20 squircle-card-1 p-5 shadow-2xl relative space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-200">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo AR" className="w-5 h-5 object-contain" /> Kamera AR Cosmo
                  </span>
                  <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-mono">
                    {selectedARObject.confidence}% Match
                  </span>
                </div>

                {/* Simulated AR Viewport */}
                <div className="relative h-44 bg-gradient-to-b from-[#181232] to-[#0A0717] rounded-2xl border border-white/10 p-3 flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="text-4xl select-none filter drop-shadow-[0_0_12px_rgba(162,107,255,0.7)] mb-1">
                    <FAIcon name={selectedARObject.icon} className="text-4xl text-[#A26BFF]" />
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-[#8A4FFF] text-white text-[11px] font-bold">
                    {selectedARObject.indonesianName}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Cosmo Spatial Bounding Active</div>

                  {/* Corner Reticle Brackets */}
                  <div className="absolute inset-3 border border-dashed border-[#A26BFF]/50 rounded-xl pointer-events-none" />
                </div>

                {/* Object selector pills */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar pt-1">
                  {AR_OBJECTS.map(obj => (
                    <button
                      key={obj.id}
                      onClick={() => {
                        setSelectedARObject(obj);
                        setSelectedTenseIndex(0);
                      }}
                      className={`px-2 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-colors flex items-center gap-1 ${
                        selectedARObject.id === obj.id
                          ? 'bg-[#8A4FFF] text-white'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <FAIcon name={obj.icon} className="text-xs" /> {obj.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Active Tense Sentence */}
                <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs space-y-1">
                  <div className="text-[#E85AA0] font-bold font-mono text-[10px]">
                    {selectedARObject.tensesExamples[selectedTenseIndex]?.tense}:
                  </div>
                  <div className="text-white font-medium text-xs leading-snug">
                    &ldquo;{selectedARObject.tensesExamples[selectedTenseIndex]?.english}&rdquo;
                  </div>
                </div>
              </div>

              {/* Card 2: Custom Squircle Violet Container */}
              <div className="w-full sm:w-1/2 bg-[#8A4FFF]/25 backdrop-blur-xl border border-white/20 squircle-card-2 p-5 shadow-2xl relative space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-200">
                  <span className="font-bold flex items-center gap-1.5 text-purple-300">
                    <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Tutor" className="w-5 h-5 object-contain" /> Tutor AI Cosmo 24/7
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                    Online
                  </span>
                </div>

                {/* Floating Glass Translucent Badge Overlay */}
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs flex items-center gap-2 text-slate-100 shadow-lg">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    <FAIcon name="fa-check" className="w-3 h-3 text-emerald-300" />
                  </div>
                  <span className="font-semibold text-[11px]">Personalized Grammar Paths</span>
                </div>

                {/* Chat Log Preview */}
                <div className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs h-40 overflow-y-auto">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`p-2 rounded-xl text-[11px] ${
                      msg.sender === 'user' ? 'bg-[#8A4FFF] text-white ml-4' : 'bg-[#1A1435] text-slate-200 mr-2 border border-white/10'
                    }`}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* Quick Chat Buttons */}
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {SAMPLE_CHAT_FLOWS.map((flow, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendPresetChat(flow)}
                      className="text-[10px] px-2 py-1 rounded-md bg-white/10 hover:bg-[#8A4FFF] text-slate-300 hover:text-white shrink-0 transition-colors flex items-center gap-1"
                    >
                      <FAIcon name="fa-comment-dots" className="text-xs text-[#A26BFF]" /> {flow.promptLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Glass Instructor Profile Badge */}
              <div className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-6 left-auto sm:left-4 z-20 glass-card-reference p-3 rounded-2xl flex items-center gap-3 border border-white/25 shadow-2xl w-full sm:w-auto sm:min-w-[240px] justify-center sm:justify-start">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center text-white shadow shrink-0 overflow-hidden">
                  <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Coach" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    Cosmo Buddy AI Coach
                  </div>
                  <div className="text-[10px] text-slate-300">Maskot &amp; Tutor Grammar 24 Jam</div>
                  <div className="flex items-center gap-0.5 text-amber-400 text-[10px] mt-0.5">
                    <FAIcon name="fa-star" className="w-3 h-3 fill-amber-400" />
                    <FAIcon name="fa-star" className="w-3 h-3 fill-amber-400" />
                    <FAIcon name="fa-star" className="w-3 h-3 fill-amber-400" />
                    <FAIcon name="fa-star" className="w-3 h-3 fill-amber-400" />
                    <FAIcon name="fa-star" className="w-3 h-3 fill-amber-400" />
                    <span className="text-slate-300 text-[9px] ml-1">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. MONOCHROME PARTNER / TECH STRIP (Exact match to "Trusted   */}
      {/* by 2000 companies" strip at bottom of reference screenshot)  */}
      {/* ------------------------------------------------------------- */}
      <section className="py-10 border-y border-white/10 bg-black/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Teknologi AI &amp; Ekosistem Perangkat yang Didukung
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white">
              <FAIcon name="fa-mobile-screen" className="w-5 h-5 text-[#A26BFF]" /> Android 8.0+
            </div>
            <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white">
              <FAIcon name="fa-camera" className="w-5 h-5 text-[#E85AA0]" /> Google ARCore
            </div>
            <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white">
              <FAIcon name="fa-wand-magic-sparkles" className="w-5 h-5 text-indigo-400" /> Gemini AI Engine
            </div>
            <div className="flex items-center gap-2 font-bold text-lg sm:text-xl text-white">
              <FAIcon name="fa-shield-halved" className="w-5 h-5 text-emerald-400" /> Play Protect Verified
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. THE "WHY" SECTION (Pendekatan Masalah - Solusi)             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-black/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#E85AA0] text-xs font-semibold uppercase tracking-wider">
              Pendekatan Baru Belajar Bahasa
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Mengapa Belajar Grammar Selalu Terasa Sulit?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Menghafal rumus di papan tulis seringkali tidak membekas di memori. TenseGO lahir untuk mengubah cara kerjanya, yaitu <strong className="text-white">bukan dengan menghafal rumus mati</strong>, melainkan{' '}
              <strong className="text-[#A26BFF]">mengalami bahasa itu secara langsung</strong> melalui benda-benda di sekitarmu.
            </p>

            {/* Cosmo Buddy Speech Highlight */}
            <div className="mt-6 p-4 rounded-3xl bg-gradient-to-r from-[#241747] to-[#171233] border border-[#8A4FFF]/40 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left max-w-2xl mx-auto shadow-xl">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Mascot" className="w-16 h-16 object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(138,79,255,0.5)]" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[#E85AA0] block">Pesan dari Cosmo Buddy:</span>
                <p className="text-slate-200 italic mt-0.5">
                  &ldquo;Lupakan papan tulis kaku! Bersamaku, kamu bisa belajar tenses langsung dari kopi di mejamu atau sepatu yang kamu pakai hari ini.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Side by side comparison cards matching screenshot glassmorphism */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card-reference rounded-3xl p-6 sm:p-8 border border-red-500/20 bg-red-950/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FAIcon name="fa-circle-xmark" className="w-5 h-5 text-red-400" /> Cara Lama (Buku Hafalan Kaku)
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-xmark" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Menghafal rumus S + V2 + O di luar kepala tanpa konteks nyata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-xmark" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Takut salah dan minder saat bercakap-cakap di depan umum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-xmark" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Sangat sulit membedakan 16 tenses yang mirip-mirip.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card-reference rounded-3xl p-6 sm:p-8 border border-[#8A4FFF]/40 bg-gradient-to-br from-[#1C163C]/80 to-[#120F24]/80 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FAIcon name="fa-circle-check" className="w-5 h-5 text-emerald-400" /> Cara TenseGO (AI &amp; Kamera AR)
              </h3>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-check" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Scan cangkir kopi atau laptop, seketika paham Present Continuous.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-check" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tanya Tutor AI Cosmo 24/7 tanpa rasa takut dimarahi atau dihakimi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FAIcon name="fa-check" className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Visualisasi real-time yang langsung melekat di memori ingatan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. FEATURES SECTION (Zigzag Layout)                            */}
      {/* ------------------------------------------------------------- */}
      <section id="fitur-ar" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A4FFF]/15 text-[#A26BFF] text-xs font-bold uppercase tracking-wider">
            <FAIcon name="fa-wand-magic-sparkles" className="w-3.5 h-3.5" />
            Nilai Jual Utama TenseGO
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tiga Senjata Rahasia Menguasai 16 Tenses
          </h2>
        </div>

        {/* Feature 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#E85AA0] uppercase tracking-wider flex items-center gap-1.5">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-5 h-5 object-contain" /> Fitur 01 <FAIcon name="fa-circle" className="text-[6px] text-[#E85AA0] mx-1" /> Kamera Ajaib / AR
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Belajar dari Apa yang Kamu Lihat</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Arahkan kamera ke sekelilingmu. AI kami mendeteksi objek nyata dan membuat puluhan contoh kalimat tenses secara instan. Belajar yang nempel di otak!
            </p>

            {/* Cosmo Talking Callout */}
            <div className="p-3 rounded-2xl bg-[#1A1435] border border-[#8A4FFF]/40 flex items-center gap-3 text-xs">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo AR" className="w-10 h-10 object-contain shrink-0" />
              <div>
                <span className="font-bold text-[#A26BFF]">Cosmo Katakan:</span>
                <p className="text-slate-300">&ldquo;Arahkan kamera HP-mu ke objek mana saja! Dalam 0.2 detik, aku buatkan kalimat tenses-nya.&rdquo;</p>
              </div>
            </div>
          </div>
          <div className="glass-card-reference rounded-3xl p-4 sm:p-6 border border-[#8A4FFF]/30 text-center space-y-3 group cursor-pointer" onClick={() => setActiveLightboxImg('assets/aistudio/1_45fe705c.webp')}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[420px] bg-black/60 flex justify-center">
              <img src="assets/aistudio/1_45fe705c.webp" alt="Kamera AR TenseGO" className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FAIcon name="fa-eye" className="w-4 h-4 text-[#A26BFF]" /> Klik untuk Perbesar Tampilan Kamera AR
                </span>
              </div>
            </div>
            <h4 className="text-white font-bold text-base">Object Spatial AI Recognition</h4>
            <p className="text-xs text-slate-300">
              Mengenali ribuan objek harian dan merangkai struktur kalimat grammar dalam waktu kurang dari 0.2 detik.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div id="tutor-ai" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="glass-card-reference rounded-3xl p-4 sm:p-6 border border-[#E85AA0]/30 text-center order-2 lg:order-1 space-y-3 group cursor-pointer" onClick={() => setActiveLightboxImg('assets/aistudio/6_570d530e.webp')}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[420px] bg-black/60 flex justify-center">
              <img src="assets/aistudio/6_570d530e.webp" alt="Tutor AI TenseGO" className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FAIcon name="fa-eye" className="w-4 h-4 text-[#E85AA0]" /> Klik untuk Perbesar Chat Tutor AI
                </span>
              </div>
            </div>
            <h4 className="text-white font-bold text-base">Tutor AI 24 Jam Anti-Galak</h4>
            <p className="text-xs text-slate-300">
              Menjawab semua pertanyaan grammar tersulit dengan analogi sederhana dan penuh kesabaran.
            </p>
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <div className="text-xs font-bold text-[#A26BFF] uppercase tracking-wider flex items-center gap-1.5">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-5 h-5 object-contain" /> Fitur 02 <FAIcon name="fa-circle" className="text-[6px] text-[#A26BFF] mx-1" /> Tutor Chat AI
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Guru Privat Anti-Galak 24/7</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Takut salah ngomong? Tutor AI kami siap menjelaskan materi tersulit dengan sabar. Dia tidak menyalahkan, tapi membimbingmu.
            </p>

            {/* Cosmo Talking Callout */}
            <div className="p-3 rounded-2xl bg-[#1A1435] border border-[#E85AA0]/40 flex items-center gap-3 text-xs">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Chat" className="w-10 h-10 object-contain shrink-0" />
              <div>
                <span className="font-bold text-[#E85AA0]">Cosmo Katakan:</span>
                <p className="text-slate-300">&ldquo;Jangan pernah malu salah ya! Aku bakal jawab pertanyaanmu 24 jam non-stop dengan ramah.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Personalisasi & Preferensi Belajar (Matching screenshots) */}
        <div id="preferensi" className="pt-10 border-t border-white/10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold text-[#A26BFF] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-5 h-5 object-contain" /> Fitur 03 <FAIcon name="fa-circle" className="text-[6px] text-[#A26BFF] mx-1" /> Personalisasi Preferensi Belajar
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Atur Preferensi Belajar Sesuai Gaya Kamu
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              TenseGO membebaskanmu memilih <strong className="text-white">Tujuan Belajar</strong>, <strong className="text-[#E85AA0]">Tema Belajar</strong>, dan <strong className="text-[#A26BFF]">Gaya Penjelasan AI</strong> agar materi terasa 100% relevan dengan aktivitas harianmu!
            </p>
          </div>

          {/* Interactive Preferences Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls: 3 Preference Card Selectors */}
            <div className="lg:col-span-7 space-y-4">
              {/* Box 1: Tujuan Belajar */}
              <div className="glass-card-reference rounded-3xl p-5 border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#A26BFF] font-bold">
                  <span className="flex items-center gap-2">
                    <FAIcon name="fa-bullseye" className="w-4 h-4" /> 1. Pilih Tujuan Belajar:
                  </span>
                  <span className="text-[10px] bg-[#8A4FFF]/20 px-2.5 py-0.5 rounded-full text-slate-200">
                    {selectedGoal}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Percakapan Santai & Keseharian',
                    'Belajar Dasar & Kosakata Ringan',
                    'Akademik & Persiapan Ujian',
                    'Dunia Kerja & Bisnis',
                    'Traveling & Liburan',
                    'Persiapan Tes (TOEFL / IELTS)'
                  ].map(goal => (
                    <button
                      key={goal}
                      onClick={() => setSelectedGoal(goal)}
                      className={`p-2.5 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                        selectedGoal === goal
                          ? 'bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white font-bold shadow-md'
                          : 'bg-black/40 text-slate-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      <span className="truncate pr-1">{goal}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedGoal === goal ? 'border-white bg-white text-[#8A4FFF]' : 'border-slate-500'
                      }`}>
                        {selectedGoal === goal && <div className="w-1.5 h-1.5 bg-[#8A4FFF] rounded-full" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Box 2: Tema Belajar */}
              <div className="glass-card-reference rounded-3xl p-5 border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E85AA0] font-bold">
                  <span className="flex items-center gap-2">
                    <FAIcon name="fa-layer-group" className="w-4 h-4" /> 2. Pilih Tema Belajar:
                  </span>
                  <span className="text-[10px] bg-[#E85AA0]/20 px-2.5 py-0.5 rounded-full text-slate-200">
                    {selectedTheme}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Umum', 'Kehidupan Pesisir', 'Perkotaan', 'Pedesaan', 'Teknologi'].map(theme => (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      className={`p-2.5 rounded-xl text-center font-medium transition-all ${
                        selectedTheme === theme
                          ? 'bg-gradient-to-r from-[#E85AA0] to-pink-500 text-white font-bold shadow-md'
                          : 'bg-black/40 text-slate-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Box 3: Gaya Penjelasan AI */}
              <div className="glass-card-reference rounded-3xl p-5 border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-2">
                    <FAIcon name="fa-robot" className="w-4 h-4" /> 3. Pilih Gaya Penjelasan AI:
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-2.5 py-0.5 rounded-full text-slate-200">
                    Model: TenseGO Flux
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {['Santai & Personal', 'Akademis & Formal', 'Sederhana & Mudah Dipahami'].map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`p-2.5 rounded-xl text-center font-medium transition-all ${
                        selectedStyle === style
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                          : 'bg-black/40 text-slate-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Live Response Preview Card from Cosmo Buddy */}
            <div className="lg:col-span-5 glass-card-reference rounded-3xl p-6 border border-[#8A4FFF]/40 bg-gradient-to-b from-[#1C163C] to-[#0D0A1A] space-y-4 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center">
                    <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Simulasi Jawaban Cosmo Buddy</div>
                    <div className="text-[10px] text-emerald-400">Model: TenseGO Flux Active</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  Live Response
                </span>
              </div>

              {/* Dynamic Applied Tags */}
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-[#8A4FFF]/30 text-[#A26BFF] font-semibold flex items-center gap-1"><FAIcon name="fa-bullseye" className="text-[#A26BFF]" /> {selectedGoal}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#E85AA0]/30 text-pink-300 font-semibold flex items-center gap-1"><FAIcon name="fa-city" className="text-pink-300" /> {selectedTheme}</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1"><FAIcon name="fa-comments" className="text-emerald-300" /> {selectedStyle}</span>
              </div>

              {/* Cosmo Generated Speech Output */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs leading-relaxed">
                <div className="text-[#A26BFF] font-bold text-xs flex items-center gap-1.5">
                  <FAIcon name="fa-wand-magic-sparkles" className="w-3.5 h-3.5" /> Contoh Penjelasan Hasil Preferensimu:
                </div>
                <p className="text-slate-200">
                  {selectedGoal.includes('Kerja') || selectedGoal.includes('Bisnis')
                    ? `Halo! Untuk kebutuhan ${selectedGoal} dengan latar ${selectedTheme}, contoh Simple Present-nya: "Our software engineers develop secure cloud systems every day." Gaya ${selectedStyle} ini siap membantumu presentasi di kantor!`
                    : selectedGoal.includes('Traveling') || selectedGoal.includes('Liburan')
                    ? `Yo! Siap liburan dengan fokus ${selectedGoal} di tema ${selectedTheme}? Ini contoh Past Continuous-nya: "We were taking photos at the beach when the sun set." Gaya ${selectedStyle} bikin kamu tidak kagok saat ngobrol di jalan!`
                    : selectedGoal.includes('TOEFL') || selectedGoal.includes('Persiapan Ujian') || selectedGoal.includes('Akademik')
                    ? `Salam! Untuk target ${selectedGoal} berlatar ${selectedTheme}, rumus Present Perfect Continuous-nya adalah: "Researchers have been analyzing data since morning." Gaya ${selectedStyle} ini dirancang agar soal ujian terasa mudah!`
                    : `Hai sahabat TenseGO! Dengan pilihan ${selectedGoal} dan tema ${selectedTheme}, contoh Present Continuous-nya: "The smartphone is charging rapidly on the desk." Gaya ${selectedStyle} bikin kamu paham dalam sekali baca!`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
                <FAIcon name="fa-bolt" className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pilih kombinasi apa saja saat belajar di Android, Cosmo Buddy akan menyesuaikan bahasanya secara otomatis!</span>
              </div>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:from-[#9861FF] hover:to-[#B37EFF] transition-all"
              >
                <span>Coba Fitur Ini di Android (Gratis)</span>
                <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5.5 OFFICIAL SCREENSHOTS GALLERY SHOWCASE                      */}
      {/* ------------------------------------------------------------- */}
      <section id="galeri-aplikasi" className="py-20 bg-black/30 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A4FFF]/20 text-[#A26BFF] text-xs font-bold uppercase tracking-wider">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo" className="w-4 h-4 object-contain" />
              Real Android Application Screenshots
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Lihat Tampilan Asli Aplikasi TenseGO
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Antarmuka resmi Android TenseGO dirancang bersih, penuh warna, dan nyaman digunakan untuk belajar setiap hari. Klik gambar untuk memperbesar:
            </p>

            {/* Cosmo Gallery Callout */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 max-w-xl mx-auto text-xs text-left">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Promo" className="w-10 h-10 object-contain shrink-0" />
              <span className="text-slate-200">
                <strong className="text-[#A26BFF]">Cosmo:</strong> &ldquo;Ini dia tampilan asli TenseGO di HP Android! Warna-warni dan bikin kamu makin betah belajar tenses!&rdquo;
              </span>
            </div>
          </div>

          {/* 6 Official Promotional Screenshots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICIAL_SCREENSHOTS.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImg(item.imagePath)}
                className="glass-card-reference glass-card-hover rounded-3xl p-4 border border-white/15 cursor-pointer group space-y-4 flex flex-col justify-between"
              >
                <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 aspect-[9/16] max-h-[380px] mx-auto flex items-center justify-center w-full">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                    {item.badge}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-[#8A4FFF] text-white text-xs font-bold flex items-center gap-1.5 shadow-xl">
                      <FAIcon name="fa-eye" className="w-4 h-4" /> Perbesar Tampilan
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left px-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-[#A26BFF] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. 16 TENSES EXPLORER MATRIX                                   */}
      {/* ------------------------------------------------------------- */}
      <section id="16-tenses" className="py-20 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ensiklopedia 16 Tenses Interaktif</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Klik kategori di bawah untuk melihat rumus dan contoh skenario scan kamera AR-nya:
            </p>

            {/* Cosmo Tenses Helper Callout */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-[#1E1738] border border-[#8A4FFF]/30 max-w-xl mx-auto text-xs text-left">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Tenses Guide" className="w-10 h-10 object-contain shrink-0" />
              <p className="text-slate-200">
                <strong className="text-[#A26BFF]">Cosmo:</strong> &ldquo;Pilih salah satu dari 4 kelompok tenses di bawah ini, aku sudah siapkan rumus dan skenario scan AR-nya!&rdquo;
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ALL_16_TENSES.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setActiveTenseCategory(idx)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTenseCategory === idx
                    ? 'bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_16_TENSES[activeTenseCategory].tenses.map(tense => (
              <div
                key={tense.name}
                className="glass-card-reference glass-card-hover rounded-2xl p-5 border border-white/10 space-y-3"
              >
                <h4 className="text-sm font-bold text-white">{tense.name}</h4>
                <div className="p-2 rounded-lg bg-black/50 font-mono text-xs text-[#A26BFF] font-semibold">
                  {tense.formula}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{tense.usage}</p>
                <div className="p-2 rounded-lg bg-white/5 text-[11px] text-slate-200 italic">
                  &ldquo;{tense.example}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. HOW IT WORKS SECTION                                        */}
      {/* ------------------------------------------------------------- */}
      <section id="cara-kerja" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Semudah 1, 2, 3 untuk Mulai Fasih</h2>
          <p className="text-slate-300 text-sm">
            Alur belajar interaktif dari memilih tenses hingga bermain game AR yang seru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-card-reference rounded-3xl p-7 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#8A4FFF]/30 text-[#A26BFF] flex items-center justify-center font-bold">1</div>
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Step 1" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-base font-bold text-white">Pilih Tense &amp; Preferensi Belajar</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sebelum masuk ke AR, pilih salah satu dari 16 tenses yang ingin kamu kuasai, atur target harian, tema materi, dan gaya penjelasan AI favoritmu.
            </p>
          </div>

          <div className="glass-card-reference rounded-3xl p-7 border border-[#E85AA0]/30 bg-gradient-to-b from-[#1E1738] to-[#120F24] space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#E85AA0]/30 text-[#E85AA0] flex items-center justify-center font-bold">2</div>
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Step 2" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-base font-bold text-white">Dipandu AI Tutor &amp; Tanya via Chat</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Dapatkan pemahaman mendalam tentang rumus dan contoh tenses dari AI Tutor. Bebas tanyakan bagian mana pun yang kamu belum paham via fitur Chat 24/7.
            </p>
          </div>

          <div className="glass-card-reference rounded-3xl p-7 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#8A4FFF]/30 text-[#A26BFF] flex items-center justify-center font-bold">3</div>
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Step 3" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-base font-bold text-white">Praktek Kamera AR &amp; Game AR Seru</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Aktifkan kamera AR untuk memindai benda sekitar menjadi contoh kalimat nyata, atau mainkan Game AR interaktif untuk mengasah pemahamanmu!
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7.5 PRICING & TRIAL OFFER SECTION (Matching App Screenshots)   */}
      {/* ------------------------------------------------------------- */}
      <section id="harga" className="py-20 bg-gradient-to-b from-[#110B29] via-[#1A123D] to-[#0D0821] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header & Mascot Callout */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A4FFF]/20 border border-[#8A4FFF]/40 text-[#A26BFF] text-xs font-bold uppercase tracking-wider">
              <FAIcon name="fa-wand-magic-sparkles" className="w-4 h-4 text-[#E85AA0]" />
              <span>Paket Berlangganan &amp; Akses Gratis dengan Ketentuan</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Investasi Terjangkau untuk Fasih 16 Tenses
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Mulai secara <strong className="text-emerald-400">Gratis dengan Ketentuan</strong> di HP Android. Tingkatkan ke paket PRO atau Ultimate untuk bertanya ke Tutor AI tanpa batas!
            </p>

            {/* Cosmo Buddy Pricing Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-[#211645] via-[#2E1B56] to-[#1C123B] border border-[#8A4FFF]/50 flex items-center gap-4 text-left shadow-xl max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center shrink-0 shadow-lg overflow-hidden">
                <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Pricing" className="w-full h-full object-contain" />
              </div>
              <div className="text-xs space-y-1">
                <div className="font-bold text-[#A26BFF] flex items-center gap-2">
                  <span>Cosmo Buddy</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">Gratis S&amp;K</span>
                </div>
                <p className="text-slate-200 leading-snug">
                  &ldquo;Kamu bisa mulai belajar secara gratis dengan ketentuan yang berlaku! Setelah itu, pilih paket bulanan hemat atau langganan seumur hidup!&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Grid (3 Cards matching Screenshots) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Card 1: TenseGo Basic */}
            <div className="glass-card-reference rounded-3xl p-7 border border-white/15 bg-white/5 space-y-6 flex flex-col justify-between relative opacity-90 hover:opacity-100 transition-opacity">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TenseGo Basic</span>
                  <span className="text-[10px] bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 font-mono">
                    GRATIS DENGAN KETENTUAN
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-white">Gratis</div>
                  <div className="text-xs text-slate-400 mt-1">Nikmati akses awal gratis dengan ketentuan yang berlaku di aplikasi Android.</div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                  <div className="flex items-start gap-2 text-slate-400">
                    <FAIcon name="fa-circle-xmark" className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Akses AI (Sesuai Ketentuan Aplikasi)</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <FAIcon name="fa-circle-xmark" className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Personalisasi Materi Terbatas</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <FAIcon name="fa-circle-xmark" className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span>Terdapat Iklan</span>
                  </div>
                </div>
              </div>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs text-center border border-white/10 transition-colors block"
              >
                Mulai Gratis
              </a>
            </div>

            {/* Card 2: TenseGo Pro Monthly (Featured Screenshot Highlight) */}
            <div className="glass-card-reference rounded-3xl p-8 border-2 border-[#8A4FFF] bg-gradient-to-b from-[#24174D] via-[#1A1138] to-[#120B29] space-y-6 flex flex-col justify-between relative shadow-2xl shadow-[#8A4FFF]/30 scale-100 lg:scale-105 z-10">
              {/* Top Banner Tag */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg border border-amber-300 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <FAIcon name="fa-wand-magic-sparkles" className="w-3.5 h-3.5" /> PENAWARAN TERBATAS
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#A26BFF]">TenseGo Pro Monthly</span>
                  <span className="text-xs bg-[#E85AA0]/20 text-pink-300 font-bold px-2.5 py-0.5 rounded-full border border-[#E85AA0]/30">
                    85% OFF
                  </span>
                </div>

                {/* Price Display */}
                <div>
                  <div className="text-xs text-slate-400 line-through">Rp 199.000</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">Rp 29.000</span>
                    <span className="text-xs text-slate-300 font-medium">/ bln</span>
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 inline-block flex items-center gap-1">
                    <FAIcon name="fa-fire" className="text-amber-400" /> HEMAT HINGGA 85%
                  </div>
                </div>

                {/* Checklist (Exact Screenshot Match) */}
                <div className="pt-4 border-t border-white/15 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-100 font-medium">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#8A4FFF] shrink-0" />
                    <span>Tanya AI Sepuasnya (60x/Bulan)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-100 font-medium">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#8A4FFF] shrink-0" />
                    <span>Personalisasi Materi Tak Terbatas</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-100 font-medium">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#8A4FFF] shrink-0" />
                    <span>Belajar Fokus (Bebas Iklan)</span>
                  </div>
                </div>
              </div>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#E85AA0] hover:from-[#9861FF] hover:to-[#F36DB1] text-white font-extrabold text-sm shadow-xl shadow-[#8A4FFF]/40 text-center transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Ambil Akses PRO Sekarang</span>
                <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: TenseGo Ultimate (Tahunan & Lifetime Options Screenshot) */}
            <div className="glass-card-reference rounded-3xl p-7 border border-white/20 bg-gradient-to-b from-[#1B1438] to-[#0E0A21] space-y-6 flex flex-col justify-between relative shadow-xl">
              <div className="space-y-5">
                <div className="text-sm font-extrabold text-white border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>TenseGo Ultimate</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">
                    Rekomendasi Hemat
                  </span>
                </div>

                {/* Option 1: TAHUNAN */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">TAHUNAN</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded">58% OFF</span>
                    </div>
                    <div className="text-xs text-slate-400 line-through">Rp 1.188.000</div>
                    <div className="text-base font-extrabold text-white">
                      Rp 499.000 <span className="text-[10px] text-slate-300 font-normal">/ thn</span>
                    </div>
                    <div className="text-[10px] text-emerald-400">~Rp 41.583 / bln</div>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    Pilih
                  </a>
                </div>

                {/* Option 2: LIFETIME */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#281A52] to-[#1E1242] border border-[#8A4FFF]/40 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#A26BFF]">LIFETIME</span>
                      <span className="text-[10px] bg-[#8A4FFF]/30 text-[#A26BFF] font-bold px-1.5 py-0.2 rounded">SEKALI BAYAR</span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-0.5">
                      Rp 899.000
                    </div>
                    <div className="text-[10px] text-slate-300">Selamanya, tanpa perpanjangan</div>
                  </div>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#8A4FFF] hover:bg-[#9861FF] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Pilih
                  </a>
                </div>

                {/* Ultimate Checklist (Exact Screenshot Match) */}
                <div className="pt-2 space-y-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Tanya AI Sepuasnya (300x/Bulan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Personalisasi Materi Tak Terbatas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Belajar Fokus (Bebas Iklan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Analisa Gaya Belajar AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Prioritas Respon AI (Lebih Cepat)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Akses Fitur Baru Duluan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FAIcon name="fa-circle-check" className="w-4 h-4 text-[#A26BFF] shrink-0" />
                    <span>Badge Profil Eksklusif</span>
                  </div>
                </div>
              </div>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center border border-white/20 transition-all block mt-4"
              >
                Ambil Akses Ultimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FOUNDER'S PROMISE SECTION                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-black/40 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Komitmen &amp; Misi</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Misi Kami untuk Membantu Kamu</h2>
          </div>

          <div className="glass-card-reference rounded-3xl p-8 sm:p-12 border border-[#8A4FFF]/30 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-slate-100 italic leading-relaxed">
              &ldquo;Kami membangun TenseGO karena kami tahu susahnya menghafal 16 Tenses bahasa Inggris. Kami ingin kamu belajar tanpa tekanan, tanpa bosan, langsung dari sekitarmu.&rdquo;
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Mascot" className="w-10 h-10 object-contain shrink-0" />
                <div>
                  <div className="font-bold text-white text-base">Cosmo Buddy &amp; Tim Developer TenseGO</div>
                  <div className="text-xs text-slate-400">Mobile Engineers &amp; Language Educators</div>
                </div>
              </div>

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5"
              >
                <FAIcon name="fa-comment-medical" className="text-indigo-400" /> Kirim Masukan Developer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. FAQ SECTION                                                 */}
      {/* ------------------------------------------------------------- */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Informasi penting seputar alur belajar, fitur AR, dan paket harga TenseGO</p>
        </div>

        <div className="space-y-3 text-sm">
          {[
            {
              q: 'Bagaimana alur belajar tenses di aplikasi TenseGO?',
              a: 'Alurnya sangat mudah dan terstruktur! Sebelum masuk ke AR, kamu memilih tenses yang ingin dipelajari (dari 16 tenses yang ada) serta mengatur preferensi belajar (tujuan, tema, gaya penjelasan AI). AI Tutor lalu memberikan penjelasan mendalam tentang rumus dan penggunaannya. Kamu bisa bertanya kapan saja via Chat AI, memindai benda dengan Kamera AR untuk melihat penerapan langsung, atau mengasah pemahaman lewat Game AR.'
            },
            {
              q: 'Apakah ada fitur Game AR di TenseGO?',
              a: 'Ya, tentu ada! TenseGO tidak hanya memindai objek sekitar, tetapi juga dilengkapi mini Game AR seru di mana kamu bisa bermain secara interaktif sambil melatih refleks penggunaan tenses secara langsung melalui kamera smartphone.'
            },
            {
              q: 'Bagaimana ketentuan akses gratis di aplikasi TenseGO?',
              a: 'TenseGO dapat digunakan secara gratis dengan ketentuan dan batasan wajar yang berlaku di dalam aplikasi. Kamu bisa mencoba berbagai fitur unggulan seperti AI Tutor, Chat AI, Kamera AR, dan Game AR. Setelahnya, kamu dapat memilih paket PRO Monthly (Rp 29.000/bln) atau Ultimate.'
            },
            {
              q: 'Apakah TenseGO gratis diunduh di Google Play Store?',
              a: 'Ya, TenseGO 100% gratis diunduh di Google Play Store tanpa perlu mendaftarkan kartu kredit.'
            },
            {
              q: 'Perangkat Android apa saja yang didukung oleh TenseGO?',
              a: 'TenseGO mendukung semua smartphone Android yang menjalankan OS Android 8.0 (Oreo) ke atas dan memiliki kamera belakang aktif.'
            },
            {
              q: 'Apakah data dan kamera saya aman saat menggunakan fitur AR?',
              a: 'Sangat aman. Pemrosesan kamera AR dilakukan secara real-time dan lokal pada perangkat. Kami tidak pernah menyimpan, merekam, atau membagikan foto maupun video pribadi kamu ke server pihak ketiga.'
            }
          ].map((faq, idx) => (
            <div key={idx} className="glass-card-reference rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <FAIcon name="fa-chevron-down" className={`w-4 h-4 text-[#A26BFF] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. BOTTOM CTA                                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#181138] via-[#2A1F5E] to-[#0A0814] border-t border-white/15 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Prominent Cosmo Buddy Mascot Promo Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 p-6 rounded-3xl bg-gradient-to-r from-[#211645] to-[#3B1F60] border border-[#8A4FFF]/50 max-w-2xl mx-auto shadow-2xl">
            <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Mascot Promo" className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-[0_4px_20px_rgba(138,79,255,0.7)] animate-bounce-slow" />
            <div className="text-center sm:text-left space-y-1">
              <div className="text-xs font-bold text-[#E85AA0] uppercase tracking-wider">Pesan Khusus Cosmo Buddy</div>
              <h3 className="text-lg font-bold text-white">&ldquo;Aku sudah tidak sabar belajar bareng kamu!&rdquo;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ayo jadi pengguna pertama TenseGO! Tekan tombol di bawah untuk mengunduh gratis di Google Play Store.
              </p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Jadilah yang Pertama Merasakan Revolusi Belajar Ini.
          </h2>
          <p className="text-slate-200 text-base max-w-xl mx-auto">
            Download sekarang di Google Play Store dan rasakan kemudahan menguasai 16 Tenses dengan benda-benda di sekitarmu!
          </p>

          <div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] hover:from-[#9861FF] hover:to-[#B37EFF] text-white font-extrabold text-base shadow-2xl flex items-center gap-2 mx-auto w-fit active:scale-95 transition-all"
            >
              <span>Download di Google Play</span>
              <FAIcon name="fa-arrow-up-right-from-square" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06040C] border-t border-white/10 py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center overflow-hidden">
                <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white text-sm">TenseGO</span>
              <span className="text-slate-500">· Belajar 16 Tenses dengan AI &amp; Kamera AR</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button onClick={() => { setActiveInfoTab('terms'); setShowInfoModal(true); }} className="hover:text-white transition-colors underline">
                Syarat &amp; Ketentuan
              </button>
              <button onClick={() => { setActiveInfoTab('refund'); setShowInfoModal(true); }} className="hover:text-white transition-colors underline">
                Kebijakan Refund
              </button>
              <button onClick={() => { setActiveInfoTab('contact'); setShowInfoModal(true); }} className="hover:text-white transition-colors underline">
                Kontak Bisnis &amp; Alamat
              </button>
              <button onClick={() => { setActiveInfoTab('desc'); setShowInfoModal(true); }} className="px-3 py-1.5 rounded-full bg-[#8A4FFF]/25 text-[#A26BFF] hover:bg-[#8A4FFF]/40 transition-colors font-semibold border border-[#8A4FFF]/40 flex items-center gap-1.5">
                <FAIcon name="fa-circle-info" className="text-[#A26BFF]" /> Info Merchant &amp; Kebijakan
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 text-center sm:text-left">
            <div>© {new Date().getFullYear()} TenseGO Team. All rights reserved.</div>
            <div>Transaksi &amp; pembelian langganan diproses aman melalui Google Play Billing (Google Play Store).</div>
          </div>
        </div>
      </footer>

      {/* INFO MERCHANT & KEBIJAKAN MODAL */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl glass-card-reference rounded-3xl p-6 sm:p-8 space-y-6 relative border border-white/25 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FAIcon name="fa-xmark" className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/15 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-0.5 flex items-center justify-center shadow-lg">
                <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="TenseGO Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Informasi Merchant &amp; Kebijakan Resmi</h3>
                <p className="text-xs text-[#E85AA0] flex items-center gap-1.5">TenseGO Official <FAIcon name="fa-circle" className="text-[6px] text-[#E85AA0]" /> Kepatuhan Gateway Pembayaran</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveInfoTab('desc')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeInfoTab === 'desc' ? 'bg-[#8A4FFF] text-white shadow' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                1. Deskripsi Produk
              </button>
              <button
                onClick={() => setActiveInfoTab('terms')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeInfoTab === 'terms' ? 'bg-[#8A4FFF] text-white shadow' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                2. Syarat &amp; Ketentuan
              </button>
              <button
                onClick={() => setActiveInfoTab('refund')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeInfoTab === 'refund' ? 'bg-[#8A4FFF] text-white shadow' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                3. Kebijakan Refund
              </button>
              <button
                onClick={() => setActiveInfoTab('contact')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeInfoTab === 'contact' ? 'bg-[#8A4FFF] text-white shadow' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                4. Kontak &amp; Alamat
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-200 space-y-4 leading-relaxed">
              {activeInfoTab === 'desc' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white">Deskripsi Produk &amp; Layanan TenseGO</h4>
                  <p>
                    <strong className="text-white">TenseGO</strong> adalah aplikasi seluler edukasi berbasis Android yang dirancang khusus untuk membantu pengguna menguasai 16 Tenses bahasa Inggris dengan mudah, interaktif, dan menyenangkan.
                  </p>
                  <p>
                    <strong className="text-emerald-300">Fitur Utama:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                    <li><strong>Kamera AR Real-time:</strong> Memindai objek nyata di sekitar untuk menghasilkan contoh kalimat tenses secara instan.</li>
                    <li><strong>Tutor AI 24/7 (Cosmo AI):</strong> Bertanya dan berdiskusi seputar tenses kapan saja layaknya sahabat belajar pribadi.</li>
                    <li><strong>Kuis &amp; Game AR:</strong> Menguji kemampuan grammar secara adaptif dan seru.</li>
                    <li><strong>Personalisasi Belajar:</strong> Memilih tujuan belajar, tema, dan gaya penjelasan AI.</li>
                  </ul>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 flex items-start gap-2">
                    <FAIcon name="fa-lightbulb" className="text-amber-400 mt-0.5 shrink-0" />
                    <div><em>Catatan:</em> Website ini berfungsi sebagai landing page informasi &amp; pengenalan aplikasi. Seluruh aktivitas unduhan aplikasi, pendaftaran trial, dan pembelian paket langganan (PRO &amp; Ultimate) dilakukan langsung di dalam aplikasi resmi melalui <strong className="text-white">Google Play Billing (Google Play Store)</strong>.</div>
                  </div>
                </div>
              )}

              {activeInfoTab === 'terms' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white">Syarat &amp; Ketentuan Penggunaan (Terms of Service)</h4>
                  <p>1. <strong>Akses Gratis:</strong> Setiap pengguna dapat menggunakan TenseGO secara gratis dengan ketentuan dan batasan wajar yang berlaku di dalam aplikasi.</p>
                  <p>2. <strong>Langganan Berbayar:</strong> Paket PRO Monthly (Rp 29.000/bln) dan Ultimate (Tahunan/Lifetime) dibeli melalui Google Play Store dengan mata uang Rupiah (IDR).</p>
                  <p>3. <strong>Kebijakan Wajar (Fair Use):</strong> Layanan AI Tutor diatur dengan batas pemakaian wajar per bulan untuk memastikan kestabilan server bagi seluruh pengguna.</p>
                  <p>4. <strong>Perubahan Layanan:</strong> TenseGO berhak memperbarui fitur atau ketentuan seiring dengan pengembangan aplikasi.</p>
                </div>
              )}

              {activeInfoTab === 'refund' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white">Kebijakan Pengembalian Dana (Refund &amp; Cancellation Policy)</h4>
                  <p>
                    Karena seluruh transaksi langganan dan pembayaran diproses secara aman oleh <strong className="text-white">Google Play Billing (Google Play Store)</strong>, maka seluruh permintaan pengembalian dana (refund) tunduk sepenuhnya pada <strong className="text-emerald-300">Kebijakan Resmi Google Play</strong>.
                  </p>
                  <p>
                    <strong>Cara Mengajukan Refund:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-300">
                    <li>Buka aplikasi Google Play Store di HP Anda.</li>
                    <li>Ketuk ikon profil di kanan atas, lalu pilih <strong>Pembayaran &amp; Langganan</strong> &gt; <strong>Anggaran &amp; Riwayat</strong>.</li>
                    <li>Pilih transaksi TenseGO yang ingin direfund, lalu pilih <strong>Minta Pengembalian Dana</strong>.</li>
                  </ol>
                  <p className="text-slate-400">
                    Biasanya Google Play memproses permohonan refund dalam waktu 1x24 hingga 4x24 jam sesuai ketentuan Google.
                  </p>
                </div>
              )}

              {activeInfoTab === 'contact' && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white">Kontak Bisnis &amp; Informasi Perusahaan</h4>
                  <div className="space-y-2.5 text-slate-300">
                    <p className="flex items-center gap-2"><FAIcon name="fa-location-dot" className="text-red-400" /> <strong className="text-white">Alamat Operasional:</strong> 84316 - SUMBAWA - NUSA TENGGARA BARAT, INDONESIA</p>
                    <p className="flex items-center gap-2"><FAIcon name="fa-envelope" className="text-indigo-400" /> <strong className="text-white">Email Resmi Dukungan:</strong> tensego.official@gmail.com</p>
                    <p className="flex items-center gap-2"><FAIcon name="fa-phone" className="text-emerald-400" /> <strong className="text-white">Telepon / WhatsApp:</strong> +62 877-5393-5810</p>
                    <p className="flex items-center gap-2"><FAIcon name="fa-clock" className="text-cyan-400" /> <strong className="text-white">Jam Operasional:</strong> Senin - Jumat, pukul 09.00 - 17.00 WIB</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                Tutup
              </button>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white font-bold text-xs shadow-lg flex items-center gap-2"
              >
                <span>Download TenseGO di Play Store</span>
                <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE PLAY MODAL */}
      {showPlayStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card-reference rounded-3xl p-6 space-y-5 text-center relative border border-white/20">
            <button
              onClick={() => setShowPlayStoreModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <FAIcon name="fa-xmark" className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#8A4FFF] to-[#E85AA0] p-1 flex items-center justify-center text-white mx-auto shadow-2xl overflow-hidden">
              <img src="assets/aistudio/Cosmo_Buddy_1f87fc2b.png" alt="Cosmo Buddy Play Store" className="w-full h-full object-contain" />
            </div>

            <h3 className="text-xl font-bold text-white">TenseGO: AI AR English</h3>
            <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">id.replace.tensegoai <FAIcon name="fa-circle" className="text-[6px] text-emerald-400" /> 100% Gratis</p>

            <div className="p-4 bg-black/50 rounded-2xl border border-white/10 flex items-center gap-4 text-left">
              <FAIcon name="fa-qrcode" className="w-12 h-12 text-white shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Scan via Smartphone</div>
                <div className="text-slate-400 text-[11px]">Arahkan kamera HP untuk membuka langsung di Google Play.</div>
              </div>
            </div>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <span>Buka di Google Play Store</span>
              <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
            </a>

            {isDownloading ? (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Mengunduh APK Cadangan...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8A4FFF]" style={{ width: `${downloadProgress}%` }} />
                </div>
              </div>
            ) : downloadComplete ? (
              <div className="p-3 bg-emerald-500/20 text-emerald-200 rounded-xl text-xs">
                File TenseGO_v1.0.0.apk siap diinstal!
              </div>
            ) : (
              <button
                onClick={startSimulatedDownload}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold"
              >
                Unduh Cadangan APK (28 MB)
              </button>
            )}
          </div>
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-card-reference rounded-3xl p-6 space-y-4 relative border border-white/20">
            <button
              onClick={() => {
                setShowFeedbackModal(false);
                setFeedbackSent(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <FAIcon name="fa-xmark" className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">Bantu Developer TenseGO</h3>
            <p className="text-xs text-slate-300">Kirim masukan atau ide fitur secara langsung ke tim pengembang:</p>

            {feedbackSent ? (
              <div className="p-4 bg-emerald-500/20 text-emerald-200 rounded-2xl text-xs text-center space-y-2">
                <div className="font-bold text-white">Terima Kasih!</div>
                <div>Masukanmu sudah terkirim langsung ke email developer.</div>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
                <div>
                  <label htmlFor={feedbackNameId} className="block text-slate-300 font-medium mb-1">Nama Lengkap:</label>
                  <input
                    id={feedbackNameId}
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={feedbackForm.name}
                    onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label htmlFor={feedbackEmailId} className="block text-slate-300 font-medium mb-1">Email Aktif:</label>
                  <input
                    id={feedbackEmailId}
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={feedbackForm.email}
                    onChange={e => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label htmlFor={feedbackLevelId} className="block text-slate-300 font-medium mb-1">Level Kemahiran Kamu:</label>
                  <select
                    id={feedbackLevelId}
                    value={feedbackForm.level}
                    onChange={e => setFeedbackForm({ ...feedbackForm, level: e.target.value })}
                    className="w-full bg-[#181232] border border-white/10 rounded-xl p-2.5 text-white"
                  >
                    <option value="A1 (Beginner)">A1 - Pemula (Belum tahu tenses)</option>
                    <option value="A2 (Elementary)">A2 - Dasar (Bingung past vs present)</option>
                    <option value="B1 (Intermediate)">B1 - Menengah (Paham dasar)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={feedbackMessageId} className="block text-slate-300 font-medium mb-1">Masukan atau Fitur yang Diinginkan:</label>
                  <textarea
                    id={feedbackMessageId}
                    rows={3}
                    required
                    placeholder="Tulis masukan kamu di sini..."
                    value={feedbackForm.message}
                    onChange={e => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#8A4FFF] to-[#A26BFF] text-white font-bold"
                >
                  Kirim Masukan
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR APP SCREENSHOTS */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn" onClick={() => setActiveLightboxImg(null)}>
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-12 right-0 p-2 text-white bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <FAIcon name="fa-xmark" className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImg}
              alt="Tampilan Aplikasi TenseGO"
              className="w-auto h-auto max-h-[82vh] rounded-3xl shadow-2xl border border-white/20 object-contain"
            />
            <div className="mt-3 flex items-center gap-3">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#8A4FFF] text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <span>Unduh TenseGO di Google Play</span>
                <FAIcon name="fa-arrow-up-right-from-square" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
