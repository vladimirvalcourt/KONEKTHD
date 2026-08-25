import { SITE } from "../siteConfig"

const bilingual = (en, ht) => ({ en, ht })

export const pageData = {
  "/discover-businesses": {
    eyebrow: bilingual("Find a service", "Jwenn yon sèvis"),
    title: bilingual("Find the help you need before you make the call.", "Jwenn èd ou bezwen an anvan ou fè apèl la."),
    intro: bilingual("Search for services, compare useful details, and see who can help you in Haitian Creole before you contact a provider.", "Chèche sèvis, konpare enfòmasyon ki itil, epi wè kiyès ki ka ede w an Kreyòl anvan ou kontakte yon founisè."),
    sections: [
      { title: bilingual("Search by need", "Chèche selon bezwen ou"), body: bilingual("Browse healthcare, legal and immigration, financial, housing, food, beauty, translation, and professional services.", "Gade swen sante, lalwa ak imigrasyon, finans, kay, manje, bote, tradiksyon, ak sèvis pwofesyonèl.") },
      { title: bilingual("See who speaks Haitian Creole", "Wè kiyès ki pale Kreyòl"), body: bilingual("Each profile tells you whether the provider speaks Haitian Creole, a staff member can help, or an interpreter is available.", "Chak pwofil montre si founisè a pale Kreyòl, si gen yon anplwaye ki ka ede w, oswa si gen yon entèprèt.") },
      { title: bilingual("Contact providers directly", "Kontakte founisè yo dirèkteman"), body: bilingual("Use the public profile to call, open directions, visit a website, or continue to booking when the provider offers it.", "Sèvi ak pwofil piblik la pou rele, jwenn direksyon, vizite sit entènèt la, oswa pran randevou lè founisè a ofri sa.") },
    ],
    cta: { label: bilingual("Search providers", "Chèche founisè"), href: "/#experience" },
  },
  "/list-your-business": {
    eyebrow: bilingual("For providers", "Pou founisè"),
    title: bilingual("Add your service or manage a profile already on KONEKT.", "Ajoute sèvis ou oswa jere yon pwofil ki deja sou KONEKT."),
    intro: bilingual("Open the provider website and create an account if this is your first time, or sign in if you already have one. Then request permission to manage a listed service or create a new profile. KONEKT reviews requests and new profiles before making changes public.", "Louvri sit founisè a. Si se premye fwa ou, kreye yon kont; si ou deja gen youn, konekte. Apre sa, mande pèmisyon pou jere yon sèvis ki nan lis la oswa kreye yon nouvo pwofil. KONEKT tcheke demann ak nouvo pwofil yo anvan chanjman yo parèt pou tout moun."),
    steps: [
      { number: "01", title: bilingual("Find or add your profile", "Jwenn oswa ajoute pwofil ou"), body: bilingual("Search for your service first. If it is already listed, request access. If not, add it.", "Chèche sèvis ou anvan. Si li deja nan lis la, mande aksè. Si li pa la, ajoute li.") },
      { number: "02", title: bilingual("Tell people what they need to know", "Bay moun enfòmasyon yo bezwen"), body: bilingual("Add your contact information, hours, services, public photo, and details about Haitian Creole support.", "Ajoute kontak, lè, sèvis, foto piblik, ak detay sou èd an Kreyòl.") },
      { number: "03", title: bilingual("Send it to KONEKT", "Voye li bay KONEKT"), body: bilingual("KONEKT checks the profile before it goes public. Only authorized reviewers can see private verification documents.", "KONEKT tcheke pwofil la anvan li parèt pou tout moun. Se sèlman moun otorize ki ka wè dokiman verifikasyon prive yo.") },
    ],
    cta: { label: bilingual("Open provider account", "Louvri kont founisè a"), href: SITE.providerPortalURL },
  },
  "/community-reviews": {
    eyebrow: bilingual("How KONEKT checks profiles", "Kijan KONEKT tcheke pwofil yo"),
    title: bilingual("Know where profile information comes from.", "Konnen ki kote enfòmasyon sou pwofil la soti."),
    intro: bilingual("A provider may submit information, KONEKT may confirm details from public sources, and community members may report a problem. KONEKT shows verification only when the available information supports it.", "Yon founisè ka voye enfòmasyon, KONEKT ka konfime detay nan sous piblik, epi moun nan kominote a ka rapòte yon pwoblèm. KONEKT montre yon detay kòm verifye sèlman lè enfòmasyon nou genyen an konfime li."),
    sections: [
      { title: bilingual("Corrections and reports", "Koreksyon ak rapò"), body: bilingual("Community members can report inaccurate profile information or inappropriate content from public provider profiles.", "Moun nan kominote a ka rapòte enfòmasyon ki pa kòrèk oswa kontni ki pa apwopriye sou pwofil piblik yo.") },
      { title: bilingual("Questions for providers", "Kesyon pou founisè yo"), body: bilingual("KONEKT may ask a provider for more information or a private document before approving a profile or an important change.", "KONEKT ka mande yon founisè plis enfòmasyon oswa yon dokiman prive anvan nou apwouve yon pwofil oswa yon gwo chanjman.") },
      { title: bilingual("KONEKT review", "Revizyon KONEKT"), body: bilingual("Only authorized KONEKT reviewers can publish, verify, pause, or resolve ownership requests for a profile.", "Se sèlman moun KONEKT otorize ki ka pibliye, verifye, mete an poz, oswa deside kiyès ki gen dwa jere yon pwofil.") },
    ],
  },
  "/download-the-app": {
    eyebrow: bilingual("Platform availability", "Disponiblite aplikasyon an"),
    title: bilingual("KONEKT is preparing for release.", "KONEKT ap prepare pou lansman."),
    intro: bilingual("The iPhone and Android experiences are in active product development and release certification. Official store links will appear here only after each listing is publicly available.", "Eksperyans iPhone ak Android yo toujou nan devlopman ak sètifikasyon pou lansman. Lyen ofisyèl magazen yo ap parèt la sèlman lè chak aplikasyon disponib piblikman."),
    platformStatus: true,
    cta: { label: bilingual("Contact support", "Kontakte sipò"), href: `mailto:${SITE.supportEmail}?subject=KONEKT%20availability` },
  },
  "/our-story": {
    eyebrow: bilingual("Why KONEKT exists", "Poukisa KONEKT egziste"),
    title: bilingual("Families should know where they can get help in Haitian Creole.", "Fanmi yo dwe konnen ki kote yo ka jwenn èd an Kreyòl."),
    intro: bilingual("KONEKT helps Haitian communities find services and see who can speak Haitian Creole with them before they call.", "KONEKT ede kominote ayisyen jwenn sèvis epi wè kiyès ki ka pale Kreyòl avè yo anvan yo rele."),
    sections: [
      { title: bilingual("Useful details first", "Enfòmasyon itil an premye"), body: bilingual("Profiles show names, locations, hours, services, contact information, and how Haitian Creole support is available.", "Pwofil yo montre non, kote, lè, sèvis, kontak, ak kijan moun ka jwenn èd an Kreyòl.") },
      { title: bilingual("Anyone can search", "Tout moun ka chèche"), body: bilingual("You do not need an account to browse public profiles. Only providers sign in when they need to add or manage a profile.", "Ou pa bezwen kont pou gade pwofil piblik yo. Se sèlman founisè ki konekte lè yo bezwen ajoute oswa jere yon pwofil.") },
      { title: bilingual("KONEKT checks important changes", "KONEKT tcheke gwo chanjman yo"), body: bilingual("Authorized reviewers decide when a profile or verification update is ready to appear publicly.", "Moun KONEKT otorize yo deside kilè yon pwofil oswa yon enfòmasyon verifye pare pou parèt pou tout moun.") },
    ],
  },
  "/mission-vision": {
    eyebrow: bilingual("Mission", "Misyon"),
    title: bilingual("Make services easier to find and Haitian Creole support easier to understand.", "Fè sèvis pi fasil pou jwenn epi fè èd an Kreyòl pi fasil pou konprann."),
    intro: bilingual("KONEKT helps people answer two questions: Where can I get the service I need, and who can help me in Haitian Creole?", "KONEKT ede moun reponn de kesyon: Ki kote mwen ka jwenn sèvis mwen bezwen an, epi kiyès ki ka ede m an Kreyòl?"),
    sections: [
      { title: bilingual("Clarity", "Klète"), body: bilingual("Show what a provider offers, where they work, and how to contact them.", "Montre sèvis founisè a bay, kote li travay, ak kijan pou kontakte li.") },
      { title: bilingual("Haitian Creole support", "Èd an Kreyòl"), body: bilingual("Show whether the provider speaks Haitian Creole, a staff member can help, or an interpreter is available.", "Montre si founisè a pale Kreyòl, si gen yon anplwaye ki ka ede, oswa si gen yon entèprèt.") },
      { title: bilingual("Careful review", "Revizyon ki fèt ak swen"), body: bilingual("Show only what KONEKT can support with provider information, public sources, or reviewed documents.", "Montre sèlman sa KONEKT ka konfime ak enfòmasyon founisè a, sous piblik, oswa dokiman ekip la tcheke.") },
    ],
  },
  "/community-partners": {
    eyebrow: bilingual("Community partners", "Patnè kominotè"),
    title: bilingual("Local knowledge makes a directory useful.", "Konesans lokal fè yon anyè itil."),
    intro: bilingual("KONEKT welcomes conversations with community organizations, people who help families find services, and trusted local institutions that can improve provider information and Haitian Creole support.", "KONEKT ouvè pou pale ak òganizasyon kominotè, moun ki ede fanmi jwenn sèvis, ak enstitisyon lokal ki ka amelyore enfòmasyon sou founisè ak èd an Kreyòl."),
    cta: { label: bilingual("Start a conversation", "Kòmanse yon konvèsasyon"), href: `mailto:${SITE.supportEmail}?subject=KONEKT%20community%20partnership` },
  },
  "/careers": {
    eyebrow: bilingual("Work with KONEKT", "Travay ak KONEKT"),
    title: bilingual("No open roles are posted today.", "Pa gen pòs travay ouvè jodi a."),
    intro: bilingual("When KONEKT begins hiring, roles and application details will be published on this page. We do not collect speculative applications through this site.", "Lè KONEKT kòmanse anboche, pòs yo ak fason pou aplike ap parèt sou paj sa a. Nou pa ranmase aplikasyon san pòs ouvè sou sit sa a."),
  },
  "/help-center": {
    eyebrow: bilingual("Help center", "Sant èd"),
    title: bilingual("Get help with KONEKT.", "Jwenn èd ak KONEKT."),
    intro: bilingual("Choose the kind of help you need below. You can also email KONEKT for profile corrections, privacy questions, or safety concerns.", "Chwazi kalite èd ou bezwen anba a. Ou ka voye imèl bay KONEKT tou pou korije yon pwofil, poze kesyon sou konfidansyalite, oswa rapòte yon pwoblèm sekirite."),
    sections: [
      { title: bilingual("Finding a service", "Jwenn yon sèvis"), body: bilingual("You do not need an account to search. Your state or ZIP code and language choice help KONEKT show more useful results.", "Ou pa bezwen kont pou chèche. Eta oswa kòd postal ou ak lang ou chwazi ede KONEKT montre rezilta ki pi itil pou ou.") },
      { title: bilingual("Provider accounts", "Kont founisè"), body: bilingual("First-time providers create an account with an email and password, then confirm the link sent to their email. Returning providers sign in with their password. Available social sign-in options appear on the provider account page.", "Premye fwa a, founisè yo kreye yon kont ak imèl yo ak yon modpas, epi yo konfime lyen nou voye nan imèl yo. Lè yo retounen, yo konekte ak modpas yo. Opsyon koneksyon sosyal ki disponib yo parèt sou paj kont founisè a.") },
      { title: bilingual("Direct support", "Sipò dirèk"), body: bilingual(`Email ${SITE.supportEmail}. Do not send passwords, account credentials, or private provider documents by email.`, `Voye imèl bay ${SITE.supportEmail}. Pa voye modpas, enfòmasyon koneksyon kont, oswa dokiman prive pa imèl.`) },
    ],
    cta: { label: bilingual("Email support", "Voye imèl bay sipò"), href: `mailto:${SITE.supportEmail}` },
  },
  "/contact-support": {
    eyebrow: bilingual("Support", "Sipò"),
    title: bilingual("Tell us what you need help with.", "Di nou ki èd ou bezwen."),
    intro: bilingual(`Email ${SITE.supportEmail} for product support, profile corrections, privacy requests, or safety concerns.`, `Voye imèl bay ${SITE.supportEmail} pou sipò pwodwi, koreksyon pwofil, demann konfidansyalite, oswa pwoblèm sekirite.`),
    sections: [
      { title: bilingual("Include useful context", "Mete enfòmasyon ki itil"), body: bilingual("Share the provider name, the screen or workflow involved, and what you expected to happen. Never email a password or other account credentials.", "Bay non founisè a, ekran oswa etap la, ak sa ou te espere ki ta rive. Pa janm voye modpas oswa lòt enfòmasyon koneksyon kont pa imèl.") },
      { title: bilingual("Private verification documents", "Dokiman verifikasyon prive"), body: bilingual("Upload provider verification documents through the protected provider account, not ordinary support email.", "Voye dokiman verifikasyon founisè nan kont founisè ki pwoteje a, pa nan imèl nòmal.") },
    ],
    cta: { label: bilingual("Email KONEKT support", "Voye imèl bay sipò KONEKT"), href: `mailto:${SITE.supportEmail}` },
  },
  "/privacy-policy": {
    eyebrow: bilingual("Privacy", "Konfidansyalite"),
    title: bilingual("Privacy follows the product boundary.", "Konfidansyalite suiv limit pwodwi a."),
    intro: bilingual("Last updated August 25, 2026. This policy describes the current KONEKT website and mobile-product behavior. It does not invent analytics, ticketing, payment, or community-account collection that the product does not use.", "Dènye mizajou 25 out 2026. Règleman sa a dekri konpòtman aktyèl sit entènèt ak pwodwi mobil KONEKT. Li pa pretann nou sèvi ak analiz, tikè, peman, oswa kont kominotè pwodwi a pa itilize."),
    sections: [
      { title: bilingual("Public community discovery", "Rechèch piblik nan kominote a"), body: bilingual("Community members can browse published provider information without creating an account. Language and location preferences may be stored on the device to support the experience.", "Moun nan kominote a ka gade enfòmasyon founisè ki pibliye san yo pa kreye kont. Lang ak kote yo chwazi ka rete sou aparèy la pou ede eksperyans lan.") },
      { title: bilingual("Provider accounts and sign-in", "Kont founisè ak koneksyon"), body: bilingual("Providers create and sign in to accounts through Supabase using an email and password or an available social sign-in option. Email signup sends a confirmation link. Social providers may share an account ID, name, email address, and profile image based on the provider's choices. KONEKT uses account information to confirm who may manage a submitted profile.", "Founisè yo kreye kont epi konekte atravè Supabase ak yon imèl ak modpas, oswa ak yon opsyon koneksyon sosyal ki disponib. Lè yon moun kreye kont ak imèl, nou voye yon lyen konfimasyon. Sèvis koneksyon sosyal yo ka bay yon idantifyan kont, non, adrès imèl, ak foto pwofil selon sa founisè a chwazi. KONEKT sèvi ak enfòmasyon kont lan pou konfime kiyès ki gen dwa jere yon pwofil.") },
      { title: bilingual("Location", "Kote"), body: bilingual("The website and mobile experience can use a manually entered ZIP code or location permission to scope provider discovery. On the website, ZIP codes are sent to Zippopotam.us to identify a state. Precise coordinates are sent to BigDataCloud only after a visitor chooses Use my location. The site stores the resulting state and place on the device; permission remains under browser or device control.", "Sit entènèt la ak eksperyans mobil la ka sèvi ak yon kòd postal moun antre oswa pèmisyon kote pou limite rechèch founisè. Sou sit la, nou voye kòd postal bay Zippopotam.us pou idantifye yon eta. Nou voye kowòdone egzak bay BigDataCloud sèlman apre yon moun chwazi Itilize kote mwen ye a. Sit la kenbe eta ak kote li jwenn lan sou aparèy la; pèmisyon an rete anba kontwòl navigatè oswa aparèy la.") },
      { title: bilingual("Provider media and evidence", "Foto ak dokiman founisè"), body: bilingual("Approved profile media may be public. Verification documents stay private and are accessed only through protected owner and administrator workflows.", "Foto pwofil ki apwouve ka piblik. Dokiman verifikasyon rete prive epi sèlman pwopriyetè ak administratè otorize ka jwenn yo nan chemen pwoteje.") },
      { title: bilingual("Service providers and sharing", "Sèvis ki ede nou ak pataj done"), body: bilingual("KONEKT uses Supabase for authentication, database, protected file storage, and server functions, and uses a social identity provider when a provider chooses an available social sign-in method. KONEKT does not sell personal information. Data may be disclosed when required by law or when needed to protect users, the service, or legal rights.", "KONEKT sèvi ak Supabase pou koneksyon, bazdone, depo fichye pwoteje, ak fonksyon sèvè; li sèvi ak yon sèvis idantite sosyal lè yon founisè chwazi yon opsyon koneksyon sosyal ki disponib. KONEKT pa vann enfòmasyon pèsonèl. Nou ka pataje done si lalwa mande sa oswa si sa nesesè pou pwoteje moun, sèvis la, oswa dwa legal.") },
      { title: bilingual("Retention and security", "Kantite tan ak sekirite"), body: bilingual("KONEKT keeps provider account information while the account is active and as needed for review, safety, fraud prevention, disputes, or legal obligations. Access controls, encrypted connections, and limited access to verification documents reduce risk, but no system can guarantee absolute security.", "KONEKT kenbe enfòmasyon kont founisè pandan kont lan aktif epi jan sa nesesè pou revizyon, sekirite, prevansyon fwod, rezoud dezakò, oswa obligasyon legal. Kontwòl aksè, koneksyon ki pwoteje, ak aksè limite nan dokiman verifikasyon diminye risk, men okenn sistèm pa ka garanti sekirite nèt.") },
      { title: bilingual("Children", "Timoun"), body: bilingual("KONEKT is a general-audience service directory and is not directed to children under 13. Provider accounts are intended for people authorized to represent a service provider. Contact support if you believe a child submitted personal information.", "KONEKT se yon anyè sèvis pou piblik la an jeneral; li pa fèt pou timoun ki poko gen 13 an. Kont founisè yo fèt pou moun ki gen otorizasyon reprezante yon founisè sèvis. Kontakte sipò si ou kwè yon timoun te voye enfòmasyon pèsonèl.") },
      { title: bilingual("Deletion and requests", "Efase done ak lòt demann"), body: bilingual(`Providers can request account deletion in the app. For privacy questions or correction requests, email ${SITE.supportEmail}.`, `Founisè yo ka mande pou efase kont yo nan aplikasyon an. Pou kesyon konfidansyalite oswa koreksyon, voye imèl bay ${SITE.supportEmail}.`) },
      { title: bilingual("Website data", "Done sit entènèt"), body: bilingual("The website loads published provider records from Supabase and uses the location services described above when a visitor searches by ZIP or chooses location access. It does not currently run a behavioral analytics pipeline or collect a newsletter form.", "Sit la chaje pwofil founisè ki pibliye nan Supabase epi li sèvi ak sèvis kote ki dekri pi wo a lè yon moun chèche ak yon kòd postal oswa chwazi aksè ak kote li ye. Li pa sèvi ak yon sistèm analiz konpòtman epi li pa ranmase fòm bilten kounye a.") },
    ],
  },
  "/terms": {
    eyebrow: bilingual("Terms", "Kondisyon"),
    title: bilingual("Use KONEKT as a directory, not a guarantee.", "Sèvi ak KONEKT kòm yon anyè, pa kòm yon garanti."),
    intro: bilingual("Last updated August 24, 2026. These Terms of Service form an agreement between you and KONEKT when you use the website or mobile apps. KONEKT helps people discover and contact services. Provider information can change, and users should confirm important details directly with the provider.", "Dènye mizajou 24 out 2026. Kondisyon sèvis sa yo se yon akò ant ou menm ak KONEKT lè w sèvi ak sit entènèt la oswa aplikasyon mobil yo. KONEKT ede moun jwenn epi kontakte sèvis. Enfòmasyon founisè ka chanje, epi moun dwe konfime detay enpòtan dirèkteman ak founisè a."),
    sections: [
      { title: bilingual("Directory information", "Enfòmasyon anyè a"), body: bilingual("A listing does not create an endorsement, professional relationship, or guarantee of availability, outcome, licensing, or quality.", "Yon pwofil pa vle di KONEKT rekòmande sèvis la, li pa kreye relasyon pwofesyonèl, epi li pa garanti disponiblite, rezilta, lisans, oswa kalite.") },
      { title: bilingual("Healthcare, legal, and financial decisions", "Desizyon sante, legal, ak finansye"), body: bilingual("KONEKT does not provide medical, legal, financial, or emergency advice. Contact qualified professionals and emergency services when appropriate.", "KONEKT pa bay konsèy medikal, legal, finansye, oswa ijans. Kontakte pwofesyonèl kalifye ak sèvis ijans lè sa nesesè.") },
      { title: bilingual("Provider submissions", "Enfòmasyon founisè voye"), body: bilingual("Providers must submit accurate information, share only photos they have permission to use, protect private verification documents, and describe Haitian Creole support honestly.", "Founisè dwe bay enfòmasyon ki kòrèk, pataje sèlman foto yo gen dwa sèvi avè yo, pwoteje dokiman verifikasyon prive, epi dekri èd an Kreyòl jan li ye a.") },
      { title: bilingual("Reports and profile review", "Rapò ak revizyon pwofil"), body: bilingual("KONEKT may review, correct, hide, pause, or remove content to protect people and keep the directory accurate. This page does not promise a fixed response time.", "KONEKT ka tcheke, korije, kache, mete an poz, oswa retire kontni pou pwoteje moun epi kenbe anyè a egzak. Paj sa a pa pwomèt yon delè fiks pou repons.") },
      { title: bilingual("Provider accounts", "Kont founisè"), body: bilingual("You must be authorized to represent the provider connected to an account, keep access to the account secure, and promptly report unauthorized use. KONEKT may restrict or close accounts that misuse the service, misrepresent identity or authority, or threaten safety and integrity.", "Ou dwe gen otorizasyon pou reprezante founisè ki konekte ak kont lan, pwoteje aksè kont lan, epi rapòte itilizasyon san pèmisyon byen vit. KONEKT ka limite oswa fèmen kont ki mal sèvi ak sèvis la, bay fo enfòmasyon sou idantite oswa otorizasyon, oswa mete sekirite ak entegrite an danje.") },
      { title: bilingual("Acceptable use", "Itilizasyon ki akseptab"), body: bilingual("Do not break the law, impersonate others, submit harmful or deceptive content, probe protected systems, interfere with the service, harvest personal information, or use KONEKT to distribute spam or malware.", "Pa vyole lalwa, pa pran pòz yon lòt moun, pa voye kontni danjere oswa twonpe moun, pa teste sistèm pwoteje san pèmisyon, pa deranje sèvis la, pa ranmase enfòmasyon pèsonèl, epi pa sèvi ak KONEKT pou voye mesaj fatra oswa lojisyèl danjere.") },
      { title: bilingual("Your content and KONEKT materials", "Kontni pa w ak materyèl KONEKT"), body: bilingual("You keep ownership of content you submit and give KONEKT permission to host, review, adapt for formatting and accessibility, and display it as needed to operate and improve the directory. KONEKT's branding, software, and original site materials may not be copied or misused except as allowed by law.", "Ou rete pwopriyetè kontni ou voye epi ou bay KONEKT pèmisyon pou estoke l, revize l, adapte fòma ak aksè li, epi montre l jan sa nesesè pou fè ak amelyore anyè a. Yo pa dwe kopye oswa mal sèvi ak mak, lojisyèl, ak materyèl orijinal KONEKT sof jan lalwa pèmèt sa.") },
      { title: bilingual("Availability and liability", "Disponiblite ak responsablite"), body: bilingual("KONEKT is provided as available. To the extent permitted by law, KONEKT disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the directory or third-party services. Rights that cannot legally be waived remain unaffected.", "KONEKT disponib jan li ye a. Nan limit lalwa pèmèt, KONEKT pa bay garanti ki pa ekri epi li pa responsab pou domaj endirèk, aksidantèl, espesyal, konsekansyèl, oswa pinitif ki soti nan itilizasyon anyè a oswa sèvis lòt moun. Dwa lalwa pa pèmèt nou retire yo rete valab.") },
      { title: bilingual("Changes and contact", "Chanjman ak kontak"), body: bilingual(`KONEKT may update these terms as the service changes. The updated date will change when revisions are published. Questions about these terms can be sent to ${SITE.supportEmail}.`, `KONEKT ka mete kondisyon sa yo ajou lè sèvis la chanje. Dat mizajou a ap chanje lè nou pibliye revizyon. Voye kesyon sou kondisyon sa yo bay ${SITE.supportEmail}.`) },
    ],
  },
  "/age-rating": {
    eyebrow: bilingual("Age rating", "Klasifikasyon laj"),
    title: bilingual("A service directory for general audiences.", "Yon anyè sèvis pou piblik la an jeneral."),
    intro: bilingual("KONEKT contains public provider profiles and contact information. It does not include payments, gambling, dating, social feeds, or open messaging in the current product scope.", "KONEKT gen pwofil founisè piblik ak enfòmasyon kontak. Nan pwodwi aktyèl la, li pa gen peman, jwèt aza, randevou amoure, fil sosyal, oswa mesaj ouvè."),
    sections: [
      { title: bilingual("Provider content", "Kontni founisè"), body: bilingual("Provider profiles can describe healthcare, legal, housing, financial, food, beauty, translation, and other services. Some service topics may be serious, but the directory does not provide graphic instructional content.", "Pwofil founisè ka dekri sèvis sante, legal, kay, finans, manje, bote, tradiksyon, ak lòt sèvis. Kèk sijè ka serye, men anyè a pa bay kontni grafik oswa enstriksyon danjere.") },
      { title: bilingual("Contact outside KONEKT", "Kontak deyò KONEKT"), body: bilingual("Calls, websites, directions, and booking links open provider or system destinations outside the directory. Families should supervise device use as appropriate.", "Apèl, sit entènèt, direksyon, ak lyen randevou louvri sèvis founisè oswa sistèm ki deyò anyè a. Fanmi yo dwe sipèvize itilizasyon aparèy selon bezwen yo.") },
    ],
  },
}

pageData["/support"] = pageData["/contact-support"]
pageData["/privacy"] = pageData["/privacy-policy"]
pageData["/terms-of-service"] = pageData["/terms"]
pageData["/age-rating-questionnaire"] = pageData["/age-rating"]
