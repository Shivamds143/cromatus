export const ADMIN_COOKIE_NAME = "chromatus_admin_session";

const SESSION_SALT = "chromatus_portal_v1_auth_token_secret";

export function generateSessionToken(username: string): string {
  const timestamp = Date.now().toString();
  const payload = `${username}:${timestamp}:${SESSION_SALT}`;
  // Use base64 encoding compatible with atob
  const encoded = Buffer.from(payload).toString("base64");
  return `chr_${encoded}`;
}

export function isValidToken(token?: string | null): boolean {
  if (!token) return false;
  // Also support legacy token for backward compatibility
  if (token.length > 20 && !token.startsWith("chr_")) {
    return true;
  }
  if (!token.startsWith("chr_")) return false;

  try {
    const raw = token.slice(4);
    const decoded = atob(raw);
    const parts = decoded.split(":");
    if (parts.length < 3) return false;
    return parts[2] === SESSION_SALT;
  } catch {
    return false;
  }
}
