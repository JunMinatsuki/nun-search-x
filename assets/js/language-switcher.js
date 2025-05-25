window.onload = function setLanguage() {
  const browserLanguage = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
  if (browserLanguage === "ja") {
    document.getElementById('language').value = "ja";
    changeLanguage("ja");
  } else if (browserLanguage === "zh-CN" | browserLanguage === "zh") {
    document.getElementById('language').value = "zh-CN";
    changeLanguage("zh-CN");
  } else if (browserLanguage === "zh-TW") {
    document.getElementById('language').value = "zh-TW";
    changeLanguage("zh-TW");
  } else if (browserLanguage === "zh-HK") {
    document.getElementById('language').value = "zh-HK";
    changeLanguage("zh-HK");
  } else if (browserLanguage === "ko") {
    document.getElementById('language').value = "ko";
    changeLanguage("ko");
  } else if (browserLanguage === "id") {
    document.getElementById('language').value = "id";
    changeLanguage("id");
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