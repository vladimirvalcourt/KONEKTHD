import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Product",
  title: "List Your Business",
  intro: "Show your business to a community that is actively searching for your services.",
  sections: [
    { h: "Create Your Profile", p: "Add your business details, services, contact info, and hours in minutes." },
    { h: "Increase Visibility", p: "Reach diaspora customers in your city and beyond through one trusted platform." },
    { h: "Build Long-Term Trust", p: "Keep your listing updated and maintain a credible, consistent brand presence." },
  ],
};

export default function ListYourBusinessPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
