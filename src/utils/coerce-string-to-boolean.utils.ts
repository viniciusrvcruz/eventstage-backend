import z from "zod";

export const coerceStringToBoolean = () =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      const lowered = val.toLowerCase();
      if (lowered === "true") return true;
      if (lowered === "false") return false;
    }
    return val;
  }, z.boolean());