import { z } from "zod";

export const ChangePassSchema = z
	.object({
		newPassword: z
			.string()
			.min(4, "Пароль должен содержать минимум 4 символа")
			.max(20, "Пароль должен содержать максимум 20 символов"),
		confirmNewPassword: z.string(),
	})
	.refine(
		(values) => {
			return values.newPassword === values.confirmNewPassword;
		},
		{
			message: "Повторите пароль",
			path: ["confirmNewPassword"],
		},
	);

export type ChangePassType = z.infer<typeof ChangePassSchema>;
