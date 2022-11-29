import { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { ButtonPurple } from "../Buttons";
import NewTransactionModal from "../NewTransactionModal";
import styles from "./styles.module.scss";

export default function TransactionsTable() {
  const { transactions } = useTransactions();

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
      <section>
        <div className={styles.divSection}>
          <ButtonPurple type="button" onClick={handleOpenNewTransactionModal}>
            NOVA TRANSAÇÃO
          </ButtonPurple>
        </div>
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Título</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.typeBalance}</td>
                <td 
                className={transaction.debitedAccountId ? styles.saque : styles.credito}
                >
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.value)}
                </td>
                <td>{transaction.createdat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
