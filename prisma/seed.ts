import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  categoryInputSchema,
  productInputSchema,
  scentInputSchema,
  bundleInputSchema,
  discountInputSchema,
  firstPurchaseOfferInputSchema,
} from "../src/lib/validation";

const adapter = new PrismaNeon({ connectionString: process.env.DIRECT_URL });
const db = new PrismaClient({ adapter });

// ---------- Categories ----------
const categoriesRaw = [
  { name: "Hair Care", slug: "hair-care", sortOrder: 1 },
  { name: "Fragrance", slug: "fragrance", sortOrder: 2 },
  { name: "Beauty Essentials", slug: "beauty-essentials", sortOrder: 3 },
  { name: "Skin Care", slug: "skin-care", sortOrder: 4 },
  { name: "Body Care", slug: "body-care", sortOrder: 5 },
  { name: "Lip Care", slug: "lip-care", sortOrder: 6 },
].map((c) => categoryInputSchema.parse(c));

// ---------- Products ($ → cents) ----------
const productsRaw = [
  {
    categorySlug: "hair-care",
    name: "Hair Mist",
    slug: "hair-mist",
    priceCents: 800,
  },
  {
    categorySlug: "hair-care",
    name: "Hair Growth Serum",
    slug: "hair-growth-serum",
    priceCents: 1000,
  },
  {
    categorySlug: "hair-care",
    name: "Hair Wax",
    slug: "hair-wax",
    priceCents: 600,
  },
  {
    categorySlug: "hair-care",
    name: "Leave-In",
    slug: "leave-in",
    priceCents: 1000,
  },

  {
    categorySlug: "fragrance",
    name: "30ml",
    slug: "fragrance-30ml",
    priceCents: 700,
  },
  {
    categorySlug: "fragrance",
    name: "50ml",
    slug: "fragrance-50ml",
    priceCents: 1200,
  },
  {
    categorySlug: "fragrance",
    name: "Mask",
    slug: "fragrance-mask",
    priceCents: 400,
  },

  {
    categorySlug: "beauty-essentials",
    name: "Nail Hardener",
    slug: "nail-hardener",
    priceCents: 700,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Brow Gel",
    slug: "brow-gel",
    priceCents: 600,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Lash & Brow Booster",
    slug: "lash-brow-booster",
    priceCents: 700,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Massage Lifa Soap",
    slug: "massage-lifa-soap",
    priceCents: 600,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Hand Cream",
    slug: "hand-cream",
    priceCents: 800,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Anti-Sweat",
    slug: "anti-sweat",
    priceCents: 500,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Creamy Tint",
    slug: "creamy-tint",
    priceCents: 500,
  },
  {
    categorySlug: "beauty-essentials",
    name: "Leg Tint",
    slug: "leg-tint",
    priceCents: 800,
  },

  {
    categorySlug: "skin-care",
    name: "Collagen Face Wash",
    slug: "collagen-face-wash",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Moisturizer",
    slug: "moisturizer",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Golden Serum",
    slug: "golden-serum",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Collagen Serum",
    slug: "collagen-serum",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Vitamin C",
    slug: "vitamin-c",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Eye Roll",
    slug: "eye-roll",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Sunscreen",
    slug: "sunscreen",
    priceCents: 1000,
  },
  {
    categorySlug: "skin-care",
    name: "Tinted Sunscreen",
    slug: "tinted-sunscreen",
    priceCents: 1200,
  },
  {
    categorySlug: "skin-care",
    name: "Toner Luban Zakar",
    slug: "toner-luban-zakar",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Soap Luban Zakar",
    slug: "soap-luban-zakar",
    priceCents: 600,
  },
  {
    categorySlug: "skin-care",
    name: "Coffee Scrub",
    slug: "coffee-scrub",
    priceCents: 800,
  },
  {
    categorySlug: "skin-care",
    name: "Coffee Soap",
    slug: "coffee-soap",
    priceCents: 600,
  },

  {
    categorySlug: "body-care",
    name: "Zeyt Saed",
    slug: "zeyt-saed",
    priceCents: 1000,
  },
  {
    categorySlug: "body-care",
    name: "Body Butter",
    slug: "body-butter",
    priceCents: 1000,
  },
  {
    categorySlug: "body-care",
    name: "Body Scrub",
    slug: "body-scrub",
    priceCents: 800,
  },
  {
    categorySlug: "body-care",
    name: "Whitening Scrub",
    slug: "whitening-scrub",
    priceCents: 800,
  },
  {
    categorySlug: "body-care",
    name: "Whitening Cream",
    slug: "whitening-cream",
    priceCents: 800,
  },
  {
    categorySlug: "body-care",
    name: "Glitter Oil",
    slug: "glitter-oil",
    priceCents: 1000,
  },

  {
    categorySlug: "lip-care",
    name: "Lip Balm",
    slug: "lip-balm",
    priceCents: 500,
  },
  {
    categorySlug: "lip-care",
    name: "Lip Scrub",
    slug: "lip-scrub",
    priceCents: 200,
  },
  {
    categorySlug: "lip-care",
    name: "Lip Gloss",
    slug: "lip-gloss",
    priceCents: 500,
  },
].map((p) => productInputSchema.parse({ ...p, status: "PUBLISHED" }));

