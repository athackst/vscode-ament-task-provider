import { expect } from 'chai';
import { fixtures } from './fixtures';
import { blobToLines, findProblemMatcher } from './helpers/general';

describe('ament_cpplint problemMatcher', () => {
	const matcherName = 'ament_cpplint';
	const matcherDef = () => findProblemMatcher(matcherName);

	it('exists in package.json', () => {
		expect(matcherDef(), `problemMatcher with name ${matcherName}`).to.be.ok;
	});

	describe('given ament_cpplint output with a failure', () => {
		const lines = () => blobToLines(fixtures.cpplintOutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_cpplint output with no failures', () => {
		const lines = () => blobToLines(fixtures.cpplintOutputSuccess);

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
		const lines = () => blobToLines(fixtures.cppcheckOutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_cppcheck output with no failures', () => {
		const lines = () => blobToLines(fixtures.cppcheckOutputSuccess);

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
		const lines = () => blobToLines(fixtures.cmakelintOutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_lint_cmake output with no failures', () => {
		const lines = () => blobToLines(fixtures.cmakelintOutputSuccess);

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
		const lines = () => blobToLines(fixtures.flake8OutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_flake8 output with no failures', () => {
		const lines = () => blobToLines(fixtures.flake8OutputSuccess);

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
		const lines = () => blobToLines(fixtures.pep257OutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_pep257 output with no failures', () => {
		const lines = () => blobToLines(fixtures.pep257OutputSuccess);

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
		const lines = () => blobToLines(fixtures.xmllintOutputFail);

		it('has a sequence matching problemMatcher.pattern sequence', () => {
			expect(lines()).to.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});

	describe('given ament_xmllint output with no failures', () => {
		const lines = () => blobToLines(fixtures.xmllintOutputSuccess);

		it('does not have a sequence matching problemMatcher.pattern', () => {
			expect(lines()).to.not.haveAnEntry.matchFirstRegexpOf(matcherDef().pattern);
		});
	});
});
