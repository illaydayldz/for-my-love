const notes = [
  'Şu an zorlanıyor olman, başarısız olacağın anlamına gelmiyor. Sadece çok önemsediğin için böyle hissediyorsun.',
  'Bir nefes al. Bugüne kadar elinden geleni yaptın ve bu zaten çok değerli.',
  'Bu sınav senin değerini belirlemiyor. Sen zaten sevilen, emek veren ve güçlü birisin.',
  'Panik geldiğinde sadece bir sonraki küçük adıma bak. Hepsini aynı anda düşünmek zorunda değilsin.',
  'Ben senin emeğini görüyorum. Sonuç ne olursa olsun seninle gurur duyacağım.',
  'Şimdi bir bardak su iç. Sonra sadece 5 dakika toparlan. Her şey bir anda olmak zorunda değil.',
  'Kendine bugün biraz daha nazik davran. Sen bir makine değilsin, yorulabilirsin.',
  'Kafandaki kötü senaryolar gerçek olmak zorunda değil. Sadece stresin yüksek sesle konuşuyor.',
  'Bir soruyu yapamamak her şeyi mahvetmez. Devam etmek de bir başarı.',
  'Bunu açtıysan bil: Ben buradayım, sana inanıyorum ve seni çok seviyorum.'
];

const miniBreaks = [
  '2 dakika pencereye bak ve omuzlarını gevşet.',
  'Sevdiğin bir şarkının sadece nakaratını dinle.',
  'Telefonu bırakıp 10 kez derin nefes al.',
  'Kendine küçük bir ödül seç: kahve, çikolata ya da kısa yürüyüş.',
  'Bir kağıda sadece “şu an tek yapacağım şey…” diye yaz.'
];

const catMessages = [
  'Miyav! Sen bunu yaparsın.',
  'Kedi beslendi, moral +10 ♡',
  'Minik kedi diyor ki: biraz mola hakkındır.',
  'Miyav miyav: kendine yüklenme.',
  'Kedi gurur duyuyor, ben de duyuyorum.'
];

const emergencyBtn = document.getElementById('emergencyBtn');
const noteBox = document.getElementById('noteBox');
const miniBreakBtn = document.getElementById('miniBreakBtn');
const feedCatBtn = document.getElementById('feedCatBtn');
const cat = document.getElementById('cat');
const breathBtn = document.getElementById('breathBtn');
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');

function pickRandom(list){
  return list[Math.floor(Math.random() * list.length)];
}

emergencyBtn.addEventListener('click', () => {
  noteBox.textContent = pickRandom(notes);
});

miniBreakBtn.addEventListener('click', () => {
  noteBox.textContent = pickRandom(miniBreaks);
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

feedCatBtn.addEventListener('click', () => {
  cat.classList.remove('happy');
  void cat.offsetWidth;
  cat.classList.add('happy');
  noteBox.textContent = pickRandom(catMessages);
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

breathBtn.addEventListener('click', () => {
  const steps = [
    ['Nefes al', true],
    ['Tut', true],
    ['Yavaşça ver', false],
    ['Harikasın ♡', false]
  ];
  let i = 0;
  breathText.textContent = steps[i][0];
  breathCircle.classList.toggle('grow', steps[i][1]);
  const timer = setInterval(() => {
    i += 1;
    if (i >= steps.length) { clearInterval(timer); return; }
    breathText.textContent = steps[i][0];
    breathCircle.classList.toggle('grow', steps[i][1]);
  }, 4000);
});

document.querySelector('[data-note="playlist"]').addEventListener('click', () => {
  noteBox.textContent = 'Şu an tek görevin biraz yavaşlamak. Bir şarkı aç, gözlerini kapat ve çeneni gevşet.';
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});
