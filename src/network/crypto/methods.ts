export function textToArrayBuffer(str: string): ArrayBuffer {
  // const buf = unescape(encodeURIComponent(str));
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function arrayBufferToText(buf: ArrayBuffer): string {
  // const byteArray = new Uint8Array(arrayBuffer);
  // let str = "";
  // for (let i = 0; i < byteArray.byteLength; i++) {
  //   str += String.fromCharCode(byteArray[i]);
  // }
  // return str;
  return String.fromCharCode.apply(null, new Uint8Array(buf) as any);
}
