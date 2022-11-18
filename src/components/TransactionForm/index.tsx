import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";

import { FormsInput } from "../FormsInput";
import { ButtonPurple } from "../Buttons";

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
  balanceType: 'transferência'
};

export default function TransactionForm({
  transaction,
  onRequestClose,
}: NewTransactionModalProps) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({defaultValues, 
    resolver: yupResolver(transactionFormSchema),
  });

  const handleForms: SubmitHandler<TransactionFormData> = (values) => {
    console.log(values);
  };



  return (
    <form className={styles.transactionForm} onSubmit={handleSubmit(handleForms)}>

      <FormsInput
        {...register("title")}
        type={"text"}
        label={"Usuário"}
        name={"title"}
        icon={AiOutlineUser}
      />
      <FormsInput
        {...register("amount")}
        type={"number"}
        label={"Valor"}
        name={"amount"}
        icon={BiMoney}
      />
      <FormsInput
        {...register("password")}
        type={"password"}
        label={"Senha"}
        name={"password"}
        icon={AiOutlineLock}
      />
      <div className={styles.buttonSubmit}>
        <ButtonPurple type={"submit"}>Transferir</ButtonPurple>
      </div>
    </form>
  );
}
