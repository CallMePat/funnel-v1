import type { DictShape, NewFunnelContent } from "@/app/i18n/dictionaries/fr";

function getShortReserveLabel(dict: DictShape) {
  return dict.hero.title === "ISIDORE AI" ? "Book" : "Reserver";
}

function splitHeadline(text: string) {
  const midpoint = Math.ceil(text.length / 2);
  const splitIndex = text.indexOf(" ", midpoint);

  if (splitIndex === -1) {
    return [text, ""] as [string, string];
  }

  return [
    text.slice(0, splitIndex).trim(),
    text.slice(splitIndex + 1).trim(),
  ] as [string, string];
}

function splitQuestion(text: string) {
  const normalized = text.trim();
  const midpoint = Math.floor(normalized.length / 2);
  const before = normalized.lastIndexOf(" ", midpoint);
  const after = normalized.indexOf(" ", midpoint);
  const splitIndex = before > 0 ? before : after;

  if (splitIndex <= 0) {
    return [normalized, ""] as [string, string];
  }

  return [
    normalized.slice(0, splitIndex).trim(),
    normalized.slice(splitIndex + 1).trim(),
  ] as [string, string];
}

export function getNewFunnelContent(dict: DictShape): NewFunnelContent {
  const fallback: NewFunnelContent = dict.newFunnel;
  const heroTitle = splitQuestion(dict.hero.question);
  const footerHeadline = splitHeadline(dict.worth.makeSure);
  const shortReserveLabel = getShortReserveLabel(dict);

  const content: NewFunnelContent = {
    hero: {
      brand: dict.hero.title,
      letsTalk: shortReserveLabel,
      menu: fallback.hero.menu,
      title: heroTitle,
      cta: dict.ctas.primary1,
      micLabel: dict.hero.subtitle,
      established: {
        year: fallback.hero.established.year,
        note: dict.footer.subtitle.toUpperCase(),
      },
      blurb: dict.communicationAsset.text1,
      hint: [dict.assessment.steps.join(" / "), dict.assessment.subtitle],
    },
    about: {
      label: dict.painPoints.intro,
      statement: `${dict.confidence.title} ${dict.confidence.subtitle}`,
      notes: [
        `${dict.confidence.confidenceTitle}\n${dict.confidence.confidenceText}`,
        `${dict.confidence.influenceTitle}\n${dict.confidence.influenceText}`,
      ],
      mission: dict.bigIdea.communicationCreates,
      cta: dict.ctas.secondary1,
      marquee: [
        dict.confidence.confidenceTitle.toUpperCase(),
        dict.confidence.influenceTitle.toUpperCase(),
        dict.confidence.decisionTitle.toUpperCase(),
      ],
      video: fallback.about.video,
    },
    keyFacts: {
      heading: fallback.keyFacts.heading,
      subtitle: dict.transformation.title,
      cards: [
        {
          variant: "image",
          label: dict.assessment.title,
          value: String(dict.assessment.steps.length),
          suffix: "",
          caption: dict.assessment.receiveInstantly,
          image: fallback.keyFacts.cards[0].image,
        },
        {
          variant: "circle",
          label: dict.sprint.title,
          value: "7",
          suffix: "",
          caption: dict.sprint.increase,
          image: "",
        },
        {
          variant: "dark",
          label: dict.whyIsidore.title,
          value: String(dict.whyIsidore.features.length),
          suffix: "",
          caption: dict.whyIsidore.buildAssets,
          image: fallback.keyFacts.cards[2].image,
        },
      ],
    },
    selectedWork: {
      heading: fallback.selectedWork.heading,
      viewAll: dict.ctas.nextExecutiveMoment,
      explore: fallback.selectedWork.explore,
      projects: [
        {
          name: dict.masterclass.title,
          description: dict.masterclass.question,
          image: fallback.selectedWork.projects[0].image,
          url: "#",
        },
        {
          name: dict.assessment.title,
          description: dict.assessment.subtitle,
          image: fallback.selectedWork.projects[1].image,
          url: "#",
        },
        {
          name: dict.sprint.title,
          description: dict.sprint.transformation,
          image: fallback.selectedWork.projects[2].image,
          url: "#",
        },
      ],
    },
    spiral: {
      heading: `${dict.bigIdea.whenCommunicationReflects} ${dict.bigIdea.changes.join(" ")}`,
      images: fallback.spiral.images,
    },
    footer: {
      tagline: dict.footer.tagline,
      timezone: fallback.footer.timezone,
      headline: footerHeadline,
      cta: shortReserveLabel,
      brandName: dict.footer.subtitle,
      enquiry: fallback.footer.enquiry,
      social: fallback.footer.social,
      wordmark: dict.footer.title.toUpperCase(),
    },
    howItWorks: {
      label: dict.journey.title,
      steps: [
        {
          title: dict.masterclass.title,
          description: dict.masterclass.question,
        },
        {
          title: dict.assessment.title,
          description: dict.assessment.subtitle,
        },
        {
          title: dict.sprint.title,
          description: dict.sprint.transformation,
        },
        {
          title: dict.bigIdea.title,
          description: dict.bigIdea.whenCommunicationReflects,
        },
      ],
    },
    menu: {
      links: [
        { label: dict.masterclass.title, href: "#" },
        { label: dict.assessment.title, href: "#" },
        { label: dict.sprint.title, href: "#" },
        { label: dict.footer.title, href: "#" },
      ],
      nameStory: dict.bigIdea.title,
    },
    featuredProjects: {
      prefix: dict.preparingFor.title,
      explore: fallback.featuredProjects.explore,
      slides: [
        {
          title: dict.preparingFor.options[0],
          image: fallback.featuredProjects.slides[0].image,
          url: "#",
        },
        {
          title: dict.preparingFor.options[1],
          image: fallback.featuredProjects.slides[1].image,
          url: "#",
        },
      ],
    },
    painPoints: fallback.painPoints,
    communicationAsset: fallback.communicationAsset,
    transformation: fallback.transformation,
    decision: fallback.decision,
    worth: fallback.worth,
    preparingSection: fallback.preparingSection,
    assessment: fallback.assessment,
    sprint: fallback.sprint,
    investment: fallback.investment,
    whyIsidore: fallback.whyIsidore,
    masterclass: fallback.masterclass,
  };

  return content;
}
