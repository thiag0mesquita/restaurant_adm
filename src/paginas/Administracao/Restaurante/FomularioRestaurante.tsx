import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormularioRestaurante() {

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante
    })
    .then(() => {
      alert('Restaurante cadastrado con sucesso!')
    })
  }

  return (
    <form action="" onSubmit={submeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={evento => setNomeRestaurante(evento.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}