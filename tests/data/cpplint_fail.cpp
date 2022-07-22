// Bad - IF statement with ELSE is missing braces
if (x) DoThis();
else DoThat();

// Bad - IF statement with ELSE does not have braces everywhere
if (condition)
  foo;
else {
  bar;
}

// Bad - IF statement is too long to omit braces
if (condition)
  // Comment
  DoSomething();

// Bad - IF statement is too long to omit braces
if (condition1 &&
    condition2)
  DoSomething();
