import { createContext, useEffect, useState, ReactNode, useContext } from "react";
// import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  transaction: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    let ignore = false;

    // api.get("transactions").then((response) => {
    //   if (!ignore) setTransactions(response.data.transactions);
    // });

    return () => {
      ignore = true;
    };
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    // const response = await api.post("transactions", {
    //   ...transactionInput,
    //   createdAt: new Date(),
    // });
    
    // const { transaction } = response.data;

    // setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}