export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  dek: string;
  takeaway: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "what-buyers-should-watch",
    category: "Market insight",
    title: "Where rates go from here: what buyers should watch",
    date: "Aug 8, 2026",
    readTime: "5 min read",
    dek: "Mortgage rates matter, but they are only one part of a comfortable homebuying plan. Here is how to focus on the numbers you can control.",
    takeaway: "You do not need to predict the market perfectly. You need a payment and plan that work for your life today.",
    sections: [
      { heading: "Start with your monthly comfort zone", paragraphs: ["A lower rate can improve affordability, but waiting for a specific number can keep your plans on hold indefinitely. Begin with the monthly payment that feels sustainable alongside your other priorities.", "A loan officer can help you compare scenarios using different prices, down payments, and loan structures so you can see the tradeoffs clearly."] },
      { heading: "Watch the whole housing picture", paragraphs: ["Rates, home prices, available inventory, taxes, insurance, and your timeline all shape the decision. A change in one number does not automatically make it the right—or wrong—time for you to buy."], points: ["Your estimated total monthly payment", "Cash needed for closing and reserves", "How long you expect to own the home", "The condition and location of the property"] },
      { heading: "Build a plan that can adjust", paragraphs: ["Your first estimate is a starting point, not a promise. Keep your documents current, avoid major credit changes, and stay in touch with your loan officer as you shop.", "When the right home appears, you will be ready to review the current numbers and make a decision with more confidence."] },
    ],
  },
  {
    slug: "documents-for-preapproval",
    category: "Homebuyer guides",
    title: "The 6 documents that get you pre-approved faster",
    date: "Aug 1, 2026",
    readTime: "4 min read",
    dek: "A little preparation can make the pre-approval process smoother. These are the items lenders commonly ask borrowers to gather.",
    takeaway: "Every financial situation is different. Your loan officer will confirm exactly what is needed for yours.",
    sections: [
      { heading: "The basics to gather", paragraphs: ["Having clear, current documents helps your loan team understand your income, assets, and obligations."], points: ["Recent pay statements", "Recent bank or asset statements", "The last two years of W-2 forms", "Recent federal tax returns when applicable", "A government-issued photo ID", "Your current housing and employment history"] },
      { heading: "If your income is less traditional", paragraphs: ["Self-employed borrowers, business owners, commissioned employees, and people with rental income may need additional records. That is normal. Share the full picture early so your loan officer can guide you toward the right documentation."] },
      { heading: "Keep information secure", paragraphs: ["Use the secure document portal provided by your loan team rather than ordinary email whenever possible. Ask before sending anything that includes account numbers or other sensitive information."] },
    ],
  },
  {
    slug: "building-local-relationships",
    category: "Company news",
    title: "Building stronger local relationships, one home at a time",
    date: "Jul 24, 2026",
    readTime: "3 min read",
    dek: "Home financing feels more manageable when borrowers have a responsive person who understands their goals and their community.",
    takeaway: "Technology can make a process faster. Trusted relationships are what make it feel personal.",
    sections: [
      { heading: "Local guidance matters", paragraphs: ["Real estate moves quickly, and questions rarely arrive on a perfect schedule. Access to a loan officer who understands the process can help borrowers and their agents make informed decisions."] },
      { heading: "Clear communication at every step", paragraphs: ["A strong lending experience is built on timely updates, straightforward explanations, and a shared understanding of what comes next."], points: ["A clear starting conversation", "Upfront expectations", "Responsive answers", "Consistent progress updates"] },
      { heading: "A long-term point of contact", paragraphs: ["Closing day is not the end of the relationship. A trusted loan officer can remain a resource as life, goals, and the housing market change."] },
    ],
  },
  {
    slug: "points-credits-break-even",
    category: "Rates",
    title: "Points, credits, and the break-even math that matters",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    dek: "Paying more upfront may reduce a rate, while accepting a lender credit may reduce closing costs. The better choice depends on your timeline and budget.",
    takeaway: "Compare the upfront cost with the estimated monthly difference—and consider how long you expect to keep the loan.",
    sections: [
      { heading: "What points generally do", paragraphs: ["Discount points are an upfront cost paid in exchange for a lower interest rate. The exact cost and rate change vary by loan, market, and day."] },
      { heading: "What lender credits generally do", paragraphs: ["A lender credit can offset eligible closing costs, usually in exchange for a higher interest rate. This may preserve cash at closing, but it can also increase the monthly payment."] },
      { heading: "How to compare the options", paragraphs: ["Ask for side-by-side loan estimates and divide the added upfront cost by the estimated monthly savings. That rough break-even point can help frame the choice."], points: ["How long you may keep the loan", "How much cash you want to keep available", "Whether you expect to refinance or move", "The total cost—not only the rate"] },
    ],
  },
  {
    slug: "fha-vs-conventional",
    category: "Homebuyer guides",
    title: "FHA vs. conventional: which fits your situation?",
    date: "Jul 9, 2026",
    readTime: "7 min read",
    dek: "Both paths can help finance a home. The right fit depends on your credit profile, available funds, property, and longer-term plans.",
    takeaway: "There is no universally better loan type. Compare the complete monthly and upfront picture for your situation.",
    sections: [
      { heading: "Why borrowers consider FHA", paragraphs: ["FHA-insured loans may offer flexible qualification guidelines for eligible borrowers. They include mortgage insurance requirements and property standards that should be considered in the full cost."] },
      { heading: "Why borrowers consider conventional", paragraphs: ["Conventional loans offer a range of down-payment structures and mortgage-insurance options. Qualification and pricing depend on several factors, including credit, property type, and loan amount."] },
      { heading: "Questions to ask before choosing", paragraphs: ["A useful comparison goes beyond the advertised rate."], points: ["What will I need at closing?", "What is the estimated total monthly payment?", "How does mortgage insurance work?", "Are there property or occupancy requirements?", "How might my plans change in the next few years?"] },
    ],
  },
  {
    slug: "inventory-and-your-budget",
    category: "Market insight",
    title: "Why inventory—not just rates—can shape your budget",
    date: "Jun 30, 2026",
    readTime: "5 min read",
    dek: "The number and type of homes for sale can affect competition, choices, and the compromises buyers may need to make.",
    takeaway: "A strong budget includes room for the realities of the local market, not just the maximum loan amount.",
    sections: [
      { heading: "More choices can change the conversation", paragraphs: ["When more suitable homes are available, buyers may have additional time to compare properties and negotiate. When choices are limited, preparation and clear priorities become even more important."] },
      { heading: "Set priorities before you shop", paragraphs: ["Separate your must-haves from your nice-to-haves. This makes it easier to compare homes without losing sight of your financial comfort zone."], points: ["Location and commute", "Condition and likely repairs", "Monthly taxes and insurance", "Homeowners association dues", "Space you need now and later"] },
      { heading: "Coordinate financing and search strategy", paragraphs: ["Your real estate agent and loan officer can help you understand how a specific property changes the numbers. Revisit the payment estimate before making an offer."] },
    ],
  },
  {
    slug: "giving-back-close-to-home",
    category: "Company news",
    title: "Why giving back starts close to home",
    date: "Jun 21, 2026",
    readTime: "3 min read",
    dek: "Strong communities are built through consistent participation, local relationships, and people willing to lend a hand.",
    takeaway: "Home is more than a property. It is the people, places, and connections that make a community feel like yours.",
    sections: [
      { heading: "Showing up locally", paragraphs: ["Community involvement is most meaningful when it responds to real local needs. That can mean volunteering time, sharing expertise, or supporting organizations already doing trusted work."] },
      { heading: "Small actions add up", paragraphs: ["A single afternoon of service may feel modest, but consistent participation can create lasting relationships and encourage others to join in."] },
      { heading: "A people-first mindset", paragraphs: ["The same habits that create a good lending experience—listening, communicating, and following through—also help strengthen the communities we serve."] },
    ],
  },
  {
    slug: "lock-or-float",
    category: "Rates",
    title: "Should you lock or float? A simple framework",
    date: "Jun 12, 2026",
    readTime: "4 min read",
    dek: "A rate lock can provide certainty for a set period. Floating keeps the rate open to market movement. Your timeline and comfort with uncertainty matter.",
    takeaway: "The goal is not to win every market move. It is to choose a level of certainty that supports your closing plan.",
    sections: [
      { heading: "What a rate lock means", paragraphs: ["A lock generally holds specified loan terms for an agreed period while the loan moves toward closing, subject to its conditions. Lock periods, costs, and extension policies vary."] },
      { heading: "What floating means", paragraphs: ["Floating means the rate has not yet been locked and can change with the market. That creates the possibility of improvement as well as the risk of an increase."] },
      { heading: "Questions for your loan officer", paragraphs: ["Before deciding, understand the rules for your specific loan."], points: ["How long is the lock period?", "Is there a cost for this lock or an extension?", "What happens if the closing date changes?", "Are float-down options available, and under what conditions?"] },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
