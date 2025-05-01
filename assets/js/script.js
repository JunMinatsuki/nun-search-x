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
	else if (browserLanguage === "zh-CN" | browserLanguage === "zh") {
		document.getElementById('language').value = "zh-CN";
		changeLanguage("zh-CN");
	}
	else if (browserLanguage === "zh-TW") {
		document.getElementById('language').value = "zh-TW";
		changeLanguage("zh-TW");
	}
	else if (browserLanguage === "zh-HK") {
		document.getElementById('language').value = "zh-HK";
		changeLanguage("zh-HK");
	}
	else if (browserLanguage === "ko") {
		document.getElementById('language').value = "ko";
		changeLanguage("ko");
	}
	else if (browserLanguage === "id") {
		document.getElementById('language').value = "id";
		changeLanguage("id");
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

window.addEventListener ( 'load', function confirmBlockRefresh() {
  refreshConfirmAreaOption();
  refreshConfirmAreaSince();
  refreshConfirmAreaUntil();
  refreshConfirmAreaAndOr();
  refreshConfirmAreaKeyword();
})

window.addEventListener('load', function setTimezones() {
  /** @type {string[]} - タイムゾーン指定として使える文字列一覧 JSTなど */
  var timeZones = [
    { "value": "JST", "desc": "JST (Japan Standard Time)" },
    { "value": "UTC", "desc": "UTC (Coordinated Universal Time)" },
  ];
  /** @type {HTMLOptionElement[]} - タイムゾーン指定の選択肢 */
  var sinceTimeZoneOptions = timeZones.map(function (timeZone) {
    var option = document.createElement('option');
    option.value = timeZone.value;
    option.textContent = timeZone.desc;
    return option;
  });
  /** @type {HTMLOptionElement[]} - タイムゾーン指定の選択肢 2 */
  var untilTimeZoneOptions = timeZones.map(function (timeZone) {
    var option = document.createElement('option');
    option.value = timeZone.value;
    option.textContent = timeZone.desc;
    return option;
  });
  // それぞれをselect要素に追加
  this.document.getElementById('sinceTimeZoneSelector').append(...sinceTimeZoneOptions);
  this.document.getElementById('untilTimeZoneSelector').append(...untilTimeZoneOptions);
  // デフォルトとしてJSTを選択
  this.document.getElementById('sinceTimeZoneSelector').value = "JST";
  this.document.getElementById('untilTimeZoneSelector').value = "JST";
})

function refreshConfirmAreaOption() {
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOption').innerText;
  }
  else {
	document.getElementById('confirmValueOption').innerHTML = "";
  }
}

function refreshConfirmAreaSince() {
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    document.getElementById('confirmValueSince').innerHTML = document.getElementById('textboxSinceDate').value+" "+document.getElementById('textboxSinceTime').value + " " + getSinceTimeZone();
  }
  else {
	document.getElementById('confirmValueSince').innerHTML = "";
  }
}

function refreshConfirmAreaUntil() {
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    document.getElementById('confirmValueUntil').innerHTML = document.getElementById('textboxUntilDate').value+" "+document.getElementById('textboxUntilTime').value + " " + getUntilTimeZone();
  }
  else {
	document.getElementById('confirmValueUntil').innerHTML = "";
  }
}

function refreshConfirmAreaKeyword() {
  document.getElementById('confirmValueKeyword').innerHTML = document.getElementById('textboxKeyword').value;
}

document.getElementById('textboxKeyword').addEventListener ('input', function syncConfirmKeyword() {
  refreshConfirmAreaKeyword();
})

function refreshConfirmAreaAndOr() {
  if (document.getElementById('radioSearchOptionAnd').checked === true){
    document.getElementById('confirmValueAndOr').innerHTML = "AND";
  }
  else if (document.getElementById('radioSearchOptionOr').checked === true){
    document.getElementById('confirmValueAndOr').innerHTML = "OR";
  }
}

function clickSinceYesterdayButton() {
  var yesterday = getYesterdayDate();
  document.getElementById('textboxSinceDate').value = yesterday;
}

function clickResetKeywordButton() {
  document.getElementById('textboxKeyword').value="";
  refreshConfirmAreaKeyword();
}

function onClickTagButton(event) {
  var hashTag = event.target.value;
  var keyword = document.getElementById('textboxKeyword').value;
  if (keyword !== "") {
    keyword += " ";
  }
  document.getElementById('textboxKeyword').value = keyword + hashTag;
  refreshConfirmAreaKeyword();
}

function getUntilTimeZone() {
  return document.getElementById('untilTimeZoneSelector').value;
}

function getSinceTimeZone() {
  return document.getElementById('sinceTimeZoneSelector').value;
}

function openPage() {
  var keyword = document.getElementById('textboxKeyword').value;
  var searchQuery = null;
  if (document.getElementById('radioSearchOptionOr').checked === true) {
	  searchQuery = keyword.replace(" ", " OR ");
  }
  else {
	  searchQuery = keyword;
  }
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    searchQuery += " from:tokino_sora";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += " since:" + document.getElementById('textboxSinceDate').value + "_"+document.getElementById('textboxSinceTime').value + "_" + getSinceTimeZone();
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += " until:" + document.getElementById('textboxUntilDate').value + "_"+document.getElementById('textboxUntilTime').value + "_" + getUntilTimeZone();
  }
  var openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=top";
  window.open(openUrl, '_blank');
}

function openBarehenWatch() {
  var searchQuery = "そらちゃん バレへん";
  var openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=live";
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
	refreshConfirmAreaOption();
}
