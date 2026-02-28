import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Company",
  title: "Our Story",
  intro: "KONEKT was created to bridge a visibility gap and strengthen Haitian economic connection.",
  sections: [
    { h: "Why We Started", p: "Too many great Haitian businesses remained hard to discover in the digital space." },
    { h: "What We Built", p: "A focused platform where community members can find, support, and elevate entrepreneurs." },
    { h: "Where We’re Going", p: "We are building long-term infrastructure for diaspora commerce and opportunity." },
  ],
};

export default function OurStoryPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
