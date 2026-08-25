export const SITE = {
  name: "KONEKT",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL?.trim() || "support@konektapp.com",
  appStoreURL: import.meta.env.VITE_APP_STORE_URL?.trim() || "",
  googlePlayURL: import.meta.env.VITE_GOOGLE_PLAY_URL?.trim() || "",
  canonicalURL: import.meta.env.VITE_SITE_URL?.trim() || "https://www.konekt.directory",
  providerPortalURL: import.meta.env.VITE_PROVIDER_PORTAL_URL?.trim() || "https://provider.konekt.directory",
}

export function supportMailto(subject = "KONEKT support") {
  return `mailto:${SITE.supportEmail}?subject=${encodeURIComponent(subject)}`
}
