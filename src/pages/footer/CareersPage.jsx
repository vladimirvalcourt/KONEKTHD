import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Company",
  title: "Careers",
  intro: "Join a mission-driven team building meaningful tools for Haitian business growth.",
  sections: [
    { h: "Who We’re Looking For", p: "People who care about community impact and high-quality product execution." },
    { h: "How We Work", p: "We value ownership, clarity, and collaboration across product, design, and engineering." },
    { h: "How to Apply", p: "Send your profile and role interest to careers@konekt.app. We review every submission." },
  ],
};

export default function CareersPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
