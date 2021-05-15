import axios from "axios";
import { Settings } from "./store/types";

interface Example {
  name: string;
  code?: string;
  world?: string;
  settings?: Settings;
  author: string;
}

export const EXAMPLES: Example[] = [
  {
    name: "01 Programm",
    code: "01Programm.kdp",
    world: "01Programm.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "02 Karol",
    code: "02Karol.kdp",
    world: "02Karol.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "03 Vergleichen",
    code: "03Vergleichen.kdp",
    world: "03Vergleichen.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "04 Neue Bedingung",
    code: "04NeueBedingung.kdp",
    world: "04NeueBedingung.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "04 Neue Bedingung (Param)",
    code: "04NeueBedingung_Param.kdp",
    world: "04NeueBedingung_Param.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "05 Schwimmbad",
    code: "05Schwimmbad.kdp",
    world: "05Schwimmbad.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "06 SBad mit Prozeduren",
    code: "06SBadmitProzeduren.kdp",
    world: "06SBadmitProzeduren.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "07 SBad mit Schell Langsam",
    code: "07SBadmitSchnellLangsam.kdp",
    world: "07SBadmitSchnellLangsam.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "08 Rekursion",
    code: "08Rekursion.kdp",
    world: "08Rekursion.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "09 Schachbrett",
    code: "09Schachbrett.kdp",
    world: "09Schachbrett.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "10 Parameter",
    code: "10Parameter.kdp",
    world: "10Parameter.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "11 Summe",
    code: "11Summe.kdp",
    world: "11Summe.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "12 Labyrinth",
    code: "12Labyrint.kdp",
    world: "12Labyrint.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Bibliothek",
    code: "Bibliothek.kdp",
    author: "Ulli Freiberger",
  },
  {
    name: "Invertieren Gesamt",
    code: "InvertierenGesamt.kdp",
    world: "InvertierenGesamt.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Invertieren",
    code: "Invertieren.kdp",
    world: "Invertieren.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Kurze Diagonale",
    code: "KurzeDiagonale.kdp",
    world: "KurzeDiagonale.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Labyrinth einfach",
    code: "Labyrint_einfach.kdp",
    world: "Labyrint_einfach.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Laufen",
    code: "Laufen.kdp",
    world: "Laufen.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "LaufenTest",
    world: "LeereWelt.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Links Invertieren",
    code: "LinksInvertieren.kdp",
    world: "LinksInvertieren.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Pascal",
    code: "Pascal.kdp",
    world: "Pascal.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Schachbrett",
    code: "Schachbrett.kdp",
    world: "Schachbrett.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Sortieren",
    code: "Sortieren.kdp",
    world: "Sortieren.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Spirale",
    code: "Spirale.kdp",
    world: "Spirale.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Stapeln",
    code: "Stapeln.kdp",
    world: "Stapeln.kdw",
    author: "Ulli Freiberger",
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
    author: "Ulli Freiberger",
  },
  {
    name: "Treppe Bauen 2",
    code: "TreppeBauen2.kdp",
    world: "TreppeBauen2.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Treppe Bauen 3",
    code: "TreppeBauen3.kdp",
    world: "TreppeBauen3.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Treppe",
    code: "Treppe.kdp",
    world: "Treppe.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Umsetzen",
    code: "Umsetzen.kdp",
    world: "Umsetzen.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Viereck",
    code: "Viereck.kdp",
    world: "Viereck.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Wand Entlang",
    code: "WandEntlang.kdp",
    world: "WandEntlang.kdw",
    author: "Ulli Freiberger",
  },
  {
    name: "Zimmer",
    code: "Zimmer.kdp",
    world: "Zimmer.kdw",
    author: "Ulli Freiberger",
  },

  {
    name: "ABC",
    code: "abc.kdp",
    world: "abc.kdw",
    author: "Florian Krauß",
  },
  {
    name: "Alphabet",
    code: "alphabet.kdp",
    world: "alphabet.kdw",
    author: "Peter Szilassy",
  },
  {
    name: "Addition 1",
    code: "addition.kdp",
    world: "addition1.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Addition 2",
    code: "addition.kdp",
    world: "addition2.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Addition 3",
    code: "addition.kdp",
    world: "addition3.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Aufräumen",
    code: "aufraeumen.kdp",
    world: "aufraeumen.kdw",
    author: "Walter Settele",
  },
  {
    name: "Auslegen",
    code: "auslegen.kdp",
    world: "auslegen.kdw",
    author: "Thomas Häusler",
  },
  {
    name: "Burg Tor",
    code: "burg_tor.kdp",
    world: "burg_tor.kdw",
    author: "Rudolf Brunner",
  },
  {
    name: "Burg",
    code: "burg.kdp",
    world: "burg.kdw",
    author: "Rudolf Brunner",
  },
  {
    name: "Burg 2",
    code: "burgn.kdp",
    world: "burgn.kdw",
    author: "Norbert Handick",
  },
  {
    name: "Chichen Itza",
    code: "chichenitza.kdp",
    world: "chichenitza.kdw",
    author: "Wolfgang Hofmeier",
  },
  {
    name: "Dualesumme",
    code: "dualesumme.kdp",
    world: "dualesumme.kdw",
    author: "Rüdiger Landskron",
  },
  {
    name: "Einmauern",
    code: "einmauern.kdp",
    author: "Walter Settele",
  },
  {
    name: "Festung",
    code: "festung.kdp",
    world: "festung.kdw",
    author: "Arthur Kosmala",
  },
  {
    name: "Ganzzahl Addieren",
    code: "ganzzahladdieren.kdp",
    world: "ganzzahladdieren.kdw",
    author: "Tom Broscheit",
  },
  {
    name: "Gehe Heim",
    code: "geheheim.kdp",
    author: "Walter Settele",
  },
  {
    name: "Hohle Gasse",
    code: "hohle_gasse.kdp",
    world: "hohle_gasse.kdw",
    author: "Rudolf Brunner",
  },

  {
    name: "Labyrinth 1",
    code: "linkehandregel.kdp",
    world: "labyrinth1.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 2",
    code: "linkehandregel.kdp",
    world: "labyrinth2.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 3",
    code: "linkehandregel.kdp",
    world: "labyrinth3.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 4",
    code: "linkehandregel.kdp",
    world: "labyrinth4.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 5",
    code: "linkehandregel.kdp",
    world: "labyrinth5.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 6",
    code: "linkehandregel.kdp",
    world: "labyrinth6.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 7",
    code: "linkehandregel.kdp",
    world: "labyrinth7.kdw",
    author: "Thomas Vogg",
  },

  {
    name: "Labyrinth 1 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth1.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 2 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth2.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 3 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth3.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 4 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth4.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 5 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth5.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 6 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth6.kdw",
    author: "Thomas Vogg",
  },
  {
    name: "Labyrinth 7 (mit Spur)",
    code: "linkehandregel_mitspur.kdp",
    world: "labyrinth7.kdw",
    author: "Thomas Vogg",
  },

  {
    name: "Labyrinthforscher",
    code: "labyrinthforscher.kdp",
    world: "labyrinthforscher.kdw",
    author: "Niko Berkmann",
  },
  {
    name: "Pyramide",
    code: "pyramide.kdp",
    world: "pyramide.kdw",
    author: "Norbert Handick",
  },
  {
    name: "Schachbrett 2",
    code: "schachbrett2.kdp",
    world: "schachbrett2.kdw",
    author: "David Thiesbrummel",
  },
  {
    name: "Slalom",
    code: "slalom.kdp",
    world: "slalom.kdw",
    author: "Walter Settele",
  },
  {
    name: "Steine pflastern",
    code: "steinepflastern.kdp",
    world: "steinepflastern.kdw",
    author: "Matthias St. Pierre",
  },
  {
    name: "Turmwärter",
    code: "turmwaerter.kdp",
    world: "turmwaerter.kdw",
    author: "Philipp Uhlig",
  },
  {
    name: "Ziegelfinder",
    code: "ziegel_finder.kdp",
    world: "ziegel_finder.kdw",
    author: "Stefan Mesch",
  },
  {
    name: "Wächter 1",
    code: "Waechter1.kdp",
    world: "Waechter1.kdw",
    author: "Thomas Wetzel",
  },
  {
    name: "Wächter 2",
    code: "Waechter2.kdp",
    world: "Waechter2.kdw",
    author: "Thomas Wetzel",
  },
  {
    name: "Wächter 3",
    code: "Waechter3.kdp",
    world: "Waechter3.kdw",
    author: "Thomas Wetzel",
  },
  {
    name: "Wächter 4",
    code: "Waechter4.kdp",
    world: "Waechter4.kdw",
    author: "Thomas Wetzel",
  },
  {
    name: "Wächter 5",
    code: "Waechter5.kdp",
    world: "Waechter5.kdw",
    author: "Thomas Wetzel",
  },
  {
    name: "Wächter 6",
    code: "Waechter6.kdp",
    world: "Waechter6.kdw",
    author: "Thomas Wetzel",
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
