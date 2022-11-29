import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

import { FormsInput } from "../FormsInput";
import { ButtonPurple } from "../Buttons";
import axios from "../../services/api";

import styles from "./styles.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useTransactions } from "../../hooks/useTransactions";
import { tokenToString } from "typescript";

interface NewTransactionModalProps {
  onRequestClose: () => void;
}

type TransactionFormData = {
  title: string;
  typeBalance: string;
  value: number;
  token: string;
};

const transactionFormSchema = yup.object().shape({
  title: yup.string().required(),
  value: yup.number().required(""),
});

const defaultValues = {
  typeBalance: "transferencia",
};

export default function TransactionForm({
  onRequestClose,
}: NewTransactionModalProps) {
  const { auth } = useContext(AuthContext);
  const { createTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    defaultValues,
    resolver: yupResolver(transactionFormSchema),
  });

  setValue("token", auth.accessToken);

  const handleForms: SubmitHandler<TransactionFormData> = async (values) => {
    await createTransaction({
      value: values.value,
      title: values.title,
      typeBalance: values.typeBalance,
      token: values.token,
    });

    onRequestClose();
  };

  return (
    <form
      className={styles.transactionForm}
      onSubmit={handleSubmit(handleForms)}
    >
      <FormsInput
        {...register("title")}
        type={"text"}
        label={"Usuário"}
        name={"title"}
        icon={AiOutlineUser}
      />
      <FormsInput
        {...register("value")}
        type={"number"}
        label={"Valor"}
        name={"value"}
        icon={BiMoney}
      />

      <div className={styles.buttonSubmit}>
        <ButtonPurple type={"submit"}>Transferir</ButtonPurple>
      </div>
    </form>
  );
}
