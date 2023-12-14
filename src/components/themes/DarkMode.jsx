import "./modes.css";

export const DarkMode = () => {
  const DarkTheme = "dark-theme";
  const body = document.body;

  const switchMode = () => {
    const currentTheme = body.classList[0];

    // removing previous class - if there is one - with the previous color settings
    if (currentTheme) {
      body.classList.remove(currentTheme);
    }

    // adding the class to the body
    body.classList.add(DarkTheme);
  };

  return <button className="dark-button" onClick={switchMode}></button>;
};
