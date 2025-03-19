export function formatDate(dateString) {
    if (!dateString) {
        return "Invalid Date";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('vi-VN', options).toUpperCase();
}

export function difference(date) {
    const today = new Date();
    const dateComic = new Date(date);
    const timeDiff = Math.abs(today - dateComic);

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (days >= 1) {
        return `${days} ngày trước`;
    }

    const hours = Math.floor(timeDiff / (1000 * 3600));
    if (hours >= 1) {
        return `${hours} giờ trước`;
    }

    const minutes = Math.floor(timeDiff / (1000 * 60));
    return `${minutes} phút trước`;
}