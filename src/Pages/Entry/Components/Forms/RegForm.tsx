import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { getServerErrorMessage } from "Shared/Helpers/getServerErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import styles from "../../entry.module.css";
import { type RegistrationType, registrationSchema } from "../../Schema/EntrySchema";
import { ModalReg } from "../ModalReg";
import { FormError } from "./FormError";

export const RegistrationForm = () => {
	const id = useId();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationType>({
		resolver: zodResolver(registrationSchema),
	});

	const {
		handleRegistration,
		registrationState: { isLoading, isSuccess, error },
	} = useAuth();

	const onSubmit = (data: RegistrationType) => {
		handleRegistration(data);
	};

	return (
		<>
			{isSuccess ? <ModalReg /> : null}
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formInput}>
					<label htmlFor={`email-${id}`}>Почта:</label>
					<input type="email" autoComplete="email" id={`email-${id}`} {...register("email")} />
				</div>
				<FormError message={errors.email?.message} />

				<div className={styles.formInput}>
					<label htmlFor={`username-${id}`} className="entry-input">
						Логин:
					</label>
					<input
						type="text"
						autoComplete="username"
						id={`username-${id}`}
						{...register("username")}
					/>
				</div>
				<FormError message={errors.username?.message} />

				<div className={styles.formInput}>
					<label htmlFor={`password-${id}`} className="entry-input">
						Пароль:
					</label>
					<input
						type="password"
						autoComplete="off"
						id={`password-${id}`}
						{...register("password")}
					/>
				</div>
				<FormError message={errors.password?.message} />

				<div className={styles.formInput}>
					<label htmlFor={`confirmPassword-${id}`}>Повторите пароль:</label>
					<input
						type="password"
						autoComplete="off"
						id={`confirmPassword-${id}`}
						{...register("confirmPassword")}
					/>
				</div>
				<FormError message={errors.confirmPassword?.message} />

				{error && <FormError message={getServerErrorMessage(error, "Ошибка")} />}

				<Button type="submit" disabled={isLoading} title="Зарегистрироваться" />
			</form>
		</>
	);
};
