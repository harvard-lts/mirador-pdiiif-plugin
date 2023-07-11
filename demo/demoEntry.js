import Mirador from "mirador/dist/es/src/index";
import Plugin from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        manifestId: "https://iiif.lib.harvard.edu/manifests/drs:4997399",
      },
    ],
  };

  const plugins = [...Plugin];

  Mirador.viewer(config, plugins);
});
