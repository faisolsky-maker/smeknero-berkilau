
/* primbon.js - deterministic primbon (stable for same name+dob) */
function deterministicSeed(s){
  let h = 2166136261;
  for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); }
  return (h >>> 0);
}

const PRIMBON_TEMPLATES = [
  'Energi keberuntungan sedang kuat — fokus pada tujuanmu hari ini.',
  'Hari ini cocok untuk belajar hal baru dan bereksperimen.',
  'Perhatikan komunikasi; dengarkan lebih dulu sebelum memberi tanggapan.',
  'Waktu tepat untuk merapikan jadwal belajar dan istirahat.',
  'Jaga kesehatan: perbanyak air putih dan konsumsi makanan bergizi.',
  'Pertemanan menguat; inisiasi percakapan positif.'
];

const WEEK_DAYS = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const PASARAN = ['Legi','Pahing','Pon','Wage','Kliwon'];

function displayPrimbon(){
  const name = document.getElementById('pName').value.trim();
  const dob = document.getElementById('pDob').value;
  if(!name || !dob){ alert('Isi nama dan tanggal lahir'); return; }
  const key = name.toLowerCase().trim() + '|' + dob;
  const seed = deterministicSeed(key);
  const pick = PRIMBON_TEMPLATES[seed % PRIMBON_TEMPLATES.length];
  const lifePath = (sumDigits(dob.replace(/-/g,'')) % 9) || 9;
  const dayIndex = new Date(dob).getDay();
  const luckyDay = WEEK_DAYS[dayIndex];
  const weton = PASARAN[seed % PASARAN.length];
  const luckyNumber = (seed % 99) + 1;
  const dateStr = new Date().toLocaleDateString();
  const full = `<strong>Ramalan</strong><div style="margin-top:8px">${pick}</div>
    <div style="margin-top:8px"><strong>Angka jalan hidup:</strong> ${lifePath}</div>
    <div style="margin-top:6px"><strong>Hari keberuntungan (hari lahir):</strong> ${luckyDay}</div>
    <div style="margin-top:6px"><strong>Pasaran:</strong> ${weton}</div>
    <div style="margin-top:6px"><strong>Angka keberuntungan:</strong> ${luckyNumber}</div>
    <div style="margin-top:8px;color:#666"><em>Hasil stabil jika nama + tanggal lahir sama. Tanggal cek: ${dateStr}</em></div>`;
  document.getElementById('primResult').innerHTML = full;
}
