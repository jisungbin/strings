export type StringNode = {
  id: string
  duplicateId: boolean
  value: string
  readonly node: TextNode
  readonly toString: () => string
}
