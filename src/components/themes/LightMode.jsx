import "./modes.css";

export const LightMode = () => {
  const LightTheme = "light-theme";
  const body = document.body;

  const switchMode = () => {
    const currentTheme = body.classList[0];

    // removing previous class - if there is one - with the previous color settings
    if (currentTheme) {
      body.classList.remove(currentTheme);
    }

    // adding the class to the body
    body.classList.add(LightTheme);
  };

  return <button className="light-button" onClick={switchMode}></button>;
};
