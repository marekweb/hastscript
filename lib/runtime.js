/**
 * @typedef {import('./core.js').Element} Element
 * @typedef {import('./core.js').Root} Root
 * @typedef {import('./core.js').HResult} HResult
 * @typedef {import('./core.js').HChild} HChild
 * @typedef {import('./core.js').HProperties} HProperties
 * @typedef {import('./core.js').HPropertyValue} HPropertyValue
 * @typedef {import('./core.js').HStyle} HStyle
 * @typedef {import('./core.js').core} Core
 *
 * @typedef {Record<string, HPropertyValue | HStyle | HChild>} JSXProps
 *
 * @typedef {(props: {children?: HChild}) => HResult} FunctionComponent
 */

/**
 * Create an automatic runtime.
 *
 * @param {ReturnType<Core>} f
 */
export function runtime(f) {
  const jsx =
    /**
     * @type {{
     *   (type: null | undefined, props: {children?: HChild}, key?: string): Root
     *   (type: string, props: JSXProps, key?: string): Element
     *   (type: FunctionComponent, props: Parameters<FunctionComponent>[0], key?: string): HResult
     * }}
     */
    (
      /**
       * @param {string | FunctionComponent | null} type
       * @param {HProperties & {children?: HChild}} props
       * @returns {HResult}
       */
      function (type, props) {
        if (typeof type === 'function') {
          // Normalize the children
          const {children, ...properties} = props
          const noramlizedChildren = normalizeChildren(children)
          return type({...properties, children: noramlizedChildren})
        }
        const {children, ...properties} = props
        return type === null ? f(type, children) : f(type, properties, children)
      }
    )

  return {Fragment: null, jsx, jsxs: jsx, jsxDEV: jsx}
}

/**
 * @template T
 * @param {T} children
 * @returns {T}
 */
function normalizeChildren(children) {
  // TODO
  return children
}
