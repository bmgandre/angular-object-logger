export class SourceParser {
    static sourceOrDefaultSource(obj: any): string {
        const source = obj ? obj as string : '.*';

        return source;
    }
}
