import { parse } from "./parser";
import {
  ASTIfStatement,
  ASTNotTest,
  ASTRepeatStatement,
  ASTTestState,
} from "./types";

describe("program", () => {
  it("should accept empty", () => {
    const code = "Programm *Programm";
    const ast = parse(code);
    expect(ast.program.body).toHaveLength(0);
  });

  it("should accept programs without wrapping `program`", () => {
    const code = "Schritt Schritt";
    const ast = parse(code);
    expect(ast.program.body).toHaveLength(2);
  });

  it("should accept basic body", () => {
    const code = "Programm Schritt Schritt *Programm";
    const ast = parse(code);
    expect(ast.program.body).toHaveLength(2);
  });
});

describe("function", () => {
  it("should accept empty", () => {
    const code = "Anweisung Test *Anweisung";
    const ast = parse(code);
    expect(ast.functions).toHaveLength(1);
    expect(ast.functions[0].body).toHaveLength(0);
  });

  it("should accept basic body", () => {
    const code = "Anweisung Test Schritt *Anweisung";
    const ast = parse(code);
    expect(ast.functions).toHaveLength(1);
    expect(ast.functions[0].body).toHaveLength(1);
  });
});

it("accept all call commands", () => {
  const code = `
      Schritt
      Schritt(2)
      LinksDrehen
      RechtsDrehen
      Hinlegen
      Hinlegen(2)
      Aufheben
      Aufheben(2)
      MarkeSetzen
      MarkeLöschen
      Ton
      Warten
      Warten(200)`;
  const ast = parse(code);
  ast.program.body.forEach((stmt) => {
    expect(stmt.type).toBe("call");
  });
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
    expect(ast.program.body).toHaveLength(0);
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
    expect(ast.program.body).toHaveLength(0);
  });
});

describe("if", () => {
  it("all conditions", () => {
    const code = `
      Wenn IstWand Dann
        Schritt
      *Wenn
      Wenn NichtIstWand Dann
        Schritt
      *Wenn
      Wenn IstZiegel Dann
        Schritt
      *Wenn
      Wenn NichtIstZiegel Dann
        Schritt
      *Wenn
      Wenn IstMarke Dann
        Schritt
      *Wenn
      Wenn IstNorden Dann
        Schritt
      *Wenn
      Wenn IstSüden Dann
        Schritt
      *Wenn
      Wenn IstOsten Dann
        Schritt
      *Wenn
      Wenn IstWesten Dann
        Schritt
      *Wenn
      Wenn IstNorden Dann
        Schritt
      *Wenn
      Wenn IstLeer Dann
        Schritt
      *Wenn
      Wenn NichtIstLeer Dann
        Schritt
      *Wenn
      Wenn IstVoll Dann
        Schritt
      *Wenn
      Wenn NichtIstVoll Dann
        Schritt
      *Wenn
      Wenn hatZiegel Dann
        Schritt
      *Wenn`;
    const ast = parse(code);
    ast.program.body.forEach((stmt) => {
      expect(stmt.type).toBe("if");
    });
  });

  it("conditions with params", () => {
    const code = `
      Wenn IstZiegel(2) Dann
        Schritt
      *Wenn
      Wenn NichtIstZiegel(2) Dann
        Schritt
      *Wenn`;
    const ast = parse(code);
    ast.program.body.forEach((stmt) => {
      expect(stmt.type).toBe("if");
    });
  });

  it("empty body", () => {
    const code = "Wenn IstWand Dann *Wenn";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("if");
    const stmt = ast.program.body[0] as ASTIfStatement;
    expect(stmt.body).toHaveLength(0);
  });

  it("empty else body", () => {
    const code = "Wenn IstWand Dann Schritt Sonst *Wenn";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("if");
    const stmt = ast.program.body[0] as ASTIfStatement;
    expect(stmt.elseBody).toHaveLength(0);
  });

  it("negative condition", () => {
    const code = "Wenn nicht IstWand Dann Schritt *Wenn";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("if");
    const stmt = ast.program.body[0] as ASTIfStatement;
    expect(stmt.test.type).toBe("not");
    const subTest = (stmt.test as ASTNotTest).test;
    expect(subTest.type).toBe("state");
    expect((subTest as ASTTestState).state).toBe("IS_WALL");
  });

  it("else", () => {
    const code = "Wenn IstWand Dann LinksDrehen Sonst RechtsDrehen *Wenn";
    const ast = parse(code);
    const stmt = ast.program.body[0] as ASTIfStatement;
    expect(stmt.body).toHaveLength(1);
    expect(stmt.elseBody).toHaveLength(1);
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
    expect(ast.program.body[0].type).toBe("if");
    const stmt = ast.program.body[0] as ASTIfStatement;
    expect(stmt.body[1].type).toBe("if");
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
    expect(ast.program.body[0].type).toBe("repeat");
    expect(ast.program.body[1].type).toBe("repeat");
  });

  it("always", () => {
    const code = "wiederhole immer Schritt *wiederhole";
    const ast = parse(code);
    const stmt = ast.program.body[0] as ASTRepeatStatement;
    expect(stmt.type).toBe("repeat");
    expect(stmt.times).toBe(Infinity);
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
    expect(ast.program.body[0].type).toBe("while");
    expect(ast.program.body[1].type).toBe("while");
    expect(ast.program.body[2].type).toBe("while");
  });
});

describe("system calls", () => {
  it("slow", () => {
    const code = "langsam Schritt Schritt";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("systemCall");
    expect(ast.program.body[1].type).toBe("call");
    expect(ast.program.body[2].type).toBe("call");
  });

  it("fast", () => {
    const code = "schnell Schritt Schritt";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("systemCall");
    expect(ast.program.body[1].type).toBe("call");
    expect(ast.program.body[2].type).toBe("call");
  });

  it("exit", () => {
    const code = "beenden Schritt Schritt";
    const ast = parse(code);
    expect(ast.program.body[0].type).toBe("systemCall");
    expect(ast.program.body[1].type).toBe("call");
    expect(ast.program.body[2].type).toBe("call");
  });
});
