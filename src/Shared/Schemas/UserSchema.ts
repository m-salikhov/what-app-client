import { z } from "zod";

export const UserSchema = z
	.object({
		id: z.uuid(),
		email: z.email(),
		username: z.string(),
		role: z.enum(["user", "admin"]),
		date: z.union([z.iso.datetime(), z.iso.date()]),
	})
	.strict();

export type UserType = z.infer<typeof UserSchema>;
export type UserRoles = z.infer<typeof UserSchema>["role"];
