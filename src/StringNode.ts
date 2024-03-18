import type {IntRange} from "./IntRange";

export type StringNode = {
  id: string
  isDuplicatedId: boolean
  value: string
  wrongValueRange?: IntRange
  readonly node: TextNode
}
