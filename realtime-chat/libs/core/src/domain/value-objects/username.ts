export class Username {
  private constructor(readonly value: string) {}

  static create(value: string): Username {
    if (!value || value.trim().length === 0) {
      throw new Error('username must not be empty');
    }
    return new Username(value);
  }
}
