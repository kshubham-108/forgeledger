import type {
  Advance,
  Competency,
  Discipline,
  MicroBuild,
  Module,
  University,
} from "./types";

export const universities: University[] = [
  {
    id: "uni-manchester",
    slug: "manchester",
    name: "University of Manchester",
    city: "Manchester",
    emailDomains: ["manchester.ac.uk"],
  },
  {
    id: "uni-leeds",
    slug: "leeds",
    name: "University of Leeds",
    city: "Leeds",
    emailDomains: ["leeds.ac.uk"],
  },
  {
    id: "uni-birmingham",
    slug: "birmingham",
    name: "University of Birmingham",
    city: "Birmingham",
    emailDomains: ["student.bham.ac.uk", "bham.ac.uk"],
  },
  {
    id: "uni-bristol",
    slug: "bristol",
    name: "University of Bristol",
    city: "Bristol",
    emailDomains: ["bristol.ac.uk"],
  },
  {
    id: "uni-cambridge",
    slug: "cambridge",
    name: "University of Cambridge",
    city: "Cambridge",
    emailDomains: ["cam.ac.uk"],
  },
  {
    id: "uni-cardiff",
    slug: "cardiff",
    name: "Cardiff University",
    city: "Cardiff",
    emailDomains: ["cardiff.ac.uk"],
  },
  {
    id: "uni-durham",
    slug: "durham",
    name: "Durham University",
    city: "Durham",
    emailDomains: ["durham.ac.uk"],
  },
  {
    id: "uni-edinburgh",
    slug: "edinburgh",
    name: "University of Edinburgh",
    city: "Edinburgh",
    emailDomains: ["ed.ac.uk"],
  },
  {
    id: "uni-exeter",
    slug: "exeter",
    name: "University of Exeter",
    city: "Exeter",
    emailDomains: ["exeter.ac.uk"],
  },
  {
    id: "uni-glasgow",
    slug: "glasgow",
    name: "University of Glasgow",
    city: "Glasgow",
    emailDomains: ["student.gla.ac.uk", "gla.ac.uk"],
  },
  {
    id: "uni-imperial",
    slug: "imperial",
    name: "Imperial College London",
    city: "London",
    emailDomains: ["imperial.ac.uk", "ic.ac.uk"],
  },
  {
    id: "uni-kcl",
    slug: "kcl",
    name: "King's College London",
    city: "London",
    emailDomains: ["kcl.ac.uk"],
  },
  {
    id: "uni-liverpool",
    slug: "liverpool",
    name: "University of Liverpool",
    city: "Liverpool",
    emailDomains: ["liverpool.ac.uk"],
  },
  {
    id: "uni-lse",
    slug: "lse",
    name: "London School of Economics and Political Science",
    city: "London",
    emailDomains: ["lse.ac.uk"],
  },
  {
    id: "uni-newcastle",
    slug: "newcastle",
    name: "Newcastle University",
    city: "Newcastle upon Tyne",
    emailDomains: ["newcastle.ac.uk", "ncl.ac.uk"],
  },
  {
    id: "uni-nottingham",
    slug: "nottingham",
    name: "University of Nottingham",
    city: "Nottingham",
    emailDomains: ["nottingham.ac.uk"],
  },
  {
    id: "uni-oxford",
    slug: "oxford",
    name: "University of Oxford",
    city: "Oxford",
    emailDomains: ["ox.ac.uk"],
  },
  {
    id: "uni-queen-mary",
    slug: "queen-mary",
    name: "Queen Mary University of London",
    city: "London",
    emailDomains: ["qmul.ac.uk"],
  },
  {
    id: "uni-queens-belfast",
    slug: "queens-belfast",
    name: "Queen's University Belfast",
    city: "Belfast",
    emailDomains: ["qub.ac.uk"],
  },
  {
    id: "uni-sheffield",
    slug: "sheffield",
    name: "University of Sheffield",
    city: "Sheffield",
    emailDomains: ["sheffield.ac.uk", "shef.ac.uk"],
  },
  {
    id: "uni-southampton",
    slug: "southampton",
    name: "University of Southampton",
    city: "Southampton",
    emailDomains: ["soton.ac.uk"],
  },
  {
    id: "uni-ucl",
    slug: "ucl",
    name: "University College London",
    city: "London",
    emailDomains: ["ucl.ac.uk"],
  },
  {
    id: "uni-warwick",
    slug: "warwick",
    name: "University of Warwick",
    city: "Coventry",
    emailDomains: ["warwick.ac.uk"],
  },
  {
    id: "uni-york",
    slug: "york",
    name: "University of York",
    city: "York",
    emailDomains: ["york.ac.uk"],
  },
  {
    id: "uni-bath",
    slug: "bath",
    name: "University of Bath",
    city: "Bath",
    emailDomains: ["bath.ac.uk"],
  },
];

