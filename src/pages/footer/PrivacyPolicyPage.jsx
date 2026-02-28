import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Privacy Policy",
  intro: "We are committed to handling your information responsibly and transparently.",
  sections: [
    { h: "Data Collection", p: "We collect only the data required to provide, secure, and improve the platform." },
    { h: "Data Usage", p: "Information is used to support core features such as discovery, profiles, and communication." },
    { h: "Data Protection", p: "We apply practical safeguards to protect user information and platform integrity." },
  ],
};

export default function PrivacyPolicyPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
