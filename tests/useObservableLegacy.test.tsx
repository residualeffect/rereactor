import React from "react";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import { useObservableLegacy } from "../src/useObservableLegacy";
import { Observable } from "@residualeffect/reactor";

test("should re-render component when legacy observable value is changed", () => {
	const Component: React.FC<{ id: Observable<string> }> = (props) => {
		const id = useObservableLegacy(props.id);

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
		const id = useObservableLegacy(props.id);

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
