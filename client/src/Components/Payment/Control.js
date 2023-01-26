export default function Control(input) {
  const errors = {};

  //Name input
  if (!input.name) errors.name = "Campo requerido";
  if (!input.surname) errors.surname = "Campo requerido";
  if (!input.email) errors.email = "Campo requerido";
  if (!/@[^@]+.com$/.test(input.email))
    errors.email = "Complete con un email válido";
  if (!input.shippingAddress) errors.shippingAddress = "Campo requerido";
  if (!input.city) errors.city = "Campo requerido";
  if (!input.zipCode) errors.zipCode = "Campo requerido";

  return errors;
}
