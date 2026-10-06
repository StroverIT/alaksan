import {
  CustomerType,
  LineItemKind,
  OrderStatus,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

type TDemoLineItem = {
  kind: "CUSTOM_FOAM" | "CATALOG_PRODUCT";
  foamCode?: string;
  productSlug?: string;
  lengthCm?: number;
  widthCm?: number;
  thicknessCm?: number;
  quantity: number;
  notes?: string;
};

type TDemoOrder = {
  createdAt: Date;
  status: OrderStatus;
  customerType: CustomerType;
  contactName: string;
  email?: string;
  phone: string;
  companyName?: string;
  companyId?: string;
  vatNumber?: string;
  address: string;
  city: string;
  notes?: string;
  items: TDemoLineItem[];
};

const DEMO_ORDERS: TDemoOrder[] = [
  // —— Септември 2026 (минал месец) ——
  {
    createdAt: new Date("2026-09-02T09:15:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Иван Петров",
    email: "ivan.petrov@email.bg",
    phone: "0888123456",
    address: "ул. Витоша 12",
    city: "София",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 200,
        widthCm: 90,
        thicknessCm: 10,
        quantity: 2,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-04T14:30:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.COMPANY,
    contactName: "Мария Димитрова",
    email: "office@mebelstyle.bg",
    phone: "029876543",
    companyName: "Мебел Стил ООД",
    companyId: "123456789",
    vatNumber: "BG123456789",
    address: "бул. Цариградско шосе 115",
    city: "София",
    notes: "Доставка до склад, вход Б",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 180,
        widthCm: 60,
        thicknessCm: 8,
        quantity: 12,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-45",
        lengthCm: 100,
        widthCm: 50,
        thicknessCm: 5,
        quantity: 8,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-07T11:00:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Георги Николов",
    phone: "0897111222",
    address: "ул. Марица 5",
    city: "Пловдив",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "MEM-REF",
        lengthCm: 200,
        widthCm: 160,
        thicknessCm: 15,
        quantity: 1,
        notes: "За матрак",
      },
    ],
  },
  {
    createdAt: new Date("2026-09-10T16:45:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.COMPANY,
    contactName: "Петър Стоянов",
    email: "orders@acousticpro.bg",
    phone: "0888555666",
    companyName: "Акустик Про ЕООД",
    companyId: "987654321",
    vatNumber: "BG987654321",
    address: "ул. Индустриална 22",
    city: "Варна",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "ACOUSTIC",
        lengthCm: 100,
        widthCm: 50,
        thicknessCm: 5,
        quantity: 40,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "ACOUSTIC",
        lengthCm: 50,
        widthCm: 50,
        thicknessCm: 3,
        quantity: 20,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-12T10:20:00"),
    status: OrderStatus.CANCELLED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Елена Василева",
    email: "elena.v@abv.bg",
    phone: "0877000111",
    address: "ул. Христо Ботев 8",
    city: "Бургас",
    notes: "Клиентът отказа",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 150,
        widthCm: 70,
        thicknessCm: 4,
        quantity: 3,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-15T13:10:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.COMPANY,
    contactName: "Николай Георгиев",
    email: "info@softseat.bg",
    phone: "032655544",
    companyName: "Софт Сийт АД",
    companyId: "201234567",
    address: "ул. Кукленско шосе 14",
    city: "Пловдив",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 120,
        widthCm: 55,
        thicknessCm: 12,
        quantity: 25,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 80,
        widthCm: 40,
        thicknessCm: 6,
        quantity: 15,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-18T08:40:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Стефан Илиев",
    phone: "0888222333",
    address: "ж.к. Младост 3, бл. 312",
    city: "София",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-45",
        lengthCm: 210,
        widthCm: 100,
        thicknessCm: 20,
        quantity: 1,
      },
      {
        kind: "CATALOG_PRODUCT",
        productSlug: "kalafi-za-matraci",
        lengthCm: 210,
        widthCm: 100,
        thicknessCm: 22,
        quantity: 1,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-22T15:00:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Десислава Тодорова",
    email: "desi.todorova@gmail.com",
    phone: "0899444555",
    address: "ул. Славянска 3",
    city: "Стара Загора",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "MEM-REF",
        lengthCm: 70,
        widthCm: 40,
        thicknessCm: 12,
        quantity: 2,
        notes: "Възглавници",
      },
    ],
  },
  {
    createdAt: new Date("2026-09-25T12:25:00"),
    status: OrderStatus.SHIPPED,
    customerType: CustomerType.COMPANY,
    contactName: "Христо Ангелов",
    email: "logistics@furnitech.bg",
    phone: "028811223",
    companyName: "Фърнитех ООД",
    companyId: "175432109",
    vatNumber: "BG175432109",
    address: "ул. Обединение 45",
    city: "Русе",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 160,
        widthCm: 80,
        thicknessCm: 10,
        quantity: 18,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-45",
        lengthCm: 90,
        widthCm: 45,
        thicknessCm: 8,
        quantity: 10,
      },
    ],
  },
  {
    createdAt: new Date("2026-09-28T17:50:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Калина Радева",
    phone: "0877666777",
    address: "ул. Александровска 101",
    city: "Бургас",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 190,
        widthCm: 140,
        thicknessCm: 8,
        quantity: 1,
      },
    ],
  },

  // —— Октомври 2026 (този месец) ——
  {
    createdAt: new Date("2026-10-01T09:05:00"),
    status: OrderStatus.DELIVERED,
    customerType: CustomerType.COMPANY,
    contactName: "Анна Колева",
    email: "anna@designhome.bg",
    phone: "029944556",
    companyName: "Дизайн Хоум ЕООД",
    companyId: "206543210",
    vatNumber: "BG206543210",
    address: "бул. България 88",
    city: "София",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 200,
        widthCm: 100,
        thicknessCm: 12,
        quantity: 6,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "MEM-REF",
        lengthCm: 200,
        widthCm: 90,
        thicknessCm: 15,
        quantity: 2,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-02T11:40:00"),
    status: OrderStatus.SHIPPED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Борис Михайлов",
    email: "boris.m@mail.bg",
    phone: "0888333444",
    address: "ул. Шипка 17",
    city: "Пловдив",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 120,
        widthCm: 60,
        thicknessCm: 5,
        quantity: 4,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-03T14:15:00"),
    status: OrderStatus.IN_PRODUCTION,
    customerType: CustomerType.COMPANY,
    contactName: "Любомир Пенев",
    email: "orders@soundlab.bg",
    phone: "052311122",
    companyName: "Саунд Лаб ООД",
    companyId: "198765432",
    vatNumber: "BG198765432",
    address: "ул. Република 7",
    city: "Варна",
    notes: "Спешно за студио – до 10.10",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "ACOUSTIC",
        lengthCm: 120,
        widthCm: 60,
        thicknessCm: 7,
        quantity: 30,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "ACOUSTIC",
        lengthCm: 100,
        widthCm: 100,
        thicknessCm: 10,
        quantity: 8,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-04T10:00:00"),
    status: OrderStatus.CONFIRMED,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Виктория Христова",
    phone: "0899000111",
    address: "ж.к. Дружба 2, бл. 275",
    city: "София",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "MEM-REF",
        lengthCm: 200,
        widthCm: 160,
        thicknessCm: 18,
        quantity: 1,
      },
      {
        kind: "CATALOG_PRODUCT",
        productSlug: "kalafi-za-matraci",
        lengthCm: 200,
        widthCm: 160,
        thicknessCm: 20,
        quantity: 1,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-04T16:30:00"),
    status: OrderStatus.IN_PRODUCTION,
    customerType: CustomerType.COMPANY,
    contactName: "Димитър Янев",
    email: "d.yanov@seatcraft.bg",
    phone: "032788899",
    companyName: "Сийт Крафт ООД",
    companyId: "131112223",
    address: "Индустриална зона Юг",
    city: "Пловдив",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-45",
        lengthCm: 150,
        widthCm: 50,
        thicknessCm: 10,
        quantity: 20,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 100,
        widthCm: 50,
        thicknessCm: 6,
        quantity: 14,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 50,
        widthCm: 40,
        thicknessCm: 3,
        quantity: 30,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-05T09:50:00"),
    status: OrderStatus.PENDING,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Радослав Костов",
    email: "rado.kostov@yahoo.com",
    phone: "0888777888",
    address: "ул. Васил Левски 42",
    city: "Велико Търново",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 180,
        widthCm: 80,
        thicknessCm: 10,
        quantity: 2,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-05T13:20:00"),
    status: OrderStatus.CONFIRMED,
    customerType: CustomerType.COMPANY,
    contactName: "Силвия Добрева",
    email: "s.dobreva@luxmebel.bg",
    phone: "028899001",
    companyName: "Лукс Мебел АД",
    companyId: "112233445",
    vatNumber: "BG112233445",
    address: "бул. Сливница 250",
    city: "София",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-45",
        lengthCm: 220,
        widthCm: 90,
        thicknessCm: 15,
        quantity: 8,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 60,
        widthCm: 60,
        thicknessCm: 8,
        quantity: 16,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-06T08:15:00"),
    status: OrderStatus.PENDING,
    customerType: CustomerType.INDIVIDUAL,
    contactName: "Мартин Атанасов",
    phone: "0877111222",
    address: "ул. Крайбрежна 9",
    city: "Варна",
    notes: "Моля обадете се преди доставка",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-25",
        lengthCm: 100,
        widthCm: 50,
        thicknessCm: 4,
        quantity: 5,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "ACOUSTIC",
        lengthCm: 80,
        widthCm: 40,
        thicknessCm: 5,
        quantity: 10,
      },
    ],
  },
  {
    createdAt: new Date("2026-10-06T11:45:00"),
    status: OrderStatus.PENDING,
    customerType: CustomerType.COMPANY,
    contactName: "Тодор Белчев",
    email: "todor@profoam.bg",
    phone: "0888666777",
    companyName: "Профоам ЕООД",
    companyId: "209998887",
    vatNumber: "BG209998887",
    address: "ул. Търговска 15",
    city: "Стара Загора",
    items: [
      {
        kind: "CUSTOM_FOAM",
        foamCode: "PU-35",
        lengthCm: 200,
        widthCm: 140,
        thicknessCm: 12,
        quantity: 4,
      },
      {
        kind: "CUSTOM_FOAM",
        foamCode: "MEM-REF",
        lengthCm: 70,
        widthCm: 40,
        thicknessCm: 10,
        quantity: 6,
      },
    ],
  },
];

