import { readFileSync } from 'fs';
import { join } from 'path';

export function getOutputLines(filename: string) {
    const folder = 'data/output';
    const outFilename = `${filename}.out`;
    const result = readFileSync(join(__dirname, folder, outFilename), 'utf-8');
    return result.trim().split('\n');
}
