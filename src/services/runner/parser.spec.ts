import { parse } from "./parser";

describe("parse", () => {
  it("should accept empty program", () => {
    const code = `
        Programm
        *Programm
        `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
  it("should accept empty function", () => {
    const code = `
        Anweisung Test
        *Anweisung
        `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("branchless program", () => {
    const code = `
            Programm
              Schritt
              LinksDrehen
              RechtsDrehen
              Hinlegen
              Aufheben
              MarkeSetzen
              MarkeLöschen
            *Programm
            `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("ignores comments", () => {
    const code = `
      { Comment }
      Programm
        { Comment }
      *Programm
      { Comment }`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("if conditions", () => {
    const code = `
      Programm
        Wenn IstWand Dann
          Schritt
        *Wenn  
        Wenn IstZiegel Dann
          Schritt
        *Wenn
        Wenn IstMarke Dann
          Schritt
        *Wenn
        Wenn IstNorden Dann
          Schritt
        *Wenn
      *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("negative condition", () => {
    const code = `
      Programm
        Wenn nicht IstWand Dann
          Schritt
        *Wenn
      *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("if else", () => {
    const code = `
      Programm
        Wenn IstWand Dann
          LinksDrehen
        Sonst
          RechtsDrehen
        *Wenn
      *Programm
      `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("nested if", () => {
    const code = `
      Programm
        Wenn IstWand Dann
          LinksDrehen
          Wenn IstZiegel Dann
            Aufheben
          *Wenn
        Sonst
          RechtsDrehen
        *Wenn
      *Programm
      `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("repeat times", () => {
    const code = `
    Programm
      Wiederhole 5 mal
        Schritt
      *Wiederhole
    *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("repeat while", () => {
    const code = `
    Programm
      Wiederhole solange IstZiegel
        Aufheben
      *Wiederhole
    *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });
});
