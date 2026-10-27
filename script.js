/*
  OUR LITTLE UNIVERSE — personal settings
  Edit the messages below to make the website sound more like you.
  No real memories, meeting dates, or shared photos are assumed.
*/

const skyMessages = [
  "Kalau hari ini melelahkan, semoga kamu bisa menemukan sedikit ketenangan malam ini. ♡",
  "Jarak kita belum dekat, tapi aku tetap senang bisa mendengar cerita kamu.",
  "Semoga kamu selalu punya ruang untuk jadi diri sendiri, tanpa harus pura-pura kuat.",
  "Ada banyak hal yang belum bisa kita lakukan bersama. Nggak apa-apa, kita jalani pelan-pelan.",
  "Terima kasih sudah meluangkan waktu untuk ngobrol dan berbagi cerita denganku.",
  "Semoga komunikasi kita selalu punya ruang untuk jujur, mendengar, dan saling memahami.",
  "Kalau kita sedang sibuk di tempat masing-masing, jangan lupa istirahat dan jaga diri, ya.",
  "Satu pesan kecil dari sini: semoga hari kamu menemukan alasan untuk terasa sedikit lebih ringan."
];

const reminders = [
  "Kamu boleh istirahat. Kamu nggak harus menyelesaikan semuanya dalam satu hari.",
  "Perasaan kamu penting. Kamu boleh cerita, boleh diam sebentar, dan boleh minta waktu.",
  "Jangan lupa makan dan minum air, ya. Hal kecil juga bagian dari menjaga diri.",
  "Kamu nggak harus selalu produktif supaya pantas merasa bangga pada diri sendiri.",
  "Semoga kamu tetap punya waktu untuk hal-hal yang kamu suka dan orang-orang yang kamu sayangi.",
  "Kalau hari ini belum berjalan sesuai harapan, kamu masih boleh mulai lagi besok.",
  "Aku harap kita bisa saling mendukung tanpa lupa memberi ruang untuk tumbuh masing-masing.",
  "Tarik napas pelan. Satu hal dalam satu waktu juga sudah cukup."
];

const starField = document.getElementById("starField");
const skyMessage = document.getElementById("skyMessage");
const reminderText = document.getElementById("reminderText");
const copyStatus = document.getElementById("copyStatus");
const toast = document.getElementById("toast");
let lastReminderIndex = 0;
let toastTimeout;
let reminderTimeout;
let surpriseCooldown = false;
let lastPointerSparkle = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function createStars() {
  if (!starField) return;
  const positions = [
    [8, 14], [19, 39], [31, 17], [43, 48], [56, 12], [68, 32],
    [80, 14], [91, 43], [12, 63], [27, 74], [39, 30], [52, 68],
    [64, 53], [76, 72], [88, 22], [95, 65], [5, 42], [35, 59]
  ];

  positions.forEach(([x, y], index) => {
    const star = document.createElement("button");
    star.type = "button";
    star.className = "sky-star";
    star.textContent = index % 4 === 0 ? "✦" : (index % 3 === 0 ? "✧" : "·");
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty("--size", `${index % 4 === 0 ? 23 : 16 + (index % 3) * 3}px`);
    star.style.setProperty("--duration", `${2.2 + (index % 5) * 0.45}s`);
    star.setAttribute("aria-label", `Buka pesan bintang ${index + 1}`);
    star.setAttribute("aria-pressed", "false");
    star.addEventListener("click", () => {
      starField.querySelectorAll(".sky-star").forEach(item => {
        item.classList.remove("is-picked");
        item.setAttribute("aria-pressed", "false");
      });
      star.classList.add("is-picked");
      star.setAttribute("aria-pressed", "true");
      window.setTimeout(() => star.classList.remove("is-picked"), 850);
      sparkleAt(star.getBoundingClientRect(), 5);
      skyMessage.classList.add("is-changing");
      window.clearTimeout(skyMessageTimeout);
      skyMessageTimeout = window.setTimeout(() => {
        const message = skyMessages[index % skyMessages.length];
        skyMessage.innerHTML = `<span class="message-symbol">✧</span><p></p>`;
        skyMessage.querySelector("p").textContent = message;
        skyMessage.classList.remove("is-changing");
      }, reduceMotion.matches ? 0 : 160);
    });
    starField.appendChild(star);
  });
}

