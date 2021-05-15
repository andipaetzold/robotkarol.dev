import axios from "axios";
import { Settings } from "./store/types";

interface Example {
  name: string;
  code?: string;
  world?: string;
  settings?: Settings;
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
    settings: {
      storage: {
        start: 0,
        size: 100,
      },
    },
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

  {
    name: "ABC",
    code: "abc.kdp",
    world: "abc.kdw",
  },
  {
    name: "Alphabet",
    code: "alphabet.kdp",
    world: "alphabet.kdw",
  },
  {
    name: "Addition 1",
    code: "addition.kdp",
    world: "addition1.kdw",
  },
  {
    name: "Addition 2",
    code: "addition.kdp",
    world: "addition2.kdw",
  },
  {
    name: "Addition 3",
    code: "addition.kdp",
    world: "addition3.kdw",
  },
  {
    name: "Aufraeumen",
    code: "aufraeumen.kdp",
    world: "aufraeumen.kdw",
  },
  {
    name: "Auslegen",
    code: "auslegen.kdp",
    world: "auslegen.kdw",
  },
  {
    name: "Burg Tor",
    code: "burg_tor.kdp",
    world: "burg_tor.kdw",
  },
  {
    name: "Burg",
    code: "burg.kdp",
    world: "burg.kdw",
  },
  {
    name: "Burg 2",
    code: "burgn.kdp",
    world: "burgn.kdw",
  },
  {
    name: "Chichen Itza",
    code: "chichenitza.kdp",
    world: "chichenitza.kdw",
  },
  {
    name: "Dualesumme",
    code: "dualesumme.kdp",
    world: "dualesumme.kdw",
  },
  {
    name: "Einmauern",
    code: "einmauern.kdp",
  },
  {
    name: "Festung",
    code: "festung.kdp",
    world: "festung.kdw",
  },
  {
    name: "Ganzzahl Addieren",
    code: "ganzzahladdieren.kdp",
    world: "ganzzahladdieren.kdw",
  },
  {
    name: "Gehe Heim",
    code: "geheheim.kdp",
  },
  {
    name: "Hohle Gasse",
    code: "hohle_gasse.kdp",
    world: "hohle_gasse.kdw",
  },

  {
    name: "Labyrinth 1",
    code: "linkehandregel.kdp",
    world: "labyrinth1.kdw",
  },
  {
    name: "Labyrinth 2",
    code: "linkehandregel.kdp",
    world: "labyrinth2.kdw",
  },
  {
    name: "Labyrinth 3",
    code: "linkehandregel.kdp",
    world: "labyrinth3.kdw",
  },
  {
    name: "Labyrinth 4",
    code: "linkehandregel.kdp",
    world: "labyrinth4.kdw",
  },
  {
    name: "Labyrinth 5",
    code: "linkehandregel.kdp",
    world: "labyrinth5.kdw",
  },
  {
    name: "Labyrinth 6",
    code: "linkehandregel.kdp",
    world: "labyrinth6.kdw",
  },
  {
    name: "Labyrinth 7",
    code: "linkehandregel.kdp",
    world: "labyrinth7.kdw",
  },

  {
    name: "Labyrinth 1 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth1.kdw",
  },
  {
    name: "Labyrinth 2 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth2.kdw",
  },
  {
    name: "Labyrinth 3 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth3.kdw",
  },
  {
    name: "Labyrinth 4 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth4.kdw",
  },
  {
    name: "Labyrinth 5 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth5.kdw",
  },
  {
    name: "Labyrinth 6 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth6.kdw",
  },
  {
    name: "Labyrinth 7 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth7.kdw",
  },

  {
    name: "Labyrinthforscher",
    code: "labyrinthforscher.kdp",
    world: "labyrinthforscher.kdw",
  },
  {
    name: "Pyramide",
    code: "pyramide.kdp",
    world: "pyramide.kdw",
  },
  {
    name: "Schachbrett 2",
    code: "schachbrett.kdp",
    world: "schachbrett.kdw",
  },
  {
    name: "Slalom",
    code: "slalom.kdp",
    world: "slalom.kdw",
  },
  {
    name: "Steine pflastern",
    code: "steinepflastern.kdp",
    world: "steinepflastern.kdw",
  },
  {
    name: "Turmwärter",
    code: "turmwaerter.kdp",
    world: "turmwaerter.kdw",
  },
  {
    name: "Ziegelfinder",
    code: "ziegel_finder.kdp",
    world: "ziegel_finder.kdw",
  },
  {
    name: "Wächter 1",
    code: "Waechter1.kdp",
    world: "Waechter1.kdw",
  },
  {
    name: "Wächter 2",
    code: "Waechter2.kdp",
    world: "Waechter2.kdw",
  },
  {
    name: "Wächter 3",
    code: "Waechter3.kdp",
    world: "Waechter3.kdw",
  },
  {
    name: "Wächter 4",
    code: "Waechter4.kdp",
    world: "Waechter4.kdw",
  },
  {
    name: "Wächter 5",
    code: "Waechter5.kdp",
    world: "Waechter5.kdw",
  },
  {
    name: "Wächter 6",
    code: "Waechter6.kdp",
    world: "Waechter6.kdw",
  },
].sort((a, b) =>
  a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
);

export async function getExample(
  name: string
): Promise<{ code: string; world: string; example: Example }> {
  const example = EXAMPLES.find((e) => e.name === name)!;

  const [code, world] = await Promise.all([
    axios.get(`examples/${example.code}`, { responseType: "text" }),
    axios.get(`examples/${example.world}`, { responseType: "text" }),
  ]);
  return {
    code: code.data,
    world: world.data,
    example,
  };
}
