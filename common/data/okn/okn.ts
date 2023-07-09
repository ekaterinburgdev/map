export const okn = {
    async getObjectsCount() {
        return Promise.resolve([
            ['Федерального значения', 82],
            ['Регионального значения', 667],
            ['Местного (муниципального) значения', 11],
        ]);
    },

    async getZonesCount() {
        return Promise.resolve([
            ['Границы территорий ОКН', 760],
            ['Защитные зоны', 211],
            ['Зоны охраны ОКН', 681],
        ]);
    },
};
