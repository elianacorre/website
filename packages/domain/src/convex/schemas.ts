import z from "zod";
import { zid } from "zod-convex";
import type { TableNames } from "./schema";

export const zDocRef = <T extends TableNames>(tableName: T) => z.object({ _id: zid(tableName) });
export type DocRef<T extends TableNames> = z.infer<ReturnType<typeof zDocRef<T>>>;

export const zDocRefs = <T extends TableNames>(tableName: T) => z.object({ _ids: z.array(zid(tableName)) });
export type DocRefs<T extends TableNames> = z.infer<ReturnType<typeof zDocRefs<T>>>;

export const zStorageRef = z.object({ storageId: zid("_storage") });
export type StorageRef = z.infer<typeof zStorageRef>;

export const zDocCommon = <T extends TableNames>(tableName: T) =>
	z.object({
		...zDocRef(tableName).shape,
		_creationTime: z.number(),
	});
export type DocCommon<T extends TableNames> = z.infer<ReturnType<typeof zDocCommon<T>>>;

// export const zDoc = <T extends TableNames, F extends z.ZodObject>(tableName: T, fields: F) =>
//   z.object({ ...zDocCommon(tableName).shape, ...fields.shape });
