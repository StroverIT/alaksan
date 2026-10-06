import type { TSiteIconName } from "@/components/SiteIcon/types";

export const CONTENT = {
  siteNameLabel: "Alaksan",
  siteTaglineLabel: "Професионално рязане на дунапрен по размер",
  skipToContentLabel: "Към съдържанието",
  heroTitleLabel: "Дунапрен, изрязан точно по вашия размер",
  heroDescriptionLabel:
    "Матраци, възглавници, мебели, шумоизолация и индустриални детайли. Единични и серийни поръчки от цех в Ловеч, с доставка в цяла България.",
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
  workshop: "/images/1000016387-1-1024x683.png",
  workshopAltLabel: "CNC машина реже блок дунапрен в цеха на Alaksan",
} as const;

export const HERO_TRUST: readonly {
  icon: TSiteIconName;
  label: string;
}[] = [
  { icon: "pin", label: "Цех в Ловеч" },
  { icon: "delivery", label: "Доставка в цялата страна" },
  { icon: "custom", label: "Всеки размер и форма" },
];

export const FEATURES: readonly {
  titleLabel: string;
  descriptionLabel: string;
  icon: TSiteIconName;
}[] = [
  {
    titleLabel: "Прецизно рязане",
    descriptionLabel: "Рязане на дунапрен с висока точност за серийно и единично производство.",
    icon: "precision",
  },
  {
    titleLabel: "Бърза доставка",
    descriptionLabel: "Доставка в цялата страна до обект на фирмата или до адрес.",
    icon: "delivery",
  },
  {
    titleLabel: "Поръчка по размер",
    descriptionLabel: "Изработваме всеки размер и форма по задание на клиента.",
    icon: "custom",
  },
  {
    titleLabel: "Гарантирано качество",
    descriptionLabel: "Богат избор дунапрени за всяко приложение — от мебели до индустрия.",
    icon: "quality",
  },
];

export const HOME_CONTENT = {
  productsEyebrowLabel: "Нашите продукти",
  productsTitleLabel: "Решения за индустрията и дома",
  productsDescriptionLabel:
    "Изберете направление или изпратете собствен размер. Цената се потвърждава с оферта.",
  categoryCtaLabel: "Научи повече",
  whyTitleLabel: "Защо да изберете Alaksan",
  whyDescriptionLabel:
    "Работим с европейски сертифицирани материали и режещо оборудване, което държи зададения размер. Отговаряме с цена и срок, преди да започнем изработката.",
  whyCtaLabel: "Поръчка по размер",
  stepsTitleLabel: "Поръчката при нас е лесна",
  stepsDescriptionLabel: "Четири стъпки до готовия продукт",
  galleryTitleLabel: "Наши изделия",
  galleryDescriptionLabel: "Матраци, възглавници и детайли, изрязани в нашия цех.",
  closingTitleLabel: "Изпратете размерите — ще върнем оферта",
  closingDescriptionLabel: "Скица, снимка или три числа са достатъчни, за да започнем.",
  closingPrimaryLabel: "Към конфигуратора",
  closingSecondaryLabel: "Обадете се",
} as const;

export const GALLERY_ITEMS = [
  {
    src: "/images/1000016387-1-1024x683.png",
    altLabel: "CNC машина реже блок дунапрен по чертеж",
    captionLabel: "Рязане по размер",
  },
  {
    src: "/images/1000016354-1-1024x683.png",
    altLabel: "Бял матрак с капитонирана повърхност",
    captionLabel: "Матраци",
  },
  {
    src: "/images/1000016359-1024x683.png",
    altLabel: "Възглавници и дунапренена сърцевина",
    captionLabel: "Възглавници",
  },
  {
    src: "/images/1000016358-1024x683.png",
    altLabel: "Дунапрен, изрязан по контур на режеща машина",
    captionLabel: "Детайли по форма",
  },
  {
    src: "/images/1000016383-1-1024x683.png",
    altLabel: "Складирани листове дунапрен в различни плътности",
    captionLabel: "Материали",
  },
  {
    src: "/images/1000016384-2-1024x683.png",
    altLabel: "Две бели декоративни възглавници",
    captionLabel: "Тапицерия",
  },
  {
    src: "/images/1000016360-1024x683.png",
    altLabel: "Студио с акустични панели от дунапрен",
    captionLabel: "Шумоизолация",
  },
] as const;

export const SHOP_CONTENT = {
  eyebrowLabel: "Продукти",
  titleLabel: "Магазин",
  descriptionLabel:
    "Изберете продукт и задайте размер. Заявката е без онлайн плащане — потвърждаваме цена и срок преди изработка.",
  emptyLabel: "В момента няма активни продукти.",
  breadcrumbLabel: "Магазин",
} as const;

export const PRODUCT_CATEGORIES = [
  {
    titleLabel: "Дунапрен по размер",
    descriptionLabel: "Рязане по зададени размери и форми",
    href: "/magazin/dunapreni-po-razmer",
    image: "/images/1000016358-1024x683.png",
  },
  {
    titleLabel: "Калъфи за матраци",
    descriptionLabel: "Калъфи по индивидуални размери",
    href: "/magazin/kalafi-za-matraci",
    image: "/images/1000016354-1-1024x683.png",
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
    href: "/magazin/shumoizolacia",
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
