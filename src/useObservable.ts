import { useReducer, useLayoutEffect } from "react";
import type { ReadOnlyObservable } from "@residualeffect/reactor";

export function useObservable<T>(observable: ReadOnlyObservable<T>): T {
	const [, triggerReact] = useReducer((x: number) => x + 1, 0);
	const initialValue = observable.Value;

	useLayoutEffect(() => {
		observable.Subscribe(triggerReact);

		// In case the observable value has changed between the time when the initial value was retrieved and when the subscription was created
		if (!observable.IsEqualTo(initialValue)) {
			triggerReact();
		}
	}, [observable]);

	return initialValue;
}
