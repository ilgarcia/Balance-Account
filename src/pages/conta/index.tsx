import Head from "next/head";
import Image from "next/image";
import Modal from "react-modal";

import NewTransactionModal from "../../components/NewTransactionModal";

import styles from "./styles.module.scss";

import logo from "../../images/logo.png";
import { useState } from "react";
import { ButtonPurple, SquareButton } from "../../components/Buttons";

Modal.setAppElement("#__next");

// interface ButtonModalProps {
//   onOpenNewTransactionModal: () => void;
// }

export default function Conta() {
  const [isNewTransactionModalOpen, setIsTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>Conta | NG.CASH</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.headerStyle}>
          <div>
            <Image src={logo} alt={"logo"} height={60} />
            <SquareButton>Logout</SquareButton>
          </div>
        </header>
        <main className={styles.dashboard}>
          <section className={styles.balanceCards}>
            <div>
              <header>
                <p>Entradas</p>
                {/* <img src={incomeImg} alt="Entradas" /> */}
              </header>
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(10000)}
              </strong>
            </div>
            <div>
              <header>
                <p>Saídas</p>
                {/* <img src={outcomeImg} alt="Entradas" /> */}
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
          <section>
            <div className={styles.divSection}>
              <ButtonPurple
                type="button"
                onClick={handleOpenNewTransactionModal}
              >
                NOVA TRANSAÇÃO
              </ButtonPurple>
            </div>
            <table className={styles.tableStyle}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>um</td>
                  <td>1000</td>
                  <td>valor</td>
                  <td>30/10/2002</td>
                </tr>
                <tr>
                  <td>um</td>
                  <td>1000</td>
                  <td>valor</td>
                  <td>30/10/2002</td>
                </tr>
                {/* {transactions.map(transaction => 
           (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}</td>
                <td>{transaction.category}</td>
                <td> {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))} </td>
              </tr>
            )
          )} */}
              </tbody>
            </table>
          </section>
        </main>
      </div>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
