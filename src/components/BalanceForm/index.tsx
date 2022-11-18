import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillShopping, AiOutlineLock } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

import { useTransactions } from "../../hooks/useTransaction";

import { FormsInput } from "../FormsInput";
import { ButtonPurple, SquareButton } from "../Buttons";

import styles from "./styles.module.scss";

interface NewTransactionModalProps {
  transaction: string;
  onRequestClose: () => void;
}

type TransactionFormData = {
  title: string;
  amount: number;
  balanceType: string;
  password: string;
};

const transactionFormSchema = yup.object().shape({
  title: yup.string().required(""),
  amount: yup.number().required(""),
  balanceType: yup.string().required(),
  password: yup.string().required("Senha Obrigatória"),
});

const defaultValues = {
  balanceType: "deposito",
};

export default function BalanceForm({
  transaction,
  onRequestClose,
}: NewTransactionModalProps) {
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

  const { createTransaction } = useTransactions();

  const handleForms: SubmitHandler<TransactionFormData> = async (values) => {
    console.log("values");

    //   await createTransaction({
    //     title,
    //     amount,
    //     type,
    //     transaction
    //   })

    //   setTitle('')
    //   setAmount(0);
    //   setType('Depositar')

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
        {...register("amount")}
        type={"number"}
        label={"Valor"}
        name={"amount"}
        icon={BiMoney}
      />
      <div className={styles.buttonContainer}>
        <SquareButton
          type={"button"}
          onClick={() => {
            setValue("balanceType", "deposito");
          }}
          className={
            watch("balanceType") === "deposito"
              ? "squareButton activeButton"
              : "squareButton desativeButton"
          }
        >
          DEPOSITAR
        </SquareButton>
        <SquareButton
          type={"button"}
          onClick={() => {
            setValue("balanceType", "saque");
          }}
          className={
            watch("balanceType") === "saque"
              ? "squareButton activeButton"
              : "squareButton desativeButton"
          }
        >
          SACAR
        </SquareButton>
      </div>

      <FormsInput
        {...register("password")}
        icon={AiOutlineLock}
        type={"password"}
        label={"Senha"}
        name={"password"}
      />

      <div className={styles.buttonSubmit}>
        <ButtonPurple type={"submit"}>Cadastrar</ButtonPurple>
      </div>
    </form>
  );
}
