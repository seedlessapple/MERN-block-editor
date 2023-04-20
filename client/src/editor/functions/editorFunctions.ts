import { TPageDataTypes } from "editor/types/editor.type";
import _ from "lodash";
import { PUBLIC_generateRandomId } from "./functions";

export function _EDITOR_modifyBlockProperties(
  data: TPageDataTypes[],
  blockId: string,
  properties: any
) {
  let CBlock = undefined;

  const result = _.cloneDeepWith(data, (value) => {
    if (value.id === blockId) {
      CBlock = {
        ...value,
        ...{ properties: { ...value.properties, ...properties } },
      };
      return CBlock;
    } else {
      return _.noop();
    }
  });
  console.log(result, CBlock);

  return { result, CBlock };
}

export function _EDITOR_addBlockBefore(
  data: TPageDataTypes[],
  blockId: string,
  type: TPageDataTypes["type"]
) {
  let NBlock = undefined;
  let result = data;
  const loopThrough = (block: any) => {
    if (!block.hasOwnProperty("data") || !_.isArray(block.data)) return;
    block.data.forEach((childBlock: any) => {
      if (!_.isArray(childBlock.data)) return;
      const index = childBlock.data.findIndex((o: any) => o.id === blockId);

      if (index >= 0 && index !== undefined) {
        NBlock = {
          id: PUBLIC_generateRandomId(12),
          type: type,
        };
        childBlock.data.splice(index, 0, NBlock);
        return;
      } else {
        loopThrough(childBlock);
      }
    });
    return block;
  };
  console.log(loopThrough({ data: result })?.data);
  // console.log(result);
  return { result, NBlock };
}
export function _EDITOR_addBlockAfter(
  data: TPageDataTypes[],
  blockId: string,
  type: TPageDataTypes["type"]
) {
  let NBlock = undefined;
  let result = data;
  const loopThrough = (block: any) => {
    if (!block.hasOwnProperty("data") || !_.isArray(block.data)) return;
    block.data.forEach((childBlock: any) => {
      if (!_.isArray(childBlock.data)) return;
      const index = childBlock.data.findIndex((o: any) => o.id === blockId);

      if (index >= 0 && index !== undefined) {
        NBlock = {
          id: PUBLIC_generateRandomId(12),
          type: type,
        };
        childBlock.data.splice(index + 1, 0, NBlock);
        return;
      } else {
        loopThrough(childBlock);
      }
    });
    return block;
  };
  console.log(loopThrough({ data: [{ data: result }] })?.data);
  // console.log(result);
  return { result, NBlock };
}

export function _EDITOR_getBlockById(data: TPageDataTypes[], blockId: string) {
  return _.find(data, _.matchesProperty("id", blockId));
}
