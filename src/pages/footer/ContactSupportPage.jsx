import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Support & Community Safety",
  intro: "Need Help? Email us at support@konektapp.com",
  sections: [
    {
      h: "Community Safety (Required by Apple)",
      p: "At Konekt, we prioritize a safe community for the Haitian diaspora.",
    },
    {
      h: "How to Report",
      p: "You can report any business or review directly in the app by clicking the \"Report\" button next to the content.",
    },
    {
      h: "Review Process",
      p: "Every report is reviewed by a human moderator within 24 hours.",
    },
    {
      h: "Action Taken",
      p: "If content is found to be objectionable, it will be removed immediately. If a user is found to be abusive, their account will be blocked.",
    },
    {
      h: "Zero Tolerance",
      p: "We have a zero-tolerance policy against hate speech, harassment, or fraudulent listings.",
    },
  ],
};

export default function ContactSupportPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
