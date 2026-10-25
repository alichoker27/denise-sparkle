import "server-only";
import { uploadProductImage, deleteBlobByUrl } from "@/lib/blob";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  productInputSchema,
  bundleInputSchema,
  discountInputSchema,
  firstPurchaseOfferInputSchema,
} from "@/lib/validation";

// ---------- Temporary auth stub ----------
async function requireAdmin() {
  // TODO(Phase 3): replace with real session check
  if (process.env.NODE_ENV === "production") {
    throw new Error("Admin mutations disabled until Phase 3 auth");
  }
}

// ---------- Products ----------
export async function createProduct(raw: unknown) {
  await requireAdmin();
  const input = productInputSchema.parse(raw);

  const category = await db.category.findUnique({
    where: { slug: input.categorySlug },
  });
  if (!category) throw new Error(`Category not found: ${input.categorySlug}`);

  const product = await db.product.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      benefits: input.benefits,
      ingredients: input.ingredients,
      priceCents: input.priceCents,
      isAvailable: input.isAvailable,
      isFeatured: input.isFeatured,
      status: input.status,
      categoryId: category.id,
    },
  });

  revalidatePath("/admin/products");
  return product;
}

export async function updateProduct(id: number, raw: unknown) {
  await requireAdmin();
  const input = productInputSchema.parse(raw);

  const category = await db.category.findUnique({
    where: { slug: input.categorySlug },
  });
  if (!category) throw new Error(`Category not found: ${input.categorySlug}`);

  const product = await db.product.update({
    where: { id },
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      benefits: input.benefits,
      ingredients: input.ingredients,
      priceCents: input.priceCents,
      isAvailable: input.isAvailable,
      isFeatured: input.isFeatured,
      status: input.status,
      categoryId: category.id,
    },
  });

  revalidatePath("/admin/products");
  return product;
}

export async function publishProduct(id: number) {
  await requireAdmin();
  const p = await db.product.update({
    where: { id },
    data: { status: "PUBLISHED" },
  });
  revalidatePath("/admin/products");
  return p;
}

export async function unpublishProduct(id: number) {
  await requireAdmin();
  const p = await db.product.update({
    where: { id },
    data: { status: "DRAFT" },
  });
  revalidatePath("/admin/products");
  return p;
}

export async function deleteProduct(id: number) {
  await requireAdmin();

  // Block deletion if product is inside any bundle
  const usedInBundle = await db.bundleItem.findFirst({
    where: { productId: id },
  });
  if (usedInBundle) {
    throw new Error(
      "Cannot delete: this product is used inside a bundle. Remove it from the bundle first.",
    );
  }

  const p = await db.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  return p;
}

// ---------- Bundles ----------
export async function createBundle(raw: unknown) {
  await requireAdmin();
  const input = bundleInputSchema.parse(raw);

  const products = await db.product.findMany({
    where: { slug: { in: input.items.map((i) => i.productSlug) } },
  });
  const slugToId = new Map(products.map((p) => [p.slug, p.id]));

  for (const item of input.items) {
    if (!slugToId.has(item.productSlug)) {
      throw new Error(`Product not found: ${item.productSlug}`);
    }
  }

  const bundle = await db.bundle.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description,
      priceCents: input.priceCents,
      imageUrl: input.imageUrl,
      isAvailable: input.isAvailable,
      status: input.status,
      items: {
        create: input.items.map((i) => ({
          productId: slugToId.get(i.productSlug)!,
          quantity: i.quantity,
        })),
      },
    },
  });

  revalidatePath("/admin/bundles");
  return bundle;
}

export async function updateBundle(id: number, raw: unknown) {
  await requireAdmin();
  const input = bundleInputSchema.parse(raw);

  const products = await db.product.findMany({
    where: { slug: { in: input.items.map((i) => i.productSlug) } },
  });
  const slugToId = new Map(products.map((p) => [p.slug, p.id]));

  for (const item of input.items) {
    if (!slugToId.has(item.productSlug)) {
      throw new Error(`Product not found: ${item.productSlug}`);
    }
  }

  // Replace items atomically
  const bundle = await db.$transaction(async (tx) => {
    await tx.bundleItem.deleteMany({ where: { bundleId: id } });
    return tx.bundle.update({
      where: { id },
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description,
        priceCents: input.priceCents,
        imageUrl: input.imageUrl,
        isAvailable: input.isAvailable,
        status: input.status,
        items: {
          create: input.items.map((i) => ({
            productId: slugToId.get(i.productSlug)!,
            quantity: i.quantity,
          })),
        },
      },
    });
  });

  revalidatePath("/admin/bundles");
  return bundle;
}

