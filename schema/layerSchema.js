import { z } from "zod";

const typeEnum = z.enum([
  "GraphicsLayer",
  "WMSLayer",
  "GeojsonLayer",
  "MapImageLayer",
]);

const layerSchema = z.object({
  id: z.number(),
  category: z.string(),
  group: z.string(),
  enable: z.boolean().default(true),
  show: z.boolean().default(false),
  title: z.string(),
  type: typeEnum,
  content: z.enum(["image", "line", "point"]),
  permission: z.array(z.string()).default(["*"]),
  zindex: z.number(),
  main_order: z.number(),
  category_order: z.number(),
  group_order: z.number(),
  [typeEnum]: z.object(),
});

export { layerSchema, typeEnum };
