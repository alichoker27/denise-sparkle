import { z } from "zod";

// ---------- Category ----------
export const categoryInputSchema = z.object({
  name: z.string().min(1).max(80),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});
export type CategoryInput = z.infer<typeof categoryInputSchema>;

// ---------- Product ----------
export const productStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const productInputSchema = z.object({
  categorySlug: z.string().min(1),
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  description: z.string().max(2000).nullable().default(null),
  benefits: z.string().max(2000).nullable().default(null),
  ingredients: z.string().max(2000).nullable().default(null),
  priceCents: z.number().int().min(0),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  status: productStatusSchema.default("DRAFT"),
});
export type ProductInput = z.infer<typeof productInputSchema>;

// ---------- Scent ----------
export const scentInputSchema = z.object({
  name: z.string().min(1).max(80),
  nameAr: z.string().max(80).nullable().default(null),
});
export type ScentInput = z.infer<typeof scentInputSchema>;

// ---------- Bundle ----------
export const bundleItemInputSchema = z.object({
  productSlug: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const bundleInputSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(2000).nullable().default(null),
  priceCents: z.number().int().min(0),
  imageUrl: z.string().url().nullable().default(null),
  isAvailable: z.boolean().default(true),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  items: z
    .array(bundleItemInputSchema)
    .min(1, "A bundle needs at least 1 product"),
});
export type BundleInput = z.infer<typeof bundleInputSchema>;

// ---------- Discount ----------
export const discountScopeSchema = z.enum(["GLOBAL", "CATEGORY", "PRODUCT"]);

export const discountInputSchema = z
  .object({
    name: z.string().min(1).max(120),
    percentage: z.number().int().min(1).max(100),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    scope: discountScopeSchema,
    categorySlug: z.string().nullable().default(null),
    productSlug: z.string().nullable().default(null),
    isEnabled: z.boolean().default(true),
  })
  .refine((d) => d.endsAt > d.startsAt, {
    message: "endsAt must be after startsAt",
    path: ["endsAt"],
  })
  .refine((d) => d.scope !== "CATEGORY" || !!d.categorySlug, {
    message: "CATEGORY discount needs categorySlug",
    path: ["categorySlug"],
  })
  .refine((d) => d.scope !== "PRODUCT" || !!d.productSlug, {
    message: "PRODUCT discount needs productSlug",
    path: ["productSlug"],
  });
export type DiscountInput = z.infer<typeof discountInputSchema>;

// ---------- First Purchase Offer ----------
export const firstPurchaseOfferInputSchema = z
  .object({
    percentage: z.number().int().min(1).max(100).default(10),
    message: z.string().min(1).max(300),
    isEnabled: z.boolean().default(true),
    startsAt: z.coerce.date().nullable().default(null),
    endsAt: z.coerce.date().nullable().default(null),
  })
  .refine((d) => !d.startsAt || !d.endsAt || d.endsAt > d.startsAt, {
    message: "endsAt must be after startsAt",
    path: ["endsAt"],
  });
export type FirstPurchaseOfferInput = z.infer<
  typeof firstPurchaseOfferInputSchema
>;

// ---------- Image upload ----------
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export const imageUploadMetaSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.enum(ALLOWED_IMAGE_TYPES),
  size: z.number().int().min(1).max(MAX_IMAGE_BYTES),
});
export type ImageUploadMeta = z.infer<typeof imageUploadMetaSchema>;
