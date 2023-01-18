export default function validate(input) {
  const errors = {};
  //
  if (!input.newPassword) errors.newPassword = "Campo requerido";
  if (input.newPassword.length < 8)
    errors.newPassword = "Debe incluir 8 caracteres";
  if (!input.confirmPassword) errors.confirmPassword = "Campo requerido";

  if (input.newPassword !== input.confirmPassword)
    errors.confirmPassword = "Las contraseñas no coinciden";
  return errors;
}
