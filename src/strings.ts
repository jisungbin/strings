import type {StringNode} from './StringNode'
import type {IntRange} from './IntRange'

figma.showUI(__html__, {themeColors: true, width: 400, height: 600})

fetch("https://raw.githubusercontent.com/jisungbin/strings-rule/main/strings.json")
  .then(response => response.json())
  .then(json => {
    const textNodes = figma.currentPage.findAll(node => node.type === 'TEXT') as TextNode[]
    const usedName = new Map<String, String>()
    const stringNodes = new Array<StringNode>()

    const rules = json['rule'] as Array<any>

    textNodes.forEach(text => {
      const id = text.name
      const value = text.characters
      const isDuplicatedId = (usedName.get(id) ?? value) !== value

      usedName.set(id, value)

      let fix = undefined
      let wrongValueRange = undefined
      let wrongDescription = undefined

      rules.forEach(rule => {
        const word = rule['word']
        if (value.includes(word)) {
          const startIndex = value.indexOf(word)
          const endIndex = startIndex + word.length

          fix = rule['fix']
          wrongValueRange = new class implements IntRange {
            start = startIndex
            endInclusive = endIndex - 1
          }
          wrongDescription = rule['description']
        }
      })

      const stringNode: StringNode = {
        id: id,
        isDuplicatedId: isDuplicatedId,
        value: value,
        fix: fix,
        wrongValueRange: wrongValueRange,
        wrongDescription: wrongDescription,
        node: text,
      }
      stringNodes.push(stringNode)
    })

    figma.ui.postMessage(stringNodes)
  })

figma.ui.onmessage = (message) => {
  if (message.type === 'focus-node') {
    let node = message.value
    figma.viewport.scrollAndZoomIntoView([node])
    figma.currentPage.selection = [node]
  } else if (message.type === 'quick-fix') {
    let fix = message.value.fix
    let wrongValueRange = message.value.wrongValueRange
    let nodeId = message.value.node.id
    let node = figma.currentPage.findOne(node => node.id === nodeId) as TextNode

    if (!fix) return

    let wrongIndexStart = wrongValueRange!!.start
    let wrongIndexEnd = wrongValueRange!!.endInclusive

    figma.loadFontAsync(node.fontName as FontName).then(() => {
      node.characters = node.characters.replace(message.value.value.substring(wrongIndexStart, wrongIndexEnd + 1), fix)
    })
  }
}

/*if (figma.command === 'textreview') {
  figma.on('textreview', ({text}) => {
    if (!text) return []

    const rule = /안되/gi
    const founds = Array.from(text.matchAll(rule))

    return founds.map((match): TextReviewRange => {
      match.index ??= 0
      return {
        start: match.index,
        end: match.index + match[0].length,
        suggestions: ['안돼'],
        color: 'BLUE',
      }
    })
  })
} else if (!figma.textreview?.isEnabled) {
  figma.textreview
    ?.requestToBeEnabledAsync()
    .then(() => console.log('I am now the default!'))
    .catch(() => console.log('User declined to enable this plugin.'))
    .finally(() => figma.closePlugin())
}

figma.closePlugin()*/
