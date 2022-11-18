import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonPurple } from "../../components/Buttons";
import { FormsInput } from "../../components/FormsInput";

import styles from "./styles.module.scss";

import backgroundImgCadastro from "../../images/cadastro.png";
import logSimp from "../../images/logoSimp.png";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

type UserFormData = {
  userName: string;
  password: string;
  confirmPassword: string;
};

const userFormSchema = yup.object().shape({
  userName: yup.string().required(""),
  password: yup.string().required("Senha Obrigatória"),
  confirmPassword: yup.string().required("Senha Obrigatória"),
  
});

const handleForms: SubmitHandler<UserFormData> = (values) => {
  console.log(values);
};

export default function Cadastro() {
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
                  icon={AiOutlineUser}

                />
                <FormsInput
                  {...register("password")}
                  type={"password"}
                  label={"Senha"}
                  name={"password"}
                  icon={AiOutlineLock}

                />
                <FormsInput
                  {...register("confirmPassword")}
                  type={"password"}
                  label={"Confirmar senha"}
                  name={"confirmPassword"}
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
