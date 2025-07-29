AUTHOR = 'mschoi'
SITENAME = 'mschoi'
SITEURL = ""

PATH = "content"

TIMEZONE = 'Asia/Seoul'

DEFAULT_LANG = 'kr'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    # ("Pelican", "https://getpelican.com/"),
    # ("Python.org", "https://www.python.org/"),
    # ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    # ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    # ("You can add links in your config file", "#"),
    # ("Another social link", "#"),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

STATIC_PATHS = [
    'extra/ads.txt',
    'extra/robots.txt',
]

EXTRA_PATH_METADATA = {
    'extra/ads.txt':      {'path': 'ads.txt'},
    'extra/robots.txt':   {'path': 'robots.txt'},
}

THEME = "/Users/myeongsunchoi/dev/work_with_cursor/reason1241.github.io/theme"
OUTPUT_PATH = 'docs'

# PLUGINS = ['pelican.plugins.injector']


# GOOGLE_ANALYTICS_JS = """
# <!-- Google tag (gtag.js) -->
# <script async src="https://www.googletagmanager.com/gtag/js?id=G-JKBLYJ1X8S"></script>
# <script>
#   window.dataLayer = window.dataLayer || [];
#   function gtag(){dataLayer.push(arguments);}
#   gtag('js', new Date());

#   gtag('config', 'G-JKBLYJ1X8S');
# </script>
# """

# GOOGLE_ADSENSE_JS = """
# <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2193625028151658" crossorigin="anonymous"></script>
# """

# INJECTOR_ITEMS = [
#     ('head', GOOGLE_ANALYTICS_JS, 'after'),
#     ('head', GOOGLE_ADSENSE_JS, 'after'),
# ]
