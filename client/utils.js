export function ce(tag, attrs = {}, children = []) {
  let txt = attrs.textContent || ''
  if (typeof attrs === "string") txt = attrs

  const el = Object.assign(
    document.createElement(tag),
    Object.assign(typeof attrs === "string" ? {} : attrs, { textContent: txt })
  )

  for (const child of children) {
    el.append(child)
  }

  return el
}