type GetEventHandlers<T extends keyof React.JSX.IntrinsicElements> = Extract<
  keyof React.JSX.IntrinsicElements[T],
  `on${string}`
>

/**
 * Provides the event type for a given element and handler.
 *
 * @example
 * type MyEvent = EventFor<"input", "onChange">;
 *
 * @see https://www.totaltypescript.com/event-types-in-react-and-typescript
 */
export type EventFor<
  TElement extends keyof React.JSX.IntrinsicElements,
  THandler extends GetEventHandlers<TElement>,
> = React.JSX.IntrinsicElements[TElement][THandler] extends
  | ((e: infer TEvent) => unknown)
  | undefined
  ? TEvent
  : never

/**
 * Autocomplete helper that allows members of a string union and any other string value
 */
export type LooseAutocomplete<T extends string> = T | Omit<string, T>
