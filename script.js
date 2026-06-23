
const introScreen = document.getElementById('introScreen');
const openSiteBtn = document.getElementById('openSiteBtn');

openSiteBtn.addEventListener('click', () => {
  const introCard = document.querySelector('.intro-card');
  introCard.classList.add('zooming');
  introScreen.classList.add('entering');
  setTimeout(() => {
    introScreen.classList.add('hidden');
    document.body.classList.add('site-opened');
  }, 850);
});

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

const monkeyMessages = [
  'Pixel Monkey muz yedi: moral +10 ♡',
  'Maymun diyor ki: biraz gülümse, sonra devam.',
  'Muz enerjisi geldi. Şimdi küçük bir adım daha.',
  'Pixel Monkey yanında: panik yok, yavaş yavaş.',
  'Takla modu açıldı: stres -10, tatlılık +100.'
];

const emergencyBtn = document.getElementById('emergencyBtn');
const noteBox = document.getElementById('noteBox');
const miniBreakBtn = document.getElementById('miniBreakBtn');
const feedMonkeyBtn = document.getElementById('feedMonkeyBtn');
const flipMonkeyBtn = document.getElementById('flipMonkeyBtn');
const monkey = document.getElementById('monkey');
const monkeyStage = document.querySelector('.monkey-stage');
const breathBtn = document.getElementById('breathBtn');
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');

function pickRandom(list){
  return list[Math.floor(Math.random() * list.length)];
}

document.querySelectorAll('.tab-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
    document.querySelectorAll('.tab-page').forEach((page) => page.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

emergencyBtn.addEventListener('click', () => {
  noteBox.textContent = pickRandom(notes);
});

miniBreakBtn.addEventListener('click', () => {
  noteBox.textContent = pickRandom(miniBreaks);
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

feedMonkeyBtn.addEventListener('click', () => {
  monkey.classList.remove('happy', 'flip');
  monkeyStage.classList.remove('banana');
  void monkey.offsetWidth;
  monkey.classList.add('happy');
  monkeyStage.classList.add('banana');
  noteBox.textContent = pickRandom(monkeyMessages);
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

flipMonkeyBtn.addEventListener('click', () => {
  monkey.classList.remove('happy', 'flip');
  void monkey.offsetWidth;
  monkey.classList.add('flip');
  noteBox.textContent = 'Pixel Monkey takla attı. Şimdi sen de omuzlarını gevşet ♡';
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

const timerEl = document.getElementById('timer');
const startPomodoro = document.getElementById('startPomodoro');
const pausePomodoro = document.getElementById('pausePomodoro');
const resetPomodoro = document.getElementById('resetPomodoro');
const pomodoroText = document.getElementById('pomodoroText');
const modeLabel = document.getElementById('modeLabel');
const libraryRoom = document.querySelector('.library-room');

let pomodoroSeconds = 25 * 60;
let isBreak = false;
let pomodoroInterval = null;

function updateTimer(){
  const minutes = String(Math.floor(pomodoroSeconds / 60)).padStart(2, '0');
  const seconds = String(pomodoroSeconds % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function switchMode(){
  isBreak = !isBreak;
  pomodoroSeconds = isBreak ? 5 * 60 : 25 * 60;
  libraryRoom.classList.toggle('break-mode', isBreak);
  modeLabel.textContent = isBreak ? 'Mola zamanı' : 'Ders zamanı';
  pomodoroText.textContent = isBreak
    ? '5 dakika mola. Pixel karakterler de biraz dinleniyor ♡'
    : '25 dakika ders. Beraber masadayız, devam.';
  updateTimer();
}

startPomodoro.addEventListener('click', () => {
  if (pomodoroInterval) return;
  pomodoroText.textContent = isBreak ? 'Mola başladı ♡' : 'Ders başladı. Sadece bu 25 dakikaya odaklan.';
  pomodoroInterval = setInterval(() => {
    pomodoroSeconds -= 1;
    updateTimer();
    if (pomodoroSeconds <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      switchMode();
    }
  }, 1000);
});

pausePomodoro.addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroText.textContent = 'Durakladı. İstersen tekrar başlatabilirsin.';
});

resetPomodoro.addEventListener('click', () => {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  isBreak = false;
  pomodoroSeconds = 25 * 60;
  libraryRoom.classList.remove('break-mode');
  modeLabel.textContent = 'Ders zamanı';
  pomodoroText.textContent = '25 dakika ders, sonra 5 dakika mola.';
  updateTimer();
});

updateTimer();
