
/* admin.js */
function loadAllEntries(){
  const data = JSON.parse(localStorage.getItem('mood_v_final')||'[]');
  renderTable(data);
}
function renderTable(data){
  const tbody = document.getElementById('tbody');
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr = document.createElement('tr');
    const moodLabel = {1:'Marah',2:'Sedih',3:'Capek',4:'Biasa',5:'Senang'}[d.mood] || d.mood;
    tr.innerHTML = `<td>${d.id}</td><td>${d.name||''}</td><td>${d.kelas||''}</td><td>${d.jurusan||''}</td><td>${moodLabel}</td><td>${d.curhat||''}</td><td>${d.date}</td>`;
    tbody.appendChild(tr);
  });
}
function downloadCSV(){
  const data = JSON.parse(localStorage.getItem('mood_v_final')||'[]');
  const rows = ['id,name,kelas,jurusan,mood,curhat,date'];
  data.forEach(d=> rows.push([d.id,JSON.stringify(d.name||''),d.kelas,d.jurusan,d.mood,JSON.stringify(d.curhat||''),d.date].join(',')));
  const blob = new Blob([rows.join('\n')],'text/csv');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='moodmeter_export.csv'; a.click(); URL.revokeObjectURL(url);
}
function applyFilter(){
  const cls = document.getElementById('fClass').value.trim();
  const jur = document.getElementById('fJur').value.trim();
  let data = JSON.parse(localStorage.getItem('mood_v_final')||'[]');
  if(cls) data = data.filter(d=>d.kelas===cls);
  if(jur) data = data.filter(d=>d.jurusan===jur);
  renderTable(data);
}
