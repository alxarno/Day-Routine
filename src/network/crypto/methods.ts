function textToArrayBuffer(str: string): ArrayBuffer {
  const buf = unescape(encodeURIComponent(str));
  const bufView = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    bufView[i] = buf.charCodeAt(i);
  }
  return bufView;
}

function arrayBufferToText(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  let str = "";
  for (let i = 0; i < byteArray.byteLength; i++) {
    str += String.fromCharCode(byteArray[i]);
  }
  return str;
}
