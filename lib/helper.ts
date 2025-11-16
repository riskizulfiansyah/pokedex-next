export function withPadStart(value: number | string, length: number = 3, char: string = '0') {
    if (typeof value === 'number') {
        return value.toString().padStart(length, char);
    }
    return value.padStart(length, char);
}


export function capitalFirst(text: string): string {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1);
}
export function shortenText(text: string): string {
    const delimiter = text.includes('.') ? '.' : '-';
    const isTwo = text.split(delimiter).length === 2;
    if (!isTwo) return text;
    return text
        .replace(/Special[-\.]/gi, 'Sp. ')
        .replace(/Attack/gi, 'Atk')
        .replace(/Defense/gi, 'Def');
}