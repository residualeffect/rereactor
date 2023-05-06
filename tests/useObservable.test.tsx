import React from "react";
import "@testing-library/jest-dom";
import { act, cleanup, render, screen } from "@testing-library/react";
import { useObservable } from "../src/useObservable";
import { Observable } from "@residualeffect/reactor";

const Component: React.FC<{ id: Observable<string> }> = (props) => {
	const id = useObservable(props.id);

	return (
		<p data-testid="id-field">{id}</p>
	);
};

test("should re-render component when observable value is changed", () => {
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
