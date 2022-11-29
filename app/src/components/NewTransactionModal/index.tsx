import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./styles.module.scss";
import TransactionForm from "../TransactionForm";
import { useState } from "react";
import BalanceForm from "../BalanceForm";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [transaction, setTransaction] = useState("balance");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <AiOutlineClose />
      </button>
      <div className={styles.modalTabs}>
        <h2
          className={transaction === "balance" ? styles.activeButton : ""}
          onClick={() => {
            setTransaction("balance");
          }}
        >
          Movimentação
        </h2>
        <h2
          className={transaction === "transaction" ? styles.activeButton : ""}
          onClick={() => {
            setTransaction("transaction");
          }}
        >
          Transação
        </h2>
      </div>

      {transaction === "balance" && (
        <BalanceForm onRequestClose={onRequestClose} />
      )}
      {transaction === "transaction" && (
        <TransactionForm onRequestClose={onRequestClose} />
      )}
    </Modal>
  );
}
