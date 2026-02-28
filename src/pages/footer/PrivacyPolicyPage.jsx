import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Privacy Policy for Konektedht",
  intro: "Last Updated: February 28, 2026. Konektedht (\"we\", \"us\", or \"our\") operates the Konektedht mobile application. We respect your privacy and are committed to protecting your personal data.",
  sections: [
    {
      h: "Data We Collect",
      p: "Account Data: Name, email, and profile information provided via Clerk. Location Data: We use your location to show nearby businesses. This data is processed on-device or transitively and is not stored permanently. Usage Data: Anonymous analytics to improve app performance.",
    },
    {
      h: "How We Use Data",
      p: "To provide and maintain our service. To allow you to book services and purchase event tickets. To prevent fraud and abuse.",
    },
    {
      h: "Data Retention",
      p: "You can request deletion of your account and associated data directly through the app settings or by emailing support@konektapp.com.",
    },
    {
      h: "Children's Privacy",
      p: "Our services do not address anyone under the age of 13.",
    },
  ],
};

export default function PrivacyPolicyPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
