export default function control(input) {
    const errors = {}

    //Name input
    if(!input.username) errors.username = 'Campo requerido';
    if(input.username.length < 2) errors.username = 'Caracteres insuficientes';
    //email input
    if(!input.email) errors.email = 'Campo requerido';
    else if(!/@[^@]+.com$/.test(input.email)) errors.email = 'Complete con email válido';
    //Password input
    if(!input.password) errors.password = 'Contraseña requerida';
    if(input.password.length < 8) errors.password = 'Debe incluir 8 caracteres'; 
    
    return errors
}