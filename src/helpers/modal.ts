import Swal, { SweetAlertResult } from "sweetalert2";

export const yesNoModal = async (
  text: string
): Promise<SweetAlertResult<any>> => {
  const result = Swal.fire({
    title: text,
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "modal-popup",
      confirmButton: "modal-confirm-button",
      cancelButton: "modal-cancel-button",
    },
  });

  return result;
};
