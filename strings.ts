import {StringNode} from 'src/StringNode'

const textNodes = figma.currentPage.findAll((node) => node.type === 'TEXT') as TextNode[]
const usedName = new Map<String, String>()
const stringNodes = new Array<StringNode>()

textNodes.forEach((text) => {
  const id = text.name
  const value = text.characters
  const duplicateId = (usedName.get(id) ?? value) !== value

  usedName.set(id, value)

  const stringNode: StringNode = {
    id: id,
    duplicateId: duplicateId,
    value: value,
    node: text,
    toString: () => `StringNode(id=${id}, duplicateId=${duplicateId}, value=${value}, node=${text.id})`,
  }
  stringNodes.push(stringNode)
})

if (figma.command === 'textreview') {
  figma.on('textreview', ({text}) => {
    if (!text) return []

    const yeetRegex = /yeet/gi
    const yeetMatches = Array.from(text.matchAll(yeetRegex))
    return yeetMatches.map((match): TextReviewRange => {
      match.index ??= 1
      return {
        start: match.index,
        end: match.index + match[0].length,
        suggestions: ['throw'],
        color: 'BLUE',
      }
    })
  })
} else if (!figma.textreview?.isEnabled) {
  figma.textreview
    ?.requestToBeEnabledAsync()
    .then(() => {
      console.log('I am now the default!')
    })
    .catch(() => {
      console.log('User declined to enable this plugin.')
    })
    .finally(() => {
      figma.closePlugin()
    })
}