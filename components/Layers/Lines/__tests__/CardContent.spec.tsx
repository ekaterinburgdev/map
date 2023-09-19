import { render } from '@testing-library/react';
import { LinesCardContent } from '../CardContent/CardContent';
import { LineObject } from '../lineType';

describe('CardContent', () => {
    it('should render correctly', async () => {
        const { getByText } = render(
            <LinesCardContent
                placemark={
                    {
                        geometry: [0, 0],
                        properties: { title: 'title' },
                    } as unknown as LineObject
                }
            />,
        );

        expect(getByText('title')).toBeInTheDocument();
    });
});
