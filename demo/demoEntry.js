import Mirador from "mirador/dist/es/src/index";
import Plugin from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        manifestId: "https://nrs.harvard.edu/URN-3:FHCL.HOUGH:104336876:MANIFEST:3",
      },
      {
        manifestId: "https://nrs.harvard.edu/URN-3:FHCL:103496523:MANIFEST:3",
      },
      {
        manifestId: "https://nrs.harvard.edu/URN-3:FHCL.LOEB:25853480:MANIFEST:3",
      },
      {
        manifestId: "https://nrs.harvard.edu/URN-3:FHCL.HOUGH:1276220:MANIFEST:3",
      },
    ],
  };

  const plugins = [...Plugin];

  Mirador.viewer(config, plugins);
});
