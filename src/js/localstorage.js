export function loadItems(kw) {
  let items = [];

  if (kw in localStorage && localStorage[kw] !== null) {
    items = JSON.parse(localStorage[kw])
  }

  return items;
};

export function saveItems(kw, items) {
  localStorage[kw] = JSON.stringify(items);
};

export function addItem(kw, item) {
  const items = loadItems(kw);
  items.push(item)
  saveItems(kw, items);
};

export function removeItem(kw, predicat) {
  const items = loadItems(kw).filter(item => !predicat(item))
  saveItems(kw, items)
};

export function hasItem(kw, predicat) {
  const items = loadItems(kw);
  return items.some(predicat);
};