export function useClickOutside(node, callback) {
    const handleClick = event => {
        if (node && !node.contains(event.target)) {
            callback();
        }
    };

    document.addEventListener('mousedown', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('mousedown', handleClick, true);
        }
    };
}