import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MiradorPDIIIFMenuItemPlugin } from "../src";
import { setupServer } from "msw/node";
import { handlers } from "../__mocks__/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  it("Should display 'PDF Restricted' for restricted objects", async () => {
    // Create a wrapper component to set internal state
    const TestComponent = () => {
      const [stateOverride, setStateOverride] = React.useState({
        hasChecked: true,
        showMenuItem: true,
        objectPublic: false,
      });
      
      // Create ref to component instance
      const componentRef = React.useRef();
      
      React.useEffect(() => {
        if (componentRef.current) {
          componentRef.current.setState(stateOverride);
        }
      }, [stateOverride]);
      
      return (
        <MiradorPDIIIFMenuItemPlugin.component
          ref={componentRef}
          manifest={{}}
          allowPdfDownload={false}
          setEstimatedSize={() => {}}
          setAllowPdfDownload={() => {}}
          canvasGroupings={[]}
        />
      );
    };

    const { getByText } = render(<TestComponent />);
    await waitFor(() => getByText("PDF Restricted"));
  });
});
