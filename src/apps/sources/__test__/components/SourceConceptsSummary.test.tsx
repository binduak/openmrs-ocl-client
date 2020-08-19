import React from "react";
import SourceDetails from "../../../../apps/sources/components/SourceConceptsSummary";
import { render } from "../../../../test-utils";
import "@testing-library/jest-dom";
import { APISource } from "../../types";

type sourceDetailsProps = React.ComponentProps<typeof SourceDetails>;

const msfSource: APISource = {
  id: "MSF-SOURCE",
  short_code: "MSF-SRC",
  name: "MSF Source",
  full_name: "MSF Source",
  source_type: "Dictionary",
  public_access: "View",
  default_locale: "en",
  website: "http://msf.org/",
  description:
    "A universal code system for identifying laboratory and clinical observations.",
  extras: { msf_extra_field: "msf_extra_value" },
  url: "/users/root/sources/MSF-SRC/",
  owner: "root",
  owner_type: "User",
  owner_url: "/users/root/",
  external_id: "123",
  supported_locales: ["en", "fr"],
  custom_validation_schema: "Dictionary",
  active_concepts: 2,
  active_mappings: 1,
  concepts_url: "",
};
const baseProps: sourceDetailsProps = {
  source: msfSource,
};

function renderUI(props: Partial<sourceDetailsProps> = {}) {
  return render(<SourceDetails {...baseProps} {...props} />);
}

describe("SourceDetails", () => {
  it("should match snapshot", () => {
    const { container } = renderUI({
      source: msfSource,
    });

    expect(container).toMatchSnapshot();
  });
});

describe("Source Concept Summary", () => {
  it("checks total number of active concepts", () => {
    const { container } = renderUI({
      source: msfSource,
    });

    const activeConcepts: HTMLElement | null = container.querySelector(
      "[data-testid='active-concepts']"
    );

    expect(activeConcepts).not.toBeNull();
    expect(activeConcepts).toHaveTextContent("Total Concepts: 2");
  });

  it("checks total number of active mappings", () => {
    const { container } = renderUI({
      source: msfSource,
    });

    const activeMappings: HTMLElement | null = container.querySelector(
      "[data-testid='active-mappings']"
    );

    expect(activeMappings).not.toBeNull();
    expect(activeMappings).toHaveTextContent("Total Mappings: 1");
  });
});
