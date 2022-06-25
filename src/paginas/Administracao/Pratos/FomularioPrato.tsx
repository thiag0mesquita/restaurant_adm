import { Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";


export default function FormularioPrato() {

  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setDescricao(resposta.data.descricao))
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setTag(resposta.data.tag))
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')

  const [tag, setTag] = useState('')
  const [restaurante, setRestaurante] = useState('')

  const [imagem, setImagem] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setrestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setrestaurantes(resposta.data))
  }, [])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    if (parametros.id) {
      http.request({
        url: `pratos/${parametros.id}/`,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(() => {
          setNomePrato('')
          setDescricao('')
          setTag('')
          setRestaurante('')
          alert('Prato atualizado com sucesso!'
          )
        })
        .catch(erro => console.log(erro))
    } else {
      
      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(() => {
          setNomePrato('')
          setDescricao('')
          setTag('')
          setRestaurante('')
          alert('Prato cadastrado com sucesso!'
          )
        })
        .catch(erro => console.log(erro))
    }

  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ my: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: '1' }}>
            <Typography component='h1' variant='h6'>
              Formulário de Pratos
            </Typography>
            <Box component='form' onSubmit={submeterForm} sx={{ width: '80%' }}>
              <TextField
                value={nomePrato}
                onChange={evento => setNomePrato(evento.target.value)}
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
                sx={{ marginTop: 1 }}
              />
              <TextField
                value={descricao}
                onChange={evento => setDescricao(evento.target.value)}
                label="Descrição do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
                sx={{ marginTop: 1 }}
              />

              <FormControl margin="dense" fullWidth >
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tags.map(tag =>
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth >
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map(restaurante =>
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo} />

              <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}