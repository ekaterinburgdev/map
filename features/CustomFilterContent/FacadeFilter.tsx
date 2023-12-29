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
`;

export function FacadeFilter() {
    return (
        <Wrapper>
            <p>
                Для зданий в&nbsp;первом поясе туристического центра Екатеринбурга разработан
                специальный дизайн-код фасадов. Это нужно для того, чтобы историческая часть города
                имела опрятное и&nbsp;единое оформление. В&nbsp;этом слое показаны дома, которые
                входят в&nbsp;первый пояс. Чтобы посмотреть регламент оформления фасада, кликните
                на&nbsp;дом, а&nbsp;затем на&nbsp;зелёную кнопку скачивания.
            </p>
        </Wrapper>
    );
}
