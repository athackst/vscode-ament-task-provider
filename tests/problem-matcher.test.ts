// Tests if the problem matcher regex in package.json works correctly
import { expect } from 'chai';
import { getOutputLines } from './fixtures';
import { findProblemMatcher } from './helpers/general';

describe('ament_cpplint problemMatcher', () => {
    const matcherName = 'ament_cpplint';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_cpplint output with a failure', () => {
        const lines = () => getOutputLines('cpplint_fail.cpp');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_cpplint output with no failures', () => {
        const lines = () => getOutputLines('cpplint_ok.cpp');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_cppcheck problemMatcher', () => {
    const matcherName = 'ament_cppcheck';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_cppcheck output with a failure', () => {
        const lines = () => getOutputLines('cppcheck_fail.cpp');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_cppcheck output with no failures', () => {
        const lines = () => getOutputLines('cppcheck_ok.cpp');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_lint_cmake problemMatcher', () => {
    const matcherName = 'ament_lint_cmake';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_lint_cmake output with a failure', () => {
        const lines = () => getOutputLines('cmakelint_fail.cmake');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_lint_cmake output with no failures', () => {
        const lines = () => getOutputLines('cmakelint_ok.cmake');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_flake8 problemMatcher', () => {
    const matcherName = 'ament_flake8';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_flake8 output with a failure', () => {
        const lines = () => getOutputLines('flake8_fail.py');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_flake8 output with no failures', () => {
        const lines = () => getOutputLines('flake8_ok.py');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_mypy problemMatcher', () => {
    const matcherName = 'ament_mypy';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_mypy output with a failure', () => {
        const lines = () => getOutputLines('mypy_fail.py');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_mypy output with no failures', () => {
        const lines = () => getOutputLines('mypy_ok.py');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_pep257 problemMatcher', () => {
    const matcherName = 'ament_pep257';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_pep257 output with a failure', () => {
        const lines = () => getOutputLines('pep257_fail.py');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_pep257 output with no failures', () => {
        const lines = () => getOutputLines('pep257_ok.py');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});

describe('ament_xmllint problemMatcher', () => {
    const matcherName = 'ament_xmllint';
    const matcherDef = () => findProblemMatcher(matcherName);

    it('exists in package.json', () => {
        expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
    });

    describe('given ament_xmllint output with a failure', () => {
        const lines = () => getOutputLines('xmllint_fail.xml');

        it('has a sequence matching problemMatcher.pattern sequence', () => {
            expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });

    describe('given ament_xmllint output with no failures', () => {
        const lines = () => getOutputLines('xmllint_ok.xml');

        it('does not have a sequence matching problemMatcher.pattern', () => {
            expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
        });
    });
});
