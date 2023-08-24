/**
 * Format bytes to human readable string
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {number} bytes number of bytes
 * @param {number} decimals number of decimals
 * @returns {string} human readable string
 */
export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Check support for streamsaver
 * Adapted from PDIIIF web example: https://github.com/jbaiter/pdiiif/blob/main/pdiiif-web/src/util.ts
 */
export function checkStreamsaverSupport() {
  try {
    // Our usecase requires WriteableStream
    new Response(new WritableStream());
    if (isSecureContext && !("serviceWorker" in navigator)) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

/**
 * Check image API has CORS
 * Adapted from PDIIIF web example: https://github.com/jbaiter/pdiiif/blob/main/pdiiif-web/src/iiif.ts
 * @returns {boolean} true if image API has CORS
 */
export async function checkImageApiHasCors() {
  try {
    let testImgResp = await fetch(images[0]["@id"] ?? images[0].id);
    let testImgData = new Uint8Array(await testImgResp.arrayBuffer());
    return testImgData[0] !== undefined ? true : false;
  } catch {
    return false;
  }
}

/**
 * Check image type
 * @param {canvasJSON} object the canvas JSON object
 * @returns {boolean} true if image is of format image/jpeg
 */
export async function checkImageType(canvasJSON) {
  if ('images' in canvasJSON[0]) {
    // v2 Manifest
    let format = canvasJSON[0].images[0].resource.format;
    console.log('format v2: '+format);
    return format == 'image/jpeg' ? true : false;
  }
  else {
    // v3 Manifest
    let format = canvasJSON[0].items[0].items[0].body.format;
    console.log('format v3: '+format);
    return format == 'image/jpeg' ? true : false;
  }
}