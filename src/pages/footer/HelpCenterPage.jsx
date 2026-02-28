import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Help Center",
  intro: "Answers to common questions about accounts, listings, and platform usage.",
  sections: [
    { h: "Account Basics", p: "Get help with sign-in, profile updates, and account preferences." },
    { h: "Business Listings", p: "Learn how to create, edit, and optimize your business profile." },
    { h: "Platform Guidance", p: "Understand how search, reviews, and discovery features work." },
  ],
};

export default function HelpCenterPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
