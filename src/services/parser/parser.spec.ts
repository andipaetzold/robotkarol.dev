import { parse } from "./parser";

describe("parse", () => {
  it("should accept empty program", () => {
    const code = `
      Programm
      *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("should accept programs without wrapping `program`", () => {
    const code = `
    Schritt
    Schritt`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("should accept empty function", () => {
    const code = `
      Anweisung Test
      *Anweisung`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("branchless program", () => {
    const code = `
      Schritt
      LinksDrehen
      RechtsDrehen
      Hinlegen
      Aufheben
      MarkeSetzen
      MarkeLöschen`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("ignores multiline comments", () => {
    const code = `
      { Comment }
      {}
      Programm
        { Comment }
      *Programm
      { Comment }`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("ignores single line comments", () => {
    const code = `
      // Comment
      //
      Programm
        // Comment
      *Programm
      // Comment
    `;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("if conditions", () => {
    const code = `
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
      *Wenn`;
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
      Wenn IstWand Dann
        LinksDrehen
      Sonst
        RechtsDrehen
      *Wenn`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("nested if", () => {
    const code = `
      Wenn IstWand Dann
        LinksDrehen
        Wenn IstZiegel Dann
          Aufheben
        *Wenn
      Sonst
        RechtsDrehen
      *Wenn`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("repeat times", () => {
    const code = `
      Wiederhole 5 mal
        Schritt
      *Wiederhole
    
      wiederhole 5 mal
        Schritt
      endewiederhole`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });

  it("repeat while", () => {
    const code = `
      Wiederhole solange IstZiegel
        Aufheben
      *Wiederhole
    
      solange IstZiegel
        Aufheben
      *Wiederhole
  
      Wiederhole solange IstZiegel
        Aufheben
      EndeWiederhole`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot(ast);
  });
});
