import React from "react";
import { render } from "@testing-library/react";
import { MiradorPDIIIFRestrictedDialogPlugin } from "../src";

describe("PDF restricted dialog", () => {
  it("Should render the restricted dialog when open", () => {
    const { getByText } = render(
      <MiradorPDIIIFRestrictedDialogPlugin.component
        open={true}
        closeDialog={() => {}}
        containerId="test-container"
        windowId="test-window"
        classes={{ h2: "" }}
      />
    );
    expect(getByText("PDF Request")).toBeInTheDocument();
    expect(getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
    expect(getByText("View this object in the old Viewer to download the PDF.")).toBeInTheDocument();
  });

  it("Should not render when closed", () => {
    const { container } = render(
      <MiradorPDIIIFRestrictedDialogPlugin.component
        open={false}
        closeDialog={() => {}}
        containerId="test-container"
        windowId="test-window"
        classes={{ h2: "" }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});