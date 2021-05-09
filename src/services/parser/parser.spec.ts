import { parse } from "./parser";

describe("program", () => {
  it("should accept empty", () => {
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

  it("should accept basic body", () => {
    const code = `
        Programm
          Schritt
          Schritt
        *Programm`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
});

describe("function", () => {
  it("should accept empty", () => {
    const code = `
        Anweisung Test
        *Anweisung`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("should accept basic body", () => {
    const code = `
        Anweisung Test
          Schritt
        *Anweisung`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
});

it("accept all call commands", () => {
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

describe("comments", () => {
  it("ignores multiline", () => {
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

  it("ignores single line", () => {
    const code = `
        // Comment
        //
        Programm
        // Comment
        *Programm
        // Comment`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
});

describe("if", () => {
  it("all conditions", () => {
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
        Wenn nicht IstWand Dann
          Schritt
        *Wenn`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("else", () => {
    const code = `
        Wenn IstWand Dann
          LinksDrehen
        Sonst
          RechtsDrehen
        *Wenn`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("nested", () => {
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
    expect(ast).toMatchSnapshot();
  });
});

describe("repeat", () => {
  it("times", () => {
    const code = `
        Wiederhole 5 mal
          Schritt
        *Wiederhole
        
        wiederhole 5 mal
          Schritt
        endewiederhole`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("always", () => {
    const code = `
      wiederhole immer
        Schritt
      *wiederhole`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("while", () => {
    const code = `
        Wiederhole solange IstZiegel
          Aufheben
        *Wiederhole
        
        solange IstZiegel
          Aufheben
        *solange
        
        Wiederhole solange IstZiegel
          Aufheben
        EndeWiederhole`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
});

describe("system calls", () => {
  it("slow", () => {
    const code = `
        langsam
        Schritt
        Schritt`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });

  it("fast", () => {
    const code = `
        schnell
        Schritt
        Schritt`;
    const ast = parse(code);
    expect(ast).toMatchSnapshot();
  });
});
