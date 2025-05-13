const closeSym = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
const closeSymDesktop = `Esc ${closeSym}`;

const appLoad = () => {
  const mainArea = document.querySelector(".prod-app__section");
  const prodAppArea = document.querySelectorAll(".prod-app__area");
  const prodApp = document.querySelectorAll(".prod-app");
  const prodAppClose = document.querySelectorAll(".app__nav button.close-btn");
  let isTouch = window.innerWidth <= 768;
  window.addEventListener("resize", () => {
    isTouch = window.innerWidth <= 768;
    prodAppClose.forEach((close) => {
      isTouch
        ? (close.innerHTML = closeSym)
        : (close.innerHTML = closeSymDesktop);
    });
  });

  prodApp.forEach((app) => {
    app.addEventListener("click", (e) => {
      const index = e.target.id.replace(/\D/g, "") - 1;
      prodAppArea[index].style.display = "block";
      mainArea.style.display = "none";
    });
  });

  prodAppClose.forEach((close) => {
    isTouch
      ? (close.innerHTML = closeSym)
      : (close.innerHTML = closeSymDesktop);
    close.addEventListener("click", () => {
      const index = close.id.replace(/\D/g, "") - 1;
      prodAppArea[index].style.display = "none";
      mainArea.style.display = "block";
    });
  });

  document.addEventListener("keydown", (e) => {
    prodAppArea.forEach((currentApp) => {
      if (e.key === "Escape") {
        currentApp.style.display = "none";
        mainArea.style.display = "block";
      }
    });
  });
};

export default appLoad;
