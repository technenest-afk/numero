// Numerology calculations based on Pythagorean system

export interface NumerologyResult {
  lifePath: number;
  soulUrge: number;
  expression: number;
  personality: number;
  birthday: number;
  maturity: number;
  lifePathMeaning: string;
  soulUrgeMeaning: string;
  expressionMeaning: string;
  personalityMeaning: string;
  birthdayMeaning: string;
}

export interface CompatibilityResult {
  compatibility: number;
  lifePath1: number;
  lifePath2: number;
  description: string;
  strengths: string[];
  challenges: string[];
}

// Reduce number to single digit (except master numbers 11, 22, 33)
export function reduceToSingleDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;
  
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  
  return reduceToSingleDigit(sum);
}

// Calculate Life Path Number from birth date
export function calculateLifePath(day: number, month: number, year: number): number {
  const daySum = reduceToSingleDigit(day);
  const monthSum = reduceToSingleDigit(month);
  const yearSum = reduceToSingleDigit(year);
  
  return reduceToSingleDigit(daySum + monthSum + yearSum);
}

// Calculate Soul Urge Number from vowels in name
export function calculateSoulUrge(fullName: string): number {
  const vowels = 'aeiouAEIOU';
  let sum = 0;
  
  for (const char of fullName) {
    if (vowels.includes(char)) {
      sum += getLetterValue(char);
    }
  }
  
  return reduceToSingleDigit(sum);
}

// Calculate Expression Number from all letters in name
export function calculateExpression(fullName: string): number {
  let sum = 0;
  
  for (const char of fullName) {
    if (/[a-zA-Z]/.test(char)) {
      sum += getLetterValue(char);
    }
  }
  
  return reduceToSingleDigit(sum);
}

// Calculate Personality Number from consonants in name
export function calculatePersonality(fullName: string): number {
  const vowels = 'aeiouAEIOU';
  let sum = 0;
  
  for (const char of fullName) {
    if (/[a-zA-Z]/.test(char) && !vowels.includes(char)) {
      sum += getLetterValue(char);
    }
  }
  
  return reduceToSingleDigit(sum);
}

// Calculate Birthday Number
export function calculateBirthday(day: number): number {
  return reduceToSingleDigit(day);
}

// Calculate Maturity Number
export function calculateMaturity(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression);
}

// Get letter value based on Pythagorean numerology
function getLetterValue(letter: string): number {
  const values: { [key: string]: number } = {
    'a': 1, 'j': 1, 's': 1,
    'b': 2, 'k': 2, 't': 2,
    'c': 3, 'l': 3, 'u': 3,
    'd': 4, 'm': 4, 'v': 4,
    'e': 5, 'n': 5, 'w': 5,
    'f': 6, 'o': 6, 'x': 6,
    'g': 7, 'p': 7, 'y': 7,
    'h': 8, 'q': 8, 'z': 8,
    'i': 9, 'r': 9
  };
  
  return values[letter.toLowerCase()] || 0;
}

// Get meaning for Life Path Number
function getLifePathMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: "Líder natural, independiente, ambicioso y creativo. Tienes una fuerte voluntad y la capacidad de manifestar tus sueños.",
    2: "Pacificador, diplomático, sensible y cooperativo. Eres un mediador nato con gran intuición.",
    3: "Creativo, expresivo, optimista y sociable. Tienes un don para la comunicación y las artes.",
    4: "Práctico, organizado, trabajador y confiable. Construyes bases sólidas para el éxito.",
    5: "Aventurero, versátil, curioso y amante de la libertad. Buscas variedad y nuevas experiencias.",
    6: "Responsable, protector, nutridor y armonioso. Eres el pilar de tu familia y comunidad.",
    7: "Analítico, espiritual, introspectivo y sabio. Buscas la verdad y el conocimiento profundo.",
    8: "Poderoso, exitoso, ambicioso y materialmente abundante. Tienes habilidades para los negocios.",
    9: "Humanitario, compasivo, generoso y visionario. Viene a servir a la humanidad.",
    11: "Intuitivo, iluminado, inspirador y visionario. Tienes una conexión espiritual profunda.",
    22: "Maestro constructor, práctico, visionario y poderoso. Puedes manifestar grandes sueños.",
    33: "Maestro curandero, compasivo, amoroso y altruista. Viene a elevar la conciencia humana."
  };
  
  return meanings[num] || meanings[reduceToSingleDigit(num)] || "Número místico con energía única.";
}

