import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Company",
  title: "Community Partners",
  intro: "We collaborate with organizations and leaders who strengthen local Haitian business ecosystems.",
  sections: [
    { h: "Strategic Collaboration", p: "Partnerships help us expand outreach, education, and adoption in key communities." },
    { h: "Local Impact", p: "Community-led initiatives ensure platform growth translates into real business outcomes." },
    { h: "Shared Purpose", p: "Our partners believe in strengthening Haitian entrepreneurship through access and visibility." },
  ],
};

export default function CommunityPartnersPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
