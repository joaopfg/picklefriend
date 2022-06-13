declare class Pickle {
    private MARK;
    private STOP;
    private INT;
    private FLOAT;
    private NONE;
    private STRING;
    private APPEND;
    private DICT;
    private GET;
    private LIST;
    private PUT;
    private SETITEM;
    private TRUE;
    private FALSE;
    private NEWLINE;
    private SQUO;
    private arg0;
    private arg1;
    loads(pickle: string): any;
    private process_op;
    dumps(obj: any): string;
    private _check_memo;
    private _dumps;
}
export declare const pickle: Pickle;
export {};
