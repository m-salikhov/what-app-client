import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styles from "../../entry.module.css";
import { type LoginType, loginSchema } from "../../Schema/EntrySchema";
import { FormError } from "./FormError";

const LoginForm = () => {
	const id = useId();

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
	});

	const {
		handleLogin,
		loginState: { isLoading, isSuccess, error: apiError },
	} = useAuth();

	const onSubmit = (data: LoginType) => {
		handleLogin(data);
	};

	if (isSuccess) {
		return <Navigate to="/" replace />;
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div
				className={styles.formInput}
				data-tooltip-id={`tooltip-${id}`}
				data-tooltip-html="Можно зарегистрироваться или зайти под публичным аккаунтом <br /> почта: test@test.com, пароль: test"
			>
				<label htmlFor={`email-${id}`}>Почта:</label>
				<input type="email" autoComplete="email" id={`email-${id}`} {...register("email")} />
			</div>

			<Tooltip
				id={`tooltip-${id}`}
				place="top"
				opacity={0.8}
				className={styles.tooltip}
				style={{ maxWidth: "380px" }}
			/>

			{formErrors.email && <FormError error={formErrors.email.message} />}

			<div className={styles.formInput}>
				<label htmlFor={`password-${id}`}>Пароль:</label>
				<input
					type="password"
					autoComplete="current-password"
					id={`password-${id}`}
					{...register("password")}
				/>
			</div>

			{formErrors.password && <FormError error={formErrors.password.message} />}

			{!!apiError && <FormError error={apiError} />}

			<div className={styles.formButton}>
				<Button type="submit" disabled={isLoading}>
					Войти
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
