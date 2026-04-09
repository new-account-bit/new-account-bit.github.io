export const RSS_STORAGE_KEY = "rssFeeds";
export const RSS_DATE_FILTER_KEY = "rssDateFilter";
export const DEFAULT_RSS_DATE_FILTER = "none";
export const THEME_STORAGE_KEY = "themeMode";
export const DEFAULT_THEME_MODE = "light";

export const DEFAULT_RSS_FEEDS = [
  {
    title: "BBC World News",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml"
  },
  {
    title: "MarketWatch",
    url: "https://feeds.content.dowjones.io/public/rss/mw_topstories"
  },
  {
    title: "Investing Crypto News",
    url: "https://www.investing.com/rss/news_301.rss"
  }
];

const storageEvents = new EventTarget();

function createChangePayload(key, newValue, oldValue) {
  return {
    [key]: {
      newValue,
      oldValue
    }
  };
}

function readLocalValue(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function writeLocalValue(key, value) {
  const oldValue = readLocalValue(key);
  window.localStorage.setItem(key, JSON.stringify(value));
  storageEvents.dispatchEvent(
    new CustomEvent("change", {
      detail: {
        changes: createChangePayload(key, value, oldValue),
        areaName: "local"
      }
    })
  );
}

export const storageChangeBus = {
  addListener(listener) {
    storageEvents.addEventListener("change", (event) => {
      listener(event.detail.changes, event.detail.areaName);
    });
  }
};

export async function loadStoredRssFeeds() {
  const feeds = readLocalValue(RSS_STORAGE_KEY);

  if (!Array.isArray(feeds)) {
    writeLocalValue(RSS_STORAGE_KEY, DEFAULT_RSS_FEEDS);
    return [...DEFAULT_RSS_FEEDS];
  }

  return feeds.filter(isValidFeedRecord);
}

export async function saveStoredRssFeeds(feeds) {
  const sanitizedFeeds = feeds.filter(isValidFeedRecord);
  writeLocalValue(RSS_STORAGE_KEY, sanitizedFeeds);
  return sanitizedFeeds;
}

export async function loadRssDateFilter() {
  const filter = readLocalValue(RSS_DATE_FILTER_KEY);

  if (!isValidDateFilter(filter)) {
    writeLocalValue(RSS_DATE_FILTER_KEY, DEFAULT_RSS_DATE_FILTER);
    return DEFAULT_RSS_DATE_FILTER;
  }

  return filter;
}

export async function saveRssDateFilter(filter) {
  const nextFilter = isValidDateFilter(filter) ? filter : DEFAULT_RSS_DATE_FILTER;
  writeLocalValue(RSS_DATE_FILTER_KEY, nextFilter);
  return nextFilter;
}

export async function loadThemeMode() {
  const theme = readLocalValue(THEME_STORAGE_KEY);

  if (!isValidThemeMode(theme)) {
    writeLocalValue(THEME_STORAGE_KEY, DEFAULT_THEME_MODE);
    return DEFAULT_THEME_MODE;
  }

  return theme;
}

export async function saveThemeMode(theme) {
  const nextTheme = isValidThemeMode(theme) ? theme : DEFAULT_THEME_MODE;
  writeLocalValue(THEME_STORAGE_KEY, nextTheme);
  return nextTheme;
}

function isValidFeedRecord(feed) {
  return Boolean(
    feed &&
      typeof feed.title === "string" &&
      feed.title.trim() &&
      typeof feed.url === "string" &&
      feed.url.trim()
  );
}

function isValidDateFilter(filter) {
  return ["none", "today", "last_2_days", "last_7_days"].includes(filter);
}

function isValidThemeMode(theme) {
  return ["light", "dark"].includes(theme);
}
