# Slots and Fills

## The problem
You added custom data to the [Store API](./extend-rest-api-add-data.md). You changed several strings using [Checkout filters](./available-filters.md). Now you want to render your own components in specific places in the Cart and Checkout.

## Solution

Slots and Fills add the possibility to render your own HTML in pre-defined places in the Cart and Checkout. Your component will get access to contextual data and will get re-rendered when needed.

A Slot is a place in the Cart and Checkout that can render an indefinite number of external components.

A Fill is the component provided by third-party developers to render inside a Slot.

Slot and Fill use WordPress' API, and you can learn more about how they work in [the Slot Fill documentation.](https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/slot-fill).

## Basic Usage

`ExperimentalOrderMeta` is a fill that will render in a slot below the order summary section in the Cart and Checkout blocks.
The `ExperimentalOrderMeta` will automatically pass props to its top level child: `cart` which contains cart data, and `extensions` which contains data registered with `ExtendRestAPI` in `wc/store/cart` endpoint.

```jsx
const { registerPlugin } = wp.plugins;
const { ExperimentalOrderMeta } = wc.blocksCheckout;

const MyCustomComponent = ( { cart, extensions } ) => {
	return <div className='my-component'>Hello WooCommerce</div>
}

const render = () => {
	return (
			<ExperimentalOrderMeta>
				<MyCustomComponent />
			</ExperimentalOrderMeta>
	);
};

registerPlugin( 'my-plugin-namespace', {
	render,
	scope: 'woocommerce-checkout',
} );
```

## registerPlugin

In the above example, we're using `registerPlugin`. This plugin will take our component and render it, but it won't make it visible. The SlotFill part is the one responsible for actually having it show up in the correct place.

You use `registerPlugin` to feed in your plugin namespace, your component `render`, and the scope of your `registerPlugin`. The value of scope should always be `woocommerce-checkout`.

## Requirements
For this to work, your script must be enqueued after Cart and Checkout. You can follow the `IntegrationInterface` documentation to enqueue your script (TBD).
