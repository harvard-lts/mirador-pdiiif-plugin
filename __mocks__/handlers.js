import { rest } from "msw";
import fs from "fs";
import path from "path";

export const handlers = [
  rest.get("/greeting", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  }),

  // Mock any image requests to use the fixture images
  rest.get(
    "https://ids.lib.harvard.edu/ids/iiif/:imageId/full/max/0/default.jpg",
    (req, res, ctx) => {
      // Read the image from the file system using the "fs" module.
      const imageBuffer = fs.readFileSync(
        path.resolve(
          __dirname,
          `../tests/fixtures/pdf-1/${req.params.imageId}.jpg`
        )
      );

      return res(
        ctx.set("Content-Length", imageBuffer.byteLength.toString()),
        ctx.set("Content-Type", "image/jpeg"),
        // Respond with the "ArrayBuffer".
        ctx.body(imageBuffer)
      );
    }
  ),

  // Mock any info.json requests to use the fixture json
  rest.get(
    "https://ids.lib.harvard.edu/ids/iiif/:imageId/info.json",
    (req, res, ctx) => {
      // Read the image from the file system using the "fs" module.
      const jsonBuffer = fs.readFileSync(
        path.resolve(
          __dirname,
          `../tests/fixtures/pdf-1/${req.params.imageId}.json`
        )
      );

      return res(
        ctx.set("Content-Length", jsonBuffer.byteLength.toString()),
        ctx.set("Content-Type", "application/json"),
        // Respond with the "ArrayBuffer".
        ctx.body(jsonBuffer)
      );
    }
  ),

  // Mock any manifest.json requests to use the fixture json
  rest.get(
    "https://iiif.lib.harvard.edu/manifests/drs:4997399",
    (req, res, ctx) => {
      // Read the image from the file system using the "fs" module.
      const jsonBuffer = fs.readFileSync(
        path.resolve(__dirname, `../tests/fixtures/pdf-1/manifest.json`)
      );

      return res(
        ctx.set("Content-Length", jsonBuffer.byteLength.toString()),
        ctx.set("Content-Type", "application/json"),
        // Respond with the "ArrayBuffer".
        ctx.body(jsonBuffer)
      );
    }
  ),

  // Mock response for coverpage pre-flight
  rest.options("https://pdiiif.jbaiter.de/api/coverpage", (req, res, ctx) => {
    return res(
      ctx.set("Access-Control-Allow-Origin", "*"),
      ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    );
  }),

  // Mock any coverpage requests to use the fixture coverpage pdf
  rest.post("https://pdiiif.jbaiter.de/api/coverpage", (req, res, ctx) => {
    // Read the image from the file system using the "fs" module.
    const pdfBuffer = fs.readFileSync(
      path.resolve(
        __dirname,
        `../tests/fixtures/pdf-1/${req.params.imageId}.json`
      )
    );

    return res(
      ctx.set("Content-Length", pdfBuffer.byteLength.toString()),
      ctx.set("Content-Type", "application/pdf"),
      // Respond with the "ArrayBuffer".
      ctx.body(pdfBuffer)
    );
  }),
];
