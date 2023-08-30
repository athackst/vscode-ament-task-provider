import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    console.log(result);

    return result;
}

const cpplintOutputSuccess = syncReadFile('./data/cpplint_ok.txt');
const cpplintOutputFail = syncReadFile('./data/cpplint_fail.txt');

const cppcheckOutputSuccess = syncReadFile('./data/cppcheck_ok.txt');
const cppcheckOutputFail = syncReadFile('./data/cppcheck_fail.txt');

const cmakelintOutputSuccess = syncReadFile('./data/cmakelint_ok.txt');
const cmakelintOutputFail = syncReadFile('./data/cmakelint_fail.txt');

const flake8OutputSuccess = syncReadFile('./data/flake8_ok.txt');
const flake8OutputFail = syncReadFile('./data/flake8_fail.txt');

const mypyOutputSuccess = syncReadFile('./data/mypy_ok.txt');
const mypyOutputFail = syncReadFile('./data/mypy_fail.txt');

const pep257OutputSuccess = syncReadFile('./data/pep257_ok.txt');
const pep257OutputFail = syncReadFile('./data/pep257_fail.txt');

const xmllintOutputSuccess = syncReadFile('./data/xmllint_ok.txt');
const xmllintOutputFail = syncReadFile('./data/xmllint_fail.txt');

export const fixtures = {
    cpplintOutputSuccess,
    cpplintOutputFail,
    cppcheckOutputSuccess,
    cppcheckOutputFail,
    cmakelintOutputSuccess,
    cmakelintOutputFail,
    flake8OutputSuccess,
    flake8OutputFail,
    mypyOutputSuccess,
    mypyOutputFail,
    pep257OutputSuccess,
    pep257OutputFail,
    xmllintOutputSuccess,
    xmllintOutputFail,
};
