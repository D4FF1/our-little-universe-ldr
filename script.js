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
    star.addEventListener("click", () => {
      const message = skyMessages[index % skyMessages.length];
      skyMessage.innerHTML = `<span class="message-symbol">✧</span><p></p>`;
      skyMessage.querySelector("p").textContent = message;
    });
    starField.appendChild(star);
  });
}

function pickReminder() {
  let index = Math.floor(Math.random() * reminders.length);
  if (reminders.length > 1 && index === lastReminderIndex) {
    index = (index + 1) % reminders.length;
  }
  lastReminderIndex = index;
  reminderText.textContent = reminders[index];
  copyStatus.textContent = "Simpan pesan yang kamu suka.";
}

async function copyCurrentReminder() {
  const text = reminderText.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Pesan berhasil disalin. ♡";
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
  }
}

function heartBurst() {
  const symbols = ["♡", "♥", "✦", "✧"];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-float";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${45 + Math.random() * 35}%`;
    heart.style.animationDelay = `${Math.random() * 0.45}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2400);
  }
  showToast("Kejutan kecil, khusus buat Sayang. ♡");
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
  if (isHidden) message.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

createStars();
