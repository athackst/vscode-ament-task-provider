declare namespace Chai {
    interface Assertion {
        readonly haveAnEntry: Assertion;

        matchFirstRegexpOf(pattern: ProblemPatternP[]): Assertion;
        readonly nextEntryAndPatternMatch: Assertion;

        matchRegexp(pattern: ProblemPatternP | string): Assertion;
        readonly anyNextEntry: Assertion;

        readonly patternsExhausted: Assertion;
    }
}

interface ProblemPatternP {
    regexp: string;
}
