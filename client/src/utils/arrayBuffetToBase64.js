export const arrayBufferToBase64 = (buffer) => {
  const binary = new Uint8Array(buffer);
  const base64 = btoa(String.fromCharCode.apply(null, binary));
  return base64;
};
