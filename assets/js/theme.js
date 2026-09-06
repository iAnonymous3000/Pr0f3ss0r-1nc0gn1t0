function loadPreferredTheme() {
    const prefersDarkTheme = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkTheme = document.body.classList.contains("dark");

    if (prefersDarkTheme && !isDarkTheme) {
        document.body.classList.add("dark");
    }
}

loadPreferredTheme();
