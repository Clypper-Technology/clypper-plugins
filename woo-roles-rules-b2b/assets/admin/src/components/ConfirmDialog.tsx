import { Modal, Button } from '@wordpress/components';

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDangerous?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    isDangerous = false
}) => {
    if (!isOpen) return null;

    return (
        <Modal title={title} onRequestClose={onCancel} className="crp-confirm-dialog">
            <p>{message}</p>
            <div className="crp-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={onConfirm}
                    isDestructive={isDangerous}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
