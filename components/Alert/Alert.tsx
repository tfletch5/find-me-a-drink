import { Alert, Snackbar, AlertColor } from '@mui/material';
import styles from './Alert.module.css';

type OurAlert = {
    color?: AlertColor;
    open?: boolean;
    handleClose: React.Dispatch<React.SetStateAction<any>>;
    message: string;
};
export default function OurAlert(props: OurAlert): JSX.Element {
    const { color, open, message, handleClose } = props;
    return (
        <div>
            <Snackbar
                className={styles.snackbar}
                open={open}
                autoHideDuration={6000}
                onClose={() => handleClose({ color, message, open: false })}
            >
                <Alert severity={color ? color : 'info'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