// Get meaning for Soul Urge Number
function getSoulUrgeMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: "Deseas independencia, liderazgo y reconocimiento. Tu alma anhela ser pionera.",
    2: "Buscas armonía, amor y conexiones profundas. Tu alma anhela la paz y la unión.",
    3: "Deseas expresión creativa, alegría y reconocimiento. Tu alma anhela crear belleza.",
    4: "Buscas estabilidad, orden y seguridad. Tu alma anhela construir algo duradero.",
    5: "Deseas libertad, aventura y cambio. Tu alma anhela explorar y experimentar.",
    6: "Buscas amor, familia y servicio. Tu alma anhela cuidar y proteger.",
    7: "Deseas conocimiento, verdad y espiritualidad. Tu alma anhela entender los misterios.",
    8: "Buscas éxito, poder y abundancia. Tu alma anhela logros materiales.",
    9: "Deseas ayudar, sanar y servir. Tu alma anhela hacer del mundo un lugar mejor.",
    11: "Buscas iluminación, inspiración y conexión divina. Tu alma es altamente intuitiva.",
    22: "Deseas manifestar grandes visiones y legados. Tu alma es una constructora maestra.",
    33: "Buscas elevar a otros con amor incondicional. Tu alma es pura compasión."
  };
  
  return meanings[num] || meanings[reduceToSingleDigit(num)] || "Deseos místicos profundos.";
}

// Get meaning for Expression Number
function getExpressionMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: "Tu talento natural es liderar e innovar. Eres un pionero con gran determinación.",
    2: "Tu don es la diplomacia y la cooperación. Eres un puente entre las personas.",
    3: "Tu talento es la comunicación y la creatividad. Iluminas con tu expresión.",
    4: "Tu don es la organización y el trabajo duro. Construyes con precisión.",
    5: "Tu talento es la adaptabilidad y el carisma. Atraes oportunidades.",
    6: "Tu don es el cuidado y la responsabilidad. Sanas con tu presencia.",
    7: "Tu talento es el análisis y la sabiduría. Ves lo que otros no ven.",
    8: "Tu don es el liderazgo ejecutivo y el éxito. Manifestas abundancia.",
    9: "Tu talento es la compasión y la visión. Inspiras a otros a ser mejores.",
    11: "Tu don es la intuición y la inspiración. Eres un faro de luz.",
    22: "Tu talento es manifestar lo imposible. Eres un constructor de sueños.",
    33: "Tu don es el amor universal y la sanación. Eres un maestro espiritual."
  };
  
  return meanings[num] || meanings[reduceToSingleDigit(num)] || "Talento místico único.";
}

// Get meaning for Personality Number
function getPersonalityMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: "Proyectas confianza, independencia y fuerza. Otros te ven como líder.",
    2: "Proyectas calma, sensibilidad y cooperación. Otros buscan tu apoyo.",
    3: "Proyectas alegría, creatividad y encanto. Otros se sienten atraídos por ti.",
    4: "Proyectas estabilidad, confiabilidad y orden. Otros confían en ti.",
    5: "Proyectas energía, entusiasmo y libertad. Otros admiran tu espíritu.",
    6: "Proyectas calidez, responsabilidad y cuidado. Otros se sienten protegidos.",
    7: "Proyectas misterio, sabiduría y profundidad. Otros respetan tu conocimiento.",
    8: "Proyectas poder, éxito y autoridad. Otros reconocen tu estatus.",
    9: "Proyectas compasión, generosidad y nobleza. Otros admiran tu corazón.",
    11: "Proyectas intuición, inspiración y elevación. Otros sienten tu energía especial.",
    22: "Proyectas visión, poder y manifestación. Otros ven tu grandeza.",
    33: "Proyectas amor divino, pureza y sanación. Otros sienten tu luz."
  };
  
  return meanings[num] || meanings[reduceToSingleDigit(num)] || "Personalidad mística magnética.";
}

// Get meaning for Birthday Number
function getBirthdayMeaning(num: number): string {
  const meanings: { [key: number]: string } = {
    1: "Naciste para liderar. Tienes dones de iniciativa y originalidad.",
    2: "Naciste para unir. Tienes dones de diplomacia y sensibilidad.",
    3: "Naciste para crear. Tienes dones de expresión y optimismo.",
    4: "Naciste para construir. Tienes dones de organización y perseverancia.",
    5: "Naciste para explorar. Tienes dones de adaptabilidad y versatilidad.",
    6: "Naciste para cuidar. Tienes dones de responsabilidad y amor.",
    7: "Naciste para descubrir. Tienes dones de análisis y espiritualidad.",
    8: "Naciste para triunfar. Tienes dones de ambición y poder.",
    9: "Naciste para servir. Tienes dones de compasión y visión global.",
    11: "Naciste para iluminar. Tienes dones intuitivos especiales.",
    22: "Naciste para manifestar. Tienes dones de construcción maestra.",
    33: "Naciste para sanar. Tienes dones de amor universal."
  };
  
  return meanings[num] || meanings[reduceToSingleDigit(num)] || "Nacimiento con propósito místico.";
}

// Calculate complete numerology profile
export function calculateNumerology(
  day: number, 
  month: number, 
  year: number, 
  fullName: string
): NumerologyResult {
  const lifePath = calculateLifePath(day, month, year);
  const soulUrge = calculateSoulUrge(fullName);
  const expression = calculateExpression(fullName);
  const personality = calculatePersonality(fullName);
  const birthday = calculateBirthday(day);
  const maturity = calculateMaturity(lifePath, expression);
  
  return {
    lifePath,
    soulUrge,
    expression,
    personality,
    birthday,
    maturity,
    lifePathMeaning: getLifePathMeaning(lifePath),
    soulUrgeMeaning: getSoulUrgeMeaning(soulUrge),
    expressionMeaning: getExpressionMeaning(expression),
    personalityMeaning: getPersonalityMeaning(personality),
    birthdayMeaning: getBirthdayMeaning(birthday)
  };
}

