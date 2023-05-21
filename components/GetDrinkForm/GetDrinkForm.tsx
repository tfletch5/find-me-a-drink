'use client';
import { FormEvent } from 'react';
import styles from './GetDrinkForm.module.css';
import { TextField, Button } from '@mui/material';

type GetDrinkFormTypes = {
    handleClick: (e: FormEvent<HTMLFormElement> | KeyboardEvent) => void;
    setZipCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function GetDrinkForm(props: GetDrinkFormTypes): JSX.Element {
    const { handleClick, setZipCode } = props;
    return (
        <>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleClick(e);
                }}
            >
                <TextField
                    onKeyDown={(e) => {
                        if (e.code == '13') {
                            e.preventDefault();
                            handleClick(e as unknown as KeyboardEvent);
                            return;
                        }
                    }}
                    className={styles.textField}
                    label="Zip Code"
                    variant="filled"
                    onChange={(e) => setZipCode(e.currentTarget.value)}
                    fullWidth
                />
                <Button
                    onKeyDown={(e) => {
                        e.preventDefault();
                        handleClick(e as unknown as KeyboardEvent);
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleClick as any} // * I don't typically use any but I got tired of fighting this here
                >
                    Find me a Drink!
                </Button>
            </form>
        </>
    );
}
