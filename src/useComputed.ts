import { Computed } from "@residualeffect/reactor";
import { DependencyList, useCallback, useRef } from "react";
import { useObservable } from "./useObservable";

export function useComputed<T>(computedFunc: () => T, deps?: DependencyList): T {
	const callback = useCallback(computedFunc, deps ?? []);
	const computed = useRef<Computed<T>|null>(null);
	if (computed.current === null || computed.current.ValueGenerator !== callback) {
		computed.current = new Computed(callback);
	}
	return useObservable(computed.current);
}
