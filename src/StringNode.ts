import type {IntRange} from "./IntRange";

export type StringNode = {
  id: string
  isDuplicatedId: boolean
  value: string
  fix?: string
  wrongValueRange?: IntRange
  wrongDescription?: String
  readonly node: TextNode
}
