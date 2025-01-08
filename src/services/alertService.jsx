import Swal from "sweetalert2";

// Função para alertas de confirmação
export const showAlertDelete = (onConfirm) => {
  Swal.fire({
    title: "Tem Certeza ?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#72d630",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, Deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm(); // Executa a ação de confirmação
      Swal.fire({
        title: "Deletado!",
        text: "Deleção realizada com sucesso!",
        icon: "success",
      });
    }
  });
};

// Função para alertas de sucesso
export const showAlertSuccess = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#72d630",
  });
};

// Função para alertas de erro
export const showAlertError = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#d33",
  });
};
