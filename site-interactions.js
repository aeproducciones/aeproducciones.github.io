(() => {
  const closeMobileMenu = (event) => {
    const link = event.target.closest?.(".mobile-menu a");
    const menu = link?.closest("details.mobile-menu");
    if (menu) menu.open = false;
  };
  document.addEventListener("click", closeMobileMenu);
})();
