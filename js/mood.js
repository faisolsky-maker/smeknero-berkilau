
/* mood.js - final v4 */
const STORAGE_KEY = 'mood_v_final';

const SUGGESTIONS = {
  5: {title:'Senang', food:'Buah segar, yoghurt, air putih', rest:'Istirahat ringan 5–10 menit', activity:'Bagikan kebaikan ke teman, kerjakan tugas ringan dengan semangat', mental:'Tuliskan 3 hal yang Anda syukuri hari ini; pertahankan rutinitas positif.'},
  4: {title:'Biasa', food:'Snack sehat (kacang), air', rest:'Istirahat singkat setiap 45 menit belajar', activity:'Jalan singkat 5 menit, dengarkan musik ringan', mental:'Coba journaling singkat: 5 menit catat yang berjalan baik.'},
  3: {title:'Capek', food:'Air hangat, pisang, sup hangat', rest:'Tidur siang 20 menit jika memungkinkan; batasi layar', activity:'Peregangan 5 menit, gerakan leher & bahu', mental:'Bagi tugas besar menjadi tugas kecil; gunakan timer Pomodoro.'},
  2: {title:'Sedih', food:'Makanan hangat (sup), teh hangat, buah', rest:'Istirahat cukup; jika perlu tidurlah 20–30 menit', activity:'Ceritakan pada teman atau guru BK; tulis jurnal perasaan', mental:'Pernapasan 4-4-4 (relaksasi otomatis); jika terus tertekan, minta bantuan profesional.'},
  1: {title:'Marah', food:'Air dingin, buah segar', rest:'Jauhkan diri sementara dari sumber konflik; tarik napas panjang', activity:'Berjalan 2–5 menit, menulis apa yang mengganggu', mental:'Jangan bertindak impulsif; hubungi BK jika diperlukan; relaksasi otomatis dijalankan.'}
};

let currentMood = null;
let relaxInterval = null;

// UI helpers
function navPage(id){
  document.getElementById('home').style.display = id==='home' ? 'block' : 'none';
  document.getElementById('tipsPage').style.display = id==='tipsPage' ? 'block' : 'none';
  document.getElementById('primbonPage').style.display = id==='primbonPage' ? 'block' : 'none';
}

// select mood
function selectMood(m){
  currentMood = m;
  highlightSelected(m);
  showSuggestion(m);
  if(m===1||m===2){ startRelaxAuto(); } else { stopRelaxAuto(); }
}

function highlightSelected(m){
  document.querySelectorAll('.mood-btn').forEach(b=> b.style.boxShadow='');
  const btn = document.querySelector('.mood-btn[data-mood="'+m+'"]');
  if(btn) btn.style.boxShadow='0 16px 36px rgba(0,0,0,0.12)';
}

// show suggestion
function showSuggestion(m){
  const s = SUGGESTIONS[m];
  const name = document.getElementById('name').value.trim() || 'Anonim';
  const kelas = document.getElementById('kelas').value || '-';
  const jur = document.getElementById('jurusan').value || '-';
  const html = `<strong>${s.title}</strong>
    <div style="margin-top:8px"><strong>Makanan & Minuman:</strong> ${s.food}</div>
    <div style="margin-top:6px"><strong>Istirahat:</strong> ${s.rest}</div>
    <div style="margin-top:6px"><strong>Aktivitas yang disarankan:</strong> ${s.activity}</div>
    <div style="margin-top:6px"><strong>Saran kesehatan mental:</strong> ${s.mental}</div>
    <div style="margin-top:8px;color:#666"><em>Diisi oleh:</em> ${name} | ${kelas} | ${jur}</div>`;
  document.getElementById('suggestion').innerHTML = html;
  if(document.getElementById('tipsContent')) document.getElementById('tipsContent').innerHTML = html + '<hr><div class="small">Untuk situasi berat, kontak Guru BK segera.</div>';
}

// save mood + curhat
function saveMood(){
  if(!currentMood){ alert('Pilih mood terlebih dahulu'); return; }
  const entry = {
    id: Date.now().toString(36),
    name: document.getElementById('name').value.trim(),
    kelas: document.getElementById('kelas').value,
    jurusan: document.getElementById('jurusan').value,
    mood: currentMood,
    curhat: document.getElementById('curhat').value.trim(),
    date: new Date().toISOString()
  };
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  data.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  alert('Mood dan curhat tersimpan. Guru BK dapat memantau untuk konseling.');
}

// improved relax: countdown + nicer end message + tips
function startRelaxAuto(){
  stopRelaxAuto();
  const rc = document.getElementById('relaxContainer');
  rc.style.display = 'block';
  const circle = document.getElementById('relaxCircle');
  const status = document.getElementById('relaxStatus');
  let total = 45; // 45-second session for nicer experience
  let phase = 0; let phaseTime = 4;
  status.innerText = 'Relaksasi otomatis dimulai ('+total+'s)';
  relaxInterval = setInterval(()=>{
    phaseTime--; total--;
    // cycle phases: inhale, hold, exhale
    if(phase===0){ circle.style.transform='scale(1.18)'; circle.innerText='Tarik'; status.innerText='Tarik napas (4s) — fokus pada pernapasan'; }
    else if(phase===1){ circle.style.transform='scale(1.04)'; circle.innerText='Tahan'; status.innerText='Tahan (4s) — rasakan detak jantung melambat'; }
    else { circle.style.transform='scale(0.9)'; circle.innerText='Hembus'; status.innerText='Hembuskan (4s) — lepaskan ketegangan'; }
    if(phaseTime<=0){ phase=(phase+1)%3; phaseTime=4; }
    // update subtle pulse via background rotation (visual cue)
    circle.style.background = 'conic-gradient(#06d6a0 ' + ((Date.now()/50)%360) + 'deg, #fff)';
    if(total<=0){
      stopRelaxAuto();
      status.innerHTML = '<strong>Selamat — Sesi relaksasi selesai!</strong><br>Tip: Minum air, peregangan ringan, dan catat 1 hal positif yang membuatmu tenang.';
      // small confetti simple (textual encouragement)
      const c = document.createElement('div'); c.style.marginTop='8px'; c.innerHTML = '<em>👏 Selamat, Anda hebat — tetap jaga kesehatan!</em>'; document.getElementById('suggestion').appendChild(c);
    }
  },1000);
}

function stopRelaxAuto(){ if(relaxInterval){ clearInterval(relaxInterval); relaxInterval=null; } const rc = document.getElementById('relaxContainer'); if(rc) rc.style.display='none'; }

// utility used by primbon script
function sumDigits(s){ return String(s).split('').map(Number).reduce((a,b)=>a+b,0); }
