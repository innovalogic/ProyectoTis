// Modal.js
export default function Modal({ show, onClose, title, message }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-[#1F3765] text-white px-4 py-2 rounded hover:bg-[#163154] transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
