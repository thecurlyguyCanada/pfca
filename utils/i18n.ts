export type Language = 'en' | 'fr';

export const translations = {
  en: {
    builtIn: "Built in Canada",
    title: "The Polite PDF Tools",
    subtitle: "Free, Secure, Canadian.",
    description: "We help you manage your documents without the fuss. Select a tool below, eh?",
    localProcessing: "100% Local Processing",
    localProcessingDesc: "Your files never leave your browser. All processing happens on your device.",
    noSignup: "No Signup Required",
    secure: "Secure & Private",
    guarantee: "Sorry-free Guarantee",

    // SEO General
    seo: {
      homeTitle: "pdfcanada.ca | Free PDF Tools | Proudly Canadian 🇨🇦",
      homeDesc: "Proudly Canadian. The most polite PDF tools in Canada. Secure local processing for deleting pages, rotating PDFs, and converting HEIC/EPUB.",
      pricingTitle: "Free PDF Tools Pricing | Only $0 Forever | pdfcanada.ca",
      pricingDesc: "Unbelievably free PDF tools. $0 CAD for unlimited file conversions, merges, and edits. No hidden fees, no subscriptions, just polite Canadian service.",
      privacyTitle: "Privacy Policy - pdfcanada.ca | Secure & Local",
      privacyDesc: "We respect your data. All PDF processing happens locally in your browser via WebAssembly. No file uploads.",
      termsTitle: "Terms of Service - pdfcanada.ca",
      termsDesc: "Our polite terms of service. Be nice, use the tools freely.",
      howtoTitle: "How to Use pdfcanada.ca | PDF Tutorials",
      howtoDesc: "Easy instructions on how to delete PDF pages, rotate documents, and convert files using pdfcanada.ca.",
      supportTitle: "Support Local Canadian Developers | Donate | pdfcanada.ca",
      supportDesc: "Support the Canadian team building free, privacy-focused PDF tools. Buy us a coffee or a timbit to keep the servers running.",
      sorryTitle: "Sorry Policy - pdfcanada.ca",
      sorryDesc: "Our guarantee to apologize if anything goes wrong. The most Canadian policy on the web.",
      fillableTitle: "How to make a PDF fillable | pdfcanada.ca",
      fillableDesc: "Learn how to make a PDF fillable for free using our Canadian tools. Add text fields to flat PDFs securely and locally."
    },

    // Feature Pages SEO & Content
    pricingPage: {
      content: "At pdfcanada.ca, we believe that essential document tools should be free, accessible, and private. That's why we've committed to a $0 price tag for all our core features. Whether you need to delete pages, rotate a PDF, or convert formats, you'll never hit a paywall here. We rely on the generosity of our users (and our love for the game) to keep things running. If you're looking for free pdf tools Canada, you've found the best spot on the web.",
      faq: [
        {
          question: "Is pdfcanada.ca really free?",
          answer: "You betcha! Every tool on our site is completely free to use. we don't watermark your files or limit how many you can process."
        },
        {
          question: "Do I need a credit card for the free plan?",
          answer: "No way, eh. No credit card, no signup, no hassle. Just upload your file and get to work."
        },
        {
          question: "Why is it free? What's the catch?",
          answer: "No catch. We run lean using local processing technology (your browser does the work), so our server costs are low. We accept optional donations (Timbits!) to cover the basics."
        },
        {
          question: "Can I use this for my business?",
          answer: "Absolutely. Our free PDF tools are perfect for small businesses, freelancers, and anyone who wants to save money on expensive software."
        },
        {
          question: "How does the 'Timbits' support work?",
          answer: "It's an optional $1 tip. If you love our service and want to say thanks, you can 'buy us a Timbit'. It helps us keep the lights on and the code flowing."
        }
      ]
    },
    supportPage: {
      content: "We're a small team of developers based in Toronto, Ontario, dedicated to building the most polite and private PDF tools on the internet. Unlike big corporations that harvest your data, we built pdfcanada.ca to process everything locally on your device. Your files never leave your computer. By supporting us, you're backing indie Canadian software and helping us maintain a free utility for everyone.",
      faq: [
        {
          question: "How can I support pdfcanada.ca?",
          answer: "The best way is to share our tools with your friends! If you have a loonie to spare, you can also use our 'Drop a Loonie' button to send a small tip."
        },
        {
          question: "Where does my donation go?",
          answer: "Every dollar acts as a vote of confidence. It goes towards server costs (hosting), domain fees, and maybe a double-double for the dev team during late-night coding sessions."
        },
        {
          question: "Is my payment secure?",
          answer: "Yes. We use Stripe for all transactions. We never see or store your credit card information."
        },
        {
          question: "Why should I support local software?",
          answer: "Supporting local means you're helping build a tech ecosystem that respects privacy and values users over profit. Plus, it's the Canadian thing to do, eh?"
        },
        {
          question: "Do you offer refunds on tips?",
          answer: "Since it's a small donation, we generally don't, but if you made a mistake, just reach out. We'll apologize and sort it out."
        }
      ]
    },
    features: {
      delete: {
        title: "Delete PDF Pages Free | Remove Pages Online | pdfcanada.ca",
        desc: "Remove pages from your PDF securely and for free. Processed locally in Canada. No file uploads required.",
        h1: "Delete PDF Pages",
        subtitle: "The polite way to remove unwanted pages.",
        content: "Need to remove a page from your document? Maybe there's a blank page, or some sensitive info you'd rather not share. Our tool lets you select and delete specific pages from your PDF file. It happens instantly in your browser.",
        steps: [
          "Click the 'Select File' button to choose your PDF document.",
          "You will see thumbnails of all your pages. Simply click on the pages you wish to remove. They will be marked with a trash icon.",
          "Click 'Remove Pages' to instantly download your clean, updated PDF."
        ]
      },
      rotate: {
        title: "Rotate PDF Pages Permanently | Free Tool | pdfcanada.ca",
        desc: "Rotate PDF pages left or right and save them permanently. Fix upside-down documents instantly.",
        h1: "Rotate PDF Pages",
        subtitle: "Fix those upside-down scans, eh?",
        content: "Scanned a document the wrong way? We've all been there. Use this tool to rotate individual pages or the whole document left or right. We'll save a new copy that's oriented correctly.",
        steps: [
          "Upload your PDF file using the file selector.",
          "Click the rotate button on individual pages to turn them 90 degrees, or use the 'Rotate All' buttons at the top.",
          "When it looks right, click 'Apply Rotation' to save your new PDF."
        ]
      },
      heic: {
        title: "HEIC to PDF Converter | Convert iPhone Photos | pdfcanada.ca",
        desc: "Convert HEIC to PDF instantly. Our free HEIC to PDF converter transforms iPhone photos into PDF files securely in your browser. No uploads, proudly Canadian.",
        h1: "Convert HEIC to PDF | iPhone Photo Converter",
        subtitle: "Make iPhone photos compatible with everything, eh?",
        content: "If you've ever tried to send an iPhone photo to a PC or upload it to a government form, you've probably run into the .HEIC problem. Apple devices use HEIC files for photos, which are great for saving space but tricky for sharing. That's where we come in. Our tool lets you convert heic to pdf quickly and easily. Whether you're wondering how do i convert heic to pdf for a job application or how to change a heic file to pdf for your taxes, our Canadian-made tool is the answer.\n\nWe process your files locally, which means if you need to know how to change heic to pdf without uploading your personal photos to a server, this is the safest way. You can change heic file to pdf or even combine heic to pdf (by converting them one by one!) without worrying about privacy. We support standard .heic files and turn them into high-quality PDFs.\n\nSo, if you're looking for a heic to pdf converter that respects your data, give pdfcanada.ca a try. We help you learn how to change a heic to a pdf instantly. No need for expensive software like Adobe convert heic to pdf—our free tool does the trick right in your browser. From conversion heic to pdf to ensuring your memories are safe, we've got you covered.",
        steps: [
          "Select your .HEIC image file from your computer or phone.",
          "Our tool automatically processes the image locally in your browser to convert it.",
          "Click 'Download' to save your new PDF file."
        ],
        faq: [
          {
            question: "How do I convert HEIC to PDF for free?",
            answer: "It's simple! Use our heic to pdf converter above. Just select your file, and we'll handle the conversion heic to pdf right here on your device."
          },
          {
            question: "How do you convert HEIC to PDF on Windows?",
            answer: "Windows doesn't always open HEIC files by default. But you can use our website to change heic file to pdf instantly without installing any plugins."
          },
          {
            question: "How to change a HEIC to PDF on iPhone?",
            answer: "You can use this site directly on your iPhone! It's a quick way to convert heic to pdf convert tasks without downloading extra apps."
          },
          {
            question: "Can I combine HEIC to PDF?",
            answer: "Currently, we convert one image at a time to keep things fast and simple. You can convert multiple files one after another to change from heic to pdf."
          },
          {
            question: "Is it secure to change HEIC to PDF here?",
            answer: "Absolutely. Unlike other tools (like heic to pdf ilovepdf), we process everything locally. Your photos never leave your device, making it the safest way to convert a heic to pdf."
          }
        ]
      },
      epubToPdf: {
        title: "EPUB to PDF Converter | Convert Ebook to PDF | pdfcanada.ca",
        desc: "Convert EPUB to PDF instantly. Our free EPUB to PDF converter transforms ebooks into PDF files securely in your browser. No uploads, proudly Canadian.",
        h1: "Convert EPUB to PDF | The Ultimate Ebook Converter",
        subtitle: "Turn those ebooks into PDFs, eh? Fast, free, and secure.",
        content: "Looking to convert an EPUB to PDF? You've landed in the right spot, friend. Whether you need to print an ebook, share it with a colleague who doesn't have an e-reader, or just prefer the universality of a PDF, our tool is here to help. Using our free EPUB to PDF converter, you can easily change EPUB to PDF format without your file ever leaving your computer. That's right—we process everything locally, making it the safest way to transform PDF to EPUB or vice versa. We handle the formatting so you don't have to worry about how to convert epub to pdf manually.\n\nWhy use our tool? Well, if you're wondering how do i convert epub to pdf without signing up for sketchy sites, this is your answer. We support standard .epub files and convert them into clean, readable PDFs. This is perfect for students, professionals, and anyone who needs to translate epub to pdf for wider compatibility. So if you need to convert a epub to pdf, convert an epub to pdf, or just want a reliable epub file convert to pdf solution, give ours a try. It's built right here in Canada, and we promise to treat your files with the utmost respect. No data collection, just simple, polite conversion.",
        steps: [
          "Click 'Select File' to upload your .epub file.",
          "Our local engine will instantly start to convert epub to pdf format directly in your browser.",
          "Wait a brief moment as we format the pages to look just right.",
          "Download your new PDF file. It's now ready to open on any device that supports PDF!"
        ],
        faq: [
          {
            question: "How to convert EPUB to PDF for free?",
            answer: "It's super easy, eh! Just use our tool above. Upload your file, and we convert epub to pdf instantly in your browser. No hidden fees, no subscriptions."
          },
          {
            question: "How do I convert EPUB to PDF without losing formatting?",
            answer: "Our smart converter tries its best to preserve your ebook's layout. We transform the EPUB structure into standard PDF pages so it looks great on any screen or paper."
          },
          {
            question: "Can I convert an EPUB file to PDF on my phone?",
            answer: "You sure can! Our site works great on mobile. Whether you're on iPhone or Android, you can change epub to pdf right from your browser."
          },
          {
            question: "How to open EPUB file as PDF?",
            answer: "You can't open an EPUB directly as a PDF, you need to convert it first. Use our simple tool to convert epub file to pdf, and then you can open it in Adobe Reader, Preview, or any other PDF viewer."
          },
          {
            question: "Is it safe to convert my ebook online?",
            answer: "With pdfcanada.ca, it is! We process everything locally on your device. Unlike other sites where you upload your book to a server, we convert an epub to pdf right on your computer. Your files never leave your hands."
          }
        ]
      },
      pdfToEpub: {
        title: "PDF to EPUB Converter | Create Ebooks from PDF | pdfcanada.ca",
        desc: "Convert PDF to EPUB format for better reading on Kindle, Kobo, and other e-readers. Free, secure, and processing happens locally.",
        h1: "Convert PDF to EPUB | Make Your Docs E-Reader Ready",
        subtitle: "Take your documents to go on your Kobo or Kindle.",
        content: "Trying to read a standard PDF on an e-reader can be a bit of a hassle, eh? Text is too small, zooming is awkward... that's where we come in. Our tool lets you convert pdf to epub format, making your documents reflowable and easy to read on any screen size. Whether you're looking to convert pdf file to epub for your morning commute or need a reliable pdf to epub converter for your personal library, we've got you covered.\n\nWe know you might be asking, 'how do you convert pdf to epub securely?' or 'how to convert pdf to epub without losing my data?' The answer is local processing. Unlike other tools that upload your private docs to a server, our AI-enhanced engine handles the convert pdf to epub task right on your device. It minimizes formatting errors and attempts to preserve the structure of your document. If you've been searching for how to turn pdf into epub, how to convert a pdf to an epub, or even AI convert pdf to epub, you'll find our solution robust and privacy-focused.\n\nUse our tool to transform pdf to epub today. It supports converting bulk text and simple images into the .epub format. So stop squinting at tiny PDF text and change epub to pdf (or back again!) with pdfcanada.ca. We make it easy to learn how to convert pdf to epub format and take your reading material with you, wherever the True North leads you.",
        steps: [
          "Select the PDF file you wish to convert to an ebook.",
          "Our system analyzes the text and layout to convert pdf to epub optimally.",
          "The conversion happens locally—secure and fast.",
          "Download your .epub file and transfer it to your Kobo, Kindle, or tablet.",
          "Enjoy a better reading experience, eh!"
        ],
        faq: [
          {
            question: "How to convert PDF to EPUB for Kindle or Kobo?",
            answer: "Most e-readers prefer EPUB files (or KEPUB for Kobo). Simply use our tool to convert pdf to epub format, download the file, and transfer it to your device via USB or email."
          },
          {
            question: "How to turn PDF into EPUB with AI?",
            answer: "Our tool uses smart logic (you could call it AI-lite) to detect paragraphs and headings, helping to AI convert pdf to epub cleanly so text flows naturally on small screens."
          },
          {
            question: "How do you convert PDF to EPUB on Mac or Windows?",
            answer: "You don't need to install any software. Just visit pdfcanada.ca, select your file, and we'll convert pdf file to epub right in your browser. It works on Windows, Mac, and Linux."
          },
          {
            question: "Can I convert scanned PDFs to EPUB?",
            answer: "This tool works best with standard PDFs containing text. For scanned documents, you might want to use our OCR tool first to extract the text, then save it as a digital format."
          },
          {
            question: "How convert PDF to EPUB without formatting errors?",
            answer: "PDFs are fixed-layout, while EPUBs are flowable, so it's tricky! We try our best to strip out headers and footers to give you a clean reading experience."
          }
        ]
      },
      fillable: {
        title: "Make PDF Fillable Online | Free Form Creator | pdfcanada.ca",
        desc: "Add fillable text fields to any PDF. Create interactive forms for free securely.",
        h1: "Make PDF Fillable",
        subtitle: "Auto-detects lines and checkboxes.",
        content: "Turn a flat document into an interactive form. We automatically detect underscores (____) and checkboxes ([ ]) on your selected pages and turn them into real, fillable fields.",
        steps: [
          "Upload a PDF form that has static lines or checkboxes.",
          "Select the pages you want us to scan.",
          "Click 'Auto-Detect & Fill'. We will calculate where the fields should be.",
          "Download your interactive PDF form."
        ]
      },
      ocr: {
        title: "OCR PDF | Make PDF Searchable | pdfcanada.ca",
        desc: "Convert scanned documents and images into searchable, selectable PDF files for free.",
        h1: "OCR PDF & Make Searchable",
        subtitle: "Unlock text in your scans, eh?",
        content: "Turn those flat images and scans into real text you can search and copy. Our OCR tool runs right in your browser—private and secure.",
        steps: ["Upload your scanned PDF.", "Select the languages in your document.", "Download your new searchable PDF."],
        faq: [
          { q: "What is OCR?", a: "OCR stands for Optical Character Recognition. It's the tech that turns pictures of words into actual digital words." },
          { q: "Is it accurate?", a: "Pretty darn good! But handwriting can be tricky. Typed text works best." }
        ]
      },
      organizePdf: {
        title: "Organize PDF Pages | Reorder PDF | pdfcanada.ca",
        desc: "Rearrange PDF pages easily. Drag and drop to reorder pages in your PDF document.",
        h1: "Organize PDF Pages",
        subtitle: "Get your pages in order, eh?",
        content: "Need to fix the page order of your PDF? Our Organize PDF tool lets you drag and drop pages to rearrange them exactly how you want.",
        steps: ["Upload your valid PDF file.", "Drag and drop the page thumbnails to reorder them.", "Click 'Save Organized PDF' to download."],
        faq: [
          { q: "Can I move pages between PDFs?", a: "Not yet! Currently you can only reorder pages within a single file." },
          { q: "Is my original file changed?", a: "No way! We create a new copy with the new order." }
        ]
      }
    },

    // Tools
    toolDelete: "Delete Pages",
    toolDeleteDesc: "Remove unwanted pages.",
    toolRotate: "Rotate PDF",
    toolRotateDesc: "Fix upside-down pages.",
    toolHeic: "HEIC to PDF",
    toolHeicDesc: "Convert iPhone photos.",
    toolEpubToPdf: "EPUB to PDF",
    toolEpubToPdfDesc: "Read ebooks as PDFs.",
    toolPdfToEpub: "PDF to EPUB",
    toolPdfToEpubDesc: "Convert for e-readers.",
    toolMakeFillable: "Make PDF Fillable",
    toolMakeFillableDesc: "Auto-add fields to pages.",
    toolOcr: "OCR PDF",
    toolOcrDesc: "Extract text from scans.",

    // Actions
    uploadTitle: "Upload File",
    uploadDesc: "or drop a file here",
    processedLocally: "Processed locally on your device",
    selectFile: "Select File",
    terms: "By uploading, you agree to our polite Terms of Service.",
    pages: "pages",
    local: "Local",

    // Selection View
    selectPagesHeader: "Select pages:",
    selected: "selected",
    rotateLeft: "Left",
    rotateRight: "Right",
    rotateAllLeft: "Rotate All Left",
    rotateAllRight: "Rotate All Right",
    resetRotations: "Reset",
    selectPagesToFill: "Select pages to scan for fields:",
    selectPagesForOcr: "Select pages to extract text from:",
    ocrProgress: "Recognizing text...",

    // Form Builder
    fbTitle: "Form Builder",
    fbAddText: "Add Text Box",
    fbAddCheckbox: "Add Checkbox",
    fbCancel: "Cancel",
    fbDownload: "Download Form",
    fbPage: "Page",

    // Buttons
    btnRemove: "Remove Pages",
    btnRotate: "Apply Rotation",
    btnConvert: "Convert File",
    btnMakeFillable: "Auto-Detect & Fill",
    btnExtractText: "Extract Text",
    btnSearchablePdf: "Make Searchable PDF",

    working: "Working on it...",
    workingDesc: "Scanning for fields and fixing that up for you, eh.",
    doneTitle: "Beauty! It's done.",
    doneDesc: "Your file is ready.",
    download: "Download",
    doAnother: "Do another one",
    backToHome: "Back to Tools",

    // Errors
    errorTitle: "Oh snap!",
    genericError: "Something went wrong. Sorry!",
    fileTypeErr: "Sorry about that, but we don't accept that file type, eh?",
    readErr: "Sorry, we couldn't read that file. It might be corrupted.",
    passwordErr: "This PDF is password protected. Please unlock it first, eh.",
    corruptPdfErr: "The PDF file appears to be corrupt or invalid.",
    conversionErr: "Failed to convert the file. It might be too complex or damaged.",
    emptyEpubErr: "Could not extract text from this EPUB.",

    // Nav
    navHowTo: "How to use",
    navSupport: "Support Local",
    navPricing: "Pricing",
    login: "Log in",
    signup: "Sign up",

    // Footer
    footerBuilt: "Proudly built in the True North Strong and Free.",
    footerMade: "Made with",
    footerLocation: "and Maple Syrup in Toronto, ON.",
    footerRights: "All rights reserved, sorry.",
    footerTagline: "The Great White North's favorite PDF tool.",
    footerPrivacyNotice: "We don't track you. That wouldn't be polite.",
    termsService: "Terms of Service",
    privacy: "Privacy Policy",
    sorryPolicy: "Sorry Policy",
    makeFillableFooter: "How to make a PDF fillable",

    // Pages Content
    pricingTitle: "Simple Pricing",
    pricingSubtitle: "Honest pricing for honest folks.",
    freePlan: "The 'Hoser' Plan",
    freeCost: "$0 CAD",
    freeFeature1: "Unlimited PDF conversions",
    freeFeature2: "No account required",
    freeFeature3: "Polite error messages",
    freeFeature4: "Local processing (Secure)",
    enterprisePlan: "The 'Double Double' Plan",
    enterpriseCost: "$0 CAD",
    enterpriseFeature1: "Everything in Hoser plan",
    enterpriseFeature2: "We say 'Sorry' twice as much",
    enterpriseFeature3: "Priority maple syrup delivery (optional)",

    // Timbits Support Tier
    timbitsPlan: "The 'Timbits' Tip",
    timbitsCost: "$1 CAD",
    timbitsDesc: "A loonie goes a long way, eh?",
    timbitsFeature1: "Keep servers running in the True North",
    timbitsFeature2: "Fund new features & tools",
    timbitsFeature3: "Support indie Canadian devs",
    timbitsFeature4: "Get our heartfelt thanks",
    timbitsButton: "Drop a Loonie",

    privacyTitle: "Privacy Policy",
    privacyText1: "At pdfcanada.ca, we believe that your business is your business. Because we process files locally on your device using WebAssembly technology, your documents never actually upload to our servers.",
    privacyText2: "We don't use cookies to track you across the web. We don't sell your data. We don't even ask for your email. It's just you and your PDF.",

    termsTitle: "Terms of Service",
    termsText1: "By using this service, you agree to be nice.",
    termsText2: "Please don't use our tools for illegal stuff. That's not cool.",
    termsText3: "We provide this service 'as is'. If it breaks, we're really sorry, but we can't be held liable for lost data. Always keep a backup, eh?",

    sorryTitle: "Our Official Sorry Policy",
    sorryText1: "In the unlikely event that something goes wrong:",
    sorryList1: "1. We will apologize immediately.",
    sorryList2: "2. We will try to fix it.",
    sorryList3: "3. We will apologize again, just to be safe.",

    howtoTitle: "How to use",
    howtoStep1: "Select a tool from the main dashboard.",
    howtoStep2: "Choose your file (PDF, HEIC, or EPUB).",
    howtoStep3: "Follow the polite instructions on screen.",
    howtoStep4: "Download your new file. Easy peasy.",

    fillablePageTitle: "How to make a PDF fillable",
    fillablePageSubtitle: "The polite guide to creating interactive forms.",
    fillableIntro: "Looking to create a document that people can actually type into? We use smart technology to find lines and checkboxes automatically.",
    fillableStep1: "Upload your PDF to our 'Make PDF Fillable' tool.",
    fillableStep2: "Select the pages where you want people to be able to type.",
    fillableStep3: "We automatically find '_____' lines and '[ ]' boxes and make them interactive.",
    fillableStep4: "Download and share. Your recipients can now type directly on the page.",
    fillableProTip: "Pro Tip: Use standard underscores for the best detection results.",
    fillableWhy: "Why use our tool?",
    fillableWhyText: "Most software that does this costs an arm and a leg. We do it for free, locally on your device, because that's the neighbourly thing to do."
  },
  fr: {
    builtIn: "Fait au Canada",
    title: "Outils PDF Polis",
    subtitle: "Gratuit, Sécurisé, Canadien.",
    description: "On vous aide à gérer vos documents sans tracas. Choisissez un outil ci-dessous.",
    localProcessing: "Traitement 100 % local",
    localProcessingDesc: "Vos fichiers ne quittent jamais votre navigateur.",
    noSignup: "Aucune inscription",
    secure: "Sécurisé et privé",
    guarantee: "Garantie sans excuses",

    seo: {
      homeTitle: "pdfcanada.ca | Outils PDF Gratuits | Fièrement Canadien 🇨🇦",
      homeDesc: "Fièrement Canadien. Les outils PDF les plus polis au Canada. Traitement local sécurisé pour supprimer des pages, faire pivoter des PDF et convertir HEIC/EPUB.",
      pricingTitle: "Tarifs - pdfcanada.ca | Toujours Gratuit",
      pricingDesc: "Nos prix sont simples : 0 $ CAD pour tout le monde. Conversions illimitées et traitement local.",
      privacyTitle: "Confidentialité - pdfcanada.ca | Sécurisé & Local",
      privacyDesc: "Nous respectons vos données. Tout le traitement se fait localement dans votre navigateur via WebAssembly.",
      termsTitle: "Conditions d'utilisation - pdfcanada.ca",
      termsDesc: "Nos conditions d'utilisation polies. Soyez gentil, utilisez les outils librement.",
      howtoTitle: "Mode d'emploi - pdfcanada.ca",
      howtoDesc: "Instructions faciles pour supprimer des pages PDF, faire pivoter des documents et convertir des fichiers.",
      supportTitle: "Soutenir Local - pdfcanada.ca",
      supportDesc: "Soutenez l'équipe canadienne qui crée des outils PDF gratuits axés sur la confidentialité.",
      sorryTitle: "Politique d'Excuses - pdfcanada.ca",
      sorryDesc: "Notre garantie de nous excuser si quelque chose tourne mal.",
      fillableTitle: "Comment rendre un PDF remplissable | pdfcanada.ca",
      fillableDesc: "Apprenez à rendre un PDF remplissable gratuitement avec nos outils canadiens."
    },

    features: {
      delete: {
        title: "Supprimer Pages PDF | Outil Gratuit | pdfcanada.ca",
        desc: "Supprimez des pages de vos PDF gratuitement et en toute sécurité. Traitement local au Canada.",
        h1: "Supprimer des pages PDF",
        subtitle: "La façon polie de faire le ménage.",
        content: "Besoin de retirer une page de votre document ? Notre outil vous permet de sélectionner et supprimer des pages spécifiques instantanément.",
        steps: [
          "Cliquez sur le bouton 'Choisir un fichier' pour sélectionner votre document PDF.",
          "Vous verrez les miniatures de toutes vos pages. Cliquez simplement sur les pages que vous souhaitez supprimer. Elles seront marquées d'une icône de corbeille.",
          "Cliquez sur 'Supprimer' pour télécharger instantanément votre PDF mis à jour."
        ]
      },
      rotate: {
        title: "Pivoter PDF Gratuit | Rotation Permanente | pdfcanada.ca",
        desc: "Pivotez des pages PDF à gauche ou à droite. Corrigez les documents à l'envers.",
        h1: "Pivoter des pages PDF",
        subtitle: "Remettez vos documents à l'endroit.",
        content: "Vous avez numérisé une page à l'envers ? Ça arrive. Utilisez cet outil pour pivoter les pages individuellement ou tout le document.",
        steps: [
          "Téléversez votre fichier PDF.",
          "Cliquez sur le bouton de rotation des pages individuelles pour les faire tourner de 90 degrés, ou utilisez les boutons 'Tout Pivoter' en haut.",
          "Quand tout semble correct, cliquez sur 'Appliquer' pour sauvegarder votre nouveau PDF."
        ]
      },
      heic: {
        title: "Convertir HEIC en PDF | Photos iPhone | pdfcanada.ca",
        desc: "Convertissez des photos HEIC (iPhone) en PDF. Rapide, gratuit et sécurisé.",
        h1: "Convertir HEIC en PDF",
        subtitle: "Pour vos photos iPhone.",
        content: "Les appareils Apple utilisent le format HEIC. Parfois, on a besoin d'un PDF. Convertissez vos images ici.",
        steps: [
          "Sélectionnez votre fichier image .HEIC depuis votre ordinateur ou téléphone.",
          "Notre outil convertit automatiquement l'image localement dans votre navigateur.",
          "Cliquez sur 'Télécharger' pour sauvegarder votre nouveau fichier PDF."
        ]
      },
      epubToPdf: {
        title: "Convertir EPUB en PDF | Ebooks | pdfcanada.ca",
        desc: "Convertissez des livres EPUB en PDF en ligne. Gardez votre mise en page.",
        h1: "Convertir EPUB en PDF",
        subtitle: "Lisez vos ebooks partout.",
        content: "Imprimez ou lisez vos ebooks sur n'importe quel appareil en les convertissant en PDF.",
        steps: [
          "Téléversez votre fichier .epub.",
          "Attendez un instant pendant que nous formatons le livre en pages.",
          "Téléchargez votre nouveau PDF prêt à être imprimé ou partagé."
        ]
      },
      pdfToEpub: {
        title: "Convertir PDF en EPUB | Pour Liseuses | pdfcanada.ca",
        desc: "Convertissez des PDF en format EPUB pour liseuses Kobo ou Kindle.",
        h1: "Convertir PDF en EPUB",
        subtitle: "Pour une meilleure lecture.",
        content: "Transformez vos documents PDF en format EPUB fluide pour votre liseuse préférée.",
        steps: [
          "Sélectionnez le PDF que vous voulez lire sur votre liseuse.",
          "Notre outil extrait le texte et tente de créer une structure d'ebook fluide.",
          "Téléchargez le fichier .epub et transférez-le sur votre appareil."
        ]
      },
      fillable: {
        title: "Rendre PDF Remplissable | Formulaire Gratuit | pdfcanada.ca",
        desc: "Ajoutez des champs de texte remplissables à n'importe quel PDF.",
        h1: "Rendre un PDF Remplissable",
        subtitle: "Détection automatique des lignes et cases.",
        content: "Transformez un document plat en formulaire interactif. Nous détectons automatiquement les lignes (____) et les cases ([ ]) et les rendons remplissables.",
        steps: [
          "Téléversez un formulaire PDF qui contient des lignes statiques ou des cases à cocher.",
          "Sélectionnez les pages que vous voulez scanner.",
          "Cliquez sur 'Détecter et Remplir'. Nous calculerons où les champs devraient être.",
          "Téléchargez votre formulaire PDF interactif."
        ]
      },
      ocr: {
        title: "OCR PDF | PDF Cherchable | pdfcanada.ca",
        desc: "Convertissez des documents numérisés en PDF consultables gratuitement.",
        h1: "OCR PDF et Recherche",
        subtitle: "Libérez le texte, hein ?",
        content: "Transformez vos images et scans en vrai texte que vous pouvez copier. Notre outil OCR fonctionne dans votre navigateur.",
        steps: ["Téléchargez votre PDF numérisé.", "Sélectionnez la langue.", "Téléchargez votre nouveau PDF consultable."],
        faq: [
          { q: "C'est quoi l'OCR ?", a: "La reconnaissance optique de caractères. Ça transforme les images de mots en vrais mots." }
        ]
      },
      organizePdf: {
        title: "Organiser les pages PDF | Réorganiser PDF | pdfcanada.ca",
        desc: "Réorganisez facilement les pages PDF. Glissez-déposez pour changer l'ordre.",
        h1: "Organiser les pages PDF",
        subtitle: "Mettez de l'ordre, hein ?",
        content: "Besoin de changer l'ordre des pages ? Notre outil vous permet de glisser-déposer les pages pour les réorganiser exactement comme vous le souhaitez.",
        steps: ["Téléchargez votre fichier PDF.", "Glissez-déposez les vignettes pour les réorganiser.", "Cliquez sur 'Enregistrer' pour télécharger."],
        faq: [
          { q: "Puis-je déplacer des pages entre PDF ?", a: "Pas encore ! Pour l'instant, uniquement au sein d'un même fichier." }
        ]
      }
    },

    toolDelete: "Supprimer des pages",
    toolDeleteDesc: "Enlever les pages inutiles.",
    toolRotate: "Pivoter PDF",
    toolRotateDesc: "Arranger les pages à l'envers.",
    toolHeic: "HEIC en PDF",
    toolHeicDesc: "Convertir photos iPhone.",
    toolEpubToPdf: "EPUB en PDF",
    toolEpubToPdfDesc: "Lire ebooks en PDF.",
    toolPdfToEpub: "PDF en EPUB",
    toolPdfToEpubDesc: "Convertir pour liseuses.",
    toolMakeFillable: "Rendre PDF Remplissable",
    toolMakeFillableDesc: "Ajouter des zones de texte auto.",
    toolOcr: "OCR PDF",
    toolOcrDesc: "Extraire texte des scans.",

    uploadTitle: "Téléverser",
    uploadDesc: "ou glisser un fichier ici",
    processedLocally: "Traitement local",
    selectFile: "Choisir un fichier",
    terms: "En téléversant, vous acceptez nos conditions polies.",
    pages: "pages",
    local: "Local",

    selectPagesHeader: "Sélectionnez les pages :",
    selected: "sélectionnées",
    rotateLeft: "Gauche",
    rotateRight: "Droite",
    rotateAllLeft: "Tout Pivoter Gauche",
    rotateAllRight: "Tout Pivoter Droite",
    resetRotations: "Réinitialiser",
    selectPagesToFill: "Sélectionnez les pages à scanner :",
    selectPagesForOcr: "Sélectionnez les pages pour l'OCR :",
    ocrProgress: "Reconnaissance du texte...",

    btnRemove: "Supprimer",
    btnRotate: "Appliquer",
    btnConvert: "Convertir",
    btnMakeFillable: "Détecter et Remplir",
    btnExtractText: "Extraire le Texte",
    btnSearchablePdf: "Créer PDF Recherchable",

    working: "On y travaille...",
    workingDesc: "On scanne pour les champs et on arrange ça.",
    doneTitle: "C'est tiguidou !",
    doneDesc: "Votre fichier est prêt.",
    download: "Télécharger",
    doAnother: "En faire un autre",
    backToHome: "Retour aux outils",

    errorTitle: "Ah zut !",
    genericError: "Quelque chose a mal tourné. Désolé !",
    fileTypeErr: "Désolé, mais on n'accepte pas ce type de fichier.",
    readErr: "Désolé, on n'a pas pu lire ce fichier.",
    passwordErr: "Ce PDF est protégé par mot de passe. Veuillez le déverrouiller d'abord.",
    corruptPdfErr: "Le fichier PDF semble corrompu ou invalide.",
    conversionErr: "Échec de la conversion du fichier. Il est peut-être trop complexe ou endommagé.",
    emptyEpubErr: "Impossible d'extraire le texte de cet EPUB.",

    navHowTo: "Aide",
    navSupport: "Soutenir local",
    navPricing: "Tarifs",
    login: "Connexion",
    signup: "S'inscrire",

    footerBuilt: "Fièrement bâti dans le Nord fort et libre.",
    footerMade: "Fait avec",
    footerLocation: "et du sirop d'érable à Toronto, ON.",
    footerRights: "Tous droits réservés, désolé.",
    footerTagline: "L'outil PDF préféré du Grand Nord Blanc.",
    footerPrivacyNotice: "On ne vous suit pas. Ce ne serait pas poli.",
    termsService: "Conditions",
    privacy: "Confidentialité",
    sorryPolicy: "Politique d'excuses",
    makeFillableFooter: "Comment rendre un PDF remplissable",

    pricingTitle: "Tarification Simple",
    pricingSubtitle: "Prix honnêtes pour gens honnêtes.",
    freePlan: "Le plan 'Gars des vues'",
    freeCost: "0 $ CAD",
    freeFeature1: "Conversions illimitées",
    freeFeature2: "Pas de compte requis",
    freeFeature3: "Messages d'erreur polis",
    freeFeature4: "Traitement local (Sécurisé)",
    enterprisePlan: "Le plan 'Double Double'",
    enterpriseCost: "0 $ CAD",
    enterpriseFeature1: "Tout du plan de base",
    enterpriseFeature2: "On s'excuse deux fois plus",
    enterpriseFeature3: "Livraison de sirop prioritaire (optionnel)",

    // Timbits Support Tier
    timbitsPlan: "Le pourboire 'Timbits'",
    timbitsCost: "1 $ CAD",
    timbitsDesc: "Un huard, ça fait la différence!",
    timbitsFeature1: "Garder les serveurs au pays",
    timbitsFeature2: "Financer de nouveaux outils",
    timbitsFeature3: "Soutenir des devs canadiens",
    timbitsFeature4: "Recevoir nos remerciements",
    timbitsButton: "Donner un Huard",

    // Form Builder
    fbTitle: "Créateur de Formulaire",
    fbAddText: "Ajouter Texte",
    fbAddCheckbox: "Ajouter Case",
    fbCancel: "Annuler",
    fbDownload: "Télécharger",
    fbPage: "Page",

    privacyTitle: "Politique de Confidentialité",
    privacyText1: "Chez pdfcanada.ca, vos affaires sont vos affaires. Parce qu'on traite les fichiers localement, vos documents ne sont jamais envoyés sur nos serveurs.",
    privacyText2: "On n'utilise pas de cookies pour vous suivre. On ne vend pas vos données. C'est juste vous et votre PDF.",

    termsTitle: "Conditions d'utilisation",
    termsText1: "En utilisant ce service, vous acceptez d'être gentil.",
    termsText2: "S'il vous plaît, n'utilisez pas nos outils pour des trucs illégaux.",
    termsText3: "Service fourni 'tel quel'. Si ça brise, on est vraiment désolé.",

    sorryTitle: "Notre Politique d'Excuses",
    sorryText1: "Dans le cas peu probable où quelque chose cloche :",
    sorryList1: "1. On va s'excuser immédiatement.",
    sorryList2: "2. On va essayer d'arranger ça.",
    sorryList3: "3. On va s'excuser encore, juste au cas.",

    howtoTitle: "Comment ça marche",
    howtoStep1: "Choisissez un outil sur le tableau de bord.",
    howtoStep2: "Sélectionnez votre fichier (PDF, HEIC, ou EPUB).",
    howtoStep3: "Suivez les instructions polies à l'écran.",
    howtoStep4: "Téléchargez votre nouveau fichier. Facile.",

    fillablePageTitle: "Comment rendre un PDF remplissable",
    fillablePageSubtitle: "Le guide poli pour créer des formulaires.",
    fillableIntro: "Vous voulez que les gens puissent écrire dans votre document ?",
    fillableStep1: "Téléversez votre PDF dans notre outil.",
    fillableStep2: "Sélectionnez les pages.",
    fillableStep3: "Nous ajoutons une boîte de texte.",
    fillableStep4: "Téléchargez et partagez.",
    fillableProTip: "Conseil de pro : Idéal pour les formulaires.",
    fillableWhy: "Pourquoi nous utiliser ?",
    fillableWhyText: "C'est gratuit et canadien.",
    pricingPage: {
      content: "Chez pdfcanada.ca, nous croyons que les outils essentiels doivent être gratuits. C'est pourquoi nos fonctionnalités de base sont à 0 $. Pas de frais cachés. Si vous cherchez des outils PDF gratuits au Canada, vous êtes au bon endroit.",
      faq: [
        {
          question: "Est-ce vraiment gratuit ?",
          answer: "Oui, absolument ! Tous nos outils sont gratuits."
        },
        {
          question: "Ai-je besoin d'une carte de crédit ?",
          answer: "Non, aucune carte ni inscription requise."
        },
        {
          question: "Pourquoi est-ce gratuit ?",
          answer: "Grâce au traitement local, nos coûts sont faibles. Nous acceptons les dons optionnels."
        },
        {
          question: "Puis-je l'utiliser pour mon entreprise ?",
          answer: "Bien sûr. C'est parfait pour les PME et les pigistes."
        },
        {
          question: "C'est quoi le pourboire Timbits ?",
          answer: "C'est un don optionnel de 1 $ pour nous dire merci."
        }
      ]
    },
    supportPage: {
      content: "Nous sommes une petite équipe à Toronto. Contrairement aux grandes entreprises, nous traitons tout localement sur votre appareil. En nous soutenant, vous aidez le logiciel canadien indépendant.",
      faq: [
        {
          question: "Comment soutenir pdfcanada.ca ?",
          answer: "Partagez l'outil ou donnez un huard via notre bouton de don."
        },
        {
          question: "Où va mon don ?",
          answer: "Il paie l'hébergement et le café des développeurs."
        },
        {
          question: "Est-ce sécurisé ?",
          answer: "Oui, nous utilisons Stripe. Nous ne voyons jamais vos infos bancaires."
        },
        {
          question: "Pourquoi soutenir le local ?",
          answer: "C'est important pour l'écosystème techno canadien."
        },
        {
          question: "Offrez-vous des remboursements ?",
          answer: "Pour les petits dons, généralement non, mais contactez-nous en cas d'erreur."
        }
      ]
    }
  }
};