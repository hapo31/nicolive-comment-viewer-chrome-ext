export default interface NicoliveEmbeddedData {
  site: Site2;
  user: User;
  program: Program2;
  socialGroup: SocialGroup;
  wall: Substitute;
  player: Player2;
  ad: Ad2;
  assets: Assets;
  nicoEnquete: NicoEnquete;
  ichiba: NicoEnquete;
  community: Community;
  communityFollower: CommunityFollower;
}

interface CommunityFollower {
  records: FollowerRecord[];
}

interface FollowerRecord {
  communityId: string;
  userId: string;
}

interface Community {
  id: string;
  followPageUrl: string;
  unfollowPageUrl: string;
}

interface NicoEnquete {
  isEnabled: boolean;
}

interface Assets {
  images: Images;
  scripts: Scripts;
  stylesheets: Stylesheets;
  swfs: Swfs;
  vendor: Vendor;
}

interface Vendor {
  common: Common3;
}

interface Common3 {
  eventemitter: Eventemitter2;
  facebook_sdk: Eventemitter;
  hlsjs: Hlsjs;
  ichiba: Ichiba3;
  "input-mode-checker": Eventemitter;
  lato: Lato;
  leo: Leo;
  lodash: Lodash;
  nicoheader: Nicoheader;
  placeholders: Eventemitter;
  polyfill: Polyfill;
  react: React;
  statuses: Statuses;
  swfobject: Swfobject;
}

interface Swfobject {
  swfobject: Eventemitter;
}

interface Statuses {
  statuses: Eventemitter;
}

interface React {
  "react-dom": Eventemitter;
  "react-dom_16_2_0": Eventemitter;
  "react-transition-group_2_2_1": Eventemitter;
  "react-with-addons": Eventemitter;
  react_16_2_0: Eventemitter;
}

interface Polyfill {
  "browser-polyfill": Eventemitter;
  "es5-shim": Eventemitter;
  "es6-promise": Eventemitter;
  html5shiv: Eventemitter;
}

interface Nicoheader {
  "nicolib-CommonNotificationHeader": Eventemitter;
  resources: Resources;
  siteHeader: Eventemitter;
}

interface Resources {
  arrow: Btnfeedback;
  bg_notification: Btnfeedback;
  btn_switch: Btnfeedback;
  icon_niconico: Btnfeedback;
  "nicolib-CommonNotificationHeader": Ichiba22;
  "nicolive-modified": Ichiba22;
  nicopo_add: Btnfeedback;
  siteHeader: Ichiba22;
  "siteheader-optionbutton": Btnfeedback;
  tooltip: Btnfeedback;
}

interface Lodash {
  lodash: Eventemitter;
}

interface Leo {
  community_program_ended_guide: Btnfeedback;
  fullscreen: Fullscreen;
}

interface Fullscreen {
  css: string;
  js: string;
}

interface Lato {
  "latolatin-bold": Latolatinbold;
  "latolatin-regular": Latolatinbold;
}

interface Latolatinbold {
  woff: string;
  woff2: string;
  ttf: string;
}

interface Ichiba3 {
  ichiba_2: Ichiba22;
  ichiba_vanilla: Eventemitter;
  img: Ichiba2;
}

interface Ichiba22 {
  css: string;
}

interface Hlsjs {
  hls: Eventemitter;
}

interface Eventemitter2 {
  eventemitter: Eventemitter;
}

interface Eventemitter {
  js: string;
}

interface Swfs {
  common: Common2;
}

interface Common2 {
  "aries-player": Ariesplayer;
  "external-player": Externalplayer;
}

interface Externalplayer {
  RtmpStreamPlayer: AriesBroadcaster;
}

interface Ariesplayer {
  AriesBroadcaster: AriesBroadcaster;
  AriesPlayer: AriesBroadcaster;
  HDSModule: AriesBroadcaster;
  MessageserverConnector: AriesBroadcaster;
  ResizablePlayer: AriesBroadcaster;
}

interface AriesBroadcaster {
  swf: string;
}

