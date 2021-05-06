export type ParseErrorData = {
  expected?: string[];
  line?: number;
  loc?: {
    first_column: number;
    first_row: number;
    last_column: number;
    last_line: number;
  };
  text?: string;
  token?: number | string | null;
};

export class ParseError extends Error {
  constructor(message: string, public readonly data: ParseErrorData = {}) {
    super(message);
  }
}
