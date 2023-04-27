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
  newBlock: TPageDataTypes
) {
  let result = data;
  const loopThrough = (block: any) => {
    if (!block.hasOwnProperty("data") || !_.isArray(block.data)) return;
    for (const childBlock of block.data) {
      if (!_.isArray(childBlock.data)) return;
      const index = childBlock.data.findIndex((o: any) => o.id === blockId);

      if (index >= 0 && index !== undefined) {
        childBlock.data.splice(index, 0, newBlock);
        return;
      } else {
        loopThrough(childBlock);
      }
    }
    return block;
  };
  console.log(loopThrough({ data: result })?.data);
  // console.log(result);
  return { result, newBlock };
}
export function _EDITOR_addBlockAfter(
  data: TPageDataTypes[],
  blockId: string,
  newBlock: TPageDataTypes
) {
  let result = data;
  const loopThrough = (block: any) => {
    if (!block.hasOwnProperty("data") || !_.isArray(block.data)) return;
    for (const childBlock of block.data) {
      if (childBlock.id === blockId) {
        const index = block.data.findIndex((o: any) => o.id === blockId);
        console.log(index);

        block.data.splice(index + 1, 0, newBlock);
        return;
      } else {
        loopThrough(childBlock);
      }
    }
    return block;
  };
  loopThrough({ data: result });
  // console.log(result);
  return { result, newBlock };
}
export function _EDITOR_addBlockInside(
  data: TPageDataTypes[],
  blockId: string,
  newBlock: TPageDataTypes
) {
  let result = data;
  const loopThrough = (block: any) => {
    if (!block.hasOwnProperty("data") || !_.isArray(block.data)) return;
    for (const childBlock of block.data) {
      console.log(childBlock);

      if (!_.isArray(childBlock.data)) return;
      if (childBlock.id === blockId) {
        return (childBlock.data = [newBlock, ...childBlock.data]);
      } else {
        loopThrough(childBlock);
      }
    }
  };
  loopThrough({ data: result });
  return { result };
}
export function _EDITOR_getBlockById(data: TPageDataTypes[], blockId: string) {
  return _.find(data, _.matchesProperty("id", blockId));
}
