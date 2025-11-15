export function withPadStart(value: number | string, length: number = 3, char: string = '0') {
    if (typeof value === 'number') {
        return value.toString().padStart(length, char);
    }
    return value.padStart(length, char);
}


export function capitalFirst(text: string): string {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1);
}
