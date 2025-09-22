import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { getServerErrorMessage } from "Shared/Helpers/getServerErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styles from "../../entry.module.css";
import { type LoginType, loginSchema } from "../../Schema/EntrySchema";
import { FormError } from "./FormError";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
	});

	const {
		handleLogin,
		loginState: { isLoading, isSuccess, error },
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
				id="tooltip-mail"
				data-tooltip-html="Можно зарегистрироваться или зайти под публичным аккаунтом <br /> почта: test@test.com, пароль: test"
			>
				<label htmlFor="email">Почта:</label>
				<input type="email" autoComplete="email" id="email" {...register("email")} />
			</div>

			<Tooltip
				anchorSelect="#tooltip-mail"
				place="top"
				opacity={0.8}
				className={styles.tooltip}
				style={{ maxWidth: "380px" }}
			/>

			<FormError message={errors.email?.message} />

			<div className={styles.formInput}>
				<label htmlFor="password">Пароль:</label>
				<input
					type="password"
					autoComplete="current-password"
					id="password"
					{...register("password")}
				/>
			</div>

			<FormError message={errors.password?.message} />

			{error && <FormError message={getServerErrorMessage(error, "Ошибка")} />}

			<Button type="submit" disabled={isLoading} title="Войти" onSubmit={handleSubmit(onSubmit)} />
		</form>
	);
};

export default LoginForm;
