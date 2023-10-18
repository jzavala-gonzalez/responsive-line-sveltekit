// https://svelte.dev/repl/e09b9d09724c485f997a1ff32cef37d8?version=3.40.2
export const get_style_string = (cssVars) =>
	Object.entries(cssVars)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');
