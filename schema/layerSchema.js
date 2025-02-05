import { z } from "zod";

const typeEnum = z.enum([
  "GraphicsLayer",
  "WMSLayer",
  "GeojsonLayer",
  "MapImageLayer",
]);

const baseLayerSchema = z.object({
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
});


const layerSchema = z.array(
  z.discriminatedUnion("type", [
    baseLayerSchema.extend({
      type: z.literal("GraphicsLayer"),
      GraphicsLayer: z.record(z.any()).optional(),
    }),
    baseLayerSchema.extend({
      type: z.literal("WMSLayer"),
      WMSLayer: z.record(z.any()).optional(),
    }),
    baseLayerSchema.extend({
      type: z.literal("GeojsonLayer"),
      GeojsonLayer: z.record(z.any()).optional(),
    }),
    baseLayerSchema.extend({
      type: z.literal("MapImageLayer"),
      MapImageLayer: z.record(z.any()).optional(),
    }),
  ])
);

export { layerSchema, typeEnum };
