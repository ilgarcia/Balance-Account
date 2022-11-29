import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import { ButtonPurple } from "../../components/Buttons";
import { FormsInput } from "../../components/FormsInput";
import axios from "../../services/api";

import styles from "./styles.module.scss";

import backgroundImgCadastro from "../../images/cadastro.png";
import logSimp from "../../images/logoSimp.png";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

type UserFormData = {
  userName: string;
  password: string;
  confirmPassword: string;
};

const USER_REGEX = /^.*(?=.{3,})[a-zA-Z][a-zA-Z0-9-_].*$/;
const PWD_REGEX =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const userFormSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Por favor preencha um login.")
    .matches(
      USER_REGEX,
      "Senha precisa conter pelo menos 3 caracteres e pode conter somente os caracteres especiais '-' ou '_'."
    ),
  password: yup
    .string()
    .required("Por favor preencha uma senha.")
    .matches(
      PWD_REGEX,
      "Senha precisa conter pelo menos 6 caracteres, uma letra maiúscula, um numero e um caractere especial."
    ),
  confirmPassword: yup
    .string()
    .required("Por favor confirme a senha.")
    .oneOf([yup.ref("password"), null], "Password não são iguais."),
});

const handleForms: SubmitHandler<UserFormData> = async (values) => {
  try {
    const response = await axios.post(
      "auth/register",
      JSON.stringify({ values }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    Router.push("/");
  } catch (error) {
    console.log("error");
  }
};

export default function Cadastro() {

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.accessToken) {
      Router.push("/conta");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
  });

  return (
    <>
      <Head>
        <title>Cadastro | NG.CASH</title>
      </Head>
      <main>
        <section className={styles.cadastroSection}>
          <div className={styles.cadastroBackground}>
            <Image src={logSimp} alt={"logo"} height={50} />
            <div className={styles.cadastroInfo}>
              <h1>Bem vindo ao NG.CASH</h1>
              <h2>
                Crie uma conta ou faça o <a href="../">login</a>
              </h2>
              <form onSubmit={handleSubmit(handleForms)}>
                <FormsInput
                  {...register("userName")}
                  type={"text"}
                  label={"Usuário"}
                  name={"userName"}
                  error={errors.userName}
                  icon={AiOutlineUser}
                />
                <FormsInput
                  {...register("password")}
                  type={"password"}
                  label={"Senha"}
                  name={"password"}
                  error={errors.password}
                  icon={AiOutlineLock}
                />
                <FormsInput
                  {...register("confirmPassword")}
                  type={"password"}
                  label={"Confirmar senha"}
                  name={"confirmPassword"}
                  error={errors.confirmPassword}
                  icon={AiOutlineLock}
                />

                <div className={styles.cadastroText}>
                  Ao clica no botão de <span>“CADASTRAR”</span>, você estará
                  criando uma conta no NG.CASH e você estará de acordo com os{" "}
                  <span>termos de uso</span> e{" "}
                  <span>politica de privacidade</span>.
                </div>
                <ButtonPurple type={"submit"}>CADASTRAR</ButtonPurple>
              </form>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={backgroundImgCadastro}
              alt={"Background Image"}
              height={600}
              objectFit="cover"
            />
          </div>
        </section>
      </main>
    </>
  );
}
