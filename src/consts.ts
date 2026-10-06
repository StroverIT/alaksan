export const CONTENT = {
  siteNameLabel: "Alaksan",
  siteTaglineLabel: "Професионално рязане на дунапрен по размер",
  heroTitleLabel: "ALAKSAN",
  heroSubtitleLabel: "Изработваме и режем качествен дунапрен",
  heroDescriptionLabel:
    "Матраци, възглавници, мебели, шумоизолация и индустриални решения за фирми и домакинства.",
  heroPrimaryCtaLabel: "Поръчка по размер",
  heroSecondaryCtaLabel: "Получи оферта",
  navHomeLabel: "Начало",
  navShopLabel: "Магазин",
  navConfiguratorLabel: "По размер",
  navAboutLabel: "За нас",
  navContactLabel: "Контакти",
  navCartLabel: "Количка",
  footerRightsLabel: "Всички права запазени.",
  footerPhoneLabel: "Обадете се",
  footerEmailLabel: "Имейл",
};

export const NAV_LINKS = [
  { href: "/", label: CONTENT.navHomeLabel },
  { href: "/magazin", label: CONTENT.navShopLabel },
  { href: "/porachka-po-razmer", label: CONTENT.navConfiguratorLabel },
  { href: "/za-nas", label: CONTENT.navAboutLabel },
  { href: "/kontakti", label: CONTENT.navContactLabel },
] as const;

export const IMAGES = {
  logo: "/images/cropped-1000016271.png",
  hero: "/images/1000016285.png",
  gallery: [
    "/images/1000016354-1-1024x683.png",
    "/images/1000016358-1024x683.png",
    "/images/1000016359-1024x683.png",
    "/images/1000016360-1024x683.png",
    "/images/1000016383-1-1024x683.png",
    "/images/1000016384-2-1024x683.png",
    "/images/1000016387-1-1024x683.png",
  ],
} as const;

export const FEATURES = [
  {
    titleLabel: "Прецизно рязане",
    descriptionLabel: "Рязане на дунапрен с висока точност за серийно и единично производство.",
  },
  {
    titleLabel: "Бърза доставка",
    descriptionLabel: "Доставка в цялата страна до обект на фирмата или до адрес.",
  },
  {
    titleLabel: "Поръчка по размер",
    descriptionLabel: "Изработваме всеки размер и форма по задание на клиента.",
  },
  {
    titleLabel: "Гарантирано качество",
    descriptionLabel: "Богат избор дунапрени за всяко приложение - от мебели до индустрия.",
  },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    titleLabel: "Дунапрен по размер",
    descriptionLabel: "Рязане по зададени размери и форми",
    href: "/magazin/dunapreni-po-razmer",
    image: "/images/1000016354-1-1024x683.png",
  },
  {
    titleLabel: "Калъфи за матраци",
    descriptionLabel: "Калъфи по индивидуални размери",
    href: "/magazin/kalafi-za-matraci",
    image: "/images/1000016358-1024x683.png",
  },
  {
    titleLabel: "Възглавници",
    descriptionLabel: "За сън, мебели и декорация",
    href: "/magazin/vazglavnici",
    image: "/images/1000016359-1024x683.png",
  },
  {
    titleLabel: "Шумоизолация",
    descriptionLabel: "Акустични решения за дом, офис и студио",
    href: "/porachka-po-razmer",
    image: "/images/1000016360-1024x683.png",
  },
] as const;

export const STEPS = [
  {
    titleLabel: "Изпратете размерите",
    descriptionLabel: "Размери, скица или снимка на желания продукт",
  },
  {
    titleLabel: "Получавате оферта",
    descriptionLabel: "Изготвяме цена и срок за изработка",
  },
  {
    titleLabel: "Изработваме",
    descriptionLabel: "Режем прецизно по зададените размери",
  },
  {
    titleLabel: "Доставяме",
    descriptionLabel: "Доставка до всяка точка на България",
  },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Чака обработка",
  CONFIRMED: "Потвърдена",
  IN_PRODUCTION: "В производство",
  SHIPPED: "Изпратена",
  DELIVERED: "Доставена",
  CANCELLED: "Отказана",
};

export const CART_STORAGE_KEY = "alaksan-cart-v1";
