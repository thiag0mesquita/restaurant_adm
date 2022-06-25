import { AppBar, Button, TextField, Typography, Container, Link, Toolbar, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

import { Link as RouterLink  } from "react-router-dom";

export default function FormularioRestaurante() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState('')

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso!')
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!')
        })
    }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth='xl'>
          <Toolbar>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
                Administração
              </Typography>
              <Link component={RouterLink} to='/admin/restaurantes'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/restaurantes/novo'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth='lg' sx={{ my: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow:'1' }}>
              <Typography component='h1' variant='h6'>
                Formulário de Restaurantes
              </Typography>
              <Box component='form' onSubmit={submeterForm} sx={{width: '80%'}}>
                <TextField
                  value={nomeRestaurante}
                  onChange={evento => setNomeRestaurante(evento.target.value)}
                  label="Nome do Restaurante"
                  variant="standard"
                  fullWidth
                  required
                  sx={{ marginTop: 1 }}
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </>
  )
}