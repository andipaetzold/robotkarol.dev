import axios from "axios";

interface Example {
  name: string;
  code?: string;
  world?: string;
}

export const EXAMPLES: Example[] = [
  {
    name: "01 Programm",
    code: "01Programm.kdp",
    world: "01Programm.kdw",
  },
  {
    name: "02 Karol",
    code: "02Karol.kdp",
    world: "02Karol.kdw",
  },
  {
    name: "03 Vergleichen",
    code: "03Vergleichen.kdp",
    world: "03Vergleichen.kdw",
  },
  {
    name: "04 Neue Bedingung",
    code: "04NeueBedingung.kdp",
    world: "04NeueBedingung.kdw",
  },
  {
    name: "04 Neue Bedingung (Param)",
    code: "04NeueBedingung_Param.kdp",
    world: "04NeueBedingung_Param.kdw",
  },
  {
    name: "05 Schwimmbad",
    code: "05Schwimmbad.kdp",
    world: "05Schwimmbad.kdw",
  },
  {
    name: "06 SBad mit Prozeduren",
    code: "06SBadmitProzeduren.kdp",
    world: "06SBadmitProzeduren.kdw",
  },
  {
    name: "07 SBad mit Schell Langsam",
    code: "07SBadmitSchnellLangsam.kdp",
    world: "07SBadmitSchnellLangsam.kdw",
  },
  {
    name: "08 Rekursion",
    code: "08Rekursion.kdp",
    world: "08Rekursion.kdw",
  },
  {
    name: "09 Schachbrett",
    code: "09Schachbrett.kdp",
    world: "09Schachbrett.kdw",
  },
  {
    name: "10 Parameter",
    code: "10Parameter.kdp",
    world: "10Parameter.kdw",
  },
  {
    name: "11 Summe",
    code: "11Summe.kdp",
    world: "11Summe.kdw",
  },
  {
    name: "12 Labyrinth",
    code: "12Labyrint.kdp",
    world: "12Labyrint.kdw",
  },
  {
    name: "Bibliothek",
    code: "Bibliothek.kdp",
  },
  {
    name: "Invertieren Gesamt",
    code: "InvertierenGesamt.kdp",
    world: "InvertierenGesamt.kdw",
  },
  {
    name: "Invertieren",
    code: "Invertieren.kdp",
    world: "Invertieren.kdw",
  },
  {
    name: "Kurze Diagonale",
    code: "KurzeDiagonale.kdp",
    world: "KurzeDiagonale.kdw",
  },
  {
    name: "Labyrinth einfach",
    code: "Labyrint_einfach.kdp",
    world: "Labyrint_einfach.kdw",
  },
  {
    name: "Laufen",
    code: "Laufen.kdp",
    world: "Laufen.kdw",
  },
  {
    name: "LaufenTest",
    code: "LaufenTest.kdw",
    world: "LeereWelt.kdw",
  },
  {
    name: "Links Invertieren",
    code: "LinksInvertieren.kdp",
    world: "LinksInvertieren.kdw",
  },
  {
    name: "Pascal",
    code: "Pascal.kdp",
    world: "Pascal.kdw",
  },
  {
    name: "Schachbrett",
    code: "Schachbrett.kdp",
    world: "Schachbrett.kdw",
  },
  {
    name: "Sortieren",
    code: "Sortieren.kdp",
    world: "Sortieren.kdw",
  },
  {
    name: "Spirale",
    code: "Spirale.kdp",
    world: "Spirale.kdw",
  },
  {
    name: "Stapeln",
    code: "Stapeln.kdp",
    world: "Stapeln.kdw",
  },
  {
    name: "Treppe Bauen",
    code: "TreppeBauen.kdp",
    world: "TreppeBauen.kdw",
  },
  {
    name: "Treppe Bauen 2",
    code: "TreppeBauen2.kdp",
    world: "TreppeBauen2.kdw",
  },
  {
    name: "Treppe Bauen 3",
    code: "TreppeBauen3.kdp",
    world: "TreppeBauen3.kdw",
  },
  {
    name: "Treppe",
    code: "Treppe.kdp",
    world: "Treppe.kdw",
  },
  {
    name: "Umsetzen",
    code: "Umsetzen.kdp",
    world: "Umsetzen.kdw",
  },
  {
    name: "Viereck",
    code: "Viereck.kdp",
    world: "Viereck.kdw",
  },
  {
    name: "Wand Entlang",
    code: "WandEntlang.kdp",
    world: "WandEntlang.kdw",
  },
  {
    name: "Zimmer",
    code: "Zimmer.kdp",
    world: "Zimmer.kdw",
  },
];

export async function getExample(
  name: string
): Promise<{ code: string; world: string }> {
  const example = EXAMPLES.find((e) => e.name === name)!;

  const [code, world] = await Promise.all([
    axios.get(`examples/${example.code}`, { responseType: "text" }),
    axios.get(`examples/${example.world}`, { responseType: "text" }),
  ]);
  return {
    code: code.data,
    world: world.data,
  };
}
