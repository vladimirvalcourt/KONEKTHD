import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Product",
  title: "Community Reviews",
  intro: "Real people. Real experiences. Better decisions for everyone.",
  sections: [
    { h: "Authentic Feedback", p: "Reviews are written by community members sharing direct service experiences." },
    { h: "Decision Support", p: "Ratings and comments help users choose businesses aligned with their expectations." },
    { h: "Quality Growth", p: "Constructive public feedback helps businesses improve and grow sustainably." },
  ],
};

export default function CommunityReviewsPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
