import { SITE } from "../siteConfig"

const bilingual = (en, ht) => ({ en, ht })

export const pageData = {
  "/discover-businesses": {
    eyebrow: bilingual("Explore KONEKT", "Eksplore KONEKT"),
    title: bilingual("Service discovery built around clarity.", "Jwenn sèvis ak enfòmasyon ki klè."),
    intro: bilingual("KONEKT organizes practical community services and shows how Haitian Creole support is available before someone makes contact.", "KONEKT òganize sèvis kominotè ki itil epi montre kijan sipò an Kreyòl disponib anvan yon moun kontakte founisè a."),
    sections: [
      { title: bilingual("Search by need", "Chèche selon bezwen ou"), body: bilingual("Browse healthcare, legal and immigration, financial, housing, food, beauty, translation, and professional services.", "Gade swen sante, lalwa ak imigrasyon, finans, kay, manje, bote, tradiksyon, ak sèvis pwofesyonèl.") },
      { title: bilingual("Understand language access", "Konprann aksè nan lang"), body: bilingual("Listings distinguish direct Kreyòl service, Kreyòl-speaking staff, and interpreter availability.", "Pwofil yo separe sèvis dirèk an Kreyòl, anplwaye ki pale Kreyòl, ak entèprèt ki disponib.") },
      { title: bilingual("Contact providers directly", "Kontakte founisè yo dirèkteman"), body: bilingual("Use the public profile to call, open directions, visit a website, or continue to booking when the provider offers it.", "Sèvi ak pwofil piblik la pou rele, jwenn direksyon, vizite sit entènèt la, oswa pran randevou lè founisè a ofri sa.") },
    ],
    cta: { label: bilingual("Open the product preview", "Louvri apèsi pwodwi a"), href: "/#experience" },
  },
  "/list-your-business": {
    eyebrow: bilingual("For providers", "Pou founisè"),
    title: bilingual("Add or claim your community service.", "Ajoute oswa reklame sèvis ou nan kominote a."),
    intro: bilingual("Providers use the KONEKT mobile app to claim an existing profile or create a new one. Publication and verification remain review decisions.", "Founisè yo sèvi ak aplikasyon mobil KONEKT la pou reklame yon pwofil oswa kreye youn. Piblikasyon ak verifikasyon rete desizyon ekip revizyon an."),
    steps: [
      { number: "01", title: bilingual("Choose your path", "Chwazi chemen ou"), body: bilingual("Search for an existing profile to claim, or begin a new service profile.", "Chèche yon pwofil ki deja egziste pou reklame li, oswa kòmanse yon nouvo pwofil sèvis.") },
      { number: "02", title: bilingual("Share accurate details", "Bay enfòmasyon ki kòrèk"), body: bilingual("Add identity, contact, hours, service details, language access, and role-appropriate public media.", "Ajoute idantite, kontak, lè, sèvis, aksè nan lang, ak bon foto piblik pou wòl ou.") },
      { number: "03", title: bilingual("Submit for review", "Voye pou revizyon"), body: bilingual("Private evidence stays private. Approved public information can be published after review.", "Dokiman prive rete prive. Enfòmasyon piblik ki apwouve ka parèt apre revizyon.") },
    ],
    cta: { label: bilingual("Check mobile availability", "Tcheke disponiblite mobil"), href: "/download-the-app" },
  },
  "/community-reviews": {
    eyebrow: bilingual("Trust and review", "Konfyans ak revizyon"),
    title: bilingual("Trust is a process, not a badge.", "Konfyans se yon pwosesis, se pa yon etikèt."),
    intro: bilingual("KONEKT separates provider-submitted information, source-backed information, community feedback, and operator review. The interface should never imply more certainty than the evidence supports.", "KONEKT separe enfòmasyon founisè bay, enfòmasyon ki gen sous, opinyon kominote a, ak revizyon ekip la. Koòdone a pa dwe fè kwè gen plis prèv pase sa ki egziste."),
    sections: [
      { title: bilingual("Corrections and reports", "Koreksyon ak rapò"), body: bilingual("Community members can report inaccurate profile information or inappropriate content from public provider profiles.", "Moun nan kominote a ka rapòte enfòmasyon ki pa kòrèk oswa kontni ki pa apwopriye sou pwofil piblik yo.") },
      { title: bilingual("Provider responses", "Repons founisè yo"), body: bilingual("Providers can respond to requests for more information and submit updated evidence through their private workspace.", "Founisè yo ka reponn demann pou plis enfòmasyon epi voye nouvo dokiman nan espas prive yo.") },
      { title: bilingual("Operator decisions", "Desizyon ekip la"), body: bilingual("Publication, verification, suspension, and claim resolution must remain server-controlled moderation actions.", "Piblikasyon, verifikasyon, sispansyon, ak rezolisyon reklamasyon dwe rete aksyon ekip moderasyon an kontwole sou sèvè a.") },
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
    title: bilingual("Language should not stand between a family and the help it needs.", "Lang pa dwe kanpe ant yon fanmi ak sèvis li bezwen."),
    intro: bilingual("KONEKT is a focused directory for Haitian and Haitian Creole-speaking communities. It makes service information easier to find and makes language access visible before the first call.", "KONEKT se yon anyè espesyal pou kominote ayisyen ak moun ki pale Kreyòl. Li fè enfòmasyon sou sèvis pi fasil pou jwenn epi li montre aksè nan lang anvan premye apèl la."),
    sections: [
      { title: bilingual("Built for practical decisions", "Fèt pou desizyon ki itil"), body: bilingual("People need names, locations, hours, services, contact paths, and clear language support, not vague community claims.", "Moun bezwen non, kote, lè, sèvis, kontak, ak sipò nan lang ki klè, pa bèl pawòl ki pa bay enfòmasyon.") },
      { title: bilingual("Community discovery stays open", "Chèche sèvis rete ouvè pou tout moun"), body: bilingual("Community members browse public providers without an account. Authentication begins only when a provider needs to manage a listing.", "Moun nan kominote a gade founisè piblik san kont. Koneksyon kòmanse sèlman lè yon founisè bezwen jere yon pwofil.") },
      { title: bilingual("Trust stays server-controlled", "Konfyans rete kontwole sou sèvè a"), body: bilingual("A phone or website cannot publish or verify itself. Those decisions belong to protected backend policies and authorized operators.", "Yon telefòn oswa yon sit entènèt pa ka pibliye oswa verifye tèt li. Desizyon sa yo rete nan règleman pwoteje sou sèvè a ak men operatè otorize yo.") },
    ],
  },
  "/mission-vision": {
    eyebrow: bilingual("Mission", "Misyon"),
    title: bilingual("Make trusted services easier to find across language barriers.", "Fè sèvis moun ka fè konfyans pi fasil pou jwenn malgre baryè lang."),
    intro: bilingual("KONEKT focuses on the first difficult moment: finding a relevant service and knowing whether Kreyòl support will be available.", "KONEKT konsantre sou premye moman ki difisil la: jwenn bon sèvis la epi konnen si sipò an Kreyòl ap disponib."),
    sections: [
      { title: bilingual("Clarity", "Klète"), body: bilingual("Show what a provider offers, where they work, and how to contact them.", "Montre sèvis founisè a bay, kote li travay, ak kijan pou kontakte li.") },
      { title: bilingual("Language access", "Aksè nan lang"), body: bilingual("Describe direct Kreyòl service, staff support, and interpretation as distinct realities.", "Dekri sèvis dirèk an Kreyòl, sipò anplwaye, ak entèpretasyon kòm twa bagay diferan.") },
      { title: bilingual("Responsible trust", "Konfyans ki responsab"), body: bilingual("Keep public claims, private evidence, and moderation decisions in their proper boundaries.", "Kenbe enfòmasyon piblik, dokiman prive, ak desizyon moderasyon nan bon limit yo.") },
    ],
  },
  "/community-partners": {
    eyebrow: bilingual("Community partners", "Patnè kominotè"),
    title: bilingual("Local knowledge makes a directory useful.", "Konesans lokal fè yon anyè itil."),
    intro: bilingual("KONEKT welcomes conversations with community organizations, service navigators, and trusted local institutions that can improve provider information and language access.", "KONEKT ouvè pou pale ak òganizasyon kominotè, moun ki ede jwenn sèvis, ak enstitisyon lokal ki ka amelyore enfòmasyon sou founisè ak aksè nan lang."),
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
    intro: bilingual("Use the paths below for product questions, provider-profile help, privacy requests, or safety concerns.", "Sèvi ak chemen anba yo pou kesyon sou pwodwi a, èd ak pwofil founisè, demann konfidansyalite, oswa pwoblèm sekirite."),
    sections: [
      { title: bilingual("Community discovery", "Chèche sèvis"), body: bilingual("Community browsing does not require an account. Location and language preferences help narrow public provider results.", "Gade sèvis yo pa mande kont. Kote ak lang ou chwazi ede limite rezilta founisè piblik yo.") },
      { title: bilingual("Provider accounts", "Kont founisè"), body: bilingual("Providers can use Apple sign-in or a one-time email code in the iPhone app. Account deletion is available from the provider workspace.", "Founisè yo ka sèvi ak Apple oswa yon kòd yon sèl fwa pa imèl nan aplikasyon iPhone lan. Yo ka efase kont yo nan espas founisè a.") },
      { title: bilingual("Direct support", "Sipò dirèk"), body: bilingual(`Email ${SITE.supportEmail}. Do not send passwords, verification codes, or private provider documents by email.`, `Voye imèl bay ${SITE.supportEmail}. Pa voye modpas, kòd verifikasyon, oswa dokiman prive pa imèl.`) },
    ],
    cta: { label: bilingual("Email support", "Voye imèl bay sipò"), href: `mailto:${SITE.supportEmail}` },
  },
  "/contact-support": {
    eyebrow: bilingual("Support", "Sipò"),
    title: bilingual("Tell us what you need help with.", "Di nou ki èd ou bezwen."),
    intro: bilingual(`Email ${SITE.supportEmail} for product support, profile corrections, privacy requests, or safety concerns.`, `Voye imèl bay ${SITE.supportEmail} pou sipò pwodwi, koreksyon pwofil, demann konfidansyalite, oswa pwoblèm sekirite.`),
    sections: [
      { title: bilingual("Include useful context", "Mete enfòmasyon ki itil"), body: bilingual("Share the provider name, the screen or workflow involved, and what you expected to happen. Never email a password or one-time verification code.", "Bay non founisè a, ekran oswa etap la, ak sa ou te espere ki ta rive. Pa janm voye modpas oswa kòd yon sèl fwa pa imèl.") },
      { title: bilingual("Private evidence", "Dokiman prive"), body: bilingual("Provider verification documents belong in the protected in-app workflow, not ordinary support email.", "Dokiman verifikasyon founisè dwe ale nan chemen pwoteje andedan aplikasyon an, pa nan imèl nòmal.") },
    ],
    cta: { label: bilingual("Email KONEKT support", "Voye imèl bay sipò KONEKT"), href: `mailto:${SITE.supportEmail}` },
  },
  "/privacy-policy": {
    eyebrow: bilingual("Privacy", "Konfidansyalite"),
    title: bilingual("Privacy follows the product boundary.", "Konfidansyalite suiv limit pwodwi a."),
    intro: bilingual("Last updated August 23, 2026. This summary describes the current KONEKT website and mobile-product behavior. It does not invent analytics, ticketing, payment, or community-account collection that the product does not use.", "Dènye mizajou 23 out 2026. Rezime sa a dekri konpòtman aktyèl sit entènèt ak pwodwi mobil KONEKT. Li pa pretann nou sèvi ak analiz, tikè, peman, oswa kont kominotè pwodwi a pa itilize."),
    sections: [
      { title: bilingual("Public community discovery", "Rechèch piblik nan kominote a"), body: bilingual("Community members can browse published provider information without creating an account. Language and location preferences may be stored on the device to support the experience.", "Moun nan kominote a ka gade enfòmasyon founisè ki pibliye san yo pa kreye kont. Lang ak kote yo chwazi ka rete sou aparèy la pou ede eksperyans lan.") },
      { title: bilingual("Provider accounts", "Kont founisè"), body: bilingual("Providers authenticate through Supabase using Apple sign-in or a one-time email code. Account and provider-workspace information is used to protect ownership and manage submitted listings.", "Founisè yo konekte atravè Supabase ak Apple oswa yon kòd yon sèl fwa pa imèl. Enfòmasyon kont ak espas founisè sèvi pou pwoteje pwopriyetè a epi jere pwofil yo voye.") },
      { title: bilingual("Location", "Kote"), body: bilingual("The mobile experience can use location permission or a manually entered city or ZIP code to scope provider discovery. Permission remains under device control.", "Eksperyans mobil la ka sèvi ak pèmisyon kote oswa yon vil oswa kòd postal moun antre pou limite rechèch. Pèmisyon an rete anba kontwòl aparèy la.") },
      { title: bilingual("Provider media and evidence", "Foto ak dokiman founisè"), body: bilingual("Approved profile media may be public. Verification documents stay private and are accessed only through protected owner and administrator workflows.", "Foto pwofil ki apwouve ka piblik. Dokiman verifikasyon rete prive epi sèlman pwopriyetè ak administratè otorize ka jwenn yo nan chemen pwoteje.") },
      { title: bilingual("Deletion and requests", "Efase done ak lòt demann"), body: bilingual(`Providers can request account deletion in the app. For privacy questions or correction requests, email ${SITE.supportEmail}.`, `Founisè yo ka mande pou efase kont yo nan aplikasyon an. Pou kesyon konfidansyalite oswa koreksyon, voye imèl bay ${SITE.supportEmail}.`) },
      { title: bilingual("Website data", "Done sit entènèt"), body: bilingual("This landing page does not currently run a behavioral analytics pipeline or collect a newsletter form. If that changes, this notice must be updated before collection begins.", "Paj sa a pa sèvi ak yon sistèm analiz konpòtman epi li pa ranmase fòm bilten kounye a. Si sa chanje, avi sa a dwe mete ajou anvan koleksyon kòmanse.") },
    ],
  },
  "/terms": {
    eyebrow: bilingual("Terms", "Kondisyon"),
    title: bilingual("Use KONEKT as a directory, not a guarantee.", "Sèvi ak KONEKT kòm yon anyè, pa kòm yon garanti."),
    intro: bilingual("Last updated August 23, 2026. KONEKT helps people discover and contact services. Provider information can change, and users should confirm important details directly with the provider.", "Dènye mizajou 23 out 2026. KONEKT ede moun jwenn epi kontakte sèvis. Enfòmasyon founisè ka chanje, epi moun dwe konfime detay enpòtan dirèkteman ak founisè a."),
    sections: [
      { title: bilingual("Directory information", "Enfòmasyon anyè a"), body: bilingual("A listing does not create an endorsement, professional relationship, or guarantee of availability, outcome, licensing, or quality.", "Yon pwofil pa vle di KONEKT rekòmande sèvis la, li pa kreye relasyon pwofesyonèl, epi li pa garanti disponiblite, rezilta, lisans, oswa kalite.") },
      { title: bilingual("Healthcare, legal, and financial decisions", "Desizyon sante, legal, ak finansye"), body: bilingual("KONEKT does not provide medical, legal, financial, or emergency advice. Contact qualified professionals and emergency services when appropriate.", "KONEKT pa bay konsèy medikal, legal, finansye, oswa ijans. Kontakte pwofesyonèl kalifye ak sèvis ijans lè sa nesesè.") },
      { title: bilingual("Provider submissions", "Enfòmasyon founisè voye"), body: bilingual("Providers must submit accurate information, use media they are authorized to share, protect private evidence, and avoid misleading language-access or trust claims.", "Founisè dwe bay enfòmasyon ki kòrèk, sèvi ak foto yo gen dwa pataje, pwoteje dokiman prive, epi evite reklamasyon ki twonpe moun sou lang oswa konfyans.") },
      { title: bilingual("Reports and moderation", "Rapò ak moderasyon"), body: bilingual("KONEKT may review, correct, unpublish, suspend, or remove content when needed to protect directory accuracy and users. No fixed response-time guarantee is made on this page.", "KONEKT ka revize, korije, retire nan piblik, sispann, oswa efase kontni pou pwoteje presizyon anyè a ak itilizatè yo. Paj sa a pa pwomèt yon delè fiks pou repons.") },
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
