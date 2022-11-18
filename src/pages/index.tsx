import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

import { ButtonPurple } from "../components/Buttons";
import { FormsInput } from "../components/FormsInput";

import styles from "../styles/Home.module.scss";

import logo from "../images/logo.png";
import backgroundImg from "../images/grafismLogin.png";

type UserFormData = {
  userName: string;
  password: string;
};

const userFormSchema = yup.object().shape({
  userName: yup.string().required(""),
  password: yup.string().required("Senha Obrigatória"),
});

const handleForms: SubmitHandler<UserFormData> = (values) => {
  console.log(values);
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({ 
    resolver: yupResolver(userFormSchema),
  });
  return (
    <>
      <Head>
        <title>Login | NG.CASH</title>
      </Head>

      <main className={styles.loginContainer}>
        <Image
          className={styles.backgroundImage}
          src={backgroundImg}
          layout="fill"
          objectFit="cover"
          alt={"Background Image"}
        />
        <section className={styles.loginSection}>
          <div className={styles.loginHeader}>
            <Image src={logo} alt="logo" />
          </div>
          <div className={styles.loginContent}>
            <form onSubmit={handleSubmit(handleForms)}>
              <FormsInput
                {...register("userName")}
                type={"text"}
                label={"Usuário"}
                name={"userName"}
                icon={AiOutlineUser}
              />
              <FormsInput
                {...register("password")}
                type={"password"}
                label={"Senha"}
                name={"password"}
                icon={AiOutlineLock}
              />
              <ButtonPurple type={"submit"}>ENTRAR</ButtonPurple>
              <a href="./cadastro">Criar uma conta</a>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
