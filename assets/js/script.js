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
    searchQuery = keyword.replace(" ", " OR ");
  } else {
    searchQuery = keyword;
  }
  if (document.getElementById('checkboxSoraChanLoveModeEnabled').checked === true) {
    searchQuery += " from:tokino_sora";
  }
  if (document.getElementById('checkboxSinceEnabled').checked === true) {
    searchQuery += " since:" + document.getElementById('textboxSinceDate').value + "_" + document.getElementById('textboxSinceTime').value + "_JST";
  }
  if (document.getElementById('checkboxUntilEnabled').checked === true) {
    searchQuery += " until:" + document.getElementById('textboxUntilDate').value + "_" + document.getElementById('textboxUntilTime').value + "_JST";
  }
  const openUrl = "https://x.com/search?q=" + encodeURIComponent(searchQuery) + "&src=typed_query&f=top";
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

  const time = now.getTime() - bigBangDate.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('runningDate').textContent = date;
  document.getElementById('runningHour').textContent = hour;
  document.getElementById('runningMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('runningSecond').textContent = String(second).padStart(2, '0');
}

function remainBirthDay() {
  const now = new Date();
  const birthDay = new Date(now.getFullYear(), 4, 15);
  if (now.getMonth() > 4 || now.getMonth() == 4 && now.getDate() > 15) {
    birthDay.setFullYear(now.getFullYear() + 1);
  }

  const time = birthDay.getTime() - now.getTime();
  const date = Math.floor(time / 1000 / 60 / 60 / 24);
  const hour = Math.floor(time / 1000 / 60 / 60) % 24;
  const minute = Math.floor(time / 1000 / 60) % 60;
  const second = Math.floor(time / 1000) % 60;

  document.getElementById('rBirthDate').textContent = date;
  document.getElementById('rBirthHour').textContent = hour;
  document.getElementById('rBirthMinute').textContent = String(minute).padStart(2, '0');
  document.getElementById('rBirthSecond').textContent = String(second).padStart(2, '0');
}

function remainAnivDay() {
  const now = new Date();
  const anivDay = new Date(now.getFullYear(), 8, 7);
  if (now.getMonth() > 8 || now.getMonth() == 8 && now.getDate() > 7) {
    birthDay.setFullYear(now.getFullYear() + 1);
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
function loadWidgets() {
  const embed = document.querySelectorAll('blockquote.twitter-tweet');
  if (embed.length === 0) {
    return
  }
  for (let i = 0; i < embed.length; i++) {
    if (darkmode.matches) {
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

function changeEmbedX() {
  const iframe = document.querySelectorAll('div.twitter-tweet-rendered iframe');
  if (iframe.length === 0) {
    return
  }
  for (let i = 0; i < iframe.length; i++) {
    if (darkmode.matches) {
      iframe[i].src = iframe[i].src.replace('&theme=light&', '&theme=dark&');
    } else {
      iframe[i].src = iframe[i].src.replace('&theme=dark&', '&theme=light&');
    }
  }
}

/** @type {(word: string) => HTMLInputElement} - ボタン要素を作る */
const createButtonElement = (word) => {
  const button = document.createElement('input');
  button.classList.add('btn', 'btn-half');
  button.type = 'button';
  button.value = word;
  button.onclick = onClickTagButton;
  return button;
};
/** @type {(data: {active: {name: string, language_key: string, words: string[]}[], archived: {name: string, words: string[]}[]}) => void} - 検索ワード設定ボタンをJSONから取得して差し込む */
const insertWordsSelectButtons = (data) => {
  // ↓最終的に差し込む要素をこの配列に投げ込んでおく
  const elements = [];
  // アクティブなワードを差し込む
  data.active.forEach((category) => {
    const categoryHeader = document.createElement('h4');
    categoryHeader.textContent = category.name;
    categoryHeader.dataset.languageKey = category.language_key;
    elements.push(categoryHeader);
    const div = document.createElement('div');
    category.words.forEach((word) => {
      const button = createButtonElement(word);
      div.appendChild(button);
      div.appendChild(new Text(" "));
    });
    elements.push(div);
  });
  // アーカイブされたワードを差し込む
  const details = document.createElement('details');
  details.id = 'detailsKeywordArchive';
  const summary = document.createElement('summary');
  const summaryText = document.createElement('span');
  summaryText.textContent = 'アーカイブ';
  summaryText.dataset.languageKey = 'heading-archive-tag';
  summary.appendChild(summaryText);
  details.appendChild(summary);
  data.archived.forEach((category) => {
    const categoryHeader = document.createElement('h4');
    categoryHeader.textContent = category.name;
    details.appendChild(categoryHeader);
    const div = document.createElement('div');
    category.words.forEach((word) => {
      const button = createButtonElement(word);
      div.appendChild(button);
      div.appendChild(new Text(" "));
    });
    details.appendChild(div);
  });
  elements.push(details);
  // h3[data-language-key=heading-autoinput-btn]の直後に差し込む
  const beforeElement = document.querySelector('h3[data-language-key="heading-autoinput-btn"]');
  beforeElement.after(...elements);
};

window.addEventListener('DOMContentLoaded', async (event) => {
  const data = await fetch("assets/data/search_words/sora.json").then(res => res.json());
  insertWordsSelectButtons(data);
});

window.addEventListener('DOMContentLoaded', loadWidgets);
darkmode.addEventListener('change', changeEmbedX);