interface Stylesheets {
  "pc-watch.all": string;
}

interface Scripts {
  "pc-watch": string;
  "operator-tools": string;
  "pc-watch.all": string;
  common: string;
  polyfill: string;
  nicoheader: string;
  ichiba: string;
}

interface Images {
  common: Common;
  nicoex: Nicoex;
}

interface Nicoex {
  "bnr_broadcast-setting-nle-download": Btnfeedback;
  "bnr_broadcast-setting-nle-startup": Btnfeedback;
  colorbars: Facebookicon;
}

interface Common {
  base: Base;
  module: Module;
  program_provider: Programprovider;
  resizable: Resizable;
  tag_report: Tagreport;
  watch: Watch;
}

interface Watch {
  audience_mail: Audiencemail;
  banner: Banner2;
  bourbon: Bourbon;
  comment_ban: Commentban;
  creator: Creator;
  ichiba_2: Ichiba2;
  otayori: Otayori;
  svg: Svg;
  tag: Tag3;
  title: Title;
  zapping: Zapping2;
}

interface Zapping2 {
  zapping_sprite: Btnfeedback;
}

interface Title {
  provider_icon_sprite: Btnfeedback;
  sprite_color: Btnfeedback;
}

interface Tag3 {
  exist_nicopedia: Facebookicon;
  non_nicopedia: Facebookicon;
  tag_sprite: Btnfeedback;
}

interface Svg {
  Adobe_Flash_Player: Facebookicon;
  html5: Facebookicon;
  tvchan_fill_white: Facebookicon;
}

interface Otayori {
  otayori_splite: Btnfeedback;
}

interface Ichiba2 {
  bgBlomaga: Btnfeedback;
  bgBlomagaArticle: Btnfeedback;
  bgBlomagaArticleNP: Btnfeedback;
  bgBlomagaNP: Btnfeedback;
  bg_submit: Btnfeedback;
  bpn_fkd_v2: Btnfeedback;
  bpn_noimage_big: Background;
  bpn_noimage_sml: Background;
  bpn_rating_big: Background;
  bpn_rating_sml: Background;
  btn_go_ichiba: Btnfeedback;
  icon_mat: Btnfeedback;
  icon_pia: Btnfeedback;
  search: Search;
}

interface Search {
  bpn_tab_0: Btnfeedback;
  bpn_tab_1: Btnfeedback;
  bpn_tab_bg: Btnfeedback;
}

interface Creator {
  creator_btn_icon: Btnfeedback;
}

interface Commentban {
  icon_ban: Btnfeedback;
}

interface Bourbon {
  bourbon_background: Btnfeedback;
}

interface Banner2 {
  "bnr_broadcast-setting-nle-download": Btnfeedback;
  "bnr_broadcast-setting-nle-startup": Btnfeedback;
  bnr_premium_player_sp: Bnrpremiumplayersp;
}

interface Bnrpremiumplayersp {
  gif: string;
}

interface Audiencemail {
  mail_icon: Btnfeedback;
}

interface Tagreport {
  select_arrow: Btnfeedback;
}

interface Resizable {
  country_restricted: Btnfeedback;
}

interface Programprovider {
  background: Background;
  form_meter_cover: Facebookicon;
  form_select_arrow: Facebookicon;
  icon_volume_mic: Facebookicon;
  nle_bn_download: Btnfeedback;
  nle_bn_starting: Btnfeedback;
}

interface Background {
  jpg: string;
}

interface Module {
  arrows: Btnfeedback;
  tag_icons: Btnfeedback;
}

interface Base {
  btn_feedback: Btnfeedback;
  favicon: Favicon;
  footer_arrow: Btnfeedback;
  glass: Btnfeedback;
  icon: Icon;
  line_button: Btnfeedback;
  logo: Logo;
  "notification-bar-icon": Btnfeedback;
  pagetop_arrow: Btnfeedback;
  sns_sprite: Btnfeedback;
}

interface Logo {
  png: string;
  svg: string;
}

