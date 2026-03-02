import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Age Rating Questionnaire",
  intro: "App Store age rating and content safety overview for Konekt.",
  sections: [
    {
      h: "Minimum Age",
      p: "Konekt is intended for users 13 years and older. Our services do not address children under 13.",
    },
    {
      h: "User-Generated Content",
      p: "The app includes business listings and community reviews. Users are responsible for posted content and must follow community standards.",
    },
    {
      h: "Safety Moderation",
      p: "Users can report objectionable listings or reviews in-app. Human moderators review reports within 24 hours and remove violating content.",
    },
    {
      h: "Enforcement",
      p: "Konekt applies zero tolerance for hate speech, harassment, or fraudulent listings. Repeat offenders may be suspended or permanently blocked.",
    },
  ],
};

export default function AgeRatingPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
