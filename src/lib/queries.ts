import "server-only";
import { connection } from "next/server";
import { db } from "@/lib/db";

// ---------- Categories ----------
export async function listActiveCategories() {
  return db.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

// ---------- Products ----------
export async function listPublishedProducts() {
  return db.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      scents: { include: { scent: true } },
    },
  });
}

export async function listPublishedProductsByCategory(categorySlug: string) {
  return db.product.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: categorySlug, isActive: true },
    },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      scents: { include: { scent: true } },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      scents: { include: { scent: true } },
    },
  });
}

export async function listFeaturedProducts() {
  return db.product.findMany({
    where: { status: "PUBLISHED", isFeatured: true, isAvailable: true },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      scents: { include: { scent: true } },
    },
  });
}

// ---------- Bundles ----------
export async function listPublishedBundles() {
  return db.bundle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: { include: { images: { orderBy: { sortOrder: "asc" } } } },
        },
      },
    },
  });
}

export async function getBundleBySlug(slug: string) {
  return db.bundle.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      items: {
        include: {
          product: { include: { images: { orderBy: { sortOrder: "asc" } } } },
        },
      },
    },
  });
}

// ---------- Discounts (active now) ----------
export async function listActiveDiscounts() {
  // connection() suspends during prerendering so new Date() is evaluated at request time.
  // Required when cacheComponents:true is enabled in next.config.ts.
  await connection();
  const now = new Date();
  return db.discount.findMany({
    where: {
      isEnabled: true,
      startsAt: { lte: now },
      endsAt: { gte: now },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ---------- First purchase offer (active now) ----------
export async function getActiveFirstPurchaseOffer() {
  // connection() suspends during prerendering so new Date() is evaluated at request time.
  // Required when cacheComponents:true is enabled in next.config.ts.
  await connection();
  const now = new Date();
  return db.firstPurchaseOffer.findFirst({
    where: {
      isEnabled: true,
      OR: [{ startsAt: null }, { startsAt: { lte: now } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
    },
    orderBy: { createdAt: "desc" },
  });
}
