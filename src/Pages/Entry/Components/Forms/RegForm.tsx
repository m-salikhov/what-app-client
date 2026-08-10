import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import styles from "../../entry.module.css";
import { type RegistrationType, registrationSchema } from "../../Schema/EntrySchema";
import { ModalReg } from "../ModalReg";
import { FormError } from "./FormError";
import { extractApiErrorDetails } from "Shared/Helpers/extractApiErrorDetails";
import { Modal } from "Shared/Components/UI/Modal/Modal";

export const RegistrationForm = () => {
	const id = useId();

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
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
			<Modal active={isSuccess}>
				<ModalReg />
			</Modal>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formInput}>
					<label htmlFor={`email-${id}`}>Почта:</label>
					<input type="email" autoComplete="email" id={`email-${id}`} {...register("email")} />
				</div>
				{formErrors.email && <FormError error={formErrors.email.message} />}

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
				{formErrors.username && <FormError error={formErrors.username.message} />}

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
				{formErrors.password && <FormError error={formErrors.password.message} />}

				<div className={styles.formInput}>
					<label htmlFor={`confirmPassword-${id}`}>Повторите пароль:</label>
					<input
						type="password"
						autoComplete="off"
						id={`confirmPassword-${id}`}
						{...register("confirmPassword")}
					/>
				</div>
				{formErrors.confirmPassword && <FormError error={formErrors.confirmPassword.message} />}

				{!!error && <FormError error={extractApiErrorDetails(error).message} />}

				<div className={styles.formButton}>
					<Button type="submit" disabled={isLoading}>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</>
	);
};
