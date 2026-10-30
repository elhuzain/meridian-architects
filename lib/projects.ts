export type Project = {
  slug: string;
  title: string;
  location: string;
  year: number;
  /** Path under /public, e.g. "/projects/harbourside-library.jpg" */
  image?: string;
  /** Attribution for licensed stock imagery (demo content) */
  credit?: { author: string; license: string; licenseUrl: string; source: string };
  /** Content for the project page; projects without it have no page yet */
  details?: {
    summary: string;
    description: string[];
    facts: { label: string; value: string }[];
  };
};

const ccBySa4 = {
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
};

export const projects: Project[] = [
  {
    slug: "harbourside-library",
    title: "Harbourside Library",
    location: "Rotterdam, Netherlands",
    year: 2024,
    image: "/projects/harbourside-library.jpg",
    credit: {
      author: "Dietmar Rabich",
      ...ccBySa4,
      source:
        "https://commons.wikimedia.org/wiki/File:M%C3%BCnster,_Westf%C3%A4lische_Wilhelms_Universit%C3%A4t,_Philosophisches_Seminar_--_2020_--_5075-7.jpg",
    },
    details: {
      summary:
        "A neighbourhood library on Rotterdam’s old harbour, where deep brick piers frame tall windows and the bookshelves themselves become the facade.",
      description: [
        "The library replaces a closed warehouse on the quay and was conceived as a reading room open to the street. Rather than hiding the collection behind solid walls, we placed the shelving directly against the glazing, so that from outside the building reads as a cabinet of books held within a brick frame.",
        "Load-bearing brick piers carry the floors in a regular rhythm and give the facade its depth. Their thickness shades the glass from low western sun and creates deep window reveals that double as seats on the inside.",
        "Inside, a central stair rises through all four levels, connecting the children’s floor at the quay with quiet study rooms above that look out across the harbour basin.",
      ],
      facts: [
        { label: "Location", value: "Rotterdam, Netherlands" },
        { label: "Year", value: "2024" },
        { label: "Client", value: "Rotterdam Public Library Foundation" },
        { label: "Programme", value: "Public library and reading rooms" },
        { label: "Area", value: "4,200 m²" },
        { label: "Services", value: "Architecture, structural engineering, interiors" },
        { label: "Status", value: "Completed" },
      ],
    },
  },
  {
    slug: "stone-house",
    title: "Stone House",
    location: "Ticino, Switzerland",
    year: 2023,
    image: "/projects/stone-house.jpg",
    credit: {
      author: "Dietmar Rabich",
      ...ccBySa4,
      source: "https://commons.wikimedia.org/wiki/File:M%C3%BCnster,_Stadtb%C3%BCcherei_--_2022_--_0873.jpg",
    },
    details: {
      summary:
        "A family house on a steep Ticino hillside, built from heavy stone walls that curve with the slope and a light metal roof that lifts towards the view.",
      description: [
        "The house is set into the terrace walls of a former vineyard. Its lower walls are built from stone quarried in the valley and finished in a pale lime render, following the curve of the old terraces so that the building seems to grow out of the hillside rather than sit on it.",
        "Above the stone base, a dark zinc-clad roof volume cantilevers outwards to frame the lake below. The cantilever is carried by a concealed steel structure anchored into the masonry, allowing the upper floor to open on three sides without visible supports.",
        "The thick walls keep the interior cool through the summer and store the warmth of the winter sun, so the house needs very little mechanical heating or cooling across the year.",
      ],
      facts: [
        { label: "Location", value: "Ticino, Switzerland" },
        { label: "Year", value: "2023" },
        { label: "Client", value: "Private" },
        { label: "Programme", value: "Single-family house" },
        { label: "Area", value: "320 m²" },
        { label: "Services", value: "Architecture, structural engineering, interiors" },
        { label: "Status", value: "Completed" },
      ],
    },
  },
  {
    slug: "kiln-yard-offices",
    title: "Kiln Yard Offices",
    location: "Copenhagen, Denmark",
    year: 2022,
    image: "/projects/kiln-yard-offices.jpg",
    credit: {
      author: "Dietmar Rabich",
      ...ccBySa4,
      source: "https://commons.wikimedia.org/wiki/File:M%C3%BCnster,_LBS_--_2021_--_9803.jpg",
    },
    details: {
      summary:
        "A workplace on the site of a former brickworks in Copenhagen, wrapped in pale horizontal bands and stitched together by an external stair in weathering steel.",
      description: [
        "Kiln Yard Offices occupies the yard where the old brickworks once fired its kilns. The new building is deliberately light in contrast: continuous bands of pale aluminium cladding run around every floor, separated by recessed ribbons of timber-framed glazing that bring daylight deep into the plan.",
        "An external stair in weathering steel climbs the main facade, linking the office floors with shared terraces. Its rust-coloured finish recalls the fired clay of the site’s industrial past and gives tenants an informal route between floors outside the building core.",
        "The structure is a hybrid of a concrete core and a timber frame, which reduced the building’s embodied carbon by more than a third compared with an all-concrete design while keeping open, column-free floor plates.",
      ],
      facts: [
        { label: "Location", value: "Copenhagen, Denmark" },
        { label: "Year", value: "2022" },
        { label: "Client", value: "Kiln Yard Developments" },
        { label: "Programme", value: "Offices and shared terraces" },
        { label: "Area", value: "9,800 m²" },
        { label: "Services", value: "Architecture, structural engineering, urban planning" },
        { label: "Status", value: "Completed" },
      ],
    },
  },
  {
    slug: "river-pavilion",
    title: "River Pavilion",
    location: "Porto, Portugal",
    year: 2021,
    image: "/projects/river-pavilion.jpg",
    credit: {
      author: "Anıl Öztaş",
      ...ccBySa4,
      source:
        "https://commons.wikimedia.org/wiki/File:Neuss_(DE),_Raketenstation_Hombroich,_Langen_Foundation_--_2014_--_7404.jpg",
    },
    details: {
      summary:
        "A public pavilion on the bank of the Douro, where a single concrete wall and a light steel frame hold a room that opens entirely to the river.",
      description: [
        "The brief asked for a place to gather by the water: an exhibition space by day and a venue for small events in the evening. We answered with two elements only. A long board-marked concrete wall closes the pavilion to the road behind it, while a slender steel frame and full-height glazing open it to the river in front.",
        "The roof is a shallow grid of steel beams resting on columns spaced to the rhythm of the glazing, so structure and enclosure read as one. Our engineers kept every member as fine as the spans allow, letting the frame disappear against the water at dusk.",
        "A reflecting pool between the pavilion and the riverbank doubles the building at night, when the wall is washed with warm light and the glass room glows like a lantern on the quay.",
      ],
      facts: [
        { label: "Location", value: "Porto, Portugal" },
        { label: "Year", value: "2021" },
        { label: "Client", value: "Douro Riverside Trust" },
        { label: "Programme", value: "Exhibition and events pavilion" },
        { label: "Area", value: "1,450 m²" },
        { label: "Services", value: "Architecture, structural engineering, landscape" },
        { label: "Status", value: "Completed" },
      ],
    },
  },
];
