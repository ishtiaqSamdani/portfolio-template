import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Clock, Settings, Database, User, Play, Square, Search, 
  ChevronRight, Heart, Camera, Smartphone, Sliders, FileText, Share,
  ShieldCheck, AlertCircle
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// --- MOCK DATA ---
const MOCK_HISTORY = [
  { id: 1, name: 'John Doe', age: 34, date: 'Oct 24, 2026', hr: 72, hrv: 45, sns: 30, pns: 70 },
  { id: 2, name: 'Jane Smith', age: 28, date: 'Oct 22, 2026', hr: 65, hrv: 55, sns: 20, pns: 80 },
  { id: 3, name: 'Robert King', age: 52, date: 'Oct 20, 2026', hr: 84, hrv: 25, sns: 65, pns: 35 },
  { id: 4, name: 'Emily Davis', age: 41, date: 'Oct 15, 2026', hr: 78, hrv: 38, sns: 40, pns: 60 },
];

const MOCK_REPERTORY = [
  { id: 101, remedy: 'Sulphur', match: 92, patients: 14, lastUsed: 'Oct 24, 2026' },
  { id: 102, remedy: 'Arsenicum', match: 88, patients: 9, lastUsed: 'Oct 21, 2026' },
  { id: 103, remedy: 'Pulsatilla', match: 75, patients: 22, lastUsed: 'Oct 19, 2026' },
  { id: 104, remedy: 'Nux Vomica', match: 81, patients: 11, lastUsed: 'Oct 10, 2026' },
];

// --- UI COMPONENTS ---
const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-[16px] shadow-sm border border-gray-100 p-4 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
  >
    {children}
  </div>
);

