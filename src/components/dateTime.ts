export default {
    // 获取某月的天数
    getDaysOfMonth: (year: number, month: number): number => {
        const date = new Date(year, month, 0);
        const days = date.getDate();
        return days;
    },
};