// ---------- Scents ----------
const scentsRaw = [
  "Oud",
  "Baby Powder",
  "Pheromone",
  "Dove",
  "Passion",
  "Strawberry",
  "Full & Jasmine",
  "Damask Rose",
  "Fruit",
  "Cotton Candy",
  "Coco Vanilla",
  "Coco Vanille",
  "Passion Fruit",
].map((name) => scentInputSchema.parse({ name }));

// ---------- Product ↔ Scent (from Dr's guide) ----------
const productScentsRaw = [
  {
    productSlug: "massage-lifa-soap",
    scentNames: [
      "Oud",
      "Baby Powder",
      "Pheromone",
      "Dove",
      "Passion",
      "Strawberry",
      "Full & Jasmine",
      "Damask Rose",
    ],
  },
  {
    productSlug: "body-butter",
    scentNames: [
      "Pheromone",
      "Strawberry",
      "Fruit",
      "Cotton Candy",
      "Coco Vanilla",
      "Oud",
    ],
  },
  {
    productSlug: "body-scrub",
    scentNames: ["Coco Vanille", "Pheromone", "Cotton Candy"],
  },
  {
    productSlug: "hair-mist",
    scentNames: ["Coco Vanille", "Pheromone", "Cotton Candy", "Passion Fruit"],
  },
];

// ---------- Test bundle ----------
const testBundleRaw = bundleInputSchema.parse({
  name: "Hair Care Starter Set",
  slug: "hair-care-starter-set",
  description: "Test bundle — Hair Mist + Hair Growth Serum",
  priceCents: 1600,
  imageUrl: null,
  isAvailable: true,
  status: "PUBLISHED",
  items: [
    { productSlug: "hair-mist", quantity: 1 },
    { productSlug: "hair-growth-serum", quantity: 1 },
  ],
});

// ---------- Test discount ----------
const testDiscountRaw = discountInputSchema.parse({
  name: "Test 20% Hair Care",
  percentage: 20,
  startsAt: new Date(Date.now() - 60_000),
  endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  scope: "CATEGORY",
  categorySlug: "hair-care",
  productSlug: null,
  isEnabled: true,
});

// ---------- First-purchase offer ----------
const testOfferRaw = firstPurchaseOfferInputSchema.parse({
  percentage: 10,
  message:
    "Get 10% off your first purchase. Denise confirms eligibility on WhatsApp.",
  isEnabled: true,
  startsAt: null,
  endsAt: null,
});

