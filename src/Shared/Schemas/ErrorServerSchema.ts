import * as z from "zod";

export const ErrorServerSchema = z.object({
	data: z.object({
		message: z.string(),
		statusCode: z.number(),
		error: z.string().optional(),
	}),
	status: z.number(),
});

export type ErrorServerType = z.infer<typeof ErrorServerSchema>;
