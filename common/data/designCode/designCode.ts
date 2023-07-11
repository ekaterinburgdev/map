import dtp from '../../../public/ekb-design-code.json';
import { DesignCodeItemType, DesignCodeObject } from './designCodeObject';

export const DESIGN_MAP_HOST = 'https://map.ekaterinburg.design';

export const designCode = {
    getObject(id: string): Promise<DesignCodeObject> {
        try {
            const result = dtp.features.find((item) => item.properties.id === id);

            return Promise.resolve({
                ...result.properties,
                street: result.properties.street,
                type: result.properties.type as DesignCodeItemType,
                coords: [result.geometry.coordinates[0], result.geometry.coordinates[1]],
            });
        } catch (error) {
            console.error(error);
            return Promise.resolve(null);
        }
    },
    async getObjectsCount() {
        return Promise.resolve([
            ['Таблички ОКН', 105],
            ['Фризы остановок', 27],
            ['Настенные таблички', 21],
            ['Навигационные стелы', 18],
            ['Обычные адресные таблички', 9],
            ['Исторические адресные таблички', 6],
            ['Таблички ЧО', 6],
            ['Логотипы и айдентика', 3],
            ['Светофор', 2],
            ['Транспорт', 1],
            ['Памятные таблички', 1],
            ['Уличная мебель', 1],
        ]);
    },
};
