import { AppBar, Button, Typography, Container, Link, Toolbar, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { Link as RouterLink, Outlet } from "react-router-dom";

export default function PaginaBaseAdmin() {
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
            <Link component={RouterLink} to='/admin/pratos'>
              <Button sx={{ my: 2, color: 'white' }}>
                Pratos
              </Button>
            </Link>
            <Link component={RouterLink} to='/admin/pratos/novo'>
              <Button sx={{ my: 2, color: 'white' }}>
                Novo Prato
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Box>
      <Container maxWidth='lg' sx={{ my: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Outlet/>
        </Paper>
      </Container>
    </Box>

  </>
  )
}