const main = async () => {
  const foamTypes = await prisma.foamType.findMany();
  const catalogProducts = await prisma.catalogProduct.findMany();

  const foamByCode = new Map(foamTypes.map((f) => [f.code, f]));
  const productBySlug = new Map(catalogProducts.map((p) => [p.slug, p]));

  let created = 0;

  for (const demo of DEMO_ORDERS) {
    await prisma.order.create({
      data: {
        createdAt: demo.createdAt,
        updatedAt: demo.createdAt,
        status: demo.status,
        customerType: demo.customerType,
        contactName: demo.contactName,
        email: demo.email ?? null,
        phone: demo.phone,
        companyName: demo.companyName ?? null,
        companyId: demo.companyId ?? null,
        vatNumber: demo.vatNumber ?? null,
        address: demo.address,
        city: demo.city,
        notes: demo.notes ?? null,
        lineItems: {
          create: demo.items.map((item) => {
            if (item.kind === "CUSTOM_FOAM") {
              const foam = foamByCode.get(item.foamCode!);
              if (!foam) {
                throw new Error(`Missing foam type: ${item.foamCode}`);
              }
              return {
                kind: LineItemKind.CUSTOM_FOAM,
                foamTypeId: foam.id,
                productName: foam.name,
                lengthCm: item.lengthCm,
                widthCm: item.widthCm,
                thicknessCm: item.thicknessCm,
                quantity: item.quantity,
                notes: item.notes ?? null,
              };
            }

            const product = productBySlug.get(item.productSlug!);
            if (!product) {
              throw new Error(`Missing product: ${item.productSlug}`);
            }
            return {
              kind: LineItemKind.CATALOG_PRODUCT,
              catalogProductId: product.id,
              productName: product.name,
              lengthCm: item.lengthCm ?? null,
              widthCm: item.widthCm ?? null,
              thicknessCm: item.thicknessCm ?? null,
              quantity: item.quantity,
              notes: item.notes ?? null,
            };
          }),
        },
      },
    });
    created += 1;
  }

  console.log(`Created ${created} demo orders.`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
