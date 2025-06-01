window.onload = function setLanguage() {
  const browserLanguage = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
  if (browserLanguage === "ja") {
    document.getElementById('language').value = "ja";
    changeLanguage("ja");
  } else {
    document.getElementById('language').value = "en";
    changeLanguage("en");
  }
}

const langs = document.getElementById('language');
langs.addEventListener('change', (e) => {
  changeLanguage(e.target.value);
});

const changeLanguage = function (lang) {
  let elements = document.querySelectorAll('[data-language-key]');
  elements.forEach(function (element) {
    let key = element.getAttribute('data-language-key');
    let text = languageData[lang][key];
    if (text === undefined) {
      text = "Err:テキストああ迷子";
    }
    element.textContent = text;
    if (element.id === "textboxKeyword") {
      element.placeholder = text;
    }
    if (element.type === "button") {
      element.value = text;
    }
  });
  refreshConfirmAreaOption();
}