import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Support",
  title: "Terms of Service",
  intro: "These terms define how KONEKT should be used by individuals and businesses.",
  sections: [
    { h: "Acceptable Use", p: "Users must provide accurate information and respect platform community standards." },
    { h: "Business Responsibility", p: "Listed businesses are responsible for truthful, current profile details." },
    { h: "Platform Rights", p: "KONEKT may update features or terms to maintain quality, security, and fairness." },
  ],
};

export default function TermsOfServicePage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
