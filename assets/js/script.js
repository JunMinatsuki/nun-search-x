/** @type {() => string} - 今日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getTodayDate() {
  return new Date().toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Tokyo'
  });
}
/** @type {() => string} - 昨日の日付を"YYYY-MM-DD"形式の文字列で取得 */
function getYesterdayDate() {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('sv-SE', {
    timeZone: 'Asia/Tokyo'
  });
}

window.addEventListener('load', function updateUntilDate() {
  const today = getTodayDate();
  document.getElementById('textboxUntilDate').value = today;
})

window.addEventListener('load', function confirmBlockRefresh() {
  refreshConfirmAreaOption();
  refreshConfirmAreaSince();
  refreshConfirmAreaUntil();
  refreshConfirmAreaAndOr();
  refreshConfirmAreaKeyword();
})

function refreshConfirmAreaOption() {
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOption').innerText;
    if (document.getElementById('radioFilterOptionMedia').checked === true) {
        document.getElementById('confirmValueOption').innerHTML += "<br>" + document.getElementById('textOptionMedia').innerText;
    }
		else if (document.getElementById('radioFilterOptionSpace').checked === true) {
        document.getElementById('confirmValueOption').innerHTML += "<br>" + document.getElementById('textOptionSpace').innerText;
    }
  }
  else if (document.getElementById('radioFilterOptionMedia').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionMedia').innerText;
  }
	else if (document.getElementById('radioFilterOptionSpace').checked === true) {
        document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionSpace').innerText;
  }
	else {
    document.getElementById('confirmValueOption').innerHTML = "";
  }
}

function refreshConfirmAreaSince() {
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    document.getElementById('confirmValueSince').innerHTML = document.getElementById('textboxSinceDate').value + " " + document.getElementById('textboxSinceTime').value + " JST";
  } else {
    document.getElementById('confirmValueSince').innerHTML = "";
  }
}

function refreshConfirmAreaUntil() {
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    document.getElementById('confirmValueUntil').innerHTML = document.getElementById('textboxUntilDate').value + " " + document.getElementById('textboxUntilTime').value + " JST";
  } else {
    document.getElementById('confirmValueUntil').innerHTML = "";
  }
}

function refreshConfirmAreaKeyword() {
  document.getElementById('confirmValueKeyword').innerHTML = document.getElementById('textboxKeyword').value;
}

document.getElementById('textboxKeyword').addEventListener('input', function syncConfirmKeyword() {
  refreshConfirmAreaKeyword();
})

function refreshConfirmAreaAndOr() {
  if (document.getElementById('radioSearchOptionAnd').checked === true) {
    document.getElementById('confirmValueAndOr').innerHTML = "AND";
  } else if (document.getElementById('radioSearchOptionOr').checked === true) {
    document.getElementById('confirmValueAndOr').innerHTML = "OR";
  }
}

function clickSinceYesterdayButton() {
  const yesterday = getYesterdayDate();
  document.getElementById('textboxSinceDate').value = yesterday;
  document.getElementById('checkboxSinceEnabled').checked = true;
}

function clickResetKeywordButton() {
  document.getElementById('textboxKeyword').value = "";
  refreshConfirmAreaKeyword();
}

function onClickTagButton(event) {
  let hashTag = event.target.value;
  let keyword = document.getElementById('textboxKeyword').value;
  let tags = new Set(keyword.split(" ").filter(tag => tag !== ""));
  hashTag.split(" ").forEach(tag => {
    tags.add(tag);
  });
  // "既にある場合は削除"にしたい場合は、上の行を「tags[tags.has(hashTag) ? "delete" : "add"](hashTag);」に変更する
  document.getElementById('textboxKeyword').value = Array.from(tags).join(" ");
  refreshConfirmAreaKeyword();
}

