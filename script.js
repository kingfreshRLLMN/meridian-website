const CONFIG = {
  playersOnline: 64,
  maxPlayers: 128,
  connectAddress: "play.meridianrp.nl",
  discordUrl: "https://discord.gg/hyqU2SUsCS"
};

document.querySelectorAll("[data-players]").forEach((el) => el.textContent = CONFIG.playersOnline);
document.querySelectorAll("[data-max-players]").forEach((el) => el.textContent = CONFIG.maxPlayers);
document.querySelectorAll("[data-address]").forEach((el) => el.textContent = CONFIG.connectAddress);
document.querySelectorAll(".discord-link").forEach((el) => el.href = CONFIG.discordUrl);
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const toast = document.querySelector(".toast");
let toastTimer;

async function copyConnectAddress() {
  const command = `connect ${CONFIG.connectAddress}`;
  try {
    await navigator.clipboard.writeText(command);
  } catch {
    const input = document.createElement("textarea");
    input.value = command;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  document.querySelectorAll(".connect-button").forEach((button) => {
    button.dataset.label ||= button.innerHTML;
    button.textContent = "Gekopieerd!";
  });
  if (toast) toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (toast) toast.classList.remove("show");
    document.querySelectorAll(".connect-button").forEach((button) => {
      button.innerHTML = button.dataset.label;
    });
  }, 2200);
}

document.querySelectorAll(".connect-button").forEach((button) => {
  button.addEventListener("click", copyConnectAddress);
});

const menuButton = document.querySelector(".menu-toggle");
if (menuButton) {
  menuButton.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
  });
}

document.querySelectorAll(".nav__links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));
