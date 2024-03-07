export interface StringNode {
  id: string
  duplicateId: boolean
  readonly value: string
  readonly node: TextNode
  readonly toString: () => string
}
