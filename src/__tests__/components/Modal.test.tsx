import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../../components/Modal';

describe('Modal', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('should not render when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={() => { }}>
                <div>Content</div>
            </Modal>
        );

        expect(screen.queryByText('Content')).toBeNull();
    });

    it('should render children when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={() => { }}>
                <div>Content</div>
            </Modal>
        );

        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should call onClose when backdrop is clicked', () => {
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </Modal>
        );

        fireEvent.click(screen.getByText('Content').parentElement!.parentElement!);
        expect(onClose).toHaveBeenCalled();
    });

    it('should not call onClose when modal content is clicked', () => {
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </Modal>
        );

        fireEvent.click(screen.getByText('Content'));
        expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape key is pressed', () => {
        const onClose = vi.fn();

        render(
            <Modal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalled();
    });
});
