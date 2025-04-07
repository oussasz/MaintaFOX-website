// translations.js

// translations.js

const translations = {
  // English (en) - Base Language
  en: {
    dir: "ltr",
    meta_description:
      "Maintafox CMMS Market Research Survey - Help us build the best maintenance software for you.",
    page_title: "Maintafox CMMS Survey",
    nav_survey_title: "Maintafox Survey",
    nav_features: "Features",
    nav_demo: "Request a Demo",
    survey_main_title: "Help Us Shape the Future of Maintenance!",
    survey_intro:
      "Welcome to the Maintafox survey. Your feedback is crucial in developing a CMMS that truly meets your needs. This should only take 5-7 minutes.",
    progress_text: "{value}% Complete", // Placeholder for dynamic value

    fieldset_about_you: "About You & Your Company",
    q1_label: "1. What is your primary role related to maintenance?",
    select_role: "-- Select your role --",
    role_manager: "Maintenance Manager/Lead",
    role_technician: "Maintenance Technician",
    role_director: "Plant/Technical Director",
    role_operations: "Operations Manager",
    role_purchasing: "Purchasing/Procurement",
    role_it: "IT Department",
    role_owner: "General Management/Owner",
    role_consultant: "Consultant",
    role_other: "Other",
    specify_role_placeholder: "Please specify your role",

    q2_label: "2. In which industry does your company primarily operate?",
    select_industry: "-- Select industry --",
    industry_mfg_general: "Manufacturing (General)",
    industry_mfg_food: "Manufacturing (Food & Beverage)",
    industry_mfg_auto: "Manufacturing (Automotive)",
    industry_energy: "Energy (Oil, Gas, Renewables)",
    industry_utilities: "Utilities (Water, Electricity)",
    industry_facilities: "Facilities Management/Real Estate",
    industry_transport: "Transportation & Logistics",
    industry_construction: "Construction",
    industry_pharma: "Pharmaceutical / Chemical",
    industry_heavy: "Heavy Industry (Steel, Cement, Mining)",
    industry_healthcare: "Healthcare",
    industry_hospitality: "Hospitality",
    industry_services: "Services / Tertiary",
    industry_other: "Other",
    specify_industry_placeholder: "Please specify industry",

    q3_label:
      "3. What is the approximate size of your company (number of employees)?",
    q3_legend_sr: "Company Size Options", // Screen Reader Only

    fieldset_current_practices: "Current Maintenance Practices",
    q4_label: "4. How do you currently manage maintenance activities?",
    q4_legend_sr: "Current Method Options",
    method_cmms: "Dedicated CMMS Software",
    method_erp: "ERP Module (e.g., SAP PM)",
    method_sheets: "Spreadsheets (Excel, Google Sheets)",
    method_paper: "Paper Documents / Manual Tracking",
    method_combination: "Combination of Methods",
    method_none: "No Structured System / Ad-hoc",
    method_other: "Other",
    specify_combination_placeholder:
      "Specify combination (e.g., Excel + Paper)",
    specify_other_method_placeholder: "Please specify other method",

    q5_label: "5. If you use a CMMS or ERP Module, which one(s) primarily?",
    select_cmms_used: "-- Select software (if applicable) --",
    // CMMS names usually stay the same
    cmms_inhouse: "Developed In-house",
    cmms_other_specific: "Other Specific CMMS",
    specify_cmms_placeholder: "Please specify CMMS name",

    q6_label:
      "6. What are your biggest challenges with your current maintenance management method? (Select all that apply)",
    q6_legend_sr: "Challenges Options",
    challenge_visibility: "Lack of asset visibility/history",
    challenge_planning: "Difficulty planning preventive maintenance",
    challenge_wo_tracking: "Inefficient work order tracking/completion",
    challenge_inventory: "Poor spare parts inventory management",
    challenge_costs: "High or unpredictable maintenance costs",
    challenge_reporting: "Insufficient reporting and analysis",
    challenge_complexity: "System is too complex or difficult to use",
    challenge_mobile: "Lack of mobile access for technicians",
    challenge_communication: "Poor communication between teams",
    challenge_compliance: "Difficulty tracking compliance",
    challenge_other: "Other",
    specify_challenge_placeholder: "Please specify other challenges",

    q7_label:
      "7. What are the main reasons your company hasn't adopted a dedicated CMMS? (Select all that apply)",
    q7_legend_sr: "Reasons for No CMMS Options",
    reason_cost: "Perceived high cost",
    reason_complexity: "Complexity of implementation/setup",
    reason_resources: "Lack of time or internal resources",
    reason_sufficient: "Current system seems sufficient for now",
    reason_no_need: "No clear need identified / Low priority",
    reason_resistance: "Resistance to change from personnel",
    reason_awareness: "Lack of awareness of suitable options",
    reason_other: "Other",
    specify_reason_placeholder: "Please specify other reasons",

    fieldset_decision_budget: "Decision Making & Budget",
    q8_label:
      "8. Who is typically involved in the decision to acquire a new CMMS? (Select all that apply)",
    q8_legend_sr: "Decision Makers Options",
    decision_maint_head: "Maintenance Department Head",
    decision_tech_director: "Technical / Production Director",
    decision_plant_manager: "Plant / Site Manager",
    decision_gen_manager: "General Management (CEO/GM/Owner)",
    decision_it: "IT Department",
    decision_finance: "Purchasing / Finance Department",
    decision_users: "End Users (Technicians/Planners)",
    decision_consultant: "External Consultant",
    decision_other: "Other",
    specify_decision_placeholder: "Please specify others involved",

    q9_label:
      "9. What is your company's approximate annual budget (or range) for a CMMS solution (Software license/subscription)? (Estimation in DZD)",
    q9_legend_sr: "Budget Options",
    budget_lt_50k: "< 50,000 DZD",
    // Ranges are numbers, no translation needed unless format changes
    budget_gt_600k: "> 600,000 DZD",
    budget_flexible: "Budget Not Defined / Flexible",
    budget_confidential: "Prefer not to say",

    fieldset_needs_interests: "Your Needs & Interests",
    q10_label:
      "10. How interested would you be in a locally developed CMMS solution potentially offering strong local support and features suited to the regional context?",
    q10_legend_sr: "Interest in Local Solution Options",
    interest_very: "Very Interested",
    interest_interested: "Interested",
    interest_somewhat: "Somewhat Interested",
    interest_neutral: "Neutral",
    interest_not: "Not Interested",

    q11_label:
      "11. Please rate the importance of these potential CMMS features for your operations (1 = Not Important, 5 = Essential):",
    rating_assets_label: "Asset & Work Order Management:",
    rating_preventive_label: "Preventive / Predictive Maintenance:",
    rating_inventory_label: "Inventory & Purchasing:",
    rating_reports_label: "Dashboards & KPI Reports:",
    rating_mobile_label: "Technician Mobile App:",
    rating_ease_label: "Ease of Use / Intuitive Interface:",
    rating_integration_label: "Integration with other systems (ERP, etc.):",

    q12_label:
      "12. Would you be interested in participating in a free Beta program for Maintafox (early access in exchange for feedback)?",
    q12_legend_sr: "Beta Program Interest Options",
    beta_yes_very: "Yes, very interested",
    beta_yes_maybe: "Yes, maybe",
    beta_no: "No, thank you",

    q13_label:
      "13. Would you like to be contacted for a free, personalized demo of Maintafox when available?",
    q13_legend_sr: "Demo Interest Options",
    demo_yes_abs: "Yes, absolutely!",
    demo_yes_inform: "Yes, keep me informed",
    demo_no: "No, not right now",

    contact_info_label:
      "Please provide your contact details so we can reach out about the Beta/Demo:",
    contact_name_label: "Your Name",
    contact_email_label: "Your Email",

    submit_button: "Submit Survey",
    submitting_button: "Submitting...", // Added for loading state
    success_button: "Submitted!", // Added for success state

    footer_rights: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",

    // Validation Messages
    validation_required: "This field is required.",
    validation_select: "Please select an option.",
    validation_email: "Please enter a valid email address.",
    validation_at_least_one: "Please select at least one option.",
    validation_generic_error:
      "Please correct the errors above before submitting.",
    validation_range: "Please rate this feature.", // Added for range inputs

    // Submission Messages
    submission_success:
      "Thank you! Your survey responses have been submitted successfully.",
    submission_success_demo_link:
      ' <br><a href="demo.html" class="cta-button small" style="margin-top: 1rem;">Request Your Demo Now!</a>', // Optional link
    submission_error_generic: "Submission failed. Please try again.",
    submission_error_network:
      "Network error. Please check your connection and try again.",
  },

  // French (fr)
  fr: {
    dir: "ltr",
    meta_description:
      "Enquête d'étude de marché Maintafox GMAO - Aidez-nous à créer le meilleur logiciel de maintenance pour vous.",
    page_title: "Enquête GMAO Maintafox",
    nav_survey_title: "Enquête Maintafox",
    nav_features: "Fonctionnalités",
    nav_demo: "Demander une Démo",
    survey_main_title: "Aidez-nous à façonner l'avenir de la maintenance !",
    survey_intro:
      "Bienvenue à l'enquête Maintafox. Vos retours sont essentiels pour développer une GMAO qui réponde vraiment à vos besoins. Cela ne devrait prendre que 5-7 minutes.",
    progress_text: "{value}% Complété",

    fieldset_about_you: "À propos de vous et de votre entreprise",
    q1_label: "1. Quel est votre rôle principal lié à la maintenance ?",
    select_role: "-- Sélectionnez votre rôle --",
    role_manager: "Responsable/Chef de Maintenance",
    role_technician: "Technicien de Maintenance",
    role_director: "Directeur Technique/Usine",
    role_operations: "Responsable des Opérations",
    role_purchasing: "Achats/Approvisionnement",
    role_it: "Département Informatique",
    role_owner: "Direction Générale/Propriétaire",
    role_consultant: "Consultant",
    role_other: "Autre",
    specify_role_placeholder: "Veuillez préciser votre rôle",

    q2_label:
      "2. Dans quel secteur votre entreprise opère-t-elle principalement ?",
    select_industry: "-- Sélectionnez le secteur --",
    industry_mfg_general: "Industrie Manufacturière (Générale)",
    industry_mfg_food: "Industrie Manufacturière (Agroalimentaire)",
    industry_mfg_auto: "Industrie Manufacturière (Automobile)",
    industry_energy: "Énergie (Pétrole, Gaz, Renouvelables)",
    industry_utilities: "Services Publics (Eau, Électricité)",
    industry_facilities: "Gestion d'Installations/Immobilier",
    industry_transport: "Transport & Logistique",
    industry_construction: "Construction",
    industry_pharma: "Pharmaceutique / Chimie",
    industry_heavy: "Industrie Lourde (Acier, Ciment, Mines)",
    industry_healthcare: "Santé",
    industry_hospitality: "Hôtellerie",
    industry_services: "Services / Tertiaire",
    industry_other: "Autre",
    specify_industry_placeholder: "Veuillez préciser le secteur",

    q3_label:
      "3. Quelle est la taille approximative de votre entreprise (nombre d'employés) ?",
    q3_legend_sr: "Options de taille d'entreprise",

    fieldset_current_practices: "Pratiques de Maintenance Actuelles",
    q4_label:
      "4. Comment gérez-vous actuellement les activités de maintenance ?",
    q4_legend_sr: "Options de méthode actuelle",
    method_cmms: "Logiciel GMAO dédié",
    method_erp: "Module ERP (ex: SAP PM)",
    method_sheets: "Feuilles de calcul (Excel, Google Sheets)",
    method_paper: "Documents papier / Suivi manuel",
    method_combination: "Combinaison de méthodes",
    method_none: "Pas de système structuré / Ad-hoc",
    method_other: "Autre",
    specify_combination_placeholder:
      "Précisez la combinaison (ex: Excel + Papier)",
    specify_other_method_placeholder: "Veuillez préciser l'autre méthode",

    q5_label:
      "5. Si vous utilisez une GMAO ou un module ERP, lequel(s) principalement ?",
    select_cmms_used: "-- Sélectionnez le logiciel (si applicable) --",
    cmms_inhouse: "Développé en interne",
    cmms_other_specific: "Autre GMAO Spécifique",
    specify_cmms_placeholder: "Veuillez préciser le nom de la GMAO",

    q6_label:
      "6. Quels sont vos plus grands défis avec votre méthode actuelle de gestion de la maintenance ? (Sélectionnez tout ce qui s'applique)",
    q6_legend_sr: "Options de défis",
    challenge_visibility: "Manque de visibilité/historique des actifs",
    challenge_planning: "Difficulté à planifier la maintenance préventive",
    challenge_wo_tracking: "Suivi/réalisation inefficace des ordres de travail",
    challenge_inventory: "Mauvaise gestion des stocks de pièces détachées",
    challenge_costs: "Coûts de maintenance élevés ou imprévisibles",
    challenge_reporting: "Rapports et analyses insuffisants",
    challenge_complexity: "Système trop complexe ou difficile à utiliser",
    challenge_mobile: "Manque d'accès mobile pour les techniciens",
    challenge_communication: "Mauvaise communication entre les équipes",
    challenge_compliance: "Difficulté à suivre la conformité",
    challenge_other: "Autre",
    specify_challenge_placeholder: "Veuillez préciser les autres défis",

    q7_label:
      "7. Quelles sont les principales raisons pour lesquelles votre entreprise n'a pas adopté de GMAO dédiée ? (Sélectionnez tout ce qui s'applique)",
    q7_legend_sr: "Options des raisons de non-adoption de GMAO",
    reason_cost: "Coût perçu comme élevé",
    reason_complexity: "Complexité de la mise en œuvre/configuration",
    reason_resources: "Manque de temps ou de ressources internes",
    reason_sufficient: "Le système actuel semble suffisant pour le moment",
    reason_no_need: "Besoin non clairement identifié / Faible priorité",
    reason_resistance: "Résistance au changement du personnel",
    reason_awareness: "Méconnaissance des options appropriées",
    reason_other: "Autre",
    specify_reason_placeholder: "Veuillez préciser les autres raisons",

    fieldset_decision_budget: "Prise de Décision & Budget",
    q8_label:
      "8. Qui participe généralement à la décision d'acquérir une nouvelle GMAO ? (Sélectionnez tout ce qui s'applique)",
    q8_legend_sr: "Options des décideurs",
    decision_maint_head: "Responsable du Service Maintenance",
    decision_tech_director: "Directeur Technique / Production",
    decision_plant_manager: "Directeur d'Usine / Site",
    decision_gen_manager: "Direction Générale (PDG/DG/Propriétaire)",
    decision_it: "Département Informatique",
    decision_finance: "Service Achats / Finances",
    decision_users: "Utilisateurs Finaux (Techniciens/Planificateurs)",
    decision_consultant: "Consultant Externe",
    decision_other: "Autre",
    specify_decision_placeholder:
      "Veuillez préciser les autres personnes impliquées",

    q9_label:
      "9. Quel est le budget annuel approximatif (ou fourchette) de votre entreprise pour une solution GMAO (Licence/abonnement logiciel) ? (Estimation en DZD)",
    q9_legend_sr: "Options de budget",
    budget_lt_50k: "< 50 000 DZD",
    budget_gt_600k: "> 600 000 DZD",
    budget_flexible: "Budget Non Défini / Flexible",
    budget_confidential: "Préfère ne pas répondre",

    fieldset_needs_interests: "Vos Besoins & Intérêts",
    q10_label:
      "10. Quel serait votre intérêt pour une solution GMAO développée localement, offrant potentiellement un support local fort et des fonctionnalités adaptées au contexte régional ?",
    q10_legend_sr: "Options d'intérêt pour une solution locale",
    interest_very: "Très intéressé",
    interest_interested: "Intéressé",
    interest_somewhat: "Assez intéressé",
    interest_neutral: "Neutre",
    interest_not: "Pas intéressé",

    q11_label:
      "11. Veuillez évaluer l'importance de ces fonctionnalités potentielles de GMAO pour vos opérations (1 = Pas Important, 5 = Essentiel) :",
    rating_assets_label: "Gestion des Actifs & Ordres de Travail :",
    rating_preventive_label: "Maintenance Préventive / Prédictive :",
    rating_inventory_label: "Stocks & Achats :",
    rating_reports_label: "Tableaux de Bord & Rapports KPI :",
    rating_mobile_label: "Application Mobile Technicien :",
    rating_ease_label: "Facilité d'Utilisation / Interface Intuitive :",
    rating_integration_label:
      "Intégration avec d'autres systèmes (ERP, etc.) :",

    q12_label:
      "12. Seriez-vous intéressé à participer à un programme Bêta gratuit pour Maintafox (accès anticipé en échange de retours) ?",
    q12_legend_sr: "Options d'intérêt pour le programme Bêta",
    beta_yes_very: "Oui, très intéressé",
    beta_yes_maybe: "Oui, peut-être",
    beta_no: "Non, merci",

    q13_label:
      "13. Souhaitez-vous être contacté pour une démo gratuite et personnalisée de Maintafox lorsqu'elle sera disponible ?",
    q13_legend_sr: "Options d'intérêt pour la démo",
    demo_yes_abs: "Oui, absolument !",
    demo_yes_inform: "Oui, tenez-moi informé",
    demo_no: "Non, pas maintenant",

    contact_info_label:
      "Veuillez fournir vos coordonnées afin que nous puissions vous contacter au sujet de la Bêta/Démo :",
    contact_name_label: "Votre Nom",
    contact_email_label: "Votre Email",

    submit_button: "Soumettre l'Enquête",
    submitting_button: "Soumission...",
    success_button: "Soumis !",

    footer_rights: "Tous droits réservés.",
    footer_privacy: "Politique de Confidentialité",
    footer_terms: "Conditions d'Utilisation",

    // Validation Messages
    validation_required: "Ce champ est obligatoire.",
    validation_select: "Veuillez sélectionner une option.",
    validation_email: "Veuillez saisir une adresse e-mail valide.",
    validation_at_least_one: "Veuillez sélectionner au moins une option.",
    validation_generic_error:
      "Veuillez corriger les erreurs ci-dessus avant de soumettre.",
    validation_range: "Veuillez évaluer cette fonctionnalité.",

    // Submission Messages
    submission_success:
      "Merci ! Vos réponses à l'enquête ont été soumises avec succès.",
    submission_success_demo_link:
      ' <br><a href="demo.html" class="cta-button small" style="margin-top: 1rem;">Demandez votre démo maintenant !</a>',
    submission_error_generic: "La soumission a échoué. Veuillez réessayer.",
    submission_error_network:
      "Erreur réseau. Veuillez vérifier votre connexion et réessayer.",
  },

  // Arabic (ar) - Note RTL direction
  ar: {
    dir: "rtl", // Right-to-Left
    meta_description:
      "استبيان بحث سوق نظام إدارة الصيانة بالحاسوب Maintafox - ساعدنا في بناء أفضل برنامج صيانة لك.",
    page_title: "استبيان نظام إدارة الصيانة Maintafox",
    nav_survey_title: "استبيان Maintafox",
    nav_features: "الميزات",
    nav_demo: "طلب عرض توضيحي",
    survey_main_title: "ساعدنا في تشكيل مستقبل الصيانة!",
    survey_intro:
      "مرحبًا بك في استبيان Maintafox. ملاحظاتك ضرورية لتطوير نظام إدارة صيانة يلبي احتياجاتك حقًا. يجب أن يستغرق هذا 5-7 دقائق فقط.",
    progress_text: "{value}٪ مكتمل",

    fieldset_about_you: "عنك وعن شركتك",
    q1_label: "1. ما هو دورك الأساسي المتعلق بالصيانة؟",
    select_role: "-- اختر دورك --",
    role_manager: "مدير/مسؤول الصيانة",
    role_technician: "فني صيانة",
    role_director: "مدير المصنع/المدير الفني",
    role_operations: "مدير العمليات",
    role_purchasing: "المشتريات/التوريد",
    role_it: "قسم تكنولوجيا المعلومات",
    role_owner: "الإدارة العامة/المالك",
    role_consultant: "استشاري",
    role_other: "آخر",
    specify_role_placeholder: "يرجى تحديد دورك",

    q2_label: "2. في أي صناعة تعمل شركتك بشكل أساسي؟",
    select_industry: "-- اختر الصناعة --",
    industry_mfg_general: "التصنيع (عام)",
    industry_mfg_food: "التصنيع (الأغذية والمشروبات)",
    industry_mfg_auto: "التصنيع (السيارات)",
    industry_energy: "الطاقة (النفط، الغاز، المتجددة)",
    industry_utilities: "المرافق (المياه، الكهرباء)",
    industry_facilities: "إدارة المرافق/العقارات",
    industry_transport: "النقل والخدمات اللوجستية",
    industry_construction: "البناء",
    industry_pharma: "الأدوية / الكيماويات",
    industry_heavy: "الصناعات الثقيلة (الصلب، الأسمنت، التعدين)",
    industry_healthcare: "الرعاية الصحية",
    industry_hospitality: "الضيافة",
    industry_services: "الخدمات / القطاع الثالث",
    industry_other: "آخر",
    specify_industry_placeholder: "يرجى تحديد الصناعة",

    q3_label: "3. ما هو الحجم التقريبي لشركتك (عدد الموظفين)؟",
    q3_legend_sr: "خيارات حجم الشركة",

    fieldset_current_practices: "ممارسات الصيانة الحالية",
    q4_label: "4. كيف تدير حاليًا أنشطة الصيانة؟",
    q4_legend_sr: "خيارات الطريقة الحالية",
    method_cmms: "برنامج نظام إدارة صيانة متخصص",
    method_erp: "وحدة تخطيط موارد المؤسسات (مثل SAP PM)",
    method_sheets: "جداول البيانات (Excel ، Google Sheets)",
    method_paper: "المستندات الورقية / التتبع اليدوي",
    method_combination: "مزيج من الطرق",
    method_none: "لا يوجد نظام منظم / حسب الحاجة",
    method_other: "آخر",
    specify_combination_placeholder: "حدد المزيج (مثل Excel + ورق)",
    specify_other_method_placeholder: "يرجى تحديد طريقة أخرى",

    q5_label:
      "5. إذا كنت تستخدم نظام إدارة الصيانة أو وحدة ERP ، فأي منها بشكل أساسي؟",
    select_cmms_used: "-- اختر البرنامج (إن وجد) --",
    cmms_inhouse: "تم تطويره داخليًا",
    cmms_other_specific: "نظام إدارة صيانة محدد آخر",
    specify_cmms_placeholder: "يرجى تحديد اسم نظام إدارة الصيانة",

    q6_label:
      "6. ما هي أكبر التحديات التي تواجهك مع طريقتك الحالية لإدارة الصيانة؟ (اختر كل ما ينطبق)",
    q6_legend_sr: "خيارات التحديات",
    challenge_visibility: "نقص رؤية/تاريخ الأصول",
    challenge_planning: "صعوبة تخطيط الصيانة الوقائية",
    challenge_wo_tracking: "عدم كفاءة تتبع/إكمال أوامر العمل",
    challenge_inventory: "سوء إدارة مخزون قطع الغيار",
    challenge_costs: "تكاليف صيانة عالية أو غير متوقعة",
    challenge_reporting: "تقارير وتحليلات غير كافية",
    challenge_complexity: "النظام معقد جدًا أو صعب الاستخدام",
    challenge_mobile: "نقص الوصول عبر الهاتف المحمول للفنيين",
    challenge_communication: "ضعف التواصل بين الفرق",
    challenge_compliance: "صعوبة تتبع الامتثال",
    challenge_other: "آخر",
    specify_challenge_placeholder: "يرجى تحديد التحديات الأخرى",

    q7_label:
      "7. ما هي الأسباب الرئيسية لعدم اعتماد شركتك لنظام إدارة صيانة متخصص؟ (اختر كل ما ينطبق)",
    q7_legend_sr: "خيارات أسباب عدم وجود نظام إدارة الصيانة",
    reason_cost: "التكلفة المتصورة عالية",
    reason_complexity: "تعقيد التنفيذ/الإعداد",
    reason_resources: "نقص الوقت أو الموارد الداخلية",
    reason_sufficient: "النظام الحالي (مثل Excel) يبدو كافيًا في الوقت الحالي",
    reason_no_need: "لم يتم تحديد حاجة واضحة / أولوية منخفضة",
    reason_resistance: "مقاومة التغيير من الموظفين",
    reason_awareness: "عدم الوعي بالخيارات المناسبة",
    reason_other: "آخر",
    specify_reason_placeholder: "يرجى تحديد الأسباب الأخرى",

    fieldset_decision_budget: "اتخاذ القرار والميزانية",
    q8_label:
      "8. من يشارك عادة في قرار الحصول على نظام إدارة صيانة جديد؟ (اختر كل ما ينطبق)",
    q8_legend_sr: "خيارات صانعي القرار",
    decision_maint_head: "رئيس قسم الصيانة",
    decision_tech_director: "المدير الفني / مدير الإنتاج",
    decision_plant_manager: "مدير المصنع / الموقع",
    decision_gen_manager:
      "الإدارة العامة (الرئيس التنفيذي/المدير العام/المالك)",
    decision_it: "قسم تكنولوجيا المعلومات",
    decision_finance: "قسم المشتريات / المالية",
    decision_users: "المستخدمون النهائيون (الفنيون/المخططون)",
    decision_consultant: "مستشار خارجي",
    decision_other: "آخر",
    specify_decision_placeholder: "يرجى تحديد الآخرين المشاركين",

    q9_label:
      "9. ما هي الميزانية السنوية التقريبية (أو النطاق) لشركتك لحل نظام إدارة الصيانة (ترخيص/اشتراك البرنامج)؟ (تقدير بالدينار الجزائري)",
    q9_legend_sr: "خيارات الميزانية",
    budget_lt_50k: "< 50,000 دينار جزائري",
    budget_gt_600k: "> 600,000 دينار جزائري",
    budget_flexible: "الميزانية غير محددة / مرنة",
    budget_confidential: "أفضل عدم القول",

    fieldset_needs_interests: "احتياجاتك واهتماماتك",
    q10_label:
      "10. ما مدى اهتمامك بحل نظام إدارة صيانة مطور محليًا يحتمل أن يقدم دعمًا محليًا قويًا وميزات مناسبة للسياق الإقليمي؟",
    q10_legend_sr: "خيارات الاهتمام بالحل المحلي",
    interest_very: "مهتم جدا",
    interest_interested: "مهتم",
    interest_somewhat: "مهتم إلى حد ما",
    interest_neutral: "محايد",
    interest_not: "غير مهتم",

    q11_label:
      "11. يرجى تقييم أهمية ميزات نظام إدارة الصيانة المحتملة هذه لعملياتك (1 = غير مهم ، 5 = أساسي):",
    rating_assets_label: "إدارة الأصول وأوامر العمل:",
    rating_preventive_label: "الصيانة الوقائية / التنبؤية:",
    rating_inventory_label: "المخزون والمشتريات:",
    rating_reports_label: "لوحات المعلومات وتقارير مؤشرات الأداء الرئيسية:",
    rating_mobile_label: "تطبيق الهاتف المحمول للفني:",
    rating_ease_label: "سهولة الاستخدام / واجهة بديهية:",
    rating_integration_label: "التكامل مع الأنظمة الأخرى (ERP ، إلخ):",

    q12_label:
      "12. هل ستكون مهتمًا بالمشاركة في برنامج تجريبي مجاني لـ Maintafox (وصول مبكر مقابل التغذية الراجعة)؟",
    q12_legend_sr: "خيارات الاهتمام بالبرنامج التجريبي",
    beta_yes_very: "نعم، مهتم جدا",
    beta_yes_maybe: "نعم، ربما",
    beta_no: "لا، شكرا لك",

    q13_label:
      "13. هل ترغب في أن يتم الاتصال بك للحصول على عرض توضيحي مجاني وشخصي لـ Maintafox عند توفره؟",
    q13_legend_sr: "خيارات الاهتمام بالعرض التوضيحي",
    demo_yes_abs: "نعم، بالتأكيد!",
    demo_yes_inform: "نعم، أبقني على اطلاع",
    demo_no: "لا، ليس الآن",

    contact_info_label:
      "يرجى تقديم تفاصيل الاتصال الخاصة بك حتى نتمكن من التواصل معك بخصوص الإصدار التجريبي/العرض التوضيحي:",
    contact_name_label: "اسمك",
    contact_email_label: "بريدك الإلكتروني",

    submit_button: "إرسال الاستبيان",
    submitting_button: "جاري الإرسال...",
    success_button: "تم الإرسال!",

    footer_rights: "جميع الحقوق محفوظة.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة",

    // Validation Messages
    validation_required: "هذا الحقل مطلوب.",
    validation_select: "الرجاء تحديد خيار.",
    validation_email: "الرجاء إدخال عنوان بريد إلكتروني صالح.",
    validation_at_least_one: "الرجاء تحديد خيار واحد على الأقل.",
    validation_generic_error: "يرجى تصحيح الأخطاء أعلاه قبل الإرسال.",
    validation_range: "يرجى تقييم هذه الميزة.",

    // Submission Messages
    submission_success: "شكرا لك! تم إرسال ردود الاستبيان الخاصة بك بنجاح.",
    submission_success_demo_link:
      ' <br><a href="demo.html" class="cta-button small" style="margin-top: 1rem;">اطلب عرضك التوضيحي الآن!</a>',
    submission_error_generic: "فشل الإرسال. الرجاء معاودة المحاولة.",
    submission_error_network:
      "خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
  },
};
