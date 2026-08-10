import { ErrorServerSchema } from "Shared/Schemas/ErrorServerSchema";

interface ErrorDetails {
	message: string;
	statusCode: number;
}

export function extractApiErrorDetails(error: unknown): ErrorDetails {
	// базовый случай - стандартная ошибка Nest
	const parsed = ErrorServerSchema.safeParse(error);
	if (parsed.success) {
		return {
			message: parsed.data.data.message,
			statusCode: parsed.data.status,
		};
	}

	if (typeof error === "string") {
		return { message: error, statusCode: -1 };
	}

	if (error instanceof Error) {
		return { message: error.message, statusCode: -1 };
	}

	if (error && typeof error === "object" && "data" in error) {
		// Если это объект с data.message (например, от fetchBaseQuery без нашей схемы)
		const data = error.data;
		if (data && typeof data === "object" && "message" in data) {
			const msg = typeof data.message === "string" ? data.message : "Неизвестная ошибка";
			const statusCode = "status" in error && typeof error.status === "number" ? error.status : 500;
			return { message: msg, statusCode };
		}
	}

	// Fallback
	return { message: "Неизвестная ошибка", statusCode: 500 };
}
