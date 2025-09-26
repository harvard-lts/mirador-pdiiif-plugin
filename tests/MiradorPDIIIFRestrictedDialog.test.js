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
    expect(getByText("PDF Download Restricted")).toBeInTheDocument();
    expect(getByText("This document is restricted and cannot be downloaded as a PDF. Please contact the institution for access to this material.")).toBeInTheDocument();
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