import React from 'react';
import { useDispatch } from 'react-redux';
import { completeProfile } from '../../redux/actions';

function ProfileForm({input, setInput}) {
    const dispatch = useDispatch()
    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(completeProfile(input))
    }

  return (
    <form onSubmit={handleSubmit} >
        <input type="text" name="usuario" value={input.usuario} onChange={handleChange} placeholder="Usuario"></input>
        <input type="email" name="correo" value={input.correo} onChange={handleChange} placeholder="ejemplo@prueba.com"></input>
        <input type="text" name="direccion" value={input.direccion} onChange={handleChange} placeholder="Dirección"></input>
        <input type="tel" name="telefono" value={input.telefono} onChange={handleChange} placeholder="Teléfono"></input>
        <input type="text" name="cp" value={input.cp} onChange={handleChange} placeholder="Código postal"></input>
        <button type="submit">Guardar Cambios</button>
    </form>
  )
}

export default ProfileForm