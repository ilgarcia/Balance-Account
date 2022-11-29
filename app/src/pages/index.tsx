import Head from "next/head";
import Image from "next/image";

import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

import axios from "../services/api";
import { ButtonPurple } from "../components/Buttons";
import { FormsInput } from "../components/FormsInput";

import styles from "../styles/Home.module.scss";

import logo from "../images/logo.png";
import backgroundImg from "../images/grafismLogin.png";
import Router from "next/router";

import { useState, FormEvent, useRef, useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthProvider";

export default function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  
  useEffect(() => {
    if (auth.accessToken) {
      Router.push("/conta");
    }
  });

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "auth/login",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.token;
      setAuth({ user, accessToken });
      setPwd("");
      setUser("");

      Router.push("/conta");
    } catch (err) {
      setErrMsg("Login Failed");
    }
  };

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
            <form onSubmit={handleSubmit}>
              <FormsInput
                type={"text"}
                label={"Usuário"}
                name={"userName"}
                icon={AiOutlineUser}
                onChange={(e) => setUser(e.target.value)}
                value={user}
              />
              <FormsInput
                type={"password"}
                label={"Senha"}
                name={"password"}
                icon={AiOutlineLock}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
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

// type UserFormData = {
//   userName: string;
//   password: string;
// };

// const userFormSchema = yup.object().shape({
//   userName: yup.string().required(""),
//   password: yup.string().required("Senha Obrigatória"),
// });

// const handleForms: SubmitHandler<UserFormData> = async (values) => {
//   try {
//     const response = await axios.post(
//       "auth/login",
//       JSON.stringify({ values }),
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     console.log(JSON.stringify(response?.data.token));

//     // Router.push("/conta");
//   } catch (err) {}
// };

// export default function Home() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<UserFormData>({
//     resolver: yupResolver(userFormSchema),
//   });

//   return (
//     <>
//       <Head>
//         <title>Login | NG.CASH</title>
//       </Head>

//       <main className={styles.loginContainer}>
//         <Image
//           className={styles.backgroundImage}
//           src={backgroundImg}
//           layout="fill"
//           objectFit="cover"
//           alt={"Background Image"}
//         />
//         <section className={styles.loginSection}>
//           <div className={styles.loginHeader}>
//             <Image src={logo} alt="logo" />
//           </div>
//           <div className={styles.loginContent}>
//             <form onSubmit={handleSubmit(handleForms)}>
//               <FormsInput
//                 {...register("userName")}
//                 type={"text"}
//                 label={"Usuário"}
//                 name={"userName"}
//                 icon={AiOutlineUser}
//               />
//               <FormsInput
//                 {...register("password")}
//                 type={"password"}
//                 label={"Senha"}
//                 name={"password"}
//                 icon={AiOutlineLock}
//               />
//               <ButtonPurple type={"submit"}>ENTRAR</ButtonPurple>
//               <a href="./cadastro">Criar uma conta</a>
//             </form>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }
