declare module "jison" {
  export class Parser {
    constructor(grammar: any);
    parse(input: string): any;
  }
}
