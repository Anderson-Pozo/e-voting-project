import { useRef } from "react";
import { Toast } from 'primereact/toast';

interface Props {
    severity: 'error' | 'info' | 'success' | 'warn',
    summary: string,
    detail: string,
    life?: number
}
//TODO: Change filename
export const useToast = () => {
    const toast = useRef<Toast>(null);

    const showError = ({ severity, summary, detail}: Props) => {
        toast.current?.show({severity, summary, detail, life: 3000 });
    }

    return { showError, toast }
}
