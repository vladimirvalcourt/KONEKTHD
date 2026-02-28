import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Company",
  title: "Mission & Vision",
  intro: "Our mission is to make Haitian businesses visible, accessible, and supported worldwide.",
  sections: [
    { h: "Mission", p: "Empower discovery and direct support for Haitian-owned businesses across regions." },
    { h: "Vision", p: "Create the most trusted global network for Haitian entrepreneurship and commerce." },
    { h: "Principles", p: "Trust, quality, visibility, and community impact guide every product decision." },
  ],
};

export default function MissionVisionPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
