import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Terms of Service",
  intro: "By using Konektedht, you agree to these terms:",
  sections: [
    {
      h: "User-Generated Content (UGC)",
      p: "You are responsible for any reviews or listings you post. We strictly prohibit illegal, offensive, or harmful content. We reserve the right to remove any content that violates our community standards.",
    },
    {
      h: "Safety & Abuse",
      p: "Users can report any listing or review that is inappropriate. Our moderators will review reports within 24 hours. We reserve the right to ban users who repeatedly violate these terms.",
    },
  ],
};

export default function TermsOfServicePage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