const SegmentedControl = ({ options, selected, onChange }) => (
  <div className="flex bg-gray-100 p-1 rounded-[12px] w-full">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-all duration-200 ${
          selected === opt.value 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const ProgressBar = ({ value, colorClass = 'bg-indigo-600', label, minLabel, maxLabel }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
      <span>{label}</span>
      <span className="font-bold text-gray-800">{value}%</span>
    </div>
    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`} 
        style={{ width: `${value}%` }}
      />
    </div>
    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
      <span>{minLabel}</span>
      <span>{maxLabel}</span>
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('measure');
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Measurement State
  const [sensorType, setSensorType] = useState('chest');
  const [duration, setDuration] = useState('1m');
  const [sensitivity, setSensitivity] = useState(21);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  
  // Live Data State
  const [liveData, setLiveData] = useState([]);
  const [currentHR, setCurrentHR] = useState(0);
  const [currentHRV, setCurrentHRV] = useState(0);
  const [sns, setSns] = useState(0);
  const [pns, setPns] = useState(0);

  // Simulation Logic
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsRecording(false);
            return 100;
          }
          return p + (100 / (150)); // Simulating a fast 15-second record for demo
        });
        
        // Generate dummy live data
        const newPoint = {
          time: new Date().toISOString(),
          value: 400 + Math.random() * 200 + Math.sin(progress) * 100
        };
        
        setLiveData(prev => [...prev.slice(-30), newPoint]);
        setCurrentHR(Math.floor(65 + Math.random() * 15));
        setCurrentHRV(Math.floor(35 + Math.random() * 10));
        setSns(Math.floor(40 + Math.random() * 5));
        setPns(Math.floor(60 + Math.random() * 5));

      }, 100);
    } else if (progress >= 100) {
      // Completed state holds the data
    } else {
      // Reset state
      setProgress(0);
      setLiveData([]);
      setCurrentHR(0);
      setCurrentHRV(0);
      setSns(0);
      setPns(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, progress]);

  const handleStartStop = () => {
    if (!patientName) {
      // Simulate validation
      setPatientName('Guest Patient');
      setPatientAge('30');
    }
    setIsRecording(!isRecording);
    if (!isRecording && progress >= 100) setProgress(0); // Reset if restarting
  };

  // --- VIEWS ---
  const renderMeasure = () => (
    <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Stats Bento */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-white">
          <Heart className={`w-8 h-8 ${isRecording ? 'text-red-500 animate-pulse' : 'text-indigo-400'} mb-2`} />
          <span className="text-sm text-gray-500 font-medium">Heart Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">{currentHR || '--'}</span>
            <span className="text-xs text-gray-500 font-medium">BPM</span>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-white">
          <Activity className="w-8 h-8 text-emerald-500 mb-2" />
          <span className="text-sm text-gray-500 font-medium">HRV (RMSSD)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">{currentHRV || '--'}</span>
            <span className="text-xs text-gray-500 font-medium">ms</span>
          </div>
        </Card>
      </div>

      {/* Live Chart Bento */}
      <Card className="relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">R-R Interval Data</h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
            {isRecording ? 'Recording...' : progress >= 100 ? 'Completed' : 'Ready'}
          </span>
        </div>
        
        <div className="h-40 w-full bg-gray-50 rounded-[12px] flex items-center justify-center border border-gray-100 overflow-hidden relative">
          {!isRecording && progress === 0 ? (
            <span className="text-sm text-gray-400">Press Start to begin</span>
          ) : (
            <ResponsiveContainer width="105%" height="100%">
              <AreaChart data={liveData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Meters */}
        <div className="mt-5 space-y-4">
          <ProgressBar 
            value={sns} 
            colorClass="bg-amber-500" 
            label="SNS (Sympathetic - Stress)" 
            minLabel="Low (0)" 
            maxLabel="High (100)" 
          />
          <ProgressBar 
            value={pns} 
            colorClass="bg-emerald-500" 
            label="PNS (Parasympathetic - Relax)" 
            minLabel="Low (0)" 
            maxLabel="Excellent (100)" 
          />
        </div>
      </Card>

      {/* Settings Bento */}
      <Card className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Input Source</label>
          <SegmentedControl 
            options={[
              { label: <span className="flex items-center justify-center gap-2"><Smartphone size={16}/> Chest</span>, value: 'chest' },
              { label: <span className="flex items-center justify-center gap-2"><Camera size={16}/> Camera</span>, value: 'camera' }
            ]}
            selected={sensorType}
            onChange={setSensorType}
          />
        </div>
        
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Duration</label>
          <SegmentedControl 
            options={[
              { label: '30s', value: '30s' },
              { label: '1m', value: '1m' },
              { label: '3m', value: '3m' },
              { label: '5m', value: '5m' }
            ]}
            selected={duration}
            onChange={setDuration}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sensitivity</label>
             <span className="text-sm font-bold text-indigo-600">{sensitivity}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={sensitivity}
            onChange={(e) => setSensitivity(e.target.value)}
            className="w-full accent-indigo-600"
          />
        </div>
      </Card>

      {/* Patient Info Bento */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card className="p-1">
            <input 
              type="text" 
              placeholder="Patient Name" 
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium px-3 py-2 outline-none placeholder-gray-400"
            />
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="p-1">
            <input 
              type="number" 
              placeholder="Age" 
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium px-3 py-2 outline-none placeholder-gray-400 text-center"
            />
          </Card>
        </div>
      </div>

      {/* Bottom Action Area Spacer */}
      <div className="h-16"></div> 
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-200/50 rounded-[12px] p-2 flex items-center gap-2 px-4 mb-4 border border-gray-200">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search Patient Name..." 
          className="bg-transparent border-none focus:ring-0 w-full text-gray-700 outline-none placeholder-gray-400 font-medium"
        />
      </div>

      <div className="flex justify-between items-center px-1 mb-2">
        <span className="text-sm font-semibold text-gray-500">Saved Reports ({MOCK_HISTORY.length})</span>
        <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full">
          <Share size={14} /> EXPORT ZIP
        </button>
      </div>

      {MOCK_HISTORY.map(record => (
        <Card key={record.id} className="flex flex-col gap-3" onClick={() => {}}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{record.name}</h4>
              <p className="text-xs text-gray-500 font-medium">{record.date} • Age {record.age}</p>
            </div>
            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-full">
              <ChevronRight size={18} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100">
            <div className="text-center">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">HR</span>
              <span className="font-bold text-gray-800">{record.hr}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">HRV</span>
              <span className="font-bold text-indigo-600">{record.hrv}</span>
            </div>
            <div className="text-center border-l border-gray-100 pl-2">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">SNS</span>
              <span className="font-bold text-amber-500">{record.sns}%</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] text-gray-400 uppercase font-bold">PNS</span>
              <span className="font-bold text-emerald-500">{record.pns}%</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderRepertory = () => (
    <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-6 h-6 text-indigo-200" />
          <h3 className="font-bold text-lg">Permanent Database</h3>
        </div>
        <p className="text-indigo-100 text-sm mb-4">Your personal, private repository of verified homeopathic remedy profiles.</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{MOCK_REPERTORY.length} <span className="text-sm font-normal text-indigo-200">Records</span></span>
        </div>
      </Card>

      <h4 className="text-sm font-bold text-gray-500 px-1 mt-6 mb-2 uppercase tracking-wider">Top Matches</h4>
      
      {MOCK_REPERTORY.map((item, idx) => (
        <Card key={item.id} className="flex items-center justify-between" onClick={() => {}}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              idx === 0 ? 'bg-amber-400' : idx === 1 ? 'bg-gray-300' : idx === 2 ? 'bg-amber-700' : 'bg-indigo-100 text-indigo-600'
            }`}>
              #{idx + 1}
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{item.remedy}</h4>
              <p className="text-xs text-gray-500 font-medium">Used {item.patients} times</p>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-lg font-bold text-emerald-600">{item.match}%</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase">Match Score</span>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Dr. D. K. Munta</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1 font-medium">
            <ShieldCheck size={14} className="text-emerald-500"/> Local Storage Active
          </p>
        </div>
      </div>

      <h4 className="text-sm font-bold text-gray-500 px-1 uppercase tracking-wider">Analysis Preferences</h4>
      <Card className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-semibold text-gray-800 text-sm">Bar Thickness</h5>
            <p className="text-xs text-gray-500">Adjust physical height of sensitivity bar</p>
          </div>
          <span className="font-bold text-indigo-600">150</span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <div>
            <h5 className="font-semibold text-gray-800 text-sm">Enable Calming White Noise</h5>
            <p className="text-xs text-gray-500">Play background sound during test</p>
          </div>
          <div className="w-12 h-7 bg-indigo-600 rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <div>
            <h5 className="font-semibold text-gray-800 text-sm">Camera Measurement Mode</h5>
            <p className="text-xs text-gray-500">Use optical sensing instead of chest</p>
          </div>
          <div className="w-12 h-7 bg-gray-200 rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
          </div>
        </div>
      </Card>

      <h4 className="text-sm font-bold text-gray-500 px-1 uppercase tracking-wider mt-6">Spectral Comparison (Hz)</h4>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-3">
          <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Min Hz</label>
          <input type="number" defaultValue="0.0" className="w-full text-lg font-bold text-gray-800 bg-transparent outline-none" />
        </Card>
        <Card className="p-3">
          <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Max Hz</label>
          <input type="number" defaultValue="0.48" className="w-full text-lg font-bold text-gray-800 bg-transparent outline-none" />
        </Card>
      </div>

      <div className="bg-red-50 p-4 rounded-[16px] border border-red-100 flex gap-3 mt-6">
         <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
         <p className="text-xs text-red-800 font-medium">
           <strong>Not a Medical Device:</strong> This app is intended for educational and general health information purposes only. Do not use for clinical diagnosis.
         </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans selection:bg-indigo-100">
      
      {/* Mobile Device Mockup Container */}
      <div className="w-full max-w-[400px] h-[850px] bg-[#f5f5f7] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-gray-800">
        
        {/* Dynamic Island / Status Bar area */}
        <div className="w-full h-12 flex justify-between items-center px-6 pt-2 bg-[#f5f5f7] z-20">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">9:41</span>
          <div className="w-24 h-7 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2"></div>
          <div className="flex items-center gap-1.5 text-gray-900">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            <div className="w-5 h-3 border border-gray-900 rounded-sm p-[1px] flex"><div className="w-full h-full bg-gray-900 rounded-[1px]"></div></div>
          </div>
        </div>

        {/* Header */}
        <header className="px-5 pt-4 pb-2 bg-[#f5f5f7] z-10 sticky top-0">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {activeTab === 'measure' && 'Biosignal Pro'}
                {activeTab === 'history' && 'History'}
                {activeTab === 'repertory' && 'Repertory'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-xs font-semibold text-indigo-600 tracking-wide uppercase mt-0.5">Local Profile</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-indigo-600">
               {activeTab === 'measure' && <Activity size={20} />}
               {activeTab === 'history' && <Clock size={20} />}
               {activeTab === 'repertory' && <Database size={20} />}
               {activeTab === 'settings' && <Settings size={20} />}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-5 pt-4 pb-32 no-scrollbar relative">
          {activeTab === 'measure' && renderMeasure()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'repertory' && renderRepertory()}
          {activeTab === 'settings' && renderSettings()}
        </main>

        {/* Floating Start Action Button (Only on Measure Tab) */}
        {activeTab === 'measure' && (
           <div className="absolute bottom-[90px] left-0 w-full px-5 z-20">
              <button 
                onClick={handleStartStop}
                className={`w-full py-4 rounded-[16px] font-bold text-white text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isRecording 
                    ? 'bg-red-500 shadow-red-500/30' 
                    : 'bg-indigo-600 shadow-indigo-600/30 active:scale-95'
                }`}
              >
                {isRecording ? (
                  <><Square className="fill-current" size={20}/> Stop Measurement</>
                ) : (
                  <><Play className="fill-current" size={20}/> Start Analysis</>
                )}
              </button>
              {/* Progress Line */}
              {isRecording && (
                <div className="absolute bottom-0 left-5 right-5 h-1 bg-white/20 rounded-full overflow-hidden mt-1 translate-y-2">
                  <div className="h-full bg-white transition-all duration-100 ease-linear" style={{width: `${progress}%`}}></div>
                </div>
              )}
           </div>
        )}

        {/* Bottom Tab Navigation */}
        <nav className="absolute bottom-0 w-full h-[85px] bg-white/80 backdrop-blur-xl border-t border-gray-200/50 flex justify-between items-start px-6 pt-3 pb-safe z-30">
          {[
            { id: 'measure', icon: Activity, label: 'Measure' },
            { id: 'history', icon: Clock, label: 'History' },
            { id: 'repertory', icon: Database, label: 'Repertory' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50 scale-110' : 'bg-transparent'}`}>
                   <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </nav>
        
        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-40"></div>

        {/* Global Styles to hide scrollbar for clean look */}
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

      </div>
    </div>
  );
}
