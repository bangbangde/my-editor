export function applyGettersSetters(ctx, names) {
    const dataset = {}
    names.forEach(name => {
        dataset[name] = null
        Object.defineProperty(ctx, name, {
            get () {
                return dataset[name]
            },
            set (value) {
                dataset[name] = value
                ctx.setAttribute(name, value)
            }
        })
    })
    return dataset
}

export function createDocumentTreeFromJSON (jsonData) {
    const fragment = document.createDocumentFragment();

    function createNodeRecursively (data) {

        const childNodes = data.map(childData => {
            const newNode = document.createElement('c-' + childData.type);

            if (childData.type === 'text') {
                newNode.textContent = childData.content;

                Object.keys(childData).forEach(attribute => {
                    if (
                        attribute === 'type' ||
                        attribute === 'content'
                    ) return;

                    newNode[attribute] = childData[attribute];
                })
            } else {
                Object.keys(childData).forEach(attribute => {
                    if (
                        attribute === 'type' ||
                        attribute === 'children'
                    ) return;

                    newNode[attribute] = childData[attribute];
                })

                if (childData.children) {
                    const childNodes = createNodeRecursively(childData.children);
                    newNode.append(...childNodes);
                }
            }

            return newNode;
        });

        return childNodes;
    }

    return createNodeRecursively(jsonData)
}

export function camelToHyphen(str) {
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export function hyphenToCamel(str) {
    return str.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
}