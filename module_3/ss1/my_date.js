function myDate(dateStr) {
    let weekdays = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];
    let date = new Date(dateStr);
    console.log(weekdays[date.getDay()])
}
myDate("1998/08/23")
