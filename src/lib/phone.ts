// Formatting for phone numbers that come straight from a hospital's own profile — free text, so
// they arrive as "9830012345", "+91 98300 12345", "033-2345 6789", etc.

export interface DialablePhone {
  /** What the patient reads, e.g. "+91 98300 12345". */
  display: string;
  /** What the phone dials, e.g. "tel:+919830012345". */
  href: string;
}

/**
 * Returns null unless `raw` looks like a real phone number (at least 6 digits), so a stray "-" or
 * "N/A" in a hospital profile hides the row instead of rendering a dead call button.
 *
 * Only an unambiguous Indian mobile (10 digits starting 6-9, optionally written with a 91 / +91
 * prefix) is regrouped to "+91 XXXXX XXXXX". Everything else is shown exactly as typed and dialled
 * from its digits: a leading 0 is NOT stripped, because "033-2345 6789" (Kolkata landline, STD 033)
 * and "09830012345" (0 + mobile) are both 11 digits and can't be told apart reliably.
 */
export function toDialablePhone(raw?: string | null): DialablePhone | null {
  const trimmed = (raw ?? "").trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 6) return null;

  const mobile = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (mobile.length === 10 && /^[6-9]/.test(mobile)) {
    return { display: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`, href: `tel:+91${mobile}` };
  }
  return { display: trimmed, href: `tel:${trimmed.startsWith("+") ? "+" : ""}${digits}` };
}
