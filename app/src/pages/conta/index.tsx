import Head from "next/head";
import Image from "next/image";
import Modal from "react-modal";
import Router from "next/router";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

import styles from "./styles.module.scss";

import logo from "../../images/logo.png";
import { useContext, useEffect, useState } from "react";
import { SquareButton } from "../../components/Buttons";
import axios from "../../services/api";
import { AuthContext } from "../../context/AuthProvider";
import TransactionsTable from "../../components/TransactionsTable";
import {
  TransactionsProvider,
  useTransactions,
} from "../../hooks/useTransactions";

Modal.setAppElement("#__next");

export default function Conta() {
  const { setAuth } = useContext(AuthContext);
  const { userId, transactions } = useTransactions();

  function handleLogout() {
    setAuth({});
    Router.push("/");
  }


  // someFunction() 
  //   return records.reduce(function(sum, record){
  //     if(record.gender == 'BOYS') return sum + record.value;
  //   }, 0);
  // }




  return (
    <>
      <Head>
        <title>Conta | NG.CASH</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.headerStyle}>
          <div>
            <Image src={logo} alt={"logo"} height={60} />
            <SquareButton onClick={handleLogout}>Logout</SquareButton>
          </div>
        </header>
        <main className={styles.dashboard}>
          <TransactionsProvider>
            <section className={styles.balanceCards}>
              <div>
                <header>
                  <p>Entradas</p>
                  <AiOutlineArrowUp />
                </header>
                <strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(

                    10

                  )}
                </strong>
              </div>
              <div>
                <header>
                  <p>Saídas</p>
                  <AiOutlineArrowDown />
                </header>
                <strong>
                  -
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(10000)}
                </strong>
              </div>
              <div className="highlight-background">
                <header>
                  <p>Entradas</p>
                  {/* <img src={totalImg} alt="Entradas" /> */}
                </header>
                <strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(10000)}
                </strong>
              </div>
            </section>

            <TransactionsTable />
          </TransactionsProvider>
        </main>
      </div>
    </>
  );
}
