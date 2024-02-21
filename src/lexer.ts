import token from "./token.ts";

class lexer {
  private source: Array<string>;
  private tokens: Array<token>;
  private cursor: string | null;
  private ccount: number;
  private buffer: string;
  private string: string;
  private quotes: boolean;

  constructor(src: string) {
    this.source = src.split("");
    this.tokens = new Array<token>();
    this.cursor = null;
    this.ccount = -1;
    this.buffer = "";
    this.string = "";
    this.quotes = false;
    this.next();
  }

  private next(): string {
    this.ccount++;
    const cursor = this.cursor_as_string();
    this.cursor = this.source.length > this.ccount ? this.source[this.ccount] : null;
    return cursor;
  }

  private cursor_as_string(): string {
    return this.cursor as string;
  }

  private is_number(str: string): boolean {
    return /^\d+$/.test(str);
  }

  private is_whitespace(str: string): boolean {
    return /\ |\n|\t/.test(str);
  }

  private is_operator(str: string): boolean {
    return /^\+$|^\-$|^\*$|^\/$/.test(str);
  }

  private is_complex(str: string): boolean {
    return /^\!$|^\=$|^\<$|^\>$|^\:$/.test(str);
  }

  private is_special(str: string): boolean {
    return /^\($|^\)$|^\{$|^\}$|^\[$|^\]$|^\,$|^\;$/.test(str);
  }

  private is_nil(str: string): boolean {
    return /^nil$/.test(str);
  }

  private is_boo(str: string): boolean {
    return /^true$|^false$/.test(str);
  }

  private is_keyword(str: string): boolean {
    return /^fn$|^let$|^return$|^use$/.test(str);
  }

  private flush_buffer(): void {
    if (this.buffer.length > 0) {
      if (this.is_number(this.buffer)) this.tokens.push({ t: "num", v: this.buffer });
      else if (this.is_keyword(this.buffer)) this.tokens.push({ t: "key", v: this.buffer });
      else if (this.is_boo(this.buffer)) this.tokens.push({ t: "boo", v: this.buffer });
      else if (this.is_nil(this.buffer)) this.tokens.push({ t: "nil", v: this.buffer });
      else this.tokens.push({ t: "ide", v: this.buffer });
    }
    this.buffer = "";
  }

  private flush_string(): void {
    if (this.string.length > 0) {
      this.tokens.push({ t: "str", v: this.string });
    }
    this.string = "";
  }

  private make_comparator(): void {
    switch (this.cursor_as_string()) {
      case "=":
        this.flush_buffer();
        this.next();
        if (this.cursor_as_string() === "=") {
          this.tokens.push({ t: "cmp", v: "==" });
          this.next();
        } else if (this.cursor_as_string() === ">") {
          this.tokens.push({ t: "spe", v: "=>" });
          this.next();
        } else {
          this.tokens.push({ t: "spe", v: "=" });
        }
        break;
      case "!":
        this.flush_buffer();
        this.next();
        if (this.cursor_as_string() === "=") {
          this.tokens.push({ t: "cmp", v: "!=" });
          this.next();
        } else {
          this.tokens.push({ t: "spe", v: "!" });
        }
        break;
      case "<":
        this.flush_buffer();
        this.next();
        if (this.cursor_as_string() === "=") {
          this.tokens.push({ t: "cmp", v: "<=" });
          this.next();
        } else {
          this.tokens.push({ t: "cmp", v: "<" });
        }
        break;
      case ">":
        this.flush_buffer();
        this.next();
        if (this.cursor_as_string() === "=") {
          this.tokens.push({ t: "cmp", v: ">=" });
          this.next();
        } else {
          this.tokens.push({ t: "cmp", v: ">" });
        }
        break;
      case ":":
        this.flush_buffer();
        this.next();
        if (this.cursor_as_string() === ":") {
          this.tokens.push({ t: "spe", v: "::" });
          this.next();
        } else {
          this.tokens.push({ t: "spe", v: ":" });
        }
        break;
    }
  }

  public run(): Array<token> {
    while (this.cursor !== null) {
      if (this.cursor === '"' && !this.quotes) {
        this.flush_buffer();
        this.quotes = true;
        this.next();
      } else if (this.cursor === '"' && this.quotes) {
        this.flush_string();
        this.quotes = false;
        this.next();
      } else if (this.cursor !== '"' && !this.quotes) {
        if (this.is_whitespace(this.cursor)) {
          this.flush_buffer();
          this.next();
        } else if (this.is_operator(this.cursor)) {
          this.flush_buffer();
          this.tokens.push({ t: "ope", v: this.next() });
        } else if (this.is_complex(this.cursor)) {
          this.flush_buffer();
          this.make_comparator();
        } else if (this.is_special(this.cursor)) {
          this.flush_buffer();
          this.tokens.push({ t: "spe", v: this.next() });
        } else {
          this.buffer += this.next();
        }
      } else if (this.cursor !== '"' && this.quotes) {
        this.string += this.next();
      } else {
        throw new Error("Unreachable: lexer.run()");
      }
    }
    this.flush_string();
    this.flush_buffer();
    return this.tokens;
  }
}

export default lexer;