export async function deleteBundle(id: number) {
  await requireAdmin();
  const b = await db.bundle.delete({ where: { id } });
  revalidatePath("/admin/bundles");
  return b;
}

// ---------- Discounts ----------
export async function createDiscount(raw: unknown) {
  await requireAdmin();
  const input = discountInputSchema.parse(raw);

  let categoryId: number | null = null;
  let productId: number | null = null;

  if (input.scope === "CATEGORY" && input.categorySlug) {
    const c = await db.category.findUnique({
      where: { slug: input.categorySlug },
    });
    if (!c) throw new Error(`Category not found: ${input.categorySlug}`);
    categoryId = c.id;
  }
  if (input.scope === "PRODUCT" && input.productSlug) {
    const p = await db.product.findUnique({
      where: { slug: input.productSlug },
    });
    if (!p) throw new Error(`Product not found: ${input.productSlug}`);
    productId = p.id;
  }

  const d = await db.discount.create({
    data: {
      name: input.name,
      percentage: input.percentage,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      scope: input.scope,
      categoryId,
      productId,
      isEnabled: input.isEnabled,
    },
  });

  revalidatePath("/admin/discounts");
  return d;
}

export async function setDiscountEnabled(id: number, isEnabled: boolean) {
  await requireAdmin();
  const d = await db.discount.update({ where: { id }, data: { isEnabled } });
  revalidatePath("/admin/discounts");
  return d;
}

export async function deleteDiscount(id: number) {
  await requireAdmin();
  const d = await db.discount.delete({ where: { id } });
  revalidatePath("/admin/discounts");
  return d;
}

// ---------- First-purchase offer ----------
export async function createFirstPurchaseOffer(raw: unknown) {
  await requireAdmin();
  const input = firstPurchaseOfferInputSchema.parse(raw);
  const offer = await db.firstPurchaseOffer.create({ data: input });
  revalidatePath("/admin/offers");
  return offer;
}

export async function updateFirstPurchaseOffer(id: number, raw: unknown) {
  await requireAdmin();
  const input = firstPurchaseOfferInputSchema.parse(raw);
  const offer = await db.firstPurchaseOffer.update({
    where: { id },
    data: input,
  });
  revalidatePath("/admin/offers");
  return offer;
}

export async function setFirstPurchaseOfferEnabled(
  id: number,
  isEnabled: boolean,
) {
  await requireAdmin();
  const offer = await db.firstPurchaseOffer.update({
    where: { id },
    data: { isEnabled },
  });
  revalidatePath("/admin/offers");
  return offer;
}

export async function uploadProductImageAction(
  productId: number,
  file: File,
  altText: string | null = null,
  isPrimary: boolean = false,
) {
  await requireAdmin();

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error(`Product not found: ${productId}`);

  const { url } = await uploadProductImage(file, product.slug);

  // If this image is primary, demote the current primary
  if (isPrimary) {
    await db.productImage.updateMany({
      where: { productId, isPrimary: true },
      data: { isPrimary: false },
    });
  }

  const image = await db.productImage.create({
    data: {
      productId,
      url,
      altText,
      isPrimary,
      sortOrder: 0,
    },
  });

  revalidatePath("/admin/products");
  return image;
}

export async function deleteProductImageAction(imageId: number) {
  await requireAdmin();

  const image = await db.productImage.findUnique({ where: { id: imageId } });
  if (!image) throw new Error(`Image not found: ${imageId}`);

  // Delete from Blob first
  try {
    await deleteBlobByUrl(image.url);
  } catch {
    // Blob may already be gone — continue with DB cleanup
  }

  await db.productImage.delete({ where: { id: imageId } });
  revalidatePath("/admin/products");
  return { ok: true };
}
