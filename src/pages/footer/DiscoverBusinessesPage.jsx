import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Product",
  title: "Discover Businesses",
  intro: "KONEKT helps you find Haitian-owned businesses with speed, context, and confidence.",
  sections: [
    { h: "Smart Search", p: "Browse by category, city, and keyword to quickly find businesses that match your needs." },
    { h: "Verified Presence", p: "Each listing includes relevant profile details, helping you make decisions faster." },
    { h: "Community First", p: "Discovery is built around trust and support inside the Haitian diaspora ecosystem." },
  ],
};

export default function DiscoverBusinessesPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
