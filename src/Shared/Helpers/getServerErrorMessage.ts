import * as z from "zod";

export const ErrorServerSchema = z.object({
	data: z.object({
		message: z.string(),
		statusCode: z.number(),
	}),
	status: z.number(),
});

export type ErrorServerType = z.infer<typeof ErrorServerSchema>;

export function getServerErrorMessage(error: unknown, defaultMessage: string): string {
	const { data: parsedError, success } = ErrorServerSchema.safeParse(error);
	if (success) return parsedError.data.message;

	return defaultMessage;
}
