import React from "react";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import { useObservable } from "../src/useObservable";
import { Observable, Computed } from "@residualeffect/reactor";

test("should re-render component when observable value is changed", () => {
	const Component: React.FC<{ id: Observable<string> }> = (props) => {
		const id = useObservable(props.id);

		return (
			<p data-testid="id-field">{id}</p>
		);
	};

	const o = new Observable("foo");

	render(<Component id={o} />);
	const element = screen.getByTestId("id-field");

	expect(element.innerHTML).toStrictEqual("foo");
	expect(o.SubscriptionCount).toStrictEqual(1);

	act(() => {
		o.Value = "bar";
	});
	expect(element.innerHTML).toStrictEqual("bar");
	expect(o.SubscriptionCount).toStrictEqual(1);

	cleanup();
	expect(o.SubscriptionCount).toStrictEqual(0);
});

test("should re-render component when legacy observable value is modified during react commit phase", () => {
	const ComponentWithInlineUpdate: React.FC<{ id: Observable<string> }> = (props) => {
		const id = useObservable(props.id);

		props.id.Value = "Test";

		return (
			<p data-testid="id-field">{id}</p>
		);
	};

	const o = new Observable("foo");

	render(<ComponentWithInlineUpdate id={o} />);
	const element = screen.getByTestId("id-field");

	expect(element.innerHTML).toStrictEqual("Test");
	expect(o.SubscriptionCount).toStrictEqual(1);

	act(() => {
		o.Value = "bar";
	});
	expect(element.innerHTML).toStrictEqual("Test");
	expect(o.SubscriptionCount).toStrictEqual(1);

	cleanup();
	expect(o.SubscriptionCount).toStrictEqual(0);
});

test("should properly handle computed with an array of values", () => {
	const Component: React.FC<{ ids: Computed<string[]> }> = (props) => {
		const ids = useObservable(props.ids);

		return (
			<p data-testid="id-field">{ids.join(", ")}</p>
		);
	};

	const o = new Observable("foo");
	const c = new Computed(() => [ o.Value + "-computed1", o.Value + "-computed2" ], DefaultEqualityComparison);

	render(<Component ids={c} />);
	const element = screen.getByTestId("id-field");

	expect(element.innerHTML).toStrictEqual("foo-computed1, foo-computed2");
	expect(c.SubscriptionCount).toStrictEqual(1);

	act(() => {
		o.Value = "bar";
	});
	expect(element.innerHTML).toStrictEqual("bar-computed1, bar-computed2");
	expect(o.SubscriptionCount).toStrictEqual(1);

	cleanup();
	expect(o.SubscriptionCount).toStrictEqual(0);
});

function DefaultEqualityComparison(newValue: unknown, oldValue: unknown): boolean {
	if (typeof newValue !== "object" && newValue === oldValue) {
		return true;
	}
	if (Array.isArray(newValue) && Array.isArray(oldValue) && newValue.length === oldValue.length && newValue.every((val, idx) => DefaultEqualityComparison(val, oldValue[idx]))) {
		return true;
	}
	return false;
}