// Calculate compatibility between two people
export function calculateCompatibility(
  day1: number, month1: number, year1: number,
  day2: number, month2: number, year2: number
): CompatibilityResult {
  const lifePath1 = calculateLifePath(day1, month1, year1);
  const lifePath2 = calculateLifePath(day2, month2, year2);
  
  // Compatibility matrix
  const compatibilityMatrix: { [key: number]: { [key: number]: number } } = {
    1: { 1: 70, 2: 85, 3: 80, 4: 60, 5: 90, 6: 75, 7: 70, 8: 85, 9: 65 },
    2: { 1: 85, 2: 80, 3: 75, 4: 90, 5: 70, 6: 95, 7: 85, 8: 60, 9: 80 },
    3: { 1: 80, 2: 75, 3: 85, 4: 65, 5: 95, 6: 80, 7: 60, 8: 75, 9: 90 },
    4: { 1: 60, 2: 90, 3: 65, 4: 75, 5: 70, 6: 85, 7: 95, 8: 80, 9: 55 },
    5: { 1: 90, 2: 70, 3: 95, 4: 70, 5: 80, 6: 65, 7: 75, 8: 90, 9: 85 },
    6: { 1: 75, 2: 95, 3: 80, 4: 85, 5: 65, 6: 90, 7: 80, 8: 70, 9: 95 },
    7: { 1: 70, 2: 85, 3: 60, 4: 95, 5: 75, 6: 80, 7: 85, 8: 65, 9: 90 },
    8: { 1: 85, 2: 60, 3: 75, 4: 80, 5: 90, 6: 70, 7: 65, 8: 85, 9: 80 },
    9: { 1: 65, 2: 80, 3: 90, 4: 55, 5: 85, 6: 95, 7: 90, 8: 80, 9: 85 }
  };
  
  const compatibility = compatibilityMatrix[lifePath1]?.[lifePath2] || 75;
  
  // Generate description based on compatibility
  let description = "";
  const strengths: string[] = [];
  const challenges: string[] = [];
  
  if (compatibility >= 90) {
    description = "¡Una conexión cósmica! Estos números se complementan perfectamente, creando una relación armoniosa y llena de entendimiento mutuo.";
    strengths.push("Comprensión profunda", "Química natural", "Apoyo mutuo incondicional");
  } else if (compatibility >= 80) {
    description = "Una combinación muy favorable. Hay una fuerte atracción y comprensión entre ustedes, con buena comunicación y objetivos compartidos.";
    strengths.push("Buena comunicación", "Valores similares", "Crecimiento juntos");
    challenges.push("Pequeñas diferencias de temperamento");
  } else if (compatibility >= 70) {
    description = "Una relación compatible con trabajo. Tienen potencial pero necesitan esfuerzo mutuo para mantener el equilibrio.";
    strengths.push("Aprendizaje mutuo", "Balance de energías");
    challenges.push("Diferentes enfoques de vida", "Necesidad de compromiso");
  } else {
    description = "Una conexión desafiante pero transformadora. Si deciden estar juntos, la relación les enseñará lecciones importantes.";
    strengths.push("Crecimiento personal", "Aprendizaje profundo");
    challenges.push("Diferencias fundamentales", "Necesidad de paciencia", "Comunicación requerida");
  }
  
  // Add specific insights based on numbers
  if (lifePath1 === lifePath2) {
    strengths.push("Entendimiento innato del otro");
    challenges.push("Riesgo de competencia");
  }
  
  return {
    compatibility,
    lifePath1,
    lifePath2,
    description,
    strengths,
    challenges
  };
}

// Get number symbol and element
export function getNumberSymbol(num: number): { symbol: string; element: string; planet: string } {
  const symbols: { [key: number]: { symbol: string; element: string; planet: string } } = {
    1: { symbol: "☉", element: "Fuego", planet: "Sol" },
    2: { symbol: "☽", element: "Agua", planet: "Luna" },
    3: { symbol: "☿", element: "Aire", planet: "Mercurio" },
    4: { symbol: "♃", element: "Tierra", planet: "Júpiter" },
    5: { symbol: "♀", element: "Aire", planet: "Venus" },
    6: { symbol: "♄", element: "Tierra", planet: "Saturno" },
    7: { symbol: "♅", element: "Agua", planet: "Urano" },
    8: { symbol: "♆", element: "Fuego", planet: "Neptuno" },
    9: { symbol: "♇", element: "Fuego", planet: "Plutón" },
    11: { symbol: "✦", element: "Luz", planet: "Luna Nueva" },
    22: { symbol: "✧", element: "Éter", planet: "Tierra Divina" },
    33: { symbol: "✶", element: "Amor", planet: "Corazón Cósmico" }
  };
  
  return symbols[num] || symbols[reduceToSingleDigit(num)] || { symbol: "✦", element: "Misterio", planet: "Cósmico" };
}
