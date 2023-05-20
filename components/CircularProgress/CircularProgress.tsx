'use client';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './CircularProgress.module.css';

type OurCircularProgress = {
    overlay?: boolean;
    showProgress?: boolean;
};

export default function OurCircularProgress(
    props: OurCircularProgress
): JSX.Element | null {
    const { overlay = true, showProgress } = props;
    if (!showProgress) {
        return null;
    }

    return (
        <div className={overlay ? styles.withOverlay : ''}>
            <CircularProgress />
        </div>
    );
}
