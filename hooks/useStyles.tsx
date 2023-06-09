import { makeStyles } from '@mui/material';

type ThemeProps = { spacing: (n: number) => string };
const useStyles = makeStyles(
    (theme: ThemeProps): { [x: string]: { [x: string]: string } } => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: 'url("")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(2),
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: theme.spacing(1),
        },
        textField: {
            marginBottom: theme.spacing(2),
            color: 'white',
            backgroundColor: 'white',
            borderRadius: theme.spacing(1),
        },
        footer: {
            position: 'absolute',
            left: '50%',
            bottom: theme.spacing(2),
        },
    })
);

export default useStyles;
