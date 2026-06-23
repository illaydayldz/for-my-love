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

const emergencyBtn = document.getElementById('emergencyBtn');
const noteBox = document.getElementById('noteBox');
const miniBreakBtn = document.getElementById('miniBreakBtn');
const feedMonkeyBtn = document.getElementById('feedMonkeyBtn');
const flipMonkeyBtn = document.getElementById('flipMonkeyBtn');
const monkey = document.getElementById('monkey');
const monkeyVideo = document.getElementById('monkeyVideo');
const breathBtn = document.getElementById('breathBtn');
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');

function pickRandom(list){ return list[Math.floor(Math.random() * list.length)]; }

// Sekmeler
document.querySelectorAll('.tab-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
    document.querySelectorAll('.tab-page').forEach((page) => page.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

emergencyBtn.addEventListener('click', () => { noteBox.textContent = pickRandom(notes); });
miniBreakBtn.addEventListener('click', () => {
  noteBox.textContent = pickRandom(miniBreaks);
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

document.querySelector('[data-note="playlist"]').addEventListener('click', () => {
  noteBox.textContent = 'Şu an tek görevin biraz yavaşlamak. Bir şarkı aç, gözlerini kapat ve çeneni gevşet.';
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
});

function playMonkeyVideo(src, message) {
  monkey.style.display = 'none';
  monkeyVideo.style.display = 'block';
  monkeyVideo.pause();
  monkeyVideo.src = src;
  monkeyVideo.currentTime = 0;
  monkeyVideo.play().catch(() => {});
  noteBox.textContent = message;
  window.scrollTo({ top: document.querySelector('.emergency').offsetTop, behavior: 'smooth' });
  monkeyVideo.onended = () => {
    monkeyVideo.style.display = 'none';
    monkeyVideo.removeAttribute('src');
    monkeyVideo.load();
    monkey.style.display = 'block';
    monkey.src = 'assets/monkey-idle.gif';
  };
}
feedMonkeyBtn.addEventListener('click', () => playMonkeyVideo('assets/monkey-feed.mp4', 'Pixel Monkey muz yedi: moral +10 ♡'));
flipMonkeyBtn.addEventListener('click', () => playMonkeyVideo('assets/monkey-flip-video.mp4', 'Pixel Monkey takla attı. Şimdi omuzlarını gevşet ♡'));

breathBtn.addEventListener('click', () => {
  const steps = [['Nefes al', true], ['Tut', true], ['Yavaşça ver', false], ['Harikasın ♡', false]];
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

// Kütüphane Pomodoro
const timerEl = document.getElementById('timer');
const startPomodoro = document.getElementById('startPomodoro');
const pausePomodoro = document.getElementById('pausePomodoro');
const resetPomodoro = document.getElementById('resetPomodoro');
const pomodoroText = document.getElementById('pomodoroText');
const modeLabel = document.getElementById('modeLabel');
const sessionCount = document.getElementById('sessionCount');
const libraryRoom = document.getElementById('libraryRoom');
const libraryStanding = document.getElementById('libraryStanding');
const libraryTransition = document.getElementById('libraryTransition');
const libraryStudy = document.getElementById('libraryStudy');

let pomodoroSeconds = 25 * 60;
let isBreak = false;
let pomodoroInterval = null;
let completedPomodoros = Number(localStorage.getItem('completedPomodoros') || 0);
sessionCount.textContent = `${completedPomodoros} pomodoro`;

function updateTimer(){
  const minutes = String(Math.floor(pomodoroSeconds / 60)).padStart(2, '0');
  const seconds = String(pomodoroSeconds % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function showLibrary(mode){
  [libraryStanding, libraryTransition, libraryStudy].forEach(el => el.classList.remove('active'));
  libraryRoom.classList.remove('studying');
  if(mode === 'standing') libraryStanding.classList.add('active');
  if(mode === 'transition') libraryTransition.classList.add('active');
  if(mode === 'study') { libraryStudy.classList.add('active'); libraryRoom.classList.add('studying'); }
}

function startStudyVisual(){
  showLibrary('transition');
  libraryTransition.currentTime = 0;
  libraryTransition.play().catch(() => {
    showLibrary('study');
  });
  const finish = () => showLibrary('study');
  libraryTransition.onended = finish;
  setTimeout(finish, 2200);
}

function switchMode(){
  isBreak = !isBreak;
  if(isBreak){
    completedPomodoros += 1;
    localStorage.setItem('completedPomodoros', completedPomodoros);
    sessionCount.textContent = `${completedPomodoros} pomodoro`;
  }
  pomodoroSeconds = isBreak ? 5 * 60 : 25 * 60;
  libraryRoom.classList.toggle('break-mode', isBreak);
  modeLabel.textContent = isBreak ? 'Mola zamanı' : 'Ders zamanı';
  pomodoroText.textContent = isBreak ? '5 dakika mola. Bir seans daha bitti balım ♡' : '25 dakika ders. Beraber masadayız, devam.';
  if(isBreak) showLibrary('standing'); else startStudyVisual();
  updateTimer();
}

startPomodoro.addEventListener('click', () => {
  if (pomodoroInterval) return;
  if(!isBreak) startStudyVisual();
  modeLabel.textContent = isBreak ? 'Mola zamanı' : 'Ders zamanı';
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
  modeLabel.textContent = 'Hazırız';
  pomodoroText.textContent = '25 dakika ders, sonra 5 dakika mola.';
  showLibrary('standing');
  updateTimer();
});

updateTimer();
showLibrary('standing');
