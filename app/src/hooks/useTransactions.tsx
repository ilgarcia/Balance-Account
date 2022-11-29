import { UserinfoEndpointHandler } from "next-auth/providers";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "../services/api";

interface Transaction {
  token: string;
  title: string;
  value: number;
  typeBalance: string;
  createdat?: string;
  id?: number;
  creditedAccountId?: number;
  debitedAccountId?: number;
}


interface TransactionsContextData {
  transactions: Transaction[];
  userId: number;
  createTransaction: (transaction: Transaction) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<number>(0)


  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("transaction", {
          headers: {
            authorization: "bearer " + auth.accessToken,
          },
        })
        .then((response) => {
          setTransactions(response.data.userData);
          setUserId(response.data.userId);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createTransaction(transaction: Transaction) {
    await axios.post("transaction", { ...transaction });
  }

  return (
    <TransactionsContext.Provider value={{ transactions, userId, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
