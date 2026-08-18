(() => {
  const closeMobileMenu = (event) => {
    const link = event.target.closest?.(".mobile-menu a");
    const menu = link?.closest("details.mobile-menu");
    if (menu) menu.open = false;
  };

  const placeRoyalMusicLogo = () => {
    const hero = document.querySelector("main .home-hero");
    const logo = document.querySelector(
      '.royal-intro > img[src="/brand/royal-music-light.png"]',
    );
    if (!hero || !logo) return;

    let wrapper = document.querySelector(".royal-after-hero");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "royal-after-hero";
      wrapper.setAttribute("aria-label", "Royal Music, división de música en vivo");
      hero.insertAdjacentElement("afterend", wrapper);
    }
    wrapper.append(logo);
  };

  let placementTimer;
  const syncPage = () => {
    window.clearTimeout(placementTimer);
    placementTimer = window.setTimeout(
      () => window.requestAnimationFrame(placeRoyalMusicLogo),
      250,
    );
  };

  document.addEventListener("click", (event) => {
    closeMobileMenu(event);
    window.setTimeout(syncPage, 0);
  });
  window.addEventListener("load", syncPage);
  window.addEventListener("pageshow", syncPage);
  window.addEventListener("popstate", syncPage);
})();
