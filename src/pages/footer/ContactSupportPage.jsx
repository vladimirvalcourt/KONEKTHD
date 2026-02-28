import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Contact Support",
  intro: "Need help from the KONEKT team? We’re here to assist.",
  sections: [
    { h: "Support Email", p: "Reach us directly at support@konekt.app for account and technical issues." },
    { h: "Response Window", p: "Most requests receive a response within one business day." },
    { h: "Best Results", p: "Include screenshots, device details, and steps so we can resolve your issue faster." },
  ],
};

export default function ContactSupportPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
