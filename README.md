# rereactor

React hooks for @residualeffect/reactor

![Node.js CI](https://github.com/residualeffect/rereactor/workflows/Node.js%20CI/badge.svg?branch=master)

[Changelog](CHANGELOG.md)

# Installation

Installation can be accomplished using npm:

`npm install @residualeffect/rereactor`

# Documentation

Implement your application logic using reactor.  For example:

```ts
import { Observable, Computed } from "@residualeffect/reactor";

export const t = new Observable(3);
export const c = new Computed(() => t.Value * 2);

export function DoSomething() {
	t.Value = t.Value + 1;
}
```

And then utilize your application logic in a react component:

```tsx
import { useObservable, useComputed } from "@residualeffect/rereactor";

const ExampleComponent: React.FC = () => {
	const observedValue = useObservable(t);
	const observedComputed = useObservable(c);
	const inlineComputed = useComputed(() => t.Value + 1);

	return (
		<>
			<div>Value: {observedValue}</div>
			<div>Computed Value: {observedComputed}</div>
			<div>Generated Computed: {inlineComputed}</div>
			<button onClick={DoSomething}>Go</button>
		</>
	);
};
```

# License

rereactor is freely distributable under the terms of the [MIT License](LICENSE).