// ---------- Seeder ----------
async function main() {
  console.log("Seeding categories...");
  for (const c of categoriesRaw) {
    await db.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, sortOrder: c.sortOrder, isActive: c.isActive },
      create: c,
    });
  }

  console.log("Seeding scents...");
  for (const s of scentsRaw) {
    await db.scent.upsert({
      where: { name: s.name },
      update: { nameAr: s.nameAr },
      create: s,
    });
  }

  console.log("Seeding products...");
  const categoryMap = new Map(
    (await db.category.findMany()).map((c) => [c.slug, c.id]),
  );
  for (const p of productsRaw) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) throw new Error(`Category not found: ${p.categorySlug}`);
    await db.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        priceCents: p.priceCents,
        categoryId,
        status: p.status,
        isAvailable: p.isAvailable,
        isFeatured: p.isFeatured,
      },
      create: {
        name: p.name,
        slug: p.slug,
        priceCents: p.priceCents,
        categoryId,
        description: p.description,
        benefits: p.benefits,
        ingredients: p.ingredients,
        status: p.status,
        isAvailable: p.isAvailable,
        isFeatured: p.isFeatured,
      },
    });
  }

  console.log("Linking scents to products...");
  const productMap = new Map(
    (await db.product.findMany()).map((p) => [p.slug, p.id]),
  );
  const scentMap = new Map(
    (await db.scent.findMany()).map((s) => [s.name, s.id]),
  );
  for (const link of productScentsRaw) {
    const productId = productMap.get(link.productSlug);
    if (!productId) throw new Error(`Product not found: ${link.productSlug}`);
    for (const scentName of link.scentNames) {
      const scentId = scentMap.get(scentName);
      if (!scentId) throw new Error(`Scent not found: ${scentName}`);
      await db.productScent.upsert({
        where: { productId_scentId: { productId, scentId } },
        update: {},
        create: { productId, scentId },
      });
    }
  }

  console.log("Seeding test bundle...");
  const bundle = await db.bundle.upsert({
    where: { slug: testBundleRaw.slug },
    update: {
      name: testBundleRaw.name,
      description: testBundleRaw.description,
      priceCents: testBundleRaw.priceCents,
      status: testBundleRaw.status,
      isAvailable: testBundleRaw.isAvailable,
    },
    create: {
      name: testBundleRaw.name,
      slug: testBundleRaw.slug,
      description: testBundleRaw.description,
      priceCents: testBundleRaw.priceCents,
      imageUrl: testBundleRaw.imageUrl,
      status: testBundleRaw.status,
      isAvailable: testBundleRaw.isAvailable,
    },
  });
  for (const item of testBundleRaw.items) {
    const productId = productMap.get(item.productSlug);
    if (!productId)
      throw new Error(`Bundle product not found: ${item.productSlug}`);
    await db.bundleItem.upsert({
      where: { bundleId_productId: { bundleId: bundle.id, productId } },
      update: { quantity: item.quantity },
      create: { bundleId: bundle.id, productId, quantity: item.quantity },
    });
  }

  console.log("Seeding test discount...");
  const existingDiscount = await db.discount.findFirst({
    where: { name: testDiscountRaw.name },
  });
  if (!existingDiscount) {
    const catId = testDiscountRaw.categorySlug
      ? categoryMap.get(testDiscountRaw.categorySlug)
      : null;
    await db.discount.create({
      data: {
        name: testDiscountRaw.name,
        percentage: testDiscountRaw.percentage,
        startsAt: testDiscountRaw.startsAt,
        endsAt: testDiscountRaw.endsAt,
        scope: testDiscountRaw.scope,
        categoryId: catId ?? null,
        productId: null,
        isEnabled: testDiscountRaw.isEnabled,
      },
    });
  }

  console.log("Seeding first-purchase offer...");
  const existingOffer = await db.firstPurchaseOffer.findFirst();
  if (!existingOffer) {
    await db.firstPurchaseOffer.create({ data: testOfferRaw });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