let skyMessageTimeout;

function sparkleAt(rect, count = 4, symbols = ["✦", "✧", "·"]) {
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "tiny-sparkle";
    sparkle.textContent = symbols[i % symbols.length];
    sparkle.style.left = `${originX}px`;
    sparkle.style.top = `${originY}px`;
    sparkle.style.setProperty("--dx", `${(Math.random() - 0.5) * 64}px`);
    sparkle.style.setProperty("--dy", `${(Math.random() - 0.5) * 64}px`);
    document.body.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 750);
  }
}

function pickReminder() {
  let index = Math.floor(Math.random() * reminders.length);
  if (reminders.length > 1 && index === lastReminderIndex) {
    index = (index + 1) % reminders.length;
  }
  lastReminderIndex = index;
  reminderText.classList.add("is-changing");
  window.clearTimeout(reminderTimeout);
  reminderTimeout = window.setTimeout(() => {
    reminderText.textContent = reminders[index];
    reminderText.classList.remove("is-changing");
  }, reduceMotion.matches ? 0 : 180);
  copyStatus.textContent = "Simpan pesan yang kamu suka.";
}

async function copyCurrentReminder() {
  const text = reminderText.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Pesan berhasil disalin. ♡";
    copyStatus.classList.remove("copy-pop");
    void copyStatus.offsetWidth;
    copyStatus.classList.add("copy-pop");
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    copyStatus.textContent = copied ? "Pesan berhasil disalin. ♡" : "Kamu bisa menyalin pesan ini secara manual.";
    if (copied) {
      copyStatus.classList.remove("copy-pop");
      void copyStatus.offsetWidth;
      copyStatus.classList.add("copy-pop");
    }
  }
}

function heartBurst() {
  if (surpriseCooldown) return;
  surpriseCooldown = true;
  const button = document.getElementById("surpriseButton");
  const rect = button.getBoundingClientRect();
  button.disabled = true;
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
    heart.style.setProperty("--dy", `${-70 - Math.random() * 120}px`);
    heart.style.animationDelay = `${Math.random() * 0.18}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1900);
  }
  const mascot = document.createElement("span");
  mascot.className = "surprise-mascot";
  mascot.setAttribute("aria-hidden", "true");
  mascot.textContent = "♥";
  mascot.style.left = `${rect.left + rect.width / 2}px`;
  mascot.style.top = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(mascot);
  window.setTimeout(() => mascot.remove(), 1100);
  showToast("Kejutan kecil, khusus buat Sayang. ♡");
  window.setTimeout(() => {
    surpriseCooldown = false;
    button.disabled = false;
  }, 1500);
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
});
nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Buka navigasi");
  });
});

document.getElementById("newReminder")?.addEventListener("click", pickReminder);
document.getElementById("copyReminder")?.addEventListener("click", copyCurrentReminder);
document.getElementById("surpriseButton")?.addEventListener("click", heartBurst);
document.getElementById("finalButton")?.addEventListener("click", () => {
  const message = document.getElementById("finalMessage");
  const isHidden = message.hidden;
  message.hidden = !isHidden;
  document.getElementById("finalButton").textContent = isHidden ? "Tutup pesan ♡" : "Buka pesan terakhir ♡";
  if (isHidden) {
    message.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest" });
    sparkleAt(document.getElementById("finalButton").getBoundingClientRect(), 4, ["♡", "♡", "✧"]);
  }
});

const revealTargets = document.querySelectorAll(
  ".intro-strip, .section-heading, .letter-card, .sky-card, .reminder-visual, .reminder-content, .closing-card"
);
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach(element => element.classList.add("is-visible"));
}

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion.matches) {
  document.addEventListener("pointermove", event => {
    const now = performance.now();
    if (now - lastPointerSparkle < 75) return;
    lastPointerSparkle = now;
    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";
    sparkle.textContent = Math.random() > 0.5 ? "✦" : "·";
    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;
    document.body.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 650);
  }, { passive: true });
}

createStars();