interface Icon {
  facebook_icon: Facebookicon;
  follow_check: Facebookicon;
  follow_check_white: Facebookicon;
  follow_white: Facebookicon;
  line_icon: Facebookicon;
  shares_icon: Facebookicon;
  twitter_icon: Facebookicon;
}

interface Facebookicon {
  svg: string;
}

interface Favicon {
  ico: string;
}

interface Btnfeedback {
  png: string;
}

interface Ad2 {
  isSiteHeaderBannerEnabled: boolean;
  isSideWallEnabled: boolean;
  isProgramInformationEnabled: boolean;
  isFooterEnabled: boolean;
}

interface Player2 {
  name: string;
  audienceToken: string;
  isJumpDisabled: boolean;
  disablePlayVideoAd: boolean;
  isRestrictedCommentPost: boolean;
  enableClientLog: boolean;
  programEventState: ProgramEventState;
  streamAllocationType: string;
}

interface ProgramEventState {
  commentLocked: boolean;
  audienceCommentLayout: string;
}

interface SocialGroup {
  type: string;
  id: string;
  broadcastHistoryPageUrl: string;
  description: string;
  name: string;
  socialGroupPageUrl: string;
  thumbnailImageUrl: string;
  thumbnailSmallImageUrl: string;
  level: number;
}

interface Program2 {
  nicoliveProgramId: string;
  reliveProgramId: string;
  broadcastId: string;
  providerType: string;
  visualProviderType: string;
  title: string;
  thumbnail: Thumbnail;
  supplier: Supplier;
  openTime: number;
  beginTime: number;
  endTime: number;
  scheduledEndTime: number;
  status: string;
  description: string;
  substitute: Substitute;
  tag: Tag2;
  links: Links;
  player: Player;
  watchPageUrl: string;
  mediaServerType: string;
  isEnabledHtml5Player: boolean;
  isPrivate: boolean;
  isSdk: boolean;
  zapping: Zapping;
  report: Report;
  userAd: UserAd2;
  isFollowerOnly: boolean;
}

interface UserAd2 {
  advertisingPoint: number;
  place: Place;
}

interface Place {
  pageUrl: string;
  historyPageUrl: string;
}

interface Report {
  imageApiUrl: string;
}

interface Zapping {
  listApiUrl: string;
  listUpdateIntervalMs: number;
}

interface Player {
  embedUrl: string;
  banner: Banner;
}

interface Banner {
  apiUrl: string;
}

interface Links {
  feedbackPageUrl: string;
  commentReportPageUrl: string;
  flashPlayerWatchPageUrl: string;
  html5PlayerWatchPageUrl: string;
  contentsTreePageUrl: string;
  programReportPageUrl: string;
  tagReportPageUrl: string;
}

interface Tag2 {
  list: List[];
  apiUrl: string;
  registerApiUrl: string;
  deleteApiUrl: string;
  apiToken: string;
  isLocked: boolean;
}

interface List {
  text: string;
  existsNicopediaArticle: boolean;
  nicopediaArticlePageUrlPath: string;
  type: string;
  isLocked: boolean;
  isDeletable: boolean;
}

// tslint:disable-next-line:no-empty-interface
interface Substitute {}

interface Supplier {
  name: string;
  pageUrl: string;
  nicopediaArticle: NicopediaArticle;
}

interface NicopediaArticle {
  pageUrl: string;
  exists: boolean;
}

interface Thumbnail {
  imageUrl: string;
}

interface User {
  id: string;
  nickname: string;
  isLoggedIn: boolean;
  accountType: string;
  isOperator: boolean;
  isBroadcaster: boolean;
  premiumOrigin: string;
  permissions: any[];
}

