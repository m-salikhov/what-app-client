import { useAuth } from "Shared/Auth/useAuth";
import { Button } from "Shared/Components/UI/Button/Button";
import { Modal } from "Shared/Components/UI/Modal/Modal";
import { getServerErrorMessage } from "Shared/Helpers/getServerErrorMessage";
import { useChangePasswordMutation } from "Store/ToolkitAPIs/userAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../profile.module.css";
import { ChangePassSchema, type ChangePassType } from "./ChangePassSchema";

export function ChangePass() {
	const id = useId();

	const [changePass, setChangePass] = useState(false);
	const [serverMessage, setServerMessage] = useState("");

	const { user } = useAuth();

	const [changePassword, { isSuccess }] = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ChangePassType>({
		resolver: zodResolver(ChangePassSchema),
	});

	const onSubmit = (data: ChangePassType) => {
		if (user) {
			changePassword({ newPass: data.newPassword, id: user.id })
				.unwrap()
				.then(() => {
					setServerMessage("Пароль успешно изменён");
					reset();
				})
				.catch((error) => setServerMessage(getServerErrorMessage(error, "Произошла ошибка")));
		}
	};

	return (
		<>
			<div className={styles.changePass}>
				<Button
					size="tiny"
					variant="secondary"
					onClick={() => {
						setChangePass(true);
						reset();
					}}
				>
					изменить пароль
				</Button>
			</div>

			<Modal
				active={changePass}
				onClose={() => setChangePass(false)}
				onElementDestroyed={() => {
					setServerMessage("");
				}}
			>
				<div className={styles.modal}>
					<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						{" "}
						<label>
							<p>Новый пароль</p>
							<input
								type="password"
								id={`newPassword-${id}`}
								{...register("newPassword")}
								autoComplete="off"
							/>
						</label>
						<label>
							<p>Повторите пароль</p>
							<input
								type="password"
								id={`confirmNewPassword-${id}`}
								{...register("confirmNewPassword")}
								autoComplete="off"
							/>
						</label>
						{Object.keys(errors).length > 0 &&
							Object.values(errors).map((error) => {
								return (
									<p className={styles.error} key={error.message}>
										{error.message}
									</p>
								);
							})}
						{serverMessage && (
							<p className={isSuccess ? styles.success : styles.error}>{serverMessage}</p>
						)}
						<div className={styles.control}>
							<Button onClick={() => setChangePass(false)}> Закрыть </Button>
							<Button
								type="submit"
								onClick={() => {
									setServerMessage("");
									handleSubmit(onSubmit);
								}}
							>
								Сохранить
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
