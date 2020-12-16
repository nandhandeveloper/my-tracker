export interface ActionType {
    type: string;
    payload: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
}
