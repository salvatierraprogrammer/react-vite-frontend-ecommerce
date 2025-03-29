import { AccountCircle, Home, Lock, Settings } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const menuOptions = [
  {
    id: "personal",
    title: "Información Personal",
    icon: <AccountCircle />,
    content: (
      <>
        <Typography variant="body1"><strong>Nombre:</strong> Juan Pérez</Typography>
        <Typography variant="body1"><strong>Email:</strong> juanperez@example.com</Typography>
        <Typography variant="body1"><strong>Teléfono:</strong> +123 456 789</Typography>
      </>
    ),
  },
  {
    id: "account",
    title: "Datos de tu Cuenta",
    icon: <Settings />,
    content: (
      <>
        <Typography variant="body1"><strong>Usuario:</strong> juanperez</Typography>
        <Typography variant="body1"><strong>Último acceso:</strong> 28/03/2025</Typography>
      </>
    ),
  },
  {
    id: "address",
    title: "Dirección de Envío",
    icon: <Home />,
    content: (
      <>
        <Typography variant="body1"><strong>Calle:</strong> Av. Siempre Viva</Typography>
        <Typography variant="body1"><strong>Número:</strong> 1234</Typography>
        <Typography variant="body1"><strong>Ciudad:</strong> Springfield</Typography>
      </>
    ),
  },
  {
    id: "security",
    title: "Seguridad",
    icon: <Lock />,
    content: (
      <>
        <Typography variant="body1"><strong>Contraseña:</strong> ********</Typography>
        <Typography variant="body1"><strong>Autenticación 2FA:</strong> Activada</Typography>
      </>
    ),
  },
];
