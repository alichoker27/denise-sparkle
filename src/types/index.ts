import type {
  Product,
  Category,
  ProductImage,
  Scent,
  ProductScent,
  Bundle,
  BundleItem,
  Discount,
} from "@/generated/prisma/client";

export type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
  scents: (ProductScent & { scent: Scent })[];
};

export type BundleWithItems = Bundle & {
  items: (BundleItem & { product: Product & { images: ProductImage[] } })[];
};

export type ActiveDiscount = Discount;

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  priceCents: number;
  quantity: number;
};