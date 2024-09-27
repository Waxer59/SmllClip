export function arrayBufferToString(buffer: ArrayBuffer) {
  return new TextDecoder().decode(buffer)
}
