import InfoPageLayout from "./InfoPageLayout";

const page = {
  group: "Product",
  title: "Download the App",
  intro: "Take KONEKT with you and connect with businesses anywhere, anytime.",
  sections: [
    { h: "Mobile-First Experience", p: "Access search, discovery, and profiles in a streamlined app workflow." },
    { h: "Always Connected", p: "Stay close to community businesses whether you are at home or on the move." },
    { h: "Available on iOS & Android", p: "Download from your preferred app store and get started immediately." },
  ],
};

export default function DownloadAppPage(props) {
  return <InfoPageLayout page={page} {...props} />;
}
