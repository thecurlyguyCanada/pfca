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
      pricingTitle: "Pricing - pdfcanada.ca | Free Forever",
      pricingDesc: "Our pricing is simple: $0 CAD for everyone. Unlimited PDF conversions and local processing.",
      privacyTitle: "Privacy Policy - pdfcanada.ca | Secure & Local",
      privacyDesc: "We respect your data. All PDF processing happens locally in your browser via WebAssembly. No file uploads.",
      termsTitle: "Terms of Service - pdfcanada.ca",
      termsDesc: "Our polite terms of service. Be nice, use the tools freely.",
      howtoTitle: "How to Use pdfcanada.ca | PDF Tutorials",
      howtoDesc: "Easy instructions on how to delete PDF pages, rotate documents, and convert files using pdfcanada.ca.",
      supportTitle: "Support Local - pdfcanada.ca",
      supportDesc: "Support the Canadian team building free privacy-focused PDF tools.",
      sorryTitle: "Sorry Policy - pdfcanada.ca",
      sorryDesc: "Our guarantee to apologize if anything goes wrong. The most Canadian policy on the web.",
      fillableTitle: "How to make a PDF fillable | pdfcanada.ca",
      fillableDesc: "Learn how to make a PDF fillable for free using our Canadian tools. Add text fields to flat PDFs securely and locally."
    },

    // Feature Pages SEO & Content
    features: {
      delete: {
        title: "Delete PDF Pages Free | Remove Pages Online | pdfcanada.ca",
        desc: "Remove pages from your PDF securely and for free. Processed locally in Canada. No file uploads required.",
        h1: "Delete PDF Pages",
        subtitle: "The polite way to remove unwanted pages.",
        content: "Need to remove a page from your document? Maybe there's a blank page, or some sensitive info you'd rather not share. Our tool lets you select and delete specific pages from your PDF file. It happens instantly in your browser."
      },
      rotate: {
        title: "Rotate PDF Pages Permanently | Free Tool | pdfcanada.ca",
        desc: "Rotate PDF pages left or right and save them permanently. Fix upside-down documents instantly.",
        h1: "Rotate PDF Pages",
        subtitle: "Fix those upside-down scans, eh?",
        content: "Scanned a document the wrong way? We've all been there. Use this tool to rotate individual pages or the whole document left or right. We'll save a new copy that's oriented correctly."
      },
      heic: {
        title: "HEIC to PDF Converter | Convert iPhone Photos | pdfcanada.ca",
        desc: "Convert HEIC photos from iPhone to PDF format. Free, fast, and secure local conversion.",
        h1: "Convert HEIC to PDF",
        subtitle: "Make iPhone photos compatible with everything.",
        content: "Apple devices use HEIC files for photos, but sometimes you need a PDF. Upload your HEIC images here, and we'll convert them to a standard PDF document you can use anywhere."
      },
      epubToPdf: {
        title: "EPUB to PDF Converter | Ebook to PDF | pdfcanada.ca",
        desc: "Convert EPUB ebooks to PDF documents online. Keep your formatting and read anywhere.",
        h1: "Convert EPUB to PDF",
        subtitle: "Read your ebooks on any device.",
        content: "Have an ebook but need to print it or read it on a device that doesn't support EPUB? Our local converter changes your ebook into a friendly PDF file without uploading your book to a server."
      },
      pdfToEpub: {
        title: "PDF to EPUB Converter | Create Ebooks | pdfcanada.ca",
        desc: "Convert PDF documents to EPUB format for e-readers. Free online converter.",
        h1: "Convert PDF to EPUB",
        subtitle: "Make your documents e-reader friendly.",
        content: "Reading PDFs on a Kobo or Kindle can be tough. Convert your PDF documents into flowable EPUB format for a better reading experience on your favorite e-reader."
      },
      fillable: {
        title: "Make PDF Fillable Online | Free Form Creator | pdfcanada.ca",
        desc: "Add fillable text fields to any PDF. Create interactive forms for free securely.",
        h1: "Make PDF Fillable",
        subtitle: "Auto-detects lines and checkboxes.",
        content: "Turn a flat document into an interactive form. We automatically detect underscores (____) and checkboxes ([ ]) on your selected pages and turn them into real, fillable fields."
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
    
    // Buttons
    btnRemove: "Remove Pages",
    btnRotate: "Apply Rotation",
    btnConvert: "Convert File",
    btnMakeFillable: "Auto-Detect & Fill",
    
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
        content: "Besoin de retirer une page de votre document ? Notre outil vous permet de sélectionner et supprimer des pages spécifiques instantanément."
      },
      rotate: {
        title: "Pivoter PDF Gratuit | Rotation Permanente | pdfcanada.ca",
        desc: "Pivotez des pages PDF à gauche ou à droite. Corrigez les documents à l'envers.",
        h1: "Pivoter des pages PDF",
        subtitle: "Remettez vos documents à l'endroit.",
        content: "Vous avez numérisé une page à l'envers ? Ça arrive. Utilisez cet outil pour pivoter les pages individuellement ou tout le document."
      },
      heic: {
        title: "Convertir HEIC en PDF | Photos iPhone | pdfcanada.ca",
        desc: "Convertissez des photos HEIC (iPhone) en PDF. Rapide, gratuit et sécurisé.",
        h1: "Convertir HEIC en PDF",
        subtitle: "Pour vos photos iPhone.",
        content: "Les appareils Apple utilisent le format HEIC. Parfois, on a besoin d'un PDF. Convertissez vos images ici."
      },
      epubToPdf: {
        title: "Convertir EPUB en PDF | Ebooks | pdfcanada.ca",
        desc: "Convertissez des livres EPUB en PDF en ligne. Gardez votre mise en page.",
        h1: "Convertir EPUB en PDF",
        subtitle: "Lisez vos ebooks partout.",
        content: "Imprimez ou lisez vos ebooks sur n'importe quel appareil en les convertissant en PDF."
      },
      pdfToEpub: {
        title: "Convertir PDF en EPUB | Pour Liseuses | pdfcanada.ca",
        desc: "Convertissez des PDF en format EPUB pour liseuses Kobo ou Kindle.",
        h1: "Convertir PDF en EPUB",
        subtitle: "Pour une meilleure lecture.",
        content: "Transformez vos documents PDF en format EPUB fluide pour votre liseuse préférée."
      },
      fillable: {
        title: "Rendre PDF Remplissable | Formulaire Gratuit | pdfcanada.ca",
        desc: "Ajoutez des champs de texte remplissables à n'importe quel PDF.",
        h1: "Rendre un PDF Remplissable",
        subtitle: "Détection automatique des lignes et cases.",
        content: "Transformez un document plat en formulaire interactif. Nous détectons automatiquement les lignes (____) et les cases ([ ]) et les rendons remplissables."
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
    
    btnRemove: "Supprimer",
    btnRotate: "Appliquer",
    btnConvert: "Convertir",
    btnMakeFillable: "Détecter et Remplir",
    
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
    fillableWhyText: "C'est gratuit et canadien."
  }
};