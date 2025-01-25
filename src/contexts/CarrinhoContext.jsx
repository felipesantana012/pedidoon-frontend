import React, { createContext, useState, useContext } from "react";

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const adicionarAoCarrinho = (item, quantidade) => {
    if (quantidade > 0) {
      setItensCarrinho((prev) => {
        const itemExistente = prev.find((i) => i.id === item.id);
        if (itemExistente) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantidade: i.quantidade + quantidade }
              : i
          );
        }
        return [...prev, { ...item, quantidade }];
      });
    }
  };

  const calcularTotal = () => {
    const valorTotal = itensCarrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toFixed(2);

    return parseFloat(valorTotal);
  };

  const removerDoCarrinho = (itemId) => {
    setItensCarrinho((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itensCarrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        calcularTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
