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
    // Create a component with showMenuItem=true and objectPublic=false in state
    const TestComponent = () => {
      const [component] = React.useState(() => {
        const comp = new MiradorPDIIIFMenuItemPlugin.component({
          manifest: {},
          allowPdfDownload: false,
          setEstimatedSize: () => {},
          setAllowPdfDownload: () => {},
          canvasGroupings: [],
        });
        
        // Set the state to simulate a restricted object that should show the menu item
        comp.state = {
          ...comp.state,
          hasChecked: true,
          showMenuItem: true,
          objectPublic: false,
        };
        
        return comp;
      });
      
      return component.render();
    };

    const { getByText } = render(<TestComponent />);
    await waitFor(() => getByText("PDF Restricted"));
  });
});
