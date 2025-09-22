import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { getServerErrorMessage } from "Shared/Helpers/getServerErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "../../entry.module.css";
import { type RegistrationType, registrationSchema } from "../../Schema/EntrySchema";
import { ModalReg } from "../ModalReg";
import { FormError } from "./FormError";

export const RegistrationForm = () => {
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
					<label htmlFor="email">Почта:</label>
					<input type="email" autoComplete="email" id="email" {...register("email")} />
				</div>
				<FormError message={errors.email?.message} />

				<div className={styles.formInput}>
					<label htmlFor="username" className="entry-input">
						Логин:
					</label>
					<input type="text" autoComplete="username" id="username" {...register("username")} />
				</div>
				<FormError message={errors.username?.message} />

				<div className={styles.formInput}>
					<label htmlFor="password" className="entry-input">
						Пароль:
					</label>
					<input type="password" autoComplete="off" id="password" {...register("password")} />
				</div>
				<FormError message={errors.password?.message} />

				<div className={styles.formInput}>
					<label htmlFor="confirmPassword">Повторите пароль:</label>
					<input
						type="password"
						autoComplete="off"
						id="confirmPassword"
						{...register("confirmPassword")}
					/>
				</div>
				<FormError message={errors.confirmPassword?.message} />

				{error && <FormError message={getServerErrorMessage(error, "Ошибка")} />}

				<Button
					type="submit"
					disabled={isLoading}
					title="Зарегистрироваться"
					onSubmit={handleSubmit(onSubmit)}
				/>
			</form>
		</>
	);
};
