import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { ReadOnlyObservable } from "@residualeffect/reactor";

export function useObservable<T>(observable: ReadOnlyObservable<T>): T {
	return useSyncExternalStore((x) => observable.Subscribe(x), () => observable.Value);
}
