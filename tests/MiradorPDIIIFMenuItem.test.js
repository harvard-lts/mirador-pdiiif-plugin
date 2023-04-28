import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MiradorPDIIIFMenuItemPlugin } from "../src";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PDF menu item", () => {
  it("Should should display 'Download PDF' allowPdfDownload is true", async () => {
    const { getByText } = render(
      <MiradorPDIIIFMenuItemPlugin.component
        manifest={{}}
        allowPdfDownload={true}
        setEstimatedSize={() => {}}
        setAllowPdfDownload={() => {}}
        canvasGroupings={[]}
      />
    );
    await waitFor(() => getByText("Download PDF"));
  });

  it("Should should display 'PDF Unavailable' if allowPdfDownload is false", async () => {
    const { getByText } = render(
      <MiradorPDIIIFMenuItemPlugin.component
        manifest={{}}
        allowPdfDownload={false}
        setEstimatedSize={() => {}}
        setAllowPdfDownload={() => {}}
        canvasGroupings={[]}
      />
    );
    await waitFor(() => getByText("PDF Unavailable"));
  });
});
