import "server-only";
import { put, del } from "@vercel/blob";
import { imageUploadMetaSchema, type ImageUploadMeta } from "@/lib/validation";

/**
 * Upload an image to Vercel Blob.
 * Only server-side. Never call from a client component.
 */
export async function uploadProductImage(
  file: File,
  productSlug: string,
): Promise<{ url: string; pathname: string }> {
  const meta: ImageUploadMeta = imageUploadMetaSchema.parse({
    filename: file.name,
    contentType: file.type,
    size: file.size,
  });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }

  const ext = meta.contentType.split("/")[1];
  const safeSlug = productSlug.replace(/[^a-z0-9-]/g, "");
  const pathname = `products/${safeSlug}/${Date.now()}.${ext}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: meta.contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return { url: blob.url, pathname: blob.pathname };
}

/**
 * Delete a blob by its URL.
 */
export async function deleteBlobByUrl(url: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }
  await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
}
