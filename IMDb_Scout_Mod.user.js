﻿// ==UserScript==
//
// @name         IMDb Scout Mod
// @version      10.0
// @namespace    https://github.com/Purfview/IMDb-Scout-Mod
// @description  Auto search for movie/series on torrent, usenet, ddl, subtitles, streaming, predb and other sites. Adds links to IMDb pages from various sites. Adds movies/series to Radarr/Sonarr. Adds/Removes to/from Trakt's watchlist. Removes ads.
// @icon         https://i.imgur.com/u17jjYj.png
// @license      MIT
//
// @updateURL    https://greasyfork.org/scripts/407284-imdb-scout-mod/code/IMDb%20Scout%20Mod.meta.js
// @downloadURL  https://greasyfork.org/scripts/407284-imdb-scout-mod/code/IMDb%20Scout%20Mod.user.js
// @homepage     https://github.com/Purfview/IMDb-Scout-Mod
// @supportURL   https://github.com/Purfview/IMDb-Scout-Mod/issues
//
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
//
// @include      http*://*.imdb.tld/title/tt*/
// @include      http*://*.imdb.tld/title/tt*/?ref*
// @include      http*://*.imdb.tld/title/tt*/reference*
// @include      http*://*.imdb.tld/search/title*
// @include      http*://*.imdb.tld/user/*/watchlist*
// @include      http*://*.imdb.tld/list/*
//
// @connect      *
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_info
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.addStyle
// @grant        GM.openInTab
// @grant        GM.xmlHttpRequest
// @grant        GM.registerMenuCommand
// @grant        GM.info
// @grant        GM.notification
//
// @run-at       document-start
// @noframes
//
// ==/UserScript==
//
/*=========================  Version History  ==================================

1.00    -    Initial public release, everything works on barebones greasemonkey

1.50    -    Added the ability to select which sites to load from the GM script commands
        -    Moved the required method to userscripts
        -    Removed FH, NZB, Avax

1.60    -    Added style elements and shading to display on imdb

1.62    -    Fixed bug:SCC-ARC not removing when unchecked
        -    Alphabetized list

1.70    -    Cleaned up code
        -    Added option to not run script on page load

1.71    -    Deprecated action-box field

1.80    -    Added icons that link to OpenSubs, Criticker, RT, YT

1.81    -    Added support for tv, only displays on shows listed as 'tv series'
        -    Added support for icheckmovies at top bar.

1.82    -    Fixed title parsing for tv shows.

1.83    -    Fixed dhive not working properly

1.90    -    Set height of preference window to 450px, added scroll bar

1.91    -    Added another 11 torrent sites

2.00    -    Added auto updater

2.01    -    Added TC, FreshOn, TVT, STF, CC
        -    Cleaned up code (tabbing)
        -    Removed THR
        -    Added TV-Rage to top bar

2.02    -    Added PS, THC, HH, HDStar
        -    Fixed CC false positive

2.03    -    TehC now uses tt
        -    Added Raymoz mod for AT

2.04    -    Added HDbits
        -    Added TL

2.10    -    Added genre page search functionality

2.11    -    Fixed ICM because Nuked was whining

2.12    -    Removed tvrage
        -    Fixed iCM (added tt)
        -    Added HDVNbits
        -    Changed RevTT to .me
        -    Added HDT
        -    removed autoupdate

2.13    -    removed xvidme
        -    reinstated autoupdate
        -    removed google chrome code
        -    fixed hdvn and hdt issues

2.14    -    Added @grant entries for API access
        -    Fixed tt parser to work on imdb pages with referral info in url

2.2     -    Switch preferences window to use GM_config
        -    Consolidate icon & site lists
        -    Added IPT, KASS, sHD, and HDW
        -    Fix "Open All" link
        -    Add option for strikethroughs on search page
        -    Removed arrays from search URLs
        -    Spring cleaning

2.21    -    Added SSL to TVT, HDME, TC, AHD, IPT, SCC
        -    Added SSL option for CG
        -    Added GFT, GFT-Gems, GFT-TV
        -    Fixed SCC, SCC-ARC search URL
        -    Removed TheBox, TheDVDClub
        -    Added more comments, cleaned up some more stuff

2.22    -    Fixed TehC, BTN, BTN-Req, THC
        -    Added a bunch of TV sites, courtesy of seedless
        -    Added "both" option for sites, and made changes
             to allow coexistence of movie and TV sites with
             the same name
        -    Code re-organization, documentation
        -    Re-added code to allow an array for searchUrl

2.22.1  -    Minor fixes

2.23    -    Fixed THC, BTN
        -    Distinguish between movies and TV on search page

2.24    -    Separate load_on_start option for search page
        -    Fix search_string on search page

2.25    -    Added some helpful text when no sites have been enabled

2.26    -    Added code to show links when on pages besides just the "front" one
             (e.g. http://www.imdb.com/title/tt2310332/reference)

2.26.1  -    Correctly detect TV shows when on aforementioned pages.

2.3     -    Incorporate a bunch of changes courtesy of Inguin:
             - Added SSL to AT, TE, D-noid, TG, YT, RT
             - Changed tracker short titles to canonical form ADC, KG
             - Updated D-noid from .me to .pw
             - Fixed broken AT search; also updated to use .me so avoids redirect
             - Added BitHQ, ET (eutorrents)
             - Removed two broken THC; replaced with one fixed
             - Removed iplay, horrorhaven, hdstar, scandbits, leecherslair
             - Removed needless CG http/https duplication - plenty of listed sites self-sign
             - A-Z sites list for readability
             - Cleanup YT search string
             - Copyedits
             - Clean up code (tabs, trailing spaces)
        -    Use consistent naming style
        -    Added Letterboxd, Subscene to icons
        -    Added options for showing icons

2.31    -    Added preliminary check for TSH
        -    Change all SCC links to .org

2.31.1  -    Typo fix

2.32    -    On uncertain pages, display both movie and TV sites

2.33    -    Add year to possible search params
        -    Add rutorrent

2.33.1  -    Change KG to .in

2.33.2  -    Change TSH to .me

2.34    -    Updated AT, TPB
             - Removed HDWing, TVT and CHDBits
             - Added RARBG
             - Re-added reverse match checking to support rarbg

2.35    -    Fixed YouTube icon, add SubtitleSeeker icon
        -    Added FL.ro, bB, BHD, HDS
             - Fixed TL, TehC, HDb, HDVN, AHD, KG
             - Renamed reverseMatch to positiveMatch

2.36    -    Added Wikipedia to icon sites

2.36.1  -    Typo fix

2.37    -    Add PxHD

2.38    -    Fix subtitle seeker
        -    Added CG-c
        -    Added FilmAffinity
        -    Added option to skip http check entirely

2.38.1  -    Typo fix

2.38.2  -    Global replace parameters

2.38.3  -    Typo fix

3.00    -    Clean up some formatting
        -    Add support for new IMDb page format
        -    Update jquery

3.0.1   -    Added Classix

3.0.2   -    Updated documentation/comments

3.0.3   -    Removed GOEM, FY, PS, MT
        -    Added Metacritic, CanIStream.It?, AllMovie, Facebook, Amazon, Cartoon Chaos, MySpleen, Secret Cinema
        -    Fixed Wikipedia icon

3.1     -    Handle HTTP failures less silently

3.1.1   -    Fix KASS

3.1.2   -    Fix TPB, TE, HDT
        -    Add MTV, DVDSeed

3.1.3   -    Add M-T, UHDB, HDC, Blu-ray.com
        -    Fix scenehd, RT

3.1.4   -    Add HDClub

3.2     -    Fix the button on new-style pages

3.2.1   -    Fix AHD

3.3     -    Be less obnoxious about failed calls

3.4     -    Add Netflix icon
        -    Remove a default parameter to satisfy Chrome

3.5     -    Add KZ, NNM, BB-HD, t411, TD, Rutor
        -    Fix HDClub
        -    Fix preferences in Chrome, sort sites properly

3.5.1   -    Remove DHive, Fix AHD

4.0     -    Bring in UI changes courtesy of janot
        -    Add spaceEncode and goToUrl to site options
        -    Add option to show results as links instead of text
        -    Differentiate between missing and logged out
        -    General refactoring

4.1     -    Add RARAT

4.2     -    Fix t411
        -    Use magic .tld domain in @include

4.3     -    Set @connect in metadata block

4.3.1   -    Fix THC

4.3.2   -    Add AR, TtN
        -    Add year and "trailer" to youtube search
        -    Fix M-team

4.3.3   -    Fix BitHQ, PTP-Req, SCC

4.3.4   -    Fix M-team, myspleen, avistaz, eutorrents
        -    Removed KAT

4.3.5   -    Fix IPT, Freshon
        -    Add ExtraTorrent

4.3.6   -    Fix Demonoid, EuTorrents (now CinemaZ)
        -    Fix "Actually search for torrents" option
        -    Add PrivateHD for movies and tv

4.3.7   -    Apply CinemaZ fixes to AvistaZ as well

4.3.8   -    Fix SurrealMoviez and MySpleen, switch to new PTP url

4.3.9   -    Fix criticker, add CN

4.3.10  -    Fix Netflix, MTV

4.3.11  -    Add CHD back

4.3.12  -    Fix typo

4.4     -    Fix BeyondHD
        -    Allow unicode when searching by name

4.4.1   -    Add trakt.tv

4.4.2   -    Added XS, HD-S, PTN, TBD, Blutopia
        -    Removed Freshon, CN, ExT, t411, SCC
        -    Fixed SC, TE, TG, Tik
        -    Add .com for script runners that don't support .tld

4.5     -    (Chameleon)
        -    Added an option to run on ILC request pages
        -    Fixed running on reference pages (new imdb style)
        -    Added a delay of 1 second between loading the same site (by domain) - no more popcorn quota timeouts
        -    Fixed running on search pages

4.5.1   -    Removed (dead): BitHQ, TehC, FSS, ExtraTorrent, Cine-Clasico, and Secret-Cinema
        -    Fixed the hack on goToUrl

4.5.2   -    Fixed filelist.ro, Tik, TD
        -    Added HDHome, HDU, OurBits

4.5.3   -    Fixed TG, TE, HDSpace
        -    Added XS

4.5.4   -    Fixed HDU

4.5.5   -    Fixed BHD

4.6     -    Option to highlight if the movie is missing from PTP

4.7     -    Added option to ignore the movie/tv distinction

4.7.1   -    Fix blutopia, hdchina, indenting

4.7.2   -    Fix SDBits, M-T
        -    Add TTGg

4.7.3   -    Enable on https versions of imdb sites
        -    Add TTG

4.8.0   -    Add FinVip, JoyHD, TO, TP, TS, TVCK
        -    Fix TE, HDH, CZ, Subscene
        -    Remove SubtitleSeeker
        -    Rip out all site-specific code
        -    Fix up minor code smells
        -    Allow config name to be different from site name

4.8.1   -    Add SP

4.8.2   -    Add TMDB

4.8.3   -    Add TGx
        -    Fix TTG, JoyHD, HDH
        -    Remove duplicate TMDB

4.9.0   -    Add support for a user's watchlist

4.10.0  -    Add support for icon sites on the reference view
        -    Add HTTPS for icon sites that support it

4.11.0  -    Fix search_string

4.11.1  -    Remove Blutopia
             Fix IPT

4.11.2  -    Add unogs

4.11.3  -    Fix TVDB

4.11.4  -    Add AB, remove ADC
        -    Fix BHD, Demonoid, TPB, M-T, U2, BTN, BitHD

4.11.5  -    Fix conditional check

4.12    -    Update SDBits, BTN, PTP, TMDB
        -    Apply some correctness changes

4.12.1  -    Add CCT
        -    Update CHD, AB, TTG


#==============================================================================#
#    IMDb Scout Mod:
#==============================================================================#

4.12.1-mod1  -   First public release.  New additions, tweaks, bugfixes.

                 What I can remember:
             -   Added: Blu, Retroflix, ACM, PTE, KG Requests, SC Requests.
             -   Tweak: Classix search, and split to Movie/TV.
             -   Tweak: Bunch of 'loggedOutRegex' added.
             -   Fixed: Bunch of icons.
             -   Fixed: TL, TPB.
             -   Fixed: Bug in 'loggedOutRegex' logic.
             -   New feature: Distinct icons on Requests.

4.12.1-mod2  -   Removed: Canistream.it
             -   Fixed: Few icons.
             -   Fixed: Search bug if ampersand is in the title

4.12.1-mod3  -   Removed: RARAT.
             -   Added: Rarelust & Zooqle.
             -   New feature: Sites are split to public & private (config menu).

4.12.1-mod4  -   Added: YGG, CG Requests.
             -   Tweak: CG-Cocks & CG Request icons.
             -   Tweak: RuT search, split to TV/Movie.
             -   Fixed: Filter out filled KG Requests.
             -   New feature: %search_string_orig% (search by the original titles
                              on the movie/tv pages), enabled on RuT and YGG.

4.12.1-mod5  -   Fixed: CG Request. Demonoid typo.

4.12.1-mod6  -   Removed: HDVN, HoundDawgs.
             -   Added: 1337x, ETTV, LimeTor, HDSpain, RlsBB, DB, FF, THR, PTer.
             -   Fixed: TD, Demonoid, RARBG.
             -   Tweak: Bold'ed the titles of config menu sections for better visibility.
             -   Tweak: 'Other titles' sorted in alphabetical order.
             -   Tweak: Added 'loggedOutRegex' to all private & some public sites.
             -   Fixed: All borked icons are fixed.
             -   Fixed: Bug in 'loggedOutRegex' (false negative if site responds with redirect).

4.12.1-mod7  -   Added: BRT.
             -   Tweak: SDBits, U2.

5.0     -   Fix: @namespace & @name changed to fix updating for plugins.

5.1     -   Tweak: TVV, BB-HD.
        -   Fixed: Invisible icons on dark background JoyHD, Rarelust, CZ, Zooqle, KG.
        -   New feature: The new layout (icons are placed at top). Option to turn it off.
        -   New feature: Option to select background for the new layout.

5.2     -   Tweak: Small tweaks (some preferences will reset to default).
        -   Fixed: Rarelust icon.

5.2.1   -   Fixed: Rarelust icon (forgot to update it)
        -   Added: RlsBB-Proxy ('RlsBB' now points to the main domain)

5.3     -   Added: Tik-Req, AHD-Req.
        -   Tweak: No icon borders if "Show results on one line" is off.
        -   Fixed: Text color on the new layout.
        -   New feature: Option to change size of the icons.

5.3.1   -   Added: JPTV.
        -   Fixed: ACM icon.

5.4     -   Added: AG, CPS, Deildu (as public because open reg).
        -   Tweak: PTP, DVDSeeds, AHD, PTer.
        -   Fixed: Button code for legacy & new layout.
        -   Fixed: Reference view for the new layout.

5.5     -   Added: PreDB & dozen of the subtitles sites (all of it is set to the 2nd bar).
        -   Fixed: Subscene
        -   New Feature: New 'Subtitles' & 'Other searchable sites' sections (config menu), all set to 2nd bar.
        -   New Feature: Two extra searchable bars for the movies page (Search/Watchlist page shows only 1st bar).
        -   New Feature: Extra bars can be enabled/disabled/swapped at the preferences.
        -   New Feature: Two new 'inSecondSearchBar' and 'inThirdSearchBar' attributes.
                         Subtitles & Other searchable sites are set to 2nd bar.
                         3rd bar is empty, free space for custom configuration.

5.5.1   -   Added: TVV-Req, GT, WC, RareFilm, Titlovi, MoviePosterDB, Ulož, srrDB, xREL.
            Tweak: PreDB, TE, 1337x, LimeTor, HDB, BTN.

5.5.2   -   Added: XDCC, ixIRC.
            Tweak: GT.

5.5.3   -   Added: EUC, 1337x-Proxy, LimeTor-Proxy.

6.0     -   Added: BTN-Title (if someone prefer to search by the titles).
        -   Tweak: PTP, "Your popcorn quota" added to loggedOutRegex.
        -   Tweak: Refinement of code, comments and documentation.
        -   Fixed: "TV Special" is not recognized as "TV" (now it works same as "TV Movie").
        -   Fixed: Broken TV/Movie distinction on the Search/Watchlist pages.
        -   Fixed: Broken Watchlist search if "episode" is present.
        -   Fixed: Broken 'Load' button on Watchlist pages.
        -   Fixed: Broken %year% search on Search/Watchlist pages.
        -   Fixed: Broken %goToUrl% on Search/Watchlist pages when "check for results" is on.
        -   Fixed: Broken %goToUrl% on all pages when "check for results" is off.
        -   Fixed: Broken %year% on TV-series pages.
        -   Removed: 'Treat the watchlist as a search page?' option.
        -   New Feature: Documentaries are treated as TV & Movie.
        -   New Feature: %search_string_orig% works on Search/List/Watchlist pages too.
        -   New Feature: Script supports List pages.

6.0.1   -   Added: TSeeds.

6.0.2   -   Tweak: TSeeds.

6.1     -   Added: DC.
        -   Tweak: BTN-Title, WC, TVV, TVV-Req, ACM, Blu, JPTV, M-T, U2 and ect..
        -   Tweak: Some code optimizations.
        -   New Feature: Connection rate limiting for IMDb's domain.
                         Sites are added more consequent on Search/List pages.
        -   New Feature: Dynamic rates. Search on Title pages are much faster now.
        -   New Feature: Optional 'rateLimit' attribute for sites.

6.1.1   -   Fixed: TL, TSeeds.

6.1.2   -   Added: TL-PL, 3CT, IT.
        -   Tweaks: BTN-Req icon, Tik, Tik-Req.

6.2     -   Added: TVU, Bit-Titan, SU, Tasmanites, BDC, FE, PTMSG.
        -   Tweaks: AHD, AHD-Req, CPS, HDB. Some rate tweaks.
        -   Fixed: Disabling 'Show results on one line?' removed icon borders on Search/List pages.
        -   New feature: Sites are grouped by the result states on Search/List pages (same as on Title pages) (scout_tick).
        -   New feature: Option to highlight preferred sites (brighter border of icon or bold text).
        -   New feature: All icons of request sites ('-Req') are highlighted with a blue border if 'found'.
        -   New feature: 3rd bar supported on Search/List pages.
        -   New feature: Separate space in Config for the custom sites. Replace 'Dummy' placeholder with your custom sites.

6.2.1   -   Added: TDB.
        -   Tweaks: SDBits, TSeeds.

6.3     -   Added: iTS.
        -   Tweaks: TSeeds, Retroflix, Subscene.
        -   New feature: Infotip on icons shows '(TV)' for 'TV' sites.

6.3.1   -   Added: TT, TBA.

6.4     -   Added: T2K, DT.
        -   Tweak: Retroflix, TPB/TPB-Proxy.
        -   Fixed: Broken "Open All" button.
        -   New feature: Links of "icon sites" opens in new tabs.
        -   New feature: Support for POST method with new 'mPOST' attribute.

6.5     -   Added: SpaceTor, AlloCiné, SensCritique, КиноПоиск, MovieMistakes, TrailerAddict,
                   ScreenAnarchy, MovieChat, The Numbers, Lumiere, Box Office Mojo, OFDb.
        -   New feature: "Total sites" stats at the top of config.

7.0     -   Tweaks : TTG, RuTor, TL-PL is renamed to TLPL.
        -   Tweaks : TL search is by IMDb ID; searching by title is done with TL-Title.
        -   Tweaks : Some sites moved to https. Some config tweaks.
        -   Updated: GM_config & jQuery to latest versions.
        -   Fixed  : 'SpaceEncode' not working with 'goToUrl'.
        -   New feature: "Load Settings" button if there is no sites enabled.
        -   New feature: Page auto reloads after Settings close.
        -   New feature: "Selected sites" stats at the top of config.
        -   New feature: Greasemonkey v4 is supported.

7.1     -   Added: AS, DVDCompare, DVDTalk, DVDBeaver.
        -   New feature: Icon sites have hyperlinks in Settings too.

7.2     -   Added: ProStyleX, TorDL, PHD-Req, DonTor, CineCalidad, DVD-Basen, MRQE, Movie-Censorship.
        -   Tweaks: uNoGS, ETTV, CG, TVV-Req.
        -   New feature: Icons of the "icon sites" are same size as other icons.

7.3     -   Added: OmgWtf, DrunkenSlug.
        -   New feature: Streamlined "icon sites" area.

7.4     -   Added: NZBgeek, NZBfinder, NZBGrabit, NZBsu, abNZB, BD25, NZBplanet, NZBnoob,
                   TVmaze, Aither.
        -   New feature: Usenet sites are separated in Settings.

7.5     -   Added: NinjaCentral, MIAtrix, altHUB, SceneNZB, NzbNdx, nzbforyou, GingaDADDY,
                   HDA, FindAnyFilm, xThor.
        -   New feature: 'mPOST' can be formed as json (atm only for icon sites).

7.6     -   Added: DOGnzb, Sharewood, MovieBuff, ONLYscene, HD-F, E-T, SolidTor, MVG, BTDB, BD-film.
        -   Tweaks: eThor, YGG (tv separated), TSeeds, RareFilm, M-T, TVCK.
        -   Fixed: Iframes of the ads are interfering with Settings/GM_Config (script will remove ads).

7.6.1   -   Added: ExiTor, SI, Team-HuSh, G-Free.

7.7     -   New feature: HTTP status above 399 will produce an error (red border).

7.7.1   -   Tweak: BDC.

7.7.2   -   Added: ArenaBG.

7.8     -   Added:  LimeTor (tv), TorDL-Proxy, RMZ.
        -   Tweaks: LimeTor-Proxy, 1337x-Proxy, TPB-Proxy, Demonoid, Classix (icon), TT.
        -   Tweaks: Icons of some blocked sites moved to Imgur.
        -   New feature: Streamlined the layout of Settings.

7.8.1   -   Added: HEVCBay.

7.8.2   -   Added: GloTor, Unlimitz, HDenc, SB, Zamunda.
        -   Removed: SceneNZB, DB.
        -   Tweaked: YGG, PTP, KG, U2.

7.8.3   -   Tweaked: Zooqle.

7.8.4   -   Added: Yubraca.

7.8.5   -   Added: HDtime, HDAtmos, GD, DKBits, nCore, Thor-Island, Videoteka, DesiRel, Telly,
                   WhatsOnMubi, JustWatch.
        -   Removed: eThor.
        -   Tweaked: ArenaBG, TGx, NNM (split to movies/tv), Bit-Titan, updated proxy sites.

7.8.6   -   Added: SpeedApp, CMS, BJS.

7.8.7   -   Added: Milkie (no search), HQS, TSH, DWR, BigBBS, CT, ST, PS, TM, MP, LS, NZBcat.
        -   Removed: DKBits, SU, AG, ONLYscene, SpaceTor, Thor-Island.

7.9     -   New feature: Icons sorting (on button click, beta testing) by Sapphire.
                         For "found" icons only. Behaviour:
                         Highlighted > Others > Requests (in alphabetical order),
                         except order of highlighted is taken from Settings.
            Tweaked: CT, Subs4Free.

7.10    -   Added: BWT.
            Fixed: Watchlist

7.11    -   Merged code from Sapphire:
               New feature: Sites sorting when "Show results on one line" is off.
               New feature: Sorting button on the reference page.
        -   New feature: The request sites on the new line when sorting (Option).
        -   New feature: Added the sites sorting function for the missing.
        -   Fixed: Misalignment of the icons after sorting.
        -   Fixed: Sorting is done by a site's name instead of url.
        -   Fixed: Script was loading on trivia, credits, reviews & ect pages.
        -   Fixed: NBL.
        -   Tweak: Removed redundant @include.

7.12    -   Added: SPD, HT.
        -   Tweaks: Sorting, Ads.

8.0     -   New feature: Automatic alphabetical icons/sites sorting on Title page.
                Only for Public, Private, Usenet sites on the 1st searchable bar.
                "Found" sites are sorted as Highlighted > Others > Requests,
                order of the highlighted is taken from Settings.
                "Missing" sites are sorted only alphabetically, "LoggedOut" & "Error" sites are not sorted.
                Sorting starts when less than 5 sites are left to add.
                Found request sites are split only after all sites are added (Optional).
            Custom sites must be set to the 3rd/2nd search bar or sorting wont be working properly!

8.0.1   -   Tweak: Subscene.
        -   Tweak: Sorting functions moved above "main".

8.0.2   -   Added: WF, CrazyHD, PTM.
        -   Removed: DT.

8.1     -   Added: SkT.
        -   Fixed: AHD.
        -   Removed: OpenSubsOnline
        -   Bugfix: Firefox + GM4 combination wasn't working. New fixed GM_config lib.

8.2     -   Tweak: Updated GM_config link (fix was merged into mainline).

8.3     -   Bugfix: Page reload on Settings close wasn't working on Chrome and Opera.

8.4     -   Bugfix: No vertical spacing between icons.
        -   Bugfix: Non-square icons.

8.4.1   -   Added: BP.

8.5     -   Added: W-v3.
        -   Fixed: BigBBS, RetroFlix, Zamunda, E-T, RARBG, WF, Snahp.
        -   New feature: If rateLimit>1000 then when on List it won't increase.

8.5.1   -   Added: DW, ADC.
        -   Fixed: nCore.

8.6     -   Added: PREcBurns, PREovh, preFYP.
        -   Removed: MTV.
        -   New feature: Other sites are split to Pre databases and Streaming sites.

8.7     -   Tweak: Milkie moved to the icon sites.
        -   Tweak: Some ratelimits added.
        -   Tweak: Small tweak to code for ratelimit to IMDb site on List/Search pages.

8.7.1   -   Added: PD.

8.7.2   -   Added: HDZ.

8.7.3   -   Added: PTTime.

8.7.4   -   Tweaked: RARBG.

8.7.5   -   Added: Reelgood, WtFnzb(no tv), DDLW (for ~German IPs).
        -   Tweaked: OmgWtf(sort by size). DrunkenSlug & NZBfinder movie search by imdb id.

8.8     -   Tweaked: RARBG, Subtitry (RU).
        -   New feature: @noframes (probably proper fix for the bug "fixed" in v7.6).
        -   New feature: Changed how script starts, should be faster now.

8.9     -   Added: Fist of B-List, Criterion, Criterion Channel.
        -   New feature: New "Other sites" category in Settings.

8.9.1   -   Removed: AHD, AHD-Req.

8.9.2   -   Added: MTV.

8.9.3   -   Tweaks: Proxy updates.

9.0     -   Added: DOGnzb (movie search is by IMDb id, tv search by TVDb id) .
        -   New feature:  Support search by TVDb ID and TMDb ID
                         with new search URL parameters: %tvdbid% and %tmdbid%.
                          If matching id is not found then it will be set to "00000000",
                         if it's "undefined" then response didn't came in time,
                         timeout is set to wait for 2 seconds.
                         Some functions are async now.

9.1     -   New feature: All icons from Imgur and the problematic sites are stored in the script as Base64 strings.

9.1.1   -   Fixed: YGG.

9.2     -   Added: FZ, Portugas.
        -   New feature: Ads removal moved to func.

9.2.1   -   Added: HDFans, BTN-TVDb (should be more reliable than by imdb id).

9.3     -   Tweaked: BHD.
        -   New feature: On list/Watchlist page the "Load IMDb Scout" button moved to the top.

9.3.1   -   Added: Simply Scripts, Scripts On Screen, IMSDb.

9.3.2   -   Added: HDAI.
        -   Fixed: PxHD, CG-Req.
        -   Removed: IMSDb.

9.3.3   -   Added: HB.

9.3.4   -   Fixed: BD-film.

9.3.5   -   Added: T (The Myth).

9.3.6   -   Added: VidSrc, DbGDP, FZN, M-TB, ETpl.
        -   Tweak: Ulož moved to the icon sites.

9.4     -   Fixed: A typo in %tmdbid% code.

9.4.1   -   Added: NTELogo, MOJBLiNK, MovieTorrentz.

9.5     -   New feature: Add movies to Radarr (based on dirtycajunrice's code).

9.6     -   New feature: Refined Radarr settings.

9.6.1   -   Added: Anasch.
        -   Tweaked: PTP, M-T, PTer, SDBits, U2, UHDB, TTG.

9.7     -   New feature: Add tv-series to Sonarr.

9.7.1   -   Added: TSP, Assrt (CN), GreekSubs (GR), HosszuPuska (HU), Pipocas (PT) & (BR),
                   Nekur (LV), Titrari (RO), WizdomSubs (IL), Yavka (BG), Zimuku (CN), Feliratok (HU).

9.7.2   -   Added: seleZen, Blu-Req, ACM-Req.

9.8     -   Added: DesiTor, Caps-A-Holic.
        -   New feature: Add/Remove movies/series/episodes to/from Trakt's watchlist.
        -   Note: Current Tampermonkey ver. has bug with notifications, affected: Sonarr/Radarr/Trakt-Watchlist.

9.9     -   Some code syntax and other tweaks.

9.10    -   Fixed: T2K (tv).
        -   Fixed: 'mPOST' wasn't working on the List/Search pages.
        -   Fixed: 'SpaceEncode' wasn't working on 'mPOST'.

9.11    -   New feature: Support for notifications on GM3.
        -   New feature: New section in settings for the special icons/buttons.
        -   Note: Tampermonkey fixed notifications from v4.13.6134.

9.11.1  -   Added: Filmow, WB.

9.12    -   Added: Simkl, MovieLens, ratehouse, Filmsomniac, MyMovieRack.
        -   Added support for Milkie search (needs auth token).

9.12.1  -   Added: Dl4All, 3Dsbs4u, myGully.

9.12.2  -   Added: PB.

9.13    -   Added new: GiroTor, LeechTurks, AveTor, 7torrents, xTorrenty, DevilTor, OxTor, Oasis,
                       TCTG, HD-U, HD-U-Req, Lat-Team, Lat-Team-Req, Immortuos, Immortuos-Req,
                       TorSurf, TorSurf-Req, Ztracker, Ztracker-Req.
        -   Added: DesiRel-Req, Telly-Req, 3CT-Req, Aither-Req, Anasch-Req, AR-Req, AT-Req, BDC-Req,
                   BP-Req, BRT-Req, BTN-IMDb-Req, BWT-Req, Classix-Req, CrazyHD-Req, CZ-Req, ExiTor-Req,
                   FE-Req, FL-Req, FZ-Req, HB-Req, IPT-Req, IT-Req, iTS-Req, JPTV-Req, MP-Req, nCore-Req,
                   NTELogo-Req, Portugas-Req, PS-Req, PTE-IMDb, PTM-Req, Retroflix-Req, Sharewood-Req,
                   SI-Req, SpeedApp-Req, TDB-Req, Team-HuSh-Req, THC-Req, TL-Req, TSH-Req, Yubraca-Req.
        -   Removed: E-T.

9.13.1  -   Added: ARAMovie.

9.13.2  -   Added: Cilipro, EXTTor, NPlus, NPlus-Req, DBy, DBy-Req.

9.14    -   Added: BT4G, SW, WH.
        -   Fixed: SolidTor.
        -   Removed: 7torrents.
        -   New feature: New 'ignore404' attribute.

9.14.1  -   Added: TLFBits, UHDB-Req, ANT-Req, NBL-Req, bB-Req.

9.14.2  -   Added: HDTurk.

9.14.3  -   Added: HDMonkey.

9.15    -   New feature: Check on tmdb/tvdb conversion, if it's not successful = 'error' icon.

9.15.1  -   Added: RPTor, SF, BestCore, HD-F-Req, BHD-Req.
        -   Tweak: HD-F (add search for tv).

9.15.2  -   Tweaks: BTN, BTN-TVDb.

9.16    -   Added: IS, IS-Req.
        -   New feature: 'mPOST' can be formed as json for all sites.
        -   New feature: 'mPOST' can be formed as json array (supports duplicate keys).
        -   New feature: Support for parameters in 'searchUrl' & 'mPOST' at the same time.

9.16.1  -   Added: HDT-Req.

9.16.2  -   Added: ASC.

9.16.3  -   Added: MKO.

9.16.4  -   Added: Hon3yHD, Hon3yHD-Req, TLZ.

10.0    -   New feature: Support for new IMDb layout.
        -   New feature: Support %search_string_orig% on the reference pages.
        -   Removed: Options for the legacy layout.
        -   Checked the icon sites: some fixed & some icons updated.

*/
//==============================================================================
//    JSHint directives.
//==============================================================================

/*jshint esversion: 8 */
/*jshint sub:true */
/*jshint multistr: true */
/*jshint scripturl:true*/
/*globals GM, GM_config, $ */
/*jshint shadow:true */
/*jshint -W089 */
/*jshint expr: true */
/*jshint laxbreak: true */

//==============================================================================
//    A list of all the sites.
//==============================================================================
/*
    -= Each site is a dictionary with the following attributes: =-

#  'name':
The site name, abbreviated, unique (the 'TV' atribute internaly adds 'TV' to the name).

#  'icon' (optional):
Icon for the site. If not defined then script looks at site/favicon.ico.
Can be URL or Base64 string (www.base64-image.de).

#  'searchUrl':
The URL to perform the search against, see below for how to tailor the string to a site.

#  'matchRegex':
The string which appears if the searchUrl *doesn't* return a result.

#  'positiveMatch' (optional):
Changes the test to return true if the searchUrl *does* return a result that matches matchRegex.

#  'TV' (optional):
If true, it means that this site will only show up on TV pages.
By default, sites only show up on movie pages.

#  'both' (optional):
Means that the site will show up on both movie and TV pages.

#  'SpaceEncode' (optional):
Changes the character used to encode spaces in movie/TV titles. The default is '+'.

#  'goToUrl' (optional):
Most of the time the same URLs that are used for checking are the ones that
are used to actually get to the movie, but this allows overriding that.

#  'loggedOutRegex' (optional):
If any text on the page matches this regex, the site is treated as being logged out,
rather than mising the movie. This option is not effected by positiveMatch.

#  'ConfigName' (optional):
Use this to allow changing names without breaking existing users.

#  'inSecondSearchBar' & 'inThirdSearchBar' (optional):
Places site at the extra searchable bar. Subtitles and other sites are set to 2nd bar.
3rd bar is empty, space for custom user's configuration. By defaut site goes to the 1st bar.
Extra bars can be enabled/disabled/swapped at the Settings.

#  'rateLimit' (optional):
Connection rate limit in milliseconds. Default is 200.
On the Search/List pages if rateLimit<=1000 then it will be increased by a factor of 4.

#  'mPOST':
HTTP request by POST method. For the sites that doesn't support GET.
Right mouse click won't submit such request.
Atm 'goToUrl' not supported with it.
Examples (3 types of formating):
'cat1=4&cat2=6&filter=%tt%'
'{"cat1":4,"cat2":6,"filter":"all=%tt%&sort=date"}'
'{ key:"cat",value:"4"},{key:"cat",value:"6"},{key:"filter",value:"%tt%"}'  // (supports duplicate keys)

#  'ignore404' (optional):
Ignores all 4** HTTP errors.

    -=  Search URL parameters: =-

#  %tt%:
The IMDb id with the tt prefix (e.g. tt0055630).

#  %nott%:
The IMDb id without the tt prefix (e.g. 0055630).

#  %tvdbid%:
The TVDb id.

#  %tmdbid%:
The TMDb id.

#  %search_string%:
The movie title (e.g. Yojimbo). Depends on your preferences at www.imdb.com/preferences/general.

#  %search_string_orig%:
The original movie title (e.g. Yôjinbô). Reverts to %search_string% if original title is not set at IMDb.

#  %year%:
The movie year (e.g. 1961).

*/

// Custom sites must be set to the 3rd/2nd search bar.
var custom_sites = [
  {   'name': 'Dummy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://dummy.dummy',
      'loggedOutRegex': /dummy/,
      'matchRegex': /dummy/,
      'inThirdSearchBar': true,
      'both': true}
];

var public_sites = [
  {   'name': '1337x',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2klEQVQ4y82QPWhTYRiFn/e715ukxlKhIlhbsIN/oYNDB6mDghYyOgi6+DdUcBQcnXSy4CI4WEHEUrKICG7aweLgoFhosQaHapUgakzS9Ca56f2+16FtqAm66jsdXs55OBz41ycbQi8ezJLuvYpnHOCxUp6SidkJAL106DC9/dfw/CTGJCh8fCJ3X98EMC1UrTxPvWqJ4wzO7SNIXdAze3YqCInu8xgzjJghVqNBopXZjVgLILnCZ8LydeJmhLMGPxgklc5yNjNMKjWKogCEpXEevH/WAQCQqcUZovpTrHO42JJMX6Zn+w3EpBAD9eoclfChsA5rBwDQXLlNHBVxTgmSAwRdQ3i+ENUilhbuyP233zfbOwAyuZinEU5ifA8R8Ixh+acj/+YVuaXH7X6//bE2WroPEahXLV+LSuWbpRn1cIRuXlL6awNO7hghLGX5km/y6d0qPwoxGCFI7GXb1nPt9t8AmiGgXhujWPAJK4qL5xCeg1sbTfWUjtL/5wa7/KOIjmA8QYxi43vYxi3ULeOcYrw+SJzWTbmW0OMMYLwrIB6qiroPNOwM0yzg9AUiYGOHyBgn/GOdI4q/H/FjnM4j+Dibk/XBFH2Ec7tRZ/C2dGHtAWCa/+J+AZeVwbu0mS/pAAAAAElFTkSuQmCC',
      'searchUrl': 'https://1337x.to/category-search/%search_string%+%year%/Movies/1/',
      'matchRegex': /No results were returned/},
  {   'name': '1337x',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2klEQVQ4y82QPWhTYRiFn/e715ukxlKhIlhbsIN/oYNDB6mDghYyOgi6+DdUcBQcnXSy4CI4WEHEUrKICG7aweLgoFhosQaHapUgakzS9Ca56f2+16FtqAm66jsdXs55OBz41ycbQi8ezJLuvYpnHOCxUp6SidkJAL106DC9/dfw/CTGJCh8fCJ3X98EMC1UrTxPvWqJ4wzO7SNIXdAze3YqCInu8xgzjJghVqNBopXZjVgLILnCZ8LydeJmhLMGPxgklc5yNjNMKjWKogCEpXEevH/WAQCQqcUZovpTrHO42JJMX6Zn+w3EpBAD9eoclfChsA5rBwDQXLlNHBVxTgmSAwRdQ3i+ENUilhbuyP233zfbOwAyuZinEU5ifA8R8Ixh+acj/+YVuaXH7X6//bE2WroPEahXLV+LSuWbpRn1cIRuXlL6awNO7hghLGX5km/y6d0qPwoxGCFI7GXb1nPt9t8AmiGgXhujWPAJK4qL5xCeg1sbTfWUjtL/5wa7/KOIjmA8QYxi43vYxi3ULeOcYrw+SJzWTbmW0OMMYLwrIB6qiroPNOwM0yzg9AUiYGOHyBgn/GOdI4q/H/FjnM4j+Dibk/XBFH2Ec7tRZ/C2dGHtAWCa/+J+AZeVwbu0mS/pAAAAAElFTkSuQmCC',
      'searchUrl': 'https://1337x.to/category-search/%search_string%/TV/1/',
      'matchRegex': /No results were returned/,
      'TV': true},
  {   'name': '1337x-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2klEQVQ4y82QPWhTYRiFn/e715ukxlKhIlhbsIN/oYNDB6mDghYyOgi6+DdUcBQcnXSy4CI4WEHEUrKICG7aweLgoFhosQaHapUgakzS9Ca56f2+16FtqAm66jsdXs55OBz41ycbQi8ezJLuvYpnHOCxUp6SidkJAL106DC9/dfw/CTGJCh8fCJ3X98EMC1UrTxPvWqJ4wzO7SNIXdAze3YqCInu8xgzjJghVqNBopXZjVgLILnCZ8LydeJmhLMGPxgklc5yNjNMKjWKogCEpXEevH/WAQCQqcUZovpTrHO42JJMX6Zn+w3EpBAD9eoclfChsA5rBwDQXLlNHBVxTgmSAwRdQ3i+ENUilhbuyP233zfbOwAyuZinEU5ifA8R8Ixh+acj/+YVuaXH7X6//bE2WroPEahXLV+LSuWbpRn1cIRuXlL6awNO7hghLGX5km/y6d0qPwoxGCFI7GXb1nPt9t8AmiGgXhujWPAJK4qL5xCeg1sbTfWUjtL/5wa7/KOIjmA8QYxi43vYxi3ULeOcYrw+SJzWTbmW0OMMYLwrIB6qiroPNOwM0yzg9AUiYGOHyBgn/GOdI4q/H/FjnM4j+Dibk/XBFH2Ec7tRZ/C2dGHtAWCa/+J+AZeVwbu0mS/pAAAAAElFTkSuQmCC',
      'searchUrl': 'https://1337x.unblockit.club/category-search/%search_string%+%year%/Movies/1/',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results were returned/},
  {   'name': '1337x-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2klEQVQ4y82QPWhTYRiFn/e715ukxlKhIlhbsIN/oYNDB6mDghYyOgi6+DdUcBQcnXSy4CI4WEHEUrKICG7aweLgoFhosQaHapUgakzS9Ca56f2+16FtqAm66jsdXs55OBz41ycbQi8ezJLuvYpnHOCxUp6SidkJAL106DC9/dfw/CTGJCh8fCJ3X98EMC1UrTxPvWqJ4wzO7SNIXdAze3YqCInu8xgzjJghVqNBopXZjVgLILnCZ8LydeJmhLMGPxgklc5yNjNMKjWKogCEpXEevH/WAQCQqcUZovpTrHO42JJMX6Zn+w3EpBAD9eoclfChsA5rBwDQXLlNHBVxTgmSAwRdQ3i+ENUilhbuyP233zfbOwAyuZinEU5ifA8R8Ixh+acj/+YVuaXH7X6//bE2WroPEahXLV+LSuWbpRn1cIRuXlL6awNO7hghLGX5km/y6d0qPwoxGCFI7GXb1nPt9t8AmiGgXhujWPAJK4qL5xCeg1sbTfWUjtL/5wa7/KOIjmA8QYxi43vYxi3ULeOcYrw+SJzWTbmW0OMMYLwrIB6qiroPNOwM0yzg9AUiYGOHyBgn/GOdI4q/H/FjnM4j+Dibk/XBFH2Ec7tRZ/C2dGHtAWCa/+J+AZeVwbu0mS/pAAAAAElFTkSuQmCC',
      'searchUrl': 'https://1337x.unblockit.club/category-search/%search_string%/TV/1/',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results were returned/,
      'TV': true},
  {   'name': '3Dsbs4u',
      'icon': 'https://3dsbs4u.com/templates/3dsbs4u/images/favicon.ico',
      'searchUrl': 'https://3dsbs4u.com/index.php?do=search',
      'mPOST': 'do=search&subaction=search&search_start=1&full_search=0&result_from=1&story=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /did not return any results/,
      'both': true},
  {   'name': 'ARAMovie',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAYUExURQAAACQYGNiKGeUsLP///yQYGNiKGeUsLL6GE1wAAAAFdFJOUwAAAAAAwmsGsQAAAXZJREFUSMftlMFtwzAMRZUCvccFskCK3BsI2iADtAi+NYG8gaD1S35Ssp0cOkBDwIlpPolfJO1w+8PCC/hXAO0w4Rje0W2awgGThcLbWe0CuebFrIgT8O3Ax/kzxpiq/HRgKfcYs1xiXw6giY9lEDG1PZDVTwNY7qnVBwACzOsW2AOp0bczEMjNcmwAzWHE/AyI66LUdA95ggcAA0gG1BVICtQdAEvagdbc70BJntQAKDBE6GlLchEGZALqJzuElNJFEEgOjCpIJaOLMECiudrS0S0XQQC2fO2EZIgugoDebpZbu12EApe8jxewZpkiCLT6vD66CAXQetwbtQWuAsgBPOxD4wBFEOhxzc0+WEU7cLEEgJVu5kSy66qSAOOumsAdQ4QA3ABdlOVAF4FrOMFPlqxfBOoQIcDcZeUhItts6IMfAiWupSNgs6F7CjDOBROBpfiAMmnYl44ifCsrVeDrfpQPwHTi7eFkgyMv96T/r+/kC9jaL+xCPZlAjPJIAAAAAElFTkSuQmCC',
      'searchUrl': 'https://aramovie.xyz/wp-admin/admin-ajax.php?action=live_func&keyword=%tt%',
      'goToUrl': 'https://aramovie.xyz/%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /جستجو نتیجه ای نداشت/,
      'both': true},
  {   'name': 'ArenaBG',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGQklEQVRYw9VXbWxTVRg+Xbexrfto1/X7u90H2xAY2yCADhgRBwyCKA4YRCSCCCgbUgZC263bNKgDtmFi4IeJJMOQGH+YGDI0SEB/6A8TgzFRE5JpMJhFCVNgG+vje05v29uPjYn8scmTe3d3cp/n/TjPeS9j/6cfWlkhjrJG+FkQPnaOroOEzxBgHxF66L4ZbcwOMMWjI2VMQWS1hLNEcIsQQjtDSgQE7hIuktB19Cz9v5G/zkxE+AFhLImsIwGJ/+dC/ewqCa9+OHIfW0IvGBJRyQmDEjpTIJhCkJ/9RdhD92nTJ+fp87ORuGgjpF2E7knQJUEuJlyaCXpf17RESJGPJBFLJMM+BT7ckoGWpdnYMC8HT1epsH1hDk6uy8K1ViUm5GKSRXinU/OhOHIp4ptHFfDWZ8FpzIdarYZGo0FhYSG0Wm0UBp0Wa+bm4+ruDIS6ZdnoiJbjHmW3fvJu5w0XqXmE/A2GL15SYpY9TxBHSHU6HfR6PQwGQxz4M4tRh+AqFca6UmTCz36ga26ygHZWE+32jljaB3ekw6ovEBFzYqNBh/W1Gry/NQeXXs3EldZMfLIrG22r1KjwmGGxWGA2m2EyGtFan4/7chGRrepjLalqfzYu9UR+/WAais35IuqioiLML9Pi8r5MTJyg/5+U0Bu7v9GpxL6ntHDY7bBarSTGjFPPqMI9EV+Kn9HHZsTIDzGNMBlZ9LyZmqpVInJO/kSlFkMdaWFCjr4UoOf3jzN0r9fA6XTATkLK3WZcb1PGZyHsEcvl264x6nBS7b9rUUKvDafdYdHj27aMGHE/4VQC+mMiRnsU2FJnJBFOOBwOHG7QhLMQjHPNt2MCuLe3y5qPFvtWZIvU86byNhQgJKV7LAIiG+sPY5TuJyQR47RujLLw5f4seNwuuFwuLKiw4k5QkViGy7zxI/U/F5d+ysCy8jyRepPJiCstM0SNQ0TU26xGbaUN1eUWVJWZMLfUiDklBux+Uo17JxX4vCULCyvNqKmwwU0CPB4PXd1YOc+MG4eUcgFD2MkyIhkYlAsYJZRYNSJ6p82Mm13KcKORgNFe8oPGQtFkottNpij2ryzAGK0beFEFj8suoi8uLhbgQlbOM2H4cFpEwG28IjWiOFJlAu5RGRymQhhpK5W4LBh5SxGrP6X6p2A63A6TECCH22HGtaMZuEM9sKrWJCIvKSlBaWmpuHro74HNuQgR14SPzoioAB+d5zIBY4RKh1ZE5XLY8CsRRjLw+7E0NFTrxX7nsNlsotudDjvO7VRhnIR6V2tFA/KoOfnMmTMFvA0GjHPygMjAb8SZGRHQE21CaQuurVKLqPjLL+7NFgIm6OW9m/Lw3CKtQNPjOmyq06N5iRGnt1GjUhMO7stBc50BTYtNFLUHZWVlqKwoR9tqM+62K+Q98E30cBKTTIIFH1+XExWwc7k+bD694UbkRKFT8YhsxRBfQ2sv7FGRgGIhoGGBB+OdCbsgwM7EtuERZhOTTKQMJGCIOtZDdeYCPG4nBvfmxJyvT+YH/fEewNfcepPKVGMVzccF9DcVxRtRO3nOEdYUE0AznBijZH3AT7NDKwpgpxrzetZU2PH1AdqOJ2QWLIdkxyPHFNi+VCd2AO+Buio3/vArEz1gmLtvqiEkzg3/9Kdh2eywo/EXPlZmx+kteYJECJFhoofhq/2ZWF2jF43JHbC02IVPd+QmH0Z+djzVaZguZriEWeBHbwYWz7IIARzc4+dXmHGgQY2+ply8t1mF4No8rKnWwmYxiZ3BPcLtJLEbqTGTZ4JhHGTWyaahalrwd9yRTC+43paOjYuMURE8Oh5l9OiVjIjf82dzSiz4+AVVKnJ+CL089VTEB0g+PiVkYpS8/PzzuWisMYum5CLs0WM37Amzi00I0Fzwy2Fl8jQUTv0AzjPl1AJob4oBMlGElI1xun7/WiYGtubh3Q356H82H2ea8nBpVxZuBxSTDaWc/ELKSWgKEV4xwyVOxvKRXD4Fd6YgjqV9YNrkCULqxQwXeMBHSaoPlIDUcFTzB6b9ASJy+QwnxqipPsvaZSbDiX3sxKTd/lBCaIbjYxThHYrusjjP+fcD3zUBOli4t5O9codLMplH/pXMR3gaJvhxim0si59q/+rTS/b7B/hrRW7+UDuMAAAAAElFTkSuQmCC',
      'searchUrl': 'https://arenabg.com/en/torrents/?category=1&text=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|>Грешка<|Lost password/,
      'matchRegex': /no results found|Не са намерени резултати/},
  {   'name': 'ArenaBG',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://arenabg.com/en/torrents/?category=2&text=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|>Грешка<|Lost password/,
      'matchRegex': /no results found|Не са намерени резултати/,
      'TV': true},
  {   'name': 'BD-film',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAACXklEQVQoz22SXUgUcRTFz8zOrou7s7vK+kUu2gpq6lqGH0WIZqTSk4lRiUgISmaEVkIJQZpkZC4+hNajJPqQBkZRgYEWCAVaaGyuVKBmYePX7KwzOzgz/x5WWDPP071cftx7D0eH/0RRVHFZSaordZVblURp93Rn82biI63Hs6f9h4qyIyIiFaiaABNlPX2iMAS43e5glZdfsPTr97Io2R2277Oe4qPHZVGChtU/3AK3eaXmbGgDIaSmrkHUqJuN9Qcz0ls6u3le0FSlt6P1VnvH2Ojo+7G3wVMB0EFuPaBLyynoGXgO4G5z49dpD9HbAMzMLmgMe+5iC4DpL94QYLRFhpkTYxJzgu34y6HHd64CkCSl6ExTXFL2jGfOlZ4cAvxSgFsL/PDOA7j/cLCubaT6Wj+AyXcvAopZo6MePBoBAJqG0RxBdsjtdhdXbdtACGFZtr7Tm33ycm5JEyEkzpnLGAxWAM6schMbC4rMjPdWrvhi+5sBNchwK6I56rCw8ROAskVo39oCAIs9Iz6zPjq5svDUpRi7Ja9iwJFZBcBqP7DB03S4y24CAG5xigE0AJJs8IlhINGbW04AH4aCrj+JTDrP+/Wynxu8Vw0AUJntp32ytjhnsCaXHnMCSMjvU2QOAMWofpFWJSEtJaGrZzjkkivFKvj40sz5rtvlI6+mVMohyeEA4u1UVrzH+7oMwPWGin+iQRv3B9Tw1u4Jhj2iM8a11cpEXQfFLC0LfcOTy5/a9wifLuYGs6/WYmF5YVPbEqDyAGXSf+M/X9g7rdtiEqBzUIxEZD8U767hX6fGAYw5d8C1AAAAAElFTkSuQmCC',
      'searchUrl': 'https://www.bd2020.com/search.jspx?q=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': />0 条</,
      'both': true},
  {   'name': 'BT4G',
      'icon': 'https://bt4g.org/static/favicon.ico',
      'searchUrl': 'https://bt4g.org/search/%search_string_orig% %year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'ignore404': true,
      'spaceEncode': ' ',
      'matchRegex': /did not match any/},
  {   'name': 'BT4G',
      'icon': 'https://bt4g.org/static/favicon.ico',
      'searchUrl': 'https://bt4g.org/search/%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'ignore404': true,
      'spaceEncode': ' ',
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'BTDB',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGSUExURSIiIiMjIyUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU0NDU1NTY1NTY2Njc2Njg4ODo6Ojw8PD4+Pj8/P0FBQUJCQkNDQ0REREVFRUZGRkdHR0hISEpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1VVVVZWVldXV1hYWFpaWltbW1xcXF5eXmRkZGpqamtra2xsbG9vb3Nzc4CAgIKCgoWFhYeHh4iIiImJiYyMjI2NjY6Ojo+Pj5CQkJGRkZKSkpWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ+fn6GhoaKioqOjo6Wlpampqaqqqqurq6ysrK6urrCwsLGxsbKysrW0tLW1tba2tri4uLu7u7y8vL29vb6+vr+/v8DAwMHBwcPDw8TExMfHx8jIyMnJycrKys7OztDQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5dIIwhUAAAKDSURBVEjHnZZpV9NAFIbfRJAK0iiUpSw2YJFQS0UHq1IrRlJxAfcFUMCissuSAqVpCp2k93/7oVZKZen4fMuZ85ycmbnz3guqwEqORVVFBmRFjY4lrcp1HPtyVvVwo4S/SI1hfdU5VXCXYs34h+bYknuyYMZ9OBFf3DxBKMwN4FQG5gqVAp9swhk0TfLjQl734Ew8er5c4HotzqFW52XChAfn4pk4EuZ9qALffEkwQ6iKkFkUCnFUSbxABKLF1mqF1kUikBtD1cRcAq20VC+0rBBIhwA6wRoUEQYtJL0igjcJQwLqIowxFmqTEBxmjDE2HKwfYowNBeoAdDDG2O3r9QAgGYgCCKQ4d53cr5HaGXI45w7NRDKcO/nd6TDwpMAdl2dmugEgChWAmqa99Y0D2uh8v5PKE0/tfLhlU9bMFGgjCIOczfXtAj0DABVKURhtUMYp3XO1Q12k5Z6OKzdz9NTf95zTBAzKhBvUdfokA1AgF4WXWuQzLTUDniQtXAJCOYoD3u+04k2Q9UC7Z9IjAJCBouBwTpSQKwS8oW2/QcS5S+nI0WGpaVqbml6j/TuVwmvaajeIf5uatehrA0r/UNP0ENDSlKgQlAX6UZ+g/V7ICbL6AcilTSf8/vtZGi8XXvQOvnLIgEHWsL/rHWU1AErpWLOmeUDW3XLhMHNItNwJg9xdc9eh+UYAKqIArm3ads7e+zkiAxe/8FkPcCNl23Zm820AeHyYzeWyWx97ihdnSEBNUNO0/sBlAJC6BroloK5P07Rg+wUAbZqmaX3+mj+lIVx8wuUt/IDEn6hwCAjHjHiQCUeleBiLx714QxFuWeJNUbztijf2/xgdxIeTqsaf38SJgduTzNdjAAAAAElFTkSuQmCC',
      'searchUrl': 'https://btdb.eu/search/%search_string_orig%+%year%/0/',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /About 0 results/,
      'both': true},
  {   'name': 'Cilipro',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALxSURBVHja7JcxaxRRFIW/EbNqISJGC9sFf8BUaiHauNsphDOgIAhaGQux0VQJFqaxUCQiqJWKsKcTwWilhdqN+AMsbE1ERBujOBZv4s7Ozkx2NZDGy8Iy+/a+e+655973JsqyjI20TWywbTiAzcWHJEnK608lbbX9HLgHfGzazDYAkqr/IIFNr9erBlCyI/Pz812AOI4Pp2k6Y/s1cB14BXxddwZCBgLckjRbXIvjeHscx500TTvAR9ungafrCqBPnXZIOlDlEMcxwB7bB9YdQG4RMB3HcavOKU3TJds3c7CAy/7ZvwCYkHRuDbE9kLRU4K4IYS9wA3gL3FlLuJtLOwMcRNrRkP0KsDgk8MBDJDgraQqYMlwiCPdlAOPlZhFCSzCnxC168D7Uu2xfgBeVXQYTSNOF5+1IHaADXATuGn8AblcOIsFOQRBfYtozM7TTlHaaAtBO08z2LeBHDUEHBXXsTQKXgX1NGjgpmChSkpeFtoztH8ACKAOHwdK3FjCXf9dpZwl4WDuKBV1QVONNXssvJdWvWm3rFuyW7XdNDBxtcM4c+n6lBGp1iExTZG/YloCbkn42MVDfemH0PqxZ3i37PHbU1LrAp+bTUIBcHR5+AZ9r9j8l2CWMbCpKVNm6ax1G5Sbf5qDylypBE3T69DnPIRepwfbnutatvg9UsCDY0oMrwKQHgx+v1U7OhuFRXetGA1eyKMr+ZOKCKpT/ED7L+YhdAfYDHalpbEMCXeDZHzUXYpZLkOWHCYNA+jQIJjEza6q2b89VCN5YAg/R5EIQlcQ6QujA2LOR74SGN8MCLqp6tJQLnp8M98e5lM4avtVuNw6IkP2CwgCqtQERJlEEMNeD2TGTrRLfkwROUJFQMeamCuDXEnhSPe5HD26YopbNhjmg4DSVwGOPC8IhOCH4yt9eyVZH5zFDF3NB4UIxWH4PxV42LABXNWLwUUbxIrCYQFdwCHMG2FJY/w7cyw+qO4QhNZZF/19ONxrA7wEAeosRLlBGDTwAAAAASUVORK5CYII=',
      'searchUrl': 'https://www.cilipro1.xyz/search/',
      'mPOST': 'keyword=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /显示前0个/,
      'both': true},
  {   'name': 'CineCalidad',
      'searchUrl': 'https://www.cinecalidad.is/?s=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /in_title/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'CPS',
      'searchUrl': 'https://mycarpathians.net/browse.php?c194=1&c60=1&c10=1&c20=1&c181=1&c183=1&c192=1&c190=1&c70=1&c30=1&c40=1&search=%search_string%',
      'loggedOutRegex': /Nem vagy bejelentkezve!/,
      'matchRegex': /Nincs itt semmi|Nem található/,
      'both': true},
  {   'name': 'DDLW',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJXSURBVHjapJO7axRRFIe/O3eemUmym90QdzdP39Ei2KQRTGVlbyWxUFCw1yZFAqKFjdra6n9j418gqGChaHZ2XnvvzL0WsyLBYOOpDhzOj+93HsJay/+E+6/iw6PnNukusbC4SJIk+J6PxaK1JssLiixDnEZw7+DI9ocjBoMBy/0+cRLj+z5SugigMQ3VVJFl+d8CD56+sGe3thitrdLpdoniBON6GMchlJLaWrCGAINW+qTA/cNn9sr2VQYb68SdDm4Uo6RDZcAVDsqAJyzCGqQQLEiB87t5//GB3Tp3ge5oiJhfRIcR2nXJrGAlCthdW8IKw/mFkN2NZT6lBZ+z6s8Qe8MRcb+PmYshCBHSBcfBGoNFAPC9qinjlnisFMLKlmD/yaGNuj1sFOOHEY4rwREIAZO64YeqASgM6JnjBrB2tkYTxzhRTBCGTK0gKxS4DYUVfK0a4o5smwSYGfG40ihbzWYQhHiBT40grSoSCdIYpGkYRh4rkQeAMlCbFmE1Dul6siVwvQAhJIWu8aXL3qW1Uw+r0jWZbu3c3tkCaNd49+Ubu765yXyvx7dSMa0NbjiH4/sI3wcpaRBkusYzDV6tsWVFMy1bgsZYVNMwyUsmacHO5pAgjLDSRbguCMlEaz6kKYM4YHUhwSgfo6NWQGuN1g3pz2OKvOLW7s1TLbz/+IXLZzpc314/+UxlUTFViqmFtCh49PotThDieB6Fgb2L69y5cY0yHVPrXvsvr94hG90KFEVOnpcoBGHgow3ggOOAmuTkkxSA6fgYXZZtXmYsJjG/BgCm4wqyWfJJYwAAAABJRU5ErkJggg==',
      'searchUrl': 'https://ddl-warez.to/?search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Keine Ergebnisse/,
      'both': true},
  {   'name': 'Deildu',
      'searchUrl': 'https://deildu.net/browse.php?search=%tt%&cat=0&Lysing=1',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /Ekkert fannst!/,
      'both': true},
  {   'name': 'Demonoid',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADtUExURf///wEBAgcIBQ8QDg8SAxYbAxoaHCAlBygpJykxBysrKzM0MTU/Bjw9Oj8+Qj9HD0FARUJCQUVSCExMTkxXDk5OTlRTV1VmD1hYWFlfHl9fYmFwF2JhZWhoampqamtrbmt7FnBwcXJycnJydHR0dXWJGnd3dnh4eX2SH35+fYKCgoSbH4eHiYmJiIygIo6Nj5KlJJaWl5irJ56wKJ+en6O1LKm6Lqqqqq6/MbPEMrbHN7m5ubrHLLzMO8LPM8PRQMTExcjWRMvLy8zaSNHR0dHfStXiT9fX19roUt3d3ePj4+jo5+3t7fX19f7+/lUbTVQAAAABdFJOUwBA5thmAAAERklEQVQYGe3B7W8cVxXA4d89996Z3bF37bXjN+I4CCErRJWqVuLl//+IBEJUFLWq48SF2KntfbM9uzNzz7mMG6ANUgufEB94Hv73eP5zk6fxaOroTSb1Ff/OZOf2IZVrT+/4tR3uth0/YvK0vh58cu/Xnl7g5dfz8UHT8QOqk/qdf/FU3mwvA490+5ezr253D69qeoeVqqUg3tfLGqgOp+fl6VhYWUGgV1jD+NP5q9vd51ccLqbXzgmWII6O13eTmzfFybYnyLWrcfSeX30aSbB41Ux0WR7sb0RB29Xy8i7H0Tw82fYhFPCH8pZAL5C8ROtGH9++rn61DYZCUWw9W1+/me4/UUIopO2abQj0zHU+OolJnxwO6RCHIxsJOdqr11qEUIjpUksI9FZ+HV30hECRnTgEw4kJ1hBFCV6s0VnoQOg1ca2aTCD89bczj4DwnkcaCz6SND3EFoTezK9MzRKSLjf/wge8/fkr7zBNq2ZwBcIj35lqUqw4un8OBia8p25rK+eUtK3zEAg8KmuFDKRnJ6jDkEY8GL1TU7CkKyog8CirRkA9rYhkHM1n8SVgkDVbNmu7FQkQvpUQLIOBmZEhghloBrKZapdiAgIwObzI3gFZPSYmBuFUzDDIZKPnkwYPePhZ+3Xn932W7JzkTBaRIDGI91hWI6OqpHttj+c4Ts9sPInD4MQJEoOktO7W6w6Ig6qQnNRMVamn62r/3P3iS/dyo2m8iBMfqZf3dUL91ih67WarVGxuV9ooWkw4f7v3jduoX+6udY2X6Nvpjdv+yVAGF4tPsgNyWv7O8OMDbdkoJHw+exHqwWDlVIl+frmy02dDl1PbVXUhjmywcTJZXnyxPVFTbXdnFsQ6ZE0xv2z3Pr4YkXxmFbdWA3DgZi9m8eDo8vfLg0K9gvrjWQhNbl/Pi+2Phnk98oKbDncWmzigbo+mVbCR+6a2stVluxnc1tvJcPGw82JWNlI1mId612MC2S0mlE3VNfHpzhfdmOnhuVyM92bvHk5/HecVDNXANQwp1/Q627SigcYOBr9ZzC43OoSL7qNQ/VRXI6DwDdndjVwuH1zObr7p8rDONOXmelgth+MrBGafPVnf68MAkJjI3I1zHqiBPYwtB01aV6LTemdwAUIv+pu0ECJ5sMa1UmUcDXIzcBnPfWJs8dyPrwChdz540zUefB6u1c03cs74O6fzTSVDc19Z4PrgnJ7wqOwuAj0NdbKHDQMb3rkbHxQ03tVjv/pT6XjkeVTnZTcelZJYuZS2ssPcvDrb8yKW86v98uKP+ednPPL8XbqbSYjClW0570imn+/s5tJLN728fzt3J1/yrcA/pHSmoaje6b54wbVVPVjqopkvUhXbfHzGe47v7MSu7UxcHAaStrVzIvgi6sOKf3J8TzkqSXS09LwXT69brfgexwfKQfR8R63tGj7g+FdlLISeodo1/N9/xd8AcTxaeXm+9mUAAAAASUVORK5CYII=',
      'searchUrl': 'https://www.dnoid.pw/files/?query=%tt%',
      'loggedOutRegex': /Ray ID|security check to access|daily site maintenance|page is not available/,
      'matchRegex': /No torrents found/,
      'both': true},
  {   'name': 'DevilTor',
      'searchUrl': 'https://devil-torrents.pl/szukaj.php?search=%search_string_orig%+%year%&cat=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nic tutaj nie ma/},
  {   'name': 'DevilTor',
      'searchUrl': 'https://devil-torrents.pl/szukaj.php?search=%search_string_orig%&cat=7',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nic tutaj nie ma/,
      'TV': true},
  {   'name': 'Dl4All',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABFUExURRR6niup3UyZtU6btk+btlGdt1OeuFSeuFafuVeguVegulyiu16kvGC/5mGlvWG/5mSnv2TA52Wov2XB52epwMjIyP7+/jXV6UkAAADsSURBVEjHtZbHEoMwDERXCem9eP//U3MgeORuwaATg/chrZAY4IwBR1MsBACYAMwB9iSwawMAeICPYwtAFF0ZlgBDh+lReR1MGbY6VxUINB0AWoCIiAY2WvMcr8+RfiKCkuAThGWkQNLXSffpBS6TSrx+JKQAQMkkiMJoQD24CfAL3JsAgT/2DnsTOwlX9KQ7Kro5/l70EUiArq9GWEqUKwNEem3l1QCY9qoKMNfbioesvgFIH8CKPg9wDlAapmJJ/UDOsjpIAMkADyugj9YBzB7KG0eSvIlY3wPnAOvOknW8rQskUtsgB+vvzw8qG3cYjPoUcAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://dl4all.biz/index.php?do=search&subaction=search&story=%tt%&titleonly=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /yielded no results/,
      'rateLimit': 5000,
      'both': true},
  {   'name': 'DonTor',
      'icon': 'https://dontorrent.io/images/touch-icon-ipad.png',
      'searchUrl': 'https://dontorrent.io/buscar/%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /encontrado <b>0</,
      'both': true},
  {   'name': 'DW',
      'searchUrl': 'https://forum.dirtywarez.com/search/search?keywords=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|You must be logged/,
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'ETpl',
      'searchUrl': 'https://elitetorrent.pl/torrents.php?search=%search_string_orig%+%year%&category=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Connect Error/,
      'matchRegex': /Nie ma torrentów/,
      'both': true},
  {   'name': 'ETTV',
      'searchUrl': 'https://www.ettvcentral.com/torrents-search.php?search=%search_string%+%year%',
      'matchRegex': /Nothing Found/,
      'both': true},
  {   'name': 'EUC',
      'searchUrl': 'https://eliteunitedcrew.org/browse.php?search=%tt%&cat=0&incldead=1&btn=Search',
      'loggedOutRegex': /Not logged in/,
      'matchRegex': /nijedan torent/,
      'both': true},
  {   'name': 'EXTTor',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAeUExURT9RtT9RteLl9OPm9Ojq9vDx+fHy+vHz+vT1+////1he4nYAAAABdFJOUwBA5thmAAAAWklEQVRIx2NgYBTEAwQY8MuDVBBUIEgAjCpAVSAWigYC0RRIzkQDE4eqgon4wmEEKZiibAwHWBUgg0GrYEZ6ORyM5NgcDAqQ46K8cFgWIKP1BSEFlNfdhJoHAFcHWeyBUYH6AAAAAElFTkSuQmCC',
      'searchUrl': 'https://ext.to/search/?c=movies&q=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results found/},
  {   'name': 'EXTTor',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAeUExURT9RtT9RteLl9OPm9Ojq9vDx+fHy+vHz+vT1+////1he4nYAAAABdFJOUwBA5thmAAAAWklEQVRIx2NgYBTEAwQY8MuDVBBUIEgAjCpAVSAWigYC0RRIzkQDE4eqgon4wmEEKZiibAwHWBUgg0GrYEZ6ORyM5NgcDAqQ46K8cFgWIKP1BSEFlNfdhJoHAFcHWeyBUYH6AAAAAElFTkSuQmCC',
      'searchUrl': 'https://ext.to/search/?c=tv&q=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results found/,
      'TV': true},
  {   'name': 'GloTor',
      'icon': 'https://glodls.to/themes/NB-GloSite/images/favicon.ico',
      'searchUrl': 'https://glodls.to/search_results.php?search=%search_string%+%year%&cat=1&incldead=1&inclexternal=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nothing Found/},
  {   'name': 'GloTor',
      'icon': 'https://glodls.to/themes/NB-GloSite/images/favicon.ico',
      'searchUrl': 'https://glodls.to/search_results.php?search=%search_string%&cat=41&incldead=1&inclexternal=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nothing Found/,
      'TV': true},
  {   'name': 'HDenc',
      'icon': 'https://hdencode.com/wp-content/uploads/2016/03/413.ico',
      'searchUrl': 'https://hdencode.com/?s=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No content available/,
      'both': true},
  {   'name': 'HEVCBay',
      'icon': 'https://hevcbay.com/wp-content/uploads/fbrfg/favicon-32x32.png',
      'searchUrl': 'https://hevcbay.com/?s="%search_string%"',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /nothing matched/},
  {   'name': 'ilCorSaRoNeRo',
      'searchUrl': 'https://ilcorsaronero.link/argh.php?search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nessun torrent trovato/,
      'both': true},
  {   'name': 'ixIRC',
      'icon': 'https://ixirc.com/favicon.png',
      'searchUrl': 'https://ixirc.com/?q=%search_string_orig%+%year%',
      'matchRegex': /No results/},
  {   'name': 'ixIRC',
      'icon': 'https://ixirc.com/favicon.png',
      'searchUrl': 'https://ixirc.com/?q=%search_string_orig%',
      'matchRegex': /No results/,
      'TV': true},
  {   'name': 'KZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABCFBMVEUAAAARFSY7R4A8SIFAS4JKVIZPWIhdZI5pd6FwfKNwfaNxfqR1gKV5hKZ7haeDjKmJAACKmLiQnLqSnrqVCwiVGBWVobqXHBiYoruZDgmbpbydEAyeEw6fEw6kGRGoGhSoHBSpQDeqHRSsSUCssr+xKh+yVEjANCPCPC3Cyc7Dys7ESTbEys7FQzDFXErHSDfIz9LLgW/Lh3TOj3vSlYDU1c7V1s7V19jYXUPYcFzY2dHY2djZpY7bf2jbqJHcZk7h3c7khmfk4dXomnrqpoHq487q5NPt7d7w587w7N/x6M7x7dry2Lr269D37ND47dD53rr57dH64b767tH77tH87cz9787978+9KzODAAAAAXRSTlMAQObYZgAAAMlJREFUGBlFwdciA1EABNCZ0S4JFldfyeqi96jREgRBiMn//4n15BxQIiiJoERA+82p/qHL1+pc3+jLhQA1252Oc92P96dnAZz5jjn7ZmmjFQhA7VoWaz5fmF5uCQB7u86ir9aPbQ8QCBN2KZ7NLjo3HgBV7VJMDv2nIkCPdhbLk9fO3QoI93Ya73aSrTd7MwAcsdPoz9Vk98fDBCDX07Tuh/lkzwLAomPOXwdryVEgoIb/nQjQWKPQU9huVIoaPF0RQIlgUCAoEb/q0ya7wj1izQAAAABJRU5ErkJggg==',
      'searchUrl': 'http://kinozal.tv/browse.php?s=%search_string%+%year%&g=0&c=1002&v=0&d=0&w=0&t=0&f=0',
      'matchRegex': 'Нет активных раздач, приносим извинения. Пожалуйста, уточните параметры поиска'},
  {   'name': 'KZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABCFBMVEUAAAARFSY7R4A8SIFAS4JKVIZPWIhdZI5pd6FwfKNwfaNxfqR1gKV5hKZ7haeDjKmJAACKmLiQnLqSnrqVCwiVGBWVobqXHBiYoruZDgmbpbydEAyeEw6fEw6kGRGoGhSoHBSpQDeqHRSsSUCssr+xKh+yVEjANCPCPC3Cyc7Dys7ESTbEys7FQzDFXErHSDfIz9LLgW/Lh3TOj3vSlYDU1c7V1s7V19jYXUPYcFzY2dHY2djZpY7bf2jbqJHcZk7h3c7khmfk4dXomnrqpoHq487q5NPt7d7w587w7N/x6M7x7dry2Lr269D37ND47dD53rr57dH64b767tH77tH87cz9787978+9KzODAAAAAXRSTlMAQObYZgAAAMlJREFUGBlFwdciA1EABNCZ0S4JFldfyeqi96jREgRBiMn//4n15BxQIiiJoERA+82p/qHL1+pc3+jLhQA1252Oc92P96dnAZz5jjn7ZmmjFQhA7VoWaz5fmF5uCQB7u86ir9aPbQ8QCBN2KZ7NLjo3HgBV7VJMDv2nIkCPdhbLk9fO3QoI93Ya73aSrTd7MwAcsdPoz9Vk98fDBCDX07Tuh/lkzwLAomPOXwdryVEgoIb/nQjQWKPQU9huVIoaPF0RQIlgUCAoEb/q0ya7wj1izQAAAABJRU5ErkJggg==',
      'searchUrl': 'http://kinozal.tv/browse.php?s=%search_string%+%year%&g=0&c=1001&v=0&d=0&w=0&t=0&f=0',
      'matchRegex': 'Нет активных раздач, приносим извинения. Пожалуйста, уточните параметры поиска',
      'TV': true},
  {   'name': 'LimeTor',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIDSURBVHjavJM9a1NhGIavNzknHycmMUnpR7RVWooS0kFK0UVQXHStg7/AQfoDdOhP0MWlDioubiLYQaxSC2KolmKX1tQatJpi27Q2ycnJyfnIyeskmEZcAt7jw8MFz/3ct5BS0o18dKmuAcrhwZG0Jm/cvM6Vyxfp6zmO7Rp8+17k/eISr2cXWJpfFX/ui8MePFi+J88NT9AXtokHXBrNEKrfxfFCeOwy+y7P7VsPWV38KDoAvZP98tHd+6itMCdjLmltkz0rz/MvSbxWP+MD62STBgs/BrkzPcebxznRdsLRTIRceZ60N8ar4jPOpzcYjUfx+22M5hArJR1N2SGq+piYyjA4npZtAFV12Wq+ZbteYr/q0qMpnOlZ4dqopFBNcTqxSP4gQ0zdJaHlyF491W6iW7GISBstnicYGGbfHWNm3SCuGhh2lKdf+zCaJTYORjkW76VsFtoB1YKFXrNJJiCifaZkCTRxlgMzyE6tQoBLlJ0qyUgEwyyz9vJTO6Cy3GB7zyYqBNGQn4Qi8PnWUIISryWp1j0Uy6FYtNjaNKktNUTHG09MJWX2QoxU2E9A8SEAryWxrRZ6zeVn2aFUdth6UsdaczoBACPTKTkwFCTsFwgJnidpWB6G6aHrTUpzJuYHR/w1SL+VmoxIbUTBpwpA4uqSesGl+qLx7yT+9zL9GgBGkOqvU2XU0AAAAABJRU5ErkJggg==',
      'loggedOutRegex': /Ray ID|security check to access|Please turn JavaScript/,
      'searchUrl': 'https://www.limetorrents.info/search/movies/%search_string%+%year%/seeds/1/',
      'matchRegex': /csprite_dl14/,
      'positiveMatch': true},
  {   'name': 'LimeTor',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIDSURBVHjavJM9a1NhGIavNzknHycmMUnpR7RVWooS0kFK0UVQXHStg7/AQfoDdOhP0MWlDioubiLYQaxSC2KolmKX1tQatJpi27Q2ycnJyfnIyeskmEZcAt7jw8MFz/3ct5BS0o18dKmuAcrhwZG0Jm/cvM6Vyxfp6zmO7Rp8+17k/eISr2cXWJpfFX/ui8MePFi+J88NT9AXtokHXBrNEKrfxfFCeOwy+y7P7VsPWV38KDoAvZP98tHd+6itMCdjLmltkz0rz/MvSbxWP+MD62STBgs/BrkzPcebxznRdsLRTIRceZ60N8ar4jPOpzcYjUfx+22M5hArJR1N2SGq+piYyjA4npZtAFV12Wq+ZbteYr/q0qMpnOlZ4dqopFBNcTqxSP4gQ0zdJaHlyF491W6iW7GISBstnicYGGbfHWNm3SCuGhh2lKdf+zCaJTYORjkW76VsFtoB1YKFXrNJJiCifaZkCTRxlgMzyE6tQoBLlJ0qyUgEwyyz9vJTO6Cy3GB7zyYqBNGQn4Qi8PnWUIISryWp1j0Uy6FYtNjaNKktNUTHG09MJWX2QoxU2E9A8SEAryWxrRZ6zeVn2aFUdth6UsdaczoBACPTKTkwFCTsFwgJnidpWB6G6aHrTUpzJuYHR/w1SL+VmoxIbUTBpwpA4uqSesGl+qLx7yT+9zL9GgBGkOqvU2XU0AAAAABJRU5ErkJggg==',
      'loggedOutRegex': /Ray ID|security check to access|Please turn JavaScript/,
      'searchUrl': 'https://www.limetorrents.info/search/tv/%search_string%/seeds/1/',
      'matchRegex': /csprite_dl14/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'LimeTor-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIDSURBVHjavJM9a1NhGIavNzknHycmMUnpR7RVWooS0kFK0UVQXHStg7/AQfoDdOhP0MWlDioubiLYQaxSC2KolmKX1tQatJpi27Q2ycnJyfnIyeskmEZcAt7jw8MFz/3ct5BS0o18dKmuAcrhwZG0Jm/cvM6Vyxfp6zmO7Rp8+17k/eISr2cXWJpfFX/ui8MePFi+J88NT9AXtokHXBrNEKrfxfFCeOwy+y7P7VsPWV38KDoAvZP98tHd+6itMCdjLmltkz0rz/MvSbxWP+MD62STBgs/BrkzPcebxznRdsLRTIRceZ60N8ar4jPOpzcYjUfx+22M5hArJR1N2SGq+piYyjA4npZtAFV12Wq+ZbteYr/q0qMpnOlZ4dqopFBNcTqxSP4gQ0zdJaHlyF491W6iW7GISBstnicYGGbfHWNm3SCuGhh2lKdf+zCaJTYORjkW76VsFtoB1YKFXrNJJiCifaZkCTRxlgMzyE6tQoBLlJ0qyUgEwyyz9vJTO6Cy3GB7zyYqBNGQn4Qi8PnWUIISryWp1j0Uy6FYtNjaNKktNUTHG09MJWX2QoxU2E9A8SEAryWxrRZ6zeVn2aFUdth6UsdaczoBACPTKTkwFCTsFwgJnidpWB6G6aHrTUpzJuYHR/w1SL+VmoxIbUTBpwpA4uqSesGl+qLx7yT+9zL9GgBGkOqvU2XU0AAAAABJRU5ErkJggg==',
      'loggedOutRegex': /Cloudflare|Ray ID|security check to access|Please turn JavaScript/,
      'searchUrl': 'https://limetorrents.unblockit.club/search/movies/%search_string%+%year%/seeds/1/',
      'matchRegex': /csprite_dl14/,
      'positiveMatch': true},
  {   'name': 'LimeTor-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIDSURBVHjavJM9a1NhGIavNzknHycmMUnpR7RVWooS0kFK0UVQXHStg7/AQfoDdOhP0MWlDioubiLYQaxSC2KolmKX1tQatJpi27Q2ycnJyfnIyeskmEZcAt7jw8MFz/3ct5BS0o18dKmuAcrhwZG0Jm/cvM6Vyxfp6zmO7Rp8+17k/eISr2cXWJpfFX/ui8MePFi+J88NT9AXtokHXBrNEKrfxfFCeOwy+y7P7VsPWV38KDoAvZP98tHd+6itMCdjLmltkz0rz/MvSbxWP+MD62STBgs/BrkzPcebxznRdsLRTIRceZ60N8ar4jPOpzcYjUfx+22M5hArJR1N2SGq+piYyjA4npZtAFV12Wq+ZbteYr/q0qMpnOlZ4dqopFBNcTqxSP4gQ0zdJaHlyF491W6iW7GISBstnicYGGbfHWNm3SCuGhh2lKdf+zCaJTYORjkW76VsFtoB1YKFXrNJJiCifaZkCTRxlgMzyE6tQoBLlJ0qyUgEwyyz9vJTO6Cy3GB7zyYqBNGQn4Qi8PnWUIISryWp1j0Uy6FYtNjaNKktNUTHG09MJWX2QoxU2E9A8SEAryWxrRZ6zeVn2aFUdth6UsdaczoBACPTKTkwFCTsFwgJnidpWB6G6aHrTUpzJuYHR/w1SL+VmoxIbUTBpwpA4uqSesGl+qLx7yT+9zL9GgBGkOqvU2XU0AAAAABJRU5ErkJggg==',
      'loggedOutRegex': /Cloudflare|Ray ID|security check to access|Please turn JavaScript/,
      'searchUrl': 'https://limetorrents.unblockit.club/search/tv/%search_string%/seeds/1/',
      'matchRegex': /csprite_dl14/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'MVG',
      'searchUrl': 'https://forums.mvgroup.org/maintracker.php?filter=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgotten my password/,
      'matchRegex': /btsmall.gif/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'MVG-F',
      'searchUrl': 'https://forums.mvgroup.org/forumtracker.php?filter=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgotten my password/,
      'matchRegex': /btsmall.gif/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'myGully',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADPUExURQAAAAkJCQsLCwsgABAQDxUhDhYWFRYWFhkZGRklEhoZGRoaGRoaGhsbGh4eHR4eHh8fHyIiISMiIiMjIiQkIycmJicnJikpKCsrKiwrKywsKy4tLS4uLS87JzEwMDMyMjMzMzU1NDkvJzo6OT08Oz8/PklIR0tBOExLSk5NTFBQTlVUU1lZV1pKO1pZWFxcWl1cWl5dXGJhX2JhYGJiYGtZSG1aSXVjUnZkU3h4eHtoWHxqWX9sXIBuXYVzYod0Y499a5F+bayNcczMzP///xQAxwgAAACvSURBVBjTNY9XEsJACEDRVRN77zXGrmuPil2S+59JWOMbPuANQ4FAIINJwZRPxA2+jWJBd5zMG+1tHz8kgq7uOK6ErsOGBTquL4DaIws6N2znN04NDlMCKlabvQBASeyOLLBYawXg+yxhhSzsWKnGhRHLtXSkcuVAKRYKFtJxiqbz4VCYvbSsTWTCtYDmDi9igaCSo4c2p3toZQuVegdv9H9uiFnEC+nwW1GatDbpF7GULSad5I+2AAAAAElFTkSuQmCC',
      'searchUrl': 'https://mygully.com/search.php?do=process&quicksearch=1&childforums=1&exactname=1&query=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|404 Not Found|Du bist nicht angemeldet/,
      'matchRegex': /lastpost.gif/,
      'positiveMatch': true,
      'rateLimit': 4200,
      'both': true},
  {   'name': 'NNM',
      'searchUrl': 'https://nnmclub.to/forum/tracker.php?f[]=731&f[]=733&f[]=730&f[]=732&f[]=230&f[]=659&f[]=231&f[]=660&f[]=661&f[]=890&f[]=270&f[]=218&f[]=219&f[]=954&f[]=888&f[]=217&f[]=1293&f[]=1298&f[]=320&f[]=677&f[]=1177&f[]=319&f[]=678&f[]=885&f[]=908&f[]=1310&f[]=909&f[]=910&f[]=911&f[]=912&f[]=221&f[]=222&f[]=882&f[]=889&f[]=225&f[]=226&f[]=227&f[]=1296&f[]=891&f[]=1299&f[]=682&f[]=694&f[]=884&f[]=1211&f[]=693&f[]=913&f[]=228&f[]=1150&f[]=1313&f[]=1312&f[]=321&f[]=255&f[]=906&f[]=623&f[]=622&f[]=621&f[]=632&f[]=627&f[]=626&f[]=625&f[]=644&f[]=635&f[]=634&f[]=638&f[]=646&f[]=1155&f[]=1156&f[]=1099&f[]=1098&f[]=892&f[]=668&f[]=669&nm=%search_string_orig%+%year%',
      'matchRegex': 'Не найдено'},
  {   'name': 'NNM',
      'searchUrl': 'https://nnmclub.to/forum/tracker.php?f[]=658&f[]=232&f[]=1221&f[]=1220&f[]=768&f[]=1300&f[]=922&f[]=770&f[]=1320&f[]=780&f[]=781&f[]=1322&f[]=769&f[]=706&f[]=577&f[]=894&f[]=578&f[]=580&f[]=579&f[]=953&f[]=581&f[]=806&f[]=714&f[]=761&f[]=809&f[]=924&f[]=812&f[]=591&f[]=588&f[]=589&f[]=598&f[]=652&f[]=593&f[]=587&f[]=584&f[]=586&f[]=585&f[]=596&f[]=614&f[]=623&f[]=622&f[]=621&f[]=632&f[]=627&f[]=626&f[]=625&f[]=644&f[]=635&f[]=634&f[]=638&f[]=646&nm=%search_string_orig%+%year%',
      'matchRegex': 'Не найдено',
      'TV': true},
  {   'name': 'OxTor',
      'icon': 'https://www.oxtorrent.tv/themes/default/img/favicon.ico',
      'searchUrl': 'https://www.oxtorrent.tv/recherche/%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Pas de torrents disponibles/,
      'both': true},
  {   'name': 'PB',
      'searchUrl': 'https://pb.wtf/tracker/?ss=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Не найдено|No matches found/,
      'both': true},
  {   'name': 'ProStyleX',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAMUExURQAAACcfv2TZ+v///146RIcAAAA7SURBVAjXYwgFAgYwEf7/fyhD3KpVVxnCGRhMGUIf2NmiEBogguEvkLD/yxDeYP+VIY5BH6otFEwAAQBlTx1G4I9t0QAAAABJRU5ErkJggg==',
      'searchUrl': 'https://prostylex.org/search.php?c1=1&c2=1&c3=1&c4=1&c5=1&c6=1&c7=1&c8=1&c9=1&c10=1&c65=1&c68=1&search=%search_string%&cat=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No torrents were found/},
  {   'name': 'ProStyleX',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAMUExURQAAACcfv2TZ+v///146RIcAAAA7SURBVAjXYwgFAgYwEf7/fyhD3KpVVxnCGRhMGUIf2NmiEBogguEvkLD/yxDeYP+VIY5BH6otFEwAAQBlTx1G4I9t0QAAAABJRU5ErkJggg==',
      'searchUrl': 'https://prostylex.org/search.php?c12=1&c13=1&c14=1&c15=1&c17=1&c65=1&c68=1&search=%search_string%&cat=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No torrents were found/,
      'TV': true},
  {   'name': 'RARBG',
      'searchUrl': 'https://rarbgweb.org/torrents.php?imdb=%tt%&order=size&by=DESC',
      'loggedOutRegex': /something wrong|Please wait|enter the captcha|too many requests/,
      'matchRegex': /imdb_thumb.gif/,
      'positiveMatch': true,
      'rateLimit': 4000,
      'both': true},
  {   'name': 'RareFilm',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA7VBMVEUAAAD//////////////////+3///L///L/3r3/4L3/3br/3rr/2bP/2rL/wIH/v3z/v37/vnr/vHb/u3X/uXL/uHD/t2v/smT/o0b/oUH/nDj/lyz/lin/lCX/lSf/kiL/jRf/jRf/jBb/ixT/ihH/iQ//iA7/hwz/hgn/hAf/hQf/gQH/ggD/ggD/hAD/igD/jQX/jgD/jwH/lAH/nhn/nxD/owL/pi//pw7/sQz/sVL/uV7/uj7/wTD/xFX/xkL/x3L/0oz/24T/3GL/3Xz/3an/56v/7Yv/7cL/87r/+tn/++f//vr//vv///6LyAiWAAAALXRSTlMAAgQFBg4TFD5CQ0ZKTH2AgIKGh4uNkZm3vMTS09bW2+Tm6Onr7e/y8/X2+/xz1yocAAAAo0lEQVQYGQXBCU7DMAAAMOcoXTpxTuL/70MTYqjHupIEOyCfpnLu8329VzLj8/tpeDmGvl7XQzJePrM2Pg7Dq73F/HyBnOByjrm8QcxPED4ecSqQQwRTyQXE1GNDKPEMYggZTBlIqUcgLiCHEMEaNzBICfoSlxWykGHe4v0HaqsN/XtPrYaJv9N+6/r1tyZ1f6Shtrn25et2CMjjVKY+b9ve+AepX0NhemW8QgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://rarefilm.net/?s=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nothing Found/,
      'both': true},
  {   'name': 'Rarelust',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAwUExURQAAAAQIEA0ZMBAQDxIhQB86cChLjzAvLTZkvzpsz0A/PEN970iF/4+Nh7+8tP/78BtqQJIAAADPSURBVCjPY2BAB8xVq5YbqriAgJMASID93ru3RRkdINCmABLgev//35KeMyBwMgSkBkng9AyQGiQBoJogAVSB09MUwIaW9ACVd3TuOXPmhAPYWpMeoIEurnPAAiDA0gNiMWXuQRVgVJ2DpAUkBRGHGooQgFpLlADUUIQA1FqooRCHgZwOtRbidJDnoA6D+w1FAKwAqgUhADUUoQVq7ekZoOBACrGTIaDgACmBOwzkLhSXglyO6n2o0xEBBPUcCDBlgKMRSgEBowo4oqEUGgAA7xjvsO09qI8AAAAASUVORK5CYII=',
      'searchUrl': 'https://rarelust.com/?s=%tt%',
      'matchRegex': 'Nothing Found'},
  {   'name': 'RlsBB',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEXtJCT///8UEiYsAAAAJElEQVQI12P4/58BiA4fZpg4kWHmTBCaPJmhvR1EQrhwEbBKABs6FilYmuihAAAAAElFTkSuQmCC',
      'searchUrl': 'http://search.rlsbb.ru/Home/GetPost?phrase=%tt%&pindex=1&content=true&type=Simple',
      'goToUrl': 'http://rlsbb.ru/?serach_mode=light&s=%tt%',
      'loggedOutRegex': /Ray ID|security check to access/,
      'matchRegex': /"results":\[\]|Not Found/,
      'rateLimit': 250,
      'both': true},
  {   'name': 'RlsBB-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEXtJCT///8UEiYsAAAAJElEQVQI12P4/58BiA4fZpg4kWHmTBCaPJmhvR1EQrhwEbBKABs6FilYmuihAAAAAElFTkSuQmCC',
      'searchUrl': 'http://search.proxybb.com/Home/GetPost?phrase=%tt%&pindex=1&content=true&type=Simple',
      'goToUrl': 'http://search.proxybb.com/?serach_mode=light&s=%tt%',
      'loggedOutRegex': /Ray ID|security check to access/,
      'matchRegex': /"results":\[\]|Not Found/,
      'rateLimit': 250,
      'both': true},
  {   'name': 'RMZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADzUExURf///zY2Njc3Nzg4ODk5OTw8PD4+PkFBQUNDQ0VFREVFRUZGRkdHR0hISExMTE5OTlRUVFVVVVZWVldXVllXUVtbW1xcXF9fX2VlZWdkWmtra3BsY3Bwb3NuYnNzc3R0c3h4eH5+fn9/f4B5ZoJ6ZIKAe4KCgIKCgoN/dIOBeYR8YIV+ZIWEg4d9YYd+Yoh+Y4uCZ4yDaIyMjI6Eao6Fa5CGbJKSkpOSjpOTk5SLcpaWlpeOdpmUh5qRepycnJ+XgKCYgqaknKempKqkkaqkk6ykkaymlKynma2ola6pnbOxqLW1tbiyoru3qLy4rr27t8TBt6S1Q0UAAAABdFJOUwBA5thmAAAAm0lEQVQY043NuwrCMABA0ds0TUmwImhRHASpII7+/+w3ODi4FlFaaPqgT4dmcvKOZ7nwk2d8vKkgQd1JEA8hbWPLI8bs2RhzQcA1ngYN7VYDCJAZ9RrqOHSAQPjQHtRihlSzssipDxw8c3P6YNRLhTMsRXQDosF0M5x1vgIkunQX1e+AgODtLnJQQINfOOiwQMU0OqhIgWws+Ksvvwcr+/YPaK8AAAAASUVORK5CYII=',
      'searchUrl': 'https://rmz.cr/search/%search_string%/titles/exact/m',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No movy available/},
  {   'name': 'RMZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADzUExURf///zY2Njc3Nzg4ODk5OTw8PD4+PkFBQUNDQ0VFREVFRUZGRkdHR0hISExMTE5OTlRUVFVVVVZWVldXVllXUVtbW1xcXF9fX2VlZWdkWmtra3BsY3Bwb3NuYnNzc3R0c3h4eH5+fn9/f4B5ZoJ6ZIKAe4KCgIKCgoN/dIOBeYR8YIV+ZIWEg4d9YYd+Yoh+Y4uCZ4yDaIyMjI6Eao6Fa5CGbJKSkpOSjpOTk5SLcpaWlpeOdpmUh5qRepycnJ+XgKCYgqaknKempKqkkaqkk6ykkaymlKynma2ola6pnbOxqLW1tbiyoru3qLy4rr27t8TBt6S1Q0UAAAABdFJOUwBA5thmAAAAm0lEQVQY043NuwrCMABA0ds0TUmwImhRHASpII7+/+w3ODi4FlFaaPqgT4dmcvKOZ7nwk2d8vKkgQd1JEA8hbWPLI8bs2RhzQcA1ngYN7VYDCJAZ9RrqOHSAQPjQHtRihlSzssipDxw8c3P6YNRLhTMsRXQDosF0M5x1vgIkunQX1e+AgODtLnJQQINfOOiwQMU0OqhIgWws+Ksvvwcr+/YPaK8AAAAASUVORK5CYII=',
      'searchUrl': 'https://rmz.cr/search/%search_string%/titles/exact/s',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No tv show available/,
      'TV': true},
  {   'name': 'RPTor',
      'icon': 'https://rptorrents.com/themes/Dark/images/favicon.ico',
      'searchUrl': 'https://rptorrents.com/torrents-search.php?c37=1&c6=1&c7=1&c32=1&c9=1&c10=1&c11=1&c12=1&c18=1&c33=1&c40=1&c41=1&search=%search_string_orig%+%year%&incldesc=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found|Nu a fost gasit nimic/},
  {   'name': 'RPTor',
      'icon': 'https://rptorrents.com/themes/Dark/images/favicon.ico',
      'searchUrl': 'https://rptorrents.com/torrents-search.php?c14=1&c15=1&c16=1&c17=1&c18=1&search=%search_string_orig%&incldesc=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found|Nu a fost gasit nimic/,
      'TV': true},
  {   'name': 'RuT',
      'searchUrl': 'https://rutracker.org/forum/tracker.php?f=100,101,103,1105,1114,1213,1235,124,1247,1278,1280,1281,1327,1363,1389,1391,140,1453,1457,1467,1468,1469,1475,1543,1576,1577,1666,1670,187,1900,1908,1936,194,1950,2076,208,2082,209,2090,2091,2092,2093,2107,2109,2110,2112,212,2123,2139,2159,2160,2163,2164,2166,2168,2169,2176,2177,2178,2198,2199,22,2200,2201,2220,2221,2258,2323,2339,2343,2365,2380,2459,249,2491,251,2535,2538,2540,294,312,313,33,352,376,4,484,500,505,511,521,539,549,552,56,572,599,656,671,672,7,709,752,821,822,851,863,876,877,893,905,921,93,930,934,941,97,979,98&nm=%search_string_orig%',
      'loggedOutRegex': /Введите ваше имя/,
      'matchRegex': 'Не найдено'},
  {   'name': 'RuT',
      'searchUrl': 'https://rutracker.org/forum/tracker.php?f=103,1102,1105,1114,1120,1214,1242,1248,1278,1280,1281,1288,1301,1327,1359,1363,1389,1391,1453,1459,1460,1463,1467,1468,1469,1475,1493,1498,1531,1537,1539,1574,1690,1803,193,1938,1939,1940,195,2076,2082,2104,2107,2110,2112,2123,2139,2159,2160,2163,2164,2166,2168,2169,2176,2177,2178,2323,235,2380,2412,242,249,2491,251,2535,2538,266,294,315,325,387,489,500,534,552,56,594,599,607,656,671,672,694,704,717,718,721,752,775,781,815,816,819,821,825,842,851,863,864,876,893,915,97,979,98&nm=%search_string_orig%',
      'loggedOutRegex': /Введите ваше имя/,
      'matchRegex': 'Не найдено',
      'TV': true},
  {   'name': 'Rutor',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACs0lEQVQ4y42TTWxUZRiFn+/e7947d6bTmTYyzhQQ6g/RSq0LNRh0ZVi4UjYuDGwkunOlLpSwIHFt4kZjQrpxEo2JMZrGgCTYJob6UwMNaAEpZGQYBoZphU47nd6f48LYpEklnvV58p43533hHlKnuqLlz9bu5TH/Cbdfj7l4oYY1ll2Pl03x44D/KzWfXdOnhYsqO+Pa4VY1njuvxli0mdfZAC6/H2mu7y5Hp3/lYPcSTWeY0YHddEYMH8z9rOlMW0tvRptPXd0fa5YFPed+J3LH9XK2ple92xryZnT4kbP6/tFr2hec0EluqTXa2QhHz0tTXNVY+I0IJvVe7rpu+tJUcFdlvyY4rZMDDX3UX1Mu/ELHnN90s/xPEqXbE53grEK3KtxJvdt3TZEvdWyiY7mmMAvC+Uv7g3M6k19R6P0gnKrG3Wl1S3K4c3+PegBd38P4/ZxWk1OFK7xtJ9lHkdf8HBByWUXybkzJhmAzKBtCpW7NwExWX/kN3KROGmeYcmAqvQFpgTrn+dAbY5ket61HO7J045iMU2DY2WXC2awFYOvgACOtDOf8JbZqG3uTB2haw0TUoOL8zlvBDkyUp+Yu0XZXeEIBZT9dr9E80ww56A1BusA7WcPnfsDXxuUTMwzdPJXE8FScZc60SNIee9K+9LHRCwB2vYq9boU3nEVetCGv9I6TqI8j5iFe8krMJn/yUzDPoexuvjTXecEbdM2pnRtOWZ0td5hfXeQwvzCxWgSvAPEiQSJ6NgFnherwNnb29zM0v8U82CptuMR67ukWc2s1JlYXwfEhcmGtQi8pQa8M8X0cuPQjZ5ZmwOT/5dZX2G6+fVh/FG8x4lxBpg0mQsbFBmBd4QddskGRPfZJrmbiTb9RjWKEkojEF9YHx09JPR/HpGCFi4Mb+Wbw8nryvwGGMDDB+5wk2wAAAABJRU5ErkJggg==',
      'searchUrl': 'http://rutor.info/search/0/0/010/0/%tt%',
      'loggedOutRegex': /Connection refused|Gateway Time-out/,
      'matchRegex': 'Результатов поиска 0',
      'both': true},
  {   'name': 'seleZen',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABnRSTlMAAAAAAABupgeRAAAGKElEQVRIx41WW28cSRU+36nqmZ7bju3Y8SV24rXDJiaOnUiLtUJmJR6CeEALSDzzwAsv/ATEv9gfsAj2CSSE0C6wEuQhbHaRNmgDigIhydpOYo/j68x4eqa6qw4PVT0zMSFsqTXT09Xzndt3vlOgVy6goFBiLgMRSBMxmMrlYs8kpnfiXGJdIpS+CuF/bTBipeqKyyAF+NdEhJihI52lmXNORIQyJ53MtkR6X9YASGk1qlUd0ESSPxYQlOYssyICIgIJhX2hLLOtzB4R2VNo6r8dL0TTimvAqS0opeK4mGZZcEwI6F8MxMyxE3PKxgsozOVCNKW5RMBQiOE+irSOlEkzEPwS6tsiBjMiRixihLKXGGDExWhacZyXF4BHBwAwO6LUCmsNpQhMRMAgkhxEM2Ir3X4cyL90sTCrVDl3KBgQEQKgValSnb0wN79wfmS0npp0t7G3+Xij8eyZSbriLAkRRHylSKzrGLPt49B5+ONa1wjBJADyiWDFWr/+xsXv/eA762+vfWVxeqwWW5M92jo4OT58992ff/i7j2yWkXMiAhISEhHNrzkxadoIBpjLWo8CTCFseCPEYB1dXln+0Y9/+M47X1eg3Z2DxtPdaqk4N1Wvzo9PnB0nMAgCgCAkPgQiiqJRa5vOJZqIIjWqEPlskAiJCBEYEI7L8Xe//+319euH+8e/fP+Dm3++3Tw6rpTjudmphfNTN/90KzM9ck6cIKRWfKYYqlKaaJ1saUZRqZr4YojkWRISImByeurGjbXXZ6rvvf/RL9771dHzhktTEfnHZ8REzlqyVsT5vwYEgjcjVGIUtOIqqDDcd54YPlnVWhVQrbY52D9KOh3xiM6RkPX5FhnQXPqsYSISUcwVVqoK9nxEn/O+CCKSmrTTTkzXXF95Y2bunIoKxArgYQYTOG+XfuP5W9ZcUYVomhHlT9nvgNhzCEqvr7+5trIwPXVm7sJcO8mO2x1jUicDHCJ4kwA42CYi9luqEE2DVW7fEzQsAhuT7h22r169PDs1ennx3DfffnNpeckiOmqedLsm5AQAcWAfMwji0QECq2I0A+p3YmiA/k8R2dl+fu/BVrlWn5keH6tXFuanrl278rW1lb2jk+2d59bavCuZhrIDIoCJWBX0JAbKQ6C+wnguicvs0yfbtz+9e/f+Rrtnx0brF86NXVqYWb1+5eFGY3PjiVg78I4g6OsAE6AK+qwPR14q4SLkRJw9abYe3H906y9/++TOPxHFiwsz4xP12ujYx7futI+bOTs9CRl9FBEVqTNAFGRzCFop1joS64I4iYizJkl2nu3cvfd45sL5+YvnSpXKp7fvbn2xFbpgQFN4EjgxbKUbnubMI4IQTU6dXb22RMxE3HeHnLg0293e+fj250nXaV0cGRkBAmGGLxCI2Lmutq6teWS4DEQE8G7jYH//iMA0CJjATGBmBajDI9M56XVOkuD4sAiE8klmW9raluiMUaRcqPyHdWIzNz45sbyytLm102jsp8YAKJRKl68u3fjWN6rV+PGjZxsbTwLrh4oYGOK61jW1k66VluaygDgQNLQCa3XpytJPf/YTIffZ5w83thomzc5Ojr/11urixdlms/f7D27uPNsFKxLkZQjlJqLU5WqapnuRPsNcyFufQhuzAlCtxhcXJpeW5y1gLImQMbS5sfebX//hw9/+sZf0SPz4BPnpJEJETkyaPh9QsliYKxb6HYcgRsy1eu362upXly8Vy6Wrq5cAdXjQfPjvzb9+cuf+3+8lrROxzmtf0NM8Tz3ztGs2hkdmVCouavXaqQMMAFJKRVExjuNSzMymZ7pJkvaMWBswfXmFxFNFkLnjTu+BiHmhqRRX4sKC4hIkH0v5/BSEuPKBLf3ZgoEEBy5Z6Sa9f1nXPn2qEEmdSxTXwNGLvA6BwzsrOb4fqmAMFBRWut3eQ+taLz8XiRjn2goxocAYkvZQ97wlguRyf4L4zFjXTMwL6C852YmkmTsGEXOZWA2zajBSaDBkEEQ3M+l2kn7hJPmyh1/F1UhPRGoEKIYDR3hZkMuJiBMxqT1Ms91Tjv9/A/lJraRVXas6o8IckWgCgayT1LpOZo8ye+yk8wqE/wCeuu+Yfgs21wAAAABJRU5ErkJggg==',
      'searchUrl': 'https://selezen.net/index.php?do=search&subaction=search&story=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /никаких результатов/,
      'both': true},
  {   'name': 'SkT',
      'searchUrl': 'https://sktorrent.eu/torrent/torrents.php?search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nenasli ste co ste/,
      'both': true},
  {   'name': 'SolidTor',
      'icon': 'https://solidtorrents.net/favicon.png',
      'searchUrl': 'https://solidtorrents.net/api/v1/search?q=%search_string_orig%+%year%&category=video&sort=seeders',
      'goToUrl': 'https://solidtorrents.net/search?q=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /value":0/},
  {   'name': 'SolidTor',
      'icon': 'https://solidtorrents.net/favicon.png',
      'searchUrl': 'https://solidtorrents.net/api/v1/search?q=%search_string_orig%&category=video&sort=seeders',
      'goToUrl': 'https://solidtorrents.net/search?q=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /value":0/,
      'TV': true},
  {   'name': 'SW',
      'searchUrl': 'https://main.starwarez.to/index.php?search/666/&q=%tt%&o=date',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /search_results/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'T2K',
      'searchUrl': 'https://torrentz2k.xyz/search/',
      'loggedOutRegex': /Ray ID|security check to access|Please turn JavaScript/,
      'matchRegex': /No Results Found/,
      'mPOST': 'q=%search_string%&category=movies&x=0&y=0'},
  {   'name': 'T2K',
      'searchUrl': 'https://torrentz2k.xyz/search/',
      'loggedOutRegex': /Ray ID|security check to access|Please turn JavaScript/,
      'matchRegex': /No Results Found/,
      'mPOST': 'q=%search_string%&category=tv&x=0&y=0',
      'TV': true},
  {   'name': 'TGx',
      'icon': 'https://torrentgalaxy.to/common/favicon/favicon-16x16.png',
      'searchUrl': 'https://torrentgalaxy.to/torrents.php?search=%tt%',
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'TorDL',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUFMFwLNmINfsASgcMUP2sYhcYeSXUeicoljc4lmt4oU38tktIwn+AyXYk1l9Y7ZpE8peM9nNtFod9Jq+ZOpuRWq+hXsuldsOxktfBluOxrufRxvPdzv/B2v/qBxvOOzPaa0vml1/uu2/213v9ENtEwAAAAb0lEQVQYGQXBQU7DABAEMCdaBDcKPfP/17XqEaTMDvbxAwCY/QAAv2cBgM4WAOy0nuAbdLa+PNwV7LSIvnCj57btdXX3c5/tThdrY2N1EkQuuUQmQWVlRSbBXSIRmQaoh1v0eHsHAH+zAQB7nACAfwQvUdbdx9fFAAAAAElFTkSuQmCC',
      'searchUrl': 'https://www.torrentdownloads.me/search/?new=1&s_cat=0&search=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'TorDL-Proxy',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAbFBMVEUFMFwLNmINfsASgcMUP2sYhcYeSXUeicoljc4lmt4oU38tktIwn+AyXYk1l9Y7ZpE8peM9nNtFod9Jq+ZOpuRWq+hXsuldsOxktfBluOxrufRxvPdzv/B2v/qBxvOOzPaa0vml1/uu2/213v9ENtEwAAAAb0lEQVQYGQXBQU7DABAEMCdaBDcKPfP/17XqEaTMDvbxAwCY/QAAv2cBgM4WAOy0nuAbdLa+PNwV7LSIvnCj57btdXX3c5/tThdrY2N1EkQuuUQmQWVlRSbBXSIRmQaoh1v0eHsHAH+zAQB7nACAfwQvUdbdx9fFAAAAAElFTkSuQmCC',
      'searchUrl': 'https://torrentdownloads.unblockit.club/search/?new=1&s_cat=0&search=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'TPB',
      'searchUrl': 'https://apibay.org/q.php?q=%search_string%&cat=201,202,207,209',
      'goToUrl': 'https://thepiratebay.org/search.php?q=%search_string%&cat=201,202,207,209',
      'loggedOutRegex': /Ray ID/,
      'matchRegex': /No results/},
  {   'name': 'TPB',
      'searchUrl': 'https://apibay.org/q.php?q=%search_string%&cat=205,208',
      'goToUrl': 'https://thepiratebay.org/search.php?q=%search_string%&cat=205,208',
      'loggedOutRegex': /Ray ID/,
      'matchRegex': /No results/,
      'TV': true},
  {   'name': 'TPB-Proxy',
      'searchUrl': 'https://apibay.org/q.php?q=%search_string%&cat=201,202,207,209',
      'goToUrl': 'https://tpb.cnp.cx/search.php?q=%search_string%&cat=201,202,207,209',
      'loggedOutRegex': /Ray ID/,
      'matchRegex': /No results/},
  {   'name': 'TPB-Proxy',
      'searchUrl': 'https://apibay.org/q.php?q=%search_string%&cat=205,208',
      'goToUrl': 'https://tpb.cnp.cx/search.php?q=%search_string%&cat=205,208',
      'loggedOutRegex': /Ray ID/,
      'matchRegex': /No results/,
      'TV': true},
  {   'name': 'TVU',
      'searchUrl': 'https://tvunderground.org.ru/index.php?show=search&search=%search_string_orig%+%year%',
      'matchRegex': /no results|aucun résultat|keine Ergebnisse|encontrado resultados|ha dato risultati|leverde niks|ingen resultat|Nie Znaleziono|sonuç getirmedi/},
  {   'name': 'TVU',
      'searchUrl': 'https://tvunderground.org.ru/index.php?show=search&search=%search_string_orig%',
      'matchRegex': /no results|aucun résultat|keine Ergebnisse|encontrado resultados|ha dato risultati|leverde niks|ingen resultat|Nie Znaleziono|sonuç getirmedi/,
      'TV': true},
  {   'name': 'Videoteka',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'http://videoteka.org/?p=torrents&pid=10&keywords=%tt%&search_type=description',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /no results found|Nič ni najdeno/,
      'both': true},
  {   'name': 'W-v3',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://warez-v3.org/search.php?keywords=%tt%&sr=topics',
      'loggedOutRegex': /Cloudflare|Ray ID|you are not permitted/,
      'matchRegex': /Search found 0/,
      'both': true},
  {   'name': 'WB',
      'searchUrl': 'https://www.warezbook.org/?q=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /<ul>\s*<\/ul>/,
      'both': true},
  {   'name': 'WC',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFMSURBVDjLY3iKCo6GibNIxpxACDCgyi/hZAAB3vWYCjbGWjsVbuRlgACRq2gKHsczoIJaNAWVaPIMHqgKbvGiK3BCVbAMXZ4hC1XBJHR51sOoCtagK2hD8+YDcVR57Zy86l0ovpjLhOEKIVC4WmvCAmq2EIaKh4/rQeEKs+vWlCxOVAV7jMAUUkSgOYSVAV2BJAM2gNsEdAUPdgigxRcnTMHDE9Pmz5+/5IwYmi+OWoKo+cneEb3bwGZooMjzARNBBzASt12HW3KmvqTExdEeCJwKS+r3g4TOnUBLck/dwLpdcKbJpydkgfKyuBPt5YXT3DQ8pi28iksBLN7Xk63g3hLHicGHJWffw+nI4L1bo5724/bF3qinR4OfPtbcjEtB4Jmnl32Bqdwah4JtecCYcQMybFdhVxB8A0h4A/EuM6wK1reAyBAwsRgqBgBT7TkJcA3cwgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://worldscinema.org/?s=%tt%',
      'matchRegex': /Nothing Found/,
      'both': true},
  {   'name': 'WH',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://www.warezheaven.com/index.php?search/666/&q=%tt%&o=date',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /search_results/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'XDCC',
      'searchUrl': 'https://www.xdcc.eu/search.php?searchkey=%search_string_orig%+%year%',
      'matchRegex': /No result found/},
  {   'name': 'XDCC',
      'searchUrl': 'https://www.xdcc.eu/search.php?searchkey=%search_string_orig%',
      'matchRegex': /No result found/,
      'TV': true},
  {   'name': 'xTorrenty',
      'icon': 'https://xtorrenty.org/templates/xTorrenty/images/favicon.ico',
      'searchUrl': 'https://xtorrenty.org/?do=search&subaction=search&story=%search_string_orig%+%year%&catlist[]=0',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /przyniosło żadnych rezultatów/},
  {   'name': 'xTorrenty',
      'icon': 'https://xtorrenty.org/templates/xTorrenty/images/favicon.ico',
      'searchUrl': 'https://xtorrenty.org/?do=search&subaction=search&story=%search_string_orig%&catlist[]=89',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /przyniosło żadnych rezultatów/,
      'TV': true},
  {   'name': 'YGG',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www4.yggtorrent.li/engine/search?name=%search_string_orig%&category=2145&sub_category=all&do=search',
      'loggedOutRegex': /Ray ID|security check to access/,
      'matchRegex': 'Aucun résultat',
      'both': true},
  {   'name': 'Zooqle',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALfSURBVDjLNdDPb1VVFMXx8w+Zd+869xZq3ogB5tXaQPVVH5o0dqCdFqtoTKiJE2eKDVVImqAGfzRhZhBNiUaRRIyCBrRo6D57r73P/TccFNfsM1mDb/KiNeiuWilh1YMsJoOLubp7UqqJVFcrEaJR6BxEvJBuZprEJNxscCVDKBQjXV3Ui5p4KhZW3bWUaladrFKrFXWNEq6avLjS1A9/fxTFy0DTMHdVYXX1SKU6Qz+eziNPNv4YqFIOd1bmkRfOXlMPJtL17gxHG18V8u6Zx8JaEU1eyHWg3/3z+ylw7JfKV4F+9/7+FGhvl5Lcyh6AnXD5ax542b8EsOOUB/PAKplIewPoH5gwNoH88E2gf1hL2OtAliEZOQMWxEx8B8BPZ4AFqjsvAvhBk3E4AcyU4nIFwN4JYBYlVD4BsFeSk1NgUbxK/QjA/hRYHApdLh09qMkGcPxQjfoOgH82gOP/kowtAI8smcVnAK64mJ0EVvgpgF2a6klgrDVVVZsB4+t6sAnkfbMZMP5G/z4L4GmriWr11gTAGEC/7eE//y9g0T2RpB6cHwPoX/qxiKkePhYw0ZqieEhouff1balqqjJY3LlpXraBpzgkMyvUKi431ifPnL9X728tTdavi+hlYCkixRAuFPPtLo9G+cXvVvPoiTZ/ILqLuefMUnUtF8Tsw4y+n2vaJ9tRh9zk9/VqHq+4JxfK2uqNrdz2bQPkUW6bpukavH2hn3vBmUoor3UZTYcW6Nrcom2aJjdANzcVS0aWeBejLnd932L582fbJnc5dyMcw7IykVrN38tt07a5W7tTf30lt82oafO5Dqc9kliUErz51nRxZfMrWrHyxWvPLy6f+/YW2lPFEz1EizPoQYq4Ueji4b8Bp6snqypiQVczFlY7CkPzgzGWjMmCpKl7DNVJpbs7WQt5Ckseyb2WwiI0CdLoGj6Iq1dd6JelpKqVDGdVJ6OGSARJc2oJd/0PjOCOB72CPu4AAAAASUVORK5CYII=',
      'searchUrl': 'https://zooqle.com/search?q=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|security check to access/,
      'matchRegex': /no torrents match|Come back later/,
      'both': true}
];

var private_sites = [
  {   'name': '3CT',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEcUlEQVRYw+2WS2xUVRjHf985d2Y6naFlWqYFAVEiMRghCkRiXDUkJJi4EOmCRBcm2tbGxp0GXXTYSNUFaiOlTUOIjxgl6kIRNiiIiTFGQkAIGF4BSunUMn1O53Hv+VzM6JQAWlbGpP/kJicnX875n9/3yIU5zWlO/7EEQGkJETcJosbcElHQvIz1ZGZuKc1hGmsXg2nAV4fqIDeWXBNSThMttXhetBSYM0iVK619Kd3oKQDDkTFh53TJQH3LeqzpQagC1Rk3eSDfk3YdQl9RabY0LmgCfRF0OcrXIBuBRkS/wJduPOlA3WaEAirnERaDxlDSQBbhPhDF6XYZ7v3MK4OII/ogSHUZSoWPchLuKZlK1j8D7gOgBnhV0r3vaWPLOZA+kNfwWA4aQWQBqt04dxgjHyKyBLhK4FJYeRnRLQgJAK/yWskgnEL1LOAQeQrVYzizQ0j5Wte+FAm2gSwAvqPg9gIwVPiShsgmRJ8E+QlYiXOtMty3T5OtK2YkzjESOQ68QEPxHKIOoJRza4aBDphqAk2BWNA+soWt8kfPrwCEgk3AKgAC2S+ZvrESpL05fHZQtFsZGnmfvNkF3oE7F113noB+VA9VCKR7Tgqc0GT7A4jrQhgA/Qpb5QNoy9oQ37gmAmsR8iweGtbtLGQyWib40SjhbIap6EJi00OMUSD1D5U/snvgr7VXTrVqXetDSNALrAeZBHmWiDurda2dyA+XiGefYLQGrB9i/akuxuMpdEa9TM8r8czG84SlFSaOzqYNK23nsQaRUUSOoyogdYg8jjVvc/beZSDldhJDPmRBCyjFmz7wEXwcOts5UCnCdO8n0PwpiUScsKwD7QJZh3ErOLM0DPILostwBo6s2c+jv71OIVZBUJxS4jgmYgZ/MnP3BkhZIeWTYQw4pMm2dxD9GGGaQK6BPYphCwDZ6g1sb18hmV0/VkZGKsz8wZWMhs8I3YW7MqCNz8XQwU7VtqugBxhedB4ZvALkUA4yPHqa+fWjhPV5RB5BWEYo2KPJtj2oO4lQjbm+EZUJ8N6oHG8VglmM4vq2x/D4FqhHGUD0GMoYQgiCbTLUf7FktHUDyLvAw5X21gCRcZTPwe+UdP8QgNa+lCDimhDpARpAf8bXVxiJnRB2Tt+cgoA0lu7yNKxCGcLJEQJ3QDL9Y3+7Heo9pMn2pxG3GVgNGkW5DBwkHTos7M5XHu8WobIE0W4Ug1LEM6uJj15gkunb4lBSRmm2s8mdgsw29l9TcMvhXdSikSSx/BXGow140+PksNQxRQcF+vCklaKmCNNJkX0YMhgGY/VYfx4N+UskcJxGAAdUA1lJ4WZnIEUNofhanH8JQmGqJq6Sj67CSoCVKxRlJRr8DtyP6gC4KsQmsHod8aKoX0LsbA2oQYJJCvnLkiJ350E0UxEsgd4gyE1g1VKkCjEXMQygzkN8HzE+IbmAsVlM2GJNDfnQOLnJQdSbQHIjgCOQAGuyZRKzl2q5Q/T2lG6KfYt5+mY8Ofd/N6c5/S/1J0g15d7sX0t9AAAAAElFTkSuQmCC',
      'searchUrl': 'https://3changtrai.com/torrents.php?incldead=0&spstate=0&search=%tt%&search_area=4&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Không tìm thấy/,
      'both': true},
  {   'name': '3CT-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEcUlEQVRYw+2WS2xUVRjHf985d2Y6naFlWqYFAVEiMRghCkRiXDUkJJi4EOmCRBcm2tbGxp0GXXTYSNUFaiOlTUOIjxgl6kIRNiiIiTFGQkAIGF4BSunUMn1O53Hv+VzM6JQAWlbGpP/kJicnX875n9/3yIU5zWlO/7EEQGkJETcJosbcElHQvIz1ZGZuKc1hGmsXg2nAV4fqIDeWXBNSThMttXhetBSYM0iVK619Kd3oKQDDkTFh53TJQH3LeqzpQagC1Rk3eSDfk3YdQl9RabY0LmgCfRF0OcrXIBuBRkS/wJduPOlA3WaEAirnERaDxlDSQBbhPhDF6XYZ7v3MK4OII/ogSHUZSoWPchLuKZlK1j8D7gOgBnhV0r3vaWPLOZA+kNfwWA4aQWQBqt04dxgjHyKyBLhK4FJYeRnRLQgJAK/yWskgnEL1LOAQeQrVYzizQ0j5Wte+FAm2gSwAvqPg9gIwVPiShsgmRJ8E+QlYiXOtMty3T5OtK2YkzjESOQ68QEPxHKIOoJRza4aBDphqAk2BWNA+soWt8kfPrwCEgk3AKgAC2S+ZvrESpL05fHZQtFsZGnmfvNkF3oE7F113noB+VA9VCKR7Tgqc0GT7A4jrQhgA/Qpb5QNoy9oQ37gmAmsR8iweGtbtLGQyWib40SjhbIap6EJi00OMUSD1D5U/snvgr7VXTrVqXetDSNALrAeZBHmWiDurda2dyA+XiGefYLQGrB9i/akuxuMpdEa9TM8r8czG84SlFSaOzqYNK23nsQaRUUSOoyogdYg8jjVvc/beZSDldhJDPmRBCyjFmz7wEXwcOts5UCnCdO8n0PwpiUScsKwD7QJZh3ErOLM0DPILostwBo6s2c+jv71OIVZBUJxS4jgmYgZ/MnP3BkhZIeWTYQw4pMm2dxD9GGGaQK6BPYphCwDZ6g1sb18hmV0/VkZGKsz8wZWMhs8I3YW7MqCNz8XQwU7VtqugBxhedB4ZvALkUA4yPHqa+fWjhPV5RB5BWEYo2KPJtj2oO4lQjbm+EZUJ8N6oHG8VglmM4vq2x/D4FqhHGUD0GMoYQgiCbTLUf7FktHUDyLvAw5X21gCRcZTPwe+UdP8QgNa+lCDimhDpARpAf8bXVxiJnRB2Tt+cgoA0lu7yNKxCGcLJEQJ3QDL9Y3+7Heo9pMn2pxG3GVgNGkW5DBwkHTos7M5XHu8WobIE0W4Ug1LEM6uJj15gkunb4lBSRmm2s8mdgsw29l9TcMvhXdSikSSx/BXGow140+PksNQxRQcF+vCklaKmCNNJkX0YMhgGY/VYfx4N+UskcJxGAAdUA1lJ4WZnIEUNofhanH8JQmGqJq6Sj67CSoCVKxRlJRr8DtyP6gC4KsQmsHod8aKoX0LsbA2oQYJJCvnLkiJ350E0UxEsgd4gyE1g1VKkCjEXMQygzkN8HzE+IbmAsVlM2GJNDfnQOLnJQdSbQHIjgCOQAGuyZRKzl2q5Q/T2lG6KfYt5+mY8Ofd/N6c5/S/1J0g15d7sX0t9AAAAAElFTkSuQmCC',
      'searchUrl': 'https://3changtrai.com/viewrequests.php',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'mPOST': 'query=%search_string_orig%+%year%&action=list&finished=no',
      'matchRegex': /Không tìm thấy/,
      'both': true},
  {   'name': 'AB',
      'searchUrl': 'https://animebytes.tv/torrents.php?searchstr=%search_string%&action=advanced&search_type=title&tags=-lolicon+-shotacon+&sort=relevance&way=desc&hentai=0&showhidden=1&anime%5Btv_series%5D=1&anime%5Btv_special%5D=1&anime%5Bmovie%5D=1&anime%5Bova%5D=1&anime%5Bona%5D=1&anime%5Bdvd_special%5D=1&anime%5Bbd_special%5D=1&airing=2',
      'loggedOutRegex': /Forgot your username|Ray ID/,
      'matchRegex': /Translation: No search results/,
      'both': true},
  {   'name': 'ACM',
      'searchUrl': 'https://asiancinema.me/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password|Ray ID/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'ACM-Req',
      'searchUrl': 'https://asiancinema.me/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Forgot Your Password|Ray ID/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'ADC',
      'icon': 'https://asiandvdclub.org/images/favicon/favicon.ico',
      'searchUrl': 'https://asiandvdclub.org/torrents/?searchbox=%tt%&search_desc=1&search=Search',
      'matchRegex': /No torrents found/,
      'loggedOutRegex': /Forgotten your password/,
      'both': true},
  {   'name': 'Aither',
      'searchUrl': 'https://aither.cc/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Aither-Req',
      'searchUrl': 'https://aither.cc/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Anasch',
      'icon': 'https://anasch.cc/style/theme_dark/favicon.ico',
      'searchUrl': 'https://anasch.cc/index.php?page=torrents&search=%search_string%+%year%&category[]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'positiveMatch': true,
      'matchRegex': /download.png/},
  {   'name': 'Anasch',
      'icon': 'https://anasch.cc/style/theme_dark/favicon.ico',
      'searchUrl': 'https://anasch.cc/index.php?page=torrents&search=%search_string%&category[]=2',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'positiveMatch': true,
      'matchRegex': /download.png/,
      'TV': true},
  {   'name': 'Anasch-Req',
      'icon': 'https://anasch.cc/style/theme_dark/favicon.ico',
      'searchUrl': 'https://anasch.cc/index.php?page=requests&action=search&title=%search_string_orig%&hfilled=on&htaken=on',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'positiveMatch': true,
      'matchRegex': /Coming Soon/,
      'both': true},
  {   'name': 'ANT',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://anthelion.me/torrents.php?searchstr=%tt%',
      'loggedOutRegex': /You appear to have cookies disabled./,
      'matchRegex': /Your search did not match anything/},
  {   'name': 'ANT-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://anthelion.me/requests.php?submit=true&search=%search_string%&showall=on',
      'loggedOutRegex': /You appear to have cookies disabled./,
      'matchRegex': /Nothing found/},
  {   'name': 'AR',
      'searchUrl': 'https://alpharatio.cc/torrents.php?searchstr=%search_string%+%year%&tags_type=1&order_by=time&order_way=desc&filter_cat%5B8%5D=1&filter_cat%5B9%5D=1&filter_cat%5B10%5D=1&filter_cat%5B11%5D=1&filter_cat%5B12%5D=1&filter_cat%5B13%5D=1&filter_cat%5B15%5D=1&action=advanced&searchsubmit=1',
      'loggedOutRegex': /Ray ID|<title>Login :: AlphaRatio|Something was wrong/,
      'matchRegex': /Your search did not match anything/},
  {   'name': 'AR',
      'searchUrl': 'https://alpharatio.cc/torrents.php?searchstr=%search_string%&tags_type=1&order_by=time&order_way=desc&filter_cat%5B1%5D=1&filter_cat%5B2%5D=1&filter_cat%5B3%5D=1&filter_cat%5B4%5D=1&filter_cat%5B5%5D=1&filter_cat%5B6%5D=1&filter_cat%5B7%5D=1&action=advanced&searchsubmit=1',
      'loggedOutRegex': /Ray ID|<title>Login :: AlphaRatio|Something was wrong/,
      'matchRegex': /Your search did not match anything/,
      'TV': true},
  {   'name': 'AR-Req',
      'searchUrl': 'https://alpharatio.cc/requests.php?submit=true&search=%search_string_orig%&showall=on',
      'loggedOutRegex': /Ray ID|<title>Login :: AlphaRatio|Something was wrong/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'AS',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://asylumshare.net/torrents-search.php?c120=1&c4=1&c47=1&c114=1&c23=1&c24=1&c25=1&c26=1&c27=1&c33=1&c117=1&c34=1&c35=1&c36=1&c37=1&c124=1&c42=1&c7=1&c39=1&c5=1&c41=1&c40=1&c6=1&c95=1&c110=1&c49=1&search="%search_string_orig%"',
      'loggedOutRegex': /Cookies MUST|Cookies DEVEM|max_user_connections/,
      'matchRegex': /Nada encontrado/,
      'both': true},
  {   'name': 'ASC',
      'searchUrl': 'https://cliente.amigos-share.club/busca-filmes.php?search=&imdb=%tt%',
      'matchRegex': /Nenhum resultado/,
      'loggedOutRegex': /Cloudflare|Ray ID|equiv="refresh/},
  {   'name': 'ASC',
      'searchUrl': 'https://cliente.amigos-share.club/busca-series.php?search=&imdb=%tt%',
      'matchRegex': /Nenhum resultado/,
      'loggedOutRegex': /Cloudflare|Ray ID|equiv="refresh/,
      'TV': true},
  {   'name': 'AT',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://avistaz.to/movies?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true},
  {   'name': 'AT',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://avistaz.to/tv-shows?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'AT-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://avistaz.to/requests?search=%search_string_orig%&condition=new',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /Request Not Fulfilled/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'AveTor',
      'searchUrl': 'https://avetorrents.com/catalogue.php?cat=movies&tname=%search_string_orig%&year=%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Забравили сте си паролата/,
      'matchRegex': /Няма нищо намерено/,
      'both': true},
  {   'name': 'bB',
      'searchUrl': 'https://baconbits.org/torrents.php?action=basic&filter_cat[9]=1&searchstr=%search_string%+%year%',
      'loggedOutRegex': /Lost your password/,
      'matchRegex': /Your search was way too l33t/},
  {   'name': 'bB',
      'searchUrl': 'https://baconbits.org/torrents.php?action=basic&filter_cat[8]=1&filter_cat[10]=1&searchstr=%search_string%',
      'loggedOutRegex': /Lost your password/,
      'matchRegex': /Your search was way too l33t/,
      'TV': true},
  {   'name': 'bB-Req',
      'searchUrl': 'https://baconbits.org/requests.php?search=%search_string%&cat[8]=on&cat[9]=on',
      'loggedOutRegex': /Lost your password/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'BB-HD',
      'searchUrl': 'https://bluebird-hd.org/browse.php?search=&incldead=0&cat=0&dsearch=%tt%&stype=or',
      'loggedOutRegex': /Восстановление пароля|Bad Gateway/,
      'matchRegex': /Nothing found|Ничего не найдено/,
      'both': true},
  {   'name': 'BDC',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://broadcity.in/browse.php?do=search&search_type=t_genre&keywords=%tt%',
      'loggedOutRegex': /Recover Password|Şifre Sıfırlama|BunnyGuard|CloudBunny|>Fatal Error</,
      'matchRegex': /dl.png/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'BDC-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://broadcity.in/viewrequests.php?do=search_request',
      'mPOST': 'do=search_request&keywords=%tt%',
      'loggedOutRegex': /Recover Password|Şifre Sıfırlama|BunnyGuard|CloudBunny|>Fatal Error</,
      'matchRegex': /report2.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'BestCore',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAgMAAAAqbBEUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJUExURR9Ayv///x9Ayt39jB8AAAACdFJOUwAAdpPNOAAAAHhJREFUKM+d0MENgCAMBVDi0fFM4MAI3acjcOBPqbYYP9EmRk48Au0vCbZ6PleKUV2O4lCDHRVGDnFdA1eLMTXdGF6Z8S9BGGeMvTIWQ6OmFgIt3XtgoDJAKCGE55HO4KaiETAhh9BP1eYEnK36J/AI+jLp8ejxITu06f0pcsC2EgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://best-core.info/browse.php?search=%search_string_orig%+%year%&c73=1&c70=1&c80=1&c81=1&c83=1&c77=1&c86=1&c76=1&c75=1&c74=1&c25=1&c24=1&c85=1&c21=1&c53=1&c20=1&c34=1&c90=1&c89=1&c82=1&incldead=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Probléma esetén írj nekünk/,
      'matchRegex': /Nem találtam semmit/},
  {   'name': 'BestCore',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAgMAAAAqbBEUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJUExURR9Ayv///x9Ayt39jB8AAAACdFJOUwAAdpPNOAAAAHhJREFUKM+d0MENgCAMBVDi0fFM4MAI3acjcOBPqbYYP9EmRk48Au0vCbZ6PleKUV2O4lCDHRVGDnFdA1eLMTXdGF6Z8S9BGGeMvTIWQ6OmFgIt3XtgoDJAKCGE55HO4KaiETAhh9BP1eYEnK36J/AI+jLp8ejxITu06f0pcsC2EgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://best-core.info/browse.php?search=%search_string_orig%&c54=1&c55=1&c58=1&c7=1&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Probléma esetén írj nekünk/,
      'matchRegex': /Nem találtam semmit/,
      'TV': true},
  {   'name': 'BHD',
      'searchUrl': 'https://beyond-hd.me/torrents/all?search=&doSearch=Search&imdb=%nott%',
      'loggedOutRegex': /FORGET PASSWORD/,
      'matchRegex': />N\/A</,
      'rateLimit': 625,
      'both': true},
  {   'name': 'BHD-Req',
      'searchUrl': 'https://beyond-hd.me/requests?imdb=%nott%',
      'loggedOutRegex': /FORGET PASSWORD/,
      'matchRegex': />N\/A</,
      'rateLimit': 625,
      'both': true},
  {   'name': 'BigBBS',
      'icon': 'data:image/gif;base64,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',
      'searchUrl': 'http://bigbbs.eu/?p=torrents&pid=10&keywords=%search_string_orig%&search_type=name',
      'loggedOutRegex': /Cloudflare|Ray ID|Odzyskaj hasło|zmienić hasło|change your password/,
      'matchRegex': /download.png/,
      'positiveMatch': true,},
  {   'name': 'Bit-Titan',
      'searchUrl': 'https://bit-titan.net/moviebase.php?text=%tt%',
      'loggedOutRegex': /eingeschaltet haben um dich|jscheck.php|JavaScript aktivieren/,
      'matchRegex': /download\.php/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'BitHD',
      'searchUrl': 'https://www.bit-hdtv.com/torrents.php?search=%tt%&options=4',
      'loggedOutRegex': /Forgot your password/,
      'matchRegex': /No match!/},
  {   'name': 'BJS',
      'searchUrl': 'https://bj-share.info/torrents.php?searchstr=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recuperar senha/,
      'matchRegex': /Sem resultados/,
      'both': true},
  {   'name': 'Blu',
      'searchUrl': 'https://blutopia.xyz/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Blu-Req',
      'searchUrl': 'https://blutopia.xyz/requests?unfilled=1&tmdbId=%tmdbid%',
      'loggedOutRegex': /Forgot Your Password|Service Unavailable/,
      'matchRegex': /label-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'BP',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://blackpearl.biz/search/1/?q=%tt%&o=date',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot your password/,
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'BP-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://blackpearl.biz/search/1/?q=%tt%&t=post&c[prefixes][0]=9&o=date&g=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot your password/,
      'matchRegex': /No results found/,
      'both': true},
  {   'name': 'BRT',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAAAAAAk3keeAAAAAnRSTlMAAHaTzTgAAAEJSURBVCjPY2BAAez83AzYAV/UwlVAUK/GjCHF3LhyFRQsVkOVYhSdBxZfBFERhiLJOhcoWqkFZAmFLAXK2iFLNq5atdIGZspUoCwvQo4DqM8HYT1QbzxCMnLVqulI5gQCtSJ4E1atKkWSlANKisB5c1etSkKS5AVKylBHMhGn5JxVq8q8MltmLFy6ZG5vWbgDUFIK5i/5paswgBcHRHLyKqxAASyJXW6VM6rkIht2mQY4zwlV0hqFhyYpAOK145CMBMaXAC6dqwwYGObhlAQ6cCUNJGMYOFbhlFxVsgA9hOZgDz5tsCSn7QQMmeXx4vAI5dHxze9dDBZeMb02xlIKS15iYmVhIBIAAE9xIm/13bwlAAAAAElFTkSuQmCC',
      'searchUrl': 'https://brasiltracker.org/torrents.php?searchstr=%tt%',
      'loggedOutRegex': /Recuperar senha/,
      'matchRegex': /retornou nenhum resultado/,
      'both': true},
  {   'name': 'BRT-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAgCAAAAAAk3keeAAAAAnRSTlMAAHaTzTgAAAEJSURBVCjPY2BAAez83AzYAV/UwlVAUK/GjCHF3LhyFRQsVkOVYhSdBxZfBFERhiLJOhcoWqkFZAmFLAXK2iFLNq5atdIGZspUoCwvQo4DqM8HYT1QbzxCMnLVqulI5gQCtSJ4E1atKkWSlANKisB5c1etSkKS5AVKylBHMhGn5JxVq8q8MltmLFy6ZG5vWbgDUFIK5i/5paswgBcHRHLyKqxAASyJXW6VM6rkIht2mQY4zwlV0hqFhyYpAOK145CMBMaXAC6dqwwYGObhlAQ6cCUNJGMYOFbhlFxVsgA9hOZgDz5tsCSn7QQMmeXx4vAI5dHxze9dDBZeMb02xlIKS15iYmVhIBIAAE9xIm/13bwlAAAAAElFTkSuQmCC',
      'searchUrl': 'https://brasiltracker.org/requests.php?submit=true&search=%search_string_orig%&showall=on&filter_cat[1]=1&filter_cat[2]=1&filter_cat[5]=1&filter_cat[7]=1&filter_cat[8]=1',
      'loggedOutRegex': /Recuperar senha/,
      'matchRegex': /Nada encontrado/,
      'both': true},
  {   'name': 'BTN',
      'searchUrl': 'https://broadcasthe.net/torrents.php?imdb=%tt%',
      'loggedOutRegex': /Lost your password\?/,
      'matchRegex': /action=download/,
      'positiveMatch': true,
      'rateLimit': 125,
      'TV': true},
  {   'name': 'BTN-Title',
      'searchUrl': 'https://broadcasthe.net/torrents.php?action=basic&searchstr=%search_string_orig%',
      'loggedOutRegex': /Lost your password\?/,
      'matchRegex': /No search results/,
      'rateLimit': 125,
      'TV': true},
  {   'name': 'BTN-TVDb',
      'searchUrl': 'https://broadcasthe.net/torrents.php?tvdb=%tvdbid%',
      'loggedOutRegex': /Lost your password\?/,
      'matchRegex': /action=download/,
      'positiveMatch': true,
      'rateLimit': 125,
      'TV': true},
  {   'name': 'BTN-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQgSURBVHjaxFddaBxVFP7O7MTNNtuQtZUkQhpSG2sfNEVr8QcDiqBorUYqFaFUxIdKEUGo1uprjSDYB4WgBesP/rT6YghpKYgt1j4INS3qppTEaGNtm2wSs02ymZl77/FhZ2fnzsxmNonihfOw7O53zvnOOd89lxhg+A8z4b88RJo/YzlYd/Zd4lt7/+SeC9d4yfGEGKiSidavRnii4JSywsyOdlpM5stioCc7xbmZAiAFIAVYONh/bmJJLJhepsEIy58JrH+llAKko1HHUi4q85LfWAaeOz0eBmDpZe8Zq9DPdv0Yz4qhRRRR98PDf2PVF8NBCgAhdFN6AM1HfuNPL0xFZ+7zE8sAKQXLkdj5g48JxYDj6KbKJXjtpwm+Ni9ASlXRA4Gzf2Ac3edy8OquJIgI9YYKlMBBiBX3dN++it77eZyZGelDWW9SdrQ3oCduCj7IToCVBLPybF29iXfvbiyXR0lA2LopoeHc15TSMFhJHB6aXHgMN359nnPzdtGBa6wkBrrW6b3BxSnQLEB3/0OttGZFQsOyhETL59nKSjg0NVfsaPcPBku80bE6XDilAMfWTYXHcHD7LbSCVDkIKTA5a0Uz8PbAFWbJgJSerUklsG/TjWGFiypBBR24LZPUMFlKvPj9KIcC+Ob8ZbAQgJCAkGAhsbUlHd26SmmgkDJSBwDg264NxC5myY4PjYWnIO8A5KMxYZro7lwbre+lHqgwBcHTmDJxddYCASAAeZEIBzAyNatlkSFZEbDuugRYOvBHl0xUnvUMz+OqL7l8QYV7QDq2p2osBAzbqgj47Ob11JapK1KvJJpWprDngY6KtyE5lqaa7DgRQsQyxPJC59fXn6F9vae5YAsc2NYZs8SwDuhTfC+AG2oTyLkjQgDmDDNWRt/cek9V25PFVBzvUrlqzHAJGpNG8Up1bc6y/7UtbGR6HuQbw4wZoQN3NKZBSnjKxsLGg4dO8nKdv9R/ltmxNNVcn0mGA+h5fBMZvvudpMCZ0bFlZ9+XHQUFcLfc3BwtxdfXmsVmdM0WEhsO9C2Zhac+O8VX8nMaZm0NYfdd7dH7wB97n6AaAiCVZxdzeXR9cmLRQbzcd4b7B0fdnipikWLs3twe2IoD+15wh6vb+zGICC2ZNAb3dFXV9Rvf6eWRyTyEVJh9a+eC23b8rCkFBnAxN426Vz/ie9uacHzXw5GBPHrwGJ8YuuwOcrVbcdz2GrhmTw1fQvqVDzlhUFlkAEjJUNW4LvlxmaiKAf/bhdxPIuKqoLCzWHgDRFwhewJAT3a0wSBXSn3bzYLGCgRG503NFbftkt+qn2YvfPkdH/3ld4zNFCKzLYE0pJJ4rGMt3n/6fqrmgUJLeR1vP9jP07bA4F/jYAZaVzeguT6FI88/Es95IBD6v5/n/wwANMStATIP25wAAAAASUVORK5CYII=',
      'searchUrl':  'https://broadcasthe.net/requests.php?search=%search_string%',
      'loggedOutRegex': /Lost your password\?/,
      'matchRegex': /Nothing found/,
      'rateLimit': 125,
      'TV': true},
  {   'name': 'BTN-IMDb-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQgSURBVHjaxFddaBxVFP7O7MTNNtuQtZUkQhpSG2sfNEVr8QcDiqBorUYqFaFUxIdKEUGo1uprjSDYB4WgBesP/rT6YghpKYgt1j4INS3qppTEaGNtm2wSs02ymZl77/FhZ2fnzsxmNonihfOw7O53zvnOOd89lxhg+A8z4b88RJo/YzlYd/Zd4lt7/+SeC9d4yfGEGKiSidavRnii4JSywsyOdlpM5stioCc7xbmZAiAFIAVYONh/bmJJLJhepsEIy58JrH+llAKko1HHUi4q85LfWAaeOz0eBmDpZe8Zq9DPdv0Yz4qhRRRR98PDf2PVF8NBCgAhdFN6AM1HfuNPL0xFZ+7zE8sAKQXLkdj5g48JxYDj6KbKJXjtpwm+Ni9ASlXRA4Gzf2Ac3edy8OquJIgI9YYKlMBBiBX3dN++it77eZyZGelDWW9SdrQ3oCduCj7IToCVBLPybF29iXfvbiyXR0lA2LopoeHc15TSMFhJHB6aXHgMN359nnPzdtGBa6wkBrrW6b3BxSnQLEB3/0OttGZFQsOyhETL59nKSjg0NVfsaPcPBku80bE6XDilAMfWTYXHcHD7LbSCVDkIKTA5a0Uz8PbAFWbJgJSerUklsG/TjWGFiypBBR24LZPUMFlKvPj9KIcC+Ob8ZbAQgJCAkGAhsbUlHd26SmmgkDJSBwDg264NxC5myY4PjYWnIO8A5KMxYZro7lwbre+lHqgwBcHTmDJxddYCASAAeZEIBzAyNatlkSFZEbDuugRYOvBHl0xUnvUMz+OqL7l8QYV7QDq2p2osBAzbqgj47Ob11JapK1KvJJpWprDngY6KtyE5lqaa7DgRQsQyxPJC59fXn6F9vae5YAsc2NYZs8SwDuhTfC+AG2oTyLkjQgDmDDNWRt/cek9V25PFVBzvUrlqzHAJGpNG8Up1bc6y/7UtbGR6HuQbw4wZoQN3NKZBSnjKxsLGg4dO8nKdv9R/ltmxNNVcn0mGA+h5fBMZvvudpMCZ0bFlZ9+XHQUFcLfc3BwtxdfXmsVmdM0WEhsO9C2Zhac+O8VX8nMaZm0NYfdd7dH7wB97n6AaAiCVZxdzeXR9cmLRQbzcd4b7B0fdnipikWLs3twe2IoD+15wh6vb+zGICC2ZNAb3dFXV9Rvf6eWRyTyEVJh9a+eC23b8rCkFBnAxN426Vz/ie9uacHzXw5GBPHrwGJ8YuuwOcrVbcdz2GrhmTw1fQvqVDzlhUFlkAEjJUNW4LvlxmaiKAf/bhdxPIuKqoLCzWHgDRFwhewJAT3a0wSBXSn3bzYLGCgRG503NFbftkt+qn2YvfPkdH/3ld4zNFCKzLYE0pJJ4rGMt3n/6fqrmgUJLeR1vP9jP07bA4F/jYAZaVzeguT6FI88/Es95IBD6v5/n/wwANMStATIP25wAAAAASUVORK5CYII=',
      'searchUrl': 'https://broadcasthe.net/torrents.php?imdb=%tt%',
      'loggedOutRegex': /Lost your password\?/,
      'matchRegex': /Error 404|Nothing found/,
      'rateLimit': 125,
      'TV': true},
  {   'name': 'BWT',
      'searchUrl': 'https://bwtorrents.tv/index.php?search=%search_string_orig%+%year%&blah=0&cat=0&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT PASSWORD/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'BWT-Req',
      'searchUrl': 'https://bwtorrents.tv/viewrequests.php?search=%search_string_orig%&filter=true',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT PASSWORD/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'CaCh',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://www.cartoonchaos.org/index.php?page=torrents&search=%search_string%&category=0&options=0&active=0',
      'loggedOutRegex': /not authorized to view the Torrents/,
      'matchRegex': />Av.<\/td>\s*<\/tr>\s*<\/table>/,
      'both': true},
  {   'name': 'CCT',
      'searchUrl': 'https://concertos.live/torrents?imdb=%nott%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /ago/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'CG',
      'searchUrl': 'https://cinemageddon.net/browse.php?search=%tt%',
      'loggedOutRegex': /Ray ID|Not logged in!/,
      'matchRegex': /Nothing found!/},
  {   'name': 'CG-c',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJfSURBVHjaXNLPSxRhHAbw533n3dkdx5xpdieZhVWh9bIZWYcEXRKFvGQg0Y9zZJf+hihSi6h/obKiWx0LLHHp0NihwNYQNMXK3FrdlBlRdxzfed8OSZoP3+uH73N4SHRt+4rbP/KzkG06AgCAENHaulcqf7P8AwO4dQkXsCcU7/Cw40F3fX52YSJifsR8rvgRXRcIE0hoSOD/UDkZYRyPTz3qTnXNz88DkFIKIYQQNaipgb4fAJDFSHmvPOkc3mdiUCdRnMYMB/8HlBu4DgBLknKlL99XrBTfFEcNo65arVbCSoCt31iRkA3IKFAAEI5gxxKQVlpuXMq9bGER67FPE0JGKq/rRN1FnD+L3hM4vogS220nIRfFveX7tVFtQY5mG5uRkSvWatez7rGgQKG4GP+Aj+AIdq89zGqHr+DyJCY4Aq4GUU9Y6BmjoH8r6bq+5wOBSEWbPADgwQeAELIo0kcdopCqFTTUNmiatgMiRJ70kp+T9dv2JxSb4TqoTyMdX467U66u647jxGIxxhjbxOYCfkxhysX4l6+z05gJEWrQlrDswBFS3CnfbTFb5spzmUyGUooB3OzFGQuWqqqGYdi2bRiGqqpxqCbMlJIcOjQQnQuHOgcty8rlcoQxpmmaYRi6rjPGwjD0PE+v6LfNwUST1lnNm99NpAnJ0+drL/pfXSXZbHM8rqqqyhgDsLGxUSqV2vyTTzGcMlPwAQkAcEDyiqu6zDQOKoxQSgFwzjnnQRCkkQ4RwtuzoV+QY1FHWztLkKQUnAgKYHurGlZ9skVaccyGvW92WIV8K/4MAAC5CJCfm65HAAAAAElFTkSuQmCC',
      'searchUrl': 'https://cinemageddon.net/cocks/endoscope.php?what=imdb&q=%tt%',
      'loggedOutRegex': /Ray ID|Not logged in!/,
      'matchRegex': /Nothing found!/},
  {   'name': 'CG-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAbgSURBVBgZfcHdj1xlHcDx7+95nnPOzJnZzuzOdru08lJeLZgQEEFEMcErjMYbrzAagf+Av8Er7yRemqIXxlsDemGEhKhBhAglhqotpbRburuzM7Oz837OeZ7nZwtusOzWz0cU4TDffvQrMUYRAaJqiGFRlqPpbG8yGU6nThZ3rcWnTvGt+3nodlaX4MfCYRw34a01aVJWPsaoIlFMJVKJeFBBBGuwBhEUFITDOQ5YXzvaaB5Z9SFPkzJqFFHVoFqJFEgFEawlc2QJicMarvuVeo97XriR4YClBv3h7mZvMJrNMSbJ0ihSxRhUgxJVQY2QWvKEPCG1iHCNKgc5Djh/cQc45uyeEbuynOY1C0Y1qhKjRhVVZ3AWaxBQRSPyrCQcwnETKw2zszsIMerKcpqm9Vo2Cz6GEGO0hjwjS6gCowWjBakj43COT4TTorWOe6bHvn9e3AbWnDGG5Xa7lqUKikbFoFbwkd6ES32e+qlwI39aBexzAjg+pdFPeo7P6ywl3eFwMS9aRxrO2TRNMGY21/445glH6pLXOMgKIfIpF04rCOBE/UtGso59pse+x7+0/trbH252tybjeme1kyYuS8wCM1qwuUctEwRQ9m39TFebWEGh+oUag+O/xBg0Rj/uWz7z/SePh3Lvd38eDcbjUemOtuuWsLJkNLhF5c99HK/sAMK+7RGpYzknSdBAiDiuU0BFUKyJ/rQ1+app3s7yiSfHyXbv2Lv/7g0mexQj64tbO8n6ct1IbbM/v7g139ilk+vJY/LAce4/rl/cQcAKjRrzkskCx/8yBlRiCLNeUSEai6qzKKJX16pzx0p47D5/2/H22mrbJllvHC9sV2c/HJ6/PPiou0igmZFnWENiqafsjOmOcHxGUY2KAZeJNYurW703Loz/+PZ8Z3d+9yo/fIKnH3FLnSVTP0rS1KQxJ3/nbO+Xr7z3l79vXO7Rboq1VJ5pQRW50terQxw3UiWKuKwmNr96yb/+3vjdc7NUyvtP8Ohdcu9tsFQgY2ygldBaPdpY39rpj8fjDzZmF3eqwjOa6bkthjO6I4ZzcXxGuEavI6mRre4W/sL2dDpf3LPGnesS0clw0fTb0Ecsiw6LWdN2vvng2nS2+M2rl//10aA3YjBhUdKbUEZjrHPsUxAggkGThtbWJiz6024MenSJTlPmJdvDKHGegCpxOtZxTNv+vhOdnVNrr72zc+a8LipM6uaFTBbisiy3iQMUUFREVaOC4iWFvFAtKvUVMRKi+KgxIoKzREU1aDEwZcNktVpCmliukyCNWjNNGraWZUniHCAgBjGIggUhcYGsWKkXy3m4amSy0N6E3SnTFgFjHMbgVFVm4nt+Wp9PXfDeGOtcrd1q1+sZiEsSY6yLEQQDRlXRKqKQVFNCd9kt2rXSWYZz2RjQzGjltHI1UEvFWhWpKEejSbfXz8qqymp5vdFqt1tJ4soqGmustS5xqBIVHygDgxnTBR0d+0yvfOyLsqiidkdc6GpqadaoJ1p6mhnNmmROd6fFWxuD1993V7qViEEoqmCTJElTYwTEqVIGZgWzguFCru5ydVcLX+yV1dmNeHE7jgumJRhSS+YIge5YGpm0cxopF7rht+9M/3SOSWGPZK7yk/6uiDHLrSVjTOWj646ZLNjaY2uom3tcGXBll/4k7E7Dzpju2HgFZW+mG7tUgY2Btuqap5qnZAmX+rz5QZyUyanbW184Wru66z/slv3dcYzkeS1xTn7/ggymeqHL+U2uDOiOObsp7FtqNqISYxRiYqMhaAxOyBOuCREP2yNh389f+Norf9s5c3648KyuLK91Wu4P/9DhjMsDLu5Ifywzb8Gzr9lsqmoIvijKRVmhMTXGOqnE+CjGmvWWMirZ9/Tjt5Za02je/6g/Ho00elEEONZ2c5+MJnNudOfJkyF4X5Xjyawq5+tL4YHb3LGVpriGuOyWNidXZs++uMmNfv2T77361qWXXj4DOD6xiHneqDGZc6MsSxcF+Aq0kYR7j8XvPGhO3ZHGZCnJ8rvX/HrueZHP+e4TtzTrlpfPAKIIh3n0kYdVY1lW4+l8Np3MZ5OV2uyp+/QHX3dfvqdB2kaSVr3AjPFz5gU/Eg7juBkxgIjEqGXlhdisyZFc687nZpK4UJX4vUJDhSCC43COAx57/KvodURVqEKsfLDR15zWEq4JPiRh7lSjxqBcY4RwWlHs88KNDAdYMGBUiTGG4CtfVd5KaNX1SB1nKD1ahRAignU4ixFAEA5yHPDGX98EvvHwQ5WvpCp9WfqqqmdxvcWJZWk3NLGoEhUDiIAC9jlAOMBxEy6EGIKEoD5oDKmjnbO6RKtOLUEMolwjKP/XfwDxKtsa8vYYSAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://cinemageddon.net/viewrequests.php?filled=no&searchwhat=imdb&search=%tt%',
      'loggedOutRegex': /Ray ID|Not logged in!|Requests are offline/,
      'matchRegex': /Nothing found./},
  {   'name': 'CHD',
      'searchUrl': 'https://chdbits.co/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search_area=4&search_mode=0&search=%tt%',
      'loggedOutRegex': /SSL \(HTTPS\)/,
      'matchRegex': /Nothing found/},
  {   'name': 'Classix',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABoElEQVQYGX3BPU5UURzG4d+ZOcQPQggQEpSoIRgrG7dg6RJchI0uwMZYm7AIO0sXYKLRWNjjV0SlALVRmLnnvO/fe3MIxcj4PAlIiTkMiYtvVpnrxd0x71aY7+pquvkcRpwtAvJ1k/Y42+o5yJsmdcuZM0xtyJsiFa0s8I/JHwnyZZOKYmmBGd2RZMiXTJJidJ8Zjy0b8oZIXVGYGeFSBXntJ6mrJpgRKlWQlw9IpTrMjFCtgnzBpFLNDr3jB/R2Er3fUW3IY5GKfEhvvBb04jsD1SrIUzHqyj69vI0Z6HPQKxLkQxHT/X3g3DUTDDz9YnpLgvxV6HYG1p4pMAPXyZ0pMDmC/HEDftHLRY6gF1G7H8c0eXedxqUGZmAVi2b0XidcZGKAa7FO5A+icVFgeuFaJJq8JxqXaoKB1Uk0+UA0LoowA9cq0eSJaaI4IuhFqIRp8qJoXKsJBlaRaPK2aFwU9RG9sIpFk2+YJqrLNwafQtWmyeumCfktJ1TDNLkzTaTXnLJNk27do1ncSpzSbqFJPLzCfzwd8/L8FnM9efUXuA4mfystff4AAAAASUVORK5CYII=',
      'searchUrl': 'http://classix-unlimited.co.uk/torrents-search.php?search="%search_string%"&parent_cat=Movies',
      'loggedOutRegex': /Sorry this is a private site/,
      'matchRegex': /Database Error/},
  {   'name': 'Classix',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABoElEQVQYGX3BPU5UURzG4d+ZOcQPQggQEpSoIRgrG7dg6RJchI0uwMZYm7AIO0sXYKLRWNjjV0SlALVRmLnnvO/fe3MIxcj4PAlIiTkMiYtvVpnrxd0x71aY7+pquvkcRpwtAvJ1k/Y42+o5yJsmdcuZM0xtyJsiFa0s8I/JHwnyZZOKYmmBGd2RZMiXTJJidJ8Zjy0b8oZIXVGYGeFSBXntJ6mrJpgRKlWQlw9IpTrMjFCtgnzBpFLNDr3jB/R2Er3fUW3IY5GKfEhvvBb04jsD1SrIUzHqyj69vI0Z6HPQKxLkQxHT/X3g3DUTDDz9YnpLgvxV6HYG1p4pMAPXyZ0pMDmC/HEDftHLRY6gF1G7H8c0eXedxqUGZmAVi2b0XidcZGKAa7FO5A+icVFgeuFaJJq8JxqXaoKB1Uk0+UA0LoowA9cq0eSJaaI4IuhFqIRp8qJoXKsJBlaRaPK2aFwU9RG9sIpFk2+YJqrLNwafQtWmyeumCfktJ1TDNLkzTaTXnLJNk27do1ncSpzSbqFJPLzCfzwd8/L8FnM9efUXuA4mfystff4AAAAASUVORK5CYII=',
      'searchUrl': 'http://classix-unlimited.co.uk/torrents-search.php?search="%search_string%"&parent_cat=TV',
      'loggedOutRegex': /Sorry this is a private site/,
      'matchRegex': /Database Error/,
      'TV': true},
  {   'name': 'Classix-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABoElEQVQYGX3BPU5UURzG4d+ZOcQPQggQEpSoIRgrG7dg6RJchI0uwMZYm7AIO0sXYKLRWNjjV0SlALVRmLnnvO/fe3MIxcj4PAlIiTkMiYtvVpnrxd0x71aY7+pquvkcRpwtAvJ1k/Y42+o5yJsmdcuZM0xtyJsiFa0s8I/JHwnyZZOKYmmBGd2RZMiXTJJidJ8Zjy0b8oZIXVGYGeFSBXntJ6mrJpgRKlWQlw9IpTrMjFCtgnzBpFLNDr3jB/R2Er3fUW3IY5GKfEhvvBb04jsD1SrIUzHqyj69vI0Z6HPQKxLkQxHT/X3g3DUTDDz9YnpLgvxV6HYG1p4pMAPXyZ0pMDmC/HEDftHLRY6gF1G7H8c0eXedxqUGZmAVi2b0XidcZGKAa7FO5A+icVFgeuFaJJq8JxqXaoKB1Uk0+UA0LoowA9cq0eSJaaI4IuhFqIRp8qJoXKsJBlaRaPK2aFwU9RG9sIpFk2+YJqrLNwafQtWmyeumCfktJ1TDNLkzTaTXnLJNk27do1ncSpzSbqFJPLzCfzwd8/L8FnM9efUXuA4mfystff4AAAAASUVORK5CYII=',
      'searchUrl': 'http://classix-unlimited.co.uk/reqall.php?Section=View_Requests&search=%search_string_orig%',
      'loggedOutRegex': /Sorry this is a private site/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'CMS',
      'searchUrl': 'https://cinemamovies.pl/browse.php?incldead=1&blah=1&gatunek=0&quality=none&search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Zapomniałeś hasła/,
      'matchRegex': /was not found|nie został odnaleziony/,
      'both': true},
  {   'name': 'CrazyHD',
      'searchUrl': 'https://www.crazyhd.com/index.php?page=searchlist',
      'loggedOutRegex': /Cloudflare|Ray ID|Popular Topics/,
      'matchRegex': /list-name/,
      'positiveMatch': true,
      'mPOST': 'search=%search_string_orig%+%year%',
      'both': true},
  {   'name': 'CrazyHD-Req',
      'searchUrl': 'https://www.crazyhd.com/index.php?page=viewrequests&search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Popular Topics/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'CT',
      'icon': 'data:image/gif;base64,R0lGODlhEAAQAPfWAPHy9Pz8/f39/YuRpPX198DEy4iOn5KXpnF7km92jJuhtLa7yN7g5G53kNnb4bC1w15nf0ZQbEdRbnJ6kXF4i0dQZb/CyKuxv6iuvMDCyExWcHp/iU1VcayywIuRoX2Ai3l9iI+WqXyBjbO3xX2DkZKYqExYd5KYp8XHzcTHzFhdbXuBlauttWpxhW91hTpDX3R8jz5JZnZ8jHuDmz1JZ5GWpDtFXLzBzGJoecLEy0BLaGFsh3mDmfT09jtEVzQ9VGx1i5qfqYiPnklVc3Z/l4eOnYuTpZKarG93jJygq4SMn1Vfe3yEmFFceGtziXl/kUxVbUlRaFVcb2RthFVbbU9XaT9KZ1VefKmuvv39/m5zg/X2+PDx9GBqgHZ7hp2jtLW7x05WcI2TpJmdpqitvNTW2vP09oGGk2Bofl5mfnuEmH6ElkFNbJKYqd3g5aSquaCmtpeesGtzh5edsL/ByEJJXXN7kEJLZYKJnJGWqN/h50RQcYiPn5aer5CXqn6El8THzXR9loCFmTlCW42VqGNuiXB2hIiMlzpFYTtFYKSotZKYq/z8/JWcr6+ywX+GmKmstbi8xWJoeGx1j6etvVJefNbZ4JCWnlFXaIiPpGBrhtLU2mVqfNze4oKLoKmvvoCHn9HS2N3g5klRZkhRZW10hEZQZ8DDyVFYa1xlfpqhsj5IZJ2ktU5Yc9jZ3fv8/EdPYXuDmbO5xlRZap+irKmuvW10hYWJlpOZp4+VpfLz9V5ngTM9VtbY3kJNbEFLZtja34GJm6yyv5icq62zwXqAkD1HYl9mdqqvvqCnt2tyhsPFzIqSpn6Gm2RrgYCGmHh9jrK3xEdScz9IXoeOnv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANYALAAAAAAQABAAAAj/AKsJDKDHkZ9YPAjVcvNKoEMzxIh4UoUBiwJQk97octiDFYI4YKI9GLFgwRFNzABUE4AMwacOyRR8eXBD1gU4leYIENWgD5kBwTKFEBZJkYETzaQ5oBRomCERZyQl8DLm0q1DIJq0maHkg6syQTZp4ZSEAQNaGxLsKgQtw5ZjYXCMWlIBEAoqgphI2FEqFIE6JnzpGGKjwLIqeFZEaCCHBQFbg6S4QMTLQg5M1JCkanSFBKROBej4sPLjVAoVBzjksrRnggxUpKaZ0hAF1qxiMFY5CLCIjZEBdqZASOOMghADxnBlqcZFDQ0gJfg8e1SkRosXT1QKBJAnRisnf9YoFYOS6IB2h4x6ieny6w4aD8ACCLQWEAA7',
      'searchUrl': 'https://central-torrent.eu/browse.php?search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|inputlogowanie/,
      'matchRegex': /Nic tutaj nie ma/},
  {   'name': 'CZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAACXBIWXMAAC4jAAAuIwF4pT92AAACYklEQVRIx2N4RiJggDEen5yWFhxRvvIaXOrJqRnpIWGly65g1bDNg5sBDGSyb0BEdvrwQESkMq5gaLgRw8IAB6JTHj97diuBFSEiNOERqoYLpgzIgCXr6SUbFBHm9CfIGm47QsV52KGMdlcog5sDymh6iqQhBiyk2XP+2cO9GfwIczW6zj59tC9HAGzrKoSG42xAAaaYWxCBXTpQ5UzhNyEi+/RBXItHcA3RIH70Q5gjL0hDNITCRS4qgLyxBKbhqjiQq3QTEXCLweEji4iQZ6tAbgiAaVjLCOQ1IIX0IyOQhiokkSd6QAGRp1ANnSDpDciRGQsS2YkskgwSuQnVUA3inEaWBoucRBZpBolcgmqoA3EOI0sXgESOIYtUgUSuQDVMBnEWI0sHgURWIIv4g4LpPlTDIVAyCn+KkL0sBtIQ8AQhcl0CKKANC6V7oJji2oyQzgYFGwPHOoRICUgkHx5xbSB5hRMw2WnQhCt/FCYyAxQNvEfgGh5JgeTFFoLj/noOPFkLz4eIFIKTZBpS4pvHBRJhNc6sr4qWAbtHAZx3WA0y66tjZMEiyueQ80MDAyrgP9LMiCoisA8lAz1p5kGW1dv+7Em3ILKI6mb0PL3JnBkhrWNubm4hieBzxlzCLARuKjPgBLHYSo3r0rg1+EHVbLCSmkaChqsJwIJIjWgND1vkQExFIjU83agNYRKnIfB4BCcDKRoUhRBMojQg6x3VMIQ0qMiSqCHgSg4vSRqAyXuXOYkanj2Zo0GaBmDNnc0HrCdJytO7Iy2XwjXcM8StIQtr42S/nxsOEHsBqwZiAQDfnobxXS/XCAAAAABJRU5ErkJggg==',
      'configName': 'ET',
      'searchUrl': 'https://cinemaz.to/movies?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true},
  {   'name': 'CZ',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAACXBIWXMAAC4jAAAuIwF4pT92AAACYklEQVRIx2N4RiJggDEen5yWFhxRvvIaXOrJqRnpIWGly65g1bDNg5sBDGSyb0BEdvrwQESkMq5gaLgRw8IAB6JTHj97diuBFSEiNOERqoYLpgzIgCXr6SUbFBHm9CfIGm47QsV52KGMdlcog5sDymh6iqQhBiyk2XP+2cO9GfwIczW6zj59tC9HAGzrKoSG42xAAaaYWxCBXTpQ5UzhNyEi+/RBXItHcA3RIH70Q5gjL0hDNITCRS4qgLyxBKbhqjiQq3QTEXCLweEji4iQZ6tAbgiAaVjLCOQ1IIX0IyOQhiokkSd6QAGRp1ANnSDpDciRGQsS2YkskgwSuQnVUA3inEaWBoucRBZpBolcgmqoA3EOI0sXgESOIYtUgUSuQDVMBnEWI0sHgURWIIv4g4LpPlTDIVAyCn+KkL0sBtIQ8AQhcl0CKKANC6V7oJji2oyQzgYFGwPHOoRICUgkHx5xbSB5hRMw2WnQhCt/FCYyAxQNvEfgGh5JgeTFFoLj/noOPFkLz4eIFIKTZBpS4pvHBRJhNc6sr4qWAbtHAZx3WA0y66tjZMEiyueQ80MDAyrgP9LMiCoisA8lAz1p5kGW1dv+7Em3ILKI6mb0PL3JnBkhrWNubm4hieBzxlzCLARuKjPgBLHYSo3r0rg1+EHVbLCSmkaChqsJwIJIjWgND1vkQExFIjU83agNYRKnIfB4BCcDKRoUhRBMojQg6x3VMIQ0qMiSqCHgSg4vSRqAyXuXOYkanj2Zo0GaBmDNnc0HrCdJytO7Iy2XwjXcM8StIQtr42S/nxsOEHsBqwZiAQDfnobxXS/XCAAAAABJRU5ErkJggg==',
      'configName': 'ET',
      'searchUrl': 'https://cinemaz.to/tv-shows?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'CZ-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAACXBIWXMAAC4jAAAuIwF4pT92AAACYklEQVRIx2N4RiJggDEen5yWFhxRvvIaXOrJqRnpIWGly65g1bDNg5sBDGSyb0BEdvrwQESkMq5gaLgRw8IAB6JTHj97diuBFSEiNOERqoYLpgzIgCXr6SUbFBHm9CfIGm47QsV52KGMdlcog5sDymh6iqQhBiyk2XP+2cO9GfwIczW6zj59tC9HAGzrKoSG42xAAaaYWxCBXTpQ5UzhNyEi+/RBXItHcA3RIH70Q5gjL0hDNITCRS4qgLyxBKbhqjiQq3QTEXCLweEji4iQZ6tAbgiAaVjLCOQ1IIX0IyOQhiokkSd6QAGRp1ANnSDpDciRGQsS2YkskgwSuQnVUA3inEaWBoucRBZpBolcgmqoA3EOI0sXgESOIYtUgUSuQDVMBnEWI0sHgURWIIv4g4LpPlTDIVAyCn+KkL0sBtIQ8AQhcl0CKKANC6V7oJji2oyQzgYFGwPHOoRICUgkHx5xbSB5hRMw2WnQhCt/FCYyAxQNvEfgGh5JgeTFFoLj/noOPFkLz4eIFIKTZBpS4pvHBRJhNc6sr4qWAbtHAZx3WA0y66tjZMEiyueQ80MDAyrgP9LMiCoisA8lAz1p5kGW1dv+7Em3ILKI6mb0PL3JnBkhrWNubm4hieBzxlzCLARuKjPgBLHYSo3r0rg1+EHVbLCSmkaChqsJwIJIjWgND1vkQExFIjU83agNYRKnIfB4BCcDKRoUhRBMojQg6x3VMIQ0qMiSqCHgSg4vSRqAyXuXOYkanj2Zo0GaBmDNnc0HrCdJytO7Iy2XwjXcM8StIQtr42S/nxsOEHsBqwZiAQDfnobxXS/XCAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://cinemaz.to/requests?search=%search_string_orig%&condition=new',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /Request Not Fulfilled/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'DBy',
      'searchUrl': 'https://danishbytes.org/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Glemt din adgangskode|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'DBy-Req',
      'searchUrl': 'https://danishbytes.org/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Glemt din adgangskode|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'DC',
      'searchUrl': 'https://digitalcore.club/api/v1/torrents?categories[]=1&categories[]=2&categories[]=3&categories[]=4&categories[]=5&categories[]=6&categories[]=7&dead=false&limit=1&page=search&searchText=%search_string%+%year%',
      'goToUrl': 'https://digitalcore.club/search?search=%search_string%+%year%&cats=1,2,5,6,3,4,7&fc=true',
      'loggedOutRegex': /It doesnt work here/,
      'matchRegex': /imdbid/,
      'rateLimit': 250,
      'positiveMatch': true},
  {   'name': 'DC',
      'searchUrl': 'https://digitalcore.club/api/v1/torrents?categories[]=8&categories[]=9&categories[]=10&categories[]=11&categories[]=12&categories[]=13&categories[]=14&dead=false&limit=1&page=search&searchText=%search_string%',
      'goToUrl': 'https://digitalcore.club/search?search=%search_string%&cats=8,9,10,11,13,12,14&fc=true',
      'loggedOutRegex': /It doesnt work here/,
      'matchRegex': /imdbid/,
      'rateLimit': 250,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'DesiRel',
      'searchUrl': 'https://www.desireleasers.be/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'positiveMatch': true,
      'matchRegex': /td style/,
      'both': true},
  {   'name': 'DesiRel-Req',
      'searchUrl': 'https://www.desireleasers.be/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'DesiTor',
      'searchUrl': 'https://desitorrents.tv/ajax.php?action=search_torrent_cats',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': /orange-download.png/,
      'mPOST': 'selected_group=&search_username=&selected_sorting=relevance&selected_sub%5B%5D=47&selected_sub%5B%5D=48&selected_sub%5B%5D=49&selected_sub%5B%5D=51&selected_sub%5B%5D=52&selected_sub%5B%5D=53&selected_sub%5B%5D=54&selected_sub%5B%5D=55&selected_sub%5B%5D=56&selected_sub%5B%5D=57&selected_sub%5B%5D=58&selected_sub%5B%5D=103&selected_sub%5B%5D=104&selected_sub%5B%5D=110&selected_sub%5B%5D=117&selected_sub%5B%5D=124&selected_sub%5B%5D=128&selected_sub%5B%5D=129&selected_sub%5B%5D=140&search_string=%search_string_orig%',
      'positiveMatch': true},
  {   'name': 'DesiTor',
      'searchUrl': 'https://desitorrents.tv/ajax.php?action=search_torrent_cats',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': /orange-download.png/,
      'mPOST': 'selected_group=&search_username=&selected_sorting=relevance&selected_sub%5B%5D=59&selected_sub%5B%5D=60&selected_sub%5B%5D=61&selected_sub%5B%5D=62&selected_sub%5B%5D=63&selected_sub%5B%5D=97&selected_sub%5B%5D=98&selected_sub%5B%5D=101&selected_sub%5B%5D=102&selected_sub%5B%5D=113&selected_sub%5B%5D=125&selected_sub%5B%5D=130&selected_sub%5B%5D=132&selected_sub%5B%5D=139&search_string=%search_string_orig%',
      'positiveMatch': true,
      'TV': true},
  {   'name': 'DVDSeed',
      'searchUrl': 'https://www.dvdseed.eu/browse2.php?search=%tt%&wheresearch=2&incldead=1&polish=0&nuke=0&rodzaj=0',
      'loggedOutRegex': /Nie masz konta|Nie zalogowany!/,
      'matchRegex': /Nic tutaj nie ma!/},
  {   'name': 'DWR',
      'searchUrl': 'https://dragonworld-reloaded.net/selection.php?search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|PW vergessen/,
      'matchRegex': /Nichts gefunden/},
  {   'name': 'ExiTor',
      'icon': 'https://exitorrent.org/favicon.ico',
      'searchUrl': 'https://exitorrent.org/browse.php?search=%tt%&blah=1&incldead=0&polish=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Aby odzyskać hasło/,
      'matchRegex': /Nic tutaj nie ma/,
      'both': true},
  {   'name': 'ExiTor-Req',
      'icon': 'https://exitorrent.org/favicon.ico',
      'searchUrl': 'http://exitorrent.org/viewrequests.php?search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Aby odzyskać hasło/,
      'matchRegex': />Nie</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'FE',
      'searchUrl': 'https://finelite.org/selaa.php?search=%tt%',
      'loggedOutRegex': /Se ainoa oikea!/,
      'matchRegex': /notice-info/,
      'both': true},
  {   'name': 'FE-Req',
      'searchUrl': 'https://finelite.org/toiveet.php?search=%search_string_orig%&filter=true',
      'loggedOutRegex': /Se ainoa oikea!/,
      'matchRegex': /icon_cross.png/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'FF',
      'searchUrl': 'https://www.funfile.org/browse.php?search=%search_string%',
      'loggedOutRegex': /You need cookies enabled to log in/,
      'matchRegex': /Try again with a refined search/,
      'both': true},
  {   'name': 'FL',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUfotUje54mZHwpTFssLS8shKW30acsAAAANElEQVQI12MIhQKGEBcwcMXLcGZgMIAwWFzgDAUww4mBGcJwZHERgOhicXFgYHElymSYMwA+oyC+xS3dSAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://filelist.io/browse.php?search=%nott%&cat=0&searchin=3&sort=2',
      'loggedOutRegex': /Login on any IP/,
      'matchRegex': /Nu s-a găsit nimic!/,
      'both': true},
  {   'name': 'FL-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUfotUje54mZHwpTFssLS8shKW30acsAAAANElEQVQI12MIhQKGEBcwcMXLcGZgMIAwWFzgDAUww4mBGcJwZHERgOhicXFgYHElymSYMwA+oyC+xS3dSAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://filelist.io/viewrequests.php?search=%search_string_orig%&filter=true',
      'loggedOutRegex': /Login on any IP/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'FinVip',
      'searchUrl': 'https://finvip.org/index.php?page=torrents&search=%tt%&options=1',
      'loggedOutRegex': /Sinulla ei ole oikeuksia sivulle/,
      'matchRegex': /<td colspan="2" align="center"> <\/td>/},
  {   'name': 'FZ',
      'searchUrl': 'https://www.fuzer.me/browse.php?ref_=basic&query=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Lost Password/,
      'matchRegex': /לא נמצאו תוצאות/,
      'both': true},
  {   'name': 'FZ-Req',
      'searchUrl': 'https://www.fuzer.me/requests.php?action=search&sq=%search_string_orig%&match=any&username=&hide_filled=1&show[movie]=1&show[ilmovie]=1&show[tv]=1&show[iltv]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Lost Password/,
      'matchRegex': /מילות מפתח אחרות/,
      'both': true},
  {   'name': 'FZN',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADyklEQVRIx7WWu4udVRTFf2ufc2fuzOQdIZJCAwoBGcl/kEYLrYLBR2MqGwUbCxFF09n4SpnCIkEsJBDRJlhHiDaiQrCxEoJFJo+Jk8zjft85y+Lem3tnnBtvEnL4yv3ts89ea6+9BMAiPAtBWqMGIR74VBOVMgcV/oDfExyCI6QGCkroIbIDEgQ0RIMPwFXB66RVSFPn8LRRaih7MzIOBPZ05et/o2yDcUZkYhUHpQWNVaftSs4ACbdAszlmS/EJOkQhljPOkKAc/f7baZ5+8fgra5evTBM5t/gkyZGcicojORs5Rwyhv4+TO94WbgUKxootsnNJlVLu64K20X+BAlwBYuxGS0GY6kfTolnbGQuJfTu3gnniNRyDKlfWNqP3+ChHp621XTxcLp1biXBITfFfV9InX+5CKqXmSWTTPz2nDkbY6gzCqklQ+n1OhHu1Q21OfXAtwkAktxvKSWfO7ya1WHnisCiQEB6gqX5OQCkBFmCXdPz59cXDxSZCbevrN+PEu/uI2u9NnjyOhRoYCMJQh6B6yCFDdFJ75pNbOTslJC/fist/5p9/mye1EODJFxzcgwObIm6uU3tDNmuQXVD0xcmba+vev9+lEXh2hjfef4woWMgw+QVHT5/dhPmxV0m++whkiGee7r384tqeXS4tueOl6+ns+e7VG4nw3VLigURUIIq+O720MMfMLIJew445f3hqr2LUxfu6YOwmG/P2iZWcPT9XmkYK1lbjrZM7SwnTV2WNCeRUm8R90LBQPbhfH7+zrKgKhd00LN3QNxcWCA3p0I+cDPLFYy9ABwyBZoi+mAtZxFefXc2ZbpfSqlaXEm9+tKttZ8itCNwn9j1BVuwg5QEfB1pibMLHn9t46ol2vVe7XdmO4Kdf04+/zCpVF9mGdohAzpM2oGtFdXxLIaFKSV9/vnR7VXt3u9fDFvDep12x4bJFFWYjlf7K9ATaeKSYElhSP+OOeW9sjAhy6dzt7RbOgYiZTBUhrq9sKxeblcp2wDrQWXC7Ss4CUsekYSWF9Tt3/6nYWa3czay325ucpM307z8LQ7EoAKWoj1F/uqtHxkoDmmrKfWApTAbaO4rhhtliFMZsW7IUVqHRtLNgQ2f6hdO2VaSXcFALBKOF2oGGSCi2OB6AmqCBMsG5jNkWtZk6jzZIHWw07u862/wpgUlFSvcwg7b75om6J2MRFcdAjcf9nbeUOBIAe9L4eKTqaqgkWMaHiB5VSJsszDYN6BNXE7++zFUThbIAPyS4BX/jIzBLrFLjoQx2NWqpu3EXLsC1fwHfqshpPMqZmAAAAABJRU5ErkJggg==',
      'searchUrl': 'http://fluxzone.org/browse.php?search=%tt%&blah=2&cat=0&incldead=1',
      'loggedOutRegex': /Cloudflare|Ray ID|.Login</,
      'matchRegex': /sit nimic!</,
      'both': true},
  {   'name': 'G-Free',
      'searchUrl': 'https://generation-free.biz/torrents-search.php?search=%search_string_orig%+%year%&cat=0&genre=&incldead=1&freeleech=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Les cookies doivent/,
      'matchRegex': /a été trouvé/},
  {   'name': 'G-Free',
      'searchUrl': 'https://generation-free.biz/torrents-search.php?search=%search_string_orig%&cat=0&genre=&incldead=1&freeleech=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Les cookies doivent/,
      'matchRegex': /a été trouvé/,
      'TV': true},
  {   'name': 'GD',
      'searchUrl': 'https://greekdiamond.info/index.php?page=torrents&search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Δεν είστε εξουσιοδοτημένος/,
      'matchRegex': />0<\/span> matches/,
      'both': true},
  {   'name': 'GiroTor',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://girotorrent.org/index.php?page=torrents&search=%search_string_orig%+%year%&category=0&options=1&active=0',
      'loggedOutRegex': /Cloudflare|Ray ID|OOppss/,
      'matchRegex': /download.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'GT',
      'searchUrl': 'https://greek-team.cc/browse.php?incldead=0&search=%search_string_orig%&blah=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Retrieve Password/,
      'matchRegex': /No data found/,
      'both': true},
  {   'name': 'HB',
      'searchUrl': 'https://hebits.net/browse.php?c27=1&c36=1&c20=1&c19=1&c25=1&search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|תכף נשוב!|register.png/,
      'matchRegex': /לא נמצא דבר/},
  {   'name': 'HB',
      'searchUrl': 'https://hebits.net/browse.php?c1=1&c24=1&c37=1&c7=1&search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|תכף נשוב!|register.png/,
      'matchRegex': /לא נמצא דבר/,
      'TV': true},
  {   'name': 'HB-Req',
      'searchUrl': 'https://hebits.net/viewrequests.php?search=%search_string_orig%&filter=true',
      'loggedOutRegex': /Cloudflare|Ray ID|תכף נשוב!|register.png/,
      'matchRegex': />לא</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'HD-F',
      'searchUrl': 'https://hdf.world/torrents.php?searchstr=%search_string_orig%+%year%&order_by=time&order_way=desc&group_results=1&action=basic&searchsubmit=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe perdu/,
      'matchRegex': /Aucun fichier trouvé/,
      'both': true},
  {   'name': 'HD-F-Req',
      'searchUrl': 'https://hdf.world/requests.php?submit=true&search=%search_string_orig%&showall=on',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe perdu/,
      'matchRegex': /Aucun résultat/,
      'both': true},
  {   'name': 'HD-U',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://hd-united.vn/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT YOUR PASSWORD/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'HD-U-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://hd-united.vn/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT YOUR PASSWORD/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'HDA',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRUlEQVQ4y7WTS0iUARSFv/kbw2eYio8onFr0LuhdRNEiicKkNrnJ2jSbgh5EVFQitZIosiJ7+MKgpwjWIloUIlL5IFBRe5BazqTVlDoz+vNP889pYVabXkRnd7mHy7n3nAv/CMefkCR/MmYglpgE0+GY4PvjAZI/hcbLeTRczSPrRBWdR3JJmtNO0rwW0lbVk7qq6dcDzri68fW4CCdEOP7AS/nSKUR/bZrA9p584xu5636WyjbcVUfVAQB5mxYwLj2FhVsDHHj4lm5PFa7cIESLCJC8yPIZmfFfpSpKJ6JMnZxu9cmqUVt1tu7tKlLFutc6OCGsoe59AJ+kbJXG27qI5LnRLyndCUBryTbsz9GE3kXSj8ZsxIjkEAXYQMZiqy/WlQkwsaN4EkbQwBkXGUrLrUt0OPpHV2i+4iYMDA8ZTF5rMn/98GgNbDo4kOGkEIDnZ/dgA7PdgXEObo7K97XOVD5S6frhV5ZaeqWTurS6SwVIx+Lt97ZuAOhDw2JVIBUjaaB57HYGdYWHCAA5ewenjWf55M47tXTVTcUCVrj90QbXAXhxxY2AtJWmL5RY892qJ8VFOrXE7DNVMea9Gsseq2CWNSj/I0lOtRXuVznSGaT+Gq+klB/CImMwrB2hkBbI/2yGypHqd5+39W6n2k9XqXKSRxeQKjND6qro/zSiaz8PzsubW1QaZ6sE6SLSOaRby0x9fODtDap2JKzNv839ZwUP62Hee1WvGdFwx5u3I7odCmnZX32YpFRPQE8tS3P53/gC401Ev6fyBOQAAAAASUVORK5CYII=',
      'searchUrl': 'https://www.hdarea.co/torrents.php?incldead=1&search=%tt%&search_area=4',
      'loggedOutRegex': /Cloudflare|Ray ID|recover.php/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'HDAI',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www.hd.ai/Torrents.tableList?page=1&limit=50&searchParams={"keyword":"%tt%"}',
      'goToUrl': 'https://www.hd.ai/Torrents.index?keyword=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /"total":0/,
      'both': true},
  {   'name': 'HDAtmos',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAbUExURQF7vBNtlyVfcy5YYDNUV0BKPFFLNldRP+vn3v1aAn8AAACPSURBVCjPXZFJEgMgCAS7spTfNZcMP3CenYMEF250AY0I2gM4gaDJK4Y67/AeHZ1A6Mg9iBtshgnaAmF7kKtEBy1gewdtAwJoYY9ePAF8JwcUUxfZMXubqgDZ/rQamdatYE5fW6X1BjSvmWEPXqdEPG7wPEHPxrLOe40lmedSgTxwv8D/JXEW1E8p8/qHzH/TeLn7aLMO2QAAAABJRU5ErkJggg==',
      'searchUrl': 'https://hdatmos.club/torrents.php?incldead=1&spstate=0&search=%tt%&search_area=1&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'HDb',
      'searchUrl': 'https://hdbits.org/browse.php?c1=1&c2=1&c3=1&c4=1&c5=1&c7=1&c8=1&imdb=%tt%',
      'loggedOutRegex': /Make sure your passcode generating|nginx/,
      'matchRegex': /Nothing here!/,
      'both': true},
  {   'name': 'HDC',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAACVBMVEUQYaly1v////9/NZv5AAAAOklEQVQI12NgAAGFroYFDAodShwggoFBC0QoQAmgWFfTAgYEYBFwcWAQBBECAi4BIJYLA4uoQABYEgDsXQq2+4cHAAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://hdchina.org/torrents.php?incldead=0&spstate=0&inclbookmarked=0&boardid=0&seeders=&search=%tt%&search_area=4&search_mode=2',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found! Try again with a refined search string./},
  {   'name': 'HDFans',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABnRSTlMAAAAAAABupgeRAAAE2ElEQVRIx81WS2wbVRSdGXvssSe248SOHRI3cZLG+ZIPpYQ2oIoiFD4ChCqBKliAgAWoO9IiVrCjAbEJCBYsEJvAAkVIpQIV0U0kKFRKnB9NQ344P9tJ7IztsefzZniTNx7PjFOigpB4vrbfvHvnnnfuve+DYf9xs/zL962UyxPq9EdO4TjOMclyA/xuPeIWkvaFPKEub2NvzfE+37E2d00tgeM8D379emR+/P1/AkB5Aq7aVm+4z9/SX93Q4a0L2+w2C4ERBE7A3wMfkoxlsuK3l86k16YNFO9AvKIi2FLZcG9VuNff3Outb3a6KqFH5BQnDPOCrlEjbRZf5LQJoGRJ14Tdoa7L773T3dZspZxWmx3qcEWPL+6K393mTJMYCJEPhmz6EVmWmd34q88/GY1GzQy6z1/uePwVu50MRqhqnzXkMSS/1WeZ3BZj+8DoDnOQWL27ZJkX5MWcC8cNYccdVfWBnqFTr39I2UuqiM86POjU2y3sgA8mcuXBhFO5OOh0kDj0/u5PueXN/auXBtnkqmZAuELdvvbTOC4DSRaBKnNxAalvJcUipGWgntQMNFnZE9fSCjP4G88CK0XTgRb9DIhCaiubiAkAE42C2jdz3A4rof75HspG4GKZJcrxfALAPky4p/E+A0AusZRaneIFWRANgtRwjp/8zKK+k8Sf7bCbzKDIB7aSpPSBhLkbew0AoJDJxKZ5TgBA1otagkCe2RR+i6kReyJib/NZzJayWqywL0uyK9hK2Er5I+C3sLfObK2I4mEAkvLa5zdyLK+OvHzCaQJADKBr2Ic8nP4GR3WDAUASCvubi0itSXERKf1tBoxNqoFqrLI81W7XWyIK8E970RXqMQDAll6+eTiD4uP4dH5lV62oF/qclAUrC5FGSKbrOs0AMA0KgE5KAMWRzyay6pq34a8N0Np4MUSY+ghkV6jPDMDGb3O57J1ygGQyxl+7VUDjj0aoriCpz4EkFd9V0tBEVvgMAHx6g9leEgUzAwAMtD6+zuQ4VfXWWVeRgaxnIImy1VFlr240AMDGxGb1S1QFkAzrNs1Ko9cZpAq4LS89QMNBuVgOmpmkpKHHDJBdN6ShPAdIrkTZqRiPtOf66RqaUJNcZIBI0HV9ZoDc+hQQsTIAzAQA5aMf9pG2wo5feMRdWgeaDZApfyva60sA3N4qm96CJJBoOdBGNPl9g//qhlpRD7dSxwNWxEAzgBg2bxPpvscAAPKpfHL1yBAh+fRHZisNijwItYr0EcYpR6DTAKBEaSMKinWpJdm0MSBJ58DIlZTh/NEVNNoUSG/YDMBuTiF8uHH+TQ6QXJtmby6XzlETA4ghpGNmAC65IIoi1D3dT6ORE2H7oQyQvD22oz9B0SpTYiDjqblxZuGq+VbBp1YuDpFdYd/JFgqNvPmY52yng8lLL45ul5+XfyaE0e/TF4YqDxhIXGZbSC0VErP52C+5tYlDri0y4NuChOYdtbY6Gyon7R6CPrAKJZ4Z+XLmmZ6HjtVWpmfGVr8YlgX2iIuX9/43Kk8OKzx1JppHTOLFTIzfW+Di01w8yu8tATZ5xE3QfFd1+oPPjVldTXCHgbcMZZPPJ4TUH3wSepzld+bFzBY8QO7iqnnIfZiucbWfs9AB6I5LzAr7azKfxf637S/kjKHfRT6qsgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://hdfans.org/torrents.php?search=%tt%&search_area=1',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'HDH',
      'configName': 'HDHome',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFW0lEQVRYw92XW2hcVRSGv3XOmUwyY5u2ptaqoU0botFqW1uk2Hp5EQSpYqmCgoKXF/VBfOiDRaEv4gVRBBUqii/eUNTqgz56wSuKpmlStW2aauy9mubSaTJnr718mJyZMzMnxQdFcMMP56y91t7/+ffaZ68N/3GTf2PQG1+xOYV2ugOjS4yfX79Vdv9rBNZst9yFHXR6ZYXAqnwLq1tCLopyLA5AYoeOT/HUm5vliX+EwG1v2CITeghY3ZLj8ijk4lxEVxTSEgYQBEgQQDAzsjeYLOEmprj2zc3S3zhedKbJbnnbzgK6A+GyUFiVi1iVi1geBcwLA0gmlKD5S7ylJokIvWc90H9GBW5527q8seLRq9m6oI3lsaegkBdABDBk6CTuo/1MZxFedz65K86lpdFuYPmQoxfM4QYR2ZmpwOa37Mm2PHe3RORGy7QuPIuos52wcbDl8wn7juNGxtGmiQzacrC4WB835bBD48zJWnLZ9JpdQMD1c4s83ZpHJOVy4QKiB9dSaAzaN4o+8x2nZlu6zrmED62l0BohUw577CtO/XaSsfESG3bcJgfSvkEMl0rEegkwNcz5GgZPECeOe0dxyXP3fMJ1i8mlfdMYPokbmagoNDKBHi2hQNE83Y1kA405HMeMxAouA0nbsYfpP6fw1XzppbVFEDdLXJKDP59AnVaS0nvWNBEY8wyVlb5yjMWuGYmjU2z7D5SS97YIuamHfFZM7DCzal5Y7DD1YAGrmgh8eY9MmNAfO2L1WCOqCeaxXUeJfzxSW5brusj3nk2YGTcTqQbqMTMsMHrWbLe6nAoAph2/O8ewc5hqPar72oMq9uqPnDod1+x3XEqhMUa1pgBWefceE2HJ/IAlTQQ+vUumppW9qpi3elQJUHk/PIm++1NtKTrbCTf2kG+Kk0qsGaTHCoSVTQQA1PG909kVsJTtvd2cHhmr7YpNvRTawopC1bhUDlRVAfMBl2QScEq/c5g2ILUEdfaXv2cy6SvkkHsvp5juryahh6pNMTyrMwmUPXucY9L7ynolSOdA2v7DQcqfDTOV9F+9lNbLFpFL+hMC3moxapjAsmu3W0cTga/vk4NlZSiOsxVQbVbnha8YL5VrPg9eyZxq3Mwi1CngMPMsiI2lTQQA4pgBp1jsa6gSsHp77LHR0/iXvmU88ekoEt65hmLsSW2C+hhvGFpLxDoCTul3mq2AZSigDvtwkNLgEcqJ38ZeiucWCJJIn1JAHeYVQ2t5UEdAHX0a1wdUc0Dr7Wk89zljiV+xBXlgPXNTSVjvX/lH9GAmTQSmyxyIPYedwxJUyfmarRGDhyjv2FXbFeuW0Lqso3LUew9pX3WY9yxb+SznNRHY9bCMquPALArYbAqow178jPFjE7UaoZCrjG3W7OsdrZGr/A+CxsNBlZ3qK1+sDUmY9c9PMFpCn/uE0aYiJTVWAl85truyCXj6EqbFXK2C8W72HEjw8QCl/t/ryzWfoYAqJp6RTAIovziPU8VuXkkxMa9dQj7r0GnE1g840VimqVa+3Ck4jyi837dVPsqsilUZfuxmckvn07Gyk9bEfveVtF/TTdvkNP72lzkyWzk2fIz4lS84ec8G5s0Q8M44IjBkwoB4vhkc4Ysz3gv2HrOD3QsrWZrVLnqE4XRdLYbMaCkI4wQc+GYLV7UXmDf8By9ueJ4th7ZJ6W9fTHq32f1aZov5WglWnawyCYCIUCZghIBfxOiXgJ3xNEP7Hpfjf/eik3kxiad5RyI2mbHMDBNBTPAScMxgn0T0e8eARezef4jDvCTxP345Xb7NzgmVzcAihN3eGBgL+fX4Npnk/9T+AgPhsag0aZ/vAAAAAElFTkSuQmCC',
      'searchUrl': 'https://hdhome.org/torrents.php?search_area=4&search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found! Try again with a refined search string/},
  {   'name': 'HDME',
      'searchUrl': 'https://hdme.eu/browse.php?blah=2&cat=0&incldead=1&search=%tt%',
      'loggedOutRegex': /You need cookies enabled/,
      'matchRegex': /Try again with a refined search string./},
  {   'name': 'HDME',
      'searchUrl': 'https://hdme.eu/browse.php?search=%search_string%&blah=0&cat=0&incldead=1',
      'loggedOutRegex': /You need cookies enabled/,
      'matchRegex': /Try again with a refined search string./,
      'TV': true},
  {   'name': 'HDMonkey',
      'searchUrl': 'https://hdmonkey.org/torrents-search.php?c75=1&c26=1&c42=1&c50=1&c74=1&c49=1&c46=1&c24=1&c28=1&search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found|Nu a fost gasit nimic/},
  {   'name': 'HDMonkey',
      'searchUrl': 'https://hdmonkey.org/torrents-search.php?c41=1&c52=1&c48=1&c9=1&search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found|Nu a fost gasit nimic/,
      'TV': true},
  {   'name': 'HDS',
      'searchUrl': 'https://hdsky.me/torrents.php?incldead=1&search=%tt%&search_area=4&search_mode=0',
      'loggedOutRegex': /SSL \(HTTPS\)/,
      'matchRegex': /Nothing found!/},
  {   'name': 'HDS',
      'searchUrl': 'https://hdsky.me/torrents.php?cat402=1&cat403=1&incldead=1&search=%search_string%&search_area=0&search_mode=0',
      'loggedOutRegex': /SSL \(HTTPS\)/,
      'matchRegex': /Nothing found!/,
      'TV': true},
  {   'name': 'HDSpace',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACJVBMVEUAAAAICAgMDAwUFBQYGBgcHBweHh4gICAgICIkJCQmJiYoKCgqKiosLCwuLi4wMDAyMjIyMjQ0NDQ0NDY0ODg4NjY4ODg4ODw4Ojw6PD48PDw8PD48PEA8PkA+PkJAQEBAQERAQkJAQkRCQkZEREREREZEREhERkhGREZGRkhGSEpISEhISExISkpISkxITExITE5KSkxKTE5MTExMTFBMTlBMUFBOTExOUFJQUFBQUFJQUFRQUlRSUlZSVFZUVFRUVFZUVFhUVlhWVlpYWFpYWFxYWlxaWlxcXGBcXmBcYGBeXmBeYGJgYGBgYGJgYGRgYmRgZGRiZGZkZGRkZGhkZmhmaGpoaGxoamxobGxqampqam5sbGxsbHBsbnBscHBucHBucHJwcHBwcHRwcnBwdHBwdHRydHR0dHR0dHh0eHh2dnZ2eHh4eHh4eHp4eHx4enx4fHx8fIB8gIB+foKAgISAhISChIaEhIiEiIiIiIyIjIqIjIyMjI6MjJCMkI6QkJCQkJSQkpKQkpSQlJSUlJiUmJiYmJiYnJyanJyanJ6cnKCcoKCgoKCgpKSkpKimpqqmqqioqKyoqqqsrLCwsLCwsLSwtLS0tLi4uLi4uLy8vLy8vMC+wL7AwMDAwMTAxMDAxMTExMjIyMjIyMzMzMzM0NDO0tDQ0NDU2NjY2NjY2NzY3Njc4Nzc4ODg4ODk5OTk6Ojo7Ozs8PDw9PD0+PT4+PweuDG8AAADNElEQVQYGV3By25bVRQG4H/vtfY+F5/YTuLESVyqgNQSqQgGVAhRxICCuAnEpJ0xYNIBPATPwQMwYwoCBJ2WQAdQAapUNWrqxCEXJ/E5ts9l36gAMeD7xEs1FLOFMhyaTE+cS1xZKX3ACJIF0aZr+dC4kIagJZVBqQVbIgQlnL3sp4IpcQjoqLkSAk3HWHFiktJ4awKPagFJmohhglBdz9H6kmq8ayiEYJzLbSC66IT0WgpvLLGYt5MqFsEiSNG1ThuS3grFqW6gPFEC1coGKWlNIJLCwrNUsRM+CL5jk2u1n3bqY2Q21zqfeFhB0msJJZtSeLng6twn9d4UilQWgzlW4Mhbkqb16k+EFPrer/ym+cXhb1IvwrCuAyEsrHmFXit16kr3QEr8w51nCUsNRNL+cRyj37UaV0Qe4z/cYxZkKAonLsnai4cJLhWvnMyNMSTyCUA169KlXqqGsvV+8jhr92KKjoY5LqlIVfAVg4MgJPMYHdU6ia+mkGSHsb6G722MhthCERIyjKfSUPFyRGxSz8nYGzB8zaqRJJP49hTXW8NtfCg1WrNt9Jss3imQboobIro9Cvi/Txa8+bzEi4nU8ov9gCdab+BfsgOR5ad7JZKu4ulXHunbB3fw3us3b+HTdz3s5BZot4i/Bl6QQf5osfrB4n3Qa+kRcNH64MoGmccPFVZ7MuJz4IY/Pcf7ld8Gnqa6qh4B6f7PBulVE8AWcnP8ZZDPH9O3iKdw5/V3wGgErF2nwwAWCOHuMT6eTiYN1kddXZwNAVD/ZdKloERc2MMTz71T6Ggpn6tlOT6f2YDIt58Z3483OvTZ7wX05a2z5U5qDqpa1mdVYznl6NkNsb7VYZYf2c7+nxdXUJTFWFvfnlml1hVtrFS8Gj/e47t1MjyKBr2dh6IVO9ipEytZItpr5nBcmwcFl8iHSbt5cM9m7blQDKWVnIamqk9OHyW9Ne4fRDqqv/EpTaeFlqWqcTpD0lCv26Kl/li8NSHXEUUsfeMz8qwhBQYFBoPFyuh8h0u2yQwizJ2NrffOcmswxJa7sATMdn+r2M+1KrwuQFQL3+md2tkodNfLFC7ffdiovwAwkJZAwmXSqAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://hd-space.org/index.php?page=torrents&active=0&options=2&search=%nott%',
      'loggedOutRegex': /not authorized to view the Torrents!/,
      'matchRegex': /<td colspan="2" align="center"> <\/td>/,
      'both': true},
  {   'name': 'HDSpain',
      'searchUrl': 'https://www.hd-spain.com/browse.php?%search_string_orig%',
      'loggedOutRegex': /Error 404 No encontrado/,
      'matchRegex': /xxx Change Me xxx/,
      'both': true},
  {   'name': 'HDT',
      'icon': 'https://hdts.ru/favicon.ico',
      'searchUrl': 'https://hd-torrents.org/torrents.php?active=0&options=2&search=%tt%',
      'loggedOutRegex': /not authorized to view this/,
      'matchRegex': /No torrents here/,
      'both': true},
  {   'name': 'HDT-Req',
      'icon': 'https://hdts.ru/favicon.ico',
      'searchUrl': 'https://hd-torrents.org/requests.php?search=%search_string_orig%',
      'loggedOutRegex': /not autorized to view this/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'HDtime',
      'searchUrl': 'https://hdtime.org/torrents.php?incldead=0&search=%tt%&search_area=1',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'HDTurk',
      'searchUrl': 'https://hdturk.club/browse.php?do=search&keywords=%tt%&search_type=t_genre&category=0&include_dead_torrents=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|Lütfen Giriş yapınız/,
      'matchRegex': /dl.png/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'HDU',
      'searchUrl': 'https://pt.upxin.net/torrents.php?search_area=4&search=%tt%',
      'loggedOutRegex': /SSL \(HTTPS\)/,
      'matchRegex': /Nothing found!/},
  {   'name': 'HDZ',
      'searchUrl': 'https://hdzone.me/torrents.php?search=%tt%&search_area=1',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'Hon3yHD',
      'icon': 'https://hon3yhd.com/templates/2/pic/favicon.ico',
      'searchUrl': 'https://hon3yhd.com/browse.php?c31=1&c70=1&c30=1&c68=1&c73=1&c9=1&c10=1&c71=1&c8=1&c7=1&c1=1&c2=1&c32=1&c33=1&c4=1&c18=1&c72=1&c5=1&c36=1&c15=1&c11=1&c17=1&c16=1&c29=1&c3=1&search=%search_string_orig%&searchin=title&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': /Nothing found/},
  {   'name': 'Hon3yHD',
      'icon': 'https://hon3yhd.com/templates/2/pic/favicon.ico',
      'searchUrl': 'https://hon3yhd.com/browse.php?c68=1&c73=1&c21=1&c20=1&c19=1&search=%search_string_orig%&searchin=title&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': /Nothing found/,
      'TV': true},
  {   'name': 'Hon3yHD-Req',
      'icon': 'https://hon3yhd.com/templates/2/pic/favicon.ico',
      'searchUrl': 'https://hon3yhd.com/viewrequests.php?search=%search_string_orig%&category=0&filter=true',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': /Nothing here/,
      'both': true},
  {   'name': 'HQS',
      'searchUrl': 'https://hqsource.org/browse.php?c36=1&c3=1&c2=1&c49=1&c1=1&c8=1&c4=1&c7=1&c45=1&c9=1&c5=1&search=%search_string_orig%+%year%&blah=1&incldead=1&polish=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Zapomniałes hasła/,
      'matchRegex': /Nic nie znaleziono/},
  {   'name': 'HT',
      'searchUrl': 'https://huntorrent.net/browse.php?search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Elfelejtett jelszó/,
      'matchRegex': /Az általad megadott/,
      'both': true},
  {   'name': 'Immortuos',
      'searchUrl': 'https://immortuos.life/filterTorrents?imdb=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|Hast du dein Passwort vergessen/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Immortuos-Req',
      'searchUrl': 'https://immortuos.life/filterRequests?imdb=%nott%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Hast du dein Passwort vergessen/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'IPT',
      'searchUrl': 'https://ip.findnemo.net/t?q=%tt%',
      'loggedOutRegex': /Ray ID|security check to access|Forgot your password/,
      'matchRegex': /No Torrents Found!/},
  {   'name': 'IPT',
      'searchUrl': 'https://ip.findnemo.net/t?72=&73=&q=%search_string%&qf=ti',
      'loggedOutRegex': /Ray ID|security check to access|Forgot your password/,
      'matchRegex': /No Torrents Found!/,
      'TV': true},
  {   'name': 'IPT-Req',
      'searchUrl': 'https://ip.findnemo.net/requests?72=&73=&q="%search_string_orig%"',
      'loggedOutRegex': /Ray ID|security check to access|Forgot your password/,
      'matchRegex': /\( 0 requests/,
      'both': true},
  {   'name': 'IS',
      'searchUrl': 'https://immortalseed.me/browse.php?do=search&keywords=%tt%&search_type=t_genre',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': />Nothing Found</},
  {   'name': 'IS',
      'searchUrl': 'https://immortalseed.me/browse.php?do=search&keywords=%search_string_orig%&search_type=t_name',
      'mPOST': '{key:"selectcats[]",value:"4"},{key:"selectcats[]",value:"6"},{key:"selectcats[]",value:"8"},{key:"selectcats[]",value:"9"},{key:"selectcats[]",value:"47"},{key:"selectcats[]",value:"48"},{key:"selectcats[]",value:"53"},{key:"selectcats[]",value:"54"},{key:"filtercats",value:"Filter"}',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': />Nothing Found</,
      'TV': true},
  {   'name': 'IS-Req',
      'searchUrl': 'https://immortalseed.me/viewrequests.php?do=search_request',
      'mPOST': 'do=search_request&keywords=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': /input_true.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'IT',
      'searchUrl': 'https://newinsane.info/browse.php?search=%tt%',
      'loggedOutRegex': /Ray ID|login_button/,
      'matchRegex': /Nincs találat|Nothing found|Nu s-a găsit|Nič sa nenašlo|kein treffer/,
      'both': true},
  {   'name': 'IT-Req',
      'searchUrl': 'https://newinsane.info/requests.php?category=0&search=%search_string_orig%&status=ungranted',
      'loggedOutRegex': /Ray ID|login_button/,
      'matchRegex': /Nincs találat|Nothing found|Nu s-a găsit|Nič sa nenašlo|kein treffer/,
      'both': true},
  {   'name': 'iTS',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAHlBMVEUAAAAAAP8A/wAA////AAD/AP///wD/////////AACGhHKfAAAACXRSTlMAgICAgICAgMCrlKeDAAAB80lEQVQ4y8WUMWtbQRCEB8fkeJ2rQDoVgZBOhSHtC3IiXieckKDuGRTEdlc8LO5fyNJ6L9+/TXGS7D8Qcu3s7Mzc3p70X0/dv0WdgVXJRoFBllLUjtwBhMQfBVBGSb4vNnbYADOxEWAcJcVzoe8YLJgLFwH8luTRsTXKQKxETICxlOR3ggELmKkjAogqaZo0YQHVs9LgxEkjJSXvwGAmlQonjW1Od3UAiJUe2WCBHSVF7eodFhjz5vXEeD6WCABs1byeGAdP+ycAmMnALjkO3eGAR+BZrSA4SgkvEOEEc4Fdkk8/0gAERK8J7Jz8apEXsiDwrOvba7DGUC1luQaiDpJ2GNhSkupj1A4M/5SlFmUrST4QxYB430styo0kuRFrDIv19swYJcl/uRcwnmwpCYO4kZQO+X5VMBhLkgSGj5LE9vFbAVh2dVcyYHEjSdNPKAR8TEuLikFkSUpbMIhYaSo4GF/ak0vYEOCSSrv3n2cAIzhmqYRjkBrQwRoYJUGA+bwRSmCGf5d2mANjliSVVrYflQIC47Z1wgzgIau0wfpFmsD8nVTaZB/yBQA2c6lgGJv7Swoz/E1TM+jnL62IPuvUanMK0YD+c/Nn7Bf5DLj7Ip2Nf/0wv2ynR38yXob+avWytjnvzuSU8qt9Tq9q/smH8RfRnFL/2ah1LgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://shadowthein.net/browse.php?incldead=1&search=%tt%&search_in=all',
      'loggedOutRegex': /most comprehensive people|JavaScript is disabled/,
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'iTS-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAHlBMVEUAAAAAAP8A/wAA////AAD/AP///wD/////////AACGhHKfAAAACXRSTlMAgICAgICAgMCrlKeDAAAB80lEQVQ4y8WUMWtbQRCEB8fkeJ2rQDoVgZBOhSHtC3IiXieckKDuGRTEdlc8LO5fyNJ6L9+/TXGS7D8Qcu3s7Mzc3p70X0/dv0WdgVXJRoFBllLUjtwBhMQfBVBGSb4vNnbYADOxEWAcJcVzoe8YLJgLFwH8luTRsTXKQKxETICxlOR3ggELmKkjAogqaZo0YQHVs9LgxEkjJSXvwGAmlQonjW1Od3UAiJUe2WCBHSVF7eodFhjz5vXEeD6WCABs1byeGAdP+ycAmMnALjkO3eGAR+BZrSA4SgkvEOEEc4Fdkk8/0gAERK8J7Jz8apEXsiDwrOvba7DGUC1luQaiDpJ2GNhSkupj1A4M/5SlFmUrST4QxYB430styo0kuRFrDIv19swYJcl/uRcwnmwpCYO4kZQO+X5VMBhLkgSGj5LE9vFbAVh2dVcyYHEjSdNPKAR8TEuLikFkSUpbMIhYaSo4GF/ak0vYEOCSSrv3n2cAIzhmqYRjkBrQwRoYJUGA+bwRSmCGf5d2mANjliSVVrYflQIC47Z1wgzgIau0wfpFmsD8nVTaZB/yBQA2c6lgGJv7Swoz/E1TM+jnL62IPuvUanMK0YD+c/Nn7Bf5DLj7Ip2Nf/0wv2ynR38yXob+avWytjnvzuSU8qt9Tq9q/smH8RfRnFL/2ah1LgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://shadowthein.net/viewrequests.php?search=%search_string_orig%',
      'loggedOutRegex': /most comprehensive people|JavaScript is disabled/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'JoyHD',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www.joyhd.net/torrents.php?search_area=4&search=%tt%',
      'loggedOutRegex': /Resend Email Verification/,
      'matchRegex': /Nothing found! Try again with a refined search string/},
  {   'name': 'JPTV',
      'searchUrl': 'https://jptv.club/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'JPTV-Req',
      'searchUrl': 'https://jptv.club/requests?unfilled=1&tmdbId=%tmdbid%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /label-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'KG',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://karagarga.in/browse.php?sort=added&search=%nott%&search_type=imdb&d=DESC',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in!/,
      'matchRegex': /No torrents found/,
      'rateLimit': 125,
      'both': true},
  {   'name': 'KG-Req',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://karagarga.in/viewrequests.php?search=%nott%&filter=true',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in!/,
      'matchRegex': /1&nbsp;-/,
      'positiveMatch': true,
      'rateLimit': 125,
      'both': true},
  {   'name': 'Lat-Team',
      'searchUrl': 'https://lat-team.com/torrents/filter?tmdb=%tmdbid%',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT YOUR PASSWORD/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Lat-Team-Req',
      'searchUrl': 'https://lat-team.com/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|FORGOT YOUR PASSWORD/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'LeechTurks',
      'searchUrl': 'https://leechturks.com/torrents.php?incldead=1&search=%tt%&search_area=4',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'LM',
      'searchUrl': 'https://www.linkomanija.net/browse.php?incldead=1&search=%tt%&searchindesc=1',
      'loggedOutRegex': /Prisiminti mane/,
      'matchRegex': /Nieko nerasta./},
  {   'name': 'LM',
      'searchUrl': 'https://www.linkomanija.net/browse.php?c30=1&c60=1&c28=1&c62=1&c65=1&c58=1&incldead=0&search="%search_string%"',
      'loggedOutRegex': /Prisiminti mane/,
      'matchRegex': /Nieko nerasta./,
      'TV': true},
  {   'name': 'LM-5z',
      'searchUrl': 'https://www.linkomanija.net/torrents.php?cat=0&search="%search_string%"',
      'loggedOutRegex': /Prisiminti mane/,
      'matchRegex': /Torrentų nėra./,
      'both': true},
  {   'name': 'LS',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://letseed.net/browse.php?do=search&keywords=%tt%&search_type=t_genre&category=0&include_dead_torrents=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|Şifre kurtarma|Recover Password/,
      'matchRegex': /dl.png/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'M-T',
      'searchUrl': 'https://kp.m-team.cc/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search=%tt%&search_area=4&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|type="password" name="password"|An error occurred|Please input the 6-digit code/,
      'matchRegex': /download.php/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'M-TB',
      'searchUrl': 'https://masters-tb.com/browse.php?search=%tt%&cat=0&incldead=1&searchrs=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Трябва да влезеш в акаунта/,
      'matchRegex': /Открити торенти - 0/,
      'rateLimit': 3000,
      'both': true},
  {   'name': 'Milkie',
      'icon': 'https://milkie.cc/favicon.png',
      'searchUrl': 'https://milkie.cc/api/v1/torrents?query=%search_string%+%year%&oby=created_at&odir=desc&categories=1&pi=0&ps=50',
      'goToUrl': 'https://milkie.cc/browse?query=%search_string%+%year%&categories=1',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /hits":0/},
  {   'name': 'Milkie',
      'icon': 'https://milkie.cc/favicon.png',
      'searchUrl': 'https://milkie.cc/api/v1/torrents?query=%search_string%&oby=created_at&odir=desc&categories=2&pi=0&ps=50',
      'goToUrl': 'https://milkie.cc/browse?query=%search_string%&categories=2',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /hits":0/,
      'TV': true},
  {   'name': 'MKO',
      'icon': 'https://makingoff.org/forum/favicon.ico',
      'searchUrl': 'https://indice.makingoff.org/response.php?search_term=%tt%',
      'goToUrl': 'https://indice.makingoff.org/index.php?origem=busca&search_term=%tt%',
      'loggedOutRegex': /que todos efetuem login/,
      'matchRegex': /total":0/,
      'both': true},
  {   'name': 'MOJBLiNK',
      'searchUrl': 'https://www.mojblink.si/brskanje?cat=0&search=%tt%&searchin=descr&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Niste prijavljeni/,
      'matchRegex': /ni vrnilo rezultatov/,
      'both': true},
  {   'name': 'MovieTorrentz',
      'searchUrl': 'https://m2g.link/torrents-search.php?c112=1&c127=1&c113=1&c108=1&c110=1&c109=1&c126=1&c107=1&search=%search_string%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found/},
  {   'name': 'MovieTorrentz',
      'searchUrl': 'https://m2g.link/torrents-search.php?c116=1&c115=1&c128=1&c114=1&search=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Account/,
      'matchRegex': /Nothing Found/,
      'TV': true},
  {   'name': 'MP',
      'searchUrl': 'https://majomparade.eu/letoltes.php?tipus=1&k=yes&name=https://www.imdb.com/title/%tt%&category[]=&tipuska=0&imdb_search=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|Az oldal használatához/,
      'matchRegex': /Nincs találat/,
      'both': true},
  {   'name': 'MP-Req',
      'searchUrl': 'https://majomparade.eu/keresek.php?k=yes&name=%search_string_orig%&category=&majomt=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Az oldal használatához/,
      'matchRegex': />Nem</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'MS',
      'searchUrl': 'https://www.myspleen.org/browse.php?search=%search_string%&title=0&cat=0',
      'loggedOutRegex': /<title>MySpleen :: Login<\/title>/,
      'matchRegex': /<strong>Nothing found!<\/strong>/,
      'both': true},
  {   'name': 'MTV',
      'searchUrl': 'https://www.morethantv.me/torrents.php?filter_cat[1]=1&filter_cat[2]=1&title=%search_string%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgotten password/,
      'matchRegex': /search did not match/},
  {   'name': 'MTV',
      'searchUrl': 'https://www.morethantv.me/torrents.php?filter_cat[3]=1&filter_cat[5]=1&filter_cat[4]=1&filter_cat[6]=1&title=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgotten password/,
      'matchRegex': /search did not match/,
      'TV': true},
  {   'name': 'NB',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://norbits.net/browse.php?incldead=1&fullsearch=0&scenerelease=0&imdbsearch=%tt%&imdb_from=0&imdb_to=0&search=',
      'loggedOutRegex': /Ikke innlogget!/,
      'matchRegex': /<h3>Ingenting her!<\/h3>/,
      'both': true},
  {   'name': 'NBL',
      'searchUrl': 'https://nebulance.io/torrents.php?order_by=time&order_way=desc&searchtext=%search_string%&search_type=0&taglist=&tags_type=0',
      'loggedOutRegex': /have cookies disabled./,
      'matchRegex': /search did not match|are Cylons aboard/,
      'TV': true},
  {   'name': 'NBL-Req',
      'searchUrl': 'https://nebulance.io/requests.php?type=&submit=true&search=%search_string_orig%',
      'loggedOutRegex': /have cookies disabled./,
      'matchRegex': /No requests/,
      'TV': true},
  {   'name': 'nCore',
      'searchUrl': 'https://ncore.pro/torrents.php?mire=%tt%&miben=imdb&tipus=all_own',
      'loggedOutRegex': /Cloudflare|Ray ID|Jelszó-emlékeztető|Password recovery/,
      'matchRegex': /Nincs találat/,
      'both': true},
  {   'name': 'nCore-Req',
      'searchUrl': 'https://ncore.pro/requests.php?tipus=&mire=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Jelszó-emlékeztető|Password recovery/,
      'matchRegex': />\s*Nem\s*</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'NPlus',
      'searchUrl': 'https://nordicplus.org/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'NPlus-Req',
      'searchUrl': 'https://nordicplus.org/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'NTELogo',
      'searchUrl': 'https://ntelogo.org/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'NTELogo-Req',
      'searchUrl': 'https://ntelogo.org/requests?unfilled=1&tmdbId=%tmdbid%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /label-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'Oasis',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://oasis-fun.club/TTV3/Torrents/Recherche?recherche=%search_string_orig%+%year%&type=tout',
      'loggedOutRegex': /Cloudflare|Ray ID|Compte Oublié/,
      'matchRegex': /Aucun Résultat/},
  {   'name': 'Oasis',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://oasis-fun.club/TTV3/Torrents/Recherche?recherche=%search_string_orig%&type=tout',
      'loggedOutRegex': /Cloudflare|Ray ID|Compte Oublié/,
      'matchRegex': /Aucun Résultat/,
      'TV': true},
  {   'name': 'OurBits',
      'searchUrl': 'https://ourbits.club/torrents.php?search_area=4&search=%tt%',
      'loggedOutRegex': /SSL \(HTTPS\)/,
      'matchRegex': /Nothing found! Try again with a refined search string/},
  {   'name': 'PD',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://pirata.digital/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Esqueceu sua senha|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'PHD',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPhSURBVFjDzZdPiFVVHMc/v3Pue2+e8+a9sZnRUGqhRIsm+qtIWdYmQjBoEZlYRNtqEYGL2rSKaFNtatGiUlxEQQsZbRNKUBQoLRIpItFER51nOc+ZN/fe8+fXYt4bfb7rFII+f/Dj3Hs593w/53d+53B+QrE9CTwHPAyMAw2uz2aBJnAY+Ao4+F8/3AXsA/QG+b6ORqE9Cpy5geJdnwY2Xy2+Djh7E8S7fg5Y3xUXYOominf9QEebzQMQ7/rjBniewdkO09lqg7KHDLB6gAATCTDafXtgci0vPHsf823H+x8fYmHB9fQeqpTY9doWRkeq7P76CKdOX2TXq0+AQIyKKqhqoZI1gjHC/u9+49CPx7uf6wJcAG5bPTHMgT3buXv9OKemW2za9hkXZ9OeQeq1Cj9PvcL6O1dy9PfzvPXeQT7/8BkqZYsPcREigqLoFVsMBBFIrGG2lbLt5S859kcT4O+kO/iGe8e4Y1XGP82TtFspqrFvFqqRdusMF2ZmWTsmbLq/wYVzJ6nVSmiESlmIV0dBQBByF3FeWdmo8NiG8S4ASwBDZUdMz4KPiM+QAgBQcE1wc4SoVOw8IZ/BhhLnmhkf7fmLPI8ULcL2rbfz4D11YmYp28uRXQKIwaF+Dg1KcDnzaT9AOw0E1yY6j6oSfEZ080gs02q12f3NqWtm28bJChsnS6gHjXk/gGoghBSXK9Z4nnpkhPZCL0R1yJCYHJfHJegQMrwPqOZUhwwLaSxOQvFEnyJW0Oj7AdBADBkuj6yowCdvr+lmUI+lmSfLPIkVYvTEkKHBQ3Cgy2w49RDTxaTQUAQQIaZojIgIRqRIn85eAxVQh2oG0S4KLEegDjTrdCkAECJWMiqJcmleeffTOdpZXIJQoFoW3nxxhNG6AVWsBBJyrFgEv+yJI3iEDIMghQASSCRHreKdsnf/HD5cPQi8vr1M2VpUFSOBxDgSCQiBhezaEQjBY8kxgBQtgZGIwSEo1ii1qnBxrnfA2gohMR4rAQUSG7DiQIXGsLJza4ksLwZYtyYSQk7JCMYUAKR5JDE5HpBl1lLULYbRQJ57rFGiChMN+OCNhBil7zgWYfEgyiO1IXDuMoDpPhw+Fjl93jFed9SqHpF+CBGlVvWMNTzTTcdPvwZWjXoaw46RFY6ScZRsTsm6Ph8ecozVHZfmHd//0hsBAZhuKi+949n5tDC3AJnrn33uYO+3gZUj8MWUcmJ6sQWIsZPgerntPY7BGJj6AY7+qVemFccHeCM6YToXxEHZjOkUDYOyI4O+lG65Ja7lAy9MbonSbGDFqfyP8nwCqF9nlreAmeXK838B28oB4mWo2igAAAAASUVORK5CYII=',
      'searchUrl': 'https://privatehd.to/movies?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true},
  {   'name': 'PHD',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPhSURBVFjDzZdPiFVVHMc/v3Pue2+e8+a9sZnRUGqhRIsm+qtIWdYmQjBoEZlYRNtqEYGL2rSKaFNtatGiUlxEQQsZbRNKUBQoLRIpItFER51nOc+ZN/fe8+fXYt4bfb7rFII+f/Dj3Hs593w/53d+53B+QrE9CTwHPAyMAw2uz2aBJnAY+Ao4+F8/3AXsA/QG+b6ORqE9Cpy5geJdnwY2Xy2+Djh7E8S7fg5Y3xUXYOominf9QEebzQMQ7/rjBniewdkO09lqg7KHDLB6gAATCTDafXtgci0vPHsf823H+x8fYmHB9fQeqpTY9doWRkeq7P76CKdOX2TXq0+AQIyKKqhqoZI1gjHC/u9+49CPx7uf6wJcAG5bPTHMgT3buXv9OKemW2za9hkXZ9OeQeq1Cj9PvcL6O1dy9PfzvPXeQT7/8BkqZYsPcREigqLoFVsMBBFIrGG2lbLt5S859kcT4O+kO/iGe8e4Y1XGP82TtFspqrFvFqqRdusMF2ZmWTsmbLq/wYVzJ6nVSmiESlmIV0dBQBByF3FeWdmo8NiG8S4ASwBDZUdMz4KPiM+QAgBQcE1wc4SoVOw8IZ/BhhLnmhkf7fmLPI8ULcL2rbfz4D11YmYp28uRXQKIwaF+Dg1KcDnzaT9AOw0E1yY6j6oSfEZ080gs02q12f3NqWtm28bJChsnS6gHjXk/gGoghBSXK9Z4nnpkhPZCL0R1yJCYHJfHJegQMrwPqOZUhwwLaSxOQvFEnyJW0Oj7AdBADBkuj6yowCdvr+lmUI+lmSfLPIkVYvTEkKHBQ3Cgy2w49RDTxaTQUAQQIaZojIgIRqRIn85eAxVQh2oG0S4KLEegDjTrdCkAECJWMiqJcmleeffTOdpZXIJQoFoW3nxxhNG6AVWsBBJyrFgEv+yJI3iEDIMghQASSCRHreKdsnf/HD5cPQi8vr1M2VpUFSOBxDgSCQiBhezaEQjBY8kxgBQtgZGIwSEo1ii1qnBxrnfA2gohMR4rAQUSG7DiQIXGsLJza4ksLwZYtyYSQk7JCMYUAKR5JDE5HpBl1lLULYbRQJ57rFGiChMN+OCNhBil7zgWYfEgyiO1IXDuMoDpPhw+Fjl93jFed9SqHpF+CBGlVvWMNTzTTcdPvwZWjXoaw46RFY6ScZRsTsm6Ph8ecozVHZfmHd//0hsBAZhuKi+949n5tDC3AJnrn33uYO+3gZUj8MWUcmJ6sQWIsZPgerntPY7BGJj6AY7+qVemFccHeCM6YToXxEHZjOkUDYOyI4O+lG65Ja7lAy9MbonSbGDFqfyP8nwCqF9nlreAmeXK838B28oB4mWo2igAAAAASUVORK5CYII=',
      'searchUrl': 'https://privatehd.to/tv-shows?search=&imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /class="overlay-container"/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'PHD-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAPhSURBVFjDzZdPiFVVHMc/v3Pue2+e8+a9sZnRUGqhRIsm+qtIWdYmQjBoEZlYRNtqEYGL2rSKaFNtatGiUlxEQQsZbRNKUBQoLRIpItFER51nOc+ZN/fe8+fXYt4bfb7rFII+f/Dj3Hs593w/53d+53B+QrE9CTwHPAyMAw2uz2aBJnAY+Ao4+F8/3AXsA/QG+b6ORqE9Cpy5geJdnwY2Xy2+Djh7E8S7fg5Y3xUXYOominf9QEebzQMQ7/rjBniewdkO09lqg7KHDLB6gAATCTDafXtgci0vPHsf823H+x8fYmHB9fQeqpTY9doWRkeq7P76CKdOX2TXq0+AQIyKKqhqoZI1gjHC/u9+49CPx7uf6wJcAG5bPTHMgT3buXv9OKemW2za9hkXZ9OeQeq1Cj9PvcL6O1dy9PfzvPXeQT7/8BkqZYsPcREigqLoFVsMBBFIrGG2lbLt5S859kcT4O+kO/iGe8e4Y1XGP82TtFspqrFvFqqRdusMF2ZmWTsmbLq/wYVzJ6nVSmiESlmIV0dBQBByF3FeWdmo8NiG8S4ASwBDZUdMz4KPiM+QAgBQcE1wc4SoVOw8IZ/BhhLnmhkf7fmLPI8ULcL2rbfz4D11YmYp28uRXQKIwaF+Dg1KcDnzaT9AOw0E1yY6j6oSfEZ080gs02q12f3NqWtm28bJChsnS6gHjXk/gGoghBSXK9Z4nnpkhPZCL0R1yJCYHJfHJegQMrwPqOZUhwwLaSxOQvFEnyJW0Oj7AdBADBkuj6yowCdvr+lmUI+lmSfLPIkVYvTEkKHBQ3Cgy2w49RDTxaTQUAQQIaZojIgIRqRIn85eAxVQh2oG0S4KLEegDjTrdCkAECJWMiqJcmleeffTOdpZXIJQoFoW3nxxhNG6AVWsBBJyrFgEv+yJI3iEDIMghQASSCRHreKdsnf/HD5cPQi8vr1M2VpUFSOBxDgSCQiBhezaEQjBY8kxgBQtgZGIwSEo1ii1qnBxrnfA2gohMR4rAQUSG7DiQIXGsLJza4ksLwZYtyYSQk7JCMYUAKR5JDE5HpBl1lLULYbRQJ57rFGiChMN+OCNhBil7zgWYfEgyiO1IXDuMoDpPhw+Fjl93jFed9SqHpF+CBGlVvWMNTzTTcdPvwZWjXoaw46RFY6ScZRsTsm6Ph8ecozVHZfmHd//0hsBAZhuKi+949n5tDC3AJnrn33uYO+3gZUj8MWUcmJ6sQWIsZPgerntPY7BGJj6AY7+qVemFccHeCM6YToXxEHZjOkUDYOyI4O+lG65Ja7lAy9MbonSbGDFqfyP8nwCqF9nlreAmeXK838B28oB4mWo2igAAAAASUVORK5CYII=',
      'searchUrl': 'https://privatehd.to/requests?type=movie&search=%search_string%&language=0&condition=new',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /Vote this Request/,
      'positiveMatch': true},
  {   'name': 'Portugas',
      'searchUrl': 'https://portugas.org/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Esqueceu a sua password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Portugas-Req',
      'searchUrl': 'https://portugas.org/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Esqueceu a sua password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'PS',
      'searchUrl': 'https://polishsource.cz/browse.php?search=%tt%&incldead=1&scene=0&pl=0&sub=&search_in=nfo',
      'loggedOutRegex': /Cloudflare|Ray ID|Rejestracja</,
      'matchRegex': /Nic nie znaleziono/,
      'both': true},
  {   'name': 'PS-Req',
      'searchUrl': 'https://polishsource.cz/viewrequests.php?action=search&keywords=%search_string_orig%&filter=hide',
      'loggedOutRegex': /Cloudflare|Ray ID|Rejestracja</,
      'matchRegex': />Nie</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'PTE',
      'icon': 'https://cdn.pte.nu/img/favicon.ico',
      'searchUrl': 'https://pte.nu/apitorrents?tpage=1&cat[]=6&cat[]=7&cat[]=9&search=%search_string%',
      'goToUrl': 'https://pte.nu/torrents?cat=["6","7","9"]&search=%search_string%',
      'loggedOutRegex': /submit">Sign in/,
      'matchRegex': /"count":0/,
      'rateLimit': 250,
      'spaceEncode': ' '},
  {   'name': 'PTE',
      'icon': 'https://cdn.pte.nu/img/favicon.ico',
      'searchUrl': 'https://pte.nu/apitorrents?tpage=1&cat[]=11&cat[]=12&search=%search_string%',
      'goToUrl': 'https://pte.nu/torrents?cat=["11","12"]&search=%search_string%',
      'loggedOutRegex': /submit">Sign in/,
      'matchRegex': /"count":0/,
      'rateLimit': 250,
      'spaceEncode': ' ',
      'TV': true},
  {   'name': 'PTE-IMDb',
      'icon': 'https://cdn.pte.nu/img/favicon.ico',
      'searchUrl': 'https://pte.nu/apitorrents?tpage=1&search=%tt%&nfo=true',
      'goToUrl': 'https://pte.nu/torrents?nfo=true&search=%tt%',
      'loggedOutRegex': /submit">Sign in/,
      'matchRegex': /"count":0/,
      'rateLimit': 250,
      'both': true},
  {   'name': 'PTer',
      'searchUrl': 'https://pterclub.com/torrents.php?search=%tt%&search_area=4',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)|Err code/,
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'PTF',
      'searchUrl': 'https://ptfiles.net/browse.php?search=%search_string%&incldead=0&title=0',
      'loggedOutRegex': /Forgot your password/,
      'matchRegex': /Nothing found!/},
  {   'name': 'PTM',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAACaUlEQVQoz2NgQAL8bIz+xuzdORLr2qRXhTD2xfFFO4vJ8DExYAX64oy1xszJljLRDnpxjnpZ4UaF+U45RQGRKTEmltYSirqSinrsvKJQ1XayHPMNGSI0lM9dvPr123cg+vXr17bdB4+cOAvhAtG379/1zF1BqjXEObqUGKYpsbV1TfoPAw8fPVHRMtp/+ARcZO+h40zsAiANmdoshVwMcYaab96+h0unphcFBcXCuX///YsK9eNkYWQQ52LoVWfoEGbvmTADLn3j5l15Wb1TZy7ARTZu29trymsuycBgLMJ0IZk521f/w8dPcOnktLzImGQ49/fvP+EebjtDmNI0WBgspZgOV7FPnjEPLn3m/CVFNZ3zl67CRVas27q1iev/SoY6awYGF1mW9DDTz1++wqVbuibXNHYgXP/3b3KQ3f8+xu9TWKr1mBh0hDlnzF0Gl/7x4+eWnfsPHj114AgQnQSi0oqGwxmcV/QY1hkxxmswMahqGX/7/gOuoaioZJIbX6MYf70U/ywX/oXJ/EfD2b+GMyyXYygUYLCSYWRQN7D59+8fRPX5S9fK1cU+BjLct2C4osrwo5np/0LGdxEMt9wYlsozlKgyc7ECY4GVe+W6bRANSTFpNz2Z/nYx/J/F8K+X4f8KxjuJDIeMGbbpMcxTZXCVZ4GmC1U9a6Dqi5evd8fI/l8j83894/8rYv8vSZ30Y9iqwXTMgGGBMUOACnISZOacu3h1THLOnIlhL99N//nK999FxZ+9rOfTWK+WMs4PZ3aSw0iw7HySzBx87CyMDuo8FYlKPcGc3c5MjRmyQbaigpyMyCoBtPJtZkiCXrcAAAAASUVORK5CYII=',
      'searchUrl': 'https://pretome.info/browse.php?search=%tt%&st=1&sd=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Joke of the day/,
      'matchRegex': /this filter criteria/,
      'rateLimit': 6100,
      'both': true},
  {   'name': 'PTM-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAACaUlEQVQoz2NgQAL8bIz+xuzdORLr2qRXhTD2xfFFO4vJ8DExYAX64oy1xszJljLRDnpxjnpZ4UaF+U45RQGRKTEmltYSirqSinrsvKJQ1XayHPMNGSI0lM9dvPr123cg+vXr17bdB4+cOAvhAtG379/1zF1BqjXEObqUGKYpsbV1TfoPAw8fPVHRMtp/+ARcZO+h40zsAiANmdoshVwMcYaab96+h0unphcFBcXCuX///YsK9eNkYWQQ52LoVWfoEGbvmTADLn3j5l15Wb1TZy7ARTZu29trymsuycBgLMJ0IZk521f/w8dPcOnktLzImGQ49/fvP+EebjtDmNI0WBgspZgOV7FPnjEPLn3m/CVFNZ3zl67CRVas27q1iev/SoY6awYGF1mW9DDTz1++wqVbuibXNHYgXP/3b3KQ3f8+xu9TWKr1mBh0hDlnzF0Gl/7x4+eWnfsPHj114AgQnQSi0oqGwxmcV/QY1hkxxmswMahqGX/7/gOuoaioZJIbX6MYf70U/ywX/oXJ/EfD2b+GMyyXYygUYLCSYWRQN7D59+8fRPX5S9fK1cU+BjLct2C4osrwo5np/0LGdxEMt9wYlsozlKgyc7ECY4GVe+W6bRANSTFpNz2Z/nYx/J/F8K+X4f8KxjuJDIeMGbbpMcxTZXCVZ4GmC1U9a6Dqi5evd8fI/l8j83894/8rYv8vSZ30Y9iqwXTMgGGBMUOACnISZOacu3h1THLOnIlhL99N//nK999FxZ+9rOfTWK+WMs4PZ3aSw0iw7HySzBx87CyMDuo8FYlKPcGc3c5MjRmyQbaigpyMyCoBtPJtZkiCXrcAAAAASUVORK5CYII=',
      'searchUrl': 'https://pretome.info/requests.php?search=%search_string_orig%&st=1&tf=all&filter[]=open&cat[]=19&cat[]=7',
      'loggedOutRegex': /Cloudflare|Ray ID|Joke of the day/,
      'matchRegex': />Not Filled</,
      'positiveMatch': true,
      'rateLimit': 6100,
      'both': true},
  {   'name': 'PTMSG',
      'searchUrl': 'https://pt.msg.vg/torrents.php?incldead=1&search=%tt%&search_area=1',
      'loggedOutRegex': /忘记了密码/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'PTN',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVDMTgyNjc2MkNFMTFFMTlERjlGNjg3RTc4QkRCNDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVDMTgyNjg2MkNFMTFFMTlERjlGNjg3RTc4QkRCNDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NUMxODI2NTYyQ0UxMUUxOURGOUY2ODdFNzhCREI0NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NUMxODI2NjYyQ0UxMUUxOURGOUY2ODdFNzhCREI0NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgXKewwAAAHWSURBVBgZBcFLSNMBAMfxn+S7h+uBSiuoSGibGblBk7WasYcaTkFD6OIyNCh7nBtLO3ZICj1okFkZ0dQosULrP3RTa1M7qIQhQceKjBCCCta3z0d+BeTbF0zVDPsK/fLLJ5+8JbWT1e9M5dJmyS+P6t8kGcLd7ZRXfnlV/cLAwPFqhwokr70mVpueZYDyiEuenMpMtzwPXjJK4HdgvMiqxsW3vCZBy19b58lo68fQkrfv8M0wceIYOA3VLI4zSDshulkD/rDEZVq5xBhPcRiy2I+MHOop7b/FAo9ZAQDOY+4rfVI2km/VfhXJptOxLkJco5FZfjDFDJZeSZJUIqtcxc3rIVJ8ZYhzRAjTSXBV2ZIklypk3938K8Qc3ximjTAROgh+Vt4WZUk+BVSuhoUuznCdUyT4jsE0luh2HVSWdGKP96G7w3b3Nu95xAoA0M6uG87eo3c2mVU3PcZ9LqZb6GEdSLPCFdq4wDOi2IfV8GUegwRn03sHj8+1/gytOSYO3AsTZ4YpKpIyN/k+1P2bYYDSq5kZecXZhSZ5uscYpSp9LFngkrQ1v/7TPM8p689VnnJVrMrpBJM4YsqQlKkN2tkUXK1MbbRI+cqRtM1dtRxYNlVI0n/ywwQzWz7W5QAAAABJRU5ErkJggg==',
      'searchUrl': 'https://piratethenet.org/browseold.php?incldead=1&_by=3&search=%tt%',
      'loggedOutRegex': /You need to have cookies enabled/,
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'PTP',
      'icon': 'https://passthepopcorn.me/static/common/touch-icon-iphone.png',
      'searchUrl': 'https://passthepopcorn.me/torrents.php?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Keep me logged in|Your popcorn quota/,
      'matchRegex': /Your search did not match anything/,
      'rateLimit': 250,
      'both': true},
  {   'name': 'PTP-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAtUExURQAAAGZovGaGy2a05mbaqWbt1mfSiI3fd5FmwfP9aP8AAP98Zv+0Zv/rZv///1Pu0ZAAAAA2SURBVAjXY1jFAAarGFYteMf34B3XKgauVSDGqgUgQbAMA/fZCWWuzIoNlDLgBsKtgFsKcwYAJccuqX3syx4AAAAASUVORK5CYII=',
      'searchUrl': 'https://passthepopcorn.me/requests.php?submit=true&search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Keep me logged in|Your popcorn quota/,
      'matchRegex': /Your search did not match anything/,
      'rateLimit': 250},
  {   'name': 'PTTime',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAB41BMVEVUdZBUdpFVd5FWd5FWd5JWeJJXeJJXeJNXeZNYeZNZeZNZepNZepRaepRae5Rbe5VcfJVcfJZdfZZefZZefpdffpdff5dgf5hhgJhhgJligZligZplg5tnhZxnhZ1ohZ1php1php5ph55qh55riJ9siZ9siaBtiaBxjaNyjaNzjqR0j6V2kaZ3kqd4kqd4k6d4k6h5k6h6lKl7lal8lap+l6t/mKyAma2Cm66Dm66EnK+FnbCGnbCHn7GIn7GIoLKQpreRpreRp7iSqLiTqLiXq7uZrb2arb2brr6cr76cr7+escChs8KhtMKjtcOmt8WnuMWpuseru8iuvcqvv8uwv8yxwMyzws20ws60w861w8+2xdC3xdC4xtG6x9K9ytS/zNXAzNbBzdbBzdfCztfDztfDztjDz9jEz9nH0drI0tvJ09zK1NzL1d3M1d3N1t7N197Q2eDR2uHT3OPU3OPV3eTW3uTa4efc4+jd4+jd4+ne5Onh5+vi6Ozj6O3k6e3l6u7n6+/n7O/o7PDp7fDr7vLr7/Lt8fPu8fTv8vTw8vXx9Pby9Pby9fby9ffz9fbz9ff09vf09vj19vj29/n2+Pn3+fr4+fr5+vv6+/v7+/z8/P39/f79/v7+/v7+/v/////SEZIxAAACGklEQVRYw2PgpBAwjBowasDgM4CVmYWDAgNY+TXNDSRZyTaAzTClY8bEEgsOMg1gUyhfAAINGqzkGcDqNx9swIJEIfIMECiA6F/QTpoT4AYIlUAN6NEhzwDueKgBNfJsZBnAYtkN1j/Nldxo5PaYANQ/M4if7ITEZxaeFe8kzMTExMrGycPNycrEzAZLoRiABVtSZmHj42QSMnHwDY1NSEuND/O2kGEDG2Ed4I8GAlxEcWQmVo2WeQtgYHploBwwSoSKFmCATj0WHAZodSGrm5ejxsYpVIxpQK8RcQYsWJAvw4bNgH5jvAbMygwJji2dAnZDGD9fdEsjCHSC+FObQMzmQnU2fAZM0GVkYRN3aALp6NBmEVcCAVmvuUButrIiiCONq0SCGgAKIg4m+0kgJ7gxcbCBAKPDHCA3lRPMYSfCAE5OQXAGi4I6lskRZEAaD/4yEcUA1kiQAclc5BsQBjIgiZNsA3gzQAZEkO0FVjVwNHgykWGALhMbK5NoBChV98GSDCkGTLaRkdVwzp0FckCMIBlhMK+ttr5jNjjNViqxkWEAArTawUtIcgyYmm+KKCBJNmBmXZyVCFIJTYoB08P8/NxtVTlZkKVIikYdBmDRiFa8k5ESRw0Y4gbo4zQgnYABbLJZ1RXVeSpY2gisJmVVldU+BBuaolJSUmJYa3JuCaAUP+GWKjs7O462AAc7O8doa33UgGFqAADBac8gNnGEjwAAAABJRU5ErkJggg==',
      'searchUrl': 'https://www.pttime.org/torrents.php?search=%tt%&search_area=1',
      'loggedOutRegex': /Cloudflare|Ray ID|wechat.jpg|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'PxHD',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABbElEQVQoz72QMUtcQRSFzzn3vnm7rUVYWASDIoIoKQKSThD8A9qkEGIhBgSDbbAWRLKLGzeLLoggCBYiBEmakCIp3CIhCC4SJSAoFv6KFDNPlNTmMgwDM2f4vgM89hDAy7kKmYlO+W7r4tXCqOikid5uHL9+M046aaQ1a58I4OjHmFnZVDKVJ0YOv5/Nmkqm3JQ/7189uVwxBSkXw1B1XgCk3NIKAEzBFMQgBgBSJgYxEzMADmBv61p00kUHsL3xizTSBQfQqn+JSIKlgJjF16QDuDuTBkCFAGFJ+uvplKlsyk2lF4PNn3/emvLIOdy79PumLQYpiNnTJ9MCYMyNIe4ApHgdInSkVwHsAHY+dAsGB7C5/o00ISG9f/eREGmk/nW4B10ESEsBKDl0zhejgJQ/61vuXq2nWhUGKjOXtwdS+rHaM6lYvBSkzB5AZ4WDEy4472ptNzqkixYdmrXPqUcKQH1tnxAogvgf8xcdATfXQQipLQAAAABJRU5ErkJggg==',
      'searchUrl': 'https://pixelhd.me/torrents.php?imdbid=%tt%',
      'loggedOutRegex': /You appear to have javascript disabled/,
      'matchRegex': /Your search did not match anything/},
  {   'name': 'RevTT',
      'searchUrl': 'https://www.revolutiontt.me/browse.php?search=%tt%',
      'loggedOutRegex': /used when you're logged in./,
      'matchRegex': /Nothing found!/},
  {   'name': 'RevTT',
      'searchUrl': 'https://www.revolutiontt.me/browse.php?search=%search_string%&cat=0&incldead=1&titleonly=1',
      'loggedOutRegex': /used when you're logged in./,
      'matchRegex': /Nothing found!/,
      'TV': true},
  {   'name': 'Retroflix',
      'searchUrl': 'https://retroflix.club/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search=%tt%&search_area=4&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget your password/,
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'Retroflix-Req',
      'searchUrl': 'https://retroflix.club/forums.php?action=search&keywords=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget your password/,
      'matchRegex': />Request-Unfilled</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'SF',
      'searchUrl': 'https://sharefiles.ro/browse.php?search=%search_string_orig%+%year%&cat=0&blah=0&Cauta!=Search',
      'loggedOutRegex': /Cloudflare|Ray ID|Sign Up/,
      'matchRegex': /Nothing found/},
  {   'name': 'SB',
      'searchUrl': 'https://superbits.org/api/v1/torrents?searchText=%tt%',
      'goToUrl': 'https://superbits.org/search?search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|inloggningscookie/,
      'matchRegex': /seeder/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'SC',
      'searchUrl': 'https://secret-cinema.pw/torrents.php?action=advanced&searchsubmit=1&filter_cat=1&cataloguenumber=%tt%&order_by=time&order_way=desc&tags_type=0',
      'loggedOutRegex': /<title>Login :: Secret Cinema/,
      'matchRegex': /Your search did not match anything/,
      'rateLimit': 100,
      'both': true},
  {   'name': 'SC-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAMAAAAynjhNAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA5UExURRYWFiAgICEhITMzM0pKSl1dXW5ubn5+fouLi4yMjJGRkZqamqamprOzs7+/v8fHx9DQ0O/v7/8AAPkC2KYAAACHSURBVCjPpZPBDgIhDAVnpZRFwNX+/8d68UBCcVeZG2+a0DQtZma4mJlxQXsFn/xE4xZ02YkGX/uPSfI/x3Pg6PTLodPbbWAbvsg1QyhV3AaKEhNN8H2qAWKe9h/rI6rOrABNCoTgaa2aEzVrczVBBRD9daj7fWC/PtTvrGzLyqauXcnShb4BzPcRb71hzSEAAAAASUVORK5CYII=',
      'searchUrl': 'https://secret-cinema.pw/requests.php?submit=true&search=%tt%',
      'loggedOutRegex': /<title>Login :: Secret Cinema/,
      'matchRegex': /Nothing found!/,
      'rateLimit': 100,
      'both': true},
  {   'name': 'SDBits',
      'searchUrl': 'https://sdbits.org/browse.php?incldead=1&imdb=%tt%',
      'loggedOutRegex': /Not logged in!|Technical Difficulties/,
      'matchRegex': /Nothing here!|Nothing found!/,
      'both': true},
  {   'name': 'Sharewood',
      'searchUrl': 'https://www.sharewood.tv/filterTorrents?search=%search_string_orig%+%year%&categories[]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe oublié/,
      'matchRegex': /table-responsive-line/,
      'positiveMatch': true},
  {   'name': 'Sharewood',
      'searchUrl': 'https://www.sharewood.tv/filterTorrents?search=%search_string_orig%&categories[]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe oublié/,
      'matchRegex': /table-responsive-line/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'Sharewood-Req',
      'searchUrl': 'https://www.sharewood.tv/filterRequests?search=%search_string_orig%&categories[]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe oublié/,
      'matchRegex': /btn-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'sHD',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAcJJREFUOE9j3Hty6c3n2z99fc5ACLAxiWjLeTJMXR9dt0ps8lGf2aeiZxwPnXkifPrxwC3XGzdcrZ1+PAgoDkF9h4WAyjqWOjO0LbWHCK24WDD3dEz/Ydf5ZxL//fvz7ffHOaejJh72mnzEG64NpAGIIfwzj1etvVzeud96zeXy////AdGS81kTDrtPPga1BKgGRcO+u5P3350KVP311zug6r///q65XNl32BmnhmUXcj/+ePHt18f/MPD0w6UJh92Ajpx9MhLiChQbpp8I2XGjY8u1po8/XgK1fP/98e23x1de7Fh0NuXA/ZlYNACFeg869h92f/rxMlDDrz/fTzxcdu7JWqCe8083YtcACr5DLttutEEc9fPP1yXnMiYe9QSGNU4NPYect1xrhnvj7tvjoICCxQaKH8Ci3sBgufZyF1zD99+f552Oxalh4hGPuafjgK6Ha/jx+8uyczk4NfQccjr6YN7ff3/23pm463bfow/nnn+6PuWoL04NvYecDt6b+fH7y4lHPNv2mW673gJ0Elw1Ih4giW/miQig/5aczwDGNDCm+g+5LDid+AOsYdrxACAJTXzLN0wB+p1INH/FBAC7js3OZsq8KwAAAABJRU5ErkJggg==',
      'searchUrl': 'https://scenehd.org/browse.php?search=%tt%',
      'loggedOutRegex': /If you have forgotten your password/,
      'matchRegex': /No torrents found!/},
  {   'name': 'SI',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABOUExURQAAAAAAAAAAAAAAAAAAACoAACoqACoqKlUqKlVVKlVVVX9VKn9VVX9/VX9/f6p/Vap/f6qqf9SqVdSqf9SqqtTUqv/Uqv/U1P//qv//1Hdub04AAAAEdFJOU97t7/HHfsZqAAADyklEQVQYGaXB23bbRhIAwOoeUJd1nPz/X8bHa1sSMd0LEKSkTfKSw6qQ7lExwj06y10q3SndaXGIEWoSmbNkjnViIZwRQ6BXLILIdbVbXOQpIi3fPCzLz/L4kL8m+UWkb5PHp87A+bvld7vx9s0uXSSJcGgCQbRE5wibp2dX0yHtYkT4JIRNCiwIh/ngL9IuUAiHdJGZxfAhhnYRDmmXQpfPBpLZMVxEECJF+CQdMkc6DDcZ1u5EC3PaBEJIh7SLZK6F8kmyEnbZf357I+2ilcNiEzYvnEs6BCJ1E2M6vDw6/DjTLhaH8YrVbllaNCKjZ40Myq572OV5ullsuoVDMb6si11GTlqSbjqk8G5xWJepyqbkQiCYmuEqQtVIfpusv+wWF80pvZ1RibAZNq2GXfOYiso6nVh/2aVdU8p/3HQimCoERX757ZGzSKpKu1js5qk0xiTsCknbDLv8D+ZPm/QhXaytkTbpKtXUOmzKZv1W2iFcLC7WSoNxToM1h03q515EuFmni9mcXSwOVcKmWF/7KdumY3xtHWOipAeH72c36W/mOu2CJkTaZL2RC4HyLr1Lm/QukrZLu5fi5K8WuzyVv8mKpINxtpmVHn/ZnWym3eIwWjB9EoLqDGlX62K4+Irzn3aLmwjKuykz6r8VX9twsZLLisqSDukqJNOhGIK51mw35+JkV96lq4jy5sMUbcVkuJjNo02md4tdzSHSi107ZGtMM1H0WaSehHcRwy4zrE1kVMmMmpkxixjhHAtnsVktLnrazIjhHjMZ7pFM90h3GpEOY2hOD6ObJdouM6IxoomBDJ/14ir/yNfvvjzi9cfT1/nj1eb3LC8v/F7ry3x6evuRX62q3trV4qoVy6PNySZsIqWBGJYpCJtMb+2Q3g1Ow6bdDF0SHRaHskk36UNaSsRIhN0yao20i/QuZLpafCiy1jfpZlHr8xhTkGkTap3PUeFqcRUhpf7mk6VqJacmh8Ncz4/lJn1W4reHYReB6CoxbNpDujr7sPiseX72/cWmEboqh01Z1unQPqTPXiWekYkRKEmot7H4B+mz8/fzWsKmkCmGSpt1Df9k8SF4efHHQygag+dnHXTU7DHLRfqQPrRDo56+PAsXkchqNyfK1eKz5+fKKJKRXoddy7I5P7g4LQ9ruVlctd0IrWyaGDV/enzooFkftCatqlwtbhqtGa9oRHad1YNx7uZMuFrdLK66Z5kTbz/N2WVVzsyJqcy3XjVmz+kmYvhsZK/+hbn4f3P6d9Kd0p3SndKd0p3SndKdMt0lQ7pH/Q8N+K7UIUD68gAAAABJRU5ErkJggg==',
      'searchUrl': 'https://shareisland.org/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Accedi con le|Sign In With|Dimenticata la Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'SI-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABOUExURQAAAAAAAAAAAAAAAAAAACoAACoqACoqKlUqKlVVKlVVVX9VKn9VVX9/VX9/f6p/Vap/f6qqf9SqVdSqf9SqqtTUqv/Uqv/U1P//qv//1Hdub04AAAAEdFJOU97t7/HHfsZqAAADyklEQVQYGaXB23bbRhIAwOoeUJd1nPz/X8bHa1sSMd0LEKSkTfKSw6qQ7lExwj06y10q3SndaXGIEWoSmbNkjnViIZwRQ6BXLILIdbVbXOQpIi3fPCzLz/L4kL8m+UWkb5PHp87A+bvld7vx9s0uXSSJcGgCQbRE5wibp2dX0yHtYkT4JIRNCiwIh/ngL9IuUAiHdJGZxfAhhnYRDmmXQpfPBpLZMVxEECJF+CQdMkc6DDcZ1u5EC3PaBEJIh7SLZK6F8kmyEnbZf357I+2ilcNiEzYvnEs6BCJ1E2M6vDw6/DjTLhaH8YrVbllaNCKjZ40Myq572OV5ullsuoVDMb6si11GTlqSbjqk8G5xWJepyqbkQiCYmuEqQtVIfpusv+wWF80pvZ1RibAZNq2GXfOYiso6nVh/2aVdU8p/3HQimCoERX757ZGzSKpKu1js5qk0xiTsCknbDLv8D+ZPm/QhXaytkTbpKtXUOmzKZv1W2iFcLC7WSoNxToM1h03q515EuFmni9mcXSwOVcKmWF/7KdumY3xtHWOipAeH72c36W/mOu2CJkTaZL2RC4HyLr1Lm/QukrZLu5fi5K8WuzyVv8mKpINxtpmVHn/ZnWym3eIwWjB9EoLqDGlX62K4+Irzn3aLmwjKuykz6r8VX9twsZLLisqSDukqJNOhGIK51mw35+JkV96lq4jy5sMUbcVkuJjNo02md4tdzSHSi107ZGtMM1H0WaSehHcRwy4zrE1kVMmMmpkxixjhHAtnsVktLnrazIjhHjMZ7pFM90h3GpEOY2hOD6ObJdouM6IxoomBDJ/14ir/yNfvvjzi9cfT1/nj1eb3LC8v/F7ry3x6evuRX62q3trV4qoVy6PNySZsIqWBGJYpCJtMb+2Q3g1Ow6bdDF0SHRaHskk36UNaSsRIhN0yao20i/QuZLpafCiy1jfpZlHr8xhTkGkTap3PUeFqcRUhpf7mk6VqJacmh8Ncz4/lJn1W4reHYReB6CoxbNpDujr7sPiseX72/cWmEboqh01Z1unQPqTPXiWekYkRKEmot7H4B+mz8/fzWsKmkCmGSpt1Df9k8SF4efHHQygag+dnHXTU7DHLRfqQPrRDo56+PAsXkchqNyfK1eKz5+fKKJKRXoddy7I5P7g4LQ9ruVlctd0IrWyaGDV/enzooFkftCatqlwtbhqtGa9oRHad1YNx7uZMuFrdLK66Z5kTbz/N2WVVzsyJqcy3XjVmz+kmYvhsZK/+hbn4f3P6d9Kd0p3SndKd0p3SndKdMt0lQ7pH/Q8N+K7UIUD68gAAAABJRU5ErkJggg==',
      'searchUrl': 'https://shareisland.org/requests/filter?tmdb=%tmdbid%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Accedi con le|Sign In With|Dimenticata la Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Snahp',
      'searchUrl': 'https://forum.snahp.it/search.php?keywords=%tt%&sk=x',
      'loggedOutRegex': />Register<|you cannot use search at this time/,
      'matchRegex': /Search found 0|No suitable matches/,
      'rateLimit': 20100,
      'both': true},
  {   'name': 'SP',
      'searchUrl': 'https://www.scenepalace.info/browse.php?search=%nott%&cat=0&incldead=1',
      'loggedOutRegex': /Not logged in!/,
      'matchRegex': /Nothing found!/,
      'both': true},
  {   'name': 'SPD',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAB3RJTUUH5QIcFQ8lPCMyxQAAA/NJREFUSMftlltsVFUUhr8zZ6adMjPtyPQiveK0UwqmIpAITdSoUSxDQROJxvpgePBJTITEGy8mRnwwSgLxGq3xlgBeEweIAtVaxUSkFKdYiiKiodXRAhUvFMs+de19pmNbZwgvjTGh2Q+7O+ec71/rX3utwZp1E/XL3TUVe/7/AE/DzfK/u6Zi/9+mKLaUWMvk8/pl1FxDxSJZVmWTu5mwr2yyotefH6B4NjMWTDivvZFQOR4730sgn6CfQIFZ0wgGCMgK4vNZ2HlE6l1xOT2wahfjLcB/kRVbmj6Xp8MzPRZ3zKPzXpKP0rOe5LMkXyb5Bj3tJPeQ7GZbgkULwbKYMf9cHlDcQDGE5LkF6fO6JXgDc8s4/jBqI6oNZzNqK+ojVBfOAGoINYxSdO2lqFDercidouhi8gpYAyswQcQNII4v0BJjZN2/AEkDOIk6rQGpFNVV5wZEGojC+/ASFFmuE3oVVkXDDKxFbRgDJAygF6cfdRz1pwZ82I7fD2WX5/DAlX8/7IEPIC5BhMUJja++yuOx17dogNPG6BacrTgdOH2MHsMZxPmD4dOsuAXyglbdkhweRGYxEzrhC9gJGyCYCWKZBD67lNRjqBfHIuhE9eH8gPoF9Tu7OwkGobQxR5lGb8BXwINwELpgF7wN1+ogcJ2QIGz76VsNYJMBfII6iHMUleLMSVpvE/kh6ppzAER+jdF+CPYZwLuwDqbpsktftFBFYzmDGw3gPQP4Cuc71E983kFh4Tj5kzywXPkPwTH4GvZDuwG8Ck2QL07E5XkJwrbtF1bqFDkJnE9xDjB6hL/6ufN2Ld/NfpZepOVLeSWhH76BLw3gHXgNTfVbXGzujglifg0n2sYikDI9zL4dhItE/mU5elFG/gkYgMOGtGsM8AzMc8sp7YTXa79ytwF8jNrPyCHuak1nPwdA5JdDHwzBj3AEesYBnoN75H0dRKacFsYY2oLqQHWTTBAJa/k55oGW7+c+GIZfIQVHDWCn8eB1eB4ehzlpJ9w74fPZmx7Q9+DsXla1/pP9bPNA5Jca+SNwygC+h27YMS6CJ2EleCfciSsv5dR2et+iZHpaftZ50EJ+kS72MwbwG/xsAO5NzgCegLUgeQiWp1+uvtqX533zEVZL8eSHdDfMDpDB4gvSaOw9awCDJkWfTQRIBKvlQsgqGRs+yyWIOTUUC7Vsbu6ZrLtYJTasggPwLfTCbkjAZtPvnjIGrDEeyF+kIdO7JAgse1LtZ/Pgkut0M7Ckd6LNKJGvwHSTEDnRzV08lG9bBMqobR6nVJyoEvnnMZNrmy1xT+ZMxKzMJrOXCVpxhbTVyR+SCqyLX/hddOG36dR58DeNZUiqGGZdXwAAAABJRU5ErkJggg==',
      'searchUrl': 'https://speed.click/browse/deep/q/%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Username/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'SpeedApp',
      'searchUrl': 'https://speedapp.io/browse?search=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget Password/,
      'matchRegex': /text-emphasis text-hover-primary/,
      'both': true},
  {   'name': 'SpeedApp-Req',
      'searchUrl': 'https://speedapp.io/requests/?search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget Password/,
      'matchRegex': /text-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'ST',
      'searchUrl': 'https://www.scenetime.com/browse.php?c57=1&c59=1&c64=1&c82=1&c16=1&search=%search_string%+%year%&cata=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|need cookies enabled|Try again/,
      'matchRegex': /Nothing found/,
      'rateLimit': 6000},
  {   'name': 'ST',
      'searchUrl': 'https://www.scenetime.com/browse.php?c2=1&c9=1&c77=1&search=%search_string%&cata=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|need cookies enabled|Try again/,
      'matchRegex': /Nothing found/,
      'rateLimit': 6000,
      'TV': true},
  {   'name': 'T',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQiSURBVHjaxFfda1xFFP/NvXfux3Y39JPupkZN27Rp0obEGLcSUKFYsPgHFAwU8qJSBMW+SF98UB8FEVQUKRaVJvhQPwuitY1gidgP6lNa2diY7OImu7H7eT9nfGnu3uud3aypqQcu3DmcM+c353fmzAzhnCMoqZ4hntw5AKoaACG+nnMO5jlYTTjzwBgT6suFHDJXz5OgngQB7H74ME/tHsR6il2vYPrzd3wQUmj16xwcAFQjjr0Hn/ZXraz89DzyFN/+YD/uhXRs7UQEgEI1eG5zjjWFo+++BABgvmBiseyuGUCwRnwAskLhOlZTp8G9O/H2ay8DAN78YAKTX0+tGUAwTgMA1eDaZlOngT1dcF33zgR2S9tVAQR8GxSoGqx6VVw4xMWRQ6NwHOfOBBacuwEgyoBCdVT+KkT5cmp49ZXj6EgkfACOY8Ox1g4g6BugQI2kdXhfF54bfwb9fftg23aIDnZ4xB/XTQtnv/v5X1BgtVeEJ0+8gM2bN4WCA0B6ZBjpkWF/XCwu47NzP7YNwHNtEQAVzA0HclzXT3vLlLpuxLflNhQBkGQZjHkhw3PfT2GDYeDQY4/CMHRff2s+i98yc/64WqtFfFv3AS8KQCTvnToDAHhooA+apvr6n6av4P3Tk/9JVwwBIEQSn3CchboXB29q256QKADmuZAVuqoDAEhEbmHbBgWBY11pVKYDmWpCB0mWIEmNFUuK0tS2vV0gBGCDqrqYJ0UBpY0VU6o2tW1vFwgAuI4NqhlCB0rVEACF0qa2jHmISRb6eh7AQm4R80UzAlbYBzzHajqpqqpQ1cYu2HV/EkQiUKjup5S5JqiewIHuLXj95Is+4FMfT2Li219CRevadREAG1TfIM6ZpEDTGpw/PnoQzy9kcfHSZagqRXpoP7jagdNnf8CJ4+OIx+O+7bPjY7h4dRaFUiNosH5CRWio4sK6PjOHnu6ukO7Y2FEcGzvqjye+ugBF1bBjR2coWwCQTKVw21xAsO1H7oTMcyArVPh98uUUZmazPhWib8X20rUbIf3ichm/Zwuh+SRZFvQB5jVtLjXTxktvfIgnRwfxRPoAuruSUKmCSrWOm7eymL42gwvTv4IQCW999AXqpo2h/l2Yzy3h3U+/gcfCjSv0v3It35M+wrd3778nl9Lb+TlcP3+GhCgo5f/APx8p6yWl3E1BDVglZG9cBudsXYObxTmU/pwNU9Db28u3btuGXH4ZZZMhsSW1aquVZKWtgCt2zHMRV2xoXhm5XA6ZTIb4RajrOjZt3IjOVAq248Cy7MDB4UFMTPACwuExDvDmZ1nM0GHoHSiVgGKxGN4FpVIJS0tLiMViIITc5QErOs+Beq2GaqWCSqWCarUa3QXJZJJTSkEIWTOIlhg4B+cclmUhn88T4ev4/5C/BwDN68QK5KaRZAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://openlook.me/torrents.php?searchstr=%search_string%+%year%&filter_cat[2]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Remember me|반드시 공지를 읽고 토런트를/,
      'matchRegex': /did not match/},
  {   'name': 'T',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQiSURBVHjaxFfda1xFFP/NvXfux3Y39JPupkZN27Rp0obEGLcSUKFYsPgHFAwU8qJSBMW+SF98UB8FEVQUKRaVJvhQPwuitY1gidgP6lNa2diY7OImu7H7eT9nfGnu3uud3aypqQcu3DmcM+c353fmzAzhnCMoqZ4hntw5AKoaACG+nnMO5jlYTTjzwBgT6suFHDJXz5OgngQB7H74ME/tHsR6il2vYPrzd3wQUmj16xwcAFQjjr0Hn/ZXraz89DzyFN/+YD/uhXRs7UQEgEI1eG5zjjWFo+++BABgvmBiseyuGUCwRnwAskLhOlZTp8G9O/H2ay8DAN78YAKTX0+tGUAwTgMA1eDaZlOngT1dcF33zgR2S9tVAQR8GxSoGqx6VVw4xMWRQ6NwHOfOBBacuwEgyoBCdVT+KkT5cmp49ZXj6EgkfACOY8Ox1g4g6BugQI2kdXhfF54bfwb9fftg23aIDnZ4xB/XTQtnv/v5X1BgtVeEJ0+8gM2bN4WCA0B6ZBjpkWF/XCwu47NzP7YNwHNtEQAVzA0HclzXT3vLlLpuxLflNhQBkGQZjHkhw3PfT2GDYeDQY4/CMHRff2s+i98yc/64WqtFfFv3AS8KQCTvnToDAHhooA+apvr6n6av4P3Tk/9JVwwBIEQSn3CchboXB29q256QKADmuZAVuqoDAEhEbmHbBgWBY11pVKYDmWpCB0mWIEmNFUuK0tS2vV0gBGCDqrqYJ0UBpY0VU6o2tW1vFwgAuI4NqhlCB0rVEACF0qa2jHmISRb6eh7AQm4R80UzAlbYBzzHajqpqqpQ1cYu2HV/EkQiUKjup5S5JqiewIHuLXj95Is+4FMfT2Li219CRevadREAG1TfIM6ZpEDTGpw/PnoQzy9kcfHSZagqRXpoP7jagdNnf8CJ4+OIx+O+7bPjY7h4dRaFUiNosH5CRWio4sK6PjOHnu6ukO7Y2FEcGzvqjye+ugBF1bBjR2coWwCQTKVw21xAsO1H7oTMcyArVPh98uUUZmazPhWib8X20rUbIf3ichm/Zwuh+SRZFvQB5jVtLjXTxktvfIgnRwfxRPoAuruSUKmCSrWOm7eymL42gwvTv4IQCW999AXqpo2h/l2Yzy3h3U+/gcfCjSv0v3It35M+wrd3778nl9Lb+TlcP3+GhCgo5f/APx8p6yWl3E1BDVglZG9cBudsXYObxTmU/pwNU9Db28u3btuGXH4ZZZMhsSW1aquVZKWtgCt2zHMRV2xoXhm5XA6ZTIb4RajrOjZt3IjOVAq248Cy7MDB4UFMTPACwuExDvDmZ1nM0GHoHSiVgGKxGN4FpVIJS0tLiMViIITc5QErOs+Beq2GaqWCSqWCarUa3QXJZJJTSkEIWTOIlhg4B+cclmUhn88T4ev4/5C/BwDN68QK5KaRZAAAAABJRU5ErkJggg==',
      'searchUrl': 'https://openlook.me/torrents.php?searchstr=%search_string%&filter_cat[3]=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Remember me/,
      'matchRegex': /did not match/,
      'TV': true},
  {   'name': 'Tasmanites',
      'searchUrl': 'https://tasmanit.es/browse.php?do=search&search_type=t_name&keywords=%search_string%',
      'loggedOutRegex': /Recover Password/,
      'matchRegex': /Click to Download/,
      'positiveMatch': true,
      'TV': true},
  {   'name': 'TBA',
      'searchUrl': 'https://tb-asian.org/index.php?page=torrents&search=%search_string%&category=0&active=0',
      'loggedOutRegex': /not authorized to view/,
      'matchRegex': /download.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'TBD',
      'icon': 'https://1.bp.blogspot.com/-F2JeKtPCJYI/VgjpVxwMO4I/AAAAAAAAADg/VyNyp-yW9Ac/s1600/TBD.ico',
      'searchUrl': 'https://www.torrentbd.me/torrent/movies.php?module=torrents&id=%nott%',
      'loggedOutRegex': /<title>TorrentBD : Login</,
      'matchRegex': /This title is not available!/,
      'both': true},
  {   'name': 'TCTG',
      'icon': 'https://tctg.in/themes/NB-KidVision/images/favicon.ico',
      'searchUrl': 'https://tctg.in/torrents-search.php?search="%search_string_orig% %year%"&cat=0&incldead=0&freeleech=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Entrer le total/,
      'matchRegex': /Aucun torrent trouvé/,
      'spaceEncode': ' '},
  {   'name': 'TCTG',
      'icon': 'https://tctg.in/themes/NB-KidVision/images/favicon.ico',
      'searchUrl': 'https://tctg.in/torrents-search.php?search="%search_string_orig%"&cat=0&incldead=0&freeleech=0&lang=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Entrer le total/,
      'matchRegex': /Aucun torrent trouvé/,
      'TV': true},
  {   'name': 'TD',
      'searchUrl': 'https://tday.findnemo.net/t?q=%tt%',
      'loggedOutRegex': /Ray ID|security check to access|Forgot Password\?/,
      'matchRegex': /No Torrents Found!/,
      'both': true},
  {   'name': 'TDB',
      'searchUrl': 'https://torrentdb.net/filter/torrents?&search=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password|Service Unavailable/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'rateLimit': 5100,
      'both': true},
  {   'name': 'TDB-Req',
      'searchUrl': 'https://torrentdb.net/filter/requests?search=%nott%&pending=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password|Service Unavailable/,
      'matchRegex': /btn-warning/,
      'positiveMatch': true,
      'rateLimit': 5100,
      'both': true},
  {   'name': 'TE',
      'searchUrl': 'https://theempire.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'loggedOutRegex': /404 - Not Found|You need cookies enabled/,
      'matchRegex': /Try again with a refined search string/,
      'TV': true},
  {   'name': 'Team-HuSh',
      'searchUrl': 'https://team-hush.org/filterTorrents?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe oublié/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Team-HuSh-Req',
      'searchUrl': 'https://team-hush.org/filterRequests?imdb=%nott%&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Mot de passe oublié/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Telly',
      'searchUrl': 'https://telly.wtf/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'Telly-Req',
      'searchUrl': 'https://telly.wtf/requests?unfilled=1&tmdbId=%tmdbid%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot Your Password/,
      'matchRegex': /label-danger/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'TG',
      'searchUrl': 'https://thegeeks.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'loggedOutRegex': /404 - Not Found|You need cookies enabled/,
      'matchRegex': /Try again with a refined search string/,
      'both': true},
  {   'name': 'THC',
      'searchUrl': 'https://horrorcharnel.org/browse.php?search=%nott%&cat=0&incldead=1',
      'loggedOutRegex': /Not logged in!/,
      'matchRegex': /Nothing found!/},
  {   'name': 'THC-Req',
      'searchUrl': 'https://horrorcharnel.org/viewrequests.php?search=%search_string_orig%&category=0&filter=true',
      'loggedOutRegex': /Not logged in!/,
      'matchRegex': /Nothing here/},
  {   'name': 'THR',
      'searchUrl': 'https://www.torrenthr.org/browse.php?search=%search_string%&blah=0&incldead=1',
      'loggedOutRegex': /registraciju morate imati omogućene cookiese/,
      'matchRegex': /Ništa nije pronađeno!/,
      'both': true},
  {   'name': 'Tik',
      'searchUrl': 'https://www.cinematik.net/browse.php?cat=0&incldead=1&srchdtls=1&search=%tt%',
      'loggedOutRegex': /Not logged in!|Ray ID/,
      'matchRegex': /Nothing found!/,
      'rateLimit': 125,
      'both': true},
  {   'name': 'Tik-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABXUExURf8AAP///wAAAA0NDRMTExsbGycnJy0tLTk5OT4+PkhISFFRUVlZWV1dXWlpaW5ubnV1dX5+foaGhomJiZGSkrS0tLy8vMXFxc3Nzdra2ujp6f7+/v8AAIjM6dMAAAACdFJOUwAAdpPNOAAAAJlJREFUGNNNj9kOwyAMBCFpypW1udIL/v87i2kidZ7skWXtqj4ACSCZlezLCU7RL/G7SP9i70olb/qyzt16qCEqLe7ATX4UaKUT3ILWHthWDxE500ptUDdkmgKbiBfdEadIMNze2RmDyEOUynZPwVpjKUYRjO6E0DkfWvU64vgQgk9Ncs7ouxDK5ypXmJmY6qGuciUPylPL/AV8FA8iN/MfEgAAAABJRU5ErkJggg==',
      'searchUrl': 'https://www.cinematik.net/viewrequests.php?search=%search_string%&filter=1',
      'loggedOutRegex': /Not logged in!|Ray ID/,
      'matchRegex': /No requests found!/,
      'rateLimit': 125,
      'both': true},
  {   'name': 'TL',
      'searchUrl': 'https://www.torrentleech.org/torrents/browse/list/imdbID/%tt%',
      'goToUrl': 'https://www.torrentleech.org/torrents/browse/index/imdbID/%tt%',
      'loggedOutRegex': /Signup With Invite/,
      'matchRegex': /"numFound":0/,
      'rateLimit': 250,
      'both': true},
  {   'name': 'TL-Title',
      'searchUrl': 'https://www.torrentleech.org/torrents/browse/list/categories/8,9,11,12,13,14,15,29,34,35,36,37,43,47/query/%search_string% %year%',
      'goToUrl': 'https://www.torrentleech.org/torrents/browse/index/query/%search_string% %year%/categories/8,9,11,12,13,14,15,29,34,35,36,37,43,47',
      'loggedOutRegex': /Signup With Invite/,
      'matchRegex': /"numFound":0/,
      'rateLimit': 250,
      'spaceEncode': '%2B'},
  {   'name': 'TL-Title',
      'searchUrl': 'https://www.torrentleech.org/torrents/browse/list/categories/26,27,29,32,34,35,44/query/%search_string%',
      'goToUrl': 'https://www.torrentleech.org/torrents/browse/index/query/%search_string%/categories/26,27,29,32,34,35,44',
      'loggedOutRegex': /Signup With Invite/,
      'matchRegex': /"numFound":0/,
      'rateLimit': 250,
      'spaceEncode': '%2B',
      'TV': true},
  {   'name': 'TL-Req',
      'searchUrl': 'https://www.torrentleech.org/user/requests/index?requestCategorySearch=0&requestSearch=%search_string_orig%&status=New',
      'loggedOutRegex': /Signup With Invite/,
      'matchRegex': />Found <b>0</,
      'rateLimit': 250,
      'both': true},
  {   'name': 'TLFBits',
      'searchUrl': 'https://pt.eastgame.org/torrents.php?incldead=1&spstate=0&search=%tt%&search_area=1&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|SSL \(HTTPS\)/,
      'matchRegex': /Nothing found|没有种子|沒有種子/,
      'both': true},
  {   'name': 'TLPL',
      'icon': 'https://torrentleech.pl/pic/Favikona.png',
      'searchUrl': 'https://torrentleech.pl/browse.php?search=%tt%&incldead=0&titlesearch=1&polish=0&cat_film=&napisy=0',
      'loggedOutRegex': /Ray ID|Niezalogowany!/,
      'matchRegex': /Nic tutaj nie ma/,
      'both': true},
  {   'name': 'TLZ',
      'searchUrl': 'https://tlz.digital/browse.php?c31=1&c26=1&c11=1&c3=1&c24=1&c30=1&search=%2B%search_string_orig%+%2B%year%&searchin=title&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'spaceEncode': '+%2B',
      'matchRegex': /Nothing found/},
  {   'name': 'TLZ',
      'searchUrl': 'https://tlz.digital/browse.php?c18=1&c16=1&c19=1&c29=1&search=%2B%search_string_orig%&searchin=title&incldead=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'spaceEncode': '+%2B',
      'matchRegex': /Nothing found/,
      'TV': true},
  {   'name': 'TM',
      'icon': 'https://torrentmasters.info/images/tm.gif',
      'searchUrl': 'https://torrentmasters.info/letoltes.php?search=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Jelszó visszaállítás/,
      'matchRegex': /Nincs aktív torrent/},
  {   'name': 'TO',
      'searchUrl': 'https://theoccult.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'loggedOutRegex': /404 - Not Found|You need cookies enabled/,
      'matchRegex': /Try again with a refined search string/,
      'both': true},
  {   'name': 'TorSurf',
      'searchUrl': 'https://torrentsurf.net/browse.php?search=%search_string_orig%+%year%&cat=0&blah=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': /Nothing found/},
  {   'name': 'TorSurf',
      'searchUrl': 'https://torrentsurf.net/browse.php?search=%search_string_orig%&cat=0&blah=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': /Nothing found/,
      'TV': true},
  {   'name': 'TorSurf-Req',
      'searchUrl': 'http://torrentsurf.net/viewrequests.php?search=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Not logged in/,
      'matchRegex': />No</,
      'positiveMatch': true,
      'both': true},
  {   'name': 'TP',
      'searchUrl': 'https://theplace.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'loggedOutRegex': /not found on this server|You need cookies enabled/,
      'matchRegex': /Try again with a refined search string/,
      'both': true},
  {   'name': 'TRL',
      'searchUrl': 'https://torrent.ai/lt/torrents?in=2&search=%tt%',
      'loggedOutRegex': /Jums nepavyksta pasijungti/,
      'matchRegex': /nieko nerasta!/,
      'both': true},
  {   'name': 'TRL',
      'searchUrl': 'https://torrent.ai/lt/torrents?search=%search_string%&cats[]=53&cats[]=56&cats[]=79&cats[]=42&cats[]=58&cats[]=59&cats[]=45&cats[]=69&cats[]=70&cats[]=39&cats[]=28',
      'loggedOutRegex': /Jums nepavyksta pasijungti/,
      'matchRegex': /nieko nerasta!/,
      'TV': true},
  {   'name': 'TS',
      'searchUrl': 'https://theshow.click/browse.php?incldead=0&country=&nonboolean=1&search=%tt%',
      'loggedOutRegex': /404 - Not Found|You need cookies enabled/,
      'matchRegex': /Try again with a refined search string/,
      'both': true},
  {   'name': 'TSeeds',
      'searchUrl': 'https://torrentseeds.org/browse_elastic.php?cat[3]=1&cat[39]=1&cat[62]=1&cat[19]=1&cat[49]=1&cat[25]=1&cat[50]=1&cat[31]=1&query=%search_string_orig%+%year%&search_in=title',
      'loggedOutRegex': /Not logged in!|change my password/,
      'matchRegex': />Genres<\/div>\s*<\/div>/},
  {   'name': 'TSeeds',
      'searchUrl': 'https://torrentseeds.org/browse_elastic.php?cat[61]=1&cat[11]=1&cat[23]=1&cat[24]=1&cat[18]=1&cat[67]=1&cat[26]=1&cat[65]=1&cat[64]=1&query=%search_string_orig%&search_in=title',
      'loggedOutRegex': /Not logged in!|change my password/,
      'matchRegex': />Genres<\/div>\s*<\/div>|We are sorry/,
      'TV': true},
  {   'name': 'TSH',
      'searchUrl': 'https://theshinning.me/filterTorrents?imdb=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|Haben Sie Ihr Passwort vergessen/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'TSH-Req',
      'searchUrl': 'https://theshinning.me/filterRequests?search=%search_string_orig%&categories[]=1&categories[]=2&categories[]=10&unfilled=1',
      'loggedOutRegex': /Cloudflare|Ray ID|Haben Sie Ihr Passwort vergessen/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'TSP',
      'searchUrl': 'https://www.thesceneplace.com/index.php?page=torrents&search=%search_string_orig%+%year%&category=20;21;22;23;24&options=0&active=0',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'positiveMatch': true,
      'matchRegex': /download.gif/},
  {   'name': 'TSP',
      'searchUrl': 'https://www.thesceneplace.com/index.php?page=torrents&search=%search_string_orig%&category=15;16;17;18;25&options=0&active=0',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'positiveMatch': true,
      'matchRegex': /download.gif/,
      'TV': true},
  {   'name': 'TT',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAhBQTFRFAAAAFxcXfIdXgZNPPUchAAAAAAAAV2RIY3pDPEojAAAAKioqZW9Gq8RfjqdMAAAADBMGeJVJaIk6KDMYAAAAcX1MrsZmjKRLAAAAAAAAAAAABgwGcI8/Y4I6LDsZfpFGlq9RVFw9iJtaj6hZhJ5RaH0/QEsreJdHOk8hSFQnmK5RkahNo75YkKRbo79ffZ1HXXc1bo8+XHo0WXcyGyUOCg8FCQkEISUSDhMHBQoABAgAWmc7JTAVbH4/N0kefY9JRVsnAAAAjKNNVW8vAAAAHBwVExoNY3E+nr1Wg51JgJxIiqtMOUckDw8KDQ0GAAAAYmpFr8Vqo7pesMpnrMZmVWQwLTQcsbGxsLGwIysVYHJEiahXdZVFc5JLY4I9ICwSfI1Gl7JRHSIQAAAAlZWVi4uLAAAAJzAVdZZBOEsfUV4rmbFSkqxPBwcDAAAAAAAAGh8Ud5ZFc5dAWnczICoRPEYio7xXjaZMBwcDFBoKbo0+ZIM3Fx8MAAAAS1YoY3M0KzIWKjcWRFglJjIUAAAAs9Fgep5EuNRjdJhBvNhluNVidZpCcZdAocFXmrpUk7RRja5Npb1jp8ZaocBXhqlKbIo8rctdgKRHla9QpsRag6VIcJA+gJZFaHs4nrxVh6hKSl0paYc6qsdccog+aX05hJ9IfJhEV2wwYnw2f6JHkKhQmLRTfJtGbYlAtdFh////SoNNDAAAAIV0Uk5TAAuJyWsDAWPIjxAGYvzyNyjv/HIIfPf1PAcbKPD4ir/4ncjh4cmX9tVt+/3+/v7+/v79/IkyNXqQMjp5jZ2yw9AM5esdJCfL/v7+/tkwJgJg+f3+/umz+vy04f7+/fpusvpvEtDaIFX4yHT390IhJzHy/vmPYfr3RjHy/HgKi9qIctmeExoMbtgAAAABYktHRK/ObKMxAAAACXBIWXMAAB7BAAAewQHDaVRTAAAA0klEQVQYGVXBvy4EURiH4d/7zZkz50+BRCIalWajkSgVsjcgao3sFYhIlAq1VmdD4kI020zcApEImTtQ7CzrDJXnQQx6SZ7i03LOVympSOkyxnWXOPuOJDRv0MUNls4rxSKt5azqNDFicALc8avehWPowfEAr65/0n690MDcTDJJZo0K70ySSTLnsrTivW1KThrjYYOi2unk/AEEpsCEyCEc8Z9bHdE/82er5sXS27ZynqZ0H6O6Llfvex9h6Wdt+zWu/bJurQthHm9VXDeLEB5/AFWwKWjvya9AAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA1LTAxVDE4OjA2OjExKzAyOjAwq9Q12QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNS0wMVQxODowNjoxMSswMjowMNqJjWUAAAAASUVORK5CYII=',
      'searchUrl': 'https://tt.smallfoot.me/t?q=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Reset Password/,
      'matchRegex': /No Torrents Found!/,
      'both': true},
  {   'name': 'TTG',
      'searchUrl': 'https://totheglory.im/browse.php?c=M&search_field=imdb%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget your password/,
      'matchRegex': /Didn't match any titles/,
      'both': true},
  {   'name': 'TVCK',
      'searchUrl': 'https://tvchaosuk.com/torrents/filter?imdb=%tt%',
      'loggedOutRegex': /Forgot Your Password/,
      'matchRegex': /<tbody>\s*<\/tbody>/,
      'both': true},
  {   'name': 'TVV',
      'searchUrl': 'https://tv-vault.me/torrents.php?action=advanced&imdbid=%tt%&order_by=s3&order_way=desc',
      'loggedOutRegex': /Lost your password\?|Browse quota exceeded|Cloudflare Ray ID/,
      'matchRegex': /Nothing found<\/h2>/,
      'rateLimit': 250,
      'TV': true},
  {   'name': 'TVV-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADJUExURTMzMzc3Nzo6Ojs7Oz09PT4+PkJCQkNDQ0dHR0pKSk9PT1NTU1ZWVllZWVpaWlxcXF1dXWlpaWxsbG5ubnR0dHp6en9/f4ODg4yMjI6OjpCQkJmZmaWlpaampq6urrOzs7e3t76+vsDAwMLCwsTExMjIyMtDLswiCc11aM4fBs5INNAdA9AeA9BNOdEcAtEdA9FLN9IdAtMcAtN7btQcAdYbANh9cNra2t7e3uXl5efn5+zs7O/v7/Pz8/X19fv7+/39/f8AAP///2SPs2AAAACaSURBVBjTY3AEAgYoALOR+GARLAIgCsZlAHGZZZEFgEDURkpYhIWBWwhIcPEDBWTslSWsJJlUpC0lmZTEgQKc9nxssua8Djyy5jw27EABDjs+NgEnBVVWXid5eZAZzBZyYkwqtiKMjIrWgkC+qaGama6mgbG6traWhrqOKYOpqb6jo4mRnpGJiaOjkakppsOArnWCA1yeQ/E+AFvgHkWUUCLVAAAAAElFTkSuQmCC',
      'searchUrl': 'https://tv-vault.me/requests.php?search=&imdbid=%tt%',
      'loggedOutRegex': /Lost your password\?|Browse quota exceeded|Cloudflare Ray ID/,
      'matchRegex': /Nothing found|<strong>Yes</,
      'rateLimit': 250,
      'TV': true},
  {   'name': 'U2',
      'searchUrl': 'https://u2.dmhy.org/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search=%tt%&search_area=1&search_mode=0',
      'loggedOutRegex': /Cloudflare|Ray ID|<title>Access Point :: U2<|under heavy load/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'UHDB',
      'searchUrl': 'https://uhdbits.org/torrents.php?action=advanced&groupname=%tt%',
      'loggedOutRegex': /Lost your password/,
      'matchRegex': /Your search did not match anything/,
      'both': true},
  {   'name': 'UHDB-Req',
      'searchUrl': 'https://uhdbits.org/requests.php?submit=true&search=%search_string_orig%&showall=on&filter_cat[1]=1&filter_cat[3]=1',
      'loggedOutRegex': /Lost your password/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'Unlimitz',
      'searchUrl': 'https://www.unlimitz.biz/browse.php?search=%search_string%&cat=0&blah=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Recover Password/,
      'matchRegex': /Nothing found/,
      'both': true},
  {   'name': 'WF',
      'icon': 'https://warezforums.com/images/favicon.ico',
      'searchUrl': 'https://warezforums.com/search.php?action=do_search&keywords=%tt%&postthread=imdbid',
      'loggedOutRegex': /Cloudflare|Ray ID|You are not logged/,
      'matchRegex': /no results were returned/,
      'rateLimit': 5100,
      'both': true},
  {   'name': 'XS',
      'searchUrl': 'https://www.xspeeds.eu/browse.php?do=search&keywords=%search_string%&search_type=t_name&category=0&include_dead_torrents=yes',
      'loggedOutRegex': /Forget your password/,
      'matchRegex': /<b>Nothing Found<\/b>/},
  {   'name': 'xThor',
      'searchUrl': 'https://xthor.tk/browse.php?c118=1&c119=1&c107=1&c1=1&c2=1&c100=1&c4=1&c5=1&c7=1&c3=1&c6=1&c8=1&c122=1&c94=1&c95=1&c12=1&c31=1&c33=1&c9=1&searchin=title&incldead=0&group=0&state=0&accent=0&price=0&gang=0&mqr=0&staff=0&sch=%search_string_orig% %year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Vous devez autoriser les cookies/,
      'matchRegex': 'Aucun résultat'},
  {   'name': 'xThor',
      'searchUrl': 'https://xthor.tk/browse.php?c104=1&c13=1&c15=1&c14=1&c98=1&c17=1&c16=1&c101=1&c32=1&c110=1&c123=1&c109=1&c30=1&searchin=title&incldead=0&group=0&state=0&accent=0&price=0&gang=0&mqr=0&staff=0&sch=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Vous devez autoriser les cookies/,
      'matchRegex': 'Aucun résultat',
      'TV': true},
  {   'name': 'Yubraca',
      'icon': 'data:image/gif;base64,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',
      'searchUrl': 'http://yubraca.net/browse.php',
      'mPOST': 'do=search&keywords=%tt%&search_type=t_genre&category=0&include_dead_torrents=yes',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget your password|Zaboravili ste password/,
      'matchRegex': />Nista nije pronadjeno<|>Nothing Found</,
      'both': true},
  {   'name': 'Yubraca-Req',
      'icon': 'data:image/gif;base64,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',
      'searchUrl': 'http://yubraca.net/viewrequests.php?do=search_request',
      'mPOST': 'do=search_request&keywords=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forget your password|Zaboravili ste password/,
      'matchRegex': /not_filled.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'Zamunda',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://zelka.org/browse.php?search=%search_string_orig%+%year%&c42=1&c25=1&c51=1&c53=1&c46=1&c5=1&c20=1&c54=1&c35=1&c19=1&c24=1&c31=1&c28=1&incldead=1',
      'loggedOutRegex': /Cloudflare|Ray ID|cookies enabled|активирани Бисквитки/,
      'matchRegex': /Нищо не е намерено|No Results/},
  {   'name': 'Zamunda',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://zelka.org/browse.php?search=%search_string_orig%&c42=1&c50=1&c25=1&c51=1&c7=1&c33=1&incldead=1',
      'loggedOutRegex': /Cloudflare|Ray ID|cookies enabled|активирани Бисквитки/,
      'matchRegex': /Нищо не е намерено|No Results/,
      'TV': true},
  {   'name': 'Ztracker',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACsklEQVQozwXBS29UZRgA4Pf9buecOXOhEwrFaWKKBLVyCQgYQliIGAEXLl2YmLiRtYkL97rwJ7hwZ1zhwjQkxhgbw50EKpXgUNoUCrQQOk5P51zmO9/t9Xnwx7zhPQ0zbKWoNcsyybj94xd36D2Fie/tFkCoNTLglWZbozFLJAqBnTaNdei0fdqsF/4Ks0fx95/18l0y1hOEOPKeguAYK8k//lpdnedKQrqDKCAgqkQioxfPqNyk5VvBMmh3GQElCQSn+MmL8tgh9eBhWLgOPCIhEDmsrUBtYDwIG/d8/0G4PVd3p9XkHsaZFE+WaOW+kwmuLUPawvtb9M8V/eW3yc4puPo05GM6/mF8+KxMW1FtvODEL/6gogSerqoLn/o3D0D/b0+MtyfYtUvGMizW6ck10191z/u2NxslERPOYKdLZ8+7ygbr8NEiB/I/fVOZcZA70P5HUIMd0EZtKbDBwIkiF82OMc4Lzn675IcvAzmgGCAHqgEIIAGf0dtnmjd+LWwWRFWppOXm52BzXS1cyRFBj3xnV7xtta+IdyFVYjwK2cCv3a5mjgkB4KtCLN5045GPGkLnjiGawqsOl118fb/cd0pd/n5Ubrh3PmjIBgkUtLoUFUWotnRzVxxcmN7Hh48JW/Ld08neA7x0vnc03n84evyvmX4rwu9W27pIPNVL98hYPnuEOl1fjVQ2tP07/NGt6pOvJu78WWSbdn05vP9ZylwdIYm0KQ6eiE+cjqNIeaOcUVM9mTTZ5CwK5HuPqCqjc59PvHpmxMtXNNnhrhYIvCyDEqIscH6uAMSVRf3RF2leWgo4c1LIBkUt4L0LcrKbVGNSSm1v+yjixoALgBimZlR7J9d1CIGYhACQthkbZtZ7rGtea1YbyHMqStIlvPaG9J5TYGXpnAdjaCszwfP/ATkkhPpxifIUAAAAAElFTkSuQmCC',
      'searchUrl': 'http://ztracker.cc/browse_old.php?keywords=%tt%&search_type=t_description&cat=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Léptessen ki 15 perc/,
      'matchRegex': /dl.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'Ztracker-Req',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACsklEQVQozwXBS29UZRgA4Pf9buecOXOhEwrFaWKKBLVyCQgYQliIGAEXLl2YmLiRtYkL97rwJ7hwZ1zhwjQkxhgbw50EKpXgUNoUCrQQOk5P51zmO9/t9Xnwx7zhPQ0zbKWoNcsyybj94xd36D2Fie/tFkCoNTLglWZbozFLJAqBnTaNdei0fdqsF/4Ks0fx95/18l0y1hOEOPKeguAYK8k//lpdnedKQrqDKCAgqkQioxfPqNyk5VvBMmh3GQElCQSn+MmL8tgh9eBhWLgOPCIhEDmsrUBtYDwIG/d8/0G4PVd3p9XkHsaZFE+WaOW+kwmuLUPawvtb9M8V/eW3yc4puPo05GM6/mF8+KxMW1FtvODEL/6gogSerqoLn/o3D0D/b0+MtyfYtUvGMizW6ck10191z/u2NxslERPOYKdLZ8+7ygbr8NEiB/I/fVOZcZA70P5HUIMd0EZtKbDBwIkiF82OMc4Lzn675IcvAzmgGCAHqgEIIAGf0dtnmjd+LWwWRFWppOXm52BzXS1cyRFBj3xnV7xtta+IdyFVYjwK2cCv3a5mjgkB4KtCLN5045GPGkLnjiGawqsOl118fb/cd0pd/n5Ubrh3PmjIBgkUtLoUFUWotnRzVxxcmN7Hh48JW/Ld08neA7x0vnc03n84evyvmX4rwu9W27pIPNVL98hYPnuEOl1fjVQ2tP07/NGt6pOvJu78WWSbdn05vP9ZylwdIYm0KQ6eiE+cjqNIeaOcUVM9mTTZ5CwK5HuPqCqjc59PvHpmxMtXNNnhrhYIvCyDEqIscH6uAMSVRf3RF2leWgo4c1LIBkUt4L0LcrKbVGNSSm1v+yjixoALgBimZlR7J9d1CIGYhACQthkbZtZ7rGtea1YbyHMqStIlvPaG9J5TYGXpnAdjaCszwfP/ATkkhPpxifIUAAAAAElFTkSuQmCC',
      'searchUrl': 'http://ztracker.cc/viewrequests.php?do=search_request',
      'mPOST': 'do=search_request&searchwords=%search_string_orig%&cat=0',
      'loggedOutRegex': /Cloudflare|Ray ID|Léptessen ki 15 perc/,
      'matchRegex': /not_filled.gif/,
      'positiveMatch': true,
      'both': true}
];

var usenet_sites = [
  {   'name': 'abNZB',
      'searchUrl': 'https://www.abnzb.com/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/},
  {   'name': 'abNZB',
      'searchUrl': 'https://www.abnzb.com/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'altHUB',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAAAAABqCHz+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA/SURBVCjPY2CgGPz/ix9iKEDXgkMBQhmUi7AMRCNbz4BQjawXzQSCClCMxFRA0Aoi3IDNCiRfkBiSmAFHKQAA3nAtsAtCXGUAAAAASUVORK5CYII=',
      'searchUrl': 'https://althub.co.za/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /nzb_check/,
      'spaceEncode': ' ',
      'positiveMatch': true},
  {   'name': 'altHUB',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAAAAABqCHz+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA/SURBVCjPY2CgGPz/ix9iKEDXgkMBQhmUi7AMRCNbz4BQjawXzQSCClCMxFRA0Aoi3IDNCiRfkBiSmAFHKQAA3nAtsAtCXGUAAAAASUVORK5CYII=',
      'searchUrl': 'https://althub.co.za/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /nzb_check/,
      'spaceEncode': ' ',
      'positiveMatch': true,
      'TV': true},
  {   'name': 'BD25',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD39CPHW4lRAAAAMElEQVQI12NgYGCo+cDg1MFQ08Lg1AJmfACKMdj8YXBqACGWPwwSLAwKLAx1f4DCACqLC6kLjCdiAAAAAElFTkSuQmCC',
      'searchUrl': 'http://www.bd25.eu/index.php?page=files&search=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|not authorized to view/,
      'matchRegex': /download.gif/,
      'positiveMatch': true,
      'both': true},
  {   'name': 'DOGnzb',
      'searchUrl': 'https://dognzb.cr/movies/%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Keep me logged/,
      'matchRegex': />available</,
      'positiveMatch': true},
  {   'name': 'DOGnzb',
      'searchUrl': 'https://dognzb.cr/series/%tvdbid%',
      'loggedOutRegex': /Cloudflare|Ray ID|Keep me logged/,
      'matchRegex': /NO NZBS FOUND/,
      'TV': true},
  {   'name': 'DrunkenSlug',
      'icon': 'https://drunkenslug.com/themes/shared/img/favicon.ico',
      'searchUrl': 'https://drunkenslug.com/movies?imdb=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|>Remember me/,
      'matchRegex': /Download/,
      'positiveMatch': true},
  {   'name': 'DrunkenSlug',
      'icon': 'https://drunkenslug.com/themes/shared/img/favicon.ico',
      'searchUrl': 'https://drunkenslug.com/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|>Remember me/,
      'matchRegex': /No result!/,
      'TV': true},
  {   'name': 'GingaDADDY',
      'searchUrl': 'https://www.gingadaddy.com/nzbbrowse.php?b=2&st=2&k=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|You need cookies enabled|Forgotten Password/,
      'matchRegex': /Try again with a refined/,
      'both': true},
  {   'name': 'MIAtrix',
      'searchUrl': 'https://www.miatrix.com/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'spaceEncode': ' '},
  {   'name': 'MIAtrix',
      'searchUrl': 'https://www.miatrix.com/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'spaceEncode': ' ',
      'TV': true},
  {   'name': 'NinjaCentral',
      'searchUrl': 'https://ninjacentral.co.za/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/},
  {   'name': 'NinjaCentral',
      'searchUrl': 'https://ninjacentral.co.za/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'NZBcat',
      'searchUrl': 'https://nzb.cat/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Remember me/,
      'matchRegex': /search did not match/,
      'spaceEncode': ' '},
  {   'name': 'NZBcat',
      'searchUrl': 'https://nzb.cat/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Remember me/,
      'matchRegex': /search did not match/,
      'spaceEncode': ' ',
      'TV': true},
  {   'name': 'NZBfinder',
      'icon': 'https://nzbfinder.ws/assets/nzbfinder-theme/images/appicons/favicon-32x32.png',
      'searchUrl': 'https://nzbfinder.ws/Movies?imdb=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot password/,
      'matchRegex': /View on IMDB/,
      'positiveMatch': true},
  {   'name': 'NZBfinder',
      'icon': 'https://nzbfinder.ws/assets/nzbfinder-theme/images/appicons/favicon-32x32.png',
      'searchUrl': 'https://nzbfinder.ws/search?id=%search_string%&t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot password/,
      'matchRegex': /No result!/,
      'TV': true},
  {   'name': 'nzbforyou',
      'searchUrl': 'https://www.nzbforyou.com/search.php?keywords=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|Remember me/,
      'matchRegex': /No suitable matches were found/,
      'both': true},
  {   'name': 'NZBgeek',
      'searchUrl': 'https://nzbgeek.info/geekseek.php?moviesgeekseek=1&browsecategory=2000&browseincludewords=%search_string% %year%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgot password/,
      'matchRegex': /returned 0 releases/},
  {   'name': 'NZBgeek',
      'searchUrl': 'https://nzbgeek.info/geekseek.php?moviesgeekseek=1&browsecategory=5000&browseincludewords=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID|forgot password/,
      'matchRegex': /returned 0 releases/,
      'TV': true},
  {   'name': 'NZBGrabit',
      'icon': 'https://www.nzbgrabit.xyz/animated_favicon.gif',
      'searchUrl': 'https://www.nzbgrabit.xyz/nzbsearch.php?query=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID|You are not logged in/,
      'matchRegex': /There are no posts/,
      'both': true},
  {   'name': 'NzbNdx',
      'icon': 'https://www.nzbndx.com/templates/bookstrap/images/icons/favicon.ico',
      'searchUrl': 'https://www.nzbndx.com/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/},
  {   'name': 'NzbNdx',
      'icon': 'https://www.nzbndx.com/templates/bookstrap/images/icons/favicon.ico',
      'searchUrl': 'https://www.nzbndx.com/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'NZBnoob',
      'icon': 'https://nzbnoob.com/templates/bookstrap/images/icons/favicon.ico',
      'searchUrl': 'https://nzbnoob.com/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/},
  {   'name': 'NZBnoob',
      'icon': 'https://nzbnoob.com/templates/bookstrap/images/icons/favicon.ico',
      'searchUrl': 'https://nzbnoob.com/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'NZBplanet',
      'icon': 'https://nzbplanet.net/views/images/iphoneicon.png',
      'searchUrl': 'https://nzbplanet.net/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|>Remember Me</,
      'matchRegex': /did not match any/},
  {   'name': 'NZBplanet',
      'icon': 'https://nzbplanet.net/views/images/iphoneicon.png',
      'searchUrl': 'https://nzbplanet.net/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|>Remember Me</,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'NZBsu',
      'icon': 'https://www.nzb.su/templates/light/images/icons/favicon.ico',
      'searchUrl': 'https://www.nzb.su/search/%search_string% %year%?t=2000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/},
  {   'name': 'NZBsu',
      'icon': 'https://www.nzb.su/templates/light/images/icons/favicon.ico',
      'searchUrl': 'https://www.nzb.su/search/%search_string%?t=5000',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgotten your password/,
      'matchRegex': /did not match any/,
      'TV': true},
  {   'name': 'OmgWtf',
      'searchUrl': 'https://omgwtfnzbs.me/browse?search=%tt%&cat=default&sort=3',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot your username/,
      'matchRegex': /returned no results/,
      'both': true},
  {   'name': 'NZBs.in',
      'icon': 'https://nzbs.in/templates/nzbsin_dark/images/favicon.gif',
      'searchUrl': 'https://nzbs.in/search/%search_string% %year%',
      'loggedOutRegex': /Cloudflare|Ray ID|Forgot your username/,
      'matchRegex': /did not match any releases/,
      'both': true},
  {   'name': 'WtFnZb',
      'icon': 'https://0ccec98d8962a17294688363537bfe2e.wtfnzb.pw/templates/bookstrap/images/icons/favicon.ico',
      'searchUrl': 'https://0ccec98d8962a17294688363537bfe2e.wtfnzb.pw/movies/?imdb=%nott%',
      'matchRegex': /Director/,
      'positiveMatch': true,
      'loggedOutRegex': /Remember Me/}
];

var subs_sites = [
  {   'name': 'Addic7ed',
      'searchUrl': 'https://www.addic7ed.com/search.php?search=%search_string%&Submit=Search',
      'matchRegex': /returned zero results/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'AniSubs (EN)',
      'searchUrl': 'https://anisubsblog.blogspot.com/search?q=%search_string_orig%',
      'matchRegex': /No posts matching/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'ArgenTeam (ES)',
      'icon': 'https://www.argenteam.net/static/images/favicon.ico',
      'searchUrl': 'https://www.argenteam.net/search?filter=%search_string_orig%+%year%&movieFilter=on',
      'matchRegex': /No se encontraron coincidencias/,
      'inSecondSearchBar': true},
  {   'name': 'ArgenTeam (ES)',
      'icon': 'https://www.argenteam.net/static/images/favicon.ico',
      'searchUrl': 'https://www.argenteam.net/search?filter=%search_string_orig%+%year%&serieFilter=on',
      'matchRegex': /No se encontraron coincidencias/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'Assrt (CN)',
      'searchUrl': 'https://assrt.net/sub/?searchword=%search_string_orig%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /找不到字幕/,
      'inSecondSearchBar': true},
  {   'name': 'Assrt (CN)',
      'searchUrl': 'https://assrt.net/sub/?searchword=%search_string_orig%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /找不到字幕/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'Feliratok (HU)',
      'searchUrl': 'https://www.feliratok.info/index.php?search=%search_string_orig%+%year%&nyelv=Magyar&tab=film',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /download.png/,
      'positiveMatch': true,
      'inSecondSearchBar': true},
  {   'name': 'Feliratok (HU)',
      'searchUrl': 'https://www.feliratok.info/index.php?search=%search_string_orig%&nyelv=Magyar&tab=sorozat',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /download.png/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'GreekSubs (GR)',
      'icon': 'https://greeksubs.net/uploads/greeksubfav32.png',
      'searchUrl': 'https://greeksubs.net/search/%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Δεν βρέθηκαν υπότιτλοι/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'HosszuPuska (HU)',
      'icon': 'data:image/gif;base64,R0lGODlhEAAQAPECAAAAADg4OP///8zMzCH5BAkKAAMAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAACK5yPOcDtDwyTcVWIX9hg+895HQiOgUmGarqiqemSMCvW9Jll1G5ROaYIHgoAIfkECQoAAwAsAAAAABAAEAAAAimcjznA7c9MXEBWCjMLPIAOht0nlp5ZkiiorlzrwqscaraFU5YNKf5RAAAh+QQJCgADACwAAAAAEAAQAAACJ5yPOcDt3wyTgFKIQdhb8w924SiSoWd+aFqyrbue2WwtlX3NjsIfBQAh+QQJCgADACwAAAAAEAAQAAACKJyPOcDtD1aUhtUIcwu8gw6GnkhyXymeKKiupsvCY6lp1G1Rdab0RwEAIfkECQoAAwAsAAAAABAAEAAAAiicjznA7Q8Mk3FViF/YPIAOhl9IeiU5nl2qbmz7qrGbYdRtUbWt9EYBACH5BAkKAAMALAAAAAAQABAAAAIqnI85wO3PTFxAVgozC7xz4IUiKJYBaYZo2q3s+XouO5+aZuWUdUPKfygAACH5BAkKAAMALAAAAAAQABAAAAIonI85wO3fDJOAUohB2JzrDoJfSI6keJZpaK5Bu8LZXC31ZF90pPRGAQAh+QQJCgADACwAAAAAEAAQAAACKZyPOcDtD1aUhtUIcwu8e+CFIiiWAWmGaNqt7Pl+catqGYVblH0rvlEAACH5BAkKAAMALAAAAAAQABAAAAIonI85wO0PDJNxVYhf2LwH4IUdKIpk6Z0op66fO8LsmGHUbVG1rfRGAQAh+QQJCgADACwAAAAAEAAQAAACLJyPOcDtz0xcQFYKcwu8+wB04feNIFmKqGeaa7uqnIvC8TlrmsVTlg5RCA8FACH5BAkKAAMALAAAAAAQABAAAAItnI85wO3fDJOAUohB0KH7z23f2IUhWXonaqKg6sJpLM4xl+XVsk/8pYsohoYCACH5BAkKAAMALAAAAAAQABAAAAIsnI85wO0PVpSG1QhzCwHwD3KeGJZjV4bnmaJk+7rwCsds6mkaxVuUnlEIDwUAOw==',
      'searchUrl': 'https://hosszupuskasub.com/filmek.php?cim=%search_string_orig%&nyelvtipus=1',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Ilyen bejegyz/,
      'inSecondSearchBar': true},
  {   'name': 'HosszuPuska (HU)',
      'icon': 'data:image/gif;base64,R0lGODlhEAAQAPECAAAAADg4OP///8zMzCH5BAkKAAMAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAACK5yPOcDtDwyTcVWIX9hg+895HQiOgUmGarqiqemSMCvW9Jll1G5ROaYIHgoAIfkECQoAAwAsAAAAABAAEAAAAimcjznA7c9MXEBWCjMLPIAOht0nlp5ZkiiorlzrwqscaraFU5YNKf5RAAAh+QQJCgADACwAAAAAEAAQAAACJ5yPOcDt3wyTgFKIQdhb8w924SiSoWd+aFqyrbue2WwtlX3NjsIfBQAh+QQJCgADACwAAAAAEAAQAAACKJyPOcDtD1aUhtUIcwu8gw6GnkhyXymeKKiupsvCY6lp1G1Rdab0RwEAIfkECQoAAwAsAAAAABAAEAAAAiicjznA7Q8Mk3FViF/YPIAOhl9IeiU5nl2qbmz7qrGbYdRtUbWt9EYBACH5BAkKAAMALAAAAAAQABAAAAIqnI85wO3PTFxAVgozC7xz4IUiKJYBaYZo2q3s+XouO5+aZuWUdUPKfygAACH5BAkKAAMALAAAAAAQABAAAAIonI85wO3fDJOAUohB2JzrDoJfSI6keJZpaK5Bu8LZXC31ZF90pPRGAQAh+QQJCgADACwAAAAAEAAQAAACKZyPOcDtD1aUhtUIcwu8e+CFIiiWAWmGaNqt7Pl+catqGYVblH0rvlEAACH5BAkKAAMALAAAAAAQABAAAAIonI85wO0PDJNxVYhf2LwH4IUdKIpk6Z0op66fO8LsmGHUbVG1rfRGAQAh+QQJCgADACwAAAAAEAAQAAACLJyPOcDtz0xcQFYKcwu8+wB04feNIFmKqGeaa7uqnIvC8TlrmsVTlg5RCA8FACH5BAkKAAMALAAAAAAQABAAAAItnI85wO3fDJOAUohB0KH7z23f2IUhWXonaqKg6sJpLM4xl+XVsk/8pYsohoYCACH5BAkKAAMALAAAAAAQABAAAAIsnI85wO0PVpSG1QhzCwHwD3KeGJZjV4bnmaJk+7rwCsds6mkaxVuUnlEIDwUAOw==',
      'searchUrl': 'https://hosszupuskasub.com/sorozatok.php?cim=%search_string_orig%&nyelvtipus=1',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Ilyen bejegyz/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'Moviesubtitles',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACFlBMVEUAAAABAQECAgIDAwMEBAQFBQUGBgYICAgJCQkKCgoLCwsNDQ0ODg4UFBQYGBgcHBweHh4fHx8gICAhISEjIyMkJCQnJycpKSkqKiowMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlJSUpKSkpMTExMTE1NTU1OTk5PT09RUVFSUlJUVFRVVVVWVlZZWVlaWlpcXFxeXl5gYGBiYmJjY2NkZGRpaWlqampra2tsbGxubm5zc3N0dHR1dXV2dnZ4eHh8fHx9fX2AgICBgYGCgoKDg4OFhYWGhoaIiIiLi4uNjY2Pj4+Tk5OUlJSVlZWWlpaYmJicnJydnZ2goKCkpKSlpaWmpqanp6eoqKipqamqqqqurq6vr6+wsLCzs7O0tLS2tra4uLi5ubm7u7u9vb2+vr7AwMDBwcHCwsLDw8PExMTFxcXGxsbJycnKysrLy8vMzMzNzc3Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dnb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7v4od+AAAAAXRSTlMAQObYZgAAAldJREFUGBm9wfk/k3EcAPDPrFNRrmLZ9/P5bmOWUpRKkZgKFTrQIYm0pFwhOUpakxKl3RN79sz2WIz+w7Y5kld+rPcb/oGYpP07YCtxlw1GQZqztFccgL9Iqnf/XA5bMn901cfDZnrb8lKEseSoMqXj2zn40w3RcK1mIBgMjh9BJI3G5CuDjcq+6NIY8qZg8GoqISKrCUqF8JtytiidMUTt1EIuxxAqXVywJsO655MpSobEsHXxAmEI3VoI/HgMa9TSiI4QkZgh0MYIkbSmwPy8n8Oq25JwEgkJ1R8kqTEDsWAwIIXchVU9fqlTg8hUD+fHL404ht7PCV2NHYJ/WAYRe2w+n3+4qrhqSPKNl4/6fP43eYhYaPbEQUSi6A3x+f1zAw1ur6d1zJLFUcmpPEAQkewVRa+7v93kq8u1iRO6uiY6pEKm0jp1ABADkOD2eHvylFxVKziFd7OfZqoZ8lTOcQIBgAPsGheM6YwYUovYTc8EoRkRibFMZxwA8H0ALWIFhlGR1/bU6vE48jGEml/JAGCvAuCKeB7D2HFx1vzo+r2xqcrDGRd7hWoIUwMkmvVpGEIlnr4shqjr87js7u9OgjBFNkBNFzEk0nRbcogj4tnpsAZYceoEjx98ks2p4MWMQckZItJrl8tlOggronPSqeCr/a3R5Zy+TwolIeJLp9OSD2t2HiOu/2wPcXRylYohZkzap/SwQWxmTn633Waz2UuJMW3WA8fQadgstnLEZrVO1Z5RF7eNVSfAOllUlFy+LSxacbPXODbaf4d2y2Ar8u1y+L9+AZl9xrRD45UJAAAAAElFTkSuQmCC',
      'searchUrl': 'http://www.moviesubtitles.org/search.php?q=%search_string_orig%',
      'matchRegex': /No results found/,
      'inSecondSearchBar': true},
  {   'name': 'Napisy24 (PL)',
      'searchUrl': 'https://napisy24.pl/szukaj?page=1&lang=1&search=%search_string_orig%&typ=1#',
      'matchRegex': /Znalezione Napisy \(0\)/,
      'inSecondSearchBar': true},
  {   'name': 'Napisy24 (PL)',
      'searchUrl': 'https://napisy24.pl/szukaj?page=1&lang=1&search=%search_string_orig%&typ=2#',
      'matchRegex': /Znalezione Napisy \(0\)/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'Nekur (LV)',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADNSURBVHjaYvz///////8ZRixgYhjhYDQARnoAMK5erawiK3fnNoQrKDSyvP/+HQuEISYGoXn5RlYAsLJAs8DvPyMzA/z+M1oIjgbAaACMBsCIBiy/TT7nfRYbwQGgnpI6LT1gBLcEIb3Bt28hXKER1hJ89260EBwNgJFeC5x3qztd7TiCC8Flp8USBBhGbiHIwvqA9wiv3GgZMBoAowEwGgCjATCSA4CVZWR6n5UF6vFXryD0SBscff+OcXRucLQMGA2AEQ0AAAAA//8DAFOnNjmXgsiYAAAAAElFTkSuQmCC',
      'searchUrl': 'http://subtitri.nekur.net/modules/Subtitles.php',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Nekas netika atrasts/,
      'mPOST': 'ajax=1&sSearch=%tt%',
      'inSecondSearchBar': true},
  {   'name': 'OpenSubtitles',
      'searchUrl': 'https://www.opensubtitles.org/en/search/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (DE)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-ger/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (EN)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-eng/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (ES)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-spa/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (FR)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-fre/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (GR)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-ell/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (IT)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-ita/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (PL)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-pol/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (PT)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-por/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (RO)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-rum/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (RU)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-rus/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'OpenSubtitles (TR)',
      'searchUrl': 'https://www.opensubtitles.org/en/search/sublanguageid-tur/imdbid-%nott%',
      'loggedOutRegex': /Guru Meditation/,
      'matchRegex': /div itemscope/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Pipocas (BR)',
      'searchUrl': 'https://pipocas.tv/legendas?t=imdb&s=%nott%&l=brasileiro',
      'loggedOutRegex': /Cloudflare|Ray ID|Lembrar-me/,
      'matchRegex': /Não existem legendas/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Pipocas (PT)',
      'searchUrl': 'https://pipocas.tv/legendas?t=imdb&s=%nott%&l=portugues',
      'loggedOutRegex': /Cloudflare|Ray ID|Lembrar-me/,
      'matchRegex': /Não existem legendas/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'PlanetDP (TR)',
      'searchUrl': 'https://planetdp.org/movie/search/?title=%tt%',
      'matchRegex': /<span>Altyazılar/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Podnapisi',
      'searchUrl': 'https://www.podnapisi.net/en/subtitles/search/advanced?keywords=%search_string_orig%&year=%year%',
      'matchRegex': /table-responsive/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Podnapisi (EN)',
      'searchUrl': 'https://www.podnapisi.net/en/subtitles/search/advanced?keywords=%search_string_orig%&year=%year%&language=en',
      'matchRegex': /table-responsive/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'RegieLive (RO)',
      'searchUrl': 'https://subtitrari.regielive.ro/cauta.html?s=%search_string_orig%',
      'matchRegex': /Nu au fost gasite subtitrari/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Subs4free (GR|EN)',
      'icon': 'https://www.subs4free.club/images/icons/favicon-32x32.png',
      'searchUrl': 'https://www.subs4free.club/search_report.php?search=%search_string%&searchType=1',
      'matchRegex': /any subtitles using your criteria|There is no subtitle/,
      'inSecondSearchBar': true},
  {   'name': 'Subs4free (GR|EN)',
      'icon': 'https://www.subs4free.club/images/icons/favicon-32x32.png',
      'searchUrl': 'https://www.subs4free.club/search_report.php?search=%search_string%&searchType=2',
      'matchRegex': /any subtitles using your criteria|There is no subtitle/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'SubDivX (ES)',
      'searchUrl': 'https://www.subdivx.com/index.php?q=%search_string_orig%+%year%&accion=5&subtitulos=1',
      'matchRegex': /No encontramos resultados/,
      'inSecondSearchBar': true},
  {   'name': 'SubDivX (ES)',
      'searchUrl': 'https://www.subdivx.com/index.php?q=%search_string%&accion=5&subtitulos=1',
      'matchRegex': /No encontramos resultados/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'Subs.com.ru (RU)',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://subs.com.ru/index.php?e=search&sq=%search_string_orig%',
      'matchRegex': /Ничего не найдено/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Subs.ro',
      'icon': 'https://cdn.subs.ro/fav.ico',
      'searchUrl': 'https://subs.ro/subtitrari/imdbid/%nott%',
      'matchRegex': /Pagina solicitată/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Subscene',
      'searchUrl': 'https://subscene.com/subtitles/searchbytitle?query=%search_string%',
      'loggedOutRegex': /Please do not hammer|HTTP Error 404/,
      'matchRegex': />Exact</,
      'positiveMatch': true,
      'rateLimit': 7500,
      'inSecondSearchBar': true},
  {   'name': 'Subscene',
      'searchUrl': 'https://subscene.com/subtitles/searchbytitle?query=%search_string%',
      'loggedOutRegex': /Please do not hammer|HTTP Error 404/,
      'matchRegex': />TV-Series</,
      'positiveMatch': true,
      'rateLimit': 7500,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'SubsLand (BG)',
      'searchUrl': 'https://subsland.com/index.php?s=%search_string_orig%&w=name&category=1',
      'matchRegex': /Няма намерени субтитри|Не са открити/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'SubsUnacs (BG)',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAeUExURQAAAA4ODisrKzk5OWRkZIGBgaysrLq6utfX1+Xl5Q6iRfAAAACnSURBVCjPjZHRDYJAEEQHaIASSLAAolSAPUgFaixAE0uwAeC6ZR13LuEIkf27l5vZ2V2EpLAHTK8b6/5xMJ5PrPbtYGjAKh4bYHpWfGcHl4xdSZD3bkpFVrunQH7xrgG0cD0BLVxPIIXSQp5Ki+svBRQOx/IfWEk0PH9aHmg9/Gl54grZ3jawCeJIAnEkAjOm53eJBNaaXQUWW4X02ipCcimE5JarY89anrB+IWyh0wAAAABJRU5ErkJggg==',
      'searchUrl': 'https://subsunacs.net/search.php?m=%search_string_orig%&y=%year%&t=Submit',
      'matchRegex': /transpDiv/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Subtitles.hr',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAB3RJTUUH5AgHEyg0ji/HegAAAEhQTFRFDjlULFJpSmt/aYSUeJCfh5yqlqm1w87V8fP1/wAA/xAQ/yAg/0BA/1BQ/2Bg/4CA/5CQ/6Cg/7Cw/8DA/9DQ/+Dg//Dw////dQyPXQAAAKdJREFUOMvlk90OgyAMhR1YO5yOOYTz/m86foRIMvB62bnqab5AW8ow/Isk8xSDiVlGm0TiAAjgGDBA0WbJKwC3K2BsANGKewqU0oBRQQbQJ/uKQQfYTsC+BO0VsDpgy0CRru3zAthVHzCPAlgdZDPgjL8fblaq2cX8xpFttTnbVGN7DmtV5LdBeYfFA+23QM43gGAhekA5QhCl1ZEUtqzYYSSi3/g1Hx39HyjcMM70AAAAAElFTkSuQmCC',
      'searchUrl': 'https://www.subtitles.hr/subtitles-search/?movie=%search_string_orig%',
      'matchRegex': /matched subtitles found/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Subtitry (RU)',
      'searchUrl': 'https://subtitry.ru/subtitles/?film=%nott%',
      'matchRegex': />0</,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Titlovi (BiH|HR|MK|SLO|SRB)',
      'searchUrl': 'https://titlovi.com/titlovi/?prijevod=%tt%',
      'loggedOutRegex': /Ray ID|security check to access|Još samo jedan/,
      'matchRegex': /<b>0<\/b> rezultata/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Titrari (RO)',
      'searchUrl': 'https://www.titrari.ro/index.php?page=cautaredevansata&z5=%nott%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': />1-0\/0</,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'TransHeaven (BG)',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAVKSURBVBgZtcHLb1xnGcDh3/tdzmVmbI89nthNTGoTW2qIUFQUVagSGzaV2LKCFRtWsEBi0Q1iw55V/4IqFUsElSpVrAA1SLSoXBqJujEpSWzH13HGnjlzbt/bMJKLjR3qSPA8oqr8PzngF2//5t0H2Wii842bL/3gZof/kR/f6e1ltQPu3PntX4vuVrexlma/3huSH0qVqwgIT4nwL8JTqqD8NyoYEf8kZycrhlVwwNrq3x+luuNXNnaE0pE5yhIRVAmBUKMKioCxGIcYnimAxXhCoIYQHJD4KLKKMzRaTEb4DmWNsVQlRU6RUZdQY4UoJWrhYlRBOYciFgs1Pj9wde4A7yJvHNWIwS6mJKukGIkRxSoeMYhHLFozGpINBFBUOI8KTqwzRhylJTjAuNjalFHG41XZUj88csVQNFTJTDH5gk7OEbcQR1FIf9M9WXdZT41TEc6hotaKrdLpbGIGHzsgH2VabLjt3UhKVw5cfmjzoSlC0bnK4q0iTjVtYx3Dvtu+11j7fbL7SXCJWodwmggaqlDnIZ1b7L70im3POeDoYGe0fd8c9NOQxSFTraQY+ZGYF7arVqdc+KraCBtRl2b/YfTpB+mDD+qoFXyEgPA5ETEi+SjLn5Tt5ZWvLM5OW3HA/OxMHEduvvHLd97l2Ndi2Xx8TxZvSV0hSOR87K7Nde5+9D5f5NXFublL8Tevta8szTrgzdtvccbMi/NrW0VlEzUWLayNW63GzVtf5wLufLrFMcMzTHSmc6UWixiojNU4iRaWvsxzMjxLUEBQFBAFRYsy5zk5zhHAoMppSgj8WwVB0aABtSJOMCKc4ThNoQ7qDEERTlFVY4RjDhCwAsKzGc6olaeUExRBrI2KrOA5Oc4QTlMlqFHjfHPQ32PsOz9/665fDFduTHSnVmz25qsNjv3ojdsfTt7YSRexDhHHRSjWSpr46smIsd+994eNdkG9GKXtSy3LCe+8/atPritXp4mbWGf4Iipg1DgaCdYoY83hPtURWs2nvDwbcUJ/9U++9wjJbKQ+FsfFGEsUkcYRY2nIqYaEKoFYOGlYYUJwJjRscF4NF6HKU0LaaDAWNRoIhHqYcb+Xc4JferluX66tD6JK5Xge3kWMWR8hipb9jA+V771XXO5E++tbf37/j9Wtb4fONXWJEjQUjosQUKSmrpSxoAoBymHNapZsQFJS1HP9pdcG3WGo1UohmhOC4+ICWitjCohgbZVX/cNef3iI1lhL2sAngDAWcJyhfE5AQED5T4pxRA3KEY8/5uFHDA6oRi6NTfdq0V0JM5fVWBXrOE3AGQMIAS0JJaFCDQIGY4UxUUXBJE50qtxpZ2tp1qO3kR3tH8xe6994LUzO2KhprXOcYUUAS02dSTmgKgkGQSzOC2NWoawJkvroxan4+pXpedMa/vPoH3dXV3dNcbST1yNvmt47x2kaQlWWPo4rcXU6Ic02jUmiVA2lMKwCY7lJSNu4OJ2Kl6Mv3X79WxxbXL4eQqhdXNoIEzlOq8rCxwmQSVq1F5hd0s4VWo3gKAy9QcXYkZ9ieoG0ZWfoNFY4oWebw+YlbXSPJLHBGU7zcQL87Kc/OXItmV4gmZIyk95G2Nw63NxbX3/43e//EKiLUZLvx5t/6fY2FlqWE2pMNNhv7N2f2l9r799znGdzZzf3qbctHR3qxirFgMgMJid2Dh7oQR9IDtdnQ13tf3zZ3eh2XmF5mWMTOjKbf2tGYWqyGUXecZ5hNqqNNcZpXYbBAcMeXiotssHBoCgAWwwS3S6H+81eOx0dcoLX2g/2mk8eTdrJpIo+AyHxf+9tZ3PxAAAAAElFTkSuQmCC',
      'searchUrl': 'http://subs.sab.bz/index.php?act=search&movie=%search_string_orig%&yr=%year%',
      'matchRegex': /<tr class="subs-row">/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'TVsubtitles',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACFlBMVEUAAAABAQECAgIDAwMEBAQFBQUGBgYICAgJCQkKCgoLCwsNDQ0ODg4UFBQYGBgcHBweHh4fHx8gICAhISEjIyMkJCQnJycpKSkqKiowMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlJSUpKSkpMTExMTE1NTU1OTk5PT09RUVFSUlJUVFRVVVVWVlZZWVlaWlpcXFxeXl5gYGBiYmJjY2NkZGRpaWlqampra2tsbGxubm5zc3N0dHR1dXV2dnZ4eHh8fHx9fX2AgICBgYGCgoKDg4OFhYWGhoaIiIiLi4uNjY2Pj4+Tk5OUlJSVlZWWlpaYmJicnJydnZ2goKCkpKSlpaWmpqanp6eoqKipqamqqqqurq6vr6+wsLCzs7O0tLS2tra4uLi5ubm7u7u9vb2+vr7AwMDBwcHCwsLDw8PExMTFxcXGxsbJycnKysrLy8vMzMzNzc3Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dnb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7v4od+AAAAAXRSTlMAQObYZgAAAldJREFUGBm9wfk/k3EcAPDPrFNRrmLZ9/P5bmOWUpRKkZgKFTrQIYm0pFwhOUpakxKl3RN79sz2WIz+w7Y5kld+rPcb/oGYpP07YCtxlw1GQZqztFccgL9Iqnf/XA5bMn901cfDZnrb8lKEseSoMqXj2zn40w3RcK1mIBgMjh9BJI3G5CuDjcq+6NIY8qZg8GoqISKrCUqF8JtytiidMUTt1EIuxxAqXVywJsO655MpSobEsHXxAmEI3VoI/HgMa9TSiI4QkZgh0MYIkbSmwPy8n8Oq25JwEgkJ1R8kqTEDsWAwIIXchVU9fqlTg8hUD+fHL404ht7PCV2NHYJ/WAYRe2w+n3+4qrhqSPKNl4/6fP43eYhYaPbEQUSi6A3x+f1zAw1ur6d1zJLFUcmpPEAQkewVRa+7v93kq8u1iRO6uiY6pEKm0jp1ABADkOD2eHvylFxVKziFd7OfZqoZ8lTOcQIBgAPsGheM6YwYUovYTc8EoRkRibFMZxwA8H0ALWIFhlGR1/bU6vE48jGEml/JAGCvAuCKeB7D2HFx1vzo+r2xqcrDGRd7hWoIUwMkmvVpGEIlnr4shqjr87js7u9OgjBFNkBNFzEk0nRbcogj4tnpsAZYceoEjx98ks2p4MWMQckZItJrl8tlOggronPSqeCr/a3R5Zy+TwolIeJLp9OSD2t2HiOu/2wPcXRylYohZkzap/SwQWxmTn633Waz2UuJMW3WA8fQadgstnLEZrVO1Z5RF7eNVSfAOllUlFy+LSxacbPXODbaf4d2y2Ar8u1y+L9+AZl9xrRD45UJAAAAAElFTkSuQmCC',
      'searchUrl': 'http://www.tvsubtitles.net/search.php?q=%search_string_orig%',
      'matchRegex': /No results found/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'WizdomSubs (IL)',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://json.wizdom.xyz/%tt%.json',
      'goToUrl': 'https://wizdom.xyz/movie/%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /release_group/,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Yavka (BG)',
      'searchUrl': 'https://yavka.net/subtitles.php?l=BG&i=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /href="\/subs\//,
      'positiveMatch': true,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Zimuku (CN)',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://zmk.pw/search?q=%tt%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /搜索不到相关字幕/,
      'inSecondSearchBar': true,
      'both': true}
];

var pre_databases = [
  {   'name': 'PREcBurns',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'http://pre.c-burns.co.uk/pre.php?searchtext=%search_string%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': />: 0</,
      'inSecondSearchBar': true},
  {   'name': 'PREcBurns',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADsSURBVHja3NhbFoMwCEVR5j9p+ltr4B7Io0v1L6nslGSZoLntve0IIK/kefWY+hUcZg8o5qIKNNLNgfaMCiBeWKNrjPzGs2GDDJ4xKVALHiLhHIjgcR8D0vAqdSMiAch0auIKlEYPCA7c2ynxDYDxk1bXAF05JJ1XpTR+Z4v5DvgLAfVyyHoXAF4D1ox/GtD/dwog6ZwA2GwtALwH2JLwzwfsr4BtAhovC3KEgTtaG4i2TJtIUbwn2wogP1UAgvUiwMoAOdnhs2kb2H66PlAfVCocr1c40zWa8yrT91aZR+rkA5U+Qdi3ip33ZwAb5/CcnuFpKAAAAABJRU5ErkJggg==',
      'searchUrl': 'http://pre.c-burns.co.uk/pre.php?searchtext=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': />: 0</,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'PreDB',
      'loggedOutRegex': /Ray ID|security check to access|seconds to search again/,
      'searchUrl': 'https://predb.me/?search=%search_string%+%year%&cats=movies',
      'matchRegex': /Nothing found.../,
      'inSecondSearchBar': true},
  {   'name': 'PreDB',
      'loggedOutRegex': /Ray ID|security check to access|seconds to search again/,
      'searchUrl': 'https://predb.me/?search=%search_string%&cats=tv',
      'matchRegex': /Nothing found.../,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'PreDB-Orig',
      'loggedOutRegex': /Ray ID|security check to access|seconds to search again/,
      'searchUrl': 'https://predb.me/?search=%search_string_orig%+%year%&cats=movies',
      'matchRegex': /Nothing found.../,
      'inSecondSearchBar': true},
  {   'name': 'PreDB-Orig',
      'loggedOutRegex': /Ray ID|security check to access|seconds to search again/,
      'searchUrl': 'https://predb.me/?search=%search_string_orig%&cats=tv',
      'matchRegex': /Nothing found.../,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'preFYP',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACXBIWXMAABLIAAASyAH7Hi3CAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAMUExURQAAAAAAAAAAANHR0dBVfo0AAAACdFJOU/3+jYSN0wAAAE9JREFUGNNj+LsKDOoZfkEY6xleQRirGV79B4PVDK8hjNcMr8GK1gMZQCGgEuyMf6twMvDo+rOKMOMvlAF2IskMuONh3oF7EO5leCDAggUAEyPMhg3uaZgAAAAASUVORK5CYII=',
      'searchUrl': 'https://pre.fyp.nl/search.html',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /Sorry, no results/,
      'mPOST': 'input-Search=%search_string%&submit-Search=',
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'PREovh',
      'searchUrl': 'https://predb.ovh/api/v1/?q=%search_string%+%year%',
      'goToUrl': 'https://predb.ovh/?q=%search_string%+%year%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /total": 0/,
      'inSecondSearchBar': true},
  {   'name': 'PREovh',
      'searchUrl': 'https://predb.ovh/api/v1/?q=%search_string%',
      'goToUrl': 'https://predb.ovh/?q=%search_string%',
      'loggedOutRegex': /Cloudflare|Ray ID/,
      'matchRegex': /total": 0/,
      'inSecondSearchBar': true,
      'TV': true},
  {   'name': 'srrDB',
      'searchUrl': 'https://www.srrdb.com/browse/imdb:%nott%',
      'matchRegex': />0 results</,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'xREL',
      'searchUrl': 'https://www.xrel.to/search.html?xrel_search_query=%tt%&lang=en_US',
      'matchRegex': /not return any results/,
      'inSecondSearchBar': true,
      'both': true}
];

var other_sites = [
  {   'name': 'Fist of B-List',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACRElEQVQoz42SvU/bUBTFz/uIyWCRxGkSjJWSFqkMURgqUCu1U4qExEC7MLLyDzBUdOvHWjpkQYgl3VgZWok5U4UEEkNKqQIqcqDEFeHFke1n49chDBSWXt3hDudcnZ/uBQAAUQSl8D/F36wgkPz8HJp27b0rWl5eppT2+/39/X0yWEyIBsi70vn5+ZmZGSGEUsp1Xdu26e8zXFzwdx/weoUD/KZ6dHR0enp6c3MzCIJsNut5npSSDIIpFQEghN+MtLi4uLe3NzU1Va1WLy8vGWOO4/ClJfgBDn9yjUe3AAzDmJubW1hY2Nracl23UqmYpnnN8PARjg55oTDieUIIMTDU6/WJiYnj42Pf923bzmQytm3zk19wvbExs/igmNQ0zjnvdDqWZZVKpXK53Gg0hBC6rhuGEYZhr9fj98cAaLr+I5/XU6lUEASe53W73Z2dHSFEqVRqNpuWZRFCcrmcUorVarXh4XB391sikej1emEY+r4vpZRShmGYz+cBtNttSqnjOGtra9QwjNnZWQBSSs55EARKKUopY6zVajHGdF0fHx8HsLGxAYBKKRuNxoDS9wNKKSEkjhHHJI7jg4ODoaHk6enZ+vr6PxdNI43rzgH5VMoERoDi5OTj278EJD+tDlVfyNYRvZfF9jZ9/ix0/iSePvHfvs98rjvN72jbaaX8L1/V6seAAsl+X0VXMEcolLKKKpslnQ5jPCoUrl6+wlU8nEgq01SUKgAknU53uwRgQARQgAAU4IMhqRFfEkABJwAHor/pPAicVESz8wAAAABJRU5ErkJggg==',
      'searchUrl': 'http://www.fistofblist.com/search?q=%search_string%+%year%',
      'matchRegex': /No posts matching/,
      'inSecondSearchBar': true},
  {   'name': 'Scripts On Screen',
      'searchUrl': 'https://scripts-onscreen.com/?s=%tt%',
      'matchRegex': /nothing matched/,
      'inSecondSearchBar': true,
      'both': true},
  {   'name': 'Simply Scripts',
      'searchUrl': 'https://www.simplyscripts.com/cgi-bin/search.pl?search=%search_string_orig%&method=exact',
      'matchRegex': /There are 0 results/,
      'inSecondSearchBar': true,
      'both': true}
];

var streaming_sites = [
  {   'name': 'DbGDP',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAROSURBVFjDzZdbTBRnGIZJ0/te9aKJFhWwi6Fgu6wHPLR40bTaRm1CUamFptWmrYZUW4IcTCTW0gZDLyBBjFi4wGoitnsAi2Bokap00yJW2YXCnoGZ7bK7YGFhd3n7/bOMYfYgyyHqxZOZ7E7+95nv/+bLTAyAmCdJzFMjwG1dK/IMsY/4hTATjki4Nq51nCpL4rZfS3S8q4mInegl6ojNRAwjksBzhIpANJAASAAkAFo0GvxEcSSBZwm1JGRLCvgNMvCp8eDlcXSU4k6Ow4lTsd70q8uwXSnlLeG4HDvV8eFEcsMJZErCNyUJ4YM5e2EuOw3jmXMwVUmxVp6DsuWsv/JuNc50SanuqkLp7SLkNL+OHcoXsVsjmy3AhxNofhielgRumwKGC1egt09DN4aIDIwAZjtgCkL87e6gE991luBt1QoKfijhDCdgDgiwsifCcEkN3QSgJ1f98MLp5wIiJ2/lC5WYEXCEE+CZAL/+JdgOZENHl+g56WK93MIkBugmbposyGhMxi716jkEqLlMldVCeYMX6hmaholK/o99fgK9RB/J57Zl4h1hKx4loEiAsfZH6Eali7DgKo0VBTU6dFu8sLrmVxEDVeFY+0HqhdgoBH64ECJgocDTl414flcD0o+0oabZhn57QCzabchvP7A4ge+vmLBirwrxWRqs2qfGeyW3odE6hf8G/n2MAmtympBIrKTzxOwmHK7oxs3ecdjc1B/8YxIQkWU3IjZTCcWnLSi92I/7Np9wbXB/zCnwIC2eJzD+yguw1dShJ0oBkdX7NYLIG3ntqGsdxv1Bn0SCCXzx28dIp1nwploWKlCWXTFEeEv3lHuvNnT7B1zzExBZlvEzlmcoUaE0wzirQftIoLHzkK++ZY334nU5FyKQVOLjCawq8qG8dRrWkfkJJLxPFdijwo6CDtS3cdAN+yUV0NH5+J0vgQ4FTaWtoRVYf9zFE0jOd6Li2iQsUQrIPmgUgjd83kqPqYGu9cPiDO0BJuDsOorJG6nw/L5l8QKs+1fOnB+tugdtvwdWd6DU4Z6CJRWIy1ILcyDrmz/Q3OWOag4siYAwCXc2BDr9+pAQaoxyEs5LoLIlVICN3OomG47X9uJehGd9SQReJoGTP03A6gyzCGF2Rp52j2Yao9oPMdmxLqIAxwReLXBhd/kodEOhQQt9H+ihdQwmPQVvniG8QB8TYKQcc+JblQeDrLnsi3sj6hFuYgquv3Kp/AoWHlHgvCigKKZKFDpxomECWqMfRtZsjlBMRB8J9lBldLwUFsz2fcCsp/AjmLohF8MZo+EE5IRflFhXHGjIbV+78dHZBzhc+x8OBXHw/BR+bav3jf2dh5E7xUEUwv3nJxT2mth4s+kOJ8DIEwVEUosCW5JCMsJxFglfeaC6ROP1lky4w2AmO1jJNwWHjxEbIwkwPiNMhGMukgs9Ds3lQg6dcgfb1yjQEmnEU/hx+qT4Hxx8JuUJoU43AAAAAElFTkSuQmCC',
      'searchUrl': 'https://databasegdriveplayer.co/player.php?imdb=%tt%',
      'matchRegex': />HLS Mode</,
      'positiveMatch': true,
      'inThirdSearchBar': true},
  {   'name': 'VidSrc',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABD0lEQVQ4ja2TvUoEMRSFv3sns7nbC4KtheAKNhZbW4mlpY0P4FYWgiLoFgpa2/kYvpwussciM+P+2TiekHCS+3cuSUwSfWDjoF+GcSBJSPoT917V2xZyDPj8mC0ZcgzWnBd9Wru9P08E8DWb8fL0xt30EgyaZQFCgsf7V24fJt1pAjArM4Y1XhlgG8INSUTUuIPmICC5gzUZIhLu/psAhJGjxt1RM5K7YWZFQdS0+02QROSEuyEaBWaOexEduWRvW1quDtJPEQFzWWmhDcqRqKoSuaqi3L2RGwVzwCXs+uTo/17i1fFux29O9zo+PTvYyM/3t+Sj0U6XbJCrjg+H6w9pFSlV2MXhdq8WrO93/gaUmJF4CshtQwAAAABJRU5ErkJggg==',
      'searchUrl': 'https://v2.vidsrc.me/embed/%tt%/',
      'matchRegex': /Not Found!/,
      'ignore404': true,
      'inThirdSearchBar': true}
];

var sites = public_sites.concat(private_sites, usenet_sites, custom_sites, subs_sites, pre_databases, other_sites, streaming_sites);

var icon_sites_main = [
  {   'name': 'AllMovie',
      'icon': 'https://cdn-gce.allmovie.com/images/ios/AppIcon57x57.png',
      'searchUrl': 'https://www.allmovie.com/search/movies/%search_string%',
      'showByDefault': false},
  {   'name': 'AlloCiné (FR)',
      'icon': 'https://assets.allocine.fr/favicon/allocine.ico',
      'searchUrl': 'https://www.allocine.fr/rechercher/?q=%search_string_orig%',
      'showByDefault': false},
  {   'name': 'Amazon',
      'searchUrl': 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dmovies-tv&field-keywords=%search_string%',
      'showByDefault': false},
  {   'name': 'BCDB',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www.bcdb.com/bcdb/search.cgi?query=%search_string%',
      'showByDefault': false},
  {   'name': 'Blu-ray',
      'searchUrl': 'https://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&quicksearch_keyword=%search_string%+&section=bluraymovies',
      'showByDefault': false},
  {   'name': 'Box Office Mojo',
      'searchUrl': 'https://www.boxofficemojo.com/title/%tt%',
      'showByDefault': false},
  {   'name': 'Caps-A-Holic',
      'icon': 'https://caps-a-holic.com/image/favicon.png',
      'searchUrl': 'https://caps-a-holic.com/index.php?s=%search_string%',
      'showByDefault': false},
  {   'name': 'Criterion',
      'icon': 'https://www.criterion.com/assets/img/icons/favicon-32x32.png',
      'searchUrl': 'https://www.criterion.com/search#stq=%search_string%',
      'showByDefault': false},
  {   'name': 'Criterion Channel',
      'icon': 'https://vhx.imgix.net/criterionchannelchartersu/assets/15749e13-43d7-4c08-88bf-f634ca8756b3.png',
      'searchUrl': 'https://www.criterionchannel.com/search?q=%search_string%',
      'showByDefault': false},
  {   'name': 'Criticker',
      'searchUrl': 'https://www.criticker.com/?search=%search_string%&type=films'},
  {   'name': 'DVD-Basen',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'http://www.dvd-basen.dk/uk/home.php3?search=%search_string%&mvis=ok&region=z&land=z&ok=go',
      'showByDefault': false},
  {   'name': 'DVDBeaver',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAACXBIWXMAAC4jAAAuIwF4pT92AAAA2FBMVEUAAAABAQECAgIHBwcICAcICAgJCQgKCgoODg0WFRUYGBcgHx4mJSQnJyUuLSsvLy0yMS81NTJJR0ROTUpbWlZkY19ubGhwbml4dnGDgXuLiIKRj4idm5SioJmsqaKvraW1squ2tKy+u7PQzMPRzsXW0sng3dPn5Nro5Nrt6d/w7OLz7+X18eb28uj38+j38+n49On59er59uv69uv69+z79+z79+38+O39+e79+e/++u/++/D/+/D//fH//vP///T///X///b///j///n///v///z///3///9ZGPSzAAAA1ElEQVQ4y9XT2U7CQBgF4GNZXKAorUjZqyJqRVsoZWkLWrbz/m9EbMAEEjoDd87l5MvkX84gFBz8H+B6ZDMHXGaB2yeyN9wD/RFZTRVfuOp+km0NyLdIz90C/tSugNIrF1/+783EXrJzD1zXFxy7MsBQdIvThBpiENnB0S6EIO5i3bgBMheAkgZUk+sZ3zSlHPHIoHx7/gfw4PDbCT2XNFVgV2RgR7R0xZAFH4PDNhNA4ZF8vktVyHftvBdOLlI4BxkgGLXcNoV5SALCyAlTLQESP84GnOu89+TquhEAAAAASUVORK5CYII=',
      'searchUrl': 'https://www.google.com/search?q="%search_string%"+site:www.dvdbeaver.com',
      'showByDefault': false},
  {   'name': 'DVDCompare',
      'searchUrl': 'https://www.dvdcompare.net/comparisons/search.php',
      'mPOST': 'param=%search_string%&searchtype=text',
      'showByDefault': false},
  {   'name': 'DVDTalk',
      'searchUrl': 'https://www.dvdtalk.com/reviews/search?orderBy=Date&reviewType=All&NReviews=50&searchText=%search_string%&searchType=advanced',
      'showByDefault': false},
  {   'name': 'Facebook',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www.facebook.com/search/pages/?q=%search_string_orig%',
      'showByDefault': false},
  {   'name': 'FilmAffinity',
      'icon': 'https://www.filmaffinity.com/favicon.png',
      'searchUrl': 'https://www.filmaffinity.com/en/advsearch.php?stext=%search_string%&stype[]=title&fromyear=%year%&toyear=%year%',
      'showByDefault': false},
  {   'name': 'Filmow',
      'searchUrl': 'https://filmow.com/buscar/?year_start=%year%&q=%search_string_orig%',
      'showByDefault': false},
  {   'name': 'Filmsomniac',
      'searchUrl': 'https://www.filmsomniac.com/advanced-search/%search_string%',
      'spaceEncode': ' ',
      'showByDefault': false},
  {   'name': 'FindAnyFilm',
      'icon': 'https://www.findanyfilm.com/server-assets/favicon.png',
      'searchUrl': 'https://www.findanyfilm.com/search?all=%search_string%&sort=product_release_date&type=ALL',
      'showByDefault': false},
  {   'name': 'Google',
      'searchUrl': 'https://www.google.com/search?q=%search_string%'},
  {   'name': 'iCheckMovies',
      'searchUrl': 'https://www.icheckmovies.com/search/movies/?query=%tt%'},
  {   'name': 'JustWatch',
      'searchUrl': 'https://justwatch.com/us/search?q=%search_string%',
      'showByDefault': false},
  {   'name': 'КиноПоиск (RU)',
      'searchUrl': 'https://www.kinopoisk.ru/index.php?kp_query=%search_string%',
      'showByDefault': false},
  {   'name': 'Letterboxd',
      'searchUrl': 'https://letterboxd.com/imdb/%nott%'},
  {   'name': 'Lumiere',
      'searchUrl': 'https://lumiere.obs.coe.int/web/search/',
      'mPOST': 'search=search&title=%search_string%&search.x=0&search.y=0',
      'showByDefault': false},
  {   'name': 'Metacritic',
      'icon': 'https://www.metacritic.com/images/icons/metacritic-icon.svg',
      'searchUrl': 'https://www.metacritic.com/search/all/%search_string%/results?cats[movie]=1&cats[tv]=1&search_type=advanced&sort=relevancy',
      'showByDefault': false},
  {   'name': 'Movie-Censorship',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAB3RJTUUH5AoDEjQAvYzAkgAABHxJREFUSMftVU1sE1cQfru209ACSQ9pK4HUSBFcoBERlzYVbQNqD4AQ7blRe0BqSISEaCWQ2qTcilo5OLEd2/k1IaUQBxCiCEcYK06kNiiFUCfkp0pShO3E+XHW9nrX6/X+dN57seum1/aW1Wj1dmbe972ZNzOLpP/5QVsEWwT/CUEanlSKigjvdHqTE3YQhA2rKEj/NouiSK3YQQSNlANBYM3Isqrreclks4UcsAE0eWtW1/8BLgiAlS3YLmta7lAYBAF6Mhab8Xgm3G6QoNu9+uKFBBxwEIIOm+PR6MzAALUuBAICNZGwFOBTlNDo6MQVvH2yry8SDPIQDXiQgyJd14fPnfseoVaEWhBqRmig5oM1bh2Chv1yNrsUDF7du4daW4jblKdfUVWB54H7T5/vZk2N86Wi1py1Y+eO3vJyT3V1aHJSlGWUkaQ5v7+v8i2HyeQqwgJOQ02NKVWFnEqZzK1DhywIuUxGMLUZDQOffLy0uJgRRVnXn1gsNpa1IuRAyE7EhlAbETiot66OV1WU4jhI3MMzZyiKg2XaGKajtHRhfFxWlD/u3IH9LqPBwSCnAWMNNZsTsgwRzHnvAxz4O40G1/ZXvOfP/+p236391GEwOI1GR1FR7949S+EwEuJxRVH8p+ssFAhhIAji3uefpXT97tGjrUSD9SyDCS5d4mUZbu72kcNgai8yAc3PdV9E0um4KCY07ZHDAZrLCPXu2xcJhTCBqmn++tM5AgYOCzG6thXfP3WqvbjYwWBNIYGgadHZ2c6SnW2EG+CGra2cIIjJJFxbSlF+v3Hdd/HiRCDAJZObCdpIQqnQ5OY1eYKUpk15vVRP8+b/timekaEJaOGmNY1XlATPC6lUnqAegup8tXTg5Em8k8HiZFmnyXjjow83UkTvAFIEBD7fRlhE2f/+e2sQAc+T6k/DAsoXJPV3BA31FlJhY16ve/cuqAe4Ooj9p3erhzs6KCVoCMF3SUVZWpjveeN1O8NAWE6GsRvYMXePpOv5rhy328aazeuxGLnkbJYSQDnPTk/7v/qylVQUwI24XI/7PbYCgoDZnIBEaJqvHm+B2nWyOI3tO7Y/sloBkYtGf2lqAlPXa2URXEUcB702dPZsC8u6Xt42+/RpeGGho6QECrynvPz56uposxnWtA9g8eDCBYgAKFYWF69VHYDmchlYpwGXH5zjakXFld27Wsj6QWPjMsch6NVxm62zrMxKbtVdUfF8airwzdc/4NqwTgcCdqKnTURlfmQkC2Mgk4nMz3mOHLbmHOy5bu8ufzPQYgmvriUTCSSr6mBtrXv//msHD/ZVVfVWVk4ODq4sL//W1RWORMLPnt0+dgz0P2I5cP2dt+81NIRmZoAAz05ZjsXjY93dt44fBwdwu3niRMByeTYYXOV5PpHAswiPLFWF76X1dZDlZBKKV4BS03XwAQjo2yjHUSssYjCYc7M2TQe1psHkAhPISiLBSRJPRnfB/wAqDBCJ4AWZ5ngOEwxxk5U6FP4MCkz0LRU4bP2Ttwi2CCTpLw+PfGOkBCRRAAAAAElFTkSuQmCC',
      'searchUrl': 'https://www.movie-censorship.com/list.php?s=%search_string%',
      'showByDefault': false},
  {   'name': 'MovieBuff',
      'searchUrl': 'https://www.moviebuff.com/search?q=%search_string_orig%',
      'showByDefault': false},
  {   'name': 'MovieChat',
      'icon': 'https://moviechat.org/favicons/favicon-32x32.png',
      'searchUrl': 'https://moviechat.org/%tt%'},
  {   'name': 'MovieLens',
      'icon': 'https://movielens.org/favicon-32x32.png',
      'searchUrl': 'https://movielens.org/explore?q=%search_string%',
      'showByDefault': false},
  {   'name': 'MovieMistakes',
      'icon': 'https://www.moviemistakes.com/favicon.png',
      'searchUrl': 'https://www.moviemistakes.com/search.php?text=%search_string%',
      'showByDefault': false},
  {   'name': 'MoviePosterDB',
      'searchUrl': 'https://www.movieposterdb.com/search?category=title&q=%tt%',
      'showByDefault': false},
  {   'name': 'MRQE',
      'icon': 'https://www.mrqe.com/static/favicon.ico',
      'searchUrl': 'https://www.mrqe.com/search?utf8=✓&q=%search_string%',
      'showByDefault': false},
  {   'name': 'MyMovieRack',
      'icon': 'https://www.mymovierack.com/sys_images/icon/apple-icon-57x57.png',
      'searchUrl': 'https://www.mymovierack.com/title/topResultFor?q=%tt%',
      'showByDefault': false},
  {   'name': 'Netflix',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://www.netflix.com/search/%search_string%',
      'showByDefault': false},
  {   'name': 'OFDb (DE)',
      'searchUrl': 'https://ssl.ofdb.de/view.php?page=suchergebnis&SText=%tt%&Kat=IMDb',
      'showByDefault': false},
  {   'name': 'ratehouse',
      'icon': 'https://rate.house/favicon-32x32.png',
      'searchUrl': 'https://rate.house/search-all?query=%search_string%',
      'showByDefault': false},
  {   'name': 'Reelgood',
      'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAABiVBMVEUAxnz////+///+//79//78//76/v35/vz3/vv2/vvz/fry/fnv/fft/ffr/Pbq/PXp/PXm/PTl+/Pk+/Pj+/Li+/Hc+u/b+u/a+u7Z+u7Z+u3W+ezS+erO+OjJ+ObI9+XH9+XG9+XE9+PD9+PC9+PA9uK89uC79t+49d629d209dyw9Nqv9Nqu9Nqr9Nir89ii8tSc8dGb8dGV8c6V8M6U8M2T8M2R8MyP8MuO8MuK78mJ78iI78iH78iH7sd97cN77cJ27MB07L9w671u67xr67tq67pp6rln6rlh6bZf6bVe6bVY6LJV6LBT57BT569S569R565Q565P565P561N561M5qxL5qxK5qtF5alE5alB5ac+5aY95KU65KQ55KMz46Ex46Av4p8t4p4q4p0q4pwp4pwn4Zsk4Zok4Zki4Zkg4Jgf4Jgc4JYY35QX35QV35MU35IT35IS35IR3pEQ3pAP3pAO3o8J3Y0I3Y0H3YwG3YwF3YsE3YsD3IoC3IoB3IoB3IkA3ImkwFqMAAAAAXRSTlP+GuMHfQAAAXZJREFUeNrt1VdTwkAQB3AWqWLviqgoFuwNLFiwdwURe1fsDUEFW8J+cucuCDMwQ5J7cHzIPv2zs7/ZzNxNolIhY6kUqcj/IZ8irHK93MszSoDmM1YJOkeQSZosAHkznwyy5Gu+AKB6l0Eihgf1oO64ZpCIAbsajGNvJPJ2m63F4YlKlBjbrAQoXuIQuRwgVboqKnXmbRJ2zGS+7uRXQtak+KksI951qcm0ri+YkKDdE5cRdzadbTpFTEqwisreCjpY5qH3MDY3NZRLG5obMUnL5CZ3n3+g3QsD7a1IkNrue/J01DgitK20Oysuaw9JvuzUgIt2o4W0vSAmixa/EfGxXw8AA6FQ6Pm4VXiTg8zSMPpK0zCkVn40k/S1X8VTuhzPeCofiZQm66MSv2Cpsu0F2eREDOXJnsB5DQ0NnEzpQtwSlq7Jl7ywtOpdtkS/sHRavuQswkUIy5bohWSWJ+NLjbfSpM9JaoPmfZqdfuWfrUhF/rH8AWogkZaxzEKaAAAAAElFTkSuQmCC',
      'searchUrl': 'https://reelgood.com/search?q=%search_string%',
      'showByDefault': false},
  {   'name': 'Rotten Tomatoes',
      'searchUrl': 'https://www.rottentomatoes.com/search/?search=%search_string%'},
  {   'name': 'ScreenAnarchy',
      'searchUrl': 'https://screenanarchy.com/search.html?term=%search_string%',
      'showByDefault': false},
  {   'name': 'SensCritique (FR)',
      'searchUrl': 'https://www.senscritique.com/search?q=%search_string%',
      'showByDefault': false},
  {   'name': 'Simkl',
      'icon': 'https://eu.simkl.in/img_favicon/v2/favicon-32x32.png',
      'searchUrl': 'https://simkl.com/search/?q=%tt%',
      'showByDefault': false},
  {   'name': 'The Numbers',
      'searchUrl': 'https://www.the-numbers.com/custom-search?searchterm=%search_string%',
      'showByDefault': false},
  {   'name': 'TMDB',
      'icon': 'https://www.themoviedb.org/assets/2/apple-touch-icon-57ed4b3b0450fd5e9a0c20f34e814b82adaa1085c79bdde2f00ca8787b63d2c4.png',
      'searchUrl': 'https://www.themoviedb.org/search?query=%search_string%'},
  {   'name': 'TrailerAddict',
      'icon': 'https://cdn.traileraddict.com/icons/favicon-32x32.png',
      'searchUrl': 'https://www.traileraddict.com/search/%search_string%',
      'showByDefault': false},
  {   'name': 'Trakt',
      'icon': 'https://walter.trakt.tv/hotlink-ok/public/favicon.ico',
      'searchUrl': 'https://trakt.tv/search/imdb?query=%tt%',
      'showByDefault': false},
  {   'name': 'TVDB',
      'icon': 'https://www.thetvdb.com/images/icon.png',
      'searchUrl': 'https://www.thetvdb.com/search?query=%search_string%'},
  {   'name': 'TVmaze',
      'icon': 'https://static.tvmaze.com/images/favico/favicon-96x96.png',
      'searchUrl': 'https://www.tvmaze.com/search?q=%search_string%',
      'showByDefault': false},
  {   'name': 'Ulož',
      'searchUrl': 'https://ulozto.net/hledej?type=videos&q=%search_string_orig%',
      'showByDefault': false},
  {   'name': 'uNoGS',
      'searchUrl': 'https://unogs.com/?q=%search_string%',
      'showByDefault': false},
  {   'name': 'Wikipedia',
      'searchUrl': 'https://en.wikipedia.org/w/index.php?search=%search_string%&go=Go'},
  {   'name': 'WhatsOnMubi',
      'searchUrl': 'https://whatsonmubi.com/?q=%search_string%',
      'showByDefault': false},
  {   'name': 'YouTube',
      'icon': 'https://www.youtube.com/s/desktop/640aba68/img/favicon_32.png',
      'searchUrl': 'https://www.youtube.com/results?search_query="%search_string%"+%year%+trailer'}
];

var special_buttons = [
  {   'name': 'Radarr',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://radarr.video',
      'showByDefault': false},
  {   'name': 'Sonarr',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://sonarr.tv',
      'showByDefault': false},
  {   'name': 'Trakt-Watchlist',
      'icon': 'data:image/png;base64,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',
      'searchUrl': 'https://trakt.tv/oauth/authorize?client_id=325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2&redirect_uri=https://www.imdb.com/title/tt0052077/&response_type=code',
      'showByDefault': false}
];

var icon_sites = icon_sites_main.concat(special_buttons);

//==============================================================================
//    Replace Search URL parameters
//==============================================================================

async function replaceSearchUrlParams(site, movie_id, movie_title, movie_title_orig, movie_year, mPOSTsearch) {
  var search_url = ('mPOST' in site && !mPOSTsearch) ? site['mPOST'] : site['searchUrl'];
  // If an array, do a little bit of recursion
  if ($.isArray(search_url)) {
    var search_array = [];
    $.each(search_url, function(index, url) {
      search_array[index] = replaceSearchUrlParams(url, movie_id, movie_title, movie_title_orig, movie_year);
    });
    return search_array;
  }

  if (search_url.match("%tvdbid%")) {
    movie_id = await getTVDbID(movie_id);
  } else if (search_url.match("%tmdbid%")) {
    movie_id = await getTMDbID(movie_id);
  }

  var space_replace      = ('spaceEncode' in site) ? site['spaceEncode'] : '+';
  var search_string      = movie_title.trim().replace(/ +\(.*|&/g, '').replace(/\s+/g, space_replace);
  var search_string_orig = movie_title_orig.trim().replace(/ +\(.*|&/g, '').replace(/\s+/g, space_replace);
  var movie_year         = (onSearchPage) ? movie_year : document.title.replace(/^(.+) \((\D*|)(\d{4})(.*)$/gi, '$3');
  var s = search_url.replace(/%tt%/g, 'tt' + movie_id)
                    .replace(/%nott%/g, movie_id)
                    .replace(/%tvdbid%/g, movie_id)
                    .replace(/%tmdbid%/g, movie_id)
                    .replace(/%search_string%/g, search_string)
                    .replace(/%search_string_orig%/g, search_string_orig)
                    .replace(/%year%/g, movie_year);
  return s;
}

//==============================================================================
//    Convert IMDb ID to TVDb/TMDb ID
//==============================================================================

function getTVDbID(movie_id) {
  var tvdb_id;
  GM.xmlHttpRequest({
    method: "GET",
    url:    "https://thetvdb.com/api/GetSeriesByRemoteID.php?imdbid=tt" + movie_id,
    onload: function(response) {
      if (String(response.responseText).match("seriesid")) {
        response.responseXML = new DOMParser().parseFromString(response.responseText, "application/xml");
        const xmldata = response.responseXML;
        tvdb_id = xmldata.getElementsByTagName("seriesid")[0].childNodes[0].nodeValue;
      } else {
        tvdb_id = "00000000";
      }
    }
  });
  return new Promise(resolve => { setTimeout(() => { resolve(tvdb_id); }, 2200); });
}

function getTMDbID(movie_id) {
  var tmdb_id;
  GM.xmlHttpRequest({
    method: "GET",
    url:    "https://api.themoviedb.org/3/find/tt" + movie_id + "?api_key=d12b33d3f4fb8736dc06f22560c4f8d4&external_source=imdb_id",
    onload: function(response) {
      const result = JSON.parse(response.responseText);
      if (String(response.responseText).match('movie_results":\\[{')) {
        tmdb_id = result.movie_results[0].id;
      } else if (String(response.responseText).match('tv_results":\\[{')) {
        tmdb_id = result.tv_results[0].id;
      } else if (String(response.responseText).match('tv_episode_results":\\[{')) {
        tmdb_id = result.tv_episode_results[0].id;
      } else {
        tmdb_id = "00000000";
      }
    }
  });
  return new Promise(resolve => { setTimeout(() => { resolve(tmdb_id); }, 2200); });
}

//==============================================================================
//    Construct & return Title/List GM_config setting
//==============================================================================

function getPageSetting(key) {
  return (onSearchPage ? GM_config.get(key + '_search') : GM_config.get(key + '_movie'));
}

//==============================================================================
//    Get site's icon
//==============================================================================

function getFavicon(site, hide_on_err) {
  var favicon;
  if (typeof(hide_on_err) === 'undefined') { hide_on_err = false; }
  if ('icon' in site) {
    favicon = site['icon'];
  } else {
    var url = new URL(site['searchUrl']);
    favicon = url.origin + '/favicon.ico';
  }
  var iconsize = ('matchRegex' in site) ? GM_config.get('cfg_icons_size') : GM_config.get('cfg_icons_size') - 2;
  var title = (site['TV']) ? site['name'] + ' (TV)' : site['name'];
  var img = $('<img />').attr({'style': '-moz-opacity: 0.4; border: 0',
                               'width': iconsize,
                               'height': iconsize,
                               'src': favicon,
                               'title': title,
                               'alt': site['name']});
  if (hide_on_err) { img.attr('onerror', "this.style.display='none';"); }
  return img;
}

//==============================================================================
//    Add search links to an element
//==============================================================================

function addLink(elem, site_name, target, site, state, scout_tick, post_data) {
  // State should always be one of the values defined in valid_states
  var link = $('<a />').attr('href', target).attr('target', '_blank');
  if ($.inArray(state, valid_states) < 0) {
    console.log("Unknown state " + state);
  }
  // Link and add Form element for POST method.
  if ('mPOST' in site) {
    var form_name = (site['TV']) ? site['name'] + '-TV-form' + scout_tick : site['name'] + '-form' + scout_tick;
    var placebo_url = new URL(target).origin;
    link = $('<a />').attr('href', placebo_url).attr('onclick', "$('#" + form_name + "').submit(); return false;").attr('target', '_blank');

    var data = (post_data.match('{')) ? post_data : '{"' + post_data.replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}';
    var addform = $('<form></form>');
        addform.attr('id', form_name);
        addform.attr('action', target);
        addform.attr('method', 'post');
        addform.attr('style', 'display: none;');
        addform.attr('target', '_blank');

    if (post_data.match('},{')) {
      const dataArray = (new Function("return [" +data+ "];")());
      dataArray.forEach(function (item, index) {
        let addinput = $("<input>");
            addinput.attr('type', 'text');
            addinput.attr('name', item.key);
            addinput.attr('value', item.value);
        addform.append(addinput);
        $('body').append(addform);
      });
    } else {
      data = JSON.parse(data);
      for (const name in data) {
        let addinput = $("<input>");
            addinput.attr('type', 'text');
            addinput.attr('name', name);
            addinput.attr('value', data[name]);
        addform.append(addinput);
        $('body').append(addform);
     }
    }
  }
  // Icon/Text appearance.
  if (getPageSetting('use_mod_icons')) {
    var icon = getFavicon(site);
    (!GM_config.get('one_line') && !onSearchPage) ? icon.css({'border-width': '0px', 'border-style': 'solid', 'border-radius': '2px', 'margin': '1px 0px 2px'})
                                                  : icon.css({'border-width': '3px', 'border-style': 'solid', 'border-radius': '2px', 'margin': '1px 0px 2px'});
    if (state == 'error' || state == 'logged_out') {
      (getPageSetting('highlight_sites').split(',').includes(site['name'])) ? icon.css('border-color', 'rgb(255,0,0)')
                                                                            : icon.css('border-color', 'rgb(180,0,0)');
    } else if (state == 'missing') {
      (getPageSetting('highlight_sites').split(',').includes(site['name'])) ? icon.css('border-color', 'rgb(255,255,0)')
                                                                            : icon.css('border-color', 'rgb(230,200,100)');
    } else if (state == 'found') {
      (getPageSetting('highlight_sites').split(',').includes(site['name'])) ? icon.css('border-color', 'rgb(0,220,0)')
                                                                            : icon.css('border-color', 'rgb(0,130,0)');
        if ((site['name']).match('-Req')) icon.css('border-color', 'rgb(50,50,200)');
    }
    link.append(icon);
  } else {
    site_name = (getPageSetting('highlight_sites').split(',').includes(site['name'])) ? site_name.bold() : site_name;
    if (state == 'missing' || state == 'error' || state == 'logged_out') {
      link.append($('<s />').append(site_name));
    } else {
      link.append(site_name);
    }
    if (state == 'error' || state == 'logged_out') {
      link.css('color', 'red');
    }
  }
  // Create/find elements for Search/List pages.
  if (onSearchPage) {
    var result_box = $(elem).find('td.result_box');
    if (result_box.length == 0) {
      $(elem).append($('<td />').addClass('result_box'));
      $.each(valid_states, function(i, name) {
       $(elem).find('td.result_box').append("<span id='imdbscout_" + name + scout_tick + "'>"+'</span>');
      });
    }
  }
  if (onSearchPage && GM_config.get('load_third_bar_search')) {
    var result_box3 = $(elem).find('xd.result_box_3rd');
    if (result_box3.length == 0) {
      $(elem).append($('<xd />').addClass('result_box_3rd'));
      $.each(valid_states, function(i, name) {
       $(elem).find('xd.result_box_3rd').append("<span id='imdbscout3_" + name + scout_tick + "'>"+'</span>');
      });
    }
  }
  // Add links to IMDb page.
  var in_element_two = ('inSecondSearchBar' in site) ? site['inSecondSearchBar'] : false;
  var in_element_three = ('inThirdSearchBar' in site) ? site['inThirdSearchBar'] : false;
  if (onSearchPage && in_element_two || in_element_three && !getPageSetting('load_third_bar') || in_element_two && in_element_three) {
    return;
  } else if (!onSearchPage && in_element_two) {
    $('#imdbscoutsecondbar_' + state).append(link).append(' ');
  } else if (!onSearchPage && in_element_three) {
    $('#imdbscoutthirdbar_' + state).append(link).append(' ');
  } else if (!onSearchPage) {
    $('#imdbscout_' + state).append(link).append(' ');
  } else if (!in_element_three) {
    $('#imdbscout_' + state + scout_tick).append(link);
  } else {
    $('#imdbscout3_' + state + scout_tick).append(link);
  }

  // Call to the sorting launcher.
  if (!onSearchPage && !in_element_two && !in_element_three) {
    iconSorterLauncher(site);
  }
}

//==============================================================================
//    Determine whether a site should be displayed
//==============================================================================

async function maybeAddLink(elem, site_name, search_url, site, scout_tick, movie_id, movie_title, movie_title_orig, movie_year) {
  // If the search URL is an array, recurse briefly on the elements.
  if ($.isArray(search_url)) {
    $.each(search_url, function(index, url) {
      maybeAddLink(elem, site_name + '_' + (index + 1).toString(), url, site);
    });
    return;
  }
  // Don't check the second/third bar sites if a 2nd/3rd bar is disabled in the Settings.
  var in_element_two = ('inSecondSearchBar' in site) ? site['inSecondSearchBar'] : false;
  var in_element_three = ('inThirdSearchBar' in site) ? site['inThirdSearchBar'] : false;
  if (in_element_two && !GM_config.get('load_second_bar') || in_element_three && !getPageSetting('load_third_bar') || in_element_two && in_element_three) {
    return;
  }
  // Don't check the second bar sites on a Search/List/Watchlist page.
  if (in_element_two && onSearchPage) {
    return;
  }
  // Connection rate limiter per domain.
  var set_rate = ('rateLimit' in site) ? site['rateLimit'] : 200;
  var rate     = (!onSearchPage) ? set_rate : (set_rate > 1000) ? set_rate : set_rate * 4;
  var domain   = search_url.split('/')[2];
  var now      = (new Date())*1;
  var lastLoaded = window.localStorage[domain+'_lastLoaded'];
  if (!lastLoaded) {
    lastLoaded = now - 50000;
  } else {
    lastLoaded = parseInt(lastLoaded);
  }
  if (now - lastLoaded < rate) {
    window.setTimeout(maybeAddLink.bind(undefined, elem, site['name'], search_url, site, scout_tick, movie_id, movie_title, movie_title_orig, movie_year), rate);
    return;
  } else {
    window.localStorage[domain+'_lastLoaded'] = (new Date())*1;
  }

  var success_match = ('positiveMatch' in site) ? site['positiveMatch'] : false;
  var target = search_url;
  if ('goToUrl' in site) {
    target = await replaceSearchUrlParams({'searchUrl': site['goToUrl'], 'spaceEncode': ('spaceEncode' in site) ? site['spaceEncode'] : '+'}, movie_id, movie_title, movie_title_orig, movie_year);
  }
  // Check tmdb/tvdb conversion.
  if (search_url.indexOf('=00000000') > -1 || search_url.indexOf('=undefined') > -1) {
    addLink(elem, site_name, target, site, 'error', scout_tick);
    return;
  }
  // Check for results with POST method.
  if ('mPOST' in site) {
    const post_data = await replaceSearchUrlParams(site, movie_id, movie_title, movie_title_orig, movie_year);
    GM.xmlHttpRequest({
      method: 'POST',
      url: search_url,
      data: post_data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      onload: function(response) {
      //console.log("GET Response: " + response.responseText);
      //console.log("GET Response Status: " + response.status);
      //console.log("GET Response Headers: " + response.responseHeaders);
        if (response.responseHeaders.indexOf('efresh: 0; url') > -1 || response.status > 499 || (response.status > 399 && !site.ignore404)) {
          addLink(elem, site_name, target, site, 'logged_out', scout_tick, post_data);
        } else if (site['positiveMatch'] && site['loggedOutRegex'] && String(response.responseText).match(site['loggedOutRegex'])) {
          addLink(elem, site_name, target, site, 'logged_out', scout_tick, post_data);
        } else if (String(response.responseText).match(site['matchRegex']) ? !(success_match) : success_match) {
            if (getPageSetting('highlight_missing').split(',').includes(site['name'])) {
              if (elem.style) {
                elem.parentNode.style.background = 'rgba(255,104,104,0.7)';
              } else {
                document.querySelector('#imdbscout_missing').style.background = 'rgba(255,104,104,0.7)';
              }
            }
            if (!getPageSetting('hide_missing')) {
              addLink(elem, site_name, target, site, 'missing', scout_tick, post_data);
            }
        } else if (site['loggedOutRegex'] && String(response.responseText).match(site['loggedOutRegex'])) {
          addLink(elem, site_name, target, site, 'logged_out', scout_tick, post_data);
        } else {
          addLink(elem, site_name, target, site, 'found', scout_tick, post_data);
        }
      },
      onerror: function() {
        addLink(elem, site_name, target, site, 'error', scout_tick, post_data);
      },
      onabort: function() {
        addLink(elem, site_name, target, site, 'error', scout_tick, post_data);
      }
    });
    return;
  }
  // Check for results with GET method.
  let reqHeader = {};
  if (site['name'] == "Milkie") {
    reqHeader = {
      "Host": "milkie.cc",
      "Authorization": GM_config.get("milkie_authToken")
    };
  }
  GM.xmlHttpRequest({
    method: 'GET',
    headers: reqHeader,
    url: search_url,
    onload: function(response) {
      //console.log("GET Response: " + response.responseText);
      //console.log("GET Response Status: " + response.status);
      //console.log("GET Response Headers: " + response.responseHeaders);
        if (response.responseHeaders.indexOf('efresh: 0; url') > -1 || response.status > 499 || (response.status > 399 && !site.ignore404)) {
        addLink(elem, site_name, target, site, 'logged_out', scout_tick);
      } else if (site['positiveMatch'] && site['loggedOutRegex'] && String(response.responseText).match(site['loggedOutRegex'])) {
        addLink(elem, site_name, target, site, 'logged_out', scout_tick);
      } else if (String(response.responseText).match(site['matchRegex']) ? !(success_match) : success_match) {
          if (getPageSetting('highlight_missing').split(',').includes(site['name'])) {
            if (elem.style) {
              elem.parentNode.style.background = 'rgba(255,104,104,0.7)';
            } else {
              document.querySelector('#imdbscout_missing').style.background = 'rgba(255,104,104,0.7)';
            }
          }
          if (!getPageSetting('hide_missing')) {
            addLink(elem, site_name, target, site, 'missing', scout_tick);
          }
      } else if (site['loggedOutRegex'] && String(response.responseText).match(site['loggedOutRegex'])) {
        addLink(elem, site_name, target, site, 'logged_out', scout_tick);
      } else {
        addLink(elem, site_name, target, site, 'found', scout_tick);
      }
    },
    onerror: function() {
      addLink(elem, site_name, target, site, 'error', scout_tick);
    },
    onabort: function() {
      addLink(elem, site_name, target, site, 'error', scout_tick);
    }
  });
}

//==============================================================================
//    Perform code to create fields and display sites
//==============================================================================

function perform(elem, movie_id, movie_title, movie_title_orig, is_tv, is_movie, movie_year, scout_tick) {
  var site_shown = false;
  $.each(sites, async function(index, site) {
    if (site['show']) {
      site_shown = true;
      // For TV Series show only TV links. TV Special, TV Movie, Episode & Documentary are treated as TV and Movie.
      if ((Boolean(site['TV']) == is_tv || Boolean(site['both'])) || (!is_tv && !is_movie) || getPageSetting('ignore_type')) {
        var searchUrl = await replaceSearchUrlParams(site, movie_id, movie_title, movie_title_orig, movie_year, true);
        if ('goToUrl' in site && getPageSetting('call_http_mod')) {
          maybeAddLink(elem, site['name'], searchUrl, site, scout_tick, movie_id, movie_title, movie_title_orig, movie_year);
        }
        if ('goToUrl' in site && !getPageSetting('call_http_mod')) {
          searchUrl = await replaceSearchUrlParams({'searchUrl': site['goToUrl'], 'spaceEncode': ('spaceEncode' in site) ? site['spaceEncode'] : '+'}, movie_id, movie_title, movie_title_orig, movie_year);
          addLink(elem, site['name'], searchUrl, site, 'found', scout_tick);
        }
        if (!('goToUrl' in site) && getPageSetting('call_http_mod')) {
          maybeAddLink(elem, site['name'], searchUrl, site, scout_tick, movie_id, movie_title, movie_title_orig, movie_year);
        }
        if (!('goToUrl' in site) && !getPageSetting('call_http_mod')){
          addLink(elem, site['name'], searchUrl, site, 'found', scout_tick);
        }
      }
    }
  });
  if (!site_shown) {
    $(elem).append('<pre>No sites enabled!\nFor Settings look at Monkey icon.\nFor now you can press this temporary button:');
    var p = $('<p />').attr('id', 'imdbscout_settings_button');
        p.append($('<button>Load Settings</button>').css({'cursor':'pointer', 'background-color':'#F5C518', 'color':'blue', 'font-weight':'bold'}).click(function() {
          GM_config.open();
          $('#imdbscout_settings_button').remove();
    }));
    $(elem).append(p);
  }
}

//==============================================================================
//    'Load' button code
//==============================================================================

// Runs when "Load on Start?" is disabled.
function displayButton() {
  var p = $('<p />').attr('id', 'imdbscout_button');
  p.append($('<button>Load IMDb Scout Mod</button>').css({'background-color':'#F5C518', 'color':'blue', 'font-weight':'bold'}).click(function() {
    $('#imdbscout_button').remove();
    if (onSearchPage) {
      performSearch();
    } else {
      performPage();
    }
  }));
  if (onSearchPage) {
    $('#sidebar').prepend(p);
  } else if ($('[class^=SubNav__SubNavContainer]').length) {
    $('[class^=SubNav__SubNavContainer]').append(p);
  // oldlayout
  } else if ($('.button_panel.navigation_panel').length) {
    $('.button_panel.navigation_panel').after(p);
  } else if ($('.title_block').length) {
    $('.title_block').after(p);
  // reference
  } else if ($('.titlereference-header').length) {
    $('.titlereference-header').append(p);
  }
}

//==============================================================================
//    Icons at top bar on Title page
//==============================================================================

// Unlike the other URLs, they aren't checked to see if the movie exists.
function addIconBar(movie_id, movie_title, movie_title_orig) {
  var iconbar;
  if ($('[class^=TitleBlock__TitleContainer]').length) {
    iconbar = getIconsLinkArea();
  // oldlayout
  } else if ($('h1.header:first').length || $('.title_wrapper h1').length) {
    iconbar = getIconsLinkArea();
  // reference
  } else if ($('h3[itemprop="name"]').length) {
    iconbar = $('h3[itemprop="name"]').append($('<br/>'));
  }

  $.each(icon_sites, async function(index, site) {
    if (site['show']) {
      var search_url = ('mPOST' in site) ? site['searchUrl'] : await replaceSearchUrlParams(site, movie_id, movie_title, movie_title_orig);
      var image = getFavicon(site);
      var html = $('<span />').append("&nbsp;").attr('style', 'font-size: 11px;').append($('<a />').attr('href', search_url).attr('target', '_blank').addClass('iconbar_icon').append(image));
      // Link and add Form element for POST method.
      if ('mPOST' in site) {
        var form_name = site['name'] + '-iconform';
        var placebo_url = new URL(site['searchUrl']).origin;
        html = $('<span />').append("&nbsp;").attr('style', 'font-size: 11px;').append($('<a />').attr('href', placebo_url).attr('onclick', "$('#" + form_name + "').submit(); return false;").attr('target', '_blank').addClass('iconbar_icon').append(image));

        var post_data = await replaceSearchUrlParams(site, movie_id, movie_title, movie_title_orig);
        var data = (post_data.match('{')) ? post_data : '{"' + post_data.replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}';
        var addform = $('<form></form>');
            addform.attr('id', form_name);
            addform.attr('action', search_url);
            addform.attr('method', 'post');
            addform.attr('style', 'display: none;');
            addform.attr('target', '_blank');

        if (post_data.match('},{')) {
          const dataArray = (new Function("return [" +data+ "];")());
          dataArray.forEach(function (item, index) {
            let addinput = $("<input>");
                addinput.attr('type', 'text');
                addinput.attr('name', item.key);
                addinput.attr('value', item.value);
            addform.append(addinput);
            $('body').append(addform);
          });
        } else {
          data = JSON.parse(data);
          for (const name in data) {
            let addinput = $("<input>");
                addinput.attr('type', 'text');
                addinput.attr('name', name);
                addinput.attr('value', data[name]);
            addform.append(addinput);
            $('body').append(addform);
         }
        }
      }
      iconbar.append(html).append();
      // Call to Radarr funcs.
      if (site['name'] == "Radarr"){
      get_radarr_movies(movie_id);
      }
      // Call to Sonarr funcs.
      if (site['name'] == "Sonarr"){
      get_sonarr_tvseries(movie_id);
      }
      // Call to Trakt-Watchlist funcs.
      if (site['name'] == "Trakt-Watchlist"){
      start_trakt(movie_id, movie_title);
      }
    }
  });
  // If we have access to the openInTab function, add an Open All feature.
  if (GM.openInTab) {
    // Wrapped in timeout because the button lands in front of icons (async function above).
    setTimeout(() => {
      var aopenall = $('<a />').text('Open All').prepend("&nbsp;").attr('href', 'javascript:;').attr('style', 'font-weight:bold;font-size:11px;font-family: Calibri, Verdana, Arial, Helvetica, sans-serif;');
          aopenall.click(function() {
            $('.iconbar_icon').each(function() {
            GM.openInTab($(this).attr('href'));
          });
      });
      iconbar.append(aopenall);
    }, 300);
  }
}

// Create elements for the icons bar
function getIconsLinkArea() {
  // If it already exists, just return it
  if ($('#imdbscout_iconsheader').length) {
    return $('#imdbscout_iconsheader');
  }
  var p = $('<p />').attr('id', 'imdbscout_iconsheader').css({
    'padding': '0px 0px',
    'margin-left': '0px',
    'margin-right': '0px',
    'margin-top': '0px',
    'margin-bottom': '0px',
    'overflow': 'hidden',
  });
  if ($('[class^=TitleBlock__TitleContainer]').length) {
    $('[class^=TitleBlock__TitleContainer]').append(p);
  // oldlayout
  } else if ($('h1.header:first').length) {
    $('h1.header:first').append(p);
  // oldlayout
  } else if ($('.title_wrapper h1').length) {
    $('.title_wrapper h1').append(p);
  }
  var styles = '#imdbscout_iconsheader {line-height: 16px;} ';
  // oldlayout
  if ($('h1.header:first').length || $('.title_wrapper h1').length) {
    styles = '#imdbscout_iconsheader {line-height: 16px; width: 575px;} ';
  }
  GM.addStyle(styles);
  return $('#imdbscout_iconsheader');
}

//==============================================================================
//    Search/List/Watchlist page code
//==============================================================================

function performSearch() {
  //Add css for the new table cells we're going to add
  var styles  = '.result_box {width: 975px} ';
      styles += '.result_box a { margin-right: 5px; color: #444;} ';
      styles += '.result_box a:visited { color: #551A8B; } ';
      styles += '#content-2-wide #main, #content-2-wide ';
      styles += '.maindetails_center {margin-left: 5px; width: 1001px;} ';
  GM.addStyle(styles);

  if (getPageSetting('load_third_bar')) {
    var styles3  = '.result_box_3rd {width: 975px} ';
        styles3 += '.result_box_3rd a { margin-right: 5px; color: #444;} ';
        styles3 += '.result_box_3rd a:visited { color: #551A8B; } ';
        styles3 += '#content-2-wide #main, #content-2-wide ';
        styles3 += '.maindetails_center {margin-left: 5px; width: 1001px;} ';
    GM.addStyle(styles3);
  }
  var showsites = public_sites.concat(private_sites, usenet_sites).reduce(function (n, site) {
      return n + (site['show'] == true); }, 0);

  var search_page = (Boolean(location.href.match('/search/'))) ? true : false;
  if($('.lister-list').children().length !== 0) {
    $('.lister-list').children().each(function() {
      var elem     = (search_page) ? $(this).find('.lister-item-content') : $(this);
      var link     = $(this).find('.lister-item-image>a');
      var movie_id = link.attr('href').match(/tt([0-9]*)\/?.*/)[1];

      var scout_tick = window.localStorage['_imdbscoutmod_tick'];
      if (!scout_tick) {
        scout_tick = 1;
        window.localStorage['_imdbscoutmod_tick'] = scout_tick;
      }

      performSearchSecondPart(elem, link, movie_id, showsites, scout_tick);
      scout_tick = parseInt(scout_tick) + 1;
      window.localStorage['_imdbscoutmod_tick'] = scout_tick;
    });
  }
}

function performSearchSecondPart(elem, link, movie_id, showsites, scout_tick) {
  // Connection rate limiter for IMDb.
  var rate;
  if (!(GM_config.get('call_http_mod_search'))) {
    rate =  400;
  } else if (showsites > 99) {
    rate = 6000;
  } else if (showsites > 80) {
    rate = 5000;
  } else if (showsites > 60) {
    rate = 3500;
  } else if (showsites > 40) {
    rate = 2500;
  } else if (showsites > 20) {
    rate = 2000;
  } else if (showsites > 10) {
    rate = 1500;
  } else {
    rate = 800;
  }
  var domain = "https://www.imdb.com";
  var now    = (new Date())*1;
  var lastLoaded = window.localStorage[domain+'_lastLoaded'];
  if (!lastLoaded) {
    lastLoaded = now - 8000;
  } else {
    lastLoaded = parseInt(lastLoaded);
  }
  if (now - lastLoaded < rate) {
    window.setTimeout(performSearchSecondPart.bind(undefined, elem, link, movie_id, showsites, scout_tick), rate);
    return;
  } else {
    window.localStorage[domain+'_lastLoaded'] = (new Date())*1;
  }

  GM.xmlHttpRequest({
      method: "GET",
      url:    "https://www.imdb.com" + link.attr('href'),
      onload: function(response) {
        var parser = new DOMParser();
        var result = parser.parseFromString(response.responseText, "text/html");

        var is_tv    = Boolean($(result).find('title').text().match('TV Series')) || Boolean($(result).find('.tv-extra').length);
        var is_movie = (Boolean($(result).find('.subtext').text().match('TV Special'))) ? false : Boolean($(result).find('title').text().match(/.*? \(([0-9]*)\)/));
        if (Boolean($(result).find('.subtext').text().match('Documentary'))) {
          is_tv    = false;
          is_movie = false;
        }
        var movie_year       = result.title.replace(/^(.+) \((\D*|)(\d{4})(.*)$/gi, '$3');
        var movie_title      = $(result).find('.title_wrapper>h1').clone().children().remove().end().text();
        var movie_title_orig = $(result).find('.originalTitle').clone().children().remove().end().text();
        if (movie_title_orig === "") {
            movie_title_orig = movie_title;
        }
        perform(elem, movie_id, movie_title, movie_title_orig, is_tv, is_movie, movie_year, scout_tick);
    }
  });
}

//==============================================================================
//    Title page code
//==============================================================================

function performPage() {
  var movie_title = $('[class^=TitleHeader__TitleText]').text().trim();
  // reference
  if (movie_title === "") {
    movie_title = $('h3[itemprop="name"]').text().trim();
    movie_title = movie_title.substring(movie_title.lastIndexOf("\n") + 1, -1 ).trim();
    // oldLayout
    if (movie_title === "") {
      movie_title = $('.title_wrapper>h1').clone().children().remove().end().text();
    }
  }
  var movie_title_orig = $('[class^=OriginalTitle__OriginalTitleText]').text().trim().replace("Original title: ", "");
  // reference
  if (movie_title_orig === "" && $('h3[itemprop="name"]').length) {
    movie_title_orig = $.trim($($('h3[itemprop="name"]')[0].nextSibling).text());
    // oldLayout
  } else if (movie_title_orig === "" && $('.originalTitle').length) {
    movie_title_orig = $('.originalTitle').clone().children().remove().end().text().trim();
  }
  // not found
  if (movie_title_orig === "") {
    movie_title_orig = movie_title;
  }

  var movie_id = document.URL.match(/\/tt([0-9]+)\//)[1].trim('tt');
  var is_tv    = Boolean($('title').text().match('TV Series'));
  // newLayout || reference || oldLayout : check if 'title' has just a year in brackets, eg. "(2009)"
  var is_movie = (Boolean($('[class^=TitleBlock__TitleMetaDataContainer]').text().match('TV')) || Boolean($('li.ipl-inline-list__item').text().match('TV Special')) || Boolean($('.subtext').text().match('TV Special'))) ? false : Boolean($('title').text().match(/.*? \(([0-9]*)\)/));
  // newLayout || reference || oldLayout
  if (Boolean($('[class^=GenresAndPlot__Genre]').text().match('Documentary')) || Boolean($('li.ipl-inline-list__item').text().match('Documentary')) || Boolean($('.subtext').text().match('Documentary'))) {
    is_tv    = false;
    is_movie = false;
  }

  // Call to iconSorterCount() for the icons/sites sorting.
  iconSorterCount(is_tv, is_movie);

  // Create areas to put links in
  // oldlayout
  if ($('.button_panel.navigation_panel').length || $('.title_block').length) {
  if (GM_config.get('load_second_bar') && !GM_config.get('load_third_bar_movie')) {
    getLinkAreaSecond();
  } else if (!GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie')) {
    getLinkAreaThird();
  } else if (GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie') && !GM_config.get('switch_bars')) {
    getLinkAreaThird();
    getLinkAreaSecond();
  } else if (GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie') && GM_config.get('switch_bars')) {
    getLinkAreaSecond();
    getLinkAreaThird();
  }
  perform(getLinkArea(), movie_id, movie_title, movie_title_orig, is_tv, is_movie);
  addIconBar(movie_id, movie_title, movie_title_orig);

  } else {
  addIconBar(movie_id, movie_title, movie_title_orig);
  perform(getLinkArea(), movie_id, movie_title, movie_title_orig, is_tv, is_movie);
  if (GM_config.get('load_second_bar') && !GM_config.get('load_third_bar_movie')) {
    getLinkAreaSecond();
  } else if (!GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie')) {
    getLinkAreaThird();
  } else if (GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie') && !GM_config.get('switch_bars')) {
    getLinkAreaSecond();
    getLinkAreaThird();
  } else if (GM_config.get('load_second_bar') && GM_config.get('load_third_bar_movie') && GM_config.get('switch_bars')) {
    getLinkAreaThird();
    getLinkAreaSecond();
  }
  }
}

//==============================================================================
//    Create elements for the 1st search bar on Title page
//==============================================================================

function getLinkArea() {
  // If it already exists, just return it
  if ($('#imdbscout_header').length) {
    return $('#imdbscout_header');
  }
  var font_weight = (GM_config.get('highlight_sites_movie').length == 0) ? 'bold' : 'normal';
  var p = $('<p />').append(GM_config.get('imdbscoutmod_header_text')).attr('id', 'imdbscout_header').css({
    'padding': '4px 10px',
    'font-weight': font_weight,
    'background-color': '#333333',
    'margin-top': '0px',
    'margin-bottom': '0px',
    'overflow': 'hidden',
    'color': '#EEEEEE'
  });

  $.each(valid_states, function(i, name) {
    if (GM_config.get('one_line')) {
      p.append($('<span />').attr('id', 'imdbscout_' + name));
    } else {
      var title = $('<span>' + name.replace('_', ' ') + ': </span>').css({
        'textTransform': 'capitalize',
        'min-width': '100px',
        'display': 'inline-block'
      });
      p.append($('<div />').attr('id', 'imdbscout_' + name).append(title));
    }
  });

  if ($('[class^=SubNav__SubNavContainer]').length) {
    $('[class^=SubNav__SubNavContainer]').append(p);
  // oldlayout
  } else if ($('.button_panel.navigation_panel').length) {
    $('.button_panel.navigation_panel').after(p);
  } else if ($('.title_block').length) {
    $('.title_block').after(p);
  // reference
  } else if ($('.titlereference-header').length) {
    $('.titlereference-header').append(p);
  }
  return $('#imdbscout_header');
}

//==============================================================================
//    Create elements for the 2nd search bar on Title page
//==============================================================================

function getLinkAreaSecond() {
  // If it already exists, just return it
  if ($('#imdbscoutsecondbar_header').length) {
    return $('#imdbscoutsecondbar_header');
  }
  var font_weight = (GM_config.get('highlight_sites_movie').length == 0) ? 'bold' : 'normal';
  var p = $('<p />').append(GM_config.get('imdbscoutsecondbar_header_text')).attr('id', 'imdbscoutsecondbar_header').css({
    'padding': '4px 10px',
    'font-weight': font_weight,
    'background-color': '#333333',
    'margin-top': '0px',
    'margin-bottom': '0px',
    'overflow': 'hidden',
    'color': '#EEEEEE'
  });

  $.each(valid_states, function(i, name) {
    if (GM_config.get('one_line')) {
      p.append($('<span />').attr('id', 'imdbscoutsecondbar_' + name));
    } else {
      var title = $('<span>' + name.replace('_', ' ') + ': </span>').css({
        'textTransform': 'capitalize',
        'min-width': '100px',
        'display': 'inline-block'
      });
      p.append($('<div />').attr('id', 'imdbscoutsecondbar_' + name).append(title));
    }
  });
  if ($('[class^=SubNav__SubNavContainer]').length) {
    $('[class^=SubNav__SubNavContainer]').append(p);
  // oldlayout
  } else if ($('.button_panel.navigation_panel').length) {
    $('.button_panel.navigation_panel').after(p);
  } else if ($('.title_block').length) {
    $('.title_block').after(p);
  // reference
  } else if ($('.titlereference-header').length) {
    $('.titlereference-header').append(p);
  }
  return $('#imdbscoutsecondbar_header');
}

//==============================================================================
//     Create elements for the 3rd search bar on Title page
//==============================================================================

function getLinkAreaThird() {
  // If it already exists, just return it
  if ($('#imdbscoutthirdbar_header').length) {
    return $('#imdbscoutthirdbar_header');
  }
  var font_weight = (GM_config.get('highlight_sites_movie').length == 0) ? 'bold' : 'normal';
  var p = $('<p />').append(GM_config.get('imdbscoutthirdbar_header_text')).attr('id', 'imdbscoutthirdbar_header').css({
    'padding': '4px 10px',
    'font-weight': font_weight,
    'background-color': '#333333',
    'margin-top': '0px',
    'margin-bottom': '0px',
    'overflow': 'hidden',
    'color': '#EEEEEE'
  });

  $.each(valid_states, function(i, name) {
    if (GM_config.get('one_line')) {
      p.append($('<span />').attr('id', 'imdbscoutthirdbar_' + name));
    } else {
      var title = $('<span>' + name.replace('_', ' ') + ': </span>').css({
        'textTransform': 'capitalize',
        'min-width': '100px',
        'display': 'inline-block'
      });
      p.append($('<div />').attr('id', 'imdbscoutthirdbar_' + name).append(title));
    }
  });
  if ($('[class^=SubNav__SubNavContainer]').length) {
    $('[class^=SubNav__SubNavContainer]').append(p);
  // oldlayout
  } else if ($('.button_panel.navigation_panel').length) {
    $('.button_panel.navigation_panel').after(p);
  } else if ($('.title_block').length) {
    $('.title_block').after(p);
  // reference
  } else if ($('.titlereference-header').length) {
    $('.titlereference-header').append(p);
  }
  return $('#imdbscoutthirdbar_header');
}

//==============================================================================
//    Icons/sites sorting
//==============================================================================

// Count selected sites for the sorting launcher (showSitezFirstBar).
function iconSorterCount(is_tv, is_movie) {
  let sitestosort = public_sites.concat(private_sites, usenet_sites);
  if (!is_tv && !is_movie || getPageSetting('ignore_type')) {
    showSitezFirstBar = sitestosort.reduce(function (n, site) {
      return n + (site['show'] == true); }, 0);
  } else if (is_tv && !getPageSetting('ignore_type')) {
    const showtvsitez = public_sites.concat(private_sites, usenet_sites).reduce(function (n, site) {
      return n + (site['TV'] == true && site['show'] == true); }, 0);
    const showbothsitez = public_sites.concat(private_sites, usenet_sites).reduce(function (n, site) {
      return n + (site['both'] == true && site['show'] == true); }, 0);
    showSitezFirstBar = showtvsitez + showbothsitez;
  } else if (is_movie && !getPageSetting('ignore_type')) {
    const showallsitez = sitestosort.reduce(function (n, site) {
      return n + (site['show'] == true); }, 0);
    const showtvsitez = public_sites.concat(private_sites, usenet_sites).reduce(function (n, site) {
      return n + (site['TV'] == true && site['show'] == true); }, 0);
    showSitezFirstBar = showallsitez - showtvsitez;
  }
}

// Sorting launcher.
function iconSorterLauncher(site) {
  showSitezFirstBar = showSitezFirstBar - 1;

  if (GM_config.get("sortReqOnNewLine") && showSitezFirstBar == 0) {
    sortReqOnNewLineTemp = true;
  }
  //console.log('Sites left: ' + showSitezFirstBar + ", Added: " + site['name']);
  if (showSitezFirstBar < 4) {
    iconSorterFound();
    iconSorterMissing();
    //console.log('SORTING!');
  }
}

// Sorting of the found sites.
function iconSorterFound() {
  const imdbscout_found = document.querySelector("#imdbscout_found");

  const sorta = (list) => { // sort alphabetically
    return list.sort((a, b) => {
      if (GM_config.get("use_mod_icons_movie")) {
        if (a.firstChild.getAttribute("alt").toLowerCase() < b.firstChild.getAttribute("alt").toLowerCase()) {
          return -1;
        } else if (a.firstChild.getAttribute("alt").toLowerCase() > b.firstChild.getAttribute("alt").toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a.textContent.toLowerCase() < b.textContent.toLowerCase()) {
          return -1;
        } else if (a.textContent.toLowerCase() > b.textContent.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  };

  let highlighted = [], requests = [], others = [];

  let children = imdbscout_found.children;
  if (!GM_config.get('one_line')) {
    let [removed, ...children2] = children;
    children = children2;
  }
  for (const child of children) {
    if (GM_config.get("use_mod_icons_movie")) {
      if (child.firstChild.getAttribute("alt").includes("-Req")) {
        requests.push(child);
      } else {
        child.children[0].style.border.includes("solid rgb(0, 220, 0)") ? highlighted.push(child) : others.push(child);
      }
    } else {
      if (child.textContent.includes("-Req")) {
        requests.push(child);
      } else {
        child.querySelector("b") ? highlighted.push(child) : others.push(child);
      }
    }
  }

  let sorted;
  if (GM_config.get("highlight_sites_movie").includes(",")) {
    const highlighted_sites = GM_config.get("highlight_sites_movie").split(",");
    let hl_temp = [];
    for (const hl of highlighted_sites) {
      for (const hl_node of highlighted) {
        if (hl === (!GM_config.get("use_mod_icons_movie") ? hl_node.textContent : hl_node.children[0].getAttribute("alt"))) {
          hl_temp.push(hl_node);
        }
      }
    }
    sorted = [...hl_temp, ...sorta(others)];
  } else {
    sorted = [...sorta(highlighted), ...sorta(others)];
  }

  for (const node of sorted) {
    node.remove();
    imdbscout_found.insertAdjacentHTML("beforeend", node.outerHTML + " ");
  }

  sortReqOnNewLineTemp && requests.length > 0 ? imdbscout_found.insertAdjacentHTML("beforeend", "</br>") : false;
  for (const node of requests) {
    node.remove();
    imdbscout_found.insertAdjacentHTML("beforeend", node.outerHTML + " ");
  }
  sortReqOnNewLineTemp && requests.length > 0 ? imdbscout_found.insertAdjacentHTML("beforeend", "</br>") : false;
}

// Sorting of the missing sites.
function iconSorterMissing() {
  if (GM_config.get("hide_missing_movie") || !GM_config.get("call_http_mod_movie")) {
  return;
  }
  const imdbscout_missing = document.querySelector("#imdbscout_missing");

  const sorta = (list) => {
    return list.sort((a, b) => { // sort alphabetically
      if (GM_config.get("use_mod_icons_movie")) {
        if (a.firstChild.getAttribute("alt").toLowerCase() < b.firstChild.getAttribute("alt").toLowerCase()) {
          return -1;
        } else if (a.firstChild.getAttribute("alt").toLowerCase() > b.firstChild.getAttribute("alt").toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a.textContent.toLowerCase() < b.textContent.toLowerCase()) {
          return -1;
        } else if (a.textContent.toLowerCase() > b.textContent.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  };

  let all = [];

  let children = imdbscout_missing.children;
  if (!GM_config.get('one_line')) {
    let [removed, ...children2] = children;
    children = children2;
  }
  for (const child of children) {
    all.push(child);
  }

  let sorted = [...sorta(all)];

  for (const node of sorted) {
    node.remove();
    imdbscout_missing.insertAdjacentHTML("beforeend", node.outerHTML + " ");
  }
}

//==============================================================================
//    Radarr
//==============================================================================

function get_radarr_movies(movie_id) {
  let imdbid = "tt" + movie_id;
  let radarr_url = GM_config.get("radarr_url").replace(/\/$/, "");
  let radarr_apikey = GM_config.get("radarr_apikey");
  const error_icon = "data:image/png;base64,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";
  GM.xmlHttpRequest({
    method: "GET",
    url: radarr_url + "/api/movie",
    headers: {
      "X-Api-Key": radarr_apikey,
      "Accept": "text/json"
    },
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        try {
          responseJSON = JSON.parse(response.responseText);
          if (responseJSON.error == "Unauthorized") {
            throw "creds";
          }
          GM.setValue("IMDb_Scout_Mod_Radarr_movies", JSON.stringify(responseJSON));
          console.log("IMDb Scout Mod (Radarr): Sync movies complete!");
          buttonBuilder(imdbid, radarr_url, radarr_apikey);
        }
        catch (e) {
          $('a[href="https://radarr.video"]').find('img').prop("src", error_icon);
          if (e instanceof SyntaxError) {
            errorNotificationHandler(e, true, "No JSON in response. \nPlease check your Radarr URL.");
          } else if (e == "creds") {
            errorNotificationHandler(e, true, "Invalid Radarr API Key.");
          } else {
            errorNotificationHandler(e, false);
          }
        }
      }
    },
    onerror: function() {
      $('a[href="https://radarr.video"]').find('img').prop("src", error_icon);
      console.log("IMDb Scout Mod (Radarr): Request Error. Check that Radarr is running or your Radarr URL.");
    },
    onabort: function() {
      $('a[href="https://radarr.video"]').find('img').prop("src", error_icon);
      console.log("IMDb Scout Mod (Radarr): Request is aborted.");
    }
  });
}

async function buttonBuilder(imdbid, radarr_url, radarr_apikey) {
  let exists = await check_exists(imdbid);
  const exists_icon = "data:image/png;base64,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";
  let button = $('a[href="https://radarr.video"]');
      button.prop("href", "javascript: void(0)");
      button.removeAttr("target");
  if (exists) {
    button.find('img').prop("src", exists_icon);
    $(button).click(function() {
      GM.openInTab(radarr_url + "/movie/" + exists[0].titleSlug);
    });
  } else {
    $(button).click(function() {
      new_movie_lookup(imdbid, radarr_url, radarr_apikey, exists_icon);
    });
  }
}

async function check_exists(imdbid) {
  let movieliststr = await GM.getValue("IMDb_Scout_Mod_Radarr_movies", "{}");
  let movie_list = JSON.parse(movieliststr);
  let filter = null;
  try {
    filter = movie_list.filter(movie => movie.imdbId == imdbid);
  }
  catch (e) {
    if (e instanceof TypeError) {
      return false;
    } else {
      errorNotificationHandler(e, false);
      return false;
    }
  }
  if (!filter.length) {
    return false;
  } else {
    return filter;
  }
}

function new_movie_lookup(imdbid, radarr_url, radarr_apikey, exists_icon) {
  GM.xmlHttpRequest({
    method: "GET",
    url: radarr_url + "/api/movie/lookup/imdb?imdbId=" + imdbid,
    headers: {
      "X-Api-Key": radarr_apikey,
      "Accept": "text/json"
    },
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        if (!response.responseText) {
          GM.notification("No results found.", "IMDb Scout Mod (Radarr)");
          return;
        }
        responseJSON = JSON.parse(response.responseText);
        add_movie(responseJSON, imdbid, radarr_url, radarr_apikey, exists_icon);
      }
    }
  });
}

function add_movie(movie, imdbid, radarr_url, radarr_apikey, exists_icon) {
  movie.RootFolderPath = GM_config.get("radarr_rootfolderpath");
  movie.monitored = GM_config.get("radarr_monitored");
  movie.minimumAvailability = GM_config.get("radarr_minimumavailability");
  if (GM_config.get("radarr_searchformovie")) {
    movie.addOptions = {searchForMovie: true};
  }
  const qProID = GM_config.get("radarr_profileid");
  if (qProID == "Any") {
    movie.ProfileId = 1;
  } else if (qProID == "HD - 720p/1080p") {
    movie.ProfileId = 6;
  } else if (qProID == "HD-1080p") {
    movie.ProfileId = 4;
  } else if (qProID == "HD-720p") {
    movie.ProfileId = 3;
  } else if (qProID == "SD") {
    movie.ProfileId = 2;
  } else if (qProID == "Ultra-HD") {
    movie.ProfileId = 5;
  } else if (qProID == "Custom") {
    movie.ProfileId = GM_config.get("radarr_customprofileid");
  }
  GM.xmlHttpRequest({
    method: "POST",
    url: radarr_url + "/api/movie",
    headers: {
      "X-Api-Key": radarr_apikey,
      "Accept": "text/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(movie),
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        responseJSON = JSON.parse(response.responseText);
        try {
          if (!responseJSON.title && responseJSON[Object.keys(responseJSON)[0]].errorMessage == "This movie has already been added") {
            throw "exists";
          }
          let button = $('img[title="Radarr"]');
              button.prop("src", exists_icon);
              button.parent().off("click");
          $(button).click(function() {
            GM.openInTab(radarr_url + "/movie/" + responseJSON.titleSlug);
          });
          GM.notification('"' + responseJSON.title + '"' + " \nSuccessfully sent to Radarr.", "IMDb Scout Mod (Radarr)");
        }
        catch (e) {
          if (e == "exists") {
            errorNotificationHandler(e, true, "Movie already exists in Radarr.", "IMDb Scout Mod (Radarr)");
          } else {
            errorNotificationHandler(e, false);
          }
        }
      }
    }
  });
}

function errorNotificationHandler(error, expected, errormsg) {
  let prestring = "IMDb Scout Mod (Radarr): ";
  if (expected) {
    GM.notification("Error: " + errormsg, "IMDb Scout Mod (Radarr)");
  } else {
    GM.notification("Unexpected Radarr Error, please report it. \nActual Error: " + error, "IMDb Scout Mod (Radarr)");
  }
}

//==============================================================================
//    Sonarr
//==============================================================================

async function get_sonarr_tvseries(movie_id) {
  const error_icon = "data:image/png;base64,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";
  var tvdbid = await getTVDbID(movie_id);
  if (tvdbid == "0") {
    $('a[href="https://sonarr.tv"]').find('img').prop("src", error_icon);
    console.log("IMDb Scout Mod (Sonarr): TVDb ID not found.");
    return;
  } else if (tvdbid == undefined) {
    $('a[href="https://sonarr.tv"]').find('img').prop("src", error_icon);
    console.log("IMDb Scout Mod (Sonarr): Error converting IMDbID to TVDbID (undefined).");
    return;
  }
  let sonarr_url = GM_config.get("sonarr_url").replace(/\/$/, "");
  let sonarr_apikey = GM_config.get("sonarr_apikey");
  GM.xmlHttpRequest({
    method: "GET",
    url: sonarr_url + "/api/series",
    headers: {
      "X-Api-Key": sonarr_apikey,
      "Accept": "text/json"
    },
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        try {
          responseJSON = JSON.parse(response.responseText);
          if (responseJSON.error == "Unauthorized") {
            throw "creds";
          }
          GM.setValue("IMDb_Scout_Mod_Sonarr_series", JSON.stringify(responseJSON));
          console.log("IMDb Scout Mod (Sonarr): Sync series complete!");
          sonarrButtonBuilder(tvdbid, sonarr_url, sonarr_apikey);
        }
        catch (e) {
          $('a[href="https://sonarr.tv"]').find('img').prop("src", error_icon);
          if (e instanceof SyntaxError) {
            sonarrErrorNotificationHandler(e, true, "No JSON in response. \nPlease check your Sonarr URL.");
          } else if (e == "creds") {
            sonarrErrorNotificationHandler(e, true, "Invalid Sonarr API Key.");
          } else {
            sonarrErrorNotificationHandler(e, false);
          }
        }
      }
    },
    onerror: function() {
      $('a[href="https://sonarr.tv"]').find('img').prop("src", error_icon);
      console.log("IMDb Scout Mod (Sonarr): Request Error. Check that Sonarr is running or your Sonarr URL.");
    },
    onabort: function() {
      $('a[href="https://sonarr.tv"]').find('img').prop("src", error_icon);
      console.log("IMDb Scout Mod (Sonarr): Request is aborted.");
    }
  });
}

async function sonarrButtonBuilder(tvdbid, sonarr_url, sonarr_apikey) {
  let exists = await sonarrCheck_exists(tvdbid);
  const exists_icon = "data:image/png;base64,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";
  let button = $('a[href="https://sonarr.tv"]');
      button.prop("href", "javascript: void(0)");
      button.removeAttr("target");
  if (exists) {
    button.find('img').prop("src", exists_icon);
    $(button).click(function() {
      GM.openInTab(sonarr_url + "/series/" + exists[0].titleSlug);
    });
  } else {
    $(button).click(function() {
      new_tvseries_lookup(tvdbid, sonarr_url, sonarr_apikey, exists_icon);
    });
  }
}

async function sonarrCheck_exists (tvdbid) {
  let seriesliststr = await GM.getValue("IMDb_Scout_Mod_Sonarr_series", "{}");
  let series_list = JSON.parse(seriesliststr);
  let filter = null;
  try {
    filter = series_list.filter(series => series.tvdbId == tvdbid);
  }
  catch (e) {
    if (e instanceof TypeError) {
      return false;
    } else {
      sonarrErrorNotificationHandler(e, false);
      return false;
    }
  }
  if (!filter.length) {
    return false;
  } else {
    return filter;
  }
}

function new_tvseries_lookup(tvdbid, sonarr_url, sonarr_apikey, exists_icon) {
  GM.xmlHttpRequest({
    method: "GET",
    url: sonarr_url + "/api/series/lookup?term=tvdb:" + tvdbid,
    headers: {
      "X-Api-Key": sonarr_apikey,
      "Accept": "text/json"
    },
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        if (!response.responseText) {
          GM.notification("No results found.", "IMDb Scout Mod (Sonarr)");
          return;
        }
        responseJSON = JSON.parse(response.responseText);
        add_tvseries(responseJSON[0], tvdbid, sonarr_url, sonarr_apikey, exists_icon);
      }
    }
  });
}

function add_tvseries(tvseries, tvdbid, sonarr_url, sonarr_apikey, exists_icon) {
  tvseries.rootFolderPath = GM_config.get("sonarr_rootfolderpath");
  tvseries.seasonFolder = GM_config.get("sonarr_seasonfolder");
  tvseries.seriesType = GM_config.get("sonarr_seriestype");
  tvseries.languageProfileId = GM_config.get("sonarr_languageprofileid");
  if (GM_config.get("sonarr_searchformissing")) {
    tvseries.addOptions = {searchForMissingEpisodes: true};
  }
  if (GM_config.get("sonarr_searchforcutoff")) {
    tvseries.addOptions = {searchForCutoffUnmetEpisodes: true};
  }
  if (GM_config.get("sonarr_ignoreEpisodesWithFiles")) {
    tvseries.addOptions = {ignoreEpisodesWithFiles: true};
  }
  if (GM_config.get("sonarr_ignoreEpisodesWithoutFiles")) {
    tvseries.addOptions = {ignoreEpisodesWithoutFiles: true};
  }
  const uSceneNr = GM_config.get("sonarr_usescenenumbering");
  if (uSceneNr == "Yes") {
    tvseries.useSceneNumbering = true;
  } else if (uSceneNr == "No") {
    tvseries.useSceneNumbering = false;
  }
  const qProID = GM_config.get("sonarr_profileid");
  if (qProID == "Any") {
    tvseries.ProfileId = 1;
  } else if (qProID == "HD - 720p/1080p") {
    tvseries.ProfileId = 6;
  } else if (qProID == "HD-1080p") {
    tvseries.ProfileId = 4;
  } else if (qProID == "HD-720p") {
    tvseries.ProfileId = 3;
  } else if (qProID == "SD") {
    tvseries.ProfileId = 2;
  } else if (qProID == "Ultra-HD") {
    tvseries.ProfileId = 5;
  } else if (qProID == "Custom") {
    tvseries.ProfileId = GM_config.get("sonarr_customprofileid");
  }
  const sonMon = GM_config.get("sonarr_monitored");
  if (sonMon == "All Episodes") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'all'};
  } else if (sonMon == "Future Episodes") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'future'};
  } else if (sonMon == "Missing Episodes") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'missing'};
  } else if (sonMon == "Existing Episodes") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'existing'};
  } else if (sonMon == "Pilot Episode") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'pilot'};
  } else if (sonMon == "Only First Season") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'firstSeason'};
  } else if (sonMon == "Only Latest Season") {
    tvseries.monitored  = true;
    tvseries.addOptions = {monitor: 'latestSeason'};
  } else if (sonMon == "None") {
    tvseries.monitored  = false;
    tvseries.addOptions = {monitor: 'none'};
  }
  GM.xmlHttpRequest({
    method: "POST",
    url: sonarr_url + "/api/series",
    headers: {
      "X-Api-Key": sonarr_apikey,
      "Accept": "text/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(tvseries),
    onload: function(response) {
      let responseJSON = null;
      if (!response.responseJSON) {
        responseJSON = JSON.parse(response.responseText);
        try {
          if (!responseJSON.title && responseJSON[Object.keys(responseJSON)[0]].errorMessage == "This series has already been added") {
            throw "exists";
          }
          let button = $('img[title="Sonarr"]');
              button.prop("src", exists_icon);
              button.parent().off("click");
          $(button).click(function() {
            GM.openInTab(sonarr_url + "/series/" + responseJSON.titleSlug);
          });
          GM.notification('"' + responseJSON.title + '"' + " \nSuccessfully sent to Sonarr.", "IMDb Scout Mod (Sonarr)");
        }
        catch (e) {
          if (e == "exists") {
            sonarrErrorNotificationHandler(e, true, "Series already exists in Sonarr.", "IMDb Scout Mod (Sonarr)");
          } else {
            sonarrErrorNotificationHandler(e, false);
          }
        }
      }
    }
  });
}

function sonarrErrorNotificationHandler(error, expected, errormsg) {
  let prestring = "IMDb Scout Mod (Sonarr): ";
  if (expected) {
    GM.notification("Error: " + errormsg, "IMDb Scout Mod (Sonarr)");
  } else {
    GM.notification("Unexpected Sonarr Error, please report it. \nActual Error: " + error, "IMDb Scout Mod (Sonarr)");
  }
}

//==============================================================================
//    Trakt-Watchlist
//==============================================================================

async function start_trakt(movie_id, movie_title) {
  const imdbid = "tt" + movie_id;
  const title = movie_title.trim();
  let button = $('a[href="https://trakt.tv/oauth/authorize?client_id=325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2&redirect_uri=https://www.imdb.com/title/tt0052077/&response_type=code"]');
  const access_token = await GM.getValue("IMDb_Scout_Mod_Trakt_access_token", "none");

  if (access_token == 'none') {
    $(button).click(function() {
      button.remove();
    });
    GM.notification("Trakt's access token not found. \nPress icon to authorize with Trakt. \nRefresh page after authorization is completed.", "IMDb Scout Mod (Trakt-Watchlist)");
    return;
  }
  const created_at = await GM.getValue("IMDb_Scout_Mod_Trakt_created_at", 9999999999);
  const current_time = Math.round(new Date().getTime() / 1000);
  if (current_time - created_at > 5184000) {
    trakt_refresh_token();
    return;
  }
  const exists_icon = "data:image/png;base64,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";
  const missing_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADMAgMAAABCTKRhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJUExURfDCAP////DCAJG7xr0AAAACdFJOUwAAdpPNOAAABhFJREFUaN6Nmk2O7SYQRktIkSJWkTGrySCdQVaDMswqmDwJeZW5Bgrq5ytf9+y2fYADGOMq6IJ/v37uv3/wRUL/7PTbYP6k10ynzVB5x3yQwyCIICIYesOQYdJ3plmG8jdmtEwzTskyFTDpmZktM4ytiEAHbAcuIT0xfJMtozww1SAMpZjpDmGohEwFDem+InJlZjjIEdOCqWJLcr4FT9qEmY6rWZoFMk1fIl1YhoysppL9la6otKKnEPlLimmnMCIDVdU4PbWyRVbxTTWOVNPkpFM16Ykrm5bFpCP1WKjGkRyE4qvJ844uG0dSRz5CW6dl2zgSOtl1wH1fT1xUMQz/z1ST7v8UWaZg6qq7ug6oU0QI0dHJoNPKuFJEoYfp4orRoT9GaUKIjg7ogaHT96WsmDpb2/x41nTtJiTFrEIq0MmrF5phWIeATrnvXvdYBjRt6Iyrq8AimFVvhTo3s65mwayfBHW4U7fQfjyKH9Clw1O+OybW4Sd4dwKJLoh1Zg3cCSS64EGHy8ybqbvuSGcU0AxTnnW40LSZ7zrjbu4EMSsedfgOwaQHnbSF6ppEF7uFOrmZTlhMedApnX8LpkJm6yzTM1mPWqjDxY17FNNDHTGqi+QaW6gj9hVVMKDbhE4X6+P4P/dGjXWaaO1hCl7ZlM7quDyYihivQ6QZvFBrnVVyihmvoxjU1UCHe+ow9buOYDrqaqSzO5uZFzqCQcMDdYiX7sX0Fzp7gGi+KfoLnVX2zaDhgTrLYTPtjc7sqzQYN6SBzmHAkAY688aACXTWjYOxQxrpLAnIRDqrsy4CUyfSkYydBpHOYgpgQp11J2JiHWb8dNvNQqvEYZrZUN/3A5014TyTrtkutFDmgJmv5ox0mHHTem7ME9I5jJlua6OFdCLmvvXCixFPbMfctw4ToBMxhScA0ImY+9a7fUhHMe4R+YBAh5kRLTIfCKOBxesQQWboDDL3t8yYN2NsUoPMr58fw8z5POfAW2Y+O3CuhcwaHTgJIiZeCkKGlwI4qQNmLQWxEGCWTix0mG50YiHPsE4s5BnWiYU8wwt1LOT7gEcnHiHHyIU6EHLMXqhTKOSY84EQCjlmT7Z4ylnm6NRQyDLnvdNCIcuc12gPhe7Lcj0Qz04oZNYQ9RoNhOyaKF+jkZBde8WuIBSyjNAJhQwjdUIhw0idUMgwUicUMu9tubKFQppRo1MiIc2oTU6OhFw95/FMkdDcYBNv49VCHQmZvViRe7ZIyDBZ7tkiIcncG2ZZcCR09pZrDysFAiG3V5blBkKKqaQXNSwk9vF7kp5isZBjdPOhUOZvjEoJrJ1QSHz/8OSRrYdCmun2XQCF9rfZmnC28UioiO/GsuIipkwntL81OzOu7c0HENS3cy3+47r7QIVmsp1cXiiZWMCnHWYSeyEbP7hDwfph8UKCqRxy1nPYC4F4SPLfQVroOkzbA2wXGSMkYjUcfgOLmRJKHHKi8w1iF00rJGNPfRfpvkaVkIxxTbEOgy9SSMbSVswuo5iVFLpEzG7RGb2lpZCKJ85W/od2A0JIxyBnD/7rdx1KKNv46NhREj0J6Tjsit3+jj6rjtClmCBAqoVMjPgiGIjVQiYWHcS8lVAvJ1nA8fgMt7lHqF0mth7E8KVQOl3wmCuQQtnmCi76LmRzElHuQwgVly8JcixbqCeZaFK5nBYJ9SwTWipn1COhVk4uSuazCmzcFKoitSbzZvkKvpI+QhnlzSrHdaAQtyG/yekRie2zzQNy2hKHM3Du8KKwcWfu07tc6F34TtSmIOfqK8qkUswmt5twRVmlmFEOuaPexjnkKFe9am8wv33S6wTy6LJpJl9/+Qx31ol5zZz0erUti3L8e+96mZ2hPjMQn1moGmn6tAfpoxZJnSQp385G2DMY15szGM9nPYIzJRVX1B7OlICTLfh4ij8jk+AJpfBcTQMnXpo/bIPO/JRvx4DQ2aJikYezRTI4BH/Ds1LVnST5elbqPKX3kay/6NWZrF2RZNK3c2mAeXmWTTJfz7Jx6w7z4szcat1h3p0bVMzb84mCeX2m8eM0mfT+HOTn72b+Dq79D3ssEFf2/KqWAAAAAElFTkSuQmCC";
  const error_icon = "data:image/png;base64,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";
  const synctime = await GM.getValue("IMDb_Scout_Mod_Trakt_watchlist_synctime", "none");
  button.prop("href", "javascript: void(0)");
  button.removeAttr("target");

  if (synctime !== 'none') {
    if (current_time - synctime < GM_config.get('trakt_synclimiter')) {
      GM.setValue("IMDb_Scout_Mod_Trakt_watchlist_synctime", current_time);
      const trakt_watchlist = await GM.getValue("IMDb_Scout_Mod_Trakt_watchlist", "none");

      if (Boolean(trakt_watchlist.match(imdbid))) {
        button.find('img').prop("src", exists_icon);
        $(button).click(function() {
          trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
        });
      } else {
        button.find('img').prop("src", missing_icon);
        $(button).click(function() {
          trakt_watchlist_add(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
        });
      }
    } else {
      get_trakt_watchlist(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
    }
  } else {
    get_trakt_watchlist(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
  }
}

function get_trakt_watchlist(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon) {
  GM.xmlHttpRequest({
    method: "GET",
    url: "https://api.trakt.tv/sync/watchlist",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + access_token,
      "trakt-api-version": "2",
      'trakt-api-key': '325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2'
    },
    onload: function(response) {
      if (response.status == 200) {
        let responseJSON = JSON.parse(response.responseText);
        const set_synctime = Math.round(new Date().getTime() / 1000);
        const trakt_watchlist = JSON.stringify(responseJSON);

        GM.setValue("IMDb_Scout_Mod_Trakt_watchlist", trakt_watchlist);
        GM.setValue("IMDb_Scout_Mod_Trakt_watchlist_synctime", set_synctime);
        console.log("IMDb Scout Mod (Trakt-Watchlist): Sync watchlist complete!");

        if (Boolean(trakt_watchlist.match(imdbid))) {
          button.find('img').prop("src", exists_icon);
          $(button).click(function() {
            trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
          });
        } else {
          button.find('img').prop("src", missing_icon);
          $(button).click(function() {
            trakt_watchlist_add(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
          });
        }
      } else if (response.status == 401) {
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", "none");
        location.reload();
      } else if (response.status > 499) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Server/CF Error or Overloaded.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status > 399) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Sync Error " + response.status + ", please report it.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else {
        button.find('img').prop("src", error_icon);
        button.off("click");
        console.log("IMDb Scout Mod (Trakt Sync status): " + response.status);
        console.log("IMDb Scout Mod (Trakt Sync response): " + response.responseText);
      }
    }
  });
}

function trakt_watchlist_add(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon) {
  const body = {'movies': [{'ids': {'imdb': imdbid}}], 'shows': [{'ids': {'imdb': imdbid}}], 'episodes': [{'ids': {'imdb': imdbid}}]};

  GM.xmlHttpRequest({
    method: "POST",
    url: "https://api.trakt.tv/sync/watchlist",
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + access_token,
      "trakt-api-version": "2",
      'trakt-api-key': '325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2'
    },
    onload: function(response) {
      if (response.status == 201) {
        const responseJSON   = JSON.parse(response.responseText);
        const resultAdded    = JSON.stringify(responseJSON["added"]);
        const resultExisting = JSON.stringify(responseJSON["existing"]);
        const countAdded     = (resultAdded.match(/1/g) || []).length;
        const countExisting  = (resultExisting.match(/1/g) || []).length;

        if (countAdded == 0 && countExisting == 0) {
          button.find('img').prop("src", error_icon);
          button.off("click");
          GM.notification('"' + title + '"' + " \nNot Found on Trakt.", "IMDb Scout Mod (Trakt-Watchlist)");
        } else if (countAdded == 0 && countExisting !== 0) {
          button.find('img').prop("src", exists_icon);
          button.off("click");
          $(button).click(function() {
            trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
          });
          GM.notification('"' + title + '"' + " \nAlready exists in Trakt's watchlist!", "IMDb Scout Mod (Trakt-Watchlist)");
        } else if (countAdded > 1) {
          button.find('img').prop("src", exists_icon);
          button.off("click");
          $(button).click(function() {
            trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
          });
          GM.notification('"' + title + '"' + " \nAdded to Trakt's watchlist. \nDetected incorrect data on Trakt!", "IMDb Scout Mod (Trakt-Watchlist)");
        } else {
          button.find('img').prop("src", exists_icon);
          button.off("click");
          $(button).click(function() {
            trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
          });
          GM.notification('"' + title + '"' + " \nAdded to Trakt's watchlist.", "IMDb Scout Mod (Trakt-Watchlist)");
        }
      } else if (response.status == 401) {
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", "none");
        location.reload();
      } else if (response.status == 429) {
          button.find('img').prop("src", error_icon);
          button.off("click");
          GM.notification("API rate limit exceeded.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status > 499) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Server/CF Error or Overloaded.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status > 399) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Add Error " + response.status + ", please report it.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else {
        button.find('img').prop("src", error_icon);
        button.off("click");
        console.log("IMDb Scout Mod (Trakt Add status): " + response.status);
        console.log("IMDb Scout Mod (Trakt Add response): " + response.responseText);
      }
    },
    onerror: function() {
      button.find('img').prop("src", error_icon);
      button.off("click");
      console.log("IMDb Scout Mod (Trakt-Watchlist): Add Request Error.");
    },
    onabort: function() {
      button.find('img').prop("src", error_icon);
      button.off("click");
      console.log("IMDb Scout Mod (Trakt-Watchlist): Add Request is aborted.");
    }
  });
}

function trakt_watchlist_remove(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon) {
  const body = {'movies': [{'ids': {'imdb': imdbid}}], 'shows': [{'ids': {'imdb': imdbid}}], 'episodes': [{'ids': {'imdb': imdbid}}]};
  GM.xmlHttpRequest({
    method: "POST",
    url: "https://api.trakt.tv/sync/watchlist/remove",
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + access_token,
      "trakt-api-version": "2",
      'trakt-api-key': '325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2'
    },
    onload: function(response) {
      if (response.status == 200) {
        button.find('img').prop("src", missing_icon);
        button.off("click");
        $(button).click(function() {
          trakt_watchlist_add(imdbid, title, access_token, button, error_icon, missing_icon, exists_icon);
        });
        GM.notification('"' + title + '"' + " \nRemoved from Trakt's watchlist.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status == 401) {
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", "none");
        location.reload();
      } else if (response.status == 429) {
          button.find('img').prop("src", error_icon);
          button.off("click");
          GM.notification("API rate limit exceeded.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status > 499) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Server/CF Error or Overloaded.", "IMDb Scout Mod (Trakt-Watchlist)");
      } else if (response.status > 399) {
        button.find('img').prop("src", error_icon);
        button.off("click");
        GM.notification("Remove Error " + response.status + ", please report it.", "IMDb Scout Mod (Trakt-Watchlist)");

      } else {
        button.find('img').prop("src", error_icon);
        button.off("click");
        console.log("IMDb Scout Mod (Trakt Remove status): " + response.status);
        console.log("IMDb Scout Mod (Trakt Remove response): " + response.responseText);
      }
    },
    onerror: function() {
      button.find('img').prop("src", error_icon);
      button.off("click");
      console.log("IMDb Scout Mod (Trakt-Watchlist): Remove Request Error.");
    },
    onabort: function() {
      button.find('img').prop("src", error_icon);
      button.off("click");
      console.log("IMDb Scout Mod (Trakt-Watchlist): Remove Request is aborted.");
    }
  });
}

function traktCatchToken() {
  const code = location.href.replace('https://www.imdb.com/title/tt0052077/?code=','');
  var body = {
    'code': code,
    'client_id': '325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2',
    'client_secret': 'ee4204782a908e201ae22da35fbd19f08362e99ba158b04f1931caf8eea55fe4',
    'redirect_uri': 'https://www.imdb.com/title/tt0052077/',
    'grant_type': 'authorization_code'
  };
  GM.xmlHttpRequest({
    method: "POST",
    url: "https://api.trakt.tv/oauth/token",
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    onload: function(response) {
      if (response.status == 200) {
        let responseJSON = JSON.parse(response.responseText);
        const access_token  = responseJSON.access_token;
        const refresh_token = responseJSON.refresh_token;
        const created_at    = responseJSON.created_at;
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", access_token);
        GM.setValue("IMDb_Scout_Mod_Trakt_refresh_token", refresh_token);
        GM.setValue("IMDb_Scout_Mod_Trakt_created_at", created_at);
        window.close();
      } else {
        console.log("IMDb Scout Mod (Trakt Get Token status): " + response.status);
        console.log("IMDb Scout Mod (Trakt Get Token response): " + response.responseText);
      }
    }
  });
}

async function trakt_refresh_token() {
  const refresh_token = await GM.getValue("IMDb_Scout_Mod_Trakt_refresh_token", "none");
  var body = {
    'refresh_token': refresh_token,
    'client_id': '325c09f8f8d6e3466c7ced12c11cc32d4af00e1af1f6310da4f6dfb702c7b8c2',
    'client_secret': 'ee4204782a908e201ae22da35fbd19f08362e99ba158b04f1931caf8eea55fe4',
    'redirect_uri': 'https://www.imdb.com/title/tt0052077/',
    'grant_type': 'refresh_token'
  };
  GM.xmlHttpRequest({
    method: "POST",
    url: "https://api.trakt.tv/oauth/token",
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
    onload: function(response) {
      if (response.status == 200) {
        let responseJSON = JSON.parse(response.responseText);
        const access_token  = responseJSON.access_token;
        const refresh_token = responseJSON.refresh_token;
        const created_at    = responseJSON.created_at;
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", access_token);
        GM.setValue("IMDb_Scout_Mod_Trakt_refresh_token", refresh_token);
        GM.setValue("IMDb_Scout_Mod_Trakt_created_at", created_at);
        GM.notification("Trakt's access token is refreshed. \nNext refresh after 2 months.", "IMDb Scout Mod (Trakt-Watchlist)");
        location.reload();
      } else {
        GM.setValue("IMDb_Scout_Mod_Trakt_access_token", "none");
        console.log("IMDb Scout Mod (Trakt Refresh Token status): " + response.status);
        console.log("IMDb Scout Mod (Trakt Refresh Token response): " + response.responseText);
      }
    }
  });
}

//==============================================================================
//    Create the config name (GM_config)
//==============================================================================

function configName(site) {
  if ('configName' in site) {
    return 'show_' + site['configName'] + (site['TV'] ? '_TV' : '');
  } else {
    return 'show_' + site['name'] + (site['TV'] ? '_TV' : '');
  }
}

//==============================================================================
//    Count sites (GM_config)
//==============================================================================

function countSites(task) {
  if (task == 1) {
    const count_total = sites.concat(icon_sites).length;
    return count_total;
  }
  if (task == 2) {
    // Init GM_config to get amount of selected sites.
    // GM_config's fields needs to be mirrored to keep Settings intact.
    var config_fields = {
      'aftertitle': {'type': 'hidden'},
      'imdbtotalstats': {'type': 'hidden'},
      'imdbselectedstats': {'type': 'hidden'},
      'imdbscoutmod_header_text': {'type': 'text'},
      'imdbscoutsecondbar_header_text': {'type': 'text'},
      'imdbscoutthirdbar_header_text': {'type': 'text'},
      'cfg_icons_size': {'type': 'text'},
      'loadmod_on_start_movie': {'type': 'checkbox'},
      'load_second_bar': {'type': 'checkbox'},
      'load_third_bar_movie': {'type': 'checkbox'},
      'switch_bars': {'type': 'checkbox'},
      'sortReqOnNewLine': {'type': 'checkbox'},
      'call_http_mod_movie': {'type': 'checkbox'},
      'hide_missing_movie': {'type': 'checkbox'},
      'use_mod_icons_movie': {'type': 'checkbox'},
      'one_line': {'type': 'checkbox'},
      'ignore_type_movie': {'type': 'checkbox'},
      'highlight_sites_movie': {'type': 'text'},
      'highlight_missing_movie': {'type': 'text'},
      'loadmod_on_start_search': {'type': 'checkbox'},
      'load_third_bar_search': {'type': 'checkbox'},
      'call_http_mod_search': {'type': 'checkbox'},
      'hide_missing_search': {'type': 'checkbox'},
      'use_mod_icons_search': {'type': 'checkbox'},
      'ignore_type_search': {'type': 'checkbox'},
      'highlight_sites_search': {'type': 'text'},
      'highlight_missing_search': {'type': 'text'},
      'radarr_searchformovie': {'type': 'checkbox'},
      'radarr_monitored': {'type': 'checkbox'},
      'radarr_url': {'type': 'text'},
      'radarr_apikey': {'type': 'text'},
      'radarr_rootfolderpath': {'type': 'text'},
      'radarr_profileid': {'type': 'select', 'options': ['Any', 'HD - 720p/1080p', 'HD-1080p', 'HD-720p', 'SD', 'Ultra-HD', 'Custom']},
      'radarr_customprofileid': {'type': 'text'},
      'radarr_minimumavailability': {'type': 'select', 'options': ['announced', 'inCinemas', 'released', 'preDB']},
      'sonarr_searchformissing': {'type': 'checkbox'},
      'sonarr_searchforcutoff': {'type': 'checkbox'},
      'sonarr_ignoreEpisodesWithFiles': {'type': 'checkbox'},
      'sonarr_ignoreEpisodesWithoutFiles': {'type': 'checkbox'},
      'sonarr_seasonfolder': {'type': 'checkbox'},
      'sonarr_usescenenumbering': {'type': 'select', 'options': ['Auto', 'No', 'Yes']},
      'sonarr_monitored': {'type': 'select', 'options': ['All Episodes', 'Future Episodes', 'Missing Episodes', 'Existing Episodes', 'Pilot Episode', 'Only First Season', 'Only Latest Season', 'None']},
      'sonarr_url': {'type': 'text'},
      'sonarr_apikey': {'type': 'text'},
      'sonarr_rootfolderpath': {'type': 'text'},
      'sonarr_profileid': {'type': 'select', 'options': ['Any', 'HD - 720p/1080p', 'HD-1080p', 'HD-720p', 'SD', 'Ultra-HD', 'Custom']},
      'sonarr_customprofileid': {'type': 'text'},
      'sonarr_languageprofileid': {'type': 'text'},
      'sonarr_seriestype': {'type': 'select', 'options': ['standard', 'daily', 'anime']},
      'trakt_synclimiter': {'type': 'select', 'options': ['15', '30', '60', '300']},
      'milkie_authToken': {'type': 'text'}
    };
    $.each(custom_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(public_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(private_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(usenet_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(subs_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(pre_databases, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(other_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(streaming_sites, function(index, site) {config_fields[configName(site)] = {'type': 'checkbox'};});
    $.each(icon_sites_main, function(index, icon_site) {config_fields['show_icon_' + icon_site['name']] = {'type': 'checkbox'};});
    $.each(special_buttons, function(index, icon_site) {config_fields['show_icon_' + icon_site['name']] = {'type': 'checkbox'};});

    GM_config.init({'id': 'imdb_scout', 'fields': config_fields});

    $.each(sites, function(index, site) {
      site['show'] = GM_config.get(configName(site));
    });
    $.each(icon_sites, function(index, icon_site) {
      icon_site['show'] = GM_config.get('show_icon_' + icon_site['name']);
    });

    const count_selected = sites.concat(icon_sites).reduce(function (n, site) {
      return n + (site['show'] == true); }, 0);

    return count_selected;
  }
}


//================================  MAIN  ====================================//


//==============================================================================
//    Polyfill for GM3 notifications
//==============================================================================

if (typeof GM.notification === "undefined") {
  this.GM_notification = function(options) {
    const opts = {};
    if (typeof options === "string") {
      opts.text = options;
      opts.title = arguments[1];
      opts.image = arguments[2];
      opts.onclick = arguments[3];
    } else {
      Object.keys(options).forEach(function(key) {
        opts[key] = options[key];
      });
    }

    checkPermission();

    function checkPermission() {
      if (Notification.permission === "granted") {
        fireNotice(opts);
      } else if (Notification.permission === "denied") {
        alert("User has denied notifications for this page/site!");
        // eslint-disable-next-line no-useless-return
        return;
      } else {
        Notification.requestPermission(function(permission) {
          console.log("New permission: ", permission);
          checkPermission();
        });
      }
    }

    function fireNotice(ntcOptions) {
      if (ntcOptions.text && !ntcOptions.body) {
        ntcOptions.body = ntcOptions.text;
      }
      var ntfctn = new Notification(ntcOptions.title, ntcOptions);

      if (ntcOptions.onclick) {
        ntfctn.onclick = ntcOptions.onclick;
      }
      if (ntcOptions.timeout) {
        setTimeout(function() {
          ntfctn.close();
        }, ntcOptions.timeout);
      }
    }
  };
  GM.notification = GM_notification;
}

//==============================================================================
//    Settings Menu (GM_config)
//==============================================================================

// To have consistent spacing in different browsers.
var radarr_url_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
var radarr_apikey_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
var radarr_rootfolderpath_spacing = "&nbsp";
var radarr_customprofileid_spacing = "&nbsp";
var sonarr_usescenenumbering_spacing = "&nbsp &nbsp";
var sonarr_monitored_spacing = " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
var sonarr_languageprofileid_spacing = " &nbsp &nbsp &nbsp &nbsp &nbsp";
var sonarr_seriestype_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  radarr_url_spacing = " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
  radarr_apikey_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
  radarr_rootfolderpath_spacing = "";
  radarr_customprofileid_spacing = "";
  sonarr_usescenenumbering_spacing = "&nbsp";
  sonarr_monitored_spacing = " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
  sonarr_languageprofileid_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp";
  sonarr_seriestype_spacing = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
}

var config_fields = {
  'aftertitle': {
    'section': ' ',
    'label': ' &nbsp',
    'type': 'hidden'
  },
  'imdbtotalstats': {
    'label': 'Total sites:&nbsp'.bold().fontsize(3) + countSites(1).toString().bold().fontsize(3).fontcolor("Blue"),
    'type': 'hidden'
  },
  'imdbselectedstats': {
    'label': 'Selected sites:&nbsp'.bold().fontsize(3) + countSites(2).toString().bold().fontsize(3).fontcolor("Blue"),
    'type': 'hidden'
  },
  'imdbscoutmod_header_text': {
    'label': 'Header text for the 1st bar:&nbsp',
    'type': 'text',
    'default': ''
  },
  'imdbscoutsecondbar_header_text': {
    'label': 'Header text for the 2nd bar:',
    'type': 'text',
    'default': ''
  },
  'imdbscoutthirdbar_header_text': {
    'label': 'Header text for the 3rd bar:&nbsp',
    'type': 'text',
    'default': ''
  },
  'cfg_icons_size': {
    'label': 'Size of the icons (pixels): &nbsp &nbsp',
    'type': 'text',
    'default': '24'
  },
  'loadmod_on_start_movie': {
    'section': 'Title Page:',
    'type': 'checkbox',
    'label': 'Load on start?',
    'default': true
  },
  'load_second_bar': {
    'type': 'checkbox',
    'label': 'Enable the 2nd search bar?',
    'default': false
  },
  'load_third_bar_movie': {
    'type': 'checkbox',
    'label': 'Enable the 3rd search bar?',
    'default': false
  },
  'switch_bars': {
    'type': 'checkbox',
    'label': 'Swap 2nd and 3rd bars?',
    'default': false
  },
  'sortReqOnNewLine': {
    'type': 'checkbox',
    'label': 'The request sites on the new line if found?',
    'default': true
  },
  'call_http_mod_movie': {
    'type': 'checkbox',
    'label': 'Actually check for the search results?',
    'default': true
  },
  'hide_missing_movie': {
    'type': 'checkbox',
    'label': 'Hide missing links?',
    'default': false
  },
  'use_mod_icons_movie': {
    'type': 'checkbox',
    'label': 'Use icons instead of text?',
    'default': true
  },
  'one_line': {
    'type': 'checkbox',
    'label': 'Show results on one line?',
    'default': true
  },
  'ignore_type_movie': {
    'type': 'checkbox',
    'label': 'Search all sites, ignoring movie/tv distinction?',
    'default': false
  },
  'highlight_sites_movie': {
    'label': 'Highlight sites: &nbsp &nbsp &nbsp',
    'type': 'text',
    'default': 'PTP,KG,BTN,BTN-Title,SC,CG,TVV,Tik'
  },
  'highlight_missing_movie': {
    'label': 'Mark when not on:',
    'type': 'text',
    'default': ''
  },
  'loadmod_on_start_search': {
    'section': 'Search/List/Watchlist Page:',
    'type': 'checkbox',
    'label': 'Load on start?',
    'default': false
  },
  'load_third_bar_search': {
    'type': 'checkbox',
    'label': 'Enable the 3rd search bar?',
    'default': false
  },
  'call_http_mod_search': {
    'type': 'checkbox',
    'label': 'Actually check for the search results?',
    'default': true
  },
  'hide_missing_search': {
    'type': 'checkbox',
    'label': 'Hide missing links?',
    'default': false
  },
  'use_mod_icons_search': {
    'type': 'checkbox',
    'label': 'Use icons instead of text?',
    'default': true
  },
  'ignore_type_search': {
    'type': 'checkbox',
    'label': 'Search all sites, ignoring movie/tv distinction?',
    'default': false
  },
  'highlight_sites_search': {
    'label': 'Highlight sites: &nbsp &nbsp &nbsp',
    'type': 'text',
    'default': ''
  },
  'highlight_missing_search': {
    'label': 'Mark when not on:',
    'type': 'text',
    'default': ''
  },
  'radarr_searchformovie': {
    'section': 'Radarr settings:',
    'type': 'checkbox',
    'label': 'Search for movie on add?',
    'default': true
  },
  'radarr_monitored': {
    'type': 'checkbox',
    'label': 'Add monitored?',
    'default': true
  },
  'radarr_url': {
    'label': 'Radarr URL:' + radarr_url_spacing,
    'type': 'text',
    'default': 'http://localhost:7878'
  },
  'radarr_apikey': {
    'label': 'Radarr API Key:' + radarr_apikey_spacing,
    'type': 'text',
    'default': ''
  },
  'radarr_rootfolderpath': {
    'label': 'Radarr Root Folder Path:' + radarr_rootfolderpath_spacing,
    'type': 'text',
    'default': 'D:\\Movies'
  },
  'radarr_profileid': {
    'label': 'Radarr Quality Profile: &nbsp &nbsp &nbsp',
    'type': 'select',
    'options': ['Any', 'HD - 720p/1080p', 'HD-1080p', 'HD-720p', 'SD', 'Ultra-HD', 'Custom'],
    'default': 'Any'
  },
  'radarr_customprofileid': {
    'label': 'Custom Quality ProfileID:' + radarr_customprofileid_spacing,
    'type': 'text',
    'default': '1'
  },
  'radarr_minimumavailability': {
    'label': 'Minimum Availability: &nbsp &nbsp &nbsp &nbsp',
    'type': 'select',
    'options': ['announced', 'inCinemas', 'released', 'preDB'],
    'default': 'inCinemas'
  },
  'sonarr_searchformissing': {
    'section': 'Sonarr settings:',
    'type': 'checkbox',
    'label': 'Start search for missing episodes?',
    'default': false
  },
  'sonarr_searchforcutoff': {
    'type': 'checkbox',
    'label': 'Start search for cutoff unmet episodes?',
    'default': false
  },
  'sonarr_ignoreEpisodesWithFiles': {
    'type': 'checkbox',
    'label': 'Set ignoreEpisodesWithFiles=true?',
    'default': false
  },
  'sonarr_ignoreEpisodesWithoutFiles': {
    'type': 'checkbox',
    'label': 'Set ignoreEpisodesWithoutFiles=true?',
    'default': false
  },
  'sonarr_seasonfolder': {
    'type': 'checkbox',
    'label': 'Season Folder?',
    'default': true
  },
  'sonarr_usescenenumbering': {
    'label': 'Use Scene Numbering?' + sonarr_usescenenumbering_spacing,
    'type': 'select',
    'options': ['Auto', 'No', 'Yes'],
    'default': 'Auto'
  },
  'sonarr_monitored': {
    'label': 'Monitored:' + sonarr_monitored_spacing,
    'type': 'select',
    'options': ['All Episodes', 'Future Episodes', 'Missing Episodes', 'Existing Episodes', 'Pilot Episode', 'Only First Season', 'Only Latest Season', 'None'],
    'default': 'All Episodes'
  },
  'sonarr_url': {
    'label': 'Sonarr URL:' + radarr_url_spacing,
    'type': 'text',
    'default': 'http://localhost:8989'
  },
  'sonarr_apikey': {
    'label': 'Sonarr API Key:' + radarr_apikey_spacing,
    'type': 'text',
    'default': ''
  },
  'sonarr_rootfolderpath': {
    'label': 'Sonarr Root Folder Path:' + radarr_rootfolderpath_spacing,
    'type': 'text',
    'default': 'D:\\TVSeries'
  },
  'sonarr_profileid': {
    'label': 'Sonarr Quality Profile: &nbsp &nbsp &nbsp',
    'type': 'select',
    'options': ['Any', 'HD - 720p/1080p', 'HD-1080p', 'HD-720p', 'SD', 'Ultra-HD', 'Custom'],
    'default': 'Any'
  },
  'sonarr_customprofileid': {
    'label': 'Custom Quality ProfileID:' + radarr_customprofileid_spacing,
    'type': 'text',
    'default': '1'
  },
  'sonarr_languageprofileid': {
    'label': 'Language ProfileID:' + sonarr_languageprofileid_spacing,
    'type': 'text',
    'default': '1'
  },
  'sonarr_seriestype': {
    'label': 'Series Type:' + sonarr_seriestype_spacing,
    'type': 'select',
    'options': ['standard', 'daily', 'anime'],
    'default': 'standard'
  },
  'trakt_synclimiter': {
    'label': 'Watchlist sync limiter (seconds):',
    'section': 'Trakt-Watchlist settings:',
    'type': 'select',
    'options': ['15', '30', '60', '300'],
    'default': '15'
  },
  'milkie_authToken': {
    'label': 'Milkie:',
    'section': 'Authorization Tokens:',
    'type': 'text',
    'default': ''
  }
};

//==============================================================================
//    Add sites to Settings (GM_config)
//==============================================================================

$.each(custom_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Custom sites:'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(public_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Public download sites:'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(private_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Private download sites:'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(usenet_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Usenet sites:'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(subs_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Subtitles sites (in 2nd bar):'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(pre_databases, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Pre databases (in 2nd bar):'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(other_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Other sites (in 2nd bar):'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(streaming_sites, function(index, site) {
  config_fields[configName(site)] = {
    'section': (index == 0) ? ['Streaming sites (in 3rd bar):'] : '',
    'type': 'checkbox',
    'label': ' ' + site['name'] + (site['TV'] ? ' (TV)' : '')
  };
});

$.each(icon_sites_main, function(index, icon_site) {
  config_fields['show_icon_' + icon_site['name']] = {
    'section': (index == 0) ? ['Icon sites (no search):'] : '',
    'type': 'checkbox',
    'label': ' ' + icon_site['name'],
    'default': ('showByDefault' in icon_site) ? icon_site['showByDefault'] : true
  };
});

$.each(special_buttons, function(index, icon_site) {
  config_fields['show_icon_' + icon_site['name']] = {
    'section': (index == 0) ? ['Special icons/buttons:'] : '',
    'type': 'checkbox',
    'label': ' ' + icon_site['name'],
    'default': ('showByDefault' in icon_site) ? icon_site['showByDefault'] : true
  };
});

//==============================================================================
//    Initialize and register GM_config
//==============================================================================

GM_config.init({
  'id': 'imdb_scout',
  'title': 'IMDb Scout Mod Settings',
  'fields': config_fields,
  'css': '#imdb_scout_section_header_1, #imdb_scout_section_header_2, #imdb_scout_section_header_3, \
          #imdb_scout_section_header_4, #imdb_scout_section_header_5, #imdb_scout_section_header_6, \
          #imdb_scout_section_header_7, #imdb_scout_section_header_8, #imdb_scout_section_header_9, \
          #imdb_scout_section_header_10, #imdb_scout_section_header_11, #imdb_scout_section_header_12, \
          #imdb_scout_section_header_13, #imdb_scout_section_header_14, #imdb_scout_section_header_15, \
          #imdb_scout_section_header_16 { \
             background:   #00ab00 !important; \
             color:          black !important; \
             font-weight:     bold !important; \
             border:           0px !important; \
             padding-left:     0px !important; \
             text-align:    middle !important;}\
          .field_label { \
             display:         flex !important; \
             align-items:   center !important; \
             font-weight:   normal !important;}\
          .config_var { \
             margin-top:       2px !important; \
             margin-bottom:    2px !important; \
             display:         flex !important; \
             align-items:   center !important;}\
          #imdb_scout_aftertitle_var { \
             margin-top:       0px !important; \
             margin-bottom:    0px !important;}\
          input { \
             margin-top:       0px !important; \
             margin-bottom:    0px !important;}\
          .grey_link { \
             margin-left:      4px !important;}\
          #imdb_scout_section_header_0 { \
             font-weight:     bold !important; \
             border:           0px !important; \
             margin-top:       0px !important; \
             background:   #bfbfbf !important;}\
          #imdb_scout_header { \
             background:     black !important; \
             color:          white !important;}\
          #imdb_scout_section_0 { \
             margin-top:       0px !important;}',
  'events':
  {
    'open': function() {
      // Iframe position.
      this.frame.style.top    = '50px';
      this.frame.style.left   = 'auto';
      this.frame.style.right  = '150px';
      this.frame.style.height = '90%';
      this.frame.style.width  = '450px';

      $('#imdb_scout').contents().find('input#imdb_scout_field_highlight_sites_movie').attr('size', '35');
      $('#imdb_scout').contents().find('input#imdb_scout_field_highlight_missing_movie').attr('size', '35');
      $('#imdb_scout').contents().find('input#imdb_scout_field_highlight_sites_search').attr('size', '35');
      $('#imdb_scout').contents().find('input#imdb_scout_field_highlight_missing_search').attr('size', '35');
      $('#imdb_scout').contents().find('input#imdb_scout_field_cfg_icons_size').attr('size', '1');
      $('#imdb_scout').contents().find('input#imdb_scout_field_radarr_customprofileid').attr('size', '1');
      $('#imdb_scout').contents().find('input#imdb_scout_field_sonarr_customprofileid').attr('size', '1');
      $('#imdb_scout').contents().find('input#imdb_scout_field_sonarr_languageprofileid').attr('size', '1');

      const modVersion = 'IMDb Scout Mod v' + GM.info.script.version;
      const modUrl = 'https://greasyfork.org/en/scripts/407284-imdb-scout-mod';
      $('#imdb_scout').contents().find('#imdb_scout_section_header_0').append($('<a href="'+modUrl+'" target ="_blank">'+modVersion+'</a>'));
      $('#imdb_scout').contents().find('#imdb_scout_section_header_0').find('a').css({
       'text-decoration': 'none',
       'color': '#cb0000'
      });

      $('#imdb_scout').contents().find('#imdb_scout_section_7').find('.field_label').each(function(index, label) {
        var url = new URL(custom_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(custom_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_8').find('.field_label').each(function(index, label) {
        var url = new URL(public_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(public_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_9').find('.field_label').each(function(index, label) {
        var url = new URL(private_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(private_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_10').find('.field_label').each(function(index, label) {
        var url = new URL(usenet_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(usenet_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_11').find('.field_label').each(function(index, label) {
        var url = new URL(subs_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(subs_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_12').find('.field_label').each(function(index, label) {
        var url = new URL(pre_databases[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(pre_databases[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_13').find('.field_label').each(function(index, label) {
        var url = new URL(other_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(other_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_14').find('.field_label').each(function(index, label) {
        var url = new URL(streaming_sites[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(streaming_sites[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_15').find('.field_label').each(function(index, label) {
        var url = new URL(icon_sites_main[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(icon_sites_main[index], true));
      });
      $('#imdb_scout').contents().find('#imdb_scout_section_16').find('.field_label').each(function(index, label) {
        var url = new URL(special_buttons[index].searchUrl);
        $(label).append(' ' + '<a class="grey_link" target="_blank" style="color: gray; text-decoration : none" href="' + url.origin + '">'
                        + (/www./.test(url.hostname) ? url.hostname.match(/www.(.*)/)[1] : url.hostname) + '</a>');
        $(label).prepend(getFavicon(special_buttons[index], true));
      });

      $('#imdb_scout').contents().find("img").css({"margin-right": "4px"});
    },

    'close': function() {
      location.reload();
    }
  }
});

GM.registerMenuCommand('IMDb Scout Mod Settings', function() {GM_config.open();});

//==============================================================================
//    Fetch per-site values from GM_config
//==============================================================================

$.each(sites, function(index, site) {
  site['show'] = GM_config.get(configName(site));
});

$.each(icon_sites, function(index, icon_site) {
  icon_site['show'] = GM_config.get('show_icon_' + icon_site['name']);
});

//==============================================================================
//    Global variables
//==============================================================================

// For internal use (order matters).
const valid_states = [
  'found',
  'missing',
  'logged_out',
  'error'
];

// Are we on a search/list page?
const onSearchPage = Boolean(location.href.match('/search/'))
                  || Boolean(location.href.match('/list/'))
                  || Boolean(location.href.match('watchlist'));

// Globals for the sorting launcher.
var showSitezFirstBar = 0;
var sortReqOnNewLineTemp = false;

// Trakt auth code?
const traktCodePage = Boolean(location.href.match(/tt0052077\/\?code=/));

//==============================================================================
//    Remove ads from IMDb
//==============================================================================

//oldlayout
function adsRemovalOld() {
  $('#top_ad_wrapper').remove();
  $('#top_rhs_wrapper').remove();
  $('.pro_logo_main_title').remove();
  $('#promoted-partner-bar').remove();
}

//==============================================================================
//    Start: Display 'Load' button or add links to sites
//==============================================================================

function startIMDbScout() {
  if (traktCodePage) {
    traktCatchToken();
    return;
  }
  if (!onSearchPage && GM_config.get('loadmod_on_start_movie')) {
    performPage();
  } else if (onSearchPage && GM_config.get('loadmod_on_start_search')) {
    performSearch();
  } else {
    displayButton();
  }
}

if ($('html[xmlns\\:og="http://ogp.me/ns#"]').length) {
  window.addEventListener('DOMContentLoaded', adsRemovalOld);
  window.addEventListener('DOMContentLoaded', startIMDbScout);
} else {
  window.addEventListener('load', startIMDbScout);
}
