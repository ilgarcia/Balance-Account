import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillShopping, AiOutlineLock } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

import { FormsInput } from "../FormsInput";
import { ButtonPurple, SquareButton } from "../Buttons";

import styles from "./styles.module.scss";
import axios from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useTransactions } from "../../hooks/useTransactions";


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
  title: yup.string().required(""),
  value: yup.number().required(""),
});

const defaultValues = {
  typeBalance: "deposito",
};

export default function BalanceForm({
  onRequestClose,
}: NewTransactionModalProps) {
  const { auth } = useContext(AuthContext);
  const { createTransaction } = useTransactions();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
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
    <form className={styles.moveForm} onSubmit={handleSubmit(handleForms)}>
      <FormsInput
        {...register("title")}
        type={"text"}
        label={"Título"}
        name={"title"}
        icon={AiFillShopping}
      />
      <FormsInput
        {...register("value")}
        type={"number"}
        label={"Valor"}
        name={"value"}
        icon={BiMoney}
      />
      <div className={styles.buttonContainer}>
        <SquareButton
          type={"button"}
          onClick={() => {
            setValue("typeBalance", "deposito");
          }}
          className={
            watch("typeBalance") === "deposito"
              ? "squareButton activeButton"
              : "squareButton desativeButton"
          }
        >
          DEPOSITAR
        </SquareButton>
        <SquareButton
          type={"button"}
          onClick={() => {
            setValue("typeBalance", "saque");
          }}
          className={
            watch("typeBalance") === "saque"
              ? "squareButton activeButton"
              : "squareButton desativeButton"
          }
        >
          SACAR
        </SquareButton>
      </div>

      <div className={styles.buttonSubmit}>
        <ButtonPurple type={"submit"}>Cadastrar</ButtonPurple>
      </div>
    </form>
  );
}
