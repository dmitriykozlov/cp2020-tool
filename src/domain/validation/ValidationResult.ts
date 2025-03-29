type Severity = "critical" | "warning";

export class ValidationError {
  cause: string;
  severity: Severity;

  constructor(cause: string, severity: Severity) {
    this.cause = cause;
    this.severity = severity;
  }

  static critical(cause: string) {
    return new ValidationError(cause, "critical");
  }

  static warning(cause: string) {
    return new ValidationError(cause, "warning");
  }
}

export type ValidationResult = ValidationError | true;
