import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MiradorPDIIIFDialogPlugin } from "../src";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PDF menu item", () => {
  it("Should not render if allowPdfDownload is false ", async () => {
    render(
      <MiradorPDIIIFDialogPlugin.component
        classes={{
          h2: "h2",
          h3: "h3",
        }}
        closeDialog={() => {}}
        containerId="mirador-container"
        estimatedSize={100}
        manifest={{}}
        manifestId="abc123"
        allowPdfDownload={false}
        windowId="abc123"
      />
    );
    const title = screen.queryByText("PDF Download");
    const button = screen.queryByText("Download");
    expect(title).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it("Should display confirmation message and button if allowPdfDownload is true and the dialog is open", async () => {
    render(
      <MiradorPDIIIFDialogPlugin.component
        classes={{
          h2: "h2",
          h3: "h3",
        }}
        closeDialog={() => {}}
        containerId="mirador-container"
        estimatedSize={100000}
        manifest={{}}
        manifestId="abc123"
        open={true}
        allowPdfDownload={true}
        windowId="abc123"
      />
    );
    const title = screen.queryByText("PDF Download");
    const button = screen.queryByText("Download");
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