interface Site2 {
  locale: string;
  serverTime: number;
  apiBaseUrl: string;
  staticResourceBaseUrl: string;
  topPageUrl: string;
  editstreamPageUrl: string;
  historyPageUrl: string;
  myPageUrl: string;
  rankingPageUrl: string;
  searchPageUrl: string;
  familyService: FamilyService;
  environments: Environments;
  relive: Relive;
  information: Information;
  rule: Rule;
  spec: Spec;
  ad: Ad;
  program: Program;
  tag: Tag;
  coe: Coe;
  commonHeader: CommonHeader;
  notify: Notify;
  timeshift: Timeshift;
  broadcast: Broadcast;
  userAd: UserAd;
  enquete: Enquete;
  trialWatch: Enquete;
  videoQuote: Enquete;
  autoExtend: Enquete;
}

interface Enquete {
  usageHelpPageUrl: string;
}

interface UserAd {
  campaign: Campaign;
}

interface Campaign {
  message: string;
  pageUrl: string;
}

interface Broadcast {
  usageHelpPageUrl: string;
  stableBroadcastHelpPageUrl: string;
  niconicoLiveEncoder: NiconicoLiveEncoder;
  broadcasterStreamHelpPageUrl: string;
}

interface NiconicoLiveEncoder {
  downloadUrl: string;
}

interface Timeshift {
  reservationDetailListApiUrl: string;
}

interface Notify {
  unreadApiUrl: string;
  contentApiUrl: string;
  updateUnreadIntervalMs: number;
}

interface CommonHeader {
  siteId: string;
  apiKey: string;
  apiDate: string;
  apiVersion: string;
  jsonpUrl: string;
}

interface Coe {
  resourcesBaseUrl: string;
}

interface Tag {
  suggestionApiUrl: string;
  revisionCheckIntervalMs: number;
  registerHelpPageUrl: string;
  userRegistrableMax: number;
  textMaxLength: number;
}

interface Program {
  liveCount: number;
}

interface Ad {
  adsApiBaseUrl: string;
}

interface Spec {
  watchUsageAndDevicePageUrl: string;
  broadcastUsageDevicePageUrl: string;
}

interface Rule {
  agreementPageUrl: string;
  guidelinePageUrl: string;
}

interface Information {
  html5PlayerInformationPageUrl: string;
  flashPlayerInstallInformationPageUrl: string;
}

interface Relive {
  apiBaseUrl: string;
  webSocketUrl: string;
  csrfToken: string;
}

interface Environments {
  runningMode: string;
}

interface FamilyService {
  account: Account;
  app: App;
  atsumaru: App;
  blomaga: App;
  channel: Channel;
  commons: App;
  community: App;
  denfaminicogamer: App;
  dic: App;
  help: Help;
  ichiba: Ichiba;
  jk: App;
  mastodon: App;
  matome: App;
  news: App;
  nicoad: App;
  niconare: App;
  niconico: App;
  point: Point;
  seiga: App;
  site: Site;
  solid: App;
  uad: App;
  video: Video;
  bbs: Bbs;
  rightsControlProgram: RightsControlProgram;
  licenseSearch: RightsControlProgram;
  info: Info;
}

interface Info {
  warnForPhishingPageUrl: string;
  smartphoneSdkPageUrl: string;
  nintendoGuidelinePageUrl: string;
}

interface RightsControlProgram {
  pageUrl: string;
}

interface Bbs {
  requestPageUrl: string;
}

interface Video {
  topPageUrl: string;
  myPageUrl: string;
}

interface Site {
  serviceListPageUrl: string;
  salesAdvertisingPageUrl: string;
}

interface Point {
  topPageUrl: string;
  purchasePageUrl: string;
}

interface Ichiba {
  configBaseUrl: string;
  scriptUrl: string;
  topPageUrl: string;
}

interface Help {
  liveHelpPageUrl: string;
  systemRequirementsPageUrl: string;
}

interface Channel {
  topPageUrl: string;
  forOrganizationAndCompanyPageUrl: string;
}

interface App {
  topPageUrl: string;
}

interface Account {
  loginPageUrl: string;
  logoutPageUrl: string;
  accountRegistrationPageUrl: string;
  premiumMemberRegistrationPageUrl: string;
  trackingParams: TrackingParams;
}

interface TrackingParams {
  siteId: string;
  pageId: string;
  mode: string;
  programStatus: string;
}
