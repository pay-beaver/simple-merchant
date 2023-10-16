// A simple function to hash a string with SHA-256.
export async function hashMessage(
  message: string
) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest(
    "SHA-256",
    data
  );
  const hashArray = Array.from(
    new Uint8Array(hash)
  ); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}
