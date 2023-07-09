export const lines = {
    async getFilters() {
        return Promise.resolve([
            ['Синяя линия', 11],
            ['Красная линия', 40],
            ['Фиолетовая линия', 32],
        ]);
    },

    async getLinePolylines() {
        return Promise.resolve([]);
    },
};
