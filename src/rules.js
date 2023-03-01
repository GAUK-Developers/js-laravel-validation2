// Based on laravel validation rules
// https://laravel.com/docs/5.7/validation#rule-accepted

import timezones from "./constants/timezones.js";
import mimes from "./constants/mimes.js";
import moment from "moment";
import numeral from "numeral";

export default {
  // TODO test
  accepted: ({ value }) => ["yes", "on", 1, true].includes(value),

  // TODO test
  accepted_if: ({ value, values, params }) =>
    values[params[0]] === params[1] && ["yes", "on", 1, true].includes(value),

  // active_url: ({ value }) => {
  //This cannot be supported because JS does not support hostname lookups (dns_get_record in PHP)
  //This could be implemented if there was a reliable way to host a small API to do the lookup
  // },

  // TODO test
  after: ({ value, params, values }) =>
    values[params[0]] !== undefined
      ? b(new Date(value) > new Date(values[params[0]]))
      : b(new Date(value) > new Date(params[0])),

  // TODO test
  after_or_equal: ({ value, params, values }) =>
    values[params[0]] !== undefined
      ? b(new Date(value) >= new Date(values[params[0]]))
      : b(new Date(value) >= new Date(params[0])),

  alpha: ({ value }) => b(typeof value === "string") && !/[^a-z]/i.test(value),
  alpha_dash: ({ value }) =>
    b(typeof value === "string") && /^[A-Za-z\-_]+$/i.test(value), // Unicode is still missing!
  alpha_num: ({ value }) =>
    b(typeof value === "string") && /^[a-z0-9]+$/i.test(value),

  // TODO test
  array: ({ value, params }) => {
    if (!Array.isArray(value)) return false;
    if (params.length && value.length) {
      for (let x in value) {
        if (typeof value[x] !== "object" || value[x] === null) return false;
        const row = value[x];
        const keys = Object.keys(row);
        for (let y in keys) {
          if (!params.includes(keys[y])) return false;
        }
      }
    }
    return true;
  },

  //bail: handled in index.js

  // TODO test
  before: ({ value, params, values }) =>
    values[params[0]] !== undefined
      ? b(new Date(value) < new Date(values[params[0]]))
      : b(new Date(value) < new Date(params[0])),

  // TODO test
  before_or_equal: ({ value, params, values }) =>
    values[params[0]] !== undefined
      ? b(new Date(value) <= new Date(values[params[0]]))
      : b(new Date(value) <= new Date(params[0])),

  between: ({ value, params }) => {
    if (typeof value !== "number" && !value) return false;
    const [min, max] = params;
    value = sizeOf(value);
    return value >= min && value <= max;
  },

  // TODO test
  boolean: ({ value }) =>
    typeof value === "boolean" ||
    [1, 0, "1", "0", "true", "false"].includes(value),

  confirmed: ({ value, key, values }) =>
    b(value === values[`${key}_confirmation`]),

  date: ({ value }) =>
    b(typeof value !== "number" && !isNaN(Date.parse(value))),

  date_equals: ({ value, params }) =>
    Date.parse(value) === Date.parse(params[0]),

  // TODO test
  date_format: ({ value, params }) =>
    moment(value, params[0]).format(params[0]) === value,

  // TODO test
  declined: ({ value }) => ["no", "off", 0, false].includes(value),

  // TODO test
  declined_if: ({ value, params, values }) =>
    values[params[0]] === params[1] && ["no", "off", 0, false].includes(value),

  different: ({ value, values, params }) => b(value !== values[params[0]]), //allows same arrays and objects

  digits: ({ value, params }) =>
    !isNaN(value) &&
    (typeof value === "number" || b(value)) &&
    value.toString().length === parseInt(params[0]),
  digits_between: ({ value, params }) => {
    if (typeof value !== "number" && !b(value)) {
      return false;
    }
    const len = value.toString().length;
    const [min, max] = params;
    return len >= min && len <= max;
  },

  dimensions: ({ value, params }) => {
    if (!value) return false;
    const width = parseInt(value.width);
    const height = parseInt(value.height);

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (!param) continue;

      const pair = param.split("=");
      const paramVal = parseInt(pair[1]);
      switch (pair[0]) {
        case "width":
          if (width !== paramVal) return false;
          break;
        case "min_width":
          if (width < paramVal) return false;
          break;
        case "max_width":
          if (width > paramVal) return false;
          break;
        case "height":
          if (height !== paramVal) return false;
          break;
        case "min_height":
          if (height < paramVal) return false;
          break;
        case "max_height":
          if (height > paramVal) return false;
          break;
      }
    }

    return true;
  },

  distinct: ({ values, value }) => {
    return (
      Object.keys(values).reduce((count, key) => {
        if (deepEquals(values[key], value)) {
          count++;
        }
        return count;
      }, 0) <= 1
    );
  },

  email: ({ value }) =>
    /^\w+([\.+-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value),

  ends_with: ({ value, params }) => {
    if (Array.isArray(value)) {
      value = value.join("");
    }
    return String(value).endsWith(params[0]);
  },

  // enum

  // exclude

  // exclude unless

  // exclude with

  // exclude without

  // exists

  file: ({ value }) => value instanceof File,

  filled: ({ value }) => isNotEmpty(value),

  // TODO test
  gt: ({ value, values, params }) =>
    values[params[0]] !== undefined
      ? value > toNumber(values[params[0]])
      : value > toNumber(params[0]),
  // TODO test
  gte: ({ value, values, params }) =>
    values[params[0]] !== undefined
      ? value >= toNumber(values[params[0]])
      : value >= toNumber(params[0]),

  image: ({ value }) => value instanceof Image,

  in: ({ value, params }) =>
    params.findIndex((param) => deepEquals(param, value)) !== -1,
  in_array: ({ value, values, params }) => {
    const array = values[params[0]];
    if (!Array.isArray(array)) return false;
    return array.findIndex((arrayVal) => deepEquals(arrayVal, value)) !== -1;
  },
  integer: ({ value }) => {
    return Number.isInteger(
      typeof value === "string" ? parseInt(value) : value
    );
  },

  ip: ({ value }) => isIpv4(value) || checkipv6(value),
  ipv4: ({ value }) => isIpv4(value),
  ipv6: ({ value }) => checkipv6(value),

  json: ({ value }) => {
    if (typeof value !== "string") return false;
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  },

  lt: ({ value, values, params }) => value < values[params[0]],
  lte: ({ value, values, params }) => value <= values[params[0]],

  // TODO: test
  // Created by luthraG
  // https://github.com/luthraG/is-mac-address
  mac_address: ({ value }) =>
    value &&
    /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/.test(value),

  max: ({ value, params }) =>
    (b(value) || typeof value === "number") && sizeOf(value) <= params[0],

  mimetypes: ({ value, params }) => {
    if (!value || !value.type) {
      return false;
    }
    return params.includes(value.type);
  },
  mimes: ({ value, params }) => {
    if (!value || !value.type) {
      return false;
    }

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const mimeType = mimes[param];
      if (!mimeType) {
        console.warn(`Invalid mime specified: ${param}`);
        continue;
      }
      if (value.type === mimeType) return true;
    }

    return false;
  },

  min: ({ value, params }) =>
    (b(value) || typeof value === "number") && sizeOf(value) >= params[0],

  // TODO test
  multiple_of: ({ value, params }) =>
    typeof value === "number" &&
    params[0] &&
    toNumber(value) !== 0 &&
    toNumber(params[0]) % value === 0,

  not_in: ({ value, params }) =>
    params.findIndex((param) => deepEquals(param, value)) === -1,

  //not_regex

  //nullable: implemented in `validateField` method (index.js)

  // TODO test
  numeric: ({ value }) => {
    if (typeof value === "number") {
      return true;
    }

    if (!value) {
      return false;
    }

    if (typeof value === "string" && !isNaN(Number(value))) {
      return true;
    }

    return !isNaN(value);
  },

  // password

  present: ({ value }) => value !== undefined,

  // prohibited

  // prohibited_if

  // prohibited_unless

  // prohibits

  // TODO test
  regex: ({ value }) => {
    try {
      new RegExp(value);
    } catch (err) {
      return false;
    }
    return true;
  },

  required: ({ value }) => isNotEmpty(value),
  required_if: ({ value, params, values }) =>
    values[params[0]] == params[1] ? isNotEmpty(value) : true,
  required_unless: ({ value, params, values }) =>
    values[params[0]] != params[1] ? isNotEmpty(value) : true,
  required_with: ({ value, params, values }) => {
    const required =
      Object.keys(values).filter((key) =>
        params.includes(key) ? b(values[key]) : false
      ).length > 0;
    return !required || isNotEmpty(value);
  },
  required_with_all: ({ value, params, values }) => {
    const required =
      Object.keys(values).filter((key) =>
        params.includes(key) ? isNotEmpty(values[key]) : false
      ).length === params.length;
    return !required || isNotEmpty(value);
  },
  required_without: ({ value, params, values }) => {
    const required =
      Object.keys(values).filter((key) =>
        params.includes(key) ? !isNotEmpty(values[key]) : false
      ).length > 0;
    return !required || isNotEmpty(value);
  },
  required_without_all: ({ value, params, values }) => {
    const required =
      Object.keys(values).filter((key) =>
        params.includes(key) ? !isNotEmpty(values[key]) : false
      ).length === params.length;
    return !required || isNotEmpty(value);
  },

  required_if_multiple: ({ value, params, values }) => {
    let vals = {};
    for (let i = 0; i < params.length; i += 2) {
      vals[params[i]] = params[i + 1];
    }

    let matching = {};
    for (const [key, val] of Object.entries(vals)) {
      if (values.hasOwnProperty(key)) {
        matching[key] = values[key] == val;
      }
    }

    required =
      Object.keys(matching).length === Object.keys(vals).length
        ? Object.values(matching).every(Boolean)
        : false;

    console.log(`required_if_multiple: `, { vals, matching, required });

    return !required || isNotEmpty(value);
  },

  // required_array_keys

  same: ({ value, values, params }) => b(value === values[params[0]]), //allows same arrays and objects

  size: ({ value, params }) => {
    const size = !b(value) && typeof value !== "number" ? 0 : sizeOf(value);
    return size === parseInt(params[0]);
  },

  starts_with: ({ value, params }) => {
    if (Array.isArray(value)) {
      value = value.join("");
    }
    return String(value).startsWith(params[0]);
  },

  string: ({ value }) => typeof value === "string",

  timezone: ({ value }) => timezones.includes(value),

  // unique

  url: ({ value }) =>
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    ),

  uuid: ({ value }) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    ),
};

/*****************************/
/** START OF UTIL FUNCTIONS **/
/*****************************/

//These functions are tested through rules that use them

function isNotEmpty(value) {
  return typeof value === "number" || typeof value === "boolean" || !!value;
}

function sizeOf(value) {
  //TODO files, images other things
  if (value.hasOwnProperty("length")) {
    value = value.length;
  }
  return value;
}

function b(value) {
  return !!value;
}

function isIpv4(value) {
  return /^(?:\d{1,3}(?:\.|$)){4}/.test(value);
}

// Created by Dartware
//http://download.dartware.com/thirdparty/ipv6validator.js
function checkipv6(str) {
  return /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(
    str
  );
}

function deepEquals(x, y) {
  if (x === y) {
    return true;
  } else if (
    typeof x == "object" &&
    x != null &&
    typeof y == "object" &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEquals(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
}

// Attempts to convert a value to a number
function toNumber(value) {
  const result = numeral(value).value();
  return result === null ? 0 : result;
}
