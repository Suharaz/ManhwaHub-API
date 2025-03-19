export function renderStatus(status){
    switch (status) {
        case -1:
            return "Đang chờ duyệt";
        case 0:
            return "Đang tiến hành";
        case 1:
            return "Hoàn thành";
        case 2:
            return "Tạm ngưng";
        default:
            return "Không xác định";
    }
}