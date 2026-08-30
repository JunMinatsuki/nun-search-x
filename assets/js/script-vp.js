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
  if (document.getElementById('radioSearchOptionOnlyMuiru').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionMuiru').innerText;
    if (document.getElementById('mediaOnlyModeEnabled').checked === true) {
        document.getElementById('confirmValueOption').innerHTML += "<br>" + document.getElementById('textOptionMedia').innerText;
        }
  }
  else if (document.getElementById('radioSearchOptionOnlyChuno').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionChuno').innerText;
    if (document.getElementById('mediaOnlyModeEnabled').checked === true) {
        document.getElementById('confirmValueOption').innerHTML += "<br>" + document.getElementById('textOptionMedia').innerText;
        }
  }
  else if (document.getElementById('radioSearchOptionOnlyHirune').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionHirune').innerText;
    if (document.getElementById('mediaOnlyModeEnabled').checked === true) {
        document.getElementById('confirmValueOption').innerHTML += "<br>" + document.getElementById('textOptionMedia').innerText;
        }
  }
  else if (document.getElementById('mediaOnlyModeEnabled').checked === true) {
    document.getElementById('confirmValueOption').innerHTML = document.getElementById('textOptionMedia').innerText;
  } else {
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
    searchQuery = keyword.replace(/\s+/g, " OR ");
  } else {
    searchQuery = keyword;
  }
  if (document.getElementById('radioSearchOptionOnlyMuiru').checked === true) {
    searchQuery += " from:Kokone_Muiru";
  }
    if (document.getElementById('radioSearchOptionOnlyChuno').checked === true) {
    searchQuery += " from:Suzuhina_Chuno";
  }
    if (document.getElementById('radioSearchOptionOnlyHirune').checked === true) {
    searchQuery += " from:Runoa_Hirune";
  }
  if (document.getElementById('mediaOnlyModeEnabled').checked === true) {
    searchQuery += " filter:media";
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

function openBarehenWatch() {
  let searchQuery = "バレへん";
  let openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=live";
  window.open(openUrl, '_blank');
}

function runningDateMuiru() {
  const now = new Date();
  const bigBangDate = new Date(2025, 2, 25, 17, 0, 0);

  const time = now.getTime() - bigBangDate.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('runningDateMuiru').textContent = date;
  document.getElementById('runningHourMuiru').textContent = hour;
  document.getElementById('runningMinuteMuiru').textContent = String(minute).padStart(2, '0');
  document.getElementById('runningSecondMuiru').textContent = String(second).padStart(2, '0');
}

function runningDateChuno() {
  const now = new Date();
  const bigBangDate = new Date(2025, 2, 25, 17, 0, 1);

  const time = now.getTime() - bigBangDate.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('runningDateChuno').textContent = date;
  document.getElementById('runningHourChuno').textContent = hour;
  document.getElementById('runningMinuteChuno').textContent = String(minute).padStart(2, '0');
  document.getElementById('runningSecondChuno').textContent = String(second).padStart(2, '0');
}

function runningDateHirune() {
  const now = new Date();
  const bigBangDate = new Date(2025, 2, 25, 17, 0, 2);

  const time = now.getTime() - bigBangDate.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('runningDateHirune').textContent = date;
  document.getElementById('runningHourHirune').textContent = hour;
  document.getElementById('runningMinuteHirune').textContent = String(minute).padStart(2, '0');
  document.getElementById('runningSecondHirune').textContent = String(second).padStart(2, '0');
}

function remainBirthDayMuiru() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 8, 9);
  if (now.getMonth() > 8 || now.getMonth() == 8 && now.getDate() >= 9) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rBirthDateMuiru').textContent = date;
  document.getElementById('rBirthHourMuiru').textContent = hour;
  document.getElementById('rBirthMinuteMuiru').textContent = String(minute).padStart(2, '0');
  document.getElementById('rBirthSecondMuiru').textContent = String(second).padStart(2, '0');
}

function remainBirthDayChuno() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 5, 10);
  if (now.getMonth() > 5 || now.getMonth() == 5 && now.getDate() >= 10) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rBirthDateChuno').textContent = date;
  document.getElementById('rBirthHourChuno').textContent = hour;
  document.getElementById('rBirthMinuteChuno').textContent = String(minute).padStart(2, '0');
  document.getElementById('rBirthSecondChuno').textContent = String(second).padStart(2, '0');
}

function remainBirthDayHirune() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 10, 23);
  if (now.getMonth() > 10 || now.getMonth() == 10 && now.getDate() >= 23) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rBirthDateHirune').textContent = date;
  document.getElementById('rBirthHourHirune').textContent = hour;
  document.getElementById('rBirthMinuteHirune').textContent = String(minute).padStart(2, '0');
  document.getElementById('rBirthSecondHirune').textContent = String(second).padStart(2, '0');
}

function remainAnivDay() {
  const now = new Date();
  const anivDay = new Date(now.getFullYear(), 3, 19);
  if (now.getMonth() > 3 || now.getMonth() == 3 && now.getDate() >= 19) {
    anivDay.setFullYear(now.getFullYear() + 1);
  }

  const time = anivDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rAnivDate').textContent = date;
  document.getElementById('rAnivHour').textContent = hour;
  document.getElementById('rAnivMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('rAnivSecond').textContent = String(second).padStart(2, '0');
}

setInterval(runningDateMuiru, 1000);
setInterval(runningDateChuno, 1000);
setInterval(runningDateHirune, 1000);
setInterval(remainBirthDayMuiru, 1000);
setInterval(remainBirthDayChuno, 1000);
setInterval(remainBirthDayHirune, 1000);
setInterval(remainAnivDay, 1000);

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

  // detailsKeywordArchive.addEventListener('toggle', () => {
  //   floatingNunnunSwitcher(calcScrollEnd(scrollEndOffset));
  // })

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