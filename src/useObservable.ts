import { useReducer, useLayoutEffect } from "react";
import type { ReadOnlyObservable } from "@residualeffect/reactor";

export function useObservable<T>(observable: ReadOnlyObservable<T>): T {
	const [, triggerReact] = useReducer((x: number) => x + 1, 0);
	useLayoutEffect(() => observable.Subscribe(triggerReact), [observable]);
	return observable.Value;
}
