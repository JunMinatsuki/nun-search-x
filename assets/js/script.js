/** @type {() => string} - 今日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getTodayDate() {
  return new Date().toLocaleDateString('sv-SE', {timeZone: 'Asia/Tokyo'});
}
/** @type {() => string} - 昨日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getYesterdayDate() {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('sv-SE', {timeZone: 'Asia/Tokyo'});
}

window.onload = function setLanguage() {
	var browserLanguage = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
	console.log("言語コード: "+browserLanguage);
	if (browserLanguage === "ja") {
		document.getElementById('language').value = "ja";
		changeLanguage("ja");
	}
	else if (browserLanguage === "zh-TW") {
		document.getElementById('language').value = "zh-TW";
		changeLanguage("zh-TW");
	}
	else if (browserLanguage === "ko") {
		document.getElementById('language').value = "ko";
		changeLanguage("ko");
	}
	else {
		document.getElementById('language').value = "en";
		changeLanguage("en");
	}
}

window.addEventListener ( 'load', function updateUntilDate() {
  var today = getTodayDate();
  document.getElementById('textboxUntilDate').value = today;
})

function clickSinceYesterdayButton() {
  var yesterday = getYesterdayDate();
  document.getElementById('textboxSinceDate').value = yesterday;
}

function clickResetKeywordButton() {
  document.getElementById('textboxKeyword').value="";
}

function onClickTagButton(event) {
  var hashTag = event.target.value;
  var keyword = document.getElementById('textboxKeyword').value;
  if (keyword !== "") {
    keyword += " ";
  }
  document.getElementById('textboxKeyword').value = keyword + hashTag;
}

function openPage() {
  var keyword = document.getElementById('textboxKeyword').value;
  var searchQuery = keyword;
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    searchQuery += " from:tokino_sora";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += " since:" + document.getElementById('textboxSinceDate').value + "_00:00:00_JST";
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += " until:" + document.getElementById('textboxUntilDate').value + "_23:59:59_JST";
  }
  var openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=top";
  window.open(openUrl, '_blank');
}

const langs =  document.getElementById('language');
langs.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

const changeLanguage = function(lang) {
    let elements = document.querySelectorAll('[data-language-key]');
    elements.forEach(function (element) {
        let key = element.getAttribute('data-language-key');
        let text = languageData[lang][key];
        element.textContent = text;
		if (element.id === "textboxKeyword" ) {
			element.placeholder = text;
		}
		if (element.type === "button" ) {
			element.value = text;
		}
    });
}