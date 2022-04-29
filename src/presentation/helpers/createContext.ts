import {createContext as createContextReact, useContext as useContextReact} from "react";

export function createContext<T>(initial?: T) {
    const context = createContextReact<T | undefined >(initial);

    function useContext() {
        const ctx = useContextReact(context);
        if (!ctx) throw new Error("context must be inside a Provider with a value");
        return ctx;
    }
    return [context, useContext] as const;
}