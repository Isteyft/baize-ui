import { isNumber, isString } from "lodash-es";
import { debugWarn } from "./error";

// 报错类型位置
const SCOPE = "utils/style" as const;

/// 判断是否是数字字符串
const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

//如果没有px加上px
export function addUnit(val?: string | number, defaultUnit = "px") {
  if (!val) return "";
  if (isNumber(val) || isStringNumber(val)) {
    return `${val}${defaultUnit}`;
  }
  if (isString(val)) {
    return val;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}
