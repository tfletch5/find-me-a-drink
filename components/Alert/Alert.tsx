import Alert from '@mui/material/Alert';

type OurAlert = {
    color?: string;
}
export default function OurAlert(props: OurAlert): JSX.Element {
    const { color } = props;
    return (
        <div>
            <Alert color={'info'} />
        </div>
    )
}