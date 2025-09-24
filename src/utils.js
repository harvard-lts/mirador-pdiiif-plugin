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
 * Check Object Public
 * @param {Object} manifest - The IIIF manifest object
 * @returns {boolean} true if object is public
 */
export async function checkObjectPublic(manifest) {
  console.log('CHECKING IF OBJECT IS PUBLIC!!!!');
  try {
    // Get the first canvas from the manifest
    if (!manifest || !manifest.items || manifest.items.length === 0) {
      console.log('No items found in manifest, returning false');
      return false;
    }
    
    const firstCanvas = manifest.items[0];
    if (!firstCanvas.items || firstCanvas.items.length === 0) {
      console.log('No items found in first canvas, returning false');
      return false;
    }
    
    const firstAnnotationPage = firstCanvas.items[0];
    if (!firstAnnotationPage.items || firstAnnotationPage.items.length === 0) {
      console.log('No items found in first annotation page, returning false');
      return false;
    }
    
    const firstAnnotation = firstAnnotationPage.items[0];
    const imageUrl = firstAnnotation.body.id || firstAnnotation.body['@id'];
    
    if (!imageUrl) {
      console.log('No image URL found, returning false');
      return false;
    }
    
    let testImgResp = await fetch(imageUrl);
    console.log("testImgResp.status", testImgResp.status);
    if (testImgResp.status == 403 || testImgResp.status == 401) {
      return false;
    }
    else { 
      return true; 
    };
  } catch (error) {
    console.log('CATCHED ERROR, RETURNING FALSE!!', error);
    return false;
  }
}

