import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MiradorPDIIIFDialogPlugin } from "../src";
import { setupServer } from "msw/node";
import { handlers } from "../__mocks__/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PDF dialog", () => {
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
        canvasIds={["canvas1", "canvas2", "canvas3"]}
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
        canvasIds={["canvas1", "canvas2", "canvas3"]}
        windowId="abc123"
      />
    );
    const title = screen.queryByText("PDF Download");
    const button = screen.queryByText("Download");
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Should disable download if pages aren't in range", async () => {
    render(
      <MiradorPDIIIFDialogPlugin.component
        classes={{
          h2: "h2",
          h3: "h3",
          disabledButton: "disabledButton",
        }}
        closeDialog={() => {}}
        containerId="mirador-container"
        estimatedSize={100000}
        manifest={{}}
        manifestId="abc123"
        open={true}
        allowPdfDownload={true}
        canvasIds={[
          "canvas1",
          "canvas2",
          "canvas3",
          "canvas4",
          "canvas5",
          "canvas6",
          "canvas7",
          "canvas8",
          "canvas9",
          "canvas10",
        ]}
        windowId="abc123"
      />
    );
    const title = screen.queryByText("PDF Download");
    const button = screen.queryByText("Download").parentElement;
    const input = screen.queryByPlaceholderText("1, 4, 8-12, ...");
    fireEvent.change(input, { target: { value: "1,2,3-6,7,9-12" } });
    expect(title).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Should allow download if pages are in range", async () => {
    render(
      <MiradorPDIIIFDialogPlugin.component
        classes={{
          h2: "h2",
          h3: "h3",
          disabledButton: "disabledButton",
        }}
        closeDialog={() => {}}
        containerId="mirador-container"
        estimatedSize={100000}
        manifest={{}}
        manifestId="abc123"
        open={true}
        allowPdfDownload={true}
        canvasIds={[
          "canvas1",
          "canvas2",
          "canvas3",
          "canvas4",
          "canvas5",
          "canvas6",
          "canvas7",
          "canvas8",
          "canvas9",
          "canvas10",
        ]}
        windowId="abc123"
      />
    );
    const title = screen.queryByText("PDF Download");
    const button = screen.queryByText("Download").parentElement;
    const input = screen.queryByPlaceholderText("1, 4, 8-12, ...");
    fireEvent.change(input, { target: { value: "3-6,10" } });
    expect(title).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