export const modules: Module[] = [
  {
    id: "mod-psyc2017",
    universityId: "uni-manchester",
    code: "PSYC2017",
    title: "Research Methods and Statistics",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-law2041",
    universityId: "uni-manchester",
    code: "LAW2041",
    title: "Contract Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-hist2260",
    universityId: "uni-manchester",
    code: "HIST2260",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-bman2011",
    universityId: "uni-manchester",
    code: "BMAN2011",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-nurs2301",
    universityId: "uni-manchester",
    code: "NURS2301",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-comp2001",
    universityId: "uni-manchester",
    code: "COMP2001",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-psyc2520",
    universityId: "uni-leeds",
    code: "PSYC2520",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-law2086",
    universityId: "uni-leeds",
    code: "LAW2086",
    title: "Criminal Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-hist2400",
    universityId: "uni-leeds",
    code: "HIST2400",
    title: "The Practice of History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-lubs2005",
    universityId: "uni-leeds",
    code: "LUBS2005",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-comp2611",
    universityId: "uni-leeds",
    code: "COMP2611",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-nurs2270",
    universityId: "uni-leeds",
    code: "NURS2270",
    title: "Applied Evidence-Based Nursing",
    discipline: "nursing",
    year: 2,
  },

  // University of Birmingham
  {
    id: "mod-birmingham-psyc2121",
    universityId: "uni-birmingham",
    code: "PSYC2121",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-birmingham-law2122",
    universityId: "uni-birmingham",
    code: "LAW2122",
    title: "Contract Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-birmingham-hist2123",
    universityId: "uni-birmingham",
    code: "HIST2123",
    title: "Historiography and Historical Theory",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-birmingham-busi2124",
    universityId: "uni-birmingham",
    code: "BUSI2124",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-birmingham-nurs2125",
    universityId: "uni-birmingham",
    code: "NURS2125",
    title: "Pathophysiology and Pharmacology",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-birmingham-comp2126",
    universityId: "uni-birmingham",
    code: "COMP2126",
    title: "Data Structures and Algorithms",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-birmingham-econ2127",
    universityId: "uni-birmingham",
    code: "ECON2127",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-birmingham-math2128",
    universityId: "uni-birmingham",
    code: "MATH2128",
    title: "Real Analysis",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-birmingham-med2129",
    universityId: "uni-birmingham",
    code: "MED2129",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // University of Bristol
  {
    id: "mod-bristol-psyc2131",
    universityId: "uni-bristol",
    code: "PSYC2131",
    title: "Biological Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-bristol-law2132",
    universityId: "uni-bristol",
    code: "LAW2132",
    title: "Tort Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-bristol-hist2133",
    universityId: "uni-bristol",
    code: "HIST2133",
    title: "Approaches to History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-bristol-busi2134",
    universityId: "uni-bristol",
    code: "BUSI2134",
    title: "Organisational Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-bristol-nurs2135",
    universityId: "uni-bristol",
    code: "NURS2135",
    title: "Clinical Decision Making",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-bristol-comp2136",
    universityId: "uni-bristol",
    code: "COMP2136",
    title: "Databases",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-bristol-econ2137",
    universityId: "uni-bristol",
    code: "ECON2137",
    title: "Intermediate Macroeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-bristol-math2138",
    universityId: "uni-bristol",
    code: "MATH2138",
    title: "Linear Algebra II",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-bristol-med2139",
    universityId: "uni-bristol",
    code: "MED2139",
    title: "Human Disease and Therapeutics",
    discipline: "medicine",
    year: 2,
  },

  // University of Cambridge (no standalone undergraduate Business or Nursing degree)
  {
    id: "mod-cambridge-psyc2141",
    universityId: "uni-cambridge",
    code: "PSYC2141",
    title: "Social Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-cambridge-law2142",
    universityId: "uni-cambridge",
    code: "LAW2142",
    title: "Tort Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-cambridge-hist2143",
    universityId: "uni-cambridge",
    code: "HIST2143",
    title: "Historical Argument and Practice",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-cambridge-comp2146",
    universityId: "uni-cambridge",
    code: "COMP2146",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-cambridge-econ2147",
    universityId: "uni-cambridge",
    code: "ECON2147",
    title: "Econometrics I",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-cambridge-math2148",
    universityId: "uni-cambridge",
    code: "MATH2148",
    title: "Analysis II",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-cambridge-med2149",
    universityId: "uni-cambridge",
    code: "MED2149",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // Cardiff University
  {
    id: "mod-cardiff-psyc2151",
    universityId: "uni-cardiff",
    code: "PSYC2151",
    title: "Developmental Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-cardiff-law2152",
    universityId: "uni-cardiff",
    code: "LAW2152",
    title: "EU Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-cardiff-hist2153",
    universityId: "uni-cardiff",
    code: "HIST2153",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-cardiff-busi2154",
    universityId: "uni-cardiff",
    code: "BUSI2154",
    title: "Strategic Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-cardiff-nurs2155",
    universityId: "uni-cardiff",
    code: "NURS2155",
    title: "Long-Term Conditions and Complex Care",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-cardiff-comp2156",
    universityId: "uni-cardiff",
    code: "COMP2156",
    title: "Computer Systems and Architecture",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-cardiff-econ2157",
    universityId: "uni-cardiff",
    code: "ECON2157",
    title: "Money and Banking",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-cardiff-math2158",
    universityId: "uni-cardiff",
    code: "MATH2158",
    title: "Differential Equations",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-cardiff-med2159",
    universityId: "uni-cardiff",
    code: "MED2159",
    title: "Pathology and Pharmacology",
    discipline: "medicine",
    year: 2,
  },

  // Durham University (no undergraduate Nursing degree)
  {
    id: "mod-durham-psyc2161",
    universityId: "uni-durham",
    code: "PSYC2161",
    title: "Individual Differences",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-durham-law2162",
    universityId: "uni-durham",
    code: "LAW2162",
    title: "Land Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-durham-hist2163",
    universityId: "uni-durham",
    code: "HIST2163",
    title: "Historical Skills and Sources",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-durham-busi2164",
    universityId: "uni-durham",
    code: "BUSI2164",
    title: "Financial Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-durham-comp2166",
    universityId: "uni-durham",
    code: "COMP2166",
    title: "Programming Paradigms",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-durham-econ2167",
    universityId: "uni-durham",
    code: "ECON2167",
    title: "Development Economics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-durham-math2168",
    universityId: "uni-durham",
    code: "MATH2168",
    title: "Abstract Algebra",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-durham-med2169",
    universityId: "uni-durham",
    code: "MED2169",
    title: "Musculoskeletal and Neurological Systems",
    discipline: "medicine",
    year: 2,
  },

  // University of Edinburgh
  {
    id: "mod-edinburgh-psyc2171",
    universityId: "uni-edinburgh",
    code: "PSYC2171",
    title: "Psychopathology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-edinburgh-law2172",
    universityId: "uni-edinburgh",
    code: "LAW2172",
    title: "Public Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-edinburgh-hist2173",
    universityId: "uni-edinburgh",
    code: "HIST2173",
    title: "The Practice of History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-edinburgh-busi2174",
    universityId: "uni-edinburgh",
    code: "BUSI2174",
    title: "International Business Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-edinburgh-nurs2175",
    universityId: "uni-edinburgh",
    code: "NURS2175",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-edinburgh-comp2176",
    universityId: "uni-edinburgh",
    code: "COMP2176",
    title: "Web and Mobile Development",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-edinburgh-econ2177",
    universityId: "uni-edinburgh",
    code: "ECON2177",
    title: "Economics of Public Policy",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-edinburgh-math2178",
    universityId: "uni-edinburgh",
    code: "MATH2178",
    title: "Numerical Analysis",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-edinburgh-med2179",
    universityId: "uni-edinburgh",
    code: "MED2179",
    title: "Clinical and Communication Skills II",
    discipline: "medicine",
    year: 2,
  },

  // University of Exeter
  {
    id: "mod-exeter-psyc2181",
    universityId: "uni-exeter",
    code: "PSYC2181",
    title: "Conceptual and Historical Issues in Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-exeter-law2182",
    universityId: "uni-exeter",
    code: "LAW2182",
    title: "Equity and Trusts",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-exeter-hist2183",
    universityId: "uni-exeter",
    code: "HIST2183",
    title: "Making History: Theory and Practice",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-exeter-busi2184",
    universityId: "uni-exeter",
    code: "BUSI2184",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-exeter-nurs2185",
    universityId: "uni-exeter",
    code: "NURS2185",
    title: "Pathophysiology and Pharmacology",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-exeter-comp2186",
    universityId: "uni-exeter",
    code: "COMP2186",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-exeter-econ2187",
    universityId: "uni-exeter",
    code: "ECON2187",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-exeter-math2188",
    universityId: "uni-exeter",
    code: "MATH2188",
    title: "Probability and Statistics",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-exeter-med2189",
    universityId: "uni-exeter",
    code: "MED2189",
    title: "Human Disease and Therapeutics",
    discipline: "medicine",
    year: 2,
  },

  // University of Glasgow
  {
    id: "mod-glasgow-psyc2191",
    universityId: "uni-glasgow",
    code: "PSYC2191",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-glasgow-law2192",
    universityId: "uni-glasgow",
    code: "LAW2192",
    title: "Constitutional and Administrative Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-glasgow-hist2193",
    universityId: "uni-glasgow",
    code: "HIST2193",
    title: "Historiography and Historical Theory",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-glasgow-busi2194",
    universityId: "uni-glasgow",
    code: "BUSI2194",
    title: "Operations Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-glasgow-nurs2195",
    universityId: "uni-glasgow",
    code: "NURS2195",
    title: "Applied Evidence-Based Nursing",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-glasgow-comp2196",
    universityId: "uni-glasgow",
    code: "COMP2196",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-glasgow-econ2197",
    universityId: "uni-glasgow",
    code: "ECON2197",
    title: "Intermediate Macroeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-glasgow-math2198",
    universityId: "uni-glasgow",
    code: "MATH2198",
    title: "Real Analysis",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-glasgow-med2199",
    universityId: "uni-glasgow",
    code: "MED2199",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // Imperial College London (no Law, History, or Nursing degree)
  {
    id: "mod-imperial-busi2204",
    universityId: "uni-imperial",
    code: "BUSI2204",
    title: "Strategic Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-imperial-comp2206",
    universityId: "uni-imperial",
    code: "COMP2206",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-imperial-econ2207",
    universityId: "uni-imperial",
    code: "ECON2207",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-imperial-math2208",
    universityId: "uni-imperial",
    code: "MATH2208",
    title: "Linear Algebra II",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-imperial-med2209",
    universityId: "uni-imperial",
    code: "MED2209",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // King's College London
  {
    id: "mod-kcl-psyc2211",
    universityId: "uni-kcl",
    code: "PSYC2211",
    title: "Biological Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-kcl-law2212",
    universityId: "uni-kcl",
    code: "LAW2212",
    title: "Criminal Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-kcl-hist2213",
    universityId: "uni-kcl",
    code: "HIST2213",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-kcl-busi2214",
    universityId: "uni-kcl",
    code: "BUSI2214",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-kcl-nurs2215",
    universityId: "uni-kcl",
    code: "NURS2215",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-kcl-comp2216",
    universityId: "uni-kcl",
    code: "COMP2216",
    title: "Data Structures and Algorithms",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-kcl-econ2217",
    universityId: "uni-kcl",
    code: "ECON2217",
    title: "Econometrics I",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-kcl-math2218",
    universityId: "uni-kcl",
    code: "MATH2218",
    title: "Differential Equations",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-kcl-med2219",
    universityId: "uni-kcl",
    code: "MED2219",
    title: "Human Disease and Therapeutics",
    discipline: "medicine",
    year: 2,
  },

  // University of Liverpool
  {
    id: "mod-liverpool-psyc2221",
    universityId: "uni-liverpool",
    code: "PSYC2221",
    title: "Social Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-liverpool-law2222",
    universityId: "uni-liverpool",
    code: "LAW2222",
    title: "Contract Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-liverpool-hist2223",
    universityId: "uni-liverpool",
    code: "HIST2223",
    title: "Approaches to History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-liverpool-busi2224",
    universityId: "uni-liverpool",
    code: "BUSI2224",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-liverpool-nurs2225",
    universityId: "uni-liverpool",
    code: "NURS2225",
    title: "Clinical Decision Making",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-liverpool-comp2226",
    universityId: "uni-liverpool",
    code: "COMP2226",
    title: "Databases",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-liverpool-econ2227",
    universityId: "uni-liverpool",
    code: "ECON2227",
    title: "Money and Banking",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-liverpool-math2228",
    universityId: "uni-liverpool",
    code: "MATH2228",
    title: "Abstract Algebra",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-liverpool-med2229",
    universityId: "uni-liverpool",
    code: "MED2229",
    title: "Pathology and Pharmacology",
    discipline: "medicine",
    year: 2,
  },

  // LSE (no Medicine, Nursing, or standalone Computer Science / Mathematics degree)
  {
    id: "mod-lse-psyc2231",
    universityId: "uni-lse",
    code: "PSYC2231",
    title: "Social Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-lse-law2232",
    universityId: "uni-lse",
    code: "LAW2232",
    title: "Public Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-lse-hist2233",
    universityId: "uni-lse",
    code: "HIST2233",
    title: "Historical Argument and Practice",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-lse-busi2234",
    universityId: "uni-lse",
    code: "BUSI2234",
    title: "Strategic Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-lse-econ2237",
    universityId: "uni-lse",
    code: "ECON2237",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },

  // Newcastle University
  {
    id: "mod-newcastle-psyc2241",
    universityId: "uni-newcastle",
    code: "PSYC2241",
    title: "Developmental Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-newcastle-law2242",
    universityId: "uni-newcastle",
    code: "LAW2242",
    title: "Tort Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-newcastle-hist2243",
    universityId: "uni-newcastle",
    code: "HIST2243",
    title: "The Practice of History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-newcastle-busi2244",
    universityId: "uni-newcastle",
    code: "BUSI2244",
    title: "Organisational Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-newcastle-nurs2245",
    universityId: "uni-newcastle",
    code: "NURS2245",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-newcastle-comp2246",
    universityId: "uni-newcastle",
    code: "COMP2246",
    title: "Computer Systems and Architecture",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-newcastle-econ2247",
    universityId: "uni-newcastle",
    code: "ECON2247",
    title: "Development Economics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-newcastle-math2248",
    universityId: "uni-newcastle",
    code: "MATH2248",
    title: "Probability and Statistics",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-newcastle-med2249",
    universityId: "uni-newcastle",
    code: "MED2249",
    title: "Musculoskeletal and Neurological Systems",
    discipline: "medicine",
    year: 2,
  },

  // University of Nottingham
  {
    id: "mod-nottingham-psyc2251",
    universityId: "uni-nottingham",
    code: "PSYC2251",
    title: "Individual Differences",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-nottingham-law2252",
    universityId: "uni-nottingham",
    code: "LAW2252",
    title: "Land Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-nottingham-hist2253",
    universityId: "uni-nottingham",
    code: "HIST2253",
    title: "Historical Skills and Sources",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-nottingham-busi2254",
    universityId: "uni-nottingham",
    code: "BUSI2254",
    title: "Financial Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-nottingham-nurs2255",
    universityId: "uni-nottingham",
    code: "NURS2255",
    title: "Pathophysiology and Pharmacology",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-nottingham-comp2256",
    universityId: "uni-nottingham",
    code: "COMP2256",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-nottingham-econ2257",
    universityId: "uni-nottingham",
    code: "ECON2257",
    title: "Economics of Public Policy",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-nottingham-math2258",
    universityId: "uni-nottingham",
    code: "MATH2258",
    title: "Numerical Analysis",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-nottingham-med2259",
    universityId: "uni-nottingham",
    code: "MED2259",
    title: "Clinical and Communication Skills II",
    discipline: "medicine",
    year: 2,
  },

  // University of Oxford (no undergraduate Business or Nursing degree)
  {
    id: "mod-oxford-psyc2261",
    universityId: "uni-oxford",
    code: "PSYC2261",
    title: "Psychopathology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-oxford-law2262",
    universityId: "uni-oxford",
    code: "LAW2262",
    title: "Land Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-oxford-hist2263",
    universityId: "uni-oxford",
    code: "HIST2263",
    title: "Historiography and Historical Theory",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-oxford-comp2266",
    universityId: "uni-oxford",
    code: "COMP2266",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-oxford-econ2267",
    universityId: "uni-oxford",
    code: "ECON2267",
    title: "Econometrics I",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-oxford-math2268",
    universityId: "uni-oxford",
    code: "MATH2268",
    title: "Analysis II",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-oxford-med2269",
    universityId: "uni-oxford",
    code: "MED2269",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // Queen Mary University of London
  {
    id: "mod-queen-mary-psyc2271",
    universityId: "uni-queen-mary",
    code: "PSYC2271",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-queen-mary-law2272",
    universityId: "uni-queen-mary",
    code: "LAW2272",
    title: "Criminal Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-queen-mary-hist2273",
    universityId: "uni-queen-mary",
    code: "HIST2273",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-queen-mary-busi2274",
    universityId: "uni-queen-mary",
    code: "BUSI2274",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-queen-mary-nurs2275",
    universityId: "uni-queen-mary",
    code: "NURS2275",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-queen-mary-comp2276",
    universityId: "uni-queen-mary",
    code: "COMP2276",
    title: "Data Structures and Algorithms",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-queen-mary-econ2277",
    universityId: "uni-queen-mary",
    code: "ECON2277",
    title: "Intermediate Macroeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-queen-mary-math2278",
    universityId: "uni-queen-mary",
    code: "MATH2278",
    title: "Linear Algebra II",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-queen-mary-med2279",
    universityId: "uni-queen-mary",
    code: "MED2279",
    title: "Human Disease and Therapeutics",
    discipline: "medicine",
    year: 2,
  },

  // Queen's University Belfast
  {
    id: "mod-queens-belfast-psyc2281",
    universityId: "uni-queens-belfast",
    code: "PSYC2281",
    title: "Biological Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-queens-belfast-law2282",
    universityId: "uni-queens-belfast",
    code: "LAW2282",
    title: "Equity and Trusts",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-queens-belfast-hist2283",
    universityId: "uni-queens-belfast",
    code: "HIST2283",
    title: "Making History: Theory and Practice",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-queens-belfast-busi2284",
    universityId: "uni-queens-belfast",
    code: "BUSI2284",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-queens-belfast-nurs2285",
    universityId: "uni-queens-belfast",
    code: "NURS2285",
    title: "Applied Evidence-Based Nursing",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-queens-belfast-comp2286",
    universityId: "uni-queens-belfast",
    code: "COMP2286",
    title: "Databases",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-queens-belfast-econ2287",
    universityId: "uni-queens-belfast",
    code: "ECON2287",
    title: "Money and Banking",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-queens-belfast-math2288",
    universityId: "uni-queens-belfast",
    code: "MATH2288",
    title: "Differential Equations",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-queens-belfast-med2289",
    universityId: "uni-queens-belfast",
    code: "MED2289",
    title: "Pathology and Pharmacology",
    discipline: "medicine",
    year: 2,
  },

  // University of Sheffield
  {
    id: "mod-sheffield-psyc2291",
    universityId: "uni-sheffield",
    code: "PSYC2291",
    title: "Social Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-sheffield-law2292",
    universityId: "uni-sheffield",
    code: "LAW2292",
    title: "Public Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-sheffield-hist2293",
    universityId: "uni-sheffield",
    code: "HIST2293",
    title: "The Practice of History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-sheffield-busi2294",
    universityId: "uni-sheffield",
    code: "BUSI2294",
    title: "Strategic Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-sheffield-nurs2295",
    universityId: "uni-sheffield",
    code: "NURS2295",
    title: "Clinical Decision Making",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-sheffield-comp2296",
    universityId: "uni-sheffield",
    code: "COMP2296",
    title: "Computer Systems and Architecture",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-sheffield-econ2297",
    universityId: "uni-sheffield",
    code: "ECON2297",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-sheffield-math2298",
    universityId: "uni-sheffield",
    code: "MATH2298",
    title: "Abstract Algebra",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-sheffield-med2299",
    universityId: "uni-sheffield",
    code: "MED2299",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // University of Southampton
  {
    id: "mod-southampton-psyc2301",
    universityId: "uni-southampton",
    code: "PSYC2301",
    title: "Developmental Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-southampton-law2302",
    universityId: "uni-southampton",
    code: "LAW2302",
    title: "Constitutional and Administrative Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-southampton-hist2303",
    universityId: "uni-southampton",
    code: "HIST2303",
    title: "Historical Skills and Sources",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-southampton-busi2304",
    universityId: "uni-southampton",
    code: "BUSI2304",
    title: "Operations Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-southampton-nurs2305",
    universityId: "uni-southampton",
    code: "NURS2305",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-southampton-comp2306",
    universityId: "uni-southampton",
    code: "COMP2306",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-southampton-econ2307",
    universityId: "uni-southampton",
    code: "ECON2307",
    title: "Development Economics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-southampton-math2308",
    universityId: "uni-southampton",
    code: "MATH2308",
    title: "Probability and Statistics",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-southampton-med2309",
    universityId: "uni-southampton",
    code: "MED2309",
    title: "Musculoskeletal and Neurological Systems",
    discipline: "medicine",
    year: 2,
  },

  // University College London
  {
    id: "mod-ucl-psyc2311",
    universityId: "uni-ucl",
    code: "PSYC2311",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-ucl-law2312",
    universityId: "uni-ucl",
    code: "LAW2312",
    title: "Tort Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-ucl-hist2313",
    universityId: "uni-ucl",
    code: "HIST2313",
    title: "Historiography and Historical Theory",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-ucl-busi2314",
    universityId: "uni-ucl",
    code: "BUSI2314",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-ucl-nurs2315",
    universityId: "uni-ucl",
    code: "NURS2315",
    title: "Pathophysiology and Pharmacology",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-ucl-comp2316",
    universityId: "uni-ucl",
    code: "COMP2316",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-ucl-econ2317",
    universityId: "uni-ucl",
    code: "ECON2317",
    title: "Econometrics I",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-ucl-math2318",
    universityId: "uni-ucl",
    code: "MATH2318",
    title: "Real Analysis",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-ucl-med2319",
    universityId: "uni-ucl",
    code: "MED2319",
    title: "Human Disease and Therapeutics",
    discipline: "medicine",
    year: 2,
  },

  // University of Warwick (no undergraduate Nursing or Medicine degree)
  {
    id: "mod-warwick-psyc2321",
    universityId: "uni-warwick",
    code: "PSYC2321",
    title: "Individual Differences",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-warwick-law2322",
    universityId: "uni-warwick",
    code: "LAW2322",
    title: "Contract Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-warwick-hist2323",
    universityId: "uni-warwick",
    code: "HIST2323",
    title: "Approaches to History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-warwick-busi2324",
    universityId: "uni-warwick",
    code: "BUSI2324",
    title: "Organisational Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-warwick-comp2326",
    universityId: "uni-warwick",
    code: "COMP2326",
    title: "Data Structures and Algorithms",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-warwick-econ2327",
    universityId: "uni-warwick",
    code: "ECON2327",
    title: "Econometrics I",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-warwick-math2328",
    universityId: "uni-warwick",
    code: "MATH2328",
    title: "Linear Algebra II",
    discipline: "maths",
    year: 2,
  },

  // University of York
  {
    id: "mod-york-psyc2331",
    universityId: "uni-york",
    code: "PSYC2331",
    title: "Psychopathology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-york-law2332",
    universityId: "uni-york",
    code: "LAW2332",
    title: "Land Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-york-hist2333",
    universityId: "uni-york",
    code: "HIST2333",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-york-busi2334",
    universityId: "uni-york",
    code: "BUSI2334",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-york-nurs2335",
    universityId: "uni-york",
    code: "NURS2335",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-york-comp2336",
    universityId: "uni-york",
    code: "COMP2336",
    title: "Databases",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-york-econ2337",
    universityId: "uni-york",
    code: "ECON2337",
    title: "Intermediate Macroeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-york-math2338",
    universityId: "uni-york",
    code: "MATH2338",
    title: "Differential Equations",
    discipline: "maths",
    year: 2,
  },
  {
    id: "mod-york-med2339",
    universityId: "uni-york",
    code: "MED2339",
    title: "Cardiovascular and Respiratory Systems",
    discipline: "medicine",
    year: 2,
  },

  // University of Bath (no Law, History, Nursing, or Medicine degree)
  {
    id: "mod-bath-psyc2341",
    universityId: "uni-bath",
    code: "PSYC2341",
    title: "Social Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-bath-busi2344",
    universityId: "uni-bath",
    code: "BUSI2344",
    title: "Strategic Management",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-bath-comp2346",
    universityId: "uni-bath",
    code: "COMP2346",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-bath-econ2347",
    universityId: "uni-bath",
    code: "ECON2347",
    title: "Intermediate Microeconomics",
    discipline: "economics",
    year: 2,
  },
  {
    id: "mod-bath-math2348",
    universityId: "uni-bath",
    code: "MATH2348",
    title: "Probability and Statistics",
    discipline: "maths",
    year: 2,
  },
];

export const microBuilds: MicroBuild[] = [
  {
    slug: "psych-literature-pipeline",
    title: "Run a literature search with AI — and catch every citation it invents",
    discipline: "psychology",
    moduleCodes: ["PSYC2017", "PSYC2520"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    competencyScores: {
      "prompt-craft": 2,
      evaluation: 3,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "Semantic Scholar", "Google Scholar"],
    summary:
      "Build a repeatable prompt chain that drafts a literature search strategy for a topic from your module, then learn to spot the citations the model makes up.",
    deliverable:
      "A reusable search-strategy prompt chain, plus a working sense of how often — and where — AI-suggested citations go wrong on your topic.",
    whyDoing:
      "A video shows someone else's search on someone else's topic. Run the pipeline on your module's actual topic list and you find out first-hand which citations the model invents for your field — an instinct you only get by doing the checking yourself.",
    steps: [
      "Write a prompt that asks the model for a search strategy (keywords, synonyms, inclusion criteria) for a topic from your module — not for papers themselves.",
      "Run the strategy on Semantic Scholar or Google Scholar and collect 5 real papers.",
      "Now ask the model to summarise the 5 papers from their abstracts, which you paste in yourself.",
      "Stress-test it: ask the model for 3 more papers without pasting abstracts, then check each one exists. Note which were real, distorted, or invented.",
      "Keep the prompts that worked and bin the ones that didn't — you now have a search pipeline you can rerun for any essay.",
    ],
    groundRules: {
      trains:
        "Designing search strategies with AI and checking AI-suggested citations against real databases.",
      notFor:
        "Not for generating a reference list for coursework, or citing anything you have not opened and read.",
      builtInCheck:
        "Step 4 is the habit: every citation the model offers gets looked up on Semantic Scholar or Google Scholar before you trust it.",
    },
    notePrompt:
      "Optional: save your final prompt chain and what the model got wrong, so future-you can rerun it.",
  },
  {
    slug: "law-issue-spotting-chain",
    title: "Build an issue-spotting chain that can't cite a case you haven't checked",
    discipline: "law",
    moduleCodes: ["LAW2041", "LAW2086"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    competencyScores: {
      "prompt-craft": 3,
      evaluation: 2,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "BAILII", "legislation.gov.uk"],
    summary:
      "Design a prompt chain that pulls the legal issues out of a judgment you supply — and get fast at spotting fabricated case law.",
    deliverable:
      "An issue-spotting prompt chain that forces the model to quote its supporting passage, and the ability to tell a genuine authority from an invented one in minutes.",
    whyDoing:
      "Generic 'AI for law' videos never touch a judgment from your reading list. Work over a BAILII extract you chose and you practise the skill that keeps showing up in professional-conduct headlines: spotting case law that doesn't exist.",
    steps: [
      "Pick a judgment from BAILII that your module covers and copy a manageable extract.",
      "Prompt the model to identify the legal issues, applying IRAC structure to your extract only.",
      "Ask it to list the authorities it relied on. Check each against BAILII or legislation.gov.uk.",
      "Rewrite the prompt so the model must quote the passage supporting each issue it spots.",
      "Note which authorities were genuine and which were invented, and keep your final chain for the next judgment.",
    ],
    groundRules: {
      trains:
        "Structured legal analysis prompting and checking AI-cited authorities against BAILII and legislation.gov.uk.",
      notFor:
        "Not for drafting assessed problem answers or moot submissions, and never for citing an authority you have not verified exists.",
      builtInCheck:
        "Steps 3 and 5 are the habit: every authority the model names gets looked up before it earns a place in your notes.",
    },
    notePrompt:
      "Optional: save your final issue-spotting prompt and which authorities turned out to be invented.",
  },
  {
    slug: "history-source-comparison",
    title: "Make AI compare two primary sources — then catch where it misreads them",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    estMinutes: 25,
    competencies: ["evaluation", "workflow-design", "ethics-citation"],
    competencyScores: {
      evaluation: 3,
      "workflow-design": 2,
      "ethics-citation": 2,
    },
    freeTools: [
      "ChatGPT (free)",
      "British Library digitised sources",
      "Internet Archive",
    ],
    summary:
      "Have the model compare two primary sources from your module period, find where its reading fails, and fix it with one targeted prompt change.",
    deliverable:
      "A sharper eye for where AI readings of sources go wrong, and a prompt pattern that measurably reduces the failure you diagnosed.",
    whyDoing:
      "You can't watch your way to this. The misreadings are specific to your two sources and your period — finding them line by line, then fixing the worst one with a prompt change, is the skill itself.",
    steps: [
      "Choose two short primary sources from your module period (letters, speeches, newspaper extracts).",
      "Prompt the model to compare authorship, audience, and bias — pasting the full text of both.",
      "Check its claims against the sources line by line. Mark each claim supported, unsupported, or wrong.",
      "Refine your prompt once to reduce the failure you saw most, and re-run.",
      "Compare before and after — you've just debugged an AI reading the way you'd debug an argument.",
    ],
    groundRules: {
      trains:
        "Critical evaluation of AI readings of primary sources, and iterating prompts against a failure you diagnosed.",
      notFor:
        "Not for producing source-analysis paragraphs for assessed essays, or presenting the model's reading as your own.",
      builtInCheck:
        "Step 3 is the habit: every claim the model makes gets checked line by line against the original text.",
    },
    notePrompt:
      "Optional: save which misreadings you caught and what the refined prompt fixed.",
  },
  {
    slug: "history-deep-research-map",
    title: "Map a historiographical debate with a deep-research agent",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    estMinutes: 25,
    competencies: ["workflow-design", "evaluation", "ethics-citation"],
    competencyScores: {
      "workflow-design": 3,
      evaluation: 3,
      "ethics-citation": 2,
    },
    freeTools: [
      "A deep-research mode (ChatGPT or Gemini, free tier)",
      "Your module reading list",
      "Internet Archive",
    ],
    summary:
      "Point a deep-research agent at a debate from your module, then test its map of the field against what your reading list actually says.",
    deliverable:
      "A working method for using research agents on historiography: what to ask for, how long to let them run, and where their synthesis flattens the argument.",
    whyDoing:
      "Deep-research agents are weeks old and nobody's lecture covers them yet. The only way to learn where they shine and where they flatten a debate is to run one on a debate you already half-know — which is exactly what your module gives you.",
    steps: [
      "Pick a debate your module covers (one where you've read at least two opposing historians).",
      "Brief a deep-research agent: ask for the main positions, key works, and how the debate has shifted over time.",
      "While it runs, jot down what you'd expect a good answer to include, from your own reading.",
      "Compare: which positions did it get right, which historians did it miss, where did it flatten a live disagreement into false consensus?",
      "Re-brief it once with a tighter question aimed at the biggest gap you found, and compare the runs.",
    ],
    groundRules: {
      trains:
        "Briefing research agents well, and judging agent-written syntheses against reading you've actually done.",
      notFor:
        "Not for outsourcing assessed historiographical essays, or citing works the agent names that you have not read.",
      builtInCheck:
        "Step 4 is the habit: the agent's map is tested against your own reading before any of it enters your notes.",
    },
    notePrompt:
      "Optional: save your best agent brief and the gaps you caught in its synthesis.",
  },
  {
    slug: "business-competitor-scan",
    title: "Build a competitor-scan workflow where every claim has a source",
    discipline: "business",
    moduleCodes: ["BMAN2011", "LUBS2005"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 3,
      "tool-integration": 2,
      evaluation: 2,
    },
    freeTools: ["ChatGPT (free)", "Companies House", "company annual reports"],
    summary:
      "Build a reusable competitor-scan workflow where the AI structures and contrasts only what you sourced — and anything unsourced gets deleted.",
    deliverable:
      "A scan template with placeholder slots you can rerun for any pair of companies, and the delete-anything-unsourced discipline that makes AI analysis usable.",
    whyDoing:
      "A tutorial hands you someone else's template for someone else's market. Build and test yours against Companies House filings you pulled yourself and you learn the rule that matters: if the model added a number you didn't supply, it goes.",
    steps: [
      "Pick two UK companies relevant to your module case studies.",
      "Gather raw inputs yourself: latest annual report summary, Companies House filing dates, pricing page text.",
      "Design one prompt template that turns your pasted inputs into a structured comparison table.",
      "Test it on both companies. Delete any output row that cites nothing you supplied.",
      "Save the template with placeholder slots so you can rerun it for any pair of companies.",
    ],
    groundRules: {
      trains:
        "Designing reusable analysis workflows where the AI formats and contrasts only what you sourced.",
      notFor:
        "Not for fabricating market data in assessed reports, or presenting model-invented figures as research.",
      builtInCheck:
        "Step 4 is the habit: any row in the output that does not trace to an input you gathered gets deleted.",
    },
    notePrompt:
      "Optional: save your reusable template and one filled-in comparison so you can rerun it next term.",
  },
  {
    slug: "nursing-patient-leaflet",
    title: "Draft a patient leaflet with AI — and check every clinical claim",
    discipline: "nursing",
    moduleCodes: ["NURS2301", "NURS2270"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    competencyScores: {
      "prompt-craft": 2,
      evaluation: 3,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "NHS website", "NICE guidance"],
    summary:
      "Draft a plain-English patient information leaflet with AI, then verify every clinical claim in it against NHS and NICE guidance.",
    deliverable:
      "The claim-by-claim checking habit the NHS now expects around AI-drafted patient material, practised on a condition from your module.",
    whyDoing:
      "No video checks clinical claims for the condition your module covers this term. Doing the verification yourself — including deleting claims that don't hold up — is the safety habit, not a demonstration of it.",
    steps: [
      "Choose a condition covered in your module and find its NHS page and any NICE guidance.",
      "Prompt the model for a plain-English leaflet draft at a reading age of 11, for that condition.",
      "List every clinical claim in the draft, one line each.",
      "Check each claim against NHS/NICE text. Correct or delete anything unsupported.",
      "Keep the corrected leaflet and notice which kinds of claims the model got wrong — that pattern repeats.",
    ],
    groundRules: {
      trains:
        "Clinical-communication drafting with AI and claim-by-claim checking against NHS and NICE guidance.",
      notFor:
        "Not for assessed care plans or reflective writing, and never for real patient-facing material without qualified sign-off.",
      builtInCheck:
        "Steps 3 and 4 are the habit: every clinical claim gets checked against NHS or NICE text, and unsupported claims are corrected or deleted.",
    },
    notePrompt:
      "Optional: save the claims you had to correct or delete — the pattern is worth remembering.",
  },
  {
    slug: "cs-data-cleaner",
    title: "Write the tests first, then make AI write the cleaner",
    discipline: "computer-science",
    moduleCodes: ["COMP2001", "COMP2611"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 3,
      "tool-integration": 3,
      evaluation: 2,
    },
    freeTools: ["Python", "a free LLM chat", "data.gov.uk open datasets"],
    summary:
      "Write failing tests for a messy open dataset first, then use AI to draft the cleaner and make your tests pass — refining prompts, not hand-patching.",
    deliverable:
      "Specification-first AI coding as a reflex: you define correctness in tests, the model writes to your spec, and you know how many iterations that really takes.",
    whyDoing:
      "Copilot tutorials show code appearing; they never make you define correctness first. Writing the tests before the AI touches anything — and refining prompts instead of hand-patching — is a working practice you only acquire by doing it on a dataset you picked.",
    steps: [
      "Pick a small messy CSV from data.gov.uk (missing values, mixed date formats).",
      "Write 4–5 tests describing the clean output you want, before any AI involvement.",
      "Prompt the model for a cleaning script, pasting your tests as the specification.",
      "Run the tests. For each failure, refine the prompt rather than hand-patching the code.",
      "Count how many prompt iterations each test needed — that number is your calibration for real projects.",
    ],
    groundRules: {
      trains:
        "Specification-first AI coding: you define correctness in tests, the model writes to your spec.",
      notFor:
        "Not for submitting AI-written code to assessed coursework where your module prohibits it — check your module's AI policy first.",
      builtInCheck:
        "Steps 2 and 4 are the habit: the tests exist before the AI is involved, and they — not the model — define correctness.",
    },
    notePrompt:
      "Optional: save your test file and how many attempts each test took to pass.",
  },
  {
    slug: "cs-agent-code-review",
    title: "Turn a coding agent into a reviewer that follows your rubric",
    discipline: "computer-science",
    moduleCodes: ["COMP2001", "COMP2611"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 2,
      "tool-integration": 3,
      evaluation: 3,
    },
    freeTools: [
      "A free coding agent or LLM chat",
      "A piece of your own recent code",
    ],
    summary:
      "Write a five-point review rubric for your own code, make an AI agent apply it, and judge which findings are real and which are noise.",
    deliverable:
      "A personal review rubric an agent can actually follow, and calibration on which agent findings deserve your attention.",
    whyDoing:
      "Agent code review is rolling out everywhere this year, and the skill isn't reading the output — it's constraining it. You only learn what a rubric must pin down by watching an agent misapply a vague one to code you understand.",
    steps: [
      "Pick 50–150 lines of your own recent code (a lab exercise or side project).",
      "Write a five-point review rubric: what matters here (naming, edge cases, error handling — your call).",
      "Ask the agent to review the code strictly against your rubric, citing line numbers for every finding.",
      "Triage its findings: real issue, matter of taste, or hallucinated. Count each category.",
      "Tighten the two vaguest rubric points and re-run — watch the noise drop.",
    ],
    groundRules: {
      trains:
        "Constraining AI reviewers with explicit criteria and triaging their findings against your own judgement.",
      notFor:
        "Not for review-washing group-project code you don't understand, or auto-fixing assessed work against module policy.",
      builtInCheck:
        "Step 4 is the habit: every agent finding is triaged as real, taste, or hallucinated before you act on any of it.",
    },
    notePrompt:
      "Optional: save your rubric and the real-vs-noise counts from both runs.",
  },
  {
    slug: "econ-model-assumption-audit",
    title: "Build an AI data-interpretation workflow — then audit every assumption it made",
    discipline: "economics",
    moduleCodes: ["ECON2237", "ECON2137", "ECON2327"],
    estMinutes: 25,
    competencies: ["workflow-design", "evaluation", "tool-integration"],
    competencyScores: {
      "workflow-design": 2,
      evaluation: 3,
      "tool-integration": 2,
    },
    freeTools: ["ChatGPT (free)", "ONS (Office for National Statistics) data", "Google Sheets"],
    summary:
      "Pull a real dataset from your module topic, get AI to draft an interpretation of it, then force out every assumption baked into that interpretation and check each one against the source.",
    deliverable:
      "A prompt template that makes the model state its assumptions and data source before it states a conclusion, and a calibrated sense of which assumptions it gets wrong most often.",
    whyDoing:
      "A walkthrough video interprets someone else's chart. Interpreting an ONS series from your own module topic — and interrogating the model's hidden assumptions about causation, sample period, or seasonality — is a skill you can only build on data you chose yourself.",
    steps: [
      "Pick a dataset from ONS (or your module's usual source) relevant to a topic you're covering this term.",
      "Ask the model to summarise the trend and suggest one economic explanation for it, pasting the raw figures yourself.",
      "Ask it to list every assumption its explanation depends on — about causation, comparability, or timing.",
      "Check each assumption against the dataset's own metadata and methodology notes. Mark it holds, questionable, or wrong.",
      "Rewrite your prompt to require assumptions up front next time, before any conclusion — and note how the output changes.",
    ],
    groundRules: {
      trains:
        "Structured data-interpretation prompting and surfacing the assumptions an AI explanation depends on.",
      notFor:
        "Not for generating analysis for assessed coursework, or presenting an AI-drafted interpretation as your own without checking its assumptions.",
      builtInCheck:
        "Step 4 is the habit: every assumption the model's explanation relies on gets checked against the dataset's own documentation before it's trusted.",
    },
    notePrompt:
      "Optional: save the assumptions you caught being wrong and your revised assumptions-first prompt.",
  },
  {
    slug: "maths-proof-checker",
    title: "Get AI to attempt a proof — then hunt for the invalid step",
    discipline: "maths",
    moduleCodes: ["MATH2148", "MATH2328", "MATH2208"],
    estMinutes: 25,
    competencies: ["evaluation", "prompt-craft", "tool-integration"],
    competencyScores: {
      evaluation: 3,
      "prompt-craft": 2,
      "tool-integration": 2,
    },
    freeTools: ["ChatGPT (free)", "a free CAS (e.g. GeoGebra, Wolfram Alpha free tier)", "your module problem sheet"],
    summary:
      "Have AI attempt a proof or problem from your module, then verify it line by line — the failure modes (invalid steps, invented theorems, silently dropped conditions) are specific enough to be worth cataloguing.",
    deliverable:
      "A working method for line-by-line proof verification against AI output, plus a personal list of the specific ways your model breaks on your kind of problem.",
    whyDoing:
      "Watching someone check a proof on a different problem set teaches you nothing about where your model breaks on your problem set. Running it on this week's problem sheet — and finding the step where it invents a theorem or drops a condition — is the only way to calibrate.",
    steps: [
      "Pick an unseen problem or proof question from your module's current problem sheet.",
      "Ask the model to solve or prove it, showing every step, before you look at any worked solution.",
      "Go through its answer line by line against the definitions and theorems from your module — not against 'does the conclusion look right'.",
      "Flag the first invalid step: a theorem that doesn't exist, a condition it silently dropped, or a non-sequitur.",
      "Compare against your module's actual worked solution or your tutor's method, and note which failure mode you caught, so you know what to check for next time.",
    ],
    groundRules: {
      trains:
        "Line-by-line verification of AI-generated proofs against definitions and theorems you can name.",
      notFor:
        "Not for submitting AI-generated proofs as assessed problem-sheet answers, or trusting a proof you haven't checked step by step.",
      builtInCheck:
        "Steps 3 and 4 are the habit: every line is checked against a real theorem or definition, and the first invalid step is named before you move on.",
    },
    notePrompt:
      "Optional: save the invalid step you found and which theorem it fabricated or misapplied.",
  },
  {
    slug: "medicine-differential-check",
    title: "Practice differential-diagnosis reasoning with AI — and check every claim against NICE",
    discipline: "medicine",
    moduleCodes: ["MED2269", "MED2319", "MED2219"],
    estMinutes: 25,
    competencies: ["evaluation", "ethics-citation", "prompt-craft"],
    competencyScores: {
      evaluation: 3,
      "ethics-citation": 3,
      "prompt-craft": 2,
    },
    freeTools: ["ChatGPT (free)", "NICE guidance", "Cochrane Library"],
    summary:
      "Work through a differential-diagnosis reasoning exercise on an anonymised, textbook-style case with AI, then check every clinical claim it makes against NICE and Cochrane before it earns a place in your notes.",
    deliverable:
      "A claim-by-claim verification habit for AI clinical reasoning, and a clear sense of where the model overstates confidence or invents guideline detail.",
    whyDoing:
      "A demo case is already fact-checked for the video. Running your own textbook case — and finding where the model's differential is overconfident or its cited guideline doesn't say what it claims — is the calibration you actually need before this becomes a real habit.",
    steps: [
      "Take an anonymised, textbook-style case vignette from your module (never a real patient) with a presenting complaint and history.",
      "Ask the model to generate a ranked differential diagnosis with its reasoning for each item.",
      "List every clinical claim it makes — prevalence figures, guideline recommendations, red-flag symptoms — one line each.",
      "Check each claim against NICE guidance or the Cochrane Library. Mark supported, outdated, or invented.",
      "Note which kind of claim it got wrong most often — that's the pattern to stay alert for next time.",
    ],
    groundRules: {
      trains:
        "Differential-diagnosis reasoning practice with AI and claim-by-claim verification against NICE and Cochrane.",
      notFor:
        "Never for real patient care, real case data, or assessed OSCE and clinical placement work — this is reasoning practice on textbook cases only, not a clinical tool.",
      builtInCheck:
        "Step 4 is the habit: every clinical claim is checked against NICE or Cochrane before it is trusted, and unsupported claims are marked as such.",
    },
    notePrompt:
      "Optional: save which claims turned out unsupported or outdated — the pattern is worth remembering.",
  },
];

/*
  The frontier feed: recent AI advances mapped to the modules they matter
  for. In MVP 1 these come from a daily ingest (arXiv, vendor changelogs,
  model releases); here they are hand-seeded to demonstrate the loop.
  Fluent watches the feeds. You get the skill.
*/
export const advances: Advance[] = [
  {
    id: "adv-screening-recall",
    title:
      "LLM abstract screening hits 97% recall in systematic reviews — but only with a human spot-check loop",
    source: "arXiv",
    date: "3 Jul 2026",
    whyItMatters:
      "The human-in-the-loop screening pattern your methods module teaches is the one that actually works — fully automated runs silently dropped eligible papers.",
    moduleCodes: ["PSYC2017", "PSYC2520"],
    relatedBuildSlug: "psych-literature-pipeline",
  },
  {
    id: "adv-grounded-citations",
    title:
      "Frontier chat models now attach live source links to legal answers by default",
    source: "release",
    date: "1 Jul 2026",
    whyItMatters:
      "Linked sources still need opening — models happily cite real pages that don't say what they claim. Checking authorities just got faster, not optional.",
    moduleCodes: ["LAW2041", "LAW2086"],
    relatedBuildSlug: "law-issue-spotting-chain",
  },
  {
    id: "adv-deep-research",
    title:
      "Deep-research agents can now run 30-minute multi-source investigations unattended",
    source: "vendor",
    date: "27 Jun 2026",
    whyItMatters:
      "Brilliant for mapping a debate fast — if you can tell where the agent's tidy synthesis flattens a live disagreement.",
    moduleCodes: ["HIST2260", "HIST2400"],
    relatedBuildSlug: "history-deep-research-map",
  },
  {
    id: "adv-reading-age",
    title:
      "Study: LLMs hold a target reading age far better when shown exemplar text than when given a number",
    source: "arXiv",
    date: "24 Jun 2026",
    whyItMatters:
      "Changes how you prompt for patient-facing drafts: paste an exemplar paragraph instead of asking for 'reading age 11'.",
    moduleCodes: ["NURS2301", "NURS2270"],
    relatedBuildSlug: "nursing-patient-leaflet",
  },
  {
    id: "adv-agent-coding",
    title:
      "Coding agents that run your test suite before replying reach free tiers",
    source: "vendor",
    date: "19 Jun 2026",
    whyItMatters:
      "Spec-first habits pay off double now the agent can execute your tests itself — write them first and it converges in fewer tries.",
    moduleCodes: ["COMP2001", "COMP2611"],
    relatedBuildSlug: "cs-data-cleaner",
  },
  {
    id: "adv-small-models",
    title:
      "New open-weights 7B model matches last year's frontier on structured extraction",
    source: "release",
    date: "16 Jun 2026",
    whyItMatters:
      "Structured extraction now runs on a laptop with no API bill — worth knowing which jobs small local models do well.",
    moduleCodes: ["COMP2001", "COMP2611"],
    relatedBuildSlug: "cs-agent-code-review",
  },
  {
    id: "adv-sheets-agent",
    title:
      "Spreadsheet AI agents can now pull filings and draft comparison tables on request",
    source: "vendor",
    date: "12 Jun 2026",
    whyItMatters:
      "Auto-built tables look finished but every cell still needs a source you can open — the sourcing habit is the skill.",
    moduleCodes: ["BMAN2011", "LUBS2005"],
    relatedBuildSlug: "business-competitor-scan",
  },
  {
    id: "adv-invented-dois",
    title:
      "One in five AI-suggested psychology citations still points at a wrong or invented DOI",
    source: "arXiv",
    date: "9 Jun 2026",
    whyItMatters:
      "Reference lists remain the fastest way to lose marks with AI. Measure the error rate on your own topic before you trust a suggestion.",
    moduleCodes: ["PSYC2017"],
    relatedBuildSlug: "psych-literature-pipeline",
  },
];

export const competencyLabels: Record<Competency, string> = {
  "prompt-craft": "Prompt craft",
  evaluation: "Evaluation & verification",
  "workflow-design": "Workflow design",
  "tool-integration": "Tool integration",
  "ethics-citation": "Ethics & citation",
};

/* The four competencies rated in the onboarding capability snapshot. */
export const snapshotCompetencies: Competency[] = [
  "prompt-craft",
  "evaluation",
  "workflow-design",
  "ethics-citation",
];

export const advanceSourceLabels: Record<Advance["source"], string> = {
  arXiv: "arXiv",
  vendor: "Vendor update",
  release: "Release",
};

export const disciplineLabels: Record<MicroBuild["discipline"], string> = {
  psychology: "Psychology",
  law: "Law",
  history: "History",
  business: "Business",
  nursing: "Nursing",
  "computer-science": "Computer Science",
  economics: "Economics",
  maths: "Maths",
  medicine: "Medicine",
};

const buildBySlugMap = new Map(microBuilds.map((b) => [b.slug, b]));
const moduleByIdMap = new Map(modules.map((m) => [m.id, m]));

export function getBuildBySlug(slug: string): MicroBuild | undefined {
  return buildBySlugMap.get(slug);
}

export function getModuleById(id: string): Module | undefined {
  return moduleByIdMap.get(id);
}

export function getModulesForUniversity(universityId: string): Module[] {
  return modules.filter((m) => m.universityId === universityId);
}

export function getBuildsForModuleCodes(codes: string[]): MicroBuild[] {
  const codeSet = new Set(codes);
  return microBuilds.filter((b) => b.moduleCodes.some((c) => codeSet.has(c)));
}

export function getAdvancesForModuleCodes(codes: string[]): Advance[] {
  const codeSet = new Set(codes);
  return advances.filter((a) => a.moduleCodes.some((c) => codeSet.has(c)));
}

export function getBuildsForDiscipline(discipline: Discipline): MicroBuild[] {
  return microBuilds.filter((b) => b.discipline === discipline);
}

export function getCoursesForUniversity(universityId: string): Discipline[] {
  const set = new Set(getModulesForUniversity(universityId).map((m) => m.discipline));
  return [...set];
}