function openPage() {
  let keyword = document.getElementById('textboxKeyword').value;
  let searchQuery = null;
  if (document.getElementById('radioSearchOptionOr').checked === true) {
    searchQuery = keyword.replaceAll(" ", " OR ");
  } else {
    searchQuery = keyword;
  }
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    searchQuery += " from:tokino_sora";
  }
  if (document.getElementById('radioFilterOptionMedia').checked === true) {
    searchQuery += " filter:media";
  }
	 if (document.getElementById('radioFilterOptionSpace').checked === true) {
    searchQuery += " filter:spaces";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += " since:" + document.getElementById('textboxSinceDate').value + "_" + document.getElementById('textboxSinceTime').value + "_JST";
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += " until:" + document.getElementById('textboxUntilDate').value + "_" + document.getElementById('textboxUntilTime').value + "_JST";
  }
  const openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=live";
  window.open(openUrl, '_blank');
}
function openYrtPage() {
  let keyword = document.getElementById('textboxKeyword').value;
  let searchQuery = null;
  keyword = keyword.replaceAll("#", "%23");
  if (document.getElementById('radioSearchOptionOr').checked === true) {
    searchQuery = "(" + keyword + ")";
  } else {
    searchQuery = keyword.replaceAll(" ", "+");
  }
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    searchQuery += "+id%3Atokino_sora";
  }
  if (document.getElementById('radioFilterOptionMedia').checked === true) {
    searchQuery += "&mtype=image";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += "&since=" + Date.parse(document.getElementById('textboxSinceDate').value + "T" + document.getElementById('textboxSinceTime').value)/1000;
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += "&until=" + Date.parse(document.getElementById('textboxUntilDate').value + "T" + document.getElementById('textboxUntilTime').value)/1000;
  }
  const openUrl = "https://search.yahoo.co.jp/realtime/search?ei=UTF-8&p=" + searchQuery;
  window.open(openUrl, '_blank');
}
function postSelectKeywords() {
  const keyword = document.getElementById('textboxKeyword').value;
  const openUrl = "https://x.com/intent/post?text=" + encodeURIComponent(keyword);
  window.open(openUrl, '_blank');
}
function openBarehenWatch() {
  let searchQuery = "そらちゃん バレへん";
  let openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=live";
  window.open(openUrl, '_blank');
}
function runningDate() {
  const now = new Date();
  const bigBangDate = new Date(2017, 8, 7, 11, 8, 54);
  const bigBangCountDate = new Date(2017, 8, 7);

  const time = now.getTime() - bigBangDate.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const dateCount = Math.floor((now.getTime() - bigBangCountDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('runningDate').textContent = date;
  document.getElementById('runningHour').textContent = String(hour).padStart(2, '0');
  document.getElementById('runningMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('runningSecond').textContent = String(second).padStart(2, '0');
  
  document.getElementById('rAnivRunningDate').textContent = date;
  document.getElementById('rAnivRunningHour').textContent = String(hour).padStart(2, '0');
  document.getElementById('rAnivRunningMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('rAnivRunningSecond').textContent = String(second).padStart(2, '0');
  document.getElementById('rAnivRunningDateCount').textContent = String(dateCount).padStart(4, '0');
}

function remainBirthDay() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 4, 15);
  if (now.getMonth() > 4 || now.getMonth() == 4 && now.getDate() >= 15) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rBirthDate').textContent = date;
  document.getElementById('rBirthHour').textContent = String(hour).padStart(2, '0');
  document.getElementById('rBirthMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('rBirthSecond').textContent = String(second).padStart(2, '0');
}

function remainAnivDay() {
  const now = new Date();
  const anivDay = new Date(now.getFullYear(), 8, 7);
  if (now.getMonth() == 8 && now.getDate() == 7) {
    anivDay.setFullYear(now.getFullYear() + 1);
	}
  else if (now.getMonth() > 8 || now.getMonth() == 8 && now.getDate() > 7) {
    anivDay.setFullYear(now.getFullYear() + 1);
  }

  const time = anivDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rAnivDate').textContent = date;
  document.getElementById('rAnivHour').textContent = String(hour).padStart(2, '0');
  document.getElementById('rAnivMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('rAnivSecond').textContent = String(second).padStart(2, '0');
  
//  document.getElementById('r8AnivDate').textContent = date;
//  document.getElementById('r8AnivHour').textContent = hour;
//  document.getElementById('r8AnivMinute').textContent = String(minute).padStart(2, '0');
//  document.getElementById('r8AnivSecond').textContent = String(second).padStart(2, '0');
}

setInterval(runningDate, 1000);
setInterval(remainBirthDay, 1000);
setInterval(remainAnivDay, 1000);

// フローティングぬんぬん表示切り替え
function floatingNunnunSwitcher(scrollEnd) {
  const floatingNunnun = document.querySelector('.floating-nunnun-wrap');
  const scroll = window.pageYOffset || document.documentElement.scrollTop;

  if ((scroll >= 0 && scroll < scrollEnd) || scroll < 0) {
    floatingNunnun.style.opacity = "1";
    floatingNunnun.style.zIndex = "100";
  } else {
    floatingNunnun.style.opacity = "0";
    floatingNunnun.style.zIndex = "-100";
  }
}

function calcScrollEnd(scrollEndOffset) {
  return document.getElementById('searchBtn').getBoundingClientRect().top + window.scrollY - window.innerHeight + scrollEndOffset;
}

window.addEventListener('DOMContentLoaded', () => { 
  const scrollEndOffset = 30; 
  const detailsSetSinceTime = document.getElementById('detailsSetSinceTime');
  const detailsSetUntilTime = document.getElementById('detailsSetUntilTime');
  const detailsKeywordArchive = document.getElementById('detailsKeywordArchive');
  const detailsSummaryConfirmThisSearch = document.getElementById('detailsSummaryConfirmThisSearch');

  detailsSetSinceTime.addEventListener('toggle', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  detailsSetUntilTime.addEventListener('toggle', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  detailsKeywordArchive.addEventListener('toggle', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  detailsSummaryConfirmThisSearch.addEventListener('toggle', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  window.addEventListener('resize', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  window.addEventListener('scroll', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })

  window.addEventListener('load', () => {
    floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  })
})

// X埋め込み テーマ切り替え
const darkmode = window.matchMedia('(prefers-color-scheme: dark)');
function loadWidgets(){
  const embed = document.querySelectorAll('blockquote.twitter-tweet');
  if(embed.length === 0){
    return
  }
  for(let i = 0; i < embed.length; i++){
    if(darkmode.matches){
      embed[i].setAttribute('data-theme', 'dark');
      } else {
      embed[i].setAttribute('data-theme', 'light'); 
    }
    embed[i].setAttribute('data-width', '550');
    embed[i].setAttribute('data-align', 'center');
  }
  const script = document.createElement('script');
  script.src = "https://platform.twitter.com/widgets.js";
  document.body.appendChild(script);
}
  
function changeEmbedX(){
  const iframe = document.querySelectorAll('div.twitter-tweet-rendered iframe');
  if(iframe.length === 0){
    return
  }
  for(let i = 0; i < iframe.length; i++){
    if(darkmode.matches){
      iframe[i].src = iframe[i].src.replace('&theme=light&', '&theme=dark&');
    } else {
      iframe[i].src = iframe[i].src.replace('&theme=dark&', '&theme=light&');
    }
  }
}

window.addEventListener('DOMContentLoaded', loadWidgets);
darkmode.addEventListener('change', changeEmbedX);