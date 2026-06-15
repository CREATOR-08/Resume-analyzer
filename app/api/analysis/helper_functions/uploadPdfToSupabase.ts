export async function uploadPdfToSupabase(pdf: Buffer, path: string) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_PDF_BUCKET || "resume-pdfs";

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is not configured");
  }

  if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured. Server-side uploads require the service role key, not the anon or publishable key.");
  }

  if (supabaseKey.startsWith("sb_publishable_")) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY appears to be a publishable key. Use the Supabase service role key instead.");
  }

  const uploadUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/${bucket}/${path}`;
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/pdf",
      "x-upsert": "true",
    },
    body: new Uint8Array(pdf),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    console.error("Supabase upload error:", {
      status: response.status,
      message,
      url: uploadUrl,
      bucket,
    });
    throw new Error(message || "Failed to upload PDF to Supabase");
  }

  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${path}`;
}