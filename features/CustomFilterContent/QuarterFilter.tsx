import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 14px;
    line-height: 21px;

    p {
        margin: 8px;
        &:first-child {
            margin-top: 0;
        }
    }

    ul {
        list-style-type: '— ';
        margin: 0;
        padding: 0;
        padding-left: 16px;
    }

    li {
        padding: 0;
    }
`;

export function QuarterFilter() {
    return (
        <Wrapper>
            <p>
                Квартальный 🙋 — это человек, который следит за&nbsp;порядком на придомовых
                территориях, детских площадках, парковках, мусорках, объектах торговли и&nbsp;т. д.
            </p>
            <p>На что можно пожаловаться квартальному:</p>
            <ul>
                <li>общие вопросы благоустройства;</li>
                <li>незаконная торговля, парковки и постройки;</li>
                <li>вывески и незаконная реклама;</li>
                <li>самовольные ограничения;</li>
                <li>сломанные детские площадки.</li>
            </ul>
        </Wrapper>
    );
}